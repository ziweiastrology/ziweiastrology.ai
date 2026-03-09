# Full-Site i18n (English + Chinese) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add English/Chinese language toggle across the entire site — UI strings, report generation, and metadata.

**Architecture:** Cookie-based locale using `next-intl` (no URL prefix change — keeps `/about` not `/en/about`). A `<LanguageSwitcher>` in the Navbar stores the preference in a cookie. All components read translations via `useTranslations()`. Report generation reads the locale to switch AI prompts between English and Chinese.

**Tech Stack:** `next-intl` v4, Next.js App Router, cookie-based routing via middleware

---

## Approach: `next-intl` with Cookie-Based Locale

**Why `next-intl`:**
- Purpose-built for Next.js App Router
- Supports cookie-based locale (no URL restructure needed)
- `useTranslations()` hook for client components, `getTranslations()` for server
- TypeScript-safe message keys
- Lightweight (~3KB gzipped)

**Why NOT URL-prefix (`/en/`, `/zh/`):**
- Would require restructuring all 33 pages under `[locale]/`
- Breaks existing links, bookmarks, SEO URLs
- Cookie-based is simpler and sufficient for 2 languages

---

## Task 1: Install next-intl and Create Config

**Files:**
- Modify: `package.json`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/middleware.ts`

**Step 1: Install next-intl**

```bash
npm install next-intl
```

**Step 2: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const validLocale = ["en", "zh"].includes(locale) ? locale : "en";

  return {
    locale: validLocale,
    messages: (await import(`@/messages/${validLocale}.json`)).default,
  };
});
```

**Step 3: Create `src/middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localeDetection: false, // use cookie only, no URL prefix
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

> **Note:** This project currently has NO middleware.ts. The memory note says there was one but it was deleted or moved. Creating fresh.

**Step 4: Update `next.config.ts`**

Add the next-intl plugin:

```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// ... existing config ...

export default withNextIntl(nextConfig);
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add next-intl config, middleware, and i18n request handler"
```

---

## Task 2: Create Message Files (EN + ZH)

**Files:**
- Create: `src/messages/en.json`
- Create: `src/messages/zh.json`

**Step 1: Create English message file `src/messages/en.json`**

Structure by component/page namespace:

```json
{
  "nav": {
    "about": "About",
    "learn": "Learn",
    "resources": "Resources",
    "blog": "Blog",
    "compareSystems": "Compare Systems",
    "caseStudies": "Case Studies",
    "community": "Community",
    "academy": "Academy",
    "reports": "Reports",
    "signIn": "Sign In",
    "toggleMenu": "Toggle menu"
  },
  "footer": {
    "platform": "Platform",
    "legal": "Legal",
    "contact": "Contact",
    "aboutUs": "About Us",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service",
    "tagline": "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling. Decode your reality.",
    "copyright": "ziweiastrology.ai — Ancient wisdom. Quantum precision."
  },
  "auth": {
    "createAccount": "Create Your Account",
    "welcomeBack": "Welcome Back",
    "fullName": "Full Name",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "signIn": "Sign In",
    "signUp": "Create Account",
    "continueWithGoogle": "Continue with Google",
    "haveAccount": "Already have an account?",
    "noAccount": "Don't have an account?",
    "signOut": "Sign out",
    "reasonPalace": "Unlock this palace to explore its full star configuration.",
    "reasonCopilot": "Chat with ZiWei Sifu AI for personalized chart insights.",
    "reasonFullReading": "Register to save your chart and unlock all 12 palaces."
  },
  "hero": {
    "title": "Decode Your Reality",
    "subtitle": "Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling",
    "cta": "Begin Calibration"
  },
  "reports": {
    "title": "Complete Life-Path Analysis",
    "generating": "Generating your report...",
    "complete": "Report complete",
    "failed": "Generation failed",
    "sections": "{completed}/{total} sections",
    "usuallyTakes": "This usually takes 1–2 minutes.",
    "cancelRefund": "Cancel & Refund",
    "deleteRefund": "Delete & Refund Credits",
    "cancelling": "Cancelling...",
    "exportPdf": "Export PDF",
    "selectSections": "Select sections",
    "downloadPdf": "Download PDF ({count} sections)",
    "generatingPdf": "Generating PDF...",
    "simpleView": "Simple",
    "detailedView": "Detailed",
    "switchDetailed": "Want the full picture? Switch to Detailed View",
    "tableOfContents": "Table of Contents",
    "overallAssessment": "Overall Assessment",
    "matchingAnalysis": "Matching Analysis",
    "decadeTimeline": "Decade Timeline",
    "palaceAnalysis": "12 Palace Deep Analysis",
    "topicDeepDives": "Topic Deep Dives",
    "deepDiveWithSifu": "Deep Dive with Sifu"
  },
  "settings": {
    "title": "Settings",
    "profile": "Profile",
    "membership": "Membership",
    "birthDetails": "Birth Details",
    "save": "Save",
    "cancel": "Cancel"
  },
  "community": {
    "searchPosts": "Search posts",
    "postTitle": "Post title",
    "shareThoughts": "Share your thoughts",
    "writeReply": "Write a reply",
    "noPosts": "No posts yet",
    "noComments": "No comments yet"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "tryAgain": "Try Again",
    "loading": "Loading...",
    "error": "Something went wrong",
    "upgradeNow": "Upgrade Now",
    "fullReport": "Full Report",
    "preview": "Preview"
  },
  "language": {
    "en": "EN",
    "zh": "中文"
  }
}
```

**Step 2: Create Chinese message file `src/messages/zh.json`**

Same keys, Chinese values. This is the main translation work.

```json
{
  "nav": {
    "about": "关于",
    "learn": "学习",
    "resources": "资源",
    "blog": "博客",
    "compareSystems": "系统比较",
    "caseStudies": "案例研究",
    "community": "社区",
    "academy": "学院",
    "reports": "报告",
    "signIn": "登录",
    "toggleMenu": "切换菜单"
  },
  "footer": {
    "platform": "平台",
    "legal": "法律",
    "contact": "联系我们",
    "aboutUs": "关于我们",
    "privacyPolicy": "隐私政策",
    "termsOfService": "服务条款",
    "tagline": "古老紫微斗数智慧结合量子概率建模。解码你的命运。",
    "copyright": "ziweiastrology.ai — 古老智慧，量子精准。"
  },
  "auth": {
    "createAccount": "创建账户",
    "welcomeBack": "欢迎回来",
    "fullName": "姓名",
    "email": "邮箱",
    "password": "密码",
    "confirmPassword": "确认密码",
    "signIn": "登录",
    "signUp": "注册",
    "continueWithGoogle": "使用 Google 登录",
    "haveAccount": "已有账户？",
    "noAccount": "还没有账户？",
    "signOut": "退出",
    "reasonPalace": "解锁此宫位以探索完整星曜配置。",
    "reasonCopilot": "与紫微师傅 AI 对话，获取个性化命盘解读。",
    "reasonFullReading": "注册以保存命盘并解锁全部十二宫。"
  },
  "hero": {
    "title": "解码你的命运",
    "subtitle": "古老紫微斗数智慧结合量子概率建模",
    "cta": "开始校准"
  },
  "reports": {
    "title": "完整人生命盘分析",
    "generating": "正在生成报告...",
    "complete": "报告完成",
    "failed": "生成失败",
    "sections": "{completed}/{total} 个章节",
    "usuallyTakes": "通常需要 1-2 分钟。",
    "cancelRefund": "取消并退款",
    "deleteRefund": "删除并退还积分",
    "cancelling": "取消中...",
    "exportPdf": "导出 PDF",
    "selectSections": "选择章节",
    "downloadPdf": "下载 PDF（{count} 个章节）",
    "generatingPdf": "正在生成 PDF...",
    "simpleView": "精简版",
    "detailedView": "详细版",
    "switchDetailed": "想要完整内容？切换到详细版",
    "tableOfContents": "目录",
    "overallAssessment": "综合评估",
    "matchingAnalysis": "匹配分析",
    "decadeTimeline": "大限时间线",
    "palaceAnalysis": "十二宫深度分析",
    "topicDeepDives": "专题深入",
    "deepDiveWithSifu": "与师傅深入探讨"
  },
  "settings": {
    "title": "设置",
    "profile": "个人资料",
    "membership": "会员",
    "birthDetails": "出生信息",
    "save": "保存",
    "cancel": "取消"
  },
  "community": {
    "searchPosts": "搜索帖子",
    "postTitle": "帖子标题",
    "shareThoughts": "分享你的想法",
    "writeReply": "写回复",
    "noPosts": "暂无帖子",
    "noComments": "暂无评论"
  },
  "common": {
    "save": "保存",
    "cancel": "取消",
    "delete": "删除",
    "edit": "编辑",
    "tryAgain": "重试",
    "loading": "加载中...",
    "error": "出了点问题",
    "upgradeNow": "立即升级",
    "fullReport": "完整报告",
    "preview": "预览"
  },
  "language": {
    "en": "EN",
    "zh": "中文"
  }
}
```

> **Note:** This is the initial set of ~100 keys covering nav, footer, auth, reports, settings, community, and common strings. Additional keys will be added as we migrate each page in later tasks.

**Step 3: Commit**

```bash
git add src/messages/ && git commit -m "feat: add EN and ZH translation message files"
```

---

## Task 3: Wire NextIntlClientProvider into Layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Providers.tsx`

**Step 1: Update root layout to pass locale and messages**

In `src/app/layout.tsx`, change `<html lang="en">` to read from next-intl, and wrap with the provider:

```tsx
import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      {/* ... head ... */}
      <body className={...}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

**Step 2: Update `src/components/Providers.tsx`**

Add `NextIntlClientProvider`:

```tsx
import { NextIntlClientProvider } from "next-intl";

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/layout.tsx src/components/Providers.tsx && git commit -m "feat: wire NextIntlClientProvider into root layout"
```

---

## Task 4: Create LanguageSwitcher Component + Add to Navbar

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Create: `src/app/api/locale/route.ts` (cookie setter)

**Step 1: Create API route to set locale cookie**

`src/app/api/locale/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { locale } = await request.json();
  if (!["en", "zh"].includes(locale)) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
  return response;
}
```

**Step 2: Create `src/components/LanguageSwitcher.tsx`**

```tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "en" ? "zh" : "en";
    startTransition(async () => {
      await fetch("/api/locale", {
        method: "POST",
        body: JSON.stringify({ locale: next }),
        headers: { "Content-Type": "application/json" },
      });
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="rounded-md px-2 py-1 text-xs font-medium text-parchment-400 hover:text-gold-400 hover:bg-celestial-800/60 transition-colors disabled:opacity-50"
      aria-label="Switch language"
    >
      {locale === "en" ? "中文" : "EN"}
    </button>
  );
}
```

**Step 3: Add LanguageSwitcher to Navbar**

In `src/components/layout/Navbar.tsx`, add to the right side area, before CreditBadge:

```tsx
import LanguageSwitcher from "@/components/LanguageSwitcher";

// In the right side div:
<div className="flex items-center gap-3">
  <LanguageSwitcher />
  {session && <CreditBadge />}
  {/* ... rest ... */}
</div>
```

Also add to mobile menu at the bottom.

**Step 4: Commit**

```bash
git add src/components/LanguageSwitcher.tsx src/app/api/locale/route.ts src/components/layout/Navbar.tsx
git commit -m "feat: add language switcher to navbar (EN/中文 toggle)"
```

---

## Task 5: Migrate Navbar + Footer to useTranslations()

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Migrate Navbar**

Replace hardcoded strings with `t()` calls:

```tsx
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("nav");

  // Replace: "About" → t("about")
  // Replace: "Learn" → t("learn")
  // Replace: "Sign In" → t("signIn")
  // etc.
}
```

**Step 2: Migrate Footer**

```tsx
import { useTranslations } from "next-intl";

// Footer is a server component, so use:
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  // Replace: "Platform" → t("platform")
  // etc.
}
```

> **Important:** Footer is currently a server component (no "use client"). Use `getTranslations()` for server components. If it needs to become a client component, use `useTranslations()`.

**Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx src/components/layout/Footer.tsx
git commit -m "feat: migrate navbar + footer to i18n translations"
```

---

## Task 6: Migrate Auth Components

**Files:**
- Modify: `src/components/AuthModal.tsx`
- Modify: `src/components/auth/UserMenu.tsx`
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/(auth)/register/page.tsx`
- Update: `src/messages/en.json`, `src/messages/zh.json` (add any missing keys)

Replace all hardcoded strings in auth flow with `t()` calls.

**Commit:** `feat: migrate auth components to i18n`

---

## Task 7: Migrate Report Components

**Files:**
- Modify: `src/components/reports/ReportStatusBar.tsx`
- Modify: `src/components/reports/ReportViewer.tsx`
- Modify: `src/components/reports/ReportPDFExport.tsx`
- Modify: `src/components/reports/ReportSectionCard.tsx`
- Modify: `src/components/reports/MatchingCards.tsx`

Replace all hardcoded strings with `t()` calls from `"reports"` namespace.

**Commit:** `feat: migrate report components to i18n`

---

## Task 8: Migrate Landing Page Components

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/VerificationTimeline.tsx`
- Modify: `src/components/SnapshotBanner.tsx`
- Update: `src/messages/en.json`, `src/messages/zh.json`

**Commit:** `feat: migrate landing page to i18n`

---

## Task 9: Migrate Remaining Pages

**Files:** All page-level components across:
- `src/app/(platform)/about/page.tsx`
- `src/app/(platform)/settings/page.tsx`
- `src/app/(platform)/community/` pages
- `src/app/(platform)/academy/` pages
- `src/app/(platform)/resources/` pages
- `src/app/(platform)/pricing/page.tsx`
- `src/app/(platform)/case-studies/` pages
- `src/app/(platform)/blog/` pages
- `src/app/(platform)/dashboard/` pages
- `src/app/(platform)/messages/` pages

This is the largest task. Approach: migrate one route group at a time, commit after each group.

**Commits:**
- `feat: i18n — about page`
- `feat: i18n — settings page`
- `feat: i18n — community pages`
- `feat: i18n — academy pages`
- `feat: i18n — remaining pages`

---

## Task 10: Localize Report Generation Prompts

**Files:**
- Modify: `src/lib/reports/generateReport.ts`
- Create: `src/lib/reports/reportPrompts.ts` (locale-aware prompt templates)

**Step 1: Create locale-aware prompt file**

```ts
// src/lib/reports/reportPrompts.ts

export function getReportSystemPrompt(locale: string): string {
  if (locale === "zh") {
    return `你是一位精通飞星派紫微斗数的大师分析师。
你以"古代量子"叙事风格撰写深度、有洞察力的命盘报告——融合传统中国玄学智慧与现代易懂的语言。

风格指南：
- 使用紫微斗数术语（宫、星、四化）并附中文解释
- 具体：引用确切的星曜、亮度等级和互动关系
- 将洞察力作为趋势和潜力呈现，绝不做绝对预测
- 使用生动、唤起联想的语言
- 使用清晰的 markdown 标题（##、###）
- 每个宫位分析应为 200-400 字
- 温暖而鼓励，同时诚实面对挑战
- 全部使用中文撰写`;
  }

  return ENGLISH_SYSTEM_PROMPT;
}
```

**Step 2: Pass locale to generateFullReport()**

```ts
export async function generateFullReport(reportId: string, locale: string = "en"): Promise<void> {
  // Use locale for prompt selection
  const systemPrompt = getReportSystemPrompt(locale);
  // ... rest
}
```

**Step 3: Update API route to pass locale**

In `src/app/api/reports/route.ts`, read locale from cookie:

```ts
import { cookies } from "next/headers";

// Inside POST handler:
const cookieStore = await cookies();
const locale = cookieStore.get("locale")?.value || "en";

after(async () => {
  await generateFullReport(result.reportId!, locale);
});
```

**Step 4: Commit**

```bash
git commit -m "feat: localize report generation — AI generates in user's language"
```

---

## Task 11: Localize Metadata + SEO

**Files:**
- Modify: `src/app/layout.tsx` (metadata)
- Modify: page-level metadata exports

**Step 1: Dynamic metadata based on locale**

```ts
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "zh"
      ? "ziweiastrology.ai — 解码你的命运"
      : "ziweiastrology.ai — Decode Your Reality",
    // ...
  };
}
```

**Commit:** `feat: localize metadata and SEO tags`

---

## Task 12: Build + Test + Deploy

**Step 1: Build**
```bash
npm run build
```

**Step 2: Test locally**
- Toggle language in navbar
- Verify all pages render in both languages
- Generate a report in Chinese, verify Chinese content
- Generate a report in English, verify English content
- Test PDF export in both languages

**Step 3: Deploy**
```bash
git push origin main && npx vercel --prod
```

---

## Summary

| Task | Scope | Est. Size |
|------|-------|-----------|
| 1 | next-intl config + middleware | Small |
| 2 | EN + ZH message files | Medium |
| 3 | Wire provider into layout | Small |
| 4 | LanguageSwitcher + Navbar | Small |
| 5 | Migrate Navbar + Footer | Small |
| 6 | Migrate Auth components | Small |
| 7 | Migrate Report components | Medium |
| 8 | Migrate Landing page | Medium |
| 9 | Migrate all remaining pages | Large |
| 10 | Localize AI report prompts | Medium |
| 11 | Localize metadata/SEO | Small |
| 12 | Build + test + deploy | Small |
