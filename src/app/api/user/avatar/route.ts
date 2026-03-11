import { NextResponse } from "next/server";
import sharp from "sharp";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSupabaseAdmin, AVATAR_BUCKET, getPublicAvatarUrl } from "@/lib/supabase";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB (will be compressed to WebP)
const AVATAR_SIZE = 256;

function extractStoragePath(avatarUrl: string | null): string | null {
  if (!avatarUrl) return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || !avatarUrl.startsWith(supabaseUrl)) return null;
  const prefix = `${supabaseUrl}/storage/v1/object/public/${AVATAR_BUCKET}/`;
  return avatarUrl.startsWith(prefix) ? avatarUrl.slice(prefix.length) : null;
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const path = `${session.user.id}/${Date.now()}.webp`;

    const supabase = getSupabaseAdmin();

    // Ensure bucket exists (idempotent — no-ops if already created)
    await supabase.storage.createBucket(AVATAR_BUCKET, { public: true }).catch(() => {});

    const rawBuffer = Buffer.from(await file.arrayBuffer());

    // Resize and convert to WebP; fall back to raw buffer if sharp fails (e.g. unsupported format)
    let buffer: Buffer;
    let contentType: string;
    let finalPath: string;
    try {
      buffer = await sharp(rawBuffer)
        .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: "cover" })
        .webp({ quality: 80 })
        .toBuffer();
      contentType = "image/webp";
      finalPath = path;
    } catch {
      // Client already resized to JPEG — upload as-is
      buffer = rawBuffer;
      contentType = file.type || "image/jpeg";
      finalPath = path.replace(".webp", ".jpg");
    }

    // Use Blob + FormData path — avoids ByteString header errors in undici
    const uploadBlob = new Blob([new Uint8Array(buffer)], { type: contentType });
    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(finalPath, uploadBlob, { contentType, upsert: false });

    if (uploadError) {
      console.error("Supabase avatar upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message || "Upload failed" }, { status: 500 });
    }

    const avatarUrl = getPublicAvatarUrl(finalPath);

    // Get old avatar to clean up
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { avatarUrl: true },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { avatarUrl },
    });

    // Best-effort delete old file
    const oldPath = extractStoragePath(user?.avatarUrl ?? null);
    if (oldPath) {
      supabase.storage.from(AVATAR_BUCKET).remove([oldPath]).catch(() => {});
    }

    return NextResponse.json({ avatarUrl });
  } catch (err) {
    console.error("Avatar upload error:", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { avatarUrl: true },
  });

  const oldPath = extractStoragePath(user?.avatarUrl ?? null);
  if (oldPath) {
    const supabase = getSupabaseAdmin();
    supabase.storage.from(AVATAR_BUCKET).remove([oldPath]).catch(() => {});
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: null },
  });

  return NextResponse.json({ avatarUrl: null });
}
