import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const editorial = await prisma.user.findFirst({
    where: { email: "editorial@ziweiastrology.ai" },
    select: { id: true, name: true },
  });

  const derrick = await prisma.user.findFirst({
    where: { name: { contains: "Derrick" } },
    select: { id: true, name: true },
  });

  if (!editorial || !derrick) {
    console.log("Users not found:", { editorial, derrick });
    return;
  }

  console.log(`Sending DM from ${editorial.name} to ${derrick.name}...`);

  const conversation = await prisma.dMConversation.create({
    data: {
      participants: {
        connect: [
          { id: editorial.id },
          { id: derrick.id },
        ],
      },
      messages: {
        create: {
          senderId: editorial.id,
          content: "Welcome to ZiWei Astrology! I'm the editorial team. Feel free to reach out if you have any questions about your chart or the platform. We're here to help you on your destiny journey!",
        },
      },
    },
  });

  console.log("Conversation created:", conversation.id);
  console.log("Test DM sent!");
}

main().then(() => prisma.$disconnect());
