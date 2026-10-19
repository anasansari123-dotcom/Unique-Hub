"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Phone, Printer } from "lucide-react";
import { useStore } from "@/lib/store";
import type { OrderStatus, PaymentStatus } from "@/lib/types";
import { formatDate, formatINR } from "@/lib/utils";
import { Panel } from "@/components/admin/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { SmartImage } from "@/components/ui/SmartImage";
import { useToast } from "@/components/ui/Toast";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { orders, updateOrder } = useStore();
  const toast = useToast();
  const o = orders.find((x) => x.id === id);
  if (!o) return <div className="card p-10 text-center">Order not found. <Link href="/admin/orders" className="text-brand-600">Back</Link></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/orders" className="flex items-center gap-1 text-sm text-zinc-500 hover:text-brand-600"><ArrowLeft className="size-4" />Orders</Link>
          <h2 className="mt-1 flex items-center gap-3 text-2xl font-bold">Order #{o.id} <StatusBadge status={o.status} /></h2>
          <p className="text-sm text-zinc-500">{formatDate(o.createdAt, true)} · {o.channel} · {o.invoiceNo}</p>
        </div>
        <Link href={`/admin/invoices/${o.id}`} className="btn-dark"><Printer className="size-4" />Print Bill</Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Panel title="Items">
            <div className="divide-y">
              {o.items.map((it) => (
                <div key={it.productId} className="flex items-center gap-4 px-5 py-4">
                  <SmartImage src={it.image} alt="" className="size-14 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{it.name}</p>
                    <p className="text-xs text-zinc-500">{it.productId} · {formatINR(it.price)} × {it.qty}</p>
                  </div>
                  <p className="font-semibold">{formatINR(it.price * it.qty)}</p>
                </div>
              ))}
            </div>
            <dl className="space-y-2 border-t bg-zinc-50 px-5 py-4 text-sm">
              <div className="flex justify-between"><dt className="text-zinc-500">Subtotal</dt><dd>{formatINR(o.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-zinc-500">GST (incl.)</dt><dd>{formatINR(o.tax)}</dd></div>
              <div className="flex justify-between"><dt className="text-zinc-500">Shipping</dt><dd>{o.shipping ? formatINR(o.shipping) : "Free"}</dd></div>
              {o.discount > 0 && <div className="flex justify-between"><dt className="text-zinc-500">Discount</dt><dd>- {formatINR(o.discount)}</dd></div>}
              <div className="flex justify-between border-t pt-2 text-base font-bold"><dt>Total</dt><dd>{formatINR(o.total)}</dd></div>
            </dl>
          </Panel>
          {o.note && <Panel title="Customer Note"><p className="p-5 text-sm text-zinc-700">{o.note}</p></Panel>}
        </div>

        <div className="space-y-6">
          <Panel title="Update Order">
            <div className="space-y-4 p-5">
              <div>
                <label className="label">Order Status</label>
                <select value={o.status} onChange={(e) => { updateOrder(o.id, { status: e.target.value as OrderStatus }); toast("success", "Order status updated"); }} className="input">
                  {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Payment Status</label>
                <select value={o.paymentStatus} onChange={(e) => { updateOrder(o.id, { paymentStatus: e.target.value as PaymentStatus }); toast("success", "Payment status updated"); }} className="input">
                  {["Paid", "Pending", "Failed", "Refunded"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="rounded-xl bg-zinc-50 p-3 text-sm">
                <p><span className="text-zinc-500">Method:</span> <b>{o.paymentMethod}</b></p>
                {o.paymentRef && <p className="break-all"><span className="text-zinc-500">Txn:</span> <b>{o.paymentRef}</b></p>}
              </div>
            </div>
          </Panel>
          <Panel title="Customer">
            <div className="space-y-3 p-5 text-sm">
              <p className="text-base font-semibold">{o.customer.name}</p>
              <p className="flex gap-2 text-zinc-600"><Mail className="size-4 shrink-0 text-zinc-400" />{o.customer.email || "—"}</p>
              <p className="flex gap-2 text-zinc-600"><Phone className="size-4 shrink-0 text-zinc-400" />{o.customer.phone || "—"}</p>
              {o.customer.line1 && <p className="flex gap-2 text-zinc-600"><MapPin className="size-4 shrink-0 text-zinc-400" />{o.customer.line1}, {o.customer.city}, {o.customer.state} {o.customer.pincode}</p>}
              {o.customer.phone && (
                <a href={`https://wa.me/91${o.customer.phone}?text=${encodeURIComponent(`Hi ${o.customer.name}, update on your Unique Hub 24 order #${o.id}: ${o.status}.`)}`} target="_blank" rel="noreferrer" className="btn mt-2 w-full bg-[#25D366] text-white hover:brightness-110">
                  <WhatsAppIcon className="size-4" />Send WhatsApp Update
                </a>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
