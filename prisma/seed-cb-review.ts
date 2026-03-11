/**
 * Seed script: Create ClickBank review user with a pre-loaded purchase.
 *
 * Usage:  npx tsx prisma/seed-cb-review.ts
 *
 * What it does:
 * 1. Creates user  review@ziweiastrology.ai  (password: ZiweiReview2026!)
 * 2. Marks email as verified
 * 3. Pre-loads demo birth data (1990-08-15, hour 5 巳时, male)
 * 4. Creates a fake ClickBank purchase in PENDING status
 *    so the ClaimWizard at /reading/thank-you can pick it up.
 *
 * The reviewer can then visit:
 *   /reading/thank-you?cbreceipt=CB-REVIEW-DEMO-2026&cbemail=review@ziweiastrology.ai
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const REVIEW_EMAIL = "review@ziweiastrology.ai";
const REVIEW_PASSWORD = "ZiweiReview2026!";
const CB_RECEIPT = "CB-REVIEW-DEMO-2026";
const CB_TRANSACTION_ID = "CB-TXN-REVIEW-2026";

async function main() {
  const passwordHash = await bcrypt.hash(REVIEW_PASSWORD, 12);

  // Upsert user
  const user = await prisma.user.upsert({
    where: { email: REVIEW_EMAIL },
    update: {
      name: "ClickBank Reviewer",
      password: passwordHash,
      emailVerified: new Date(),
      birthDate: new Date("1990-08-15"),
      birthHour: 5,     // 巳时 (9-11am)
      birthMinute: 30,
      birthGender: "M",
      birthLocation: "New York, USA",
      credits: 50,
      tier: "FREE",
    },
    create: {
      name: "ClickBank Reviewer",
      email: REVIEW_EMAIL,
      password: passwordHash,
      emailVerified: new Date(),
      birthDate: new Date("1990-08-15"),
      birthHour: 5,
      birthMinute: 30,
      birthGender: "M",
      birthLocation: "New York, USA",
      credits: 50,
      tier: "FREE",
    },
  });

  console.log(`✓ User created/updated: ${user.id} (${user.email})`);

  // Upsert ClickBank purchase
  const purchase = await prisma.clickBankPurchase.upsert({
    where: { cbReceipt: CB_RECEIPT },
    update: {
      email: REVIEW_EMAIL,
      status: "PENDING",
      userId: null,
      reportId: null,
      claimedAt: null,
    },
    create: {
      cbTransactionId: CB_TRANSACTION_ID,
      cbReceipt: CB_RECEIPT,
      email: REVIEW_EMAIL,
      amount: 27.0,
      productId: "ai_destiny_reading",
      status: "PENDING",
      ipnPayload: {
        transactionType: "TEST_SALE",
        vendor: "ziweiai",
        receipt: CB_RECEIPT,
      },
    },
  });

  console.log(`✓ ClickBank purchase created/reset: ${purchase.id} (receipt: ${CB_RECEIPT})`);
  console.log();
  console.log("=== Review Credentials ===");
  console.log(`Email:    ${REVIEW_EMAIL}`);
  console.log(`Password: ${REVIEW_PASSWORD}`);
  console.log();
  console.log("=== Test Flow ===");
  console.log("1. Sales page:  https://ziweiastrology.ai/reading");
  console.log(`2. Thank-you:   https://ziweiastrology.ai/reading/thank-you?cbreceipt=${CB_RECEIPT}&cbemail=${REVIEW_EMAIL}`);
  console.log("3. Login with credentials above when prompted");
  console.log("4. Birth data is pre-loaded — just confirm and generate");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
