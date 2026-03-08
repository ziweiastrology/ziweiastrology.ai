import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PlatformCopilot } from "@/components/layout/PlatformCopilot";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <PlatformCopilot />
    </div>
  );
}
