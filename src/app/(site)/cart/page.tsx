"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Tag, Trash2, Truck } from "lucide-react";
import { useStore } from "@/lib/store";
import { SITE } from "@/lib/config";
import { formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { PageBanner } from "@/components/site/PageBanner";

export default function CartPage() {
  const { cartLines, totals, setQty, removeFromCart, ready } = useStore();
  const toFree = SITE.freeShippingAbove - totals.subtotal;

  return (
    <>
      <PageBanner title="Shopping Cart" crumbs={[{ label: "Cart" }]} />
      <section className="container-x py-6 sm:py-12">
        {!ready ? null : cartLines.length === 0 ? (
          <div className="card mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-brand-50"><ShoppingBag className="size-9 text-brand-600" /></span>
            <h2 className="mt-5 text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-1 text-zinc-500">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/products" className="btn-primary mt-6 px-7 py-3">Start Shopping<ArrowRight className="size-4" /></Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {toFree > 0 ? (
                <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                  <Truck className="size-5 shrink-0" /><span>Add <b>{formatINR(toFree)}</b> more to get <b>FREE delivery</b>.</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                  <Truck className="size-5 shrink-0" /><span>Yay! Your order qualifies for <b>FREE delivery</b>.</span>
                </div>
              )}
              {cartLines.map(({ product: p, qty }) => (
                <div key={p.id} className="card flex gap-3 p-3 sm:gap-4 sm:p-4">
                  <Link href={`/products/${p.id}`} className="shrink-0 overflow-hidden rounded-xl bg-zinc-50">
                    <SmartImage src={p.image} alt={p.name} className="size-20 sm:size-28" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-zinc-500">{p.brand} · {p.category}</p>
                        <Link href={`/products/${p.id}`} className="line-clamp-2 text-sm font-semibold hover:text-brand-600 sm:text-base">{p.name}</Link>
                      </div>
                      <button onClick={() => removeFromCart(p.id)} className="shrink-0 rounded-lg p-2 text-zinc-400 hover:bg-brand-50 hover:text-brand-600" aria-label="Remove"><Trash2 className="size-4" /></button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                      <div className="flex items-center rounded-lg border border-zinc-300">
                        <button onClick={() => setQty(p.id, qty - 1)} className="flex size-9 items-center justify-center hover:text-brand-600" aria-label="Decrease"><Minus className="size-3.5" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                        <button onClick={() => setQty(p.id, Math.min(p.stock, qty + 1))} className="flex size-9 items-center justify-center hover:text-brand-600" aria-label="Increase"><Plus className="size-3.5" /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{formatINR(p.price * qty)}</p>
                        {qty > 1 && <p className="text-xs text-zinc-500">{formatINR(p.price)} each</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside>
              <div className="card sticky top-24 p-6">
                <h3 className="text-lg font-bold">Order Summary</h3>
                <div className="mt-4 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                    <input placeholder="Coupon code" className="input py-2 pl-9" />
                  </div>
                  <button className="btn-outline py-2">Apply</button>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-zinc-500">Subtotal ({totals.count} items)</dt><dd className="font-medium">{formatINR(totals.subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-500">Shipping</dt><dd className="font-medium">{totals.shipping ? formatINR(totals.shipping) : <span className="text-emerald-600">Free</span>}</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-500">GST (included)</dt><dd className="font-medium">{formatINR(totals.tax)}</dd></div>
                  <div className="flex justify-between border-t pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-bold">{formatINR(totals.total)}</dd></div>
                </dl>
                <Link href="/checkout" className="btn-primary mt-6 w-full py-3">Proceed to Checkout<ArrowRight className="size-4" /></Link>
                <Link href="/products" className="btn-ghost mt-2 w-full">Continue Shopping</Link>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500"><ShieldCheck className="size-4 text-emerald-500" />Safe & secure checkout</p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
