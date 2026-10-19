"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

const SORTS = {
  popular: "Most Popular",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
  newest: "Newest",
} as const;

export function ProductListing() {
  const params = useSearchParams();
  const router = useRouter();
  const { products } = useStore();

  const category = params.get("category") ?? "All";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<keyof typeof SORTS>("popular");
  const [panel, setPanel] = useState(false);

  const active = products.filter((p) => p.active);
  const allBrands = useMemo(() => [...new Set(active.map((p) => p.brand))].sort(), [active]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const r = active.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!term || `${p.name} ${p.brand} ${p.category} ${p.short}`.toLowerCase().includes(term)) &&
        (!brands.length || brands.includes(p.brand)) &&
        p.price <= maxPrice &&
        (!inStock || p.stock > 0),
    );
    const sorters: Record<keyof typeof SORTS, (a: typeof r[0], b: typeof r[0]) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    };
    return r.sort(sorters[sort]);
  }, [active, category, q, brands, maxPrice, inStock, sort]);

  const setCategory = (c: string) => {
    const sp = new URLSearchParams(params.toString());
    if (c === "All") sp.delete("category");
    else sp.set("category", c);
    router.replace(`/products?${sp.toString()}`, { scroll: false });
  };
  const reset = () => {
    setQ("");
    setBrands([]);
    setMaxPrice(100000);
    setInStock(false);
    router.replace("/products", { scroll: false });
  };

  const Filters = (
    <div className="space-y-7">
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-900">Categories</h4>
        <div className="space-y-1">
          {["All", ...CATEGORIES.map((c) => c.name)].map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition", category === c ? "bg-brand-600 font-semibold text-white" : "text-zinc-700 hover:bg-zinc-100")}>
              {c}
              <span className={cn("text-xs", category === c ? "text-white/80" : "text-zinc-400")}>
                {c === "All" ? active.length : active.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-900">Max Price</h4>
        <input type="range" min={1000} max={100000} step={1000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-brand-600" />
        <div className="mt-1 flex justify-between text-xs text-zinc-500"><span>₹1,000</span><span className="font-semibold text-zinc-900">{formatINR(maxPrice)}</span></div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-900">Brands</h4>
        <div className="space-y-2">
          {allBrands.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
              <input type="checkbox" checked={brands.includes(b)} onChange={() => setBrands((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]))} className="size-4 rounded accent-brand-600" />
              {b}
            </label>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-zinc-700">
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="size-4 accent-brand-600" />
        In stock only
      </label>
      <button onClick={reset} className="btn-outline w-full">Reset Filters</button>
    </div>
  );

  return (
    <section className="container-x py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 card p-5">{Filters}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="input pl-10" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPanel(true)} className="btn-outline lg:hidden"><SlidersHorizontal className="size-4" />Filters</button>
              <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)} className="input w-auto">
                {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          <p className="mb-5 text-sm text-zinc-500">
            Showing <span className="font-semibold text-zinc-900">{list.length}</span> products
            {category !== "All" && <> in <span className="font-semibold text-brand-600">{category}</span></>}
          </p>

          {list.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="card flex flex-col items-center px-6 py-20 text-center">
              <PackageSearch className="size-12 text-zinc-300" />
              <h3 className="mt-4 text-lg font-semibold">No products found</h3>
              <p className="mt-1 text-sm text-zinc-500">Try changing filters or search for something else.</p>
              <button onClick={reset} className="btn-primary mt-5">Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={cn("fixed inset-0 z-[60] lg:hidden", panel ? "visible" : "invisible")}>
        <div onClick={() => setPanel(false)} className={cn("absolute inset-0 bg-black/50 transition", panel ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 transition-transform", panel ? "translate-x-0" : "-translate-x-full")}>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold">Filters</h3>
            <button onClick={() => setPanel(false)} aria-label="Close"><X className="size-5" /></button>
          </div>
          {Filters}
        </div>
      </div>
    </section>
  );
}
