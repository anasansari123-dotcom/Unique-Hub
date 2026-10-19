"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, Printer, Receipt, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatDate, formatINR } from "@/lib/utils";
import { Panel, Table } from "@/components/admin/ui";
import { StatusBadge } from "@/components/StatusBadge";

export default function InvoicesPage() {
  const { orders } = useStore();
  const [q, setQ] = useState("");
  const list = useMemo(
    () => orders.filter((o) => o.status !== "Cancelled" && `${o.invoiceNo} ${o.id} ${o.customer.name}`.toLowerCase().includes(q.toLowerCase())),
    [orders, q],
  );
  const billed = list.reduce((s, o) => s + o.total, 0);
  const gst = list.reduce((s, o) => s + o.tax, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-4"><p className="text-sm text-zinc-500">Invoices</p><p className="mt-1 font-display text-2xl font-bold">{list.length}</p></div>
        <div className="card p-4"><p className="text-sm text-zinc-500">Total Billed</p><p className="mt-1 font-display text-2xl font-bold">{formatINR(billed)}</p></div>
        <div className="card p-4"><p className="text-sm text-zinc-500">GST Collected</p><p className="mt-1 font-display text-2xl font-bold">{formatINR(gst)}</p></div>
      </div>
      <Panel
        title="Invoices & Bills"
        action={
          <div className="flex gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Invoice no, customer…" className="input w-full py-2 pl-9 sm:w-56" />
            </div>
            <Link href="/admin/billing" className="btn-primary"><Receipt className="size-4" />New Bill</Link>
          </div>
        }
      >
        <Table head={["Invoice No", "Order", "Date", "Customer", "Channel", "GST", "Amount", "Payment", ""]} empty={!list.length}>
          {list.map((o) => (
            <tr key={o.id} className="hover:bg-zinc-50">
              <td className="whitespace-nowrap px-5 py-3 font-semibold">{o.invoiceNo}</td>
              <td className="px-5 py-3"><Link href={`/admin/orders/${o.id}`} className="text-brand-600 hover:underline">#{o.id}</Link></td>
              <td className="whitespace-nowrap px-5 py-3 text-zinc-500">{formatDate(o.createdAt)}</td>
              <td className="px-5 py-3">{o.customer.name || "Walk-in"}</td>
              <td className="px-5 py-3 text-zinc-600">{o.channel}</td>
              <td className="px-5 py-3 text-zinc-600">{formatINR(o.tax)}</td>
              <td className="px-5 py-3 font-semibold">{formatINR(o.total)}</td>
              <td className="px-5 py-3"><StatusBadge status={o.paymentStatus} /></td>
              <td className="px-5 py-3">
                <div className="flex gap-1">
                  <Link href={`/admin/invoices/${o.id}`} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100" title="View"><Eye className="size-4" /></Link>
                  <Link href={`/admin/invoices/${o.id}?print=1`} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100" title="Print"><Printer className="size-4" /></Link>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}
