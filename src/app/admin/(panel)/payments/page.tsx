"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Banknote, CheckCircle2, Clock, CreditCard, RotateCcw } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatDate, formatINR } from "@/lib/utils";
import { Panel, Pills, StatCard, Table } from "@/components/admin/ui";
import { StatusBadge } from "@/components/StatusBadge";

const FILTERS = ["All", "Paid", "Pending", "Failed", "Refunded"] as const;

export default function PaymentsPage() {
  const { orders } = useStore();
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(() => orders.filter((o) => f === "All" || o.paymentStatus === f), [orders, f]);
  const sum = (s: string) => orders.filter((o) => o.paymentStatus === s).reduce((a, o) => a + o.total, 0);

  const byMethod = useMemo(() => {
    const m: Record<string, number> = {};
    orders.filter((o) => o.paymentStatus === "Paid").forEach((o) => (m[o.paymentMethod] = (m[o.paymentMethod] ?? 0) + o.total));
    const total = Object.values(m).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ k, v, pct: Math.round((v / total) * 100) }));
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard label="Received" value={formatINR(sum("Paid"))} I={CheckCircle2} tone="green" />
        <StatCard label="Pending (COD)" value={formatINR(sum("Pending"))} I={Clock} tone="amber" />
        <StatCard label="Refunded" value={formatINR(sum("Refunded"))} I={RotateCcw} tone="dark" />
        <StatCard label="Transactions" value={String(orders.length)} I={CreditCard} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Transactions" className="xl:col-span-2" action={<Pills value={f} options={FILTERS} onChange={setF} />}>
          <Table head={["Transaction", "Order", "Date", "Customer", "Method", "Amount", "Status"]} empty={!list.length}>
            {list.map((o) => (
              <tr key={o.id} className="hover:bg-zinc-50">
                <td className="px-5 py-3 font-mono text-xs">{o.paymentRef ?? "—"}</td>
                <td className="px-5 py-3"><Link href={`/admin/orders/${o.id}`} className="font-semibold text-brand-600 hover:underline">#{o.id}</Link></td>
                <td className="whitespace-nowrap px-5 py-3 text-zinc-500">{formatDate(o.createdAt, true)}</td>
                <td className="px-5 py-3">{o.customer.name}</td>
                <td className="px-5 py-3">{o.paymentMethod}</td>
                <td className="px-5 py-3 font-semibold">{formatINR(o.total)}</td>
                <td className="px-5 py-3"><StatusBadge status={o.paymentStatus} /></td>
              </tr>
            ))}
          </Table>
        </Panel>

        <div className="space-y-6">
          <Panel title="Collections by Method">
            <div className="space-y-4 p-5">
              {byMethod.map(({ k, v, pct }) => (
                <div key={k}>
                  <div className="mb-1.5 flex justify-between text-sm"><span className="font-medium">{k}</span><span className="text-zinc-500">{formatINR(v)} · {pct}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width: `${pct}%` }} /></div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Payment Gateway">
            <div className="space-y-3 p-5 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-[#0c2451] font-bold text-white">R</span>
                  <div><p className="font-semibold">Razorpay</p><p className="text-xs text-zinc-500">Cards · UPI · NetBanking</p></div>
                </div>
                <span className="badge bg-amber-100 text-amber-700">Test mode</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><Banknote className="size-5" /></span>
                  <div><p className="font-semibold">Cash on Delivery</p><p className="text-xs text-zinc-500">Collected on delivery</p></div>
                </div>
                <span className="badge bg-emerald-100 text-emerald-700">Enabled</span>
              </div>
              <Link href="/admin/settings" className="btn-outline w-full">Configure Gateway</Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
