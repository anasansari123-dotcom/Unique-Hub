"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Clock, LogOut, Mail, Menu, Phone, Search, ShoppingBag, User, X } from "lucide-react";
import { SITE, telHref } from "@/lib/config";
import { SERVICES } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/BrandIcons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totals, user, logout, ready } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const search = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-ink-900 text-xs text-zinc-300 md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={telHref(SITE.phone)} className="flex items-center gap-1.5 hover:text-white"><Phone className="size-3.5 text-brand-500" />Service: {SITE.phone}</a>
            <a href={telHref(SITE.salesPhone)} className="hidden items-center gap-1.5 hover:text-white xl:flex"><Phone className="size-3.5 text-brand-500" />Sales: {SITE.salesPhone}</a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-white"><Mail className="size-3.5 text-brand-500" />{SITE.email}</a>
            <span className="hidden items-center gap-1.5 lg:flex"><Clock className="size-3.5 text-brand-500" />{SITE.hours}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Free delivery on orders above ₹{SITE.freeShippingAbove.toLocaleString("en-IN")}</span>
            <div className="flex items-center gap-3">
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Facebook"><FacebookIcon className="size-3.5" /></a>
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Instagram"><InstagramIcon className="size-3.5" /></a>
              <a href={SITE.social.youtube} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="YouTube"><YoutubeIcon className="size-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={cn("sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-shadow", scrolled ? "border-zinc-200 shadow-lg shadow-black/5" : "border-transparent")}>
        <div className="container-x flex h-[72px] items-center gap-4 lg:gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image src="/logo.jpeg" alt="Unique Hub 24" width={48} height={48} className="size-12 rounded-full" priority />
            <div className="leading-tight">
              <p className="font-display text-lg font-extrabold tracking-tight text-zinc-900">UNIQUE <span className="text-brand-600">HUB</span></p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">24 · Tech Store</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) =>
              n.dropdown ? (
                <div key={n.href} className="group relative">
                  <Link href={n.href} className={cn("flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition", isActive(n.href) ? "text-brand-600" : "text-zinc-700 hover:text-brand-600")}>
                    {n.label}<ChevronDown className="size-3.5 transition group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-64 translate-y-2 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl shadow-black/10">
                      {SERVICES.map((s) => (
                        <Link key={s.id} href={`/services#${s.id}`} className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-brand-50 hover:text-brand-700">{s.title}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={cn("rounded-lg px-3.5 py-2 text-sm font-semibold transition", isActive(n.href) ? "text-brand-600" : "text-zinc-700 hover:text-brand-600")}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>

          <form onSubmit={search} className="ml-auto hidden max-w-xs flex-1 md:flex">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search laptops, CCTV, SSD…" className="input rounded-full bg-zinc-50 py-2 pl-10" />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            {ready && user ? (
              <div className="group relative hidden sm:block">
                <Link href="/account" className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-zinc-100">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{user.name[0]?.toUpperCase()}</span>
                  <span className="max-w-24 truncate text-sm font-semibold">{user.name.split(" ")[0]}</span>
                </Link>
                <div className="invisible absolute right-0 top-full w-48 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl">
                    <Link href="/account" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-zinc-100"><User className="size-4" />My Orders</Link>
                    <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-600 hover:bg-brand-50"><LogOut className="size-4" />Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn-ghost hidden sm:inline-flex"><User className="size-4" />Login</Link>
            )}
            <Link href="/cart" className="relative flex size-11 items-center justify-center rounded-full hover:bg-zinc-100" aria-label="Cart">
              <ShoppingBag className="size-5" />
              {ready && totals.count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">{totals.count}</span>
              )}
            </Link>
            <button onClick={() => setOpen(true)} className="flex size-11 items-center justify-center rounded-full hover:bg-zinc-100 lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-[60] lg:hidden", open ? "visible" : "invisible")}>
        <div onClick={() => setOpen(false)} className={cn("absolute inset-0 bg-black/50 transition-opacity", open ? "opacity-100" : "opacity-0")} />
        <aside className={cn("absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300", open ? "translate-x-0" : "translate-x-full")}>
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.jpeg" alt="" width={40} height={40} className="size-10 rounded-full" />
              <span className="font-display font-extrabold">UNIQUE <span className="text-brand-600">HUB</span> 24</span>
            </div>
            <button onClick={() => setOpen(false)} className="flex size-10 items-center justify-center rounded-full hover:bg-zinc-100" aria-label="Close menu"><X className="size-5" /></button>
          </div>
          <form onSubmit={search} className="p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="input pl-10" />
            </div>
          </form>
          <nav className="flex-1 overflow-y-auto px-4">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={cn("flex items-center justify-between rounded-xl px-4 py-3 font-semibold", isActive(n.href) ? "bg-brand-50 text-brand-600" : "text-zinc-800 hover:bg-zinc-50")}>
                {n.label}
              </Link>
            ))}
            <div className="my-3 border-t" />
            {user ? (
              <>
                <Link href="/account" className="flex items-center gap-2 rounded-xl px-4 py-3 font-semibold hover:bg-zinc-50"><User className="size-4" />My Account</Link>
                <button onClick={logout} className="flex w-full items-center gap-2 rounded-xl px-4 py-3 font-semibold text-brand-600 hover:bg-brand-50"><LogOut className="size-4" />Logout</button>
              </>
            ) : (
              <Link href="/login" className="btn-primary w-full">Login / Register</Link>
            )}
          </nav>
          <div className="border-t p-4 text-sm text-zinc-600">
            <a href={telHref(SITE.phone)} className="flex items-center gap-2"><Phone className="size-4 text-brand-600" />Service: {SITE.phone}</a>
            <a href={telHref(SITE.salesPhone)} className="mt-2 flex items-center gap-2"><Phone className="size-4 text-brand-600" />Sales: {SITE.salesPhone}</a>
          </div>
        </aside>
      </div>
    </>
  );
}
