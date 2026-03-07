import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

export const metadata = {
  title: "Dashboard | ZiWei Astrology AI",
  description: "Your personal cosmic command center — chart insights, credits, courses, and community activity.",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <section className="celestial-bg min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <DashboardOverview />
      </div>
    </section>
  );
}
