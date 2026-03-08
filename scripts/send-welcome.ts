import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({
    where: { name: { contains: "Derrick" } },
    select: { id: true, name: true },
  });

  if (!user) {
    console.log("User not found");
    return;
  }

  console.log("Found:", user.id, user.name);

  const name = user.name?.split(" ")[0] || "Explorer";

  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        type: "SYSTEM",
        title: "Welcome to ZiWei Astrology!",
        content: `Hi ${name}! Welcome to the Sovereign Calibration Engine. Your journey through the stars begins here. You have 3 free AI credits daily — ask ZiWei Sifu anything about your destiny.`,
        link: "/dashboard",
      },
      {
        userId: user.id,
        type: "SYSTEM",
        title: "Complete your profile",
        content: "Set up your profile to unlock the full experience — add your birth details for an accurate chart, choose your interests, and upload an avatar. The more we know, the better your readings.",
        link: "/settings",
      },
      {
        userId: user.id,
        type: "SYSTEM",
        title: "Explore the community",
        content: "Join discussions, share chart analyses, and connect with fellow ZWDS enthusiasts. Vote on posts, leave comments, and discover insights from practitioners around the world.",
        link: "/community",
      },
    ],
  });

  console.log("3 welcome notifications sent!");
}

main().then(() => prisma.$disconnect());
