import { PrismaClient } from "@prisma/client";
import { computeMatch } from "../src/lib/matching";

const prisma = new PrismaClient();

async function main() {
  console.log("Computing matches...");

  const users = await prisma.user.findMany({
    where: { birthDate: { not: null } },
    select: {
      id: true,
      location: true,
      birthDate: true,
      birthHour: true,
      birthMinute: true,
      birthLocation: true,
      birthGender: true,
      tags: { include: { tag: true } },
    },
  });

  console.log(`Found ${users.length} users with birth data`);

  let count = 0;
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const a = users[i];
      const b = users[j];

      const result = computeMatch(
        { id: a.id, location: a.location, tags: a.tags },
        { id: b.id, location: b.location, tags: b.tags }
      );

      await prisma.userMatch.upsert({
        where: {
          userAId_userBId: { userAId: a.id, userBId: b.id },
        },
        update: {
          ...result,
          calculatedAt: new Date(),
        },
        create: {
          userAId: a.id,
          userBId: b.id,
          ...result,
        },
      });

      count++;
    }
  }

  console.log(`Computed ${count} matches`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
