"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download, Eye, Printer, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatINR } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv";
import { MobileList, Panel, Pills, Table } from "@/components/admin/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/components/ui/Toast";

const FILTERS = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const;
const STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function exportOrdersCsv(orders: Order[]) {
  downloadCsv("orders", [
    ["Order ID", "Invoice", "Date", "Customer", "Email", "Phone", "Items", "Total", "Payment Method", "Payment Status", "Order Status", "Channel"],
    ...orders.map((o) => [o.id, o.invoiceNo, formatDate(o.createdAt, true), o.customer.name, o.customer.email, o.customer.phone, o.items.map((i) => `${i.name} x${i.qty}`).join("; "), o.total, o.paymentMethod, o.paymentStatus, o.status, o.channel]),
  ]);
}

function OrdersAdmin() {
  const { orders, updateOrder } = useStore();
  const toast = useToast();
  const [q, setQ] = useState(useSearchParams().get("q") ?? "");
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const [channel, setChannel] = useState("All");

  const list = useMemo(
    () =>
      orders.filter(
        (o) =>
          (f === "All" || o.status === f) &&
          (channel === "All" || o.channel === channel) &&
          `${o.id} ${o.invoiceNo} ${o.customer.name} ${o.customer.email} ${o.customer.phone}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [orders, f, q, channel],
  );

  return (
    <Panel
      title={`Orders (${list.length})`}
      action={
        <div className="flex flex-wrap gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Order ID, name, phone…" className="input w-full py-2 pl-9 sm:w-56" />
          </div>
          <select value={channel} onChange={(e) => setChannel(e.target.value)} className="input w-auto py-2">
            <option value="All">All channels</option><option>Online</option><option>Store</option>
          </select>
          <button onClick={() => exportOrdersCsv(list)} className="btn-outline"><Download className="size-4" />Export CSV</button>
        </div>
      }
    >
      <div className="border-b px-5 py-3"><Pills value={f} options={FILTERS} onChange={setF} /></div>
      <MobileList empty={!list.length}>
        {list.map((o) => (
          <div key={o.id} className="px-4 py-3.5">
            <div className="flex items-start justify-between gap-3">
              <Link href={`/admin/orders/${o.id}`} className="min-w-0">
                <p className="text-sm font-semibold text-brand-600">#{o.id} <span className="font-normal text-zinc-400">· {o.channel}</span></p>
                <p className="truncate text-sm font-medium">{o.customer.name}</p>
                <p className="text-xs text-zinc-500">{formatDate(o.createdAt, true)}</p>
              </Link>
              <div className="text-right">
                <p className="font-semibold">{formatINR(o.total)}</p>
                <p className="text-xs text-zinc-500">{o.paymentMethod}</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <StatusBadge status={o.paymentStatus} />
              <select
                value={o.status}
                onChange={(e) => { updateOrder(o.id, { status: e.target.value as OrderStatus }); toast("success", `Order #${o.id} → ${e.target.value}`); }}
                className="ml-auto rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm font-semibold outline-none"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <Link href={`/admin/invoices/${o.id}`} className="rounded-lg border border-zinc-200 p-2 text-zinc-600" aria-label="Print bill"><Printer className="size-4" /></Link>
            </div>
          </div>
        ))}
      </MobileList>
      <Table className="hidden md:block" head={["Order", "Date", "Customer", "Items", "Total", "Payment", "Status", ""]} empty={!list.length}>
        {list.map((o) => (
          <tr key={o.id} className="hover:bg-zinc-50">
            <td className="px-5 py-3">
              <Link href={`/admin/orders/${o.id}`} className="font-semibold text-brand-600 hover:underline">#{o.id}</Link>
              <p className="text-xs text-zinc-400">{o.channel}</p>
            </td>
            <td className="whitespace-nowrap px-5 py-3 text-zinc-500">{formatDate(o.createdAt, true)}</td>
            <td className="px-5 py-3"><p className="font-medium">{o.customer.name}</p><p className="text-xs text-zinc-500">{o.customer.phone}</p></td>
            <td className="px-5 py-3 text-zinc-600">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
            <td className="px-5 py-3 font-semibold">{formatINR(o.total)}</td>
            <td className="px-5 py-3"><StatusBadge status={o.paymentStatus} /><p className="mt-1 text-xs text-zinc-400">{o.paymentMethod}</p></td>
            <td className="px-5 py-3">
              <select
                value={o.status}
                onChange={(e) => { updateOrder(o.id, { status: e.target.value as OrderStatus }); toast("success", `Order #${o.id} → ${e.target.value}`); }}
                className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs font-semibold outline-none focus:border-brand-500"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </td>
            <td className="px-5 py-3">
              <div className="flex gap-1">
                <Link href={`/admin/orders/${o.id}`} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900" title="View"><Eye className="size-4" /></Link>
                <Link href={`/admin/invoices/${o.id}`} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900" title="Print bill"><Printer className="size-4" /></Link>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </Panel>
  );
}

export default function OrdersPage() {
  return <Suspense><OrdersAdmin /></Suspense>;
}
