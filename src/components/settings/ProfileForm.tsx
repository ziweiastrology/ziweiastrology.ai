"use client";

import { useEffect, useRef, useState } from "react";
import { Save, Loader2, Globe, Lock, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import UserAvatar from "@/components/ui/UserAvatar";
import { useUpdateProfile, useUploadAvatar, useDeleteAvatar } from "@/hooks/useProfile";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const MAX_SIZE = 10 * 1024 * 1024; // allow large originals — will be compressed client-side
const AVATAR_SIZE = 512;

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProfileForm({ profile }: { profile: any }) {
  const t = useTranslations("settings");
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const deleteAvatar = useDeleteAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setHeadline(profile.headline || "");
      setBio(profile.bio || "");
      setLocation(profile.location || "");
      setIsPublic(profile.isProfilePublic ?? true);
    }
  }, [profile]);

  async function handleSave() {
    setSaved(false);
    await updateProfile.mutateAsync({
      name: name || undefined,
      headline: headline || undefined,
      bio: bio || undefined,
      location: location || undefined,
      isProfilePublic: isPublic,
    });
    setSaved(true);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset input so same file can be re-selected
    e.target.value = "";

    // Accept by mime OR by extension (HEIC on Chrome has empty mime)
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const isImage = file.type.startsWith("image/") || ["heic", "heif", "jpg", "jpeg", "png", "webp", "gif"].includes(ext);
    if (!isImage) {
      toast.error(t("avatarInvalidType"));
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error(t("avatarTooLarge"));
      return;
    }

    // Client-side resize: render to canvas → export as JPEG
    try {
      const converted = await resizeToJpeg(file);
      uploadAvatar.mutate(converted, {
        onError: (err) => toast.error(err instanceof Error ? err.message : t("avatarError")),
      });
    } catch (err) {
      console.error("Avatar client-side conversion error:", err);
      // Fallback: upload original file without client-side conversion
      uploadAvatar.mutate(file, {
        onError: (err2) => toast.error(err2 instanceof Error ? err2.message : t("avatarError")),
      });
    }
  }

  async function resizeToJpeg(file: File): Promise<File> {
    // Try createImageBitmap first (fastest)
    try {
      const bitmap = await createImageBitmap(file);
      const blob = drawToCanvas(bitmap);
      bitmap.close();
      return new File([await blob], "avatar.jpg", { type: "image/jpeg" });
    } catch {
      // Fallback: load via <img> tag (handles more formats on some browsers)
    }

    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = async () => {
        try {
          const blob = await drawToCanvas(img);
          resolve(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
        } catch (err) {
          reject(err);
        } finally {
          URL.revokeObjectURL(url);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Cannot decode image"));
      };
      img.src = url;
    });
  }

  function drawToCanvas(source: ImageBitmap | HTMLImageElement): Promise<Blob> {
    const sw = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
    const sh = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_SIZE;
    canvas.height = AVATAR_SIZE;
    const ctx = canvas.getContext("2d")!;
    const scale = Math.max(AVATAR_SIZE / sw, AVATAR_SIZE / sh);
    const w = sw * scale;
    const h = sh * scale;
    ctx.drawImage(source, (AVATAR_SIZE - w) / 2, (AVATAR_SIZE - h) / 2, w, h);
    return new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Canvas export failed"))), "image/jpeg", 0.85)
    );
  }

  function handleRemoveAvatar() {
    deleteAvatar.mutate(undefined, {
      onSuccess: () => toast.success(t("avatarRemoved")),
    });
  }

  const avatarSrc = profile?.avatarUrl || profile?.image;

  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
      <h2
        className="mb-4 text-lg font-semibold text-parchment-200"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Public Profile
      </h2>
      <div className="space-y-4">
        {/* Avatar upload */}
        <div className="flex items-center gap-4">
          <UserAvatar size="xl" src={avatarSrc} name={profile?.name} />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadAvatar.isPending}
              >
                {uploadAvatar.isPending ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Upload className="mr-1.5 h-3.5 w-3.5" />
                )}
                {uploadAvatar.isPending ? t("uploading") : t("uploadPhoto")}
              </Button>
              {profile?.avatarUrl && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleRemoveAvatar}
                  disabled={deleteAvatar.isPending}
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  {t("removePhoto")}
                </Button>
              )}
            </div>
            <p className="text-xs text-parchment-600">{t("avatarHint")}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-parchment-500">Display Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            placeholder="Your display name"
            className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-parchment-500">Headline</label>
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            maxLength={100}
            placeholder="e.g. ZWDS Practitioner | Feng Shui Consultant"
            className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 flex items-center justify-between text-xs text-parchment-500">
            <span>Bio</span>
            <span className={bio.length > 180 ? "text-quantum-red" : ""}>{bio.length}/200</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
            rows={3}
            placeholder="Tell the community about yourself..."
            className="w-full resize-none rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-parchment-500">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={100}
            placeholder="e.g. Singapore"
            className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPublic ? (
              <Globe className="h-4 w-4 text-quantum-green" />
            ) : (
              <Lock className="h-4 w-4 text-parchment-600" />
            )}
            <span className="text-sm text-parchment-400">
              {isPublic ? "Profile is public" : "Profile is private"}
            </span>
          </div>
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`relative h-6 w-11 rounded-full transition-colors ${isPublic ? "bg-quantum-green/40" : "bg-celestial-700"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-parchment-200 transition-transform ${isPublic ? "left-5.5" : "left-0.5"}`}
            />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={updateProfile.isPending} size="sm">
            {updateProfile.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Profile
          </Button>
          {saved && <span className="text-xs text-quantum-green">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
