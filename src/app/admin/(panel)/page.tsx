"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AlertTriangle, ArrowRight, IndianRupee, Package, Receipt, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatDate, formatINR } from "@/lib/utils";
import { MobileList, Panel, StatCard, Table } from "@/components/admin/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { SmartImage } from "@/components/ui/SmartImage";

const STATUS_COLORS: Record<string, string> = { Pending: "#f59e0b", Processing: "#0ea5e9", Shipped: "#8b5cf6", Delivered: "#10b981", Cancelled: "#a1a1aa" };

export default function Dashboard() {
  const { orders, products, customers } = useStore();

  const data = useMemo(() => {
    const valid = orders.filter((o) => o.status !== "Cancelled");
    const revenue = valid.filter((o) => o.paymentStatus === "Paid").reduce((s, o) => s + o.total, 0);
    const today = new Date().toDateString();
    const todaySales = valid.filter((o) => new Date(o.createdAt).toDateString() === today).reduce((s, o) => s + o.total, 0);

    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (6 - i));
      const total = valid.filter((o) => new Date(o.createdAt).toDateString() === d.toDateString()).reduce((s, o) => s + o.total, 0);
      return { label: d.toLocaleDateString("en-IN", { weekday: "short" }), date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), total };
    });
    const max = Math.max(...days.map((d) => d.total), 1);

    const byStatus = Object.keys(STATUS_COLORS).map((s) => ({ s, n: orders.filter((o) => o.status === s).length }));
    let acc = 0;
    const conic = byStatus
      .map(({ s, n }) => {
        const start = (acc / Math.max(orders.length, 1)) * 360;
        acc += n;
        const end = (acc / Math.max(orders.length, 1)) * 360;
        return `${STATUS_COLORS[s]} ${start}deg ${end}deg`;
      })
      .join(", ");

    const sold: Record<string, { qty: number; amount: number }> = {};
    valid.forEach((o) => o.items.forEach((i) => {
      sold[i.productId] ??= { qty: 0, amount: 0 };
      sold[i.productId].qty += i.qty;
      sold[i.productId].amount += i.qty * i.price;
    }));
    const top = Object.entries(sold)
      .map(([id, v]) => ({ p: products.find((x) => x.id === id), ...v }))
      .filter((x) => x.p)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return { revenue, todaySales, days, max, byStatus, conic, top, lowStock: products.filter((p) => p.stock < 8).sort((a, b) => a.stock - b.stock) };
  }, [orders, products]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">Welcome back, Admin 👋</h2>
          <p className="text-sm text-zinc-500">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/billing" className="btn-primary"><Receipt className="size-4" />New Bill</Link>
          <Link href="/admin/products?new=1" className="btn-outline"><Package className="size-4" />Add Product</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={formatINR(data.revenue)} I={IndianRupee} sub={<span className="flex items-center gap-1 text-emerald-600"><TrendingUp className="size-3.5" />Today: {formatINR(data.todaySales)}</span>} />
        <StatCard label="Total Orders" value={String(orders.length)} I={ShoppingCart} tone="dark" sub={`${orders.filter((o) => o.status === "Pending").length} pending to process`} />
        <StatCard label="Customers" value={String(customers.length)} I={Users} tone="green" sub={`${customers.filter((c) => c.verified).length} email verified`} />
        <StatCard label="Products" value={String(products.length)} I={Package} tone="amber" sub={<span className="text-amber-600">{data.lowStock.length} low on stock</span>} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Sales — Last 7 Days" className="xl:col-span-2" action={<span className="text-sm font-semibold text-zinc-900">{formatINR(data.days.reduce((s, d) => s + d.total, 0))}</span>}>
          <div className="flex h-60 items-end gap-1.5 px-3 pb-4 pt-8 sm:h-72 sm:gap-4 sm:px-5 sm:pb-5">
            {data.days.map((d) => (
              <div key={d.date} className="group flex h-full flex-1 flex-col items-center justify-end">
                <div className="relative flex w-full flex-1 items-end justify-center">
                  <div className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-brand-700 to-brand-500 transition group-hover:from-ink-900 group-hover:to-ink-600" style={{ height: `${Math.max((d.total / data.max) * 100, 2)}%` }}>
                    <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">{formatINR(d.total)}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs font-semibold text-zinc-700">{d.label}</p>
                <p className="text-[10px] text-zinc-400">{d.date}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Orders by Status">
          <div className="flex flex-col items-center gap-6 p-5">
            <div className="relative size-44 rounded-full" style={{ background: `conic-gradient(${data.conic})` }}>
              <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full bg-white">
                <p className="font-display text-3xl font-bold">{orders.length}</p>
                <p className="text-xs text-zinc-500">Total orders</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
              {data.byStatus.map(({ s, n }) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <span className="size-2.5 rounded-full" style={{ background: STATUS_COLORS[s] }} />
                  <span className="text-zinc-600">{s}</span>
                  <span className="ml-auto font-semibold">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Recent Orders" className="xl:col-span-2" action={<Link href="/admin/orders" className="flex items-center gap-1 text-sm font-semibold text-brand-600">View all<ArrowRight className="size-4" /></Link>}>
          <MobileList>
            {orders.slice(0, 6).map((o) => (
              <Link key={o.id} href={`/admin/orders/${o.id}`} className="flex items-center justify-between gap-3 px-4 py-3 active:bg-zinc-50">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-600">#{o.id}</p>
                  <p className="truncate text-xs text-zinc-500">{o.customer.name} · {formatDate(o.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold">{formatINR(o.total)}</span>
                  <StatusBadge status={o.status} />
                </div>
              </Link>
            ))}
          </MobileList>
          <Table className="hidden md:block" head={["Order", "Customer", "Date", "Amount", "Payment", "Status"]}>
            {orders.slice(0, 6).map((o) => (
              <tr key={o.id} className="hover:bg-zinc-50">
                <td className="px-5 py-3"><Link href={`/admin/orders/${o.id}`} className="font-semibold text-brand-600 hover:underline">#{o.id}</Link></td>
                <td className="px-5 py-3">{o.customer.name}</td>
                <td className="whitespace-nowrap px-5 py-3 text-zinc-500">{formatDate(o.createdAt)}</td>
                <td className="px-5 py-3 font-semibold">{formatINR(o.total)}</td>
                <td className="px-5 py-3"><StatusBadge status={o.paymentStatus} /></td>
                <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </Table>
        </Panel>

        <div className="space-y-6">
          <Panel title="Top Selling Products">
            <div className="divide-y">
              {data.top.map(({ p, qty, amount }) => (
                <div key={p!.id} className="flex items-center gap-3 px-5 py-3">
                  <SmartImage src={p!.image} alt="" className="size-11 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p!.name}</p>
                    <p className="text-xs text-zinc-500">{qty} sold</p>
                  </div>
                  <p className="text-sm font-semibold">{formatINR(amount)}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title={<span className="flex items-center gap-2"><AlertTriangle className="size-4 text-amber-500" />Low Stock Alerts</span>}>
            <div className="divide-y">
              {data.lowStock.slice(0, 5).map((p) => (
                <Link key={p.id} href={`/admin/products?edit=${p.id}`} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-zinc-50">
                  <span className="truncate pr-3">{p.name}</span>
                  <span className={p.stock === 0 ? "badge bg-brand-100 text-brand-700" : "badge bg-amber-100 text-amber-700"}>{p.stock} left</span>
                </Link>
              ))}
              {!data.lowStock.length && <p className="px-5 py-6 text-center text-sm text-zinc-500">All products well stocked 🎉</p>}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
