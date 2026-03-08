"use client";

import { useState, useEffect } from "react";
import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";
import ChartSnapshotCard from "./ChartSnapshotCard";
import CreditBalanceCard from "./CreditBalanceCard";
import ActivityFeed from "./ActivityFeed";
import CourseProgressWidget from "./CourseProgressWidget";
import QuickActionsGrid from "./QuickActionsGrid";
import NotificationCard from "./NotificationCard";
import WelcomeInsightCard from "./WelcomeInsightCard";

function ReportHistoryCard() {
  const [reports, setReports] = useState<{ id: string; status: string; createdAt: string; sections: { id: string }[] }[]>([]);

  useEffect(() => {
    fetch("/api/reports")
      .then((r) => r.ok ? r.json() : { reports: [] })
      .then((d) => setReports(d.reports?.slice(0, 3) ?? []))
      .catch(() => {});
  }, []);

  if (reports.length === 0) return null;

  return (
    <div className="rounded-xl border border-gold-700/20 bg-celestial-900/40 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-parchment-200 flex items-center gap-2">
          <FileText className="h-4 w-4 text-gold-500" />
          Your Reports
        </h3>
        <Link
          href="/reports"
          className="text-[10px] text-gold-500 hover:text-gold-400 flex items-center gap-1"
        >
          View all <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {reports.map((r) => (
          <Link
            key={r.id}
            href={`/reports/${r.id}`}
            className="flex items-center justify-between p-3 rounded-lg border border-gold-700/10 bg-celestial-800/30 hover:border-gold-500/20 transition-colors"
          >
            <div>
              <p className="text-xs font-medium text-parchment-300">Life-Path Report</p>
              <p className="text-[10px] text-parchment-600">
                {new Date(r.createdAt).toLocaleDateString()} · {r.sections.length} sections
              </p>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-sm border ${
              r.status === "COMPLETE" ? "text-quantum-green border-quantum-green/30" :
              r.status === "GENERATING" ? "text-quantum-cyan border-quantum-cyan/30" :
              "text-parchment-500 border-parchment-500/30"
            }`}>
              {r.status === "COMPLETE" ? "Complete" : r.status === "GENERATING" ? "Generating" : r.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

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

        {/* Report History */}
        <ReportHistoryCard />

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
