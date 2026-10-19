import { Suspense } from "react";
import type { Metadata } from "next";
import { PageBanner } from "@/components/site/PageBanner";
import { ProductListing } from "@/components/site/ProductListing";

export const metadata: Metadata = { title: "Shop" };

export default function ProductsPage() {
  return (
    <>
      <PageBanner title="Shop All Products" subtitle="Laptops, desktops, components, networking, CCTV and accessories — genuine products with warranty." crumbs={[{ label: "Shop" }]} />
      <Suspense>
        <ProductListing />
      </Suspense>
    </>
  );
}
