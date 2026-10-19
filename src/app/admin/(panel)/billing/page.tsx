"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Minus, Plus, Printer, Search, ShoppingCart, Trash2, UserRound } from "lucide-react";
import { useStore, computeTotals } from "@/lib/store";
import type { PaymentMethod } from "@/lib/types";
import { cn, formatINR } from "@/lib/utils";
import { Panel } from "@/components/admin/ui";
import { SmartImage } from "@/components/ui/SmartImage";
import { useToast } from "@/components/ui/Toast";

const METHODS: PaymentMethod[] = ["Cash", "UPI", "Card"];

export default function BillingPage() {
  const router = useRouter();
  const toast = useToast();
  const { products, customers, createStoreBill } = useStore();
  const [q, setQ] = useState("");
  const [lines, setLines] = useState<{ productId: string; qty: number }[]>([]);
  const [cust, setCust] = useState({ name: "", phone: "", email: "", line1: "", city: "", state: "Uttar Pradesh", pincode: "" });
  const [method, setMethod] = useState<PaymentMethod>("Cash");
  const [discount, setDiscount] = useState(0);

  const results = useMemo(
    () => products.filter((p) => `${p.name} ${p.id} ${p.brand}`.toLowerCase().includes(q.toLowerCase())).slice(0, 12),
    [products, q],
  );
  const detailed = lines.map((l) => ({ ...l, p: products.find((p) => p.id === l.productId)! })).filter((l) => l.p);
  const t = computeTotals(detailed.map((l) => ({ price: l.p.price, qty: l.qty })), discount);
  const total = Math.max(0, t.subtotal - discount);

  const add = (id: string) => {
    const p = products.find((x) => x.id === id)!;
    const cur = lines.find((l) => l.productId === id)?.qty ?? 0;
    if (cur >= p.stock) return toast("error", "Not enough stock", `${p.stock} available`);
    setLines((s) => (s.some((l) => l.productId === id) ? s.map((l) => (l.productId === id ? { ...l, qty: l.qty + 1 } : l)) : [...s, { productId: id, qty: 1 }]));
  };

  const fillCustomer = (phone: string) => {
    const c = customers.find((x) => x.phone === phone);
    setCust((s) => ({ ...s, phone, ...(c ? { name: c.name, email: c.email, city: c.city ?? "" } : {}) }));
  };

  const generate = () => {
    if (!detailed.length) return toast("error", "Add at least one product");
    const order = createStoreBill({ customer: { ...cust, name: cust.name || "Walk-in Customer" }, items: lines, method, discount });
    toast("success", "Bill generated", order.invoiceNo);
    router.push(`/admin/invoices/${order.id}?print=1`);
  };

  return (
    <div className="grid gap-6 pb-20 xl:grid-cols-[1fr_420px] xl:pb-0">
      <Panel
        title="Select Products"
        action={
          <div className="relative w-full sm:w-auto">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name / SKU…" className="input w-full py-2 pl-9 sm:w-64" />
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-2.5 p-3 sm:grid-cols-3 sm:gap-3 sm:p-5 2xl:grid-cols-4">
          {results.map((p) => (
            <button key={p.id} disabled={p.stock === 0} onClick={() => add(p.id)} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white text-left transition hover:border-brand-500 hover:shadow-md disabled:opacity-50">
              <SmartImage src={p.image} alt="" className="aspect-[4/3] w-full" />
              <div className="p-3">
                <p className="line-clamp-2 text-xs font-medium leading-snug">{p.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold">{formatINR(p.price)}</span>
                  <span className={cn("text-[10px] font-semibold", p.stock < 8 ? "text-amber-600" : "text-zinc-400")}>Stock {p.stock}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Panel>

      <div id="bill" className="scroll-mt-20 space-y-6">
        <Panel title={<span className="flex items-center gap-2"><UserRound className="size-4" />Customer</span>}>
          <div className="grid grid-cols-2 gap-3 p-5">
            <input value={cust.phone} onChange={(e) => fillCustomer(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Mobile (auto-fill)" className="input py-2" />
            <input value={cust.name} onChange={(e) => setCust({ ...cust, name: e.target.value })} placeholder="Customer name" className="input py-2" />
            <input value={cust.email} onChange={(e) => setCust({ ...cust, email: e.target.value })} placeholder="Email (optional)" className="input col-span-2 py-2" />
            <input value={cust.city} onChange={(e) => setCust({ ...cust, city: e.target.value })} placeholder="City" className="input col-span-2 py-2" />
          </div>
        </Panel>

        <Panel title={<span className="flex items-center gap-2"><ShoppingCart className="size-4" />Bill Items ({t.count})</span>} action={lines.length > 0 && <button onClick={() => setLines([])} className="text-xs font-semibold text-brand-600">Clear</button>}>
          {detailed.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-zinc-500">Click products to add them to the bill.</p>
          ) : (
            <div className="max-h-80 divide-y overflow-y-auto scroll-thin">
              {detailed.map(({ p, qty }) => (
                <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-zinc-500">{formatINR(p.price)}</p>
                  </div>
                  <div className="flex items-center rounded-lg border">
                    <button onClick={() => setLines((s) => s.map((l) => (l.productId === p.id ? { ...l, qty: Math.max(1, l.qty - 1) } : l)))} className="p-1.5" aria-label="Decrease"><Minus className="size-3" /></button>
                    <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                    <button onClick={() => add(p.id)} className="p-1.5" aria-label="Increase"><Plus className="size-3" /></button>
                  </div>
                  <p className="w-20 text-right text-sm font-semibold">{formatINR(p.price * qty)}</p>
                  <button onClick={() => setLines((s) => s.filter((l) => l.productId !== p.id))} className="text-zinc-400 hover:text-brand-600" aria-label="Remove"><Trash2 className="size-4" /></button>
                </div>
              ))}
            </div>
          )}
          <div className="space-y-3 border-t bg-zinc-50 p-5 text-sm">
            <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span>{formatINR(t.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">CGST + SGST (incl.)</span><span>{formatINR(t.tax)}</span></div>
            <div className="flex items-center justify-between"><span className="text-zinc-500">Discount (₹)</span><input type="number" min={0} value={discount || ""} onChange={(e) => setDiscount(Math.min(t.subtotal, +e.target.value))} className="input w-28 py-1.5 text-right" /></div>
            <div className="flex justify-between border-t pt-3 text-lg font-bold"><span>Total</span><span>{formatINR(total)}</span></div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {METHODS.map((m) => (
                <button key={m} onClick={() => setMethod(m)} className={cn("rounded-lg border-2 py-2 text-sm font-semibold transition", method === m ? "border-brand-600 bg-brand-50 text-brand-700" : "border-zinc-200 bg-white")}>{m}</button>
              ))}
            </div>
            <button onClick={generate} className="btn-primary mt-2 w-full py-3 text-base"><Printer className="size-4" />Generate & Print Bill</button>
          </div>
        </Panel>
      </div>

      {/* Mobile bill summary bar */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 backdrop-blur xl:hidden print:hidden">
        <div className="flex items-center gap-3 px-4 py-3 lg:pl-[17rem]">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-zinc-500">{t.count} items · {method}</p>
            <p className="text-lg font-bold leading-tight">{formatINR(total)}</p>
          </div>
          <button onClick={() => document.getElementById("bill")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline h-11"><ShoppingCart className="size-4" />View Bill</button>
          <button onClick={generate} disabled={!detailed.length} className="btn-primary h-11 px-4"><Printer className="size-4" />Bill</button>
        </div>
      </div>
    </div>
  );
}
