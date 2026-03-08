# Dashboard + Community + Messaging Redesign

**Date**: 2026-03-07
**Architecture**: Prisma-Only (方案 A) — PostgreSQL + polling, no extra services

## Vision

以命理为核心的社交生态平台。用户旅程：免费占卜 → 注册 → 付费 → 社区粘性 → 能量匹配连接 → 裂变传播。

---

## Section 1: Data Model Extensions

### User Profile 扩展

```prisma
// 在现有 User model 上增加：
bio              String?
headline         String?        // e.g. "创业者 | 紫微爱好者"
location         String?
isProfilePublic  Boolean @default(true)
avatarUrl        String?
```

### Tag 系统

```prisma
model Tag {
  id        String   @id @default(cuid())
  name      String
  nameCn    String
  category  TagCategory
  users     UserTag[]
  createdAt DateTime @default(now())
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

enum TagCategory {
  INDUSTRY
  INTEREST
  GOAL
  ASTRO
}
```

Preset tags:
- **INDUSTRY**: 科技、金融、教育、医疗、艺术、房地产、自由职业、电商、餐饮、法律
- **INTEREST**: 紫微斗数、风水、冥想、投资理财、健身、旅行、读书、音乐、摄影
- **GOAL**: 找创业伙伴、找贵人、学命理、交朋友、感情指导、职业规划、灵性成长
- **ASTRO**: 自动从命盘生成（命宫主星、五行局、生肖）

### Messaging System

```prisma
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
}

enum NotificationType {
  SYSTEM
  VOTE
  COMMENT
  FOLLOW
  MATCH
}

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
  content        String
  readAt         DateTime?
  createdAt      DateTime       @default(now())
}
```

### Community Enhancements

```prisma
// Post model additions:
tags      String[]     // 帖子标签
viewCount Int @default(0)

// New Follow model:
model Follow {
  id          String   @id @default(cuid())
  followerId  String
  followingId String
  follower    User     @relation("Followers", fields: [followerId], references: [id], onDelete: Cascade)
  following   User     @relation("Following", fields: [followingId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  @@unique([followerId, followingId])
}
```

### Energy Match

```prisma
model UserMatch {
  id           String   @id @default(cuid())
  userAId      String
  userBId      String
  userA        User     @relation("MatchesAsA", fields: [userAId], references: [id], onDelete: Cascade)
  userB        User     @relation("MatchesAsB", fields: [userBId], references: [id], onDelete: Cascade)
  overallScore Int      // 0-100
  bizScore     Int      // 合作指数
  friendScore  Int      // 友谊指数
  guirenScore  Int      // 贵人指数
  sharedTags   String[]
  calculatedAt DateTime @default(now())
  @@unique([userAId, userBId])
}
```

---

## Section 2: User Profile Page

### `/profile/[userId]` — Public Profile

Layout:
- Header: Avatar, Name, Headline, Location, Tier Badge, [Follow] [Message] buttons
- Tags section: 命理标签 (auto), 兴趣标签, 行业标签, 目标标签
- 缘分指数 card (if viewer has chart data): overall %, biz/friend/guiren scores, "Ask AI Sifu" CTA
- Tabs: 帖子 | 评论 | 关注 | 粉丝

### `/settings` — Edit Profile (extend existing)

Add below existing birth info form:
- Avatar upload
- Bio, Headline, Location inputs
- Tag selector (grouped pill multi-select by category)
- Privacy toggle (public/private profile)

---

## Section 3: Community Upgrade (Reddit-style)

### `/community` — Main Feed

- Sort tabs: 热门 | 最新 | 关注的人
- Filter by post type: 全部 | 讨论 | 命盘分析 | 事件分析
- Search bar with tag filtering
- Infinite scroll (cursor-based pagination)
- Desktop sidebar: 发帖 button, 热门标签, 推荐群组, 能量匹配推荐 (3 users)

### PostCard Upgrade

- Real API data (replace hardcoded placeholders)
- Author mini-card: avatar + name + tier badge + location
- Post tags as pills
- View count display
- Functional vote buttons (connected to API)

### `/community/post/[id]` — Post Detail

- Full markdown content rendering
- Author card with tags
- Nested comment thread with voting
- Reply functionality
- Bookmark button

### Groups — Real Data

- List groups from API (replace placeholders)
- Join/leave functionality
- Group-specific feed
- Member list with roles

---

## Section 4: Messaging System

### `/messages` — Message Center

Left panel: Notification tab + DM tab, conversation list
Right panel: Active conversation thread + input

### Notification Types

- SYSTEM: 运势提醒, 公告
- VOTE: "你的帖子获得了 10 个赞"
- COMMENT: "张三回复了你的帖子"
- FOLLOW: "李四关注了你"
- MATCH: "发现 92% 匹配用户！"

### DM Rules by Tier

- FREE: receive only
- BASIC: 10 sent/day
- PREMIUM: 50 sent/day
- SIFU: unlimited

### Polling Strategy

- Messages page active: poll every 15 seconds
- Other pages: poll every 60 seconds for unread count (navbar badge)
- Notification polling: same cadence

### Navbar Changes

Add to existing Navbar:
- 🔔 Notification bell with unread count badge
- 💬 Message icon with unread count badge

---

## Section 5: Dashboard Upgrade

### `/dashboard` — Enhanced

Existing (keep): ChartSnapshotCard, CreditBalanceCard, ActivityFeed, CourseProgressWidget, BookmarksList, QuickActionsGrid

New components:
- `NotificationCard` — Unread count + 3 recent previews
- `MessageCard` — Unread DM count + recent conversations
- `EnergyMatchCard` — 3 daily recommended matches
- `TrendingPostsCard` — Community hot posts Top 5
- Welcome header with daily fortune rating

---

## Section 6: Energy Match Algorithm

### Score Calculation (0-100)

| Dimension | Weight | Method |
|-----------|--------|--------|
| Chart complementarity | 40% | Palace star synergy |
| Shared tags | 30% | overlap / total |
| Goal alignment | 20% | GOAL tag overlap (weighted higher) |
| Geography | 10% | same city > same country > different |

### Chart Complementarity Rules

- 合作指数: f(my 命宫 vs their 官禄宫, my 财帛 vs their 财帛)
- 友谊指数: f(my 交友宫 vs their 交友宫, my 福德 vs their 福德)
- 贵人指数: f(their 命宫 energy + 四化禄/权 landing in my 命/官/财)

Rules:
- Star complementarity: my weak palace + their strong corresponding palace → +points
- 四化 resonance: their 化禄/化权 in my key palace → +points
- 四化 conflict: their 化忌 in my 命/财/官 → -points

### Computation Timing

- On profile/chart update: recalculate matches for that user
- Daily cron: refresh Top 20 matches for active users
- Read from `UserMatch` table (no real-time calculation)

---

## Section 7: Tier Gate Matrix

| Feature | FREE | BASIC | PREMIUM | SIFU |
|---------|------|-------|---------|------|
| View posts | 3/day | Unlimited | Unlimited | Unlimited |
| Create posts | ❌ | 3/day | 10/day | Unlimited |
| Vote/Comment | ❌ | ✅ | ✅ | ✅ |
| View profiles | Basic info | Full | Full + match | Full + detailed |
| Match recommendations | ❌ | 3/day | 10/day | Unlimited |
| Receive DMs | ✅ | ✅ | ✅ | ✅ |
| Send DMs | ❌ | 10/day | 50/day | Unlimited |
| Join Groups | 1 | 5 | 15 | Unlimited |
| Create Groups | ❌ | ❌ | 1 | Unlimited |
| AI Sifu match reading | ❌ | ❌ | 3/day | Unlimited |
| Profile tags | 3 | 10 | 20 | Unlimited |
| Custom avatar | ❌ | ✅ | ✅ | ✅ |

### Gate UI Patterns

- Blurred content + "升级解锁" overlay (reuse MembershipWall)
- Match score visible but details hidden for lower tiers
- Greyed-out buttons with tooltip for tier requirement
