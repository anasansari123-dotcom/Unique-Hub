import Image from "next/image";
import type { Order } from "@/lib/types";
import { SITE } from "@/lib/config";
import { amountInWords, formatDate, formatINR } from "@/lib/utils";

/** Printable GST tax invoice. Shared by the customer order page and the ERP billing module. */
export function Invoice({ order }: { order: Order }) {
  const taxable = order.subtotal - order.tax;
  const half = order.tax / 2;
  return (
    <div id="invoice" className="mx-auto w-full max-w-[820px] bg-white p-6 text-[13px] text-zinc-800 sm:p-10 print:max-w-none print:p-0">
      <div className="flex flex-col justify-between gap-6 border-b-4 border-brand-600 pb-6 sm:flex-row">
        <div className="flex items-start gap-4">
          <Image src="/logo.jpeg" alt="Unique Hub 24" width={72} height={72} className="size-[72px] rounded-full" />
          <div>
            <p className="font-display text-2xl font-extrabold text-zinc-900">UNIQUE <span className="text-brand-600">HUB</span> 24</p>
            <p className="text-xs font-semibold text-zinc-700">{SITE.legalName}</p>
            <p className="max-w-xs text-xs text-zinc-500">{SITE.address}</p>
            <p className="text-xs text-zinc-500">Service: {SITE.phone} · Sales: {SITE.salesPhone}</p>
            <p className="text-xs text-zinc-500">WhatsApp: {SITE.whatsappDisplay} · {SITE.email}</p>
            <p className="text-xs font-semibold text-zinc-700">GSTIN: {SITE.gstin}</p>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="font-display text-2xl font-bold tracking-wide text-zinc-900">TAX INVOICE</p>
          <p className="mt-2"><span className="text-zinc-500">Invoice No:</span> <b>{order.invoiceNo}</b></p>
          <p><span className="text-zinc-500">Order ID:</span> <b>{order.id}</b></p>
          <p><span className="text-zinc-500">Date:</span> <b>{formatDate(order.createdAt, true)}</b></p>
        </div>
      </div>

      <div className="grid gap-6 py-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Bill To</p>
          <p className="mt-1 font-semibold text-zinc-900">{order.customer.name || "Walk-in Customer"}</p>
          {order.customer.line1 && <p>{order.customer.line1}</p>}
          {order.customer.city && <p>{order.customer.city}{order.customer.state && `, ${order.customer.state}`} {order.customer.pincode}</p>}
          {order.customer.phone && <p>Ph: {order.customer.phone}</p>}
          {order.customer.email && <p>{order.customer.email}</p>}
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Payment</p>
          <p className="mt-1">Method: <b>{order.paymentMethod}</b></p>
          <p>Status: <b className={order.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"}>{order.paymentStatus}</b></p>
          {order.paymentRef && <p>Txn Ref: <b>{order.paymentRef}</b></p>}
          <p>Channel: <b>{order.channel}</b></p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr className="bg-ink-900 text-left text-xs uppercase tracking-wider text-white print:bg-zinc-900">
              <th className="px-3 py-2.5">#</th>
              <th className="px-3 py-2.5">Item</th>
              <th className="px-3 py-2.5 text-right">Rate</th>
              <th className="px-3 py-2.5 text-center">Qty</th>
              <th className="px-3 py-2.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it, i) => (
              <tr key={it.productId + i} className="border-b border-zinc-200">
                <td className="px-3 py-3 align-top">{i + 1}</td>
                <td className="px-3 py-3"><p className="font-medium text-zinc-900">{it.name}</p><p className="text-xs text-zinc-500">SKU: {it.productId} · HSN: 8471</p></td>
                <td className="px-3 py-3 text-right">{formatINR(it.price)}</td>
                <td className="px-3 py-3 text-center">{it.qty}</td>
                <td className="px-3 py-3 text-right font-medium">{formatINR(it.price * it.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="text-xs text-zinc-600">
          <p className="font-semibold text-zinc-900">Amount in words</p>
          <p className="mt-1 italic">{amountInWords(order.total)}</p>
          <p className="mt-4 font-semibold text-zinc-900">Terms & Conditions</p>
          <ol className="mt-1 list-decimal space-y-0.5 pl-4">
            <li>Goods once sold will be replaced only as per warranty policy.</li>
            <li>Warranty is provided by the respective brand / service centre.</li>
            <li>Subject to Muzaffarnagar jurisdiction.</li>
          </ol>
        </div>
        <div className="space-y-1.5">
          <Row l="Taxable Value" v={formatINR(taxable)} />
          <Row l="CGST @ 9%" v={formatINR(half)} />
          <Row l="SGST @ 9%" v={formatINR(half)} />
          <Row l="Shipping" v={order.shipping ? formatINR(order.shipping) : "Free"} />
          {order.discount > 0 && <Row l="Discount" v={`- ${formatINR(order.discount)}`} />}
          <div className="mt-2 flex justify-between rounded-lg bg-brand-600 px-3 py-2.5 text-base font-bold text-white print:bg-zinc-900">
            <span>Grand Total</span><span>{formatINR(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-end justify-between border-t pt-6 text-xs text-zinc-500">
        <p>Thank you for shopping with Unique Hub 24!<br />This is a computer-generated invoice.</p>
        <div className="text-center">
          <div className="mb-1 h-10 w-40 border-b border-zinc-400" />
          <p>Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between px-3"><span className="text-zinc-500">{l}</span><span className="font-medium text-zinc-900">{v}</span></div>;
}
