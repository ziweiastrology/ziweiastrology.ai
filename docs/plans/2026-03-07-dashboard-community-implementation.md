# Dashboard + Community + Messaging Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a social ecosystem with user profiles, Reddit-style community, messaging (inbox + DMs), and energy-based user matching.

**Architecture:** Prisma-Only (PostgreSQL + polling). No extra services. Extend existing User model, add Tag/Follow/Notification/DM/UserMatch models. Community pages wired to real APIs. Dashboard enhanced with social widgets.

**Tech Stack:** Next.js 16 (App Router), Prisma 6, TanStack Query v5, Zustand 5, Tailwind CSS v4, Zod 4, lucide-react

**Design Doc:** `docs/plans/2026-03-07-dashboard-community-redesign.md`

---

## Task 1: Schema — User Profile + Tag System

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/seed-tags.ts`

**Step 1: Add profile fields to User model**

In `prisma/schema.prisma`, add to the User model (after `birthGender`):

```prisma
  // Profile
  bio             String?
  headline        String?
  location        String?
  isProfilePublic Boolean  @default(true)
  avatarUrl       String?
```

**Step 2: Add new enums and models**

After the existing enums block, add:

```prisma
enum TagCategory {
  INDUSTRY
  INTEREST
  GOAL
  ASTRO
}

enum NotificationType {
  SYSTEM
  VOTE
  COMMENT
  FOLLOW
  MATCH
}
```

After the Bookmark model, add Tag + UserTag:

```prisma
// ========================
// Tags
// ========================

model Tag {
  id        String      @id @default(cuid())
  name      String
  nameCn    String
  category  TagCategory
  users     UserTag[]
  createdAt DateTime    @default(now())

  @@unique([name, category])
}

model UserTag {
  id        String   @id @default(cuid())
  userId    String
  tagId     String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tag       Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, tagId])
}
```

**Step 3: Add User relations for new models**

In the User model, add these relations:

```prisma
  tags             UserTag[]
  notifications    Notification[]
  sentMessages     DirectMessage[]
  dmConversations  DMConversation[] @relation("DMParticipants")
  followers        Follow[]         @relation("Following")
  following        Follow[]         @relation("Followers")
  matchesAsA       UserMatch[]      @relation("MatchesAsA")
  matchesAsB       UserMatch[]      @relation("MatchesAsB")
```

**Step 4: Add Post enhancements**

In the Post model, add after `pinned`:

```prisma
  tags      String[]
  viewCount Int      @default(0)
```

**Step 5: Add Follow, Notification, DM, UserMatch models**

```prisma
// ========================
// Social — Follow
// ========================

model Follow {
  id          String   @id @default(cuid())
  followerId  String
  followingId String
  follower    User     @relation("Followers", fields: [followerId], references: [id], onDelete: Cascade)
  following   User     @relation("Following", fields: [followingId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())

  @@unique([followerId, followingId])
  @@index([followingId])
}

// ========================
// Notifications
// ========================

model Notification {
  id        String           @id @default(cuid())
  userId    String
  user      User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      NotificationType
  title     String
  content   String
  link      String?
  read      Boolean          @default(false)
  createdAt DateTime         @default(now())

  @@index([userId, read, createdAt])
}

// ========================
// Direct Messages
// ========================

model DMConversation {
  id           String          @id @default(cuid())
  participants User[]          @relation("DMParticipants")
  messages     DirectMessage[]
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
}

model DirectMessage {
  id             String         @id @default(cuid())
  conversationId String
  conversation   DMConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  senderId       String
  sender         User           @relation(fields: [senderId], references: [id], onDelete: Cascade)
  content        String         @db.Text
  readAt         DateTime?
  createdAt      DateTime       @default(now())

  @@index([conversationId, createdAt])
  @@index([senderId])
}

// ========================
// Energy Matching
// ========================

model UserMatch {
  id           String   @id @default(cuid())
  userAId      String
  userBId      String
  userA        User     @relation("MatchesAsA", fields: [userAId], references: [id], onDelete: Cascade)
  userB        User     @relation("MatchesAsB", fields: [userBId], references: [id], onDelete: Cascade)
  overallScore Int
  bizScore     Int
  friendScore  Int
  guirenScore  Int
  sharedTags   String[]
  calculatedAt DateTime @default(now())

  @@unique([userAId, userBId])
  @@index([userAId, overallScore])
  @@index([userBId, overallScore])
}
```

**Step 6: Run migration**

```bash
npx prisma db push
```

**Step 7: Create tag seed file**

Create `prisma/seed-tags.ts`:

```typescript
import { PrismaClient, TagCategory } from "@prisma/client";

const prisma = new PrismaClient();

const TAGS = [
  // INDUSTRY
  { name: "tech", nameCn: "科技", category: TagCategory.INDUSTRY },
  { name: "finance", nameCn: "金融", category: TagCategory.INDUSTRY },
  { name: "education", nameCn: "教育", category: TagCategory.INDUSTRY },
  { name: "healthcare", nameCn: "医疗", category: TagCategory.INDUSTRY },
  { name: "art-design", nameCn: "艺术设计", category: TagCategory.INDUSTRY },
  { name: "real-estate", nameCn: "房地产", category: TagCategory.INDUSTRY },
  { name: "freelance", nameCn: "自由职业", category: TagCategory.INDUSTRY },
  { name: "ecommerce", nameCn: "电商", category: TagCategory.INDUSTRY },
  { name: "food-bev", nameCn: "餐饮", category: TagCategory.INDUSTRY },
  { name: "legal", nameCn: "法律", category: TagCategory.INDUSTRY },
  { name: "media", nameCn: "媒体", category: TagCategory.INDUSTRY },
  { name: "consulting", nameCn: "咨询", category: TagCategory.INDUSTRY },

  // INTEREST
  { name: "ziwei-doushu", nameCn: "紫微斗数", category: TagCategory.INTEREST },
  { name: "feng-shui", nameCn: "风水", category: TagCategory.INTEREST },
  { name: "meditation", nameCn: "冥想", category: TagCategory.INTEREST },
  { name: "investing", nameCn: "投资理财", category: TagCategory.INTEREST },
  { name: "fitness", nameCn: "健身", category: TagCategory.INTEREST },
  { name: "travel", nameCn: "旅行", category: TagCategory.INTEREST },
  { name: "reading", nameCn: "读书", category: TagCategory.INTEREST },
  { name: "music", nameCn: "音乐", category: TagCategory.INTEREST },
  { name: "photography", nameCn: "摄影", category: TagCategory.INTEREST },
  { name: "astrology", nameCn: "占星", category: TagCategory.INTEREST },
  { name: "bazi", nameCn: "八字", category: TagCategory.INTEREST },
  { name: "tarot", nameCn: "塔罗", category: TagCategory.INTEREST },

  // GOAL
  { name: "find-cofounder", nameCn: "找创业伙伴", category: TagCategory.GOAL },
  { name: "find-guiren", nameCn: "找贵人", category: TagCategory.GOAL },
  { name: "learn-astrology", nameCn: "学命理", category: TagCategory.GOAL },
  { name: "make-friends", nameCn: "交朋友", category: TagCategory.GOAL },
  { name: "love-guidance", nameCn: "感情指导", category: TagCategory.GOAL },
  { name: "career-planning", nameCn: "职业规划", category: TagCategory.GOAL },
  { name: "spiritual-growth", nameCn: "灵性成长", category: TagCategory.GOAL },
  { name: "networking", nameCn: "拓展人脉", category: TagCategory.GOAL },
];

async function main() {
  console.log("Seeding tags...");
  for (const tag of TAGS) {
    await prisma.tag.upsert({
      where: { name_category: { name: tag.name, category: tag.category } },
      update: { nameCn: tag.nameCn },
      create: tag,
    });
  }
  console.log(`Seeded ${TAGS.length} tags`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Step 8: Run seed**

```bash
npx tsx prisma/seed-tags.ts
```

**Step 9: Commit**

```bash
git add prisma/schema.prisma prisma/seed-tags.ts
git commit -m "feat: extend schema — profile fields, tags, follow, notifications, DMs, energy matching"
```

---

## Task 2: Tier Limits Config + Helpers

**Files:**
- Modify: `src/lib/credits.ts`
- Create: `src/lib/tierLimits.ts`

**Step 1: Create tier limits config**

Create `src/lib/tierLimits.ts`:

```typescript
import { Tier } from "@prisma/client";

export const TIER_LIMITS = {
  [Tier.FREE]: {
    postsPerDay: 0,
    viewPostsPerDay: 3,
    canVote: false,
    canComment: false,
    matchesPerDay: 0,
    dmsPerDay: 0,
    canSendDm: false,
    groupsJoin: 1,
    groupsCreate: 0,
    matchReadingsPerDay: 0,
    maxTags: 3,
    canUploadAvatar: false,
    canViewFullProfile: false,
    canViewMatchScore: false,
  },
  [Tier.BASIC]: {
    postsPerDay: 3,
    viewPostsPerDay: Infinity,
    canVote: true,
    canComment: true,
    matchesPerDay: 3,
    dmsPerDay: 10,
    canSendDm: true,
    groupsJoin: 5,
    groupsCreate: 0,
    matchReadingsPerDay: 0,
    maxTags: 10,
    canUploadAvatar: true,
    canViewFullProfile: true,
    canViewMatchScore: false,
  },
  [Tier.PREMIUM]: {
    postsPerDay: 10,
    viewPostsPerDay: Infinity,
    canVote: true,
    canComment: true,
    matchesPerDay: 10,
    dmsPerDay: 50,
    canSendDm: true,
    groupsJoin: 15,
    groupsCreate: 1,
    matchReadingsPerDay: 3,
    maxTags: 20,
    canUploadAvatar: true,
    canViewFullProfile: true,
    canViewMatchScore: true,
  },
  [Tier.SIFU]: {
    postsPerDay: Infinity,
    viewPostsPerDay: Infinity,
    canVote: true,
    canComment: true,
    matchesPerDay: Infinity,
    dmsPerDay: Infinity,
    canSendDm: true,
    groupsJoin: Infinity,
    groupsCreate: Infinity,
    matchReadingsPerDay: Infinity,
    maxTags: Infinity,
    canUploadAvatar: true,
    canViewFullProfile: true,
    canViewMatchScore: true,
  },
} as const;

export type TierLimits = (typeof TIER_LIMITS)[Tier];

export function getTierLimits(tier: Tier): TierLimits {
  return TIER_LIMITS[tier];
}
```

**Step 2: Commit**

```bash
git add src/lib/tierLimits.ts
git commit -m "feat: add tier limits config for all feature gates"
```

---

## Task 3: Profile API Routes

**Files:**
- Create: `src/lib/validations/profile.ts`
- Create: `src/app/api/user/profile/route.ts`
- Create: `src/app/api/user/tags/route.ts`
- Create: `src/app/api/user/[userId]/route.ts`
- Create: `src/app/api/follow/route.ts`

**Step 1: Create profile validation schemas**

Create `src/lib/validations/profile.ts`:

```typescript
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  bio: z.string().max(200).optional(),
  headline: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  isProfilePublic: z.boolean().optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

export const updateTagsSchema = z.object({
  tagIds: z.array(z.string()).max(20),
});

export const followSchema = z.object({
  targetUserId: z.string(),
});
```

**Step 2: Create profile update API**

Create `src/app/api/user/profile/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/validations/profile";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      headline: true,
      location: true,
      isProfilePublic: true,
      avatarUrl: true,
      tier: true,
      credits: true,
      birthDate: true,
      birthHour: true,
      birthMinute: true,
      birthLocation: true,
      birthGender: true,
      createdAt: true,
      tags: {
        include: { tag: true },
      },
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
    select: {
      id: true, name: true, bio: true, headline: true,
      location: true, isProfilePublic: true, avatarUrl: true,
    },
  });

  return NextResponse.json(user);
}
```

**Step 3: Create tags API**

Create `src/app/api/user/tags/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";
import { updateTagsSchema } from "@/lib/validations/profile";

// GET all available tags
export async function GET() {
  const tags = await prisma.tag.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(tags);
}

// PUT user's selected tags
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = updateTagsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true },
  });
  if (!user) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const limits = getTierLimits(user.tier);
  if (parsed.data.tagIds.length > limits.maxTags) {
    return NextResponse.json(
      { error: "tag_limit", max: limits.maxTags },
      { status: 403 }
    );
  }

  // Replace all user tags atomically
  await prisma.$transaction([
    prisma.userTag.deleteMany({ where: { userId: session.user.id } }),
    ...parsed.data.tagIds.map((tagId) =>
      prisma.userTag.create({
        data: { userId: session.user.id!, tagId },
      })
    ),
  ]);

  const userTags = await prisma.userTag.findMany({
    where: { userId: session.user.id },
    include: { tag: true },
  });

  return NextResponse.json(userTags);
}
```

**Step 4: Create public user profile API**

Create `src/app/api/user/[userId]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      headline: true,
      location: true,
      isProfilePublic: true,
      avatarUrl: true,
      tier: true,
      createdAt: true,
      tags: { include: { tag: true } },
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Check if viewer follows this user
  let isFollowing = false;
  if (session?.user?.id && session.user.id !== userId) {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });
    isFollowing = !!follow;
  }

  // Check match score if viewer has premium+
  let matchScore = null;
  if (session?.user?.id && session.user.id !== userId) {
    const viewer = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { tier: true },
    });
    const limits = getTierLimits(viewer?.tier ?? "FREE");

    if (limits.canViewMatchScore) {
      matchScore = await prisma.userMatch.findFirst({
        where: {
          OR: [
            { userAId: session.user.id, userBId: userId },
            { userAId: userId, userBId: session.user.id },
          ],
        },
      });
    }
  }

  return NextResponse.json({ ...user, isFollowing, matchScore });
}
```

**Step 5: Create follow API**

Create `src/app/api/follow/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { followSchema } from "@/lib/validations/profile";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = followSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  if (parsed.data.targetUserId === session.user.id) {
    return NextResponse.json({ error: "cannot_follow_self" }, { status: 400 });
  }

  // Toggle follow
  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: parsed.data.targetUserId,
      },
    },
  });

  if (existing) {
    await prisma.follow.delete({ where: { id: existing.id } });
    return NextResponse.json({ following: false });
  }

  await prisma.follow.create({
    data: {
      followerId: session.user.id,
      followingId: parsed.data.targetUserId,
    },
  });

  // Create notification
  await prisma.notification.create({
    data: {
      userId: parsed.data.targetUserId,
      type: "FOLLOW",
      title: "新关注",
      content: `${session.user.name || "Someone"} 关注了你`,
      link: `/profile/${session.user.id}`,
    },
  });

  return NextResponse.json({ following: true });
}
```

**Step 6: Commit**

```bash
git add src/lib/validations/profile.ts src/app/api/user/profile/ src/app/api/user/tags/ src/app/api/user/\[userId\]/ src/app/api/follow/
git commit -m "feat: profile, tags, public user, and follow API routes"
```

---

## Task 4: Notification + DM API Routes

**Files:**
- Create: `src/app/api/notifications/route.ts`
- Create: `src/app/api/notifications/unread/route.ts`
- Create: `src/app/api/messages/route.ts`
- Create: `src/app/api/messages/[conversationId]/route.ts`
- Create: `src/app/api/messages/unread/route.ts`

**Step 1: Notifications API**

Create `src/app/api/notifications/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const cursor = request.nextUrl.searchParams.get("cursor");
  const limit = 20;

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = notifications.length > limit;
  if (hasMore) notifications.pop();

  return NextResponse.json({
    notifications,
    nextCursor: hasMore ? notifications[notifications.length - 1].id : null,
  });
}

// Mark notifications as read
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { ids } = await request.json();

  if (ids && Array.isArray(ids)) {
    await prisma.notification.updateMany({
      where: { id: { in: ids }, userId: session.user.id },
      data: { read: true },
    });
  } else {
    // Mark all as read
    await prisma.notification.updateMany({
      where: { userId: session.user.id, read: false },
      data: { read: true },
    });
  }

  return NextResponse.json({ success: true });
}
```

**Step 2: Unread count API**

Create `src/app/api/notifications/unread/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [notifCount, dmCount] = await Promise.all([
    prisma.notification.count({
      where: { userId: session.user.id, read: false },
    }),
    prisma.directMessage.count({
      where: {
        conversation: {
          participants: { some: { id: session.user.id } },
        },
        senderId: { not: session.user.id },
        readAt: null,
      },
    }),
  ]);

  return NextResponse.json({ notifications: notifCount, messages: dmCount });
}
```

**Step 3: DM conversations list API**

Create `src/app/api/messages/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

// GET conversations list
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const conversations = await prisma.dMConversation.findMany({
    where: {
      participants: { some: { id: session.user.id } },
    },
    include: {
      participants: {
        select: { id: true, name: true, image: true, avatarUrl: true, tier: true },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, senderId: true, createdAt: true, readAt: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(conversations);
}

// POST — start new conversation or send message
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true },
  });
  const limits = getTierLimits(user?.tier ?? "FREE");

  if (!limits.canSendDm) {
    return NextResponse.json({ error: "tier_required", minTier: "BASIC" }, { status: 403 });
  }

  // Check daily DM limit
  if (limits.dmsPerDay !== Infinity) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sentToday = await prisma.directMessage.count({
      where: {
        senderId: session.user.id,
        createdAt: { gte: today },
      },
    });
    if (sentToday >= limits.dmsPerDay) {
      return NextResponse.json({ error: "dm_limit_reached", limit: limits.dmsPerDay }, { status: 429 });
    }
  }

  const { recipientId, content } = await request.json();

  if (!recipientId || !content?.trim()) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  // Find existing conversation or create new
  let conversation = await prisma.dMConversation.findFirst({
    where: {
      AND: [
        { participants: { some: { id: session.user.id } } },
        { participants: { some: { id: recipientId } } },
      ],
    },
  });

  if (!conversation) {
    conversation = await prisma.dMConversation.create({
      data: {
        participants: {
          connect: [{ id: session.user.id }, { id: recipientId }],
        },
      },
    });
  }

  const message = await prisma.directMessage.create({
    data: {
      conversationId: conversation.id,
      senderId: session.user.id,
      content: content.trim(),
    },
  });

  // Update conversation timestamp
  await prisma.dMConversation.update({
    where: { id: conversation.id },
    data: { updatedAt: new Date() },
  });

  // Notification
  await prisma.notification.create({
    data: {
      userId: recipientId,
      type: "SYSTEM",
      title: "新私信",
      content: `${session.user.name || "Someone"} 给你发了私信`,
      link: `/messages`,
    },
  });

  return NextResponse.json({ conversationId: conversation.id, message });
}
```

**Step 4: Conversation messages API**

Create `src/app/api/messages/[conversationId]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  const { conversationId } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Verify user is participant
  const conversation = await prisma.dMConversation.findFirst({
    where: {
      id: conversationId,
      participants: { some: { id: session.user.id } },
    },
    include: {
      participants: {
        select: { id: true, name: true, image: true, avatarUrl: true, tier: true },
      },
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const messages = await prisma.directMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: { id: true, name: true, image: true, avatarUrl: true },
      },
    },
  });

  // Mark messages from other person as read
  await prisma.directMessage.updateMany({
    where: {
      conversationId,
      senderId: { not: session.user.id },
      readAt: null,
    },
    data: { readAt: new Date() },
  });

  return NextResponse.json({ conversation, messages });
}
```

**Step 5: Commit**

```bash
git add src/app/api/notifications/ src/app/api/messages/
git commit -m "feat: notification and DM API routes with tier gating"
```

---

## Task 5: Community API — Wire Up Votes, Comments, Search

**Files:**
- Modify: `src/app/api/community/posts/route.ts` (add search, sorting, pagination)
- Create: `src/app/api/community/posts/[id]/route.ts` (single post + view count)
- Modify: `src/app/api/community/posts/[id]/vote/route.ts` (wire up + notification)
- Modify: `src/app/api/community/posts/[id]/comments/route.ts` (wire up + notification)

**Step 1: Enhance posts GET with search, sorting, infinite scroll**

Read the existing `src/app/api/community/posts/route.ts`, then modify the GET handler to support:
- `?sort=hot|new|following` — hot = score desc, new = createdAt desc, following = posts from followed users
- `?search=keyword` — full-text search on title + content
- `?cursor=postId` — cursor-based pagination
- `?tags=tag1,tag2` — filter by post tags
- Keep existing `?type=` and `?groupId=` filters

**Step 2: Add single post GET with view count increment**

Create `src/app/api/community/posts/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  const post = await prisma.post.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
    include: {
      author: {
        select: {
          id: true, name: true, image: true, avatarUrl: true,
          tier: true, headline: true, location: true,
          tags: { include: { tag: true }, take: 5 },
        },
      },
      comments: {
        where: { parentId: null },
        include: {
          author: {
            select: { id: true, name: true, image: true, avatarUrl: true, tier: true },
          },
          votes: true,
          replies: {
            include: {
              author: {
                select: { id: true, name: true, image: true, avatarUrl: true, tier: true },
              },
              votes: true,
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      votes: true,
      _count: { select: { comments: true } },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Check if current user voted
  let userVote = null;
  if (session?.user?.id) {
    const vote = await prisma.vote.findUnique({
      where: { userId_postId: { userId: session.user.id, postId: id } },
    });
    userVote = vote?.value ?? null;
  }

  const score = post.votes.reduce((sum, v) => sum + v.value, 0);

  return NextResponse.json({ ...post, score, userVote });
}
```

**Step 3: Wire up vote API with notification**

In existing vote route, ensure it:
- Creates/updates/deletes vote
- Calculates new score
- Sends notification to post author when score crosses thresholds (10, 25, 50, 100)

**Step 4: Wire up comments API with notification**

In existing comments route, ensure it:
- Creates comment with parentId support (nested replies)
- Sends notification to post author + parent comment author

**Step 5: Commit**

```bash
git add src/app/api/community/
git commit -m "feat: community API — search, sorting, pagination, votes, comments with notifications"
```

---

## Task 6: React Hooks (TanStack Query)

**Files:**
- Create: `src/hooks/useProfile.ts`
- Create: `src/hooks/useNotifications.ts`
- Create: `src/hooks/useMessages.ts`
- Create: `src/hooks/useCommunity.ts`
- Create: `src/hooks/useFollow.ts`
- Create: `src/hooks/useMatches.ts`

**Step 1: Profile hooks**

Create `src/hooks/useProfile.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetch("/api/user/profile").then((r) => r.json()),
    staleTime: 60_000,
  });
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => fetch(`/api/user/${userId}`).then((r) => r.json()),
    enabled: !!userId,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });
}

export function useAvailableTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetch("/api/user/tags").then((r) => r.json()),
    staleTime: 300_000,
  });
}

export function useUpdateTags() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tagIds: string[]) =>
      fetch("/api/user/tags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagIds }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });
}
```

**Step 2: Notification + message hooks**

Create `src/hooks/useNotifications.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUnreadCounts() {
  return useQuery({
    queryKey: ["unread-counts"],
    queryFn: () => fetch("/api/notifications/unread").then((r) => r.json()),
    refetchInterval: 60_000, // Poll every 60s
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetch("/api/notifications").then((r) => r.json()),
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids?: string[]) =>
      fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["unread-counts"] });
    },
  });
}
```

Create `src/hooks/useMessages.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useConversations() {
  return useQuery({
    queryKey: ["dm-conversations"],
    queryFn: () => fetch("/api/messages").then((r) => r.json()),
  });
}

export function useConversation(conversationId: string) {
  return useQuery({
    queryKey: ["dm-conversation", conversationId],
    queryFn: () => fetch(`/api/messages/${conversationId}`).then((r) => r.json()),
    enabled: !!conversationId,
    refetchInterval: 15_000, // Poll every 15s when viewing
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { recipientId?: string; conversationId?: string; content: string }) =>
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["dm-conversations"] });
      if (data.conversationId) {
        qc.invalidateQueries({ queryKey: ["dm-conversation", data.conversationId] });
      }
    },
  });
}
```

**Step 3: Follow + community + match hooks**

Create `src/hooks/useFollow.ts`:

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleFollow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (targetUserId: string) =>
      fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId }),
      }).then((r) => r.json()),
    onSuccess: (_, targetUserId) => {
      qc.invalidateQueries({ queryKey: ["user-profile", targetUserId] });
      qc.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
}
```

Create `src/hooks/useCommunity.ts`:

```typescript
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FeedParams {
  sort?: "hot" | "new" | "following";
  type?: string;
  search?: string;
  tags?: string[];
}

export function useFeed(params: FeedParams = {}) {
  const searchParams = new URLSearchParams();
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.type) searchParams.set("type", params.type);
  if (params.search) searchParams.set("search", params.search);
  if (params.tags?.length) searchParams.set("tags", params.tags.join(","));

  return useInfiniteQuery({
    queryKey: ["community-feed", params],
    queryFn: ({ pageParam }) => {
      if (pageParam) searchParams.set("cursor", pageParam);
      return fetch(`/api/community/posts?${searchParams}`).then((r) => r.json());
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

export function usePost(postId: string) {
  return useInfiniteQuery({
    queryKey: ["post", postId],
    queryFn: () => fetch(`/api/community/posts/${postId}`).then((r) => r.json()),
    getNextPageParam: () => undefined,
    initialPageParam: undefined,
    enabled: !!postId,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; content: string; type: string; tags?: string[]; groupId?: string }) =>
      fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community-feed"] }),
  });
}

export function useVote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId, value }: { postId?: string; commentId?: string; value: 1 | -1 }) => {
      const url = postId
        ? `/api/community/posts/${postId}/vote`
        : `/api/community/posts/_/comments/${commentId}/vote`;
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      }).then((r) => r.json());
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-feed"] });
      qc.invalidateQueries({ queryKey: ["post"] });
    },
  });
}

export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, content, parentId }: { postId: string; content: string; parentId?: string }) =>
      fetch(`/api/community/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, parentId }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["post"] }),
  });
}
```

Create `src/hooks/useMatches.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";

export function useMyMatches(limit = 3) {
  return useQuery({
    queryKey: ["my-matches", limit],
    queryFn: () => fetch(`/api/matches?limit=${limit}`).then((r) => r.json()),
    staleTime: 300_000, // 5 min
  });
}
```

**Step 4: Commit**

```bash
git add src/hooks/useProfile.ts src/hooks/useNotifications.ts src/hooks/useMessages.ts src/hooks/useFollow.ts src/hooks/useCommunity.ts src/hooks/useMatches.ts
git commit -m "feat: TanStack Query hooks for profile, notifications, DMs, community, follow, matches"
```

---

## Task 7: Energy Match Algorithm + API

**Files:**
- Create: `src/lib/matching.ts`
- Create: `src/app/api/matches/route.ts`
- Create: `scripts/compute-matches.ts`

**Step 1: Create matching algorithm**

Create `src/lib/matching.ts`:

```typescript
import { TagCategory } from "@prisma/client";

interface UserForMatch {
  id: string;
  location: string | null;
  tags: { tag: { name: string; category: TagCategory } }[];
  // Chart data (from computing on their birth info)
  chartPalaces?: {
    name: string;
    stars: string[];
    energy: number;
    state: string; // "lu" | "quan" | "ke" | "ji" | "neutral"
  }[];
}

interface MatchResult {
  overallScore: number;
  bizScore: number;
  friendScore: number;
  guirenScore: number;
  sharedTags: string[];
}

const PALACE_MAP: Record<string, string> = {
  Career: "官禄",
  Wealth: "财帛",
  Life: "命宫",
  Friends: "交友",
  Karma: "福德",
};

export function computeMatch(userA: UserForMatch, userB: UserForMatch): MatchResult {
  const tagScore = computeTagScore(userA, userB);
  const goalScore = computeGoalScore(userA, userB);
  const geoScore = computeGeoScore(userA, userB);
  const chartScore = computeChartScore(userA, userB);

  const sharedTags = getSharedTags(userA, userB);

  const overall = Math.round(
    chartScore.overall * 0.4 +
    tagScore * 0.3 +
    goalScore * 0.2 +
    geoScore * 0.1
  );

  return {
    overallScore: Math.min(100, Math.max(0, overall)),
    bizScore: chartScore.biz,
    friendScore: chartScore.friend,
    guirenScore: chartScore.guiren,
    sharedTags,
  };
}

function computeTagScore(a: UserForMatch, b: UserForMatch): number {
  const aTags = new Set(a.tags.filter((t) => t.tag.category !== "GOAL").map((t) => t.tag.name));
  const bTags = new Set(b.tags.filter((t) => t.tag.category !== "GOAL").map((t) => t.tag.name));
  if (aTags.size === 0 && bTags.size === 0) return 50;
  const intersection = [...aTags].filter((t) => bTags.has(t)).length;
  const union = new Set([...aTags, ...bTags]).size;
  return Math.round((intersection / union) * 100);
}

function computeGoalScore(a: UserForMatch, b: UserForMatch): number {
  const aGoals = new Set(a.tags.filter((t) => t.tag.category === "GOAL").map((t) => t.tag.name));
  const bGoals = new Set(b.tags.filter((t) => t.tag.category === "GOAL").map((t) => t.tag.name));
  if (aGoals.size === 0 && bGoals.size === 0) return 50;
  const intersection = [...aGoals].filter((g) => bGoals.has(g)).length;
  const union = new Set([...aGoals, ...bGoals]).size;
  return Math.round((intersection / union) * 100);
}

function computeGeoScore(a: UserForMatch, b: UserForMatch): number {
  if (!a.location || !b.location) return 30;
  if (a.location === b.location) return 100;
  // Simple: check if same country (last word after comma)
  const aCountry = a.location.split(",").pop()?.trim();
  const bCountry = b.location.split(",").pop()?.trim();
  if (aCountry && bCountry && aCountry === bCountry) return 60;
  return 20;
}

function computeChartScore(a: UserForMatch, b: UserForMatch) {
  if (!a.chartPalaces?.length || !b.chartPalaces?.length) {
    return { overall: 50, biz: 50, friend: 50, guiren: 50 };
  }

  const getPalace = (palaces: typeof a.chartPalaces, name: string) =>
    palaces?.find((p) => p.name === name);

  // Biz: my命宫 vs their官禄, my财帛 vs their财帛
  const bizScore = computePalaceSynergy(
    [getPalace(a.chartPalaces, "Life"), getPalace(a.chartPalaces, "Wealth")],
    [getPalace(b.chartPalaces, "Career"), getPalace(b.chartPalaces, "Wealth")]
  );

  // Friend: my交友 vs their交友, my福德 vs their福德
  const friendScore = computePalaceSynergy(
    [getPalace(a.chartPalaces, "Friends"), getPalace(a.chartPalaces, "Karma")],
    [getPalace(b.chartPalaces, "Friends"), getPalace(b.chartPalaces, "Karma")]
  );

  // Guiren: their命宫 energy + 化禄/权 landing in my key palaces
  const guirenScore = computeGuirenScore(a.chartPalaces, b.chartPalaces);

  const overall = Math.round((bizScore + friendScore + guirenScore) / 3);

  return { overall, biz: bizScore, friend: friendScore, guiren: guirenScore };
}

function computePalaceSynergy(
  myPalaces: (typeof undefined | { energy: number; state: string })[],
  theirPalaces: (typeof undefined | { energy: number; state: string })[]
): number {
  let score = 50;

  for (let i = 0; i < myPalaces.length; i++) {
    const mine = myPalaces[i];
    const theirs = theirPalaces[i];
    if (!mine || !theirs) continue;

    // Complementary energy — if I'm weak and they're strong, bonus
    if (mine.energy < 50 && theirs.energy >= 70) score += 15;
    if (mine.energy >= 70 && theirs.energy >= 70) score += 5;

    // 四化 synergy
    if (theirs.state === "lu" || theirs.state === "quan") score += 10;
    if (theirs.state === "ji") score -= 10;
  }

  return Math.min(100, Math.max(0, score));
}

function computeGuirenScore(
  myPalaces: NonNullable<UserForMatch["chartPalaces"]>,
  theirPalaces: NonNullable<UserForMatch["chartPalaces"]>
): number {
  let score = 50;
  const theirLife = theirPalaces.find((p) => p.name === "Life");
  if (theirLife && theirLife.energy >= 70) score += 10;
  if (theirLife?.state === "lu") score += 15;
  if (theirLife?.state === "quan") score += 10;

  // Check if their positive 四化 lands in my key palaces
  const myKeyPalaces = ["Life", "Career", "Wealth"];
  for (const p of theirPalaces) {
    if ((p.state === "lu" || p.state === "quan") && myKeyPalaces.includes(p.name)) {
      score += 10;
    }
    if (p.state === "ji" && myKeyPalaces.includes(p.name)) {
      score -= 8;
    }
  }

  return Math.min(100, Math.max(0, score));
}

function getSharedTags(a: UserForMatch, b: UserForMatch): string[] {
  const aTags = new Set(a.tags.map((t) => t.tag.name));
  return b.tags.filter((t) => aTags.has(t.tag.name)).map((t) => t.tag.name);
}
```

**Step 2: Create matches API route**

Create `src/app/api/matches/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true },
  });
  const limits = getTierLimits(user?.tier ?? "FREE");
  if (limits.matchesPerDay === 0) {
    return NextResponse.json({ error: "tier_required", minTier: "BASIC" }, { status: 403 });
  }

  const limit = Math.min(
    parseInt(request.nextUrl.searchParams.get("limit") || "3"),
    limits.matchesPerDay === Infinity ? 20 : limits.matchesPerDay
  );

  const matches = await prisma.userMatch.findMany({
    where: {
      OR: [
        { userAId: session.user.id },
        { userBId: session.user.id },
      ],
    },
    orderBy: { overallScore: "desc" },
    take: limit,
    include: {
      userA: {
        select: {
          id: true, name: true, image: true, avatarUrl: true,
          tier: true, headline: true, location: true,
          tags: { include: { tag: true }, take: 5 },
        },
      },
      userB: {
        select: {
          id: true, name: true, image: true, avatarUrl: true,
          tier: true, headline: true, location: true,
          tags: { include: { tag: true }, take: 5 },
        },
      },
    },
  });

  // Return the "other" user in each match
  const results = matches.map((m) => {
    const otherUser = m.userAId === session.user.id ? m.userB : m.userA;
    return {
      user: otherUser,
      overallScore: m.overallScore,
      bizScore: m.bizScore,
      friendScore: m.friendScore,
      guirenScore: m.guirenScore,
      sharedTags: m.sharedTags,
    };
  });

  return NextResponse.json(results);
}
```

**Step 3: Create batch computation script**

Create `scripts/compute-matches.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import { computeMatch } from "../src/lib/matching";

const prisma = new PrismaClient();

async function main() {
  console.log("Computing matches...");

  // Get all users with birth data (needed for chart computation)
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

  // For each pair, compute match
  let count = 0;
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const a = users[i];
      const b = users[j];

      // TODO: compute chart palaces from birth data using iztro
      // For now, match on tags + location only
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
```

**Step 4: Commit**

```bash
git add src/lib/matching.ts src/app/api/matches/ scripts/compute-matches.ts
git commit -m "feat: energy match algorithm, matches API, and batch computation script"
```

---

## Task 8: Settings Page — Profile Editor + Tag Selector

**Files:**
- Modify: `src/app/(platform)/settings/page.tsx`
- Create: `src/components/settings/ProfileForm.tsx`
- Create: `src/components/settings/TagSelector.tsx`

**Step 1: Create ProfileForm component**

Create `src/components/settings/ProfileForm.tsx` — form with fields: name, headline, bio, location, isProfilePublic toggle. Uses `useUpdateProfile()` mutation. Tailwind styling matching existing settings page (gold/purple theme).

**Step 2: Create TagSelector component**

Create `src/components/settings/TagSelector.tsx` — grouped pill multi-select. Shows tags by category (INDUSTRY, INTEREST, GOAL). Selected tags have gold border. Enforces tier tag limit. Uses `useAvailableTags()` + `useUpdateTags()`.

**Step 3: Integrate into settings page**

Modify `src/app/(platform)/settings/page.tsx` — add ProfileForm and TagSelector sections below existing birth info form. Add section headers with consistent styling.

**Step 4: Commit**

```bash
git add src/components/settings/ src/app/\(platform\)/settings/
git commit -m "feat: settings page — profile editor and tag selector"
```

---

## Task 9: Public Profile Page

**Files:**
- Create: `src/app/(platform)/profile/[userId]/page.tsx`
- Create: `src/components/profile/ProfileHeader.tsx`
- Create: `src/components/profile/MatchScoreCard.tsx`
- Create: `src/components/profile/ProfileTabs.tsx`

**Step 1: Create ProfileHeader**

Displays: avatar, name, headline, location, tier badge, tags, follow button, message button. Uses `useUserProfile()` and `useToggleFollow()`.

**Step 2: Create MatchScoreCard**

Shows 缘分指数: overall %, biz/friend/guiren sub-scores with progress bars. "Ask AI Sifu" CTA. Hidden behind MembershipWall for non-PREMIUM users (shows blurred preview with overall score visible).

**Step 3: Create ProfileTabs**

Tabs: 帖子 | 评论 | 关注 | 粉丝. Each tab fetches relevant data. Reuses PostCard for posts tab.

**Step 4: Create profile page**

Create `src/app/(platform)/profile/[userId]/page.tsx` — assembles ProfileHeader + MatchScoreCard + ProfileTabs. Handles private profiles (shows message instead of content).

**Step 5: Commit**

```bash
git add src/app/\(platform\)/profile/ src/components/profile/
git commit -m "feat: public profile page with match scores and activity tabs"
```

---

## Task 10: Community Feed Page — Wire to Real API

**Files:**
- Modify: `src/app/(platform)/community/feed/page.tsx`
- Create: `src/components/community/FeedSidebar.tsx`
- Create: `src/components/community/SearchBar.tsx`
- Create: `src/components/community/SortTabs.tsx`
- Modify: `src/components/community/PostCard.tsx`
- Modify: `src/components/community/VoteButton.tsx`
- Modify: `src/components/community/PostEditor.tsx`

**Step 1: Create SortTabs + SearchBar**

SortTabs: 热门 | 最新 | 关注 — updates URL params.
SearchBar: input with debounce, tag filter pills.

**Step 2: Create FeedSidebar**

Desktop sidebar: 发帖 button, 热门标签 cloud, 推荐群组 (top 3), 能量匹配推荐 (3 user cards using `useMyMatches()`).

**Step 3: Update PostCard**

Replace hardcoded data. Add: author avatar + tier badge + clickable name (→ profile), post tags as pills, view count, functional vote buttons, comment count link.

**Step 4: Update VoteButton**

Wire to `useVote()` mutation. Show current user's vote state. Optimistic update.

**Step 5: Update PostEditor**

Wire to `useCreatePost()` mutation. Add tag input. Close on success.

**Step 6: Rewrite feed page**

Replace placeholder data with `useFeed()` infinite query. Add SortTabs + SearchBar + infinite scroll trigger. Layout: main feed + FeedSidebar on desktop.

**Step 7: Commit**

```bash
git add src/app/\(platform\)/community/feed/ src/components/community/
git commit -m "feat: community feed — real API data, voting, posting, search, infinite scroll"
```

---

## Task 11: Post Detail Page

**Files:**
- Create: `src/app/(platform)/community/post/[id]/page.tsx`
- Modify: `src/components/community/CommentThread.tsx`
- Create: `src/components/community/CommentEditor.tsx`

**Step 1: Create CommentEditor**

Simple textarea + submit button. Uses `useCreateComment()`. Supports reply mode (shows "Replying to @user" header).

**Step 2: Update CommentThread**

Wire to real data (nested comments from post API). Add functional vote buttons. Add reply button that opens CommentEditor inline.

**Step 3: Create post detail page**

Layout: post content (markdown rendered) + author card + tags + vote + comments section. Uses `usePost()`.

**Step 4: Commit**

```bash
git add src/app/\(platform\)/community/post/ src/components/community/CommentThread.tsx src/components/community/CommentEditor.tsx
git commit -m "feat: post detail page with nested comments and replies"
```

---

## Task 12: Groups Page — Wire to Real API

**Files:**
- Modify: `src/app/(platform)/community/groups/page.tsx`
- Create: `src/app/(platform)/community/groups/[slug]/page.tsx`
- Create: `src/app/api/community/groups/[slug]/join/route.ts`

**Step 1: Wire groups list page**

Replace placeholder data. Fetch from `/api/community/groups`. Show member count, post count, join button.

**Step 2: Create group detail page**

Shows group description, member list, group-specific feed (posts filtered by groupId). Join/leave button.

**Step 3: Create join/leave API**

Toggle group membership. Enforce tier group limits.

**Step 4: Commit**

```bash
git add src/app/\(platform\)/community/groups/ src/app/api/community/groups/
git commit -m "feat: groups pages — real data, join/leave, group feed"
```

---

## Task 13: Messages Page

**Files:**
- Create: `src/app/(platform)/messages/page.tsx`
- Create: `src/components/messages/ConversationList.tsx`
- Create: `src/components/messages/ChatPanel.tsx`
- Create: `src/components/messages/NotificationList.tsx`

**Step 1: Create ConversationList**

Left panel: tabs for 🔔通知 and 💬私信. DM list shows other participant's avatar + name + last message preview + unread indicator.

**Step 2: Create NotificationList**

List of notifications with type icons. Click marks as read + navigates to link. "Mark all as read" button.

**Step 3: Create ChatPanel**

Right panel: message history + input. Shows messages in bubbles (sent = right, received = left). Auto-scroll. Uses `useConversation()` with 15s polling. Send uses `useSendMessage()`.

**Step 4: Assemble messages page**

Create `src/app/(platform)/messages/page.tsx` — responsive layout. Desktop: 2 columns. Mobile: full-screen list → tap → full-screen chat.

**Step 5: Commit**

```bash
git add src/app/\(platform\)/messages/ src/components/messages/
git commit -m "feat: messages page — notifications, DM conversations, chat panel"
```

---

## Task 14: Dashboard Enhancement

**Files:**
- Modify: `src/components/dashboard/DashboardOverview.tsx`
- Create: `src/components/dashboard/NotificationCard.tsx`
- Create: `src/components/dashboard/MessageCard.tsx`
- Create: `src/components/dashboard/EnergyMatchCard.tsx`
- Create: `src/components/dashboard/TrendingPostsCard.tsx`
- Create: `src/app/(platform)/dashboard/page.tsx`

**Step 1: Create new dashboard cards**

- `NotificationCard` — unread count badge + 3 recent notification previews + "View all" link
- `MessageCard` — unread DM count + 2 recent conversation previews + "View all" link
- `EnergyMatchCard` — 3 top matches with avatar, name, score %, shared tags + "View Profile" link
- `TrendingPostsCard` — Top 5 hot posts (title + score + comment count) + "View Community" link

**Step 2: Update DashboardOverview**

Add new cards to the grid layout. Arrange: top row (chart + credits + notifications + messages), middle row (energy matches), bottom row (activity + trending + courses + bookmarks).

**Step 3: Create dashboard page**

Create `src/app/(platform)/dashboard/page.tsx` that renders DashboardOverview.

**Step 4: Commit**

```bash
git add src/components/dashboard/ src/app/\(platform\)/dashboard/
git commit -m "feat: enhanced dashboard — notifications, messages, matches, trending posts"
```

---

## Task 15: Navbar — Notification + Message Badges

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Step 1: Add notification and message icons**

Add Bell and MessageCircle icons (from lucide-react) next to user menu. Show red dot with unread count using `useUnreadCounts()` hook. Bell links to `/messages` (notifications tab). Message icon links to `/messages` (DM tab).

**Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: navbar notification and message badges with unread counts"
```

---

## Task 16: Integration Testing + Polish

**Step 1: Test full user flow manually**

1. Register → set birth info → fill profile → select tags
2. View community feed → create post → vote → comment → reply
3. View another user's profile → follow → send DM
4. Check dashboard → verify all cards populated
5. Check notifications → mark read
6. Verify tier gating works (test with FREE user)

**Step 2: Fix any runtime errors**

Check browser console and server logs.

**Step 3: Run build**

```bash
npm run build
```

Fix any TypeScript errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: integration fixes and polish"
```

---

## Execution Order

Tasks are ordered by dependency:

1. **Schema** (Task 1) — everything depends on this
2. **Tier Limits** (Task 2) — APIs depend on this
3. **Profile APIs** (Task 3) — UI depends on these
4. **Notification + DM APIs** (Task 4) — UI depends on these
5. **Community APIs** (Task 5) — Feed UI depends on this
6. **React Hooks** (Task 6) — all UI depends on these
7. **Match Algorithm** (Task 7) — match UI depends on this
8. **Settings Page** (Task 8) — can start here for UI
9. **Profile Page** (Task 9)
10. **Community Feed** (Task 10)
11. **Post Detail** (Task 11)
12. **Groups** (Task 12)
13. **Messages Page** (Task 13)
14. **Dashboard** (Task 14)
15. **Navbar Badges** (Task 15)
16. **Integration** (Task 16)

**Parallelizable:** Tasks 8-12 can be done in parallel once Tasks 1-7 are complete.
