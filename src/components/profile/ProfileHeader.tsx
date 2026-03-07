"use client";

import Link from "next/link";
import { MapPin, Crown, UserPlus, UserMinus, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToggleFollow } from "@/hooks/useFollow";
import { useSession } from "next-auth/react";

const TIER_COLORS: Record<string, string> = {
  FREE: "text-parchment-400 bg-parchment-400/10",
  BASIC: "text-quantum-cyan bg-quantum-cyan/10",
  PREMIUM: "text-quantum-orange bg-quantum-orange/10",
  SIFU: "text-gold-400 bg-gold-400/10",
};

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string | null;
    image: string | null;
    avatarUrl: string | null;
    headline: string | null;
    location: string | null;
    bio: string | null;
    tier: string;
    createdAt: string;
    isProfilePublic: boolean;
    tags: { tag: { id: string; name: string; nameCn: string; category: string } }[];
    _count: { posts: number; followers: number; following: number };
  };
  isFollowing: boolean;
}

export default function ProfileHeader({ user, isFollowing }: ProfileHeaderProps) {
  const { data: session } = useSession();
  const toggleFollow = useToggleFollow();
  const isOwnProfile = session?.user?.id === user.id;
  const avatar = user.avatarUrl || user.image;
  const initials = (user.name || "?").slice(0, 2).toUpperCase();

  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-gold-700/30 bg-celestial-700/50 text-2xl font-bold text-gold-400">
          {avatar ? (
            <img src={avatar} alt={user.name || ""} className="h-full w-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-xl font-bold text-parchment-200" style={{ fontFamily: "var(--font-cinzel)" }}>
              {user.name || "Anonymous"}
            </h1>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TIER_COLORS[user.tier] || TIER_COLORS.FREE}`}>
              {user.tier === "SIFU" && <Crown className="mr-1 inline h-3 w-3" />}
              {user.tier}
            </span>
          </div>
          {user.headline && (
            <p className="mt-1 text-sm text-parchment-400">{user.headline}</p>
          )}
          {user.location && (
            <p className="mt-1 flex items-center justify-center gap-1 text-xs text-parchment-600 sm:justify-start">
              <MapPin className="h-3 w-3" />
              {user.location}
            </p>
          )}
          {user.bio && (
            <p className="mt-2 text-sm text-parchment-500">{user.bio}</p>
          )}

          {/* Stats */}
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-parchment-500 sm:justify-start">
            <span><strong className="text-parchment-300">{user._count.posts}</strong> posts</span>
            <span><strong className="text-parchment-300">{user._count.followers}</strong> followers</span>
            <span><strong className="text-parchment-300">{user._count.following}</strong> following</span>
          </div>

          {/* Tags */}
          {user.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {user.tags.map((t) => (
                <span
                  key={t.tag.id}
                  className="rounded-full border border-gold-700/20 px-2 py-0.5 text-xs text-parchment-500"
                >
                  {t.tag.nameCn}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          {!isOwnProfile && session && (
            <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
              <Button
                size="sm"
                onClick={() => toggleFollow.mutate(user.id)}
                disabled={toggleFollow.isPending}
              >
                {isFollowing ? (
                  <>
                    <UserMinus className="mr-1.5 h-3.5 w-3.5" />
                    Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                    Follow
                  </>
                )}
              </Button>
              <Link href={`/messages?to=${user.id}`}>
                <Button size="sm" variant="outline">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                  Message
                </Button>
              </Link>
            </div>
          )}
          {isOwnProfile && (
            <div className="mt-4">
              <Link href="/settings">
                <Button size="sm" variant="outline">
                  <Shield className="mr-1.5 h-3.5 w-3.5" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
