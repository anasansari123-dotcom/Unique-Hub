"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BadgeCheck, Download, Mail, Phone, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Customer } from "@/lib/types";
import { formatDate, formatINR } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv";
import { Modal, Panel, Table } from "@/components/admin/ui";
import { StatusBadge } from "@/components/StatusBadge";

export default function CustomersPage() {
  const { customers, orders } = useStore();
  const [q, setQ] = useState("");
  const [view, setView] = useState<Customer | null>(null);

  const rows = useMemo(
    () =>
      customers
        .filter((c) => `${c.name} ${c.email} ${c.phone} ${c.city}`.toLowerCase().includes(q.toLowerCase()))
        .map((c) => {
          const mine = orders.filter((o) => o.customerId === c.id || o.customer.email.toLowerCase() === c.email.toLowerCase());
          return { c, mine, spent: mine.filter((o) => o.paymentStatus === "Paid").reduce((s, o) => s + o.total, 0) };
        }),
    [customers, orders, q],
  );
  const viewing = rows.find((r) => r.c.id === view?.id);

  return (
    <>
      <Panel
        title={`Customers (${rows.length})`}
        action={
          <div className="flex gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers…" className="input w-full py-2 pl-9 sm:w-56" />
            </div>
            <button onClick={() => downloadCsv("customers", [["ID", "Name", "Email", "Phone", "City", "Verified", "Orders", "Spent", "Joined"], ...rows.map(({ c, mine, spent }) => [c.id, c.name, c.email, c.phone, c.city ?? "", c.verified ? "Yes" : "No", mine.length, spent, formatDate(c.createdAt)])])} className="btn-outline">
              <Download className="size-4" />Export
            </button>
          </div>
        }
      >
        <Table head={["Customer", "Contact", "City", "Orders", "Total Spent", "Joined", "Email"]} empty={!rows.length}>
          {rows.map(({ c, mine, spent }) => (
            <tr key={c.id} onClick={() => setView(c)} className="cursor-pointer hover:bg-zinc-50">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-white">{c.name[0]}</span>
                  <div><p className="font-medium">{c.name}</p><p className="text-xs text-zinc-400">{c.id}</p></div>
                </div>
              </td>
              <td className="px-5 py-3"><p>{c.email}</p><p className="text-xs text-zinc-500">{c.phone}</p></td>
              <td className="px-5 py-3 text-zinc-600">{c.city ?? "—"}</td>
              <td className="px-5 py-3 font-semibold">{mine.length}</td>
              <td className="px-5 py-3 font-semibold">{formatINR(spent)}</td>
              <td className="whitespace-nowrap px-5 py-3 text-zinc-500">{formatDate(c.createdAt)}</td>
              <td className="px-5 py-3">{c.verified ? <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600"><BadgeCheck className="size-4" />Verified</span> : <span className="text-xs text-zinc-400">Unverified</span>}</td>
            </tr>
          ))}
        </Table>
      </Panel>

      <Modal open={!!viewing} onClose={() => setView(null)} title="Customer Profile" wide>
        {viewing && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 text-2xl font-bold text-white">{viewing.c.name[0]}</span>
              <div className="flex-1">
                <p className="text-xl font-bold">{viewing.c.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-zinc-500"><Mail className="size-4" />{viewing.c.email}</p>
                <p className="flex items-center gap-1.5 text-sm text-zinc-500"><Phone className="size-4" />{viewing.c.phone || "—"}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-zinc-50 px-4 py-2"><p className="text-lg font-bold">{viewing.mine.length}</p><p className="text-xs text-zinc-500">Orders</p></div>
                <div className="rounded-xl bg-zinc-50 px-4 py-2"><p className="text-lg font-bold">{formatINR(viewing.spent)}</p><p className="text-xs text-zinc-500">Spent</p></div>
              </div>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Purchase History</h4>
              <div className="divide-y rounded-xl border">
                {viewing.mine.map((o) => (
                  <Link key={o.id} href={`/admin/orders/${o.id}`} className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-zinc-50">
                    <div><p className="font-semibold text-brand-600">#{o.id}</p><p className="text-xs text-zinc-500">{formatDate(o.createdAt)} · {o.items.map((i) => i.name).join(", ").slice(0, 60)}</p></div>
                    <div className="flex items-center gap-3"><StatusBadge status={o.status} /><span className="font-semibold">{formatINR(o.total)}</span></div>
                  </Link>
                ))}
                {!viewing.mine.length && <p className="p-6 text-center text-sm text-zinc-500">No purchases yet.</p>}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
