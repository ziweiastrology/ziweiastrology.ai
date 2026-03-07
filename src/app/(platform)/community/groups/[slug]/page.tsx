"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import PostCard from "@/components/community/PostCard";

interface GroupDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { members: number; posts: number };
}

interface PostData {
  id: string;
  title: string;
  content: string;
  type: string;
  category: string | null;
  author: { id: string; name: string | null; tier: string };
  voteScore: number;
  _count: { comments: number };
  createdAt: string;
}

export default function GroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetch(`/api/community/groups?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        const groups = data.groups || data;
        const found = Array.isArray(groups)
          ? groups.find((g: GroupDetail) => g.slug === slug)
          : null;
        setGroup(found || null);

        if (found) {
          return fetch(`/api/community/posts?groupId=${found.id}`)
            .then((r) => r.json())
            .then((postData) => {
              setPosts(postData.posts || []);
            });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleJoinLeave() {
    setJoining(true);
    try {
      const res = await fetch(`/api/community/groups/${slug}/join`, {
        method: "POST",
      });
      const data = await res.json();
      setIsMember(data.joined);
    } catch {
      /* ignore */
    }
    setJoining(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-400" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 text-center">
          <p className="text-parchment-500">Group not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/community/groups"
        className="mb-4 inline-flex items-center gap-1 text-sm text-parchment-500 hover:text-parchment-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Groups
      </Link>

      {/* Group header */}
      <div className="mb-6 rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-xl font-bold text-parchment-200"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {group.name}
            </h1>
            {group.description && (
              <p className="mt-2 text-sm text-parchment-500">
                {group.description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-3 text-xs text-parchment-600">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {group._count.members} members
              </span>
            </div>
          </div>
          <Button size="sm" onClick={handleJoinLeave} disabled={joining}>
            {joining ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isMember ? (
              "Leave"
            ) : (
              "Join"
            )}
          </Button>
        </div>
      </div>

      {/* Group posts */}
      <div className="space-y-4 pb-16">
        {posts.length === 0 ? (
          <p className="py-8 text-center text-sm text-parchment-600">
            No posts in this group yet.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              type={post.type}
              category={post.category}
              author={post.author}
              voteScore={post.voteScore || 0}
              commentCount={post._count?.comments || 0}
              createdAt={post.createdAt}
              href={`/community/post/${post.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
