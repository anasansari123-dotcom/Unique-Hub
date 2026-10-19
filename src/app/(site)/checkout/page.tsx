"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Banknote, CheckCircle2, CreditCard, Loader2, Lock, MapPin, ShieldCheck, Smartphone } from "lucide-react";
import { useStore } from "@/lib/store";
import { processPayment } from "@/lib/api";
import type { PaymentMethod } from "@/lib/types";
import { cn, formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { useToast } from "@/components/ui/Toast";

const STATES = ["Andhra Pradesh", "Karnataka", "Kerala", "Maharashtra", "Tamil Nadu", "Telangana", "Delhi", "Gujarat", "Uttar Pradesh", "West Bengal", "Other"];

const METHODS: { id: PaymentMethod; title: string; desc: string; I: typeof CreditCard }[] = [
  { id: "Razorpay", title: "Pay Online (Razorpay)", desc: "Cards, UPI, Net Banking, Wallets", I: CreditCard },
  { id: "UPI", title: "UPI", desc: "GPay, PhonePe, Paytm & more", I: Smartphone },
  { id: "COD", title: "Cash on Delivery", desc: "Pay when your order arrives", I: Banknote },
];

export default function CheckoutPage() {
  const router = useRouter();
  const toast = useToast();
  const { ready, user, cartLines, totals, placeOrder } = useStore();
  const [method, setMethod] = useState<PaymentMethod>("Razorpay");
  const [paying, setPaying] = useState<"idle" | "processing" | "success">("idle");
  const [addr, setAddr] = useState({ name: "", phone: "", email: "", line1: "", city: "", state: "Uttar Pradesh", pincode: "", note: "" });

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/login?next=/checkout");
    else setAddr((a) => ({ ...a, name: a.name || user.name, phone: a.phone || user.phone, email: user.email }));
  }, [ready, user, router]);

  useEffect(() => {
    if (ready && user && cartLines.length === 0 && paying === "idle") router.replace("/cart");
  }, [ready, user, cartLines.length, paying, router]);

  const set = (k: keyof typeof addr) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setAddr((a) => ({ ...a, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(addr.phone)) return toast("error", "Invalid phone number");
    if (!/^\d{6}$/.test(addr.pincode)) return toast("error", "Invalid pincode", "Enter a 6-digit pincode.");
    setPaying("processing");
    const res = await processPayment(totals.total, method);
    if (!res.ok) {
      setPaying("idle");
      return toast("error", "Payment failed", "Please try again or choose another method.");
    }
    setPaying("success");
    const { note, ...address } = addr;
    const order = placeOrder({ address, method, paymentStatus: method === "COD" ? "Pending" : "Paid", paymentRef: res.ref, note });
    setTimeout(() => router.push(`/orders/${order.id}?placed=1`), 900);
  };

  if (!ready || !user) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="size-8 animate-spin text-brand-600" /></div>;

  return (
    <section className="bg-zinc-50 pb-28 pt-6 sm:py-10">
      <div className="container-x">
        <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/cart" className="hover:text-brand-600">Cart</Link> / <span className="font-semibold text-brand-600">Checkout</span> / <span>Confirmation</span>
        </div>

        <form id="checkout-form" onSubmit={submit} className="mt-5 grid gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-5 sm:space-y-6">
            <div className="card p-4 sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold"><MapPin className="size-5 text-brand-600" />Delivery Address</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="col-span-2 sm:col-span-1"><label className="label">Full Name *</label><input required value={addr.name} onChange={set("name")} className="input" /></div>
                <div className="col-span-2 sm:col-span-1"><label className="label">Mobile *</label><input required maxLength={10} inputMode="numeric" value={addr.phone} onChange={set("phone")} className="input" /></div>
                <div className="col-span-2"><label className="label">Email (verified)</label><input readOnly value={addr.email} className="input bg-zinc-50 text-zinc-500" /></div>
                <div className="col-span-2"><label className="label">Address (House No., Street, Area) *</label><input required value={addr.line1} onChange={set("line1")} className="input" /></div>
                <div><label className="label">City *</label><input required value={addr.city} onChange={set("city")} className="input" /></div>
                <div>
                  <label className="label">State *</label>
                  <select value={addr.state} onChange={set("state")} className="input">{STATES.map((s) => <option key={s}>{s}</option>)}</select>
                </div>
                <div><label className="label">Pincode *</label><input required maxLength={6} inputMode="numeric" value={addr.pincode} onChange={set("pincode")} className="input" /></div>
                <div><label className="label">Order Note</label><input value={addr.note} onChange={set("note")} className="input" placeholder="Optional" /></div>
              </div>
            </div>

            <div className="card p-4 sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold"><CreditCard className="size-5 text-brand-600" />Payment Method</h2>
              <div className="mt-5 grid gap-3">
                {METHODS.map(({ id, title, desc, I }) => (
                  <label key={id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition sm:gap-4 sm:p-4", method === id ? "border-brand-600 bg-brand-50/50" : "border-zinc-200 hover:border-zinc-300")}>
                    <input type="radio" name="pm" checked={method === id} onChange={() => setMethod(id)} className="size-4 accent-brand-600" />
                    <span className={cn("flex size-10 items-center justify-center rounded-lg", method === id ? "bg-brand-600 text-white" : "bg-zinc-100 text-zinc-600")}><I className="size-5" /></span>
                    <div><p className="font-semibold">{title}</p><p className="text-xs text-zinc-500">{desc}</p></div>
                  </label>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500"><Lock className="size-3.5" />Payments are processed securely by the payment gateway. We never store card details.</p>
            </div>
          </div>

          <aside>
            <div className="card sticky top-24 p-4 sm:p-6">
              <h3 className="text-lg font-bold">Your Order</h3>
              <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1 scroll-thin">
                {cartLines.map(({ product: p, qty }) => (
                  <div key={p.id} className="flex gap-3">
                    <div className="relative shrink-0">
                      <SmartImage src={p.image} alt="" className="size-14 rounded-lg" />
                      <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-ink-900 text-[10px] font-bold text-white">{qty}</span>
                    </div>
                    <p className="line-clamp-2 flex-1 text-sm">{p.name}</p>
                    <p className="text-sm font-semibold">{formatINR(p.price * qty)}</p>
                  </div>
                ))}
              </div>
              <dl className="mt-5 space-y-2.5 border-t pt-5 text-sm">
                <div className="flex justify-between"><dt className="text-zinc-500">Subtotal</dt><dd>{formatINR(totals.subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-500">Shipping</dt><dd>{totals.shipping ? formatINR(totals.shipping) : <span className="text-emerald-600">Free</span>}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-500">GST (included)</dt><dd>{formatINR(totals.tax)}</dd></div>
                <div className="flex justify-between border-t pt-3 text-lg font-bold"><dt>Total</dt><dd>{formatINR(totals.total)}</dd></div>
              </dl>
              <button disabled={paying !== "idle"} className="btn-primary mt-6 hidden w-full py-3.5 text-base lg:flex">
                <Lock className="size-4" />{method === "COD" ? "Place Order" : `Pay ${formatINR(totals.total)}`}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500"><ShieldCheck className="size-4 text-emerald-500" />256-bit SSL secured</p>
            </div>
          </aside>
        </form>
      </div>

      {/* Mobile sticky pay bar */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-zinc-500">{totals.count} items · {method}</p>
            <p className="text-lg font-bold leading-tight">{formatINR(totals.total)}</p>
          </div>
          <button form="checkout-form" disabled={paying !== "idle"} className="btn-primary h-12 px-6">
            <Lock className="size-4" />{method === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>

      {/* Payment gateway simulation */}
      {paying !== "idle" && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-fade-up rounded-3xl bg-white p-8 text-center shadow-2xl">
            {paying === "processing" ? (
              <>
                <Loader2 className="mx-auto size-14 animate-spin text-brand-600" />
                <h3 className="mt-5 text-xl font-bold">{method === "COD" ? "Placing your order…" : "Processing payment…"}</h3>
                <p className="mt-1 text-sm text-zinc-500">{method === "COD" ? "Please wait a moment." : `Connecting to ${method === "UPI" ? "UPI" : "Razorpay"} secure gateway. Do not refresh.`}</p>
              </>
            ) : (
              <>
                <CheckCircle2 className="mx-auto size-16 text-emerald-500" />
                <h3 className="mt-4 text-xl font-bold">{method === "COD" ? "Order placed!" : "Payment successful!"}</h3>
                <p className="mt-1 text-sm text-zinc-500">Redirecting to your order…</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
