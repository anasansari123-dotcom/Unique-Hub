"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell, Boxes, CreditCard, ExternalLink, FileText, LayoutDashboard, Loader2, LogOut, Menu, MessageSquare,
  Receipt, Search, Settings, ShoppingCart, Users, X,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { group: "Overview", items: [{ href: "/admin", label: "Dashboard", I: LayoutDashboard }] },
  {
    group: "Sales",
    items: [
      { href: "/admin/orders", label: "Orders", I: ShoppingCart, badge: "orders" },
      { href: "/admin/billing", label: "New Bill (POS)", I: Receipt },
      { href: "/admin/invoices", label: "Invoices", I: FileText },
      { href: "/admin/payments", label: "Payments", I: CreditCard },
    ],
  },
  {
    group: "Catalogue & CRM",
    items: [
      { href: "/admin/products", label: "Products", I: Boxes },
      { href: "/admin/customers", label: "Customers", I: Users },
      { href: "/admin/enquiries", label: "Enquiries", I: MessageSquare, badge: "enquiries" },
    ],
  },
  { group: "System", items: [{ href: "/admin/settings", label: "Settings", I: Settings }] },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, admin, adminLogout, orders, enquiries } = useStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !admin) router.replace("/admin/login");
  }, [ready, admin, router]);
  useEffect(() => setOpen(false), [pathname]);

  if (!ready || !admin)
    return <div className="flex min-h-screen items-center justify-center bg-zinc-100"><Loader2 className="size-8 animate-spin text-brand-600" /></div>;

  const counts: Record<string, number> = {
    orders: orders.filter((o) => o.status === "Pending").length,
    enquiries: enquiries.filter((e) => !e.read).length,
  };
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  const current = NAV.flatMap((g) => g.items).find((i) => isActive(i.href));

  const Sidebar = (
    <div className="flex h-full flex-col bg-ink-900 text-zinc-400">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <Image src="/logo.jpeg" alt="" width={44} height={44} className="size-11 rounded-full" />
        <div>
          <p className="font-display text-base font-extrabold text-white">UNIQUE <span className="text-brand-500">HUB</span> 24</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">ERP Console</p>
        </div>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6 scroll-thin">
        {NAV.map((g) => (
          <div key={g.group}>
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{g.group}</p>
            <div className="space-y-1">
              {g.items.map(({ href, label, I, badge }) => (
                <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition", isActive(href) ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30" : "hover:bg-white/5 hover:text-white")}>
                  <I className="size-[18px]" />
                  <span className="flex-1">{label}</span>
                  {badge && counts[badge] > 0 && <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", isActive(href) ? "bg-white text-brand-600" : "bg-brand-600 text-white")}>{counts[badge]}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-white/5 hover:text-white"><ExternalLink className="size-[18px]" />View Website</Link>
        <button onClick={() => { adminLogout(); router.replace("/admin/login"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-brand-600/20 hover:text-brand-500"><LogOut className="size-[18px]" />Logout</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-100 print:bg-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block print:hidden">{Sidebar}</aside>

      <div className={cn("fixed inset-0 z-50 lg:hidden print:hidden", open ? "visible" : "invisible")}>
        <div onClick={() => setOpen(false)} className={cn("absolute inset-0 bg-black/50 transition", open ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-y-0 left-0 w-64 transition-transform", open ? "translate-x-0" : "-translate-x-full")}>
          {Sidebar}
          <button onClick={() => setOpen(false)} className="absolute -right-12 top-4 flex size-10 items-center justify-center rounded-full bg-white" aria-label="Close menu"><X className="size-5" /></button>
        </div>
      </div>

      <div className="lg:pl-64 print:pl-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur sm:px-6 print:hidden">
          <button onClick={() => setOpen(true)} className="flex size-10 items-center justify-center rounded-lg hover:bg-zinc-100 lg:hidden" aria-label="Open menu"><Menu className="size-5" /></button>
          <h1 className="truncate text-base font-bold text-zinc-900 sm:text-lg">{current?.label ?? "Admin"}</h1>
          <div className="relative ml-auto hidden w-72 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input placeholder="Search orders, products…" className="input rounded-full bg-zinc-50 py-2 pl-9" onKeyDown={(e) => { if (e.key === "Enter") router.push(`/admin/orders?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`); }} />
          </div>
          <Link href="/admin/enquiries" className="relative ml-auto flex size-10 items-center justify-center rounded-full hover:bg-zinc-100 md:ml-0" aria-label="Notifications">
            <Bell className="size-5" />
            {counts.enquiries + counts.orders > 0 && <span className="absolute right-2 top-2 size-2 rounded-full bg-brand-600 ring-2 ring-white" />}
          </Link>
          <div className="flex items-center gap-2.5 sm:border-l sm:pl-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">A</span>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-zinc-500">Store Owner</p>
            </div>
          </div>
        </header>
        <main className="p-3 sm:p-6 print:p-0">{children}</main>
      </div>
    </div>
  );
}
