"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/PageBanner";

const TABS = ["All", "Laptops", "Desktops", "Accessories", "CCTV & Security"];

export function FeaturedProducts() {
  const { products } = useStore();
  const [tab, setTab] = useState("All");
  const list = products
    .filter((p) => p.active && (tab === "All" ? p.featured : p.category === tab))
    .slice(0, 8);

  return (
    <section className="bg-zinc-50 py-12 sm:py-20">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Featured Products" title="Trending tech, unbeatable prices" center={false} />
          <div className="scroll-thin -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:w-auto lg:px-0">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition", tab === t ? "bg-ink-900 text-white" : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:ring-brand-500")}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-10 text-center">
          <Link href="/products" className="btn-dark px-7 py-3">View All Products<ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}
