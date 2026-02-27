import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { casePollVoteSchema } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ pollId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { success } = rateLimit(`poll-vote:${session.user.id}`, 10);
    if (!success) {
      return NextResponse.json(
        { error: "Too many votes. Please slow down." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = casePollVoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid vote data" },
        { status: 400 }
      );
    }

    const { pollId } = await params;
    const { optionId } = parsed.data;

    // Verify poll exists and is still open
    const poll = await prisma.casePoll.findUnique({
      where: { id: pollId },
      include: { options: true },
    });

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (poll.closesAt && poll.closesAt < new Date()) {
      return NextResponse.json({ error: "Poll is closed" }, { status: 400 });
    }

    // Verify option belongs to this poll
    const validOption = poll.options.find((o) => o.id === optionId);
    if (!validOption) {
      return NextResponse.json(
        { error: "Invalid option for this poll" },
        { status: 400 }
      );
    }

    // Check if user already voted
    const existing = await prisma.casePollVote.findUnique({
      where: { userId_pollId: { userId: session.user.id, pollId } },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Already voted on this poll" },
        { status: 409 }
      );
    }

    const vote = await prisma.casePollVote.create({
      data: {
        userId: session.user.id,
        optionId,
        pollId,
      },
    });

    return NextResponse.json(vote, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to vote" },
      { status: 500 }
    );
  }
}
