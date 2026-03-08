/**
 * Reddit API client — script-type OAuth2 (server-side only).
 *
 * Uses native fetch, no external dependencies.
 * Follows the same lazy-init pattern as src/lib/stripe.ts.
 */

import type {
  RedditOAuthToken,
  RedditRateLimitInfo,
  RedditSubmitResponse,
  RedditSubredditRules,
  RedditPostParams,
} from "@/types/reddit";

// ── Token cache ──────────────────────────────────────────────────────

let cachedToken: RedditOAuthToken | null = null;

function isTokenExpired(token: RedditOAuthToken): boolean {
  const elapsed = Date.now() - token.obtained_at;
  // Expire 60 seconds early to avoid edge-case failures
  return elapsed >= (token.expires_in - 60) * 1000;
}

// ── Rate limit tracking ──────────────────────────────────────────────

let rateLimit: RedditRateLimitInfo = {
  remaining: 100,
  reset: 0,
  used: 0,
};

function updateRateLimit(headers: Headers): void {
  const remaining = headers.get("x-ratelimit-remaining");
  const reset = headers.get("x-ratelimit-reset");
  const used = headers.get("x-ratelimit-used");
  if (remaining) rateLimit.remaining = parseFloat(remaining);
  if (reset) rateLimit.reset = parseFloat(reset);
  if (used) rateLimit.used = parseInt(used, 10);
}

export function getRateLimitInfo(): RedditRateLimitInfo {
  return { ...rateLimit };
}

// ── Env helpers ──────────────────────────────────────────────────────

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
}

function getUserAgent(): string {
  return (
    process.env.REDDIT_USER_AGENT ??
    "ziweiastrology:v1.0.0 (by /u/ziweiastrology)"
  );
}

// ── OAuth2 ───────────────────────────────────────────────────────────

async function authenticate(): Promise<RedditOAuthToken> {
  if (cachedToken && !isTokenExpired(cachedToken)) {
    return cachedToken;
  }

  const clientId = requireEnv("REDDIT_CLIENT_ID");
  const clientSecret = requireEnv("REDDIT_CLIENT_SECRET");
  const username = requireEnv("REDDIT_USERNAME");
  const password = requireEnv("REDDIT_PASSWORD");

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": getUserAgent(),
    },
    body: new URLSearchParams({
      grant_type: "password",
      username,
      password,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Reddit OAuth failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as Omit<RedditOAuthToken, "obtained_at">;
  cachedToken = { ...data, obtained_at: Date.now() };
  return cachedToken;
}

// ── Authenticated request helper ─────────────────────────────────────

async function redditFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await authenticate();

  const res = await fetch(`https://oauth.reddit.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "User-Agent": getUserAgent(),
      ...options.headers,
    },
  });

  updateRateLimit(res.headers);
  return res;
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Submit a link or self post to a subreddit.
 */
export async function submitPost(
  params: RedditPostParams
): Promise<RedditSubmitResponse> {
  const body: Record<string, string> = {
    api_type: "json",
    kind: params.kind,
    sr: params.subreddit,
    title: params.title,
    sendreplies: String(params.sendreplies ?? true),
  };

  if (params.kind === "link") {
    body.url = params.url;
  } else {
    body.text = params.text;
  }

  if (params.flair_id) body.flair_id = params.flair_id;
  if (params.flair_text) body.flair_text = params.flair_text;

  const res = await redditFetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Reddit submit failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<RedditSubmitResponse>;
}

/**
 * Convenience wrapper: submit a link post.
 */
export async function submitLink(
  subreddit: string,
  title: string,
  url: string
): Promise<RedditSubmitResponse> {
  return submitPost({ kind: "link", subreddit, title, url });
}

/**
 * Convenience wrapper: submit a self/text post.
 */
export async function submitSelfPost(
  subreddit: string,
  title: string,
  text: string
): Promise<RedditSubmitResponse> {
  return submitPost({ kind: "self", subreddit, title, text });
}

/**
 * Fetch a subreddit's rules (useful for pre-flight checks).
 */
export async function getSubredditRules(
  subreddit: string
): Promise<RedditSubredditRules> {
  const res = await redditFetch(`/r/${subreddit}/about/rules.json`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to fetch rules for r/${subreddit} (${res.status}): ${text}`
    );
  }

  return res.json() as Promise<RedditSubredditRules>;
}
