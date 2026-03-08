/** Reddit API TypeScript interfaces */

export interface RedditOAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  /** Timestamp (ms) when this token was obtained */
  obtained_at: number;
}

export interface RedditRateLimitInfo {
  /** Approximate number of requests remaining in the current period */
  remaining: number;
  /** Approximate number of seconds until the rate limit resets */
  reset: number;
  /** Approximate number of requests used in the current period */
  used: number;
}

export interface RedditSubmitResponse {
  json: {
    errors: [string, string, string][];
    data?: {
      url: string;
      drafts_count: number;
      id: string;
      name: string;
    };
  };
}

export interface RedditSubredditRules {
  rules: RedditRule[];
  site_rules: string[];
}

export interface RedditRule {
  kind: string;
  description: string;
  short_name: string;
  violation_reason: string;
  created_utc: number;
  priority: number;
}

export type RedditPostKind = "link" | "self";

export interface RedditLinkPostParams {
  kind: "link";
  subreddit: string;
  title: string;
  url: string;
  flair_id?: string;
  flair_text?: string;
  sendreplies?: boolean;
}

export interface RedditSelfPostParams {
  kind: "self";
  subreddit: string;
  title: string;
  text: string;
  flair_id?: string;
  flair_text?: string;
  sendreplies?: boolean;
}

export type RedditPostParams = RedditLinkPostParams | RedditSelfPostParams;

export interface PostLogEntry {
  id: string;
  subreddit: string;
  title: string;
  kind: RedditPostKind;
  url: string;
  template?: string;
  posted_at: string;
  reddit_url?: string;
  dry_run: boolean;
}

export interface PostLog {
  posts: PostLogEntry[];
}

export interface PostTemplate {
  id: string;
  name: string;
  description: string;
  kind: RedditPostKind;
  title: string;
  /** For link posts */
  url?: string;
  /** For self posts */
  text?: string;
  recommended_subreddits: string[];
  tags: string[];
}
