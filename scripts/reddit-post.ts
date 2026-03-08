#!/usr/bin/env tsx
/**
 * Reddit posting CLI for ziweiastrology.ai promotion.
 *
 * Usage:
 *   npx tsx scripts/reddit-post.ts --list
 *   npx tsx scripts/reddit-post.ts --template blog-intro --subreddit astrology --dry-run
 *   npx tsx scripts/reddit-post.ts --template blog-intro --subreddit astrology
 *   npx tsx scripts/reddit-post.ts --link --title "..." --url "..." --subreddit astrology
 *   npx tsx scripts/reddit-post.ts --self --title "..." --text "..." --subreddit ZiWeiDouShu
 *   npx tsx scripts/reddit-post.ts --template blog-intro --subreddits astrology,ZiWeiDouShu --delay 300
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parseArgs } from "util";
import { templates, getTemplate, listTemplates } from "./reddit-templates";
import { submitPost } from "../src/lib/reddit";
import type { PostLog, PostLogEntry, RedditPostParams } from "../src/types/reddit";

// ── Config ───────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LOG_PATH = resolve(__dirname, ".reddit-post-log.json");
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours per subreddit
const DEFAULT_BATCH_DELAY = 300; // 5 minutes in seconds

// ── Post log helpers ─────────────────────────────────────────────────

function loadLog(): PostLog {
  if (!existsSync(LOG_PATH)) return { posts: [] };
  try {
    return JSON.parse(readFileSync(LOG_PATH, "utf-8")) as PostLog;
  } catch {
    return { posts: [] };
  }
}

function saveLog(log: PostLog): void {
  writeFileSync(LOG_PATH, JSON.stringify(log, null, 2) + "\n");
}

function appendLogEntry(entry: PostLogEntry): void {
  const log = loadLog();
  log.posts.push(entry);
  saveLog(log);
}

function lastPostToSubreddit(subreddit: string): Date | null {
  const log = loadLog();
  const entries = log.posts
    .filter((p) => p.subreddit === subreddit && !p.dry_run)
    .sort(
      (a, b) =>
        new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime()
    );
  return entries.length > 0 ? new Date(entries[0].posted_at) : null;
}

function checkCooldown(subreddit: string): void {
  const last = lastPostToSubreddit(subreddit);
  if (!last) return;
  const elapsed = Date.now() - last.getTime();
  if (elapsed < COOLDOWN_MS) {
    const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000 / 60);
    throw new Error(
      `Cooldown active for r/${subreddit} — ${remaining} minutes remaining (24h limit). Use a different subreddit or wait.`
    );
  }
}

// ── Sleep helper ─────────────────────────────────────────────────────

function sleep(seconds: number): Promise<void> {
  return new Promise((r) => setTimeout(r, seconds * 1000));
}

// ── Preview ──────────────────────────────────────────────────────────

function previewPost(params: RedditPostParams, template?: string): void {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║              POST PREVIEW (DRY RUN)              ║");
  console.log("╚══════════════════════════════════════════════════╝\n");
  if (template) console.log(`  Template:  ${template}`);
  console.log(`  Subreddit: r/${params.subreddit}`);
  console.log(`  Type:      ${params.kind} post`);
  console.log(`  Title:     ${params.title}`);
  if (params.kind === "link") {
    console.log(`  URL:       ${params.url}`);
  } else {
    console.log(`  Body:\n`);
    const lines = params.text.split("\n");
    for (const line of lines) {
      console.log(`    ${line}`);
    }
  }
  console.log();
}

// ── Post execution ───────────────────────────────────────────────────

async function executePost(
  params: RedditPostParams,
  dryRun: boolean,
  templateId?: string
): Promise<void> {
  previewPost(params, templateId);

  if (dryRun) {
    console.log("  [DRY RUN] Post was NOT submitted.\n");
    appendLogEntry({
      id: `dry-${Date.now()}`,
      subreddit: params.subreddit,
      title: params.title,
      kind: params.kind,
      url: params.kind === "link" ? params.url : "",
      template: templateId,
      posted_at: new Date().toISOString(),
      dry_run: true,
    });
    return;
  }

  // Enforce cooldown
  checkCooldown(params.subreddit);

  console.log(`  Submitting to r/${params.subreddit}...`);
  const response = await submitPost(params);

  if (response.json.errors.length > 0) {
    const errors = response.json.errors
      .map(([code, msg]) => `${code}: ${msg}`)
      .join("; ");
    throw new Error(`Reddit API errors: ${errors}`);
  }

  const redditUrl = response.json.data?.url ?? "(unknown)";
  console.log(`  Posted! ${redditUrl}\n`);

  appendLogEntry({
    id: response.json.data?.name ?? `post-${Date.now()}`,
    subreddit: params.subreddit,
    title: params.title,
    kind: params.kind,
    url: params.kind === "link" ? params.url : "",
    template: templateId,
    posted_at: new Date().toISOString(),
    reddit_url: redditUrl,
    dry_run: false,
  });
}

// ── CLI ──────────────────────────────────────────────────────────────

async function main() {
  const { values } = parseArgs({
    options: {
      list: { type: "boolean", default: false },
      template: { type: "string" },
      subreddit: { type: "string" },
      subreddits: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      delay: { type: "string" },
      link: { type: "boolean", default: false },
      self: { type: "boolean", default: false },
      title: { type: "string" },
      url: { type: "string" },
      text: { type: "string" },
      help: { type: "boolean", default: false },
    },
    strict: true,
  });

  // ── Help ─────────────────────────────────────────────────────────
  if (values.help) {
    console.log(`
Reddit Posting Tool — ziweiastrology.ai

Usage:
  npx tsx scripts/reddit-post.ts [options]

Options:
  --list                    List available post templates
  --template <id>           Use a pre-built template
  --subreddit <name>        Target subreddit (without r/)
  --subreddits <a,b,c>      Batch: comma-separated subreddits
  --dry-run                 Preview without submitting
  --delay <seconds>         Delay between batch posts (default: 300)
  --link                    Custom link post mode
  --self                    Custom self/text post mode
  --title <title>           Post title (for custom posts)
  --url <url>               Link URL (for --link)
  --text <body>             Post body (for --self)
  --help                    Show this help message

Examples:
  npx tsx scripts/reddit-post.ts --list
  npx tsx scripts/reddit-post.ts --template blog-intro --subreddit astrology --dry-run
  npx tsx scripts/reddit-post.ts --template blog-intro --subreddits astrology,ZiWeiDouShu --delay 300
  npx tsx scripts/reddit-post.ts --link --title "My Post" --url "https://..." --subreddit test
  npx tsx scripts/reddit-post.ts --self --title "My Post" --text "Body..." --subreddit test
`);
    return;
  }

  // ── List templates ───────────────────────────────────────────────
  if (values.list) {
    listTemplates();
    console.log(`Total: ${templates.length} templates\n`);
    return;
  }

  const dryRun = values["dry-run"] ?? false;
  const batchDelay = parseInt(values.delay ?? String(DEFAULT_BATCH_DELAY), 10);

  // ── Template-based posting ───────────────────────────────────────
  if (values.template) {
    const tpl = getTemplate(values.template);
    if (!tpl) {
      console.error(`Unknown template: "${values.template}"`);
      console.error(
        `Available: ${templates.map((t) => t.id).join(", ")}`
      );
      process.exit(1);
    }

    // Determine target subreddits
    const subs: string[] = values.subreddits
      ? values.subreddits.split(",").map((s) => s.trim())
      : values.subreddit
        ? [values.subreddit]
        : tpl.recommended_subreddits.slice(0, 1); // default: first recommended

    for (let i = 0; i < subs.length; i++) {
      const sub = subs[i];
      const params: RedditPostParams =
        tpl.kind === "link"
          ? { kind: "link", subreddit: sub, title: tpl.title, url: tpl.url! }
          : { kind: "self", subreddit: sub, title: tpl.title, text: tpl.text! };

      try {
        await executePost(params, dryRun, tpl.id);
      } catch (err) {
        console.error(`  Error posting to r/${sub}: ${(err as Error).message}\n`);
      }

      // Batch delay between posts (skip after last)
      if (!dryRun && i < subs.length - 1) {
        console.log(
          `  Waiting ${batchDelay}s before next post (batch delay)...\n`
        );
        await sleep(batchDelay);
      }
    }
    return;
  }

  // ── Custom link post ─────────────────────────────────────────────
  if (values.link) {
    if (!values.title || !values.url || !values.subreddit) {
      console.error("--link requires --title, --url, and --subreddit");
      process.exit(1);
    }
    await executePost(
      {
        kind: "link",
        subreddit: values.subreddit,
        title: values.title,
        url: values.url,
      },
      dryRun
    );
    return;
  }

  // ── Custom self post ─────────────────────────────────────────────
  if (values.self) {
    if (!values.title || !values.text || !values.subreddit) {
      console.error("--self requires --title, --text, and --subreddit");
      process.exit(1);
    }
    await executePost(
      {
        kind: "self",
        subreddit: values.subreddit,
        title: values.title,
        text: values.text,
      },
      dryRun
    );
    return;
  }

  // ── No valid command ─────────────────────────────────────────────
  console.error("No action specified. Use --list, --template, --link, or --self.");
  console.error("Run with --help for usage information.");
  process.exit(1);
}

main().catch((err) => {
  console.error(`\nFatal error: ${(err as Error).message}`);
  process.exit(1);
});
