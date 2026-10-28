"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { discountPct } from "@/lib/utils";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/PageBanner";

export function OfferProducts() {
  const { products } = useStore();
  const deals = products
    .filter((p) => p.active && discountPct(p.price, p.mrp) >= 15)
    .sort((a, b) => discountPct(b.price, b.mrp) - discountPct(a.price, a.mrp));

  return (
    <section className="bg-zinc-50 py-12 sm:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Hot Deals"
          title="Products with the biggest savings"
          text="Sorted by discount — prices include GST invoice and warranty support."
        />
        {deals.length === 0 ? (
          <p className="mt-10 text-center text-zinc-500">No active deals right now. Check back soon or browse the full shop.</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link href="/products" className="btn-dark px-7 py-3">
            Browse All Products
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
