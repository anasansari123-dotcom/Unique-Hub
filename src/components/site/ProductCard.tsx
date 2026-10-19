"use client";

import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { SmartImage } from "@/components/ui/SmartImage";
import { Stars } from "@/components/ui/Stars";
import { discountPct, formatINR } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const toast = useToast();
  const off = discountPct(product.price, product.mrp);
  const out = product.stock <= 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5">
      <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-zinc-50">
        <SmartImage src={product.image} alt={product.name} className="size-full transition duration-500 group-hover:scale-105" />
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          {off > 0 && <span className="badge bg-brand-600 px-2 text-[11px] text-white sm:px-2.5 sm:text-xs">-{off}%</span>}
          {product.badge && <span className="badge max-w-full truncate bg-ink-900/90 px-2 text-[11px] text-white sm:px-2.5 sm:text-xs">{product.badge}</span>}
        </div>
        <span className="absolute right-3 top-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-white/95 text-zinc-700 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="size-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs">{product.brand} · {product.category}</p>
        <Link href={`/products/${product.id}`} className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-zinc-900 hover:text-brand-600 sm:min-h-[2.75rem] sm:text-base">
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <Stars value={product.rating} />
          <span className="hidden text-xs text-zinc-500 min-[400px]:inline">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-end justify-between gap-2 sm:mt-3">
          <div className="min-w-0">
            <p className="text-base font-bold text-zinc-900 sm:text-lg">{formatINR(product.price)}</p>
            {off > 0 && <p className="text-xs text-zinc-400 line-through">{formatINR(product.mrp)}</p>}
          </div>
          <button
            disabled={out}
            onClick={() => {
              addToCart(product.id);
              toast("success", "Added to cart", product.name);
            }}
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-ink-900 sm:size-10 text-white transition hover:bg-brand-600 disabled:bg-zinc-300"
            aria-label="Add to cart"
          >
            <ShoppingCart className="size-4" />
          </button>
        </div>
        {out ? (
          <p className="mt-2 text-xs font-medium text-brand-600">Out of stock</p>
        ) : product.stock < 8 ? (
          <p className="mt-2 text-xs font-medium text-amber-600">Only {product.stock} left</p>
        ) : null}
      </div>
    </div>
  );
}
