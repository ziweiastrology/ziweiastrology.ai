"use client";

import { useDashboard } from "@/hooks/useDashboard";
import ChartSnapshotCard from "./ChartSnapshotCard";
import CreditBalanceCard from "./CreditBalanceCard";
import ActivityFeed from "./ActivityFeed";
import CourseProgressWidget from "./CourseProgressWidget";
import QuickActionsGrid from "./QuickActionsGrid";
import BookmarksList from "./BookmarksList";
import NotificationCard from "./NotificationCard";
import MessageCard from "./MessageCard";
import EnergyMatchCard from "./EnergyMatchCard";
import TrendingPostsCard from "./TrendingPostsCard";

export default function DashboardOverview() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl border border-gold-700/20 bg-celestial-800/30"
          />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-quantum-red/30 bg-quantum-red/5 p-6 text-center">
        <p className="text-sm text-quantum-red">
          Failed to load dashboard data. Please try refreshing.
        </p>
      </div>
    );
  }

  const { user, recentPosts, recentComments, enrollments } = data;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="font-heading text-2xl text-gold-400">
          Welcome back, {user.name?.split(" ")[0] || "Explorer"}
        </h1>
        <p className="text-sm text-parchment-500">
          Your cosmic command center
        </p>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Chart Snapshot — spans 2 cols on desktop */}
        <div className="lg:col-span-2">
          <ChartSnapshotCard
            birthDate={user.birthDate}
            birthHour={user.birthHour}
            birthGender={user.birthGender}
          />
        </div>

        {/* Credit Balance */}
        <CreditBalanceCard credits={user.credits} tier={user.tier} />

        {/* Notifications */}
        <NotificationCard />

        {/* Messages */}
        <MessageCard />

        {/* Activity Feed — spans 2 cols */}
        <div className="lg:col-span-2">
          <ActivityFeed
            recentPosts={recentPosts}
            recentComments={recentComments}
          />
        </div>

        {/* Quick Actions */}
        <QuickActionsGrid />

        {/* Course Progress — spans 2 cols */}
        <div className="lg:col-span-2">
          <CourseProgressWidget enrollments={enrollments} />
        </div>

        {/* Energy Matches — full width */}
        <div className="lg:col-span-3">
          <EnergyMatchCard />
        </div>

        {/* Trending + Bookmarks */}
        <div className="lg:col-span-2">
          <TrendingPostsCard />
        </div>

        <BookmarksList tier={user.tier} />
      </div>
    </div>
  );
}
