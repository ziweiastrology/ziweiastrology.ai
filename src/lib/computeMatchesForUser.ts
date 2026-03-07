import { prisma } from "@/lib/prisma";
import { computeMatch } from "@/lib/matching";

/**
 * Compute matches for a user against existing users with chart data.
 * Called after registration or birth info update.
 * Limits to top 50 candidate users to avoid N^2 explosion.
 */
export async function computeMatchesForUser(userId: string) {
  // 1. Fetch the user with their tags and check they have birth data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      birthDate: true,
      birthHour: true,
      location: true,
      tags: {
        include: { tag: true },
      },
    },
  });

  // 2. If no birthDate or birthHour, return early
  if (!user || user.birthDate == null || user.birthHour == null) {
    return;
  }

  // 3. Fetch up to 50 other users who have birthDate AND birthHour
  const candidates = await prisma.user.findMany({
    where: {
      id: { not: userId },
      birthDate: { not: null },
      birthHour: { not: null },
    },
    select: {
      id: true,
      location: true,
      tags: {
        include: { tag: true },
      },
    },
    take: 50,
  });

  if (candidates.length === 0) return;

  // Build UserForMatch for current user (no chart palaces stored in DB yet)
  const userForMatch = {
    id: user.id,
    location: user.location,
    tags: user.tags,
  };

  // 4. For each candidate, compute match and upsert both directions
  for (const candidate of candidates) {
    const candidateForMatch = {
      id: candidate.id,
      location: candidate.location,
      tags: candidate.tags,
    };

    const result = computeMatch(userForMatch, candidateForMatch);

    // 5. Upsert userA -> userB
    await prisma.userMatch.upsert({
      where: {
        userAId_userBId: { userAId: userId, userBId: candidate.id },
      },
      create: {
        userAId: userId,
        userBId: candidate.id,
        overallScore: result.overallScore,
        bizScore: result.bizScore,
        friendScore: result.friendScore,
        guirenScore: result.guirenScore,
        sharedTags: result.sharedTags,
      },
      update: {
        overallScore: result.overallScore,
        bizScore: result.bizScore,
        friendScore: result.friendScore,
        guirenScore: result.guirenScore,
        sharedTags: result.sharedTags,
        calculatedAt: new Date(),
      },
    });

    // Upsert userB -> userA (reverse direction)
    await prisma.userMatch.upsert({
      where: {
        userAId_userBId: { userAId: candidate.id, userBId: userId },
      },
      create: {
        userAId: candidate.id,
        userBId: userId,
        overallScore: result.overallScore,
        bizScore: result.bizScore,
        friendScore: result.friendScore,
        guirenScore: result.guirenScore,
        sharedTags: result.sharedTags,
      },
      update: {
        overallScore: result.overallScore,
        bizScore: result.bizScore,
        friendScore: result.friendScore,
        guirenScore: result.guirenScore,
        sharedTags: result.sharedTags,
        calculatedAt: new Date(),
      },
    });
  }
}
