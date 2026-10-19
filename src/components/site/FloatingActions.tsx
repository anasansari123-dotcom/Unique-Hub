"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUp, Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { whatsappLink } from "@/lib/config";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function FloatingActions() {
  const pathname = usePathname();
  const { totals, user, ready } = useStore();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pages with their own sticky action bar on mobile
  const ownBar = /^\/products\/[^/]+$/.test(pathname) || pathname.startsWith("/checkout");

  const tabs = [
    { href: "/", label: "Home", Icon: Home },
    { href: "/products", label: "Shop", Icon: LayoutGrid },
    { href: "/cart", label: "Cart", Icon: ShoppingBag, count: ready ? totals.count : 0 },
    { href: user ? "/account" : "/login", label: user ? "Account" : "Login", Icon: User },
  ];

  return (
    <>
      {/* WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-[88px] right-4 z-40 flex items-center gap-2 lg:bottom-6 lg:right-6 print:hidden"
      >
        <span className="hidden rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-lg transition group-hover:block">Chat with us</span>
        <span className="relative flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition group-hover:scale-110 sm:size-14">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <WhatsAppIcon className="relative size-6 sm:size-7" />
        </span>
      </a>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label="Back to top"
        className={cn(
          "fixed bottom-24 left-4 z-40 hidden size-11 items-center justify-center rounded-full bg-ink-900 text-white shadow-lg transition hover:bg-brand-600 lg:bottom-6 lg:left-auto lg:right-24 lg:flex print:hidden",
          showTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>

      {/* Mobile bottom nav */}
      <nav className={cn("pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur lg:hidden print:hidden", ownBar && "hidden")}>
        <div className="grid grid-cols-4">
          {tabs.map(({ href, label, Icon, count }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={label} href={href} className={cn("relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium", active ? "text-brand-600" : "text-zinc-500")}>
                <Icon className="size-5" />
                {label}
                {!!count && <span className="absolute right-[calc(50%-18px)] top-1.5 flex min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">{count}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
