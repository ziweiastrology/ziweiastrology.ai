"use client";

import { use } from "react";
import { useUserProfile } from "@/hooks/useProfile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import MatchScoreCard from "@/components/profile/MatchScoreCard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { Lock } from "lucide-react";

export default function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const { data, isLoading } = useUserProfile(userId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          <div className="h-48 animate-pulse rounded-lg bg-celestial-800/30" />
          <div className="h-32 animate-pulse rounded-lg bg-celestial-800/30" />
        </div>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 text-center">
          <p className="text-parchment-500">User not found.</p>
        </div>
      </div>
    );
  }

  if (!data.isProfilePublic) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8 text-center">
          <Lock className="mx-auto mb-3 h-8 w-8 text-parchment-600" />
          <h2 className="text-lg font-semibold text-parchment-200">Private Profile</h2>
          <p className="mt-1 text-sm text-parchment-500">This user has set their profile to private.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="space-y-6 pb-16">
        <ProfileHeader user={data} isFollowing={data.isFollowing} />
        <MatchScoreCard matchScore={data.matchScore} canView={!!data.matchScore || false} />
        <ProfileTabs userId={userId} posts={[]} />
      </div>
    </div>
  );
}
