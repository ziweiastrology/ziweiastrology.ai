# Community Content SEO — Design

## Goal
Make community posts indexable by Google to capture ZWDS long-tail keywords and drive organic traffic.

## Changes

### 1. Post slug field
- Add `slug String @unique` to Post model
- Auto-generate from title on creation, deduplicate with numeric suffix
- Backfill existing posts via script

### 2. SEO post page `/community/post/[slug]`
- Server Component with full content rendering
- `generateMetadata()` for dynamic title/description/og
- JSON-LD Article structured data

### 3. Dynamic sitemap
- Query all post slugs, add `/community/post/[slug]` entries

### 4. Post creation API
- Auto-generate slug on POST `/api/community/posts`

## Files
| File | Action |
|------|--------|
| `prisma/schema.prisma` | MODIFY — add slug to Post |
| `src/lib/slugify.ts` | CREATE — slug generation + dedup |
| `src/app/(platform)/community/post/[slug]/page.tsx` | CREATE — SEO post detail |
| `src/app/api/community/posts/route.ts` | MODIFY — generate slug |
| `src/app/sitemap.ts` | MODIFY — add post URLs |
| `scripts/backfill-slugs.ts` | CREATE — backfill existing posts |
