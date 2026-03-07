"use client";

import { useDashboard } from "@/hooks/useDashboard";
import ChartSnapshotCard from "./ChartSnapshotCard";
import CreditBalanceCard from "./CreditBalanceCard";
import ActivityFeed from "./ActivityFeed";
import CourseProgressWidget from "./CourseProgressWidget";
import QuickActionsGrid from "./QuickActionsGrid";
import NotificationCard from "./NotificationCard";
import WelcomeInsightCard from "./WelcomeInsightCard";

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

      {/* Today's Insight */}
      <WelcomeInsightCard
        birthDate={user.birthDate}
        birthHour={user.birthHour}
        birthGender={user.birthGender}
      />

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

        {/* Quick Actions */}
        <QuickActionsGrid />

        {/* Activity Feed — spans 2 cols, hide if empty */}
        {(recentPosts.length > 0 || recentComments.length > 0) && (
          <div className="lg:col-span-2">
            <ActivityFeed
              recentPosts={recentPosts}
              recentComments={recentComments}
            />
          </div>
        )}

        {/* Course Progress — spans 2 cols, hide if no enrollments */}
        {enrollments.length > 0 && (
          <div className="lg:col-span-2">
            <CourseProgressWidget enrollments={enrollments} />
          </div>
        )}
      </div>
    </div>
  );
}
