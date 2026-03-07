import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [user, recentPosts, recentComments, enrollments, bookmarkCount] =
      await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            tier: true,
            credits: true,
            birthDate: true,
            birthHour: true,
            birthMinute: true,
            birthLocation: true,
            birthGender: true,
            createdAt: true,
          },
        }),
        prisma.post.findMany({
          where: { authorId: userId },
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            title: true,
            type: true,
            createdAt: true,
            _count: { select: { comments: true, votes: true } },
          },
        }),
        prisma.comment.findMany({
          where: { authorId: userId },
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            content: true,
            createdAt: true,
            post: { select: { id: true, title: true } },
          },
        }),
        prisma.enrollment.findMany({
          where: { userId },
          include: {
            course: {
              select: { id: true, title: true, slug: true, level: true },
            },
          },
          orderBy: { updatedAt: "desc" },
        }),
        prisma.bookmark.count({ where: { userId } }),
      ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user,
      recentPosts,
      recentComments,
      enrollments,
      bookmarkCount,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
