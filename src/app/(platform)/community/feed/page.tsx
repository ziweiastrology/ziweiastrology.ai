"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import PostCard from "@/components/community/PostCard";
import PostEditor from "@/components/community/PostEditor";
import SearchBar from "@/components/community/SearchBar";
import SortTabs from "@/components/community/SortTabs";
import FeedSidebar from "@/components/community/FeedSidebar";
import { useFeed } from "@/hooks/useCommunity";

export default function CommunityFeedPage() {
  const [sort, setSort] = useState<"hot" | "new" | "following">("hot");
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((q: string) => setSearch(q), []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeed({ sort, search });

  // Infinite scroll
  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.posts || []) || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Community Feed"
        subtitle="Discussions, insights, and shared discoveries from practitioners worldwide."
      />

      <div className="flex gap-8 pb-16">
        {/* Main feed */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SortTabs active={sort} onChange={setSort} />
            <div className="w-full sm:w-64">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          <div className="mb-6">
            <PostEditor />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gold-400" />
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 text-center">
              <p className="text-parchment-500">No posts found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post: Record<string, unknown>) => (
                <PostCard
                  key={post.id as string}
                  id={post.id as string}
                  title={post.title as string}
                  content={post.content as string}
                  type={post.type as string}
                  category={post.category as string | null}
                  author={post.author as { id: string; name: string | null; tier: string; avatarUrl?: string | null }}
                  voteScore={(post.voteScore as number) || 0}
                  commentCount={(post._count as { comments: number })?.comments || 0}
                  pinned={post.pinned as boolean}
                  createdAt={post.createdAt as string}
                  tags={post.tags as string[]}
                  viewCount={post.viewCount as number}
                  userVote={post.userVote as number | null}
                  href={`/community/post/${post.id}`}
                />
              ))}
            </div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={observerRef} className="py-4 text-center">
            {isFetchingNextPage && (
              <Loader2 className="mx-auto h-5 w-5 animate-spin text-gold-400" />
            )}
          </div>
        </div>

        {/* Sidebar — desktop only */}
        <div className="hidden w-72 shrink-0 lg:block">
          <FeedSidebar />
        </div>
      </div>
    </div>
  );
}
