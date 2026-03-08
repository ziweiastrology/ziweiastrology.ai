import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReportViewer from "@/components/reports/ReportViewer";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReportDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const { id } = await params;

  return (
    <div className="max-w-5xl mx-auto">
      <ReportViewer reportId={id} />
    </div>
  );
}
