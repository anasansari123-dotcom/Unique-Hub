import Link from "next/link";
import { ArrowRight, Award, CreditCard, Headphones, PhoneCall, Quote, ShieldCheck, Truck, Users, Wrench } from "lucide-react";
import { HeroSlider } from "@/components/site/home/HeroSlider";
import { FeaturedProducts } from "@/components/site/home/FeaturedProducts";
import { SectionHeading } from "@/components/site/PageBanner";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { BRANDS, CATEGORIES, SERVICES, TESTIMONIALS } from "@/lib/data";
import { SITE, telHref, whatsappLink } from "@/lib/config";
import { unsplash } from "@/lib/utils";

const PERKS = [
  { Icon: Truck, title: "Free Delivery", text: `On orders above ₹${SITE.freeShippingAbove.toLocaleString("en-IN")}` },
  { Icon: ShieldCheck, title: "Genuine Warranty", text: "Brand & store warranty" },
  { Icon: CreditCard, title: "Secure Payments", text: "UPI, cards & net banking" },
  { Icon: Headphones, title: "24/7 Support", text: "Call or WhatsApp anytime" },
];

const STATS = [
  { value: "12K+", label: "Happy Customers" },
  { value: "8K+", label: "Devices Repaired" },
  { value: "1.5K+", label: "CCTV Installations" },
  { value: "10+", label: "Years of Experience" },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Perks */}
      <section className="relative z-10 -mt-px border-b border-zinc-200 bg-white">
        <div className="container-x grid grid-cols-2 divide-zinc-200 lg:grid-cols-4 lg:divide-x">
          {PERKS.map(({ Icon: I, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-2 px-2 py-5 text-center sm:flex-row sm:gap-4 sm:px-6 sm:py-6 sm:text-left">
              <span className="flex size-10 shrink-0 sm:size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><I className="size-5 sm:size-6" /></span>
              <div>
                <p className="text-sm font-semibold text-zinc-900 sm:text-base">{title}</p>
                <p className="text-[11px] leading-tight text-zinc-500 sm:text-sm">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Shop by Category" title="Everything tech, under one roof" text="From high-performance laptops to security systems — explore our curated range of genuine products." />
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link key={c.name} href={`/products?category=${encodeURIComponent(c.name)}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900">
                <SmartImage src={c.image} alt={c.name} className="size-full opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div>
                    <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-brand-600 text-white transition group-hover:scale-110"><Icon name={c.icon} className="size-5" /></span>
                    <p className="font-semibold text-white sm:text-lg">{c.name}</p>
                  </div>
                  <ArrowRight className="size-5 -translate-x-2 text-white opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Promo banners */}
      <section className="py-12 sm:py-20">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white sm:p-10">
            <div className="absolute -bottom-16 -right-16 size-64 rounded-full bg-white/10" />
            <div className="absolute -right-4 top-10 size-24 rounded-full bg-white/10" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Refurbished Sale</span>
            <h3 className="mt-3 max-w-xs text-3xl font-extrabold leading-tight">Grade-A Laptops from ₹14,999</h3>
            <p className="mt-3 max-w-sm text-white/80">40+ point quality check and up to 12 months warranty. Save up to 60%.</p>
            <Link href="/products?category=Laptops" className="btn mt-6 bg-white text-brand-700 hover:bg-ink-900 hover:text-white">Shop Now<ArrowRight className="size-4" /></Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white sm:p-10">
            <SmartImage src={unsplash("1557597774-9d273605dfa9", 900)} alt="" className="absolute inset-0 size-full opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900 to-transparent" />
            <div className="relative">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Security Combo</span>
              <h3 className="mt-3 max-w-xs text-3xl font-extrabold leading-tight">CCTV Kits with Free Installation</h3>
              <p className="mt-3 max-w-sm text-zinc-300">4 & 8 camera HD/IP kits, mobile viewing, 1 year free AMC.</p>
              <Link href="/products?category=CCTV%20%26%20Security" className="btn-primary mt-6">Explore Kits<ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-ink-900 py-12 sm:py-20 text-white">
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="container-x relative">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow bg-white/10 text-brand-500">What We Do</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Complete IT services for homes & businesses</h2>
              <p className="mt-3 text-zinc-400">Certified technicians, genuine parts and transparent pricing — that&apos;s the Unique Hub promise.</p>
            </div>
            <Link href="/services" className="btn border border-white/20 text-white hover:bg-white hover:text-ink-900">All Services<ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {SERVICES.slice(0, 8).map((s, idx) => (
              <Link key={s.id} href={`/services#${s.id}`} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition sm:p-6 hover:-translate-y-1 hover:border-brand-500/50 hover:bg-white/[0.06]">
                <span className="absolute right-5 top-4 hidden sm:block font-display text-5xl font-extrabold text-white/5">{String(idx + 1).padStart(2, "0")}</span>
                <span className="flex size-10 items-center sm:size-12 justify-center rounded-xl bg-brand-600/15 text-brand-500 transition group-hover:bg-brand-600 group-hover:text-white"><Icon name={s.icon} className="size-5 sm:size-6" /></span>
                <h3 className="mt-3 text-sm font-semibold leading-snug sm:mt-5 sm:text-lg">{s.title}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-zinc-400 sm:block">{s.short}</p>
                <span className="mt-4 hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-500">Learn more<ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-12 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <SmartImage src={unsplash("1522071820081-009f0129c71c", 1000)} alt="Unique Hub team" className="aspect-[4/3] w-full" />
            </div>
            <div className="absolute -bottom-6 right-3 rounded-2xl bg-white p-4 shadow-2xl sm:right-6 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white"><Award className="size-6" /></span>
                <div>
                  <p className="font-display text-2xl font-extrabold">10+ Years</p>
                  <p className="text-sm text-zinc-500">of trusted service</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Why Choose Us" title="Technology experts who genuinely care" center={false} text="We combine the convenience of online shopping with the trust of a local store. Every product is genuine, every repair is backed by warranty." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { I: ShieldCheck, t: "Genuine Products", d: "Authorised sourcing with GST invoice." },
                { I: Wrench, t: "Certified Technicians", d: "Chip-level experts with 10+ years." },
                { I: Users, t: "Doorstep Service", d: "Onsite support for homes & offices." },
                { I: PhoneCall, t: "Quick Response", d: "Support within hours, not days." },
              ].map(({ I, t, d }) => (
                <div key={t} className="flex gap-3 rounded-2xl border border-zinc-200 p-4">
                  <I className="size-6 shrink-0 text-brand-600" />
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-sm text-zinc-500">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-extrabold text-brand-600">{s.value}</p>
                  <p className="text-xs text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-50 py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Testimonials" title="Loved by thousands of customers" />
          <div className="mt-8 sm:mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card relative flex flex-col p-6 transition hover:shadow-xl">
                <Quote className="size-8 text-brand-200" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-zinc-700">{t.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-ink-900 font-semibold text-white">{t.name[0]}</span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                  <Stars value={t.rating} className="ml-auto" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="overflow-hidden border-y border-zinc-200 py-10">
        <div className="flex w-max animate-marquee gap-16">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-display text-2xl font-extrabold text-zinc-300 transition hover:text-brand-600">{b}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-14 text-center text-white sm:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,28,43,0.4),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">Need help choosing the right device?</h2>
              <p className="mx-auto mt-3 max-w-xl text-zinc-300">Talk to our experts on call or WhatsApp — we&apos;ll recommend the best option for your budget and needs.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={whatsappLink("Hi! I need help choosing a product.")} target="_blank" rel="noreferrer" className="btn bg-[#25D366] px-7 py-3.5 text-white hover:brightness-110"><WhatsAppIcon className="size-5" />Chat on WhatsApp</a>
                <a href={telHref(SITE.phone)} className="btn border border-white/20 px-7 py-3.5 text-white hover:bg-white hover:text-ink-900"><PhoneCall className="size-4" />{SITE.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
