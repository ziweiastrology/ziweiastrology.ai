# Today's Insight — Flow-Day (流日) AI Design

## Overview
Replace the hardcoded daily insight rotation with real ZWDS flow-day (流日) calculations powered by iztro + Claude Haiku 4.5 AI generation. Each user gets a personalized, chart-based daily insight cached in the database.

## Data Flow
```
Dashboard load → GET /api/dashboard/daily-insight
  → DB cache hit for today? → return cached insight
  → Cache miss:
    → iztro: compute astrolabe + horoscope(today)
    → Extract: 流日命宫, 流日四化 (禄/权/科/忌), active stars, natal overlap
    → Claude Haiku 4.5: generate 2-3 sentence insight (warm mentor tone, English + Chinese terms)
    → Save to DailyInsight table
    → Return insight
```

## Insight Content
- Style: Warm mentor, English with Chinese term annotations
- Structure: Focus palace + star influence + actionable advice
- Length: 2-3 sentences
- Example: "Today your Career Palace (官禄宫) glows with 禄 energy — a great day to pitch ideas or negotiate. Your Health Palace (疾厄宫) carries some 忌 tension though, so pace yourself and don't skip meals."

## Technical Decisions
- **Model**: Claude Haiku 4.5 (~$0.0015/request)
- **Cache**: DB-level, one row per user per day
- **No birth data**: Fallback to "enter birth details" prompt (existing behavior)
- **Cost**: ~$5/month at 100 DAU

## Files
| File | Action | Purpose |
|------|--------|---------|
| `prisma/schema.prisma` | MODIFY | Add DailyInsight model |
| `src/lib/zwds/dailyInsight.ts` | CREATE | iztro flow-day calc + Claude generation |
| `src/app/api/dashboard/daily-insight/route.ts` | CREATE | API endpoint |
| `src/components/dashboard/WelcomeInsightCard.tsx` | MODIFY | Fetch + display real insight |
| `src/hooks/useDailyInsight.ts` | CREATE | React Query hook |
