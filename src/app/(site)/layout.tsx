import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="contents print:hidden"><Header /></div>
      <main className="flex-1">{children}</main>
      <div className="print:hidden"><Footer /></div>
      <FloatingActions />
    </div>
  );
}
