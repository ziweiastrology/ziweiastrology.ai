import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    const polls = await prisma.casePoll.findMany({
      where: {
        OR: [{ closesAt: null }, { closesAt: { gte: new Date() } }],
      },
      include: {
        options: {
          include: {
            _count: { select: { votes: true } },
          },
        },
        _count: { select: { votes: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Check which polls the current user has voted on
    let userVotes: Record<string, string> = {};
    if (session?.user?.id) {
      const votes = await prisma.casePollVote.findMany({
        where: {
          userId: session.user.id,
          pollId: { in: polls.map((p) => p.id) },
        },
      });
      userVotes = Object.fromEntries(
        votes.map((v) => [v.pollId, v.optionId])
      );
    }

    const pollsWithMeta = polls.map((poll) => ({
      ...poll,
      totalVotes: poll._count.votes,
      userVotedOptionId: userVotes[poll.id] || null,
      options: poll.options.map((opt) => ({
        id: opt.id,
        label: opt.label,
        voteCount: opt._count.votes,
      })),
      _count: undefined,
    }));

    return NextResponse.json({ polls: pollsWithMeta });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    const { question, options, caseId, closesAt } = await request.json();

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return NextResponse.json(
        { error: "Question and at least 2 options required" },
        { status: 400 }
      );
    }

    const poll = await prisma.casePoll.create({
      data: {
        question,
        caseId: caseId || null,
        closesAt: closesAt ? new Date(closesAt) : null,
        createdById: session.user.id,
        options: {
          create: options.map((label: string) => ({ label })),
        },
      },
      include: {
        options: true,
      },
    });

    return NextResponse.json(poll, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}
