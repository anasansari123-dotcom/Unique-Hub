"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BadgeCheck, ChevronRight, LogOut, Mail, Package, Phone, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatDate, formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatusBadge } from "@/components/StatusBadge";

export default function AccountPage() {
  const router = useRouter();
  const { ready, user, orders, logout } = useStore();

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/account");
  }, [ready, user, router]);
  if (!ready || !user) return null;

  const mine = orders.filter((o) => o.customerId === user.id || o.customer.email.toLowerCase() === user.email.toLowerCase());
  const spent = mine.filter((o) => o.paymentStatus === "Paid").reduce((s, o) => s + o.total, 0);

  return (
    <section className="bg-zinc-50 py-10">
      <div className="container-x grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <div className="card p-6 text-center">
            <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 font-display text-3xl font-bold text-white">{user.name[0]?.toUpperCase()}</span>
            <h1 className="mt-4 text-xl font-bold">{user.name}</h1>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600"><BadgeCheck className="size-4" />Email verified</p>
            <div className="mt-5 space-y-2 border-t pt-5 text-left text-sm text-zinc-600">
              <p className="flex items-center gap-2"><Mail className="size-4 text-zinc-400" />{user.email}</p>
              {user.phone && <p className="flex items-center gap-2"><Phone className="size-4 text-zinc-400" />+91 {user.phone}</p>}
            </div>
            <button onClick={() => { logout(); router.push("/"); }} className="btn-outline mt-5 w-full"><LogOut className="size-4" />Logout</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4"><p className="text-2xl font-bold">{mine.length}</p><p className="text-xs text-zinc-500">Orders</p></div>
            <div className="card p-4"><p className="text-2xl font-bold">{formatINR(spent)}</p><p className="text-xs text-zinc-500">Total spent</p></div>
          </div>
        </aside>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold"><Package className="size-6 text-brand-600" />My Orders</h2>
          {mine.length === 0 ? (
            <div className="card mt-6 flex flex-col items-center px-6 py-16 text-center">
              <ShoppingBag className="size-12 text-zinc-300" />
              <p className="mt-4 font-semibold">No orders yet</p>
              <Link href="/products" className="btn-primary mt-5">Start Shopping</Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {mine.map((o) => (
                <Link key={o.id} href={`/orders/${o.id}`} className="card group block p-5 transition hover:border-brand-200 hover:shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">Order #{o.id}</p>
                      <p className="text-xs text-zinc-500">{formatDate(o.createdAt, true)} · {o.items.reduce((s, i) => s + i.qty, 0)} items · {o.paymentMethod}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={o.status} />
                      <span className="font-bold">{formatINR(o.total)}</span>
                      <ChevronRight className="size-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {o.items.slice(0, 5).map((it) => <SmartImage key={it.productId} src={it.image} alt="" className="size-14 rounded-lg border" />)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
