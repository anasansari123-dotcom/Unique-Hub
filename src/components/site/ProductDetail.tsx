"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BadgeCheck, ChevronRight, Minus, PackageX, Plus, RotateCcw, ShieldCheck, ShoppingCart, Truck, Zap } from "lucide-react";
import { useStore } from "@/lib/store";
import { whatsappLink } from "@/lib/config";
import { cn, discountPct, formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Stars } from "@/components/ui/Stars";
import { useToast } from "@/components/ui/Toast";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ id }: { id: string }) {
  const { getProduct, products, addToCart, ready } = useStore();
  const router = useRouter();
  const toast = useToast();
  const product = getProduct(id);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState<"desc" | "specs" | "shipping">("desc");

  if (!product) {
    return (
      <div className="container-x flex flex-col items-center py-28 text-center">
        <PackageX className="size-14 text-zinc-300" />
        <h1 className="mt-4 text-2xl font-bold">{ready ? "Product not found" : "Loading…"}</h1>
        {ready && <Link href="/products" className="btn-primary mt-6">Back to Shop</Link>}
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const off = discountPct(product.price, product.mrp);
  const related = products.filter((p) => p.active && p.category === product.category && p.id !== product.id).slice(0, 4);
  const out = product.stock <= 0;

  return (
    <>
      <div className="border-b bg-zinc-50">
        <nav className="container-x flex items-center gap-1.5 overflow-hidden whitespace-nowrap py-3 text-xs text-zinc-500 sm:py-4 sm:text-sm">
          <Link href="/" className="hover:text-brand-600">Home</Link><ChevronRight className="size-3.5" />
          <Link href="/products" className="hover:text-brand-600">Shop</Link><ChevronRight className="size-3.5" />
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-600">{product.category}</Link><ChevronRight className="size-3.5" />
          <span className="truncate text-zinc-900">{product.name}</span>
        </nav>
      </div>

      <section className="container-x grid gap-6 py-6 sm:gap-10 sm:py-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
            <SmartImage src={gallery[img]} alt={product.name} className="aspect-square w-full" />
            {off > 0 && <span className="badge absolute left-4 top-4 bg-brand-600 px-3 py-1 text-sm text-white">-{off}% OFF</span>}
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button key={g} onClick={() => setImg(i)} className={cn("overflow-hidden rounded-xl border-2 transition", i === img ? "border-brand-600" : "border-transparent opacity-70 hover:opacity-100")}>
                  <SmartImage src={g} alt="" className="aspect-square w-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge bg-zinc-100 text-zinc-700">{product.brand}</span>
            {product.badge && <span className="badge bg-ink-900 text-white">{product.badge}</span>}
            <span className="text-xs text-zinc-400">SKU: {product.id}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <Stars value={product.rating} />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm text-zinc-500">({product.reviews} reviews)</span>
          </div>
          <p className="mt-4 text-zinc-600">{product.short}</p>

          <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
            <div className="flex flex-wrap items-end gap-3">
              <span className="font-display text-4xl font-extrabold text-zinc-900">{formatINR(product.price)}</span>
              {off > 0 && (
                <>
                  <span className="text-lg text-zinc-400 line-through">{formatINR(product.mrp)}</span>
                  <span className="badge bg-emerald-100 text-emerald-700">You save {formatINR(product.mrp - product.price)}</span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-zinc-500">Inclusive of all taxes · EMI from {formatINR(product.price / 12)}/month</p>
            <p className={cn("mt-3 flex items-center gap-1.5 text-sm font-semibold", out ? "text-brand-600" : "text-emerald-600")}>
              <span className={cn("size-2 rounded-full", out ? "bg-brand-600" : "bg-emerald-500")} />
              {out ? "Out of stock" : product.stock < 8 ? `Hurry! Only ${product.stock} left in stock` : "In stock — ready to ship"}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-zinc-300">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex size-12 items-center justify-center hover:text-brand-600" aria-label="Decrease"><Minus className="size-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))} className="flex size-12 items-center justify-center hover:text-brand-600" aria-label="Increase"><Plus className="size-4" /></button>
            </div>
            <button disabled={out} onClick={() => { addToCart(product.id, qty); toast("success", "Added to cart", `${qty} × ${product.name}`); }} className="btn-dark h-12 flex-1 px-6">
              <ShoppingCart className="size-4" />Add to Cart
            </button>
            <button disabled={out} onClick={() => { addToCart(product.id, qty); router.push("/checkout"); }} className="btn-primary h-12 flex-1 px-6">
              <Zap className="size-4" />Buy Now
            </button>
          </div>
          <a href={whatsappLink(`Hi, I'm interested in ${product.name} (${product.id}). Is it available?`)} target="_blank" rel="noreferrer" className="btn mt-3 h-12 w-full border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white">
            <WhatsAppIcon className="size-5" />Enquire on WhatsApp
          </a>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { I: Truck, t: "Free Delivery" },
              { I: ShieldCheck, t: "Warranty" },
              { I: RotateCcw, t: "7-Day Replace" },
              { I: BadgeCheck, t: "GST Invoice" },
            ].map(({ I, t }) => (
              <div key={t} className="flex flex-col items-center gap-1.5 rounded-xl border border-zinc-200 p-3 text-center">
                <I className="size-5 text-brand-600" />
                <span className="text-xs font-medium text-zinc-700">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container-x pb-28 lg:pb-16">
        <div className="scroll-thin -mx-4 flex gap-1 overflow-x-auto border-b px-4 sm:mx-0 sm:px-0">
          {([["desc", "Description"], ["specs", "Specifications"], ["shipping", "Shipping & Warranty"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={cn("-mb-px shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition", tab === k ? "border-brand-600 text-brand-600" : "border-transparent text-zinc-500 hover:text-zinc-900")}>{l}</button>
          ))}
        </div>
        <div className="py-8">
          {tab === "desc" && <p className="max-w-3xl leading-relaxed text-zinc-700">{product.description}</p>}
          {tab === "specs" && (
            <div className="max-w-3xl overflow-hidden rounded-2xl border border-zinc-200">
              {Object.entries(product.specs).map(([k, v], i) => (
                <div key={k} className={cn("grid grid-cols-[160px_1fr] text-sm sm:grid-cols-[220px_1fr]", i % 2 ? "bg-white" : "bg-zinc-50")}>
                  <span className="px-5 py-3 font-semibold text-zinc-900">{k}</span>
                  <span className="px-5 py-3 text-zinc-700">{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "shipping" && (
            <ul className="max-w-3xl list-disc space-y-2 pl-5 text-zinc-700">
              <li>Free delivery on orders above ₹4,999. Standard delivery in 2–5 business days.</li>
              <li>Same-day delivery available within city limits for orders placed before 2 PM.</li>
              <li>7-day replacement for manufacturing defects. Original packaging required.</li>
              <li>Brand warranty as specified. Unique Hub 24 assists with all warranty claims.</li>
            </ul>
          )}
        </div>

        {related.length > 0 && (
          <>
            <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </section>

      {/* Mobile sticky purchase bar */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur lg:hidden print:hidden">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold leading-tight">{formatINR(product.price)}</p>
            {off > 0 && <p className="text-xs text-zinc-400"><span className="line-through">{formatINR(product.mrp)}</span> <span className="font-semibold text-emerald-600">{off}% off</span></p>}
          </div>
          <button disabled={out} onClick={() => { addToCart(product.id, qty); toast("success", "Added to cart", product.name); }} className="btn-dark h-11 px-3.5" aria-label="Add to cart">
            <ShoppingCart className="size-5" />
          </button>
          <button disabled={out} onClick={() => { addToCart(product.id, qty); router.push("/checkout"); }} className="btn-primary h-11 px-5">
            {out ? "Out of stock" : "Buy Now"}
          </button>
        </div>
      </div>
    </>
  );
}
