"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function AffiliateApplyForm({
  onSuccess,
}: {
  onSuccess: (data: { code: string; status: string }) => void;
}) {
  const [form, setForm] = useState({ payoutEmail: "", bio: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/affiliates/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error === "already_applied" ? "You've already applied." : data.error || "Failed to apply");
        setLoading(false);
        return;
      }

      onSuccess({ code: data.code, status: data.status });
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-parchment-400">
          Payout Email (for Stripe commission transfers)
        </label>
        <input
          type="email"
          value={form.payoutEmail}
          onChange={(e) => setForm((f) => ({ ...f, payoutEmail: e.target.value }))}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-parchment-400">
          Website / Social Media (optional)
        </label>
        <input
          type="url"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted"
          placeholder="https://yoursite.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-parchment-400">
          How will you promote ZiWeiAI? (optional)
        </label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted"
          placeholder="Blog, YouTube, social media, email list..."
        />
      </div>

      {error && <p className="text-sm text-quantum-red">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-2.5 font-semibold text-celestial-900 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Send className="h-4 w-4" />
            Apply to Affiliate Program
          </>
        )}
      </button>
    </form>
  );
}
