"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, MessageSquare, Loader2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import MembershipWall from "@/components/community/MembershipWall";

interface Group {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { members: number; posts: number };
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/community/groups")
      .then((r) => r.json())
      .then((data) => {
        setGroups(Array.isArray(data.groups) ? data.groups : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <MembershipWall requiredTier="BASIC">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Groups"
          subtitle="Join focused study groups organized by topic and experience level."
        />

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-gold-400" />
          </div>
        ) : groups.length === 0 ? (
          <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 text-center">
            <p className="text-parchment-500">
              No groups yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 pb-16 sm:grid-cols-2">
            {groups.map((group) => (
              <Link
                key={group.id}
                href={`/community/groups/${group.slug}`}
                className="group rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
              >
                <h3
                  className="mb-2 text-lg font-bold text-parchment-200 group-hover:text-gold-400 transition-colors"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {group.name}
                </h3>
                <p className="mb-4 text-sm text-parchment-500">
                  {group.description || "No description."}
                </p>
                <div className="flex items-center gap-4 text-xs text-parchment-600">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {group._count.members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {group._count.posts} posts
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MembershipWall>
  );
}
