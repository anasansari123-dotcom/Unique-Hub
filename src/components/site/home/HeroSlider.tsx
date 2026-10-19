"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn, unsplash } from "@/lib/utils";

const SLIDES = [
  {
    eyebrow: "New Arrivals 2026",
    title: <>Power Up With The <span className="text-brand-500">Latest Laptops</span></>,
    text: "Intel Core Ultra, AMD Ryzen & Apple M-series laptops at the best prices — with free delivery and easy EMI.",
    cta: { label: "Shop Laptops", href: "/products?category=Laptops" },
    image: unsplash("1496181133206-80ce9b88a853", 1400),
  },
  {
    eyebrow: "Expert Repair Centre",
    title: <>Fast & Reliable <span className="text-brand-500">Computer Repair</span></>,
    text: "Chip-level repairs, data recovery and upgrades by certified technicians. Same-day diagnosis guaranteed.",
    cta: { label: "Book a Service", href: "/contact?service=Laptop%20%26%20Desktop%20Repair" },
    image: unsplash("1581092918056-0c4c3acd3789", 1400),
  },
  {
    eyebrow: "Secure Your Space",
    title: <>Smart <span className="text-brand-500">CCTV & Security</span> Solutions</>,
    text: "HD & IP camera kits with professional installation, mobile viewing and annual maintenance support.",
    cta: { label: "Explore CCTV", href: "/products?category=CCTV%20%26%20Security" },
    image: unsplash("1557597774-9d273605dfa9", 1400),
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [i]);
  const go = (d: number) => setI((x) => (x + d + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative overflow-hidden bg-ink-900">
      {SLIDES.map((s, idx) => (
        <div key={idx} className={cn("absolute inset-0 transition-opacity duration-1000", idx === i ? "opacity-100" : "opacity-0")}>
          <SmartImage src={s.image} alt="" className={cn("size-full transition-transform duration-[7000ms]", idx === i ? "scale-105" : "scale-100")} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/20" />
        </div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(239,28,43,0.35),transparent_45%)]" />

      <div className="container-x relative flex min-h-[520px] items-center pb-24 pt-14 sm:min-h-[620px] sm:py-20">
        <div key={i} className="max-w-2xl animate-fade-up text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <span className="size-1.5 rounded-full bg-brand-500" />{SLIDES[i].eyebrow}
          </span>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:mt-5 sm:text-6xl">{SLIDES[i].title}</h1>
          <p className="mt-4 max-w-xl text-sm text-zinc-300 sm:mt-5 sm:text-lg">{SLIDES[i].text}</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <Link href={SLIDES[i].cta.href} className="btn-primary px-4 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-base">{SLIDES[i].cta.label}<ArrowRight className="size-4" /></Link>
            <Link href="/services" className="btn border border-white/20 bg-white/5 px-4 py-3 text-sm text-white backdrop-blur hover:bg-white hover:text-ink-900 sm:px-7 sm:py-3.5 sm:text-base">Our Services</Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-300 sm:mt-10 sm:gap-6 sm:text-sm">
            <span className="flex items-center gap-2"><BadgeCheck className="size-5 text-brand-500" />100% Genuine Products</span>
            <span className="flex items-center gap-2"><Truck className="size-5 text-brand-500" />Fast Doorstep Delivery</span>
          </div>
        </div>
      </div>

      <div className="container-x absolute inset-x-0 bottom-6 flex items-center justify-between sm:bottom-8">
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={cn("h-1.5 rounded-full transition-all", idx === i ? "w-10 bg-brand-500" : "w-5 bg-white/30 hover:bg-white/60")} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous" className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink-900"><ChevronLeft className="size-5" /></button>
          <button onClick={() => go(1)} aria-label="Next" className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink-900"><ChevronRight className="size-5" /></button>
        </div>
      </div>
    </section>
  );
}
