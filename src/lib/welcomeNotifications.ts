import { prisma } from "@/lib/prisma";

/**
 * Send welcome notifications to a newly registered user.
 * Called after both email/password registration and Google OAuth sign-up.
 */
export async function sendWelcomeNotifications(userId: string, userName?: string | null) {
  const name = userName?.split(" ")[0] || "Explorer";

  await prisma.notification.createMany({
    data: [
      {
        userId,
        type: "SYSTEM",
        title: "Welcome to ZiWei Astrology!",
        content: `Hi ${name}! Welcome to the Sovereign Calibration Engine. Your journey through the stars begins here. You have 3 free AI credits daily — ask ZiWei Sifu anything about your destiny.`,
        link: "/dashboard",
      },
      {
        userId,
        type: "SYSTEM",
        title: "Complete your profile",
        content: "Set up your profile to unlock the full experience — add your birth details for an accurate chart, choose your interests, and upload an avatar. The more we know, the better your readings.",
        link: "/settings",
      },
      {
        userId,
        type: "SYSTEM",
        title: "Explore the community",
        content: "Join discussions, share chart analyses, and connect with fellow ZWDS enthusiasts. Vote on posts, leave comments, and discover insights from practitioners around the world.",
        link: "/community",
      },
    ],
  });
}
