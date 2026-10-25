import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight, BadgeCheck, Building2, CheckCircle2, Clock, Eye, Gem, GraduationCap, HeartHandshake, Home, IndianRupee,
  Lightbulb, MapPin, Phone, School, ShieldCheck, Store, Target, ThumbsUp, Truck, Wrench,
} from "lucide-react";
import { PageBanner, SectionHeading } from "@/components/site/PageBanner";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { BRANDS, CATEGORIES, SERVICES } from "@/lib/data";
import { SITE, telHref } from "@/lib/config";
import { unsplash } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description: "Unique Hub 24 — Muzaffarnagar's one-stop technology destination for laptops, computers, CCTV, networking and expert IT services since 2014.",
};

const VALUES = [
  { I: Gem, t: "Integrity", d: "Honest advice and transparent pricing — always." },
  { I: Lightbulb, t: "Expertise", d: "Certified technicians who stay ahead of technology." },
  { I: HeartHandshake, t: "Customer First", d: "Long-term relationships over one-time sales." },
  { I: ThumbsUp, t: "Quality", d: "Genuine products and warranty-backed service." },
];

const TIMELINE = [
  { y: "2014", t: "Founded", d: "Started as a small computer repair shop with two technicians." },
  { y: "2017", t: "Retail Expansion", d: "Launched laptop, desktop and accessories retail." },
  { y: "2020", t: "CCTV & Networking", d: "Added security and networking solutions for businesses." },
  { y: "2024", t: "Unique Hub 24", d: "Rebranded with 24×7 support and rental services." },
  { y: "2026", t: "Online Store", d: "Launched e-commerce with doorstep delivery across India." },
];

const WHY_US = [
  { I: BadgeCheck, t: "100% Genuine Products", d: "Brand-new products with official manufacturer warranty and GST invoice." },
  { I: Wrench, t: "Chip-Level Repairs", d: "In-house service centre for laptops, desktops, motherboards and printers." },
  { I: IndianRupee, t: "Transparent Pricing", d: "Clear quotes before any work begins — no hidden charges, ever." },
  { I: Clock, t: "Same-Day Diagnosis", d: "Most devices are checked and quoted on the day you bring them in." },
  { I: ShieldCheck, t: "Service Warranty", d: "Every repair and part replacement is backed by our service warranty." },
  { I: Truck, t: "Doorstep Delivery", d: `Fast delivery, with free shipping on orders above ₹${SITE.freeShippingAbove.toLocaleString("en-IN")}.` },
];

const AUDIENCE = [
  { I: Home, t: "Homes & Families", d: "Laptops, printers, Wi-Fi and home CCTV set up the right way." },
  { I: GraduationCap, t: "Students", d: "Budget-friendly laptops, upgrades and refurbished options." },
  { I: Building2, t: "Offices & Businesses", d: "Bulk systems, networking, AMC and on-site IT support." },
  { I: School, t: "Schools & Institutes", d: "Computer labs, projectors, CCTV and rental systems." },
  { I: Store, t: "Shops & Showrooms", d: "Billing systems, security cameras and reliable networking." },
];

const PROMISES = [
  "Free consultation before you buy",
  "Data privacy respected on every repair",
  "Easy EMI options on select products",
  "Original spare parts only",
  "Pick-up & drop for bulk / business orders",
  "After-sales support on call & WhatsApp",
];

const TEAM = [
  { n: "Founder Name", r: "Founder & CEO", img: unsplash("1507003211169-0a1dd7228f2d", 500) },
  { n: "Team Member", r: "Head of Technical Services", img: unsplash("1494790108377-be9c29b29330", 500) },
  { n: "Team Member", r: "Sales & Operations Manager", img: unsplash("1500648767791-00dcc994a43e", 500) },
  { n: "Team Member", r: "Customer Success Lead", img: unsplash("1438761681033-6461ffad8d80", 500) },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Unique Hub 24" subtitle="Your trusted local technology partner in Muzaffarnagar — now online." crumbs={[{ label: "About Us" }]} />

      {/* Who we are */}
      <section className="py-12 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative grid grid-cols-2 gap-4">
            <SmartImage src={unsplash("1522071820081-009f0129c71c", 700)} alt="" className="aspect-[3/4] w-full rounded-3xl" />
            <div className="space-y-4 pt-10">
              <SmartImage src={unsplash("1581092918056-0c4c3acd3789", 600)} alt="" className="aspect-square w-full rounded-3xl" />
              <div className="flex items-center gap-3 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 p-5 text-white">
                <Image src="/logo.png" alt="" width={64} height={64} className="size-16 shrink-0 rounded-full bg-white p-0.5" />
                <div>
                  <p className="font-display text-2xl font-extrabold">10+</p>
                  <p className="text-xs text-white/90">Years of excellence</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Who We Are" title="Technology professionals who care about your computing needs" center={false} />
            <div className="mt-5 space-y-4 text-zinc-600">
              <p>Unique Hub 24 is a one-stop technology destination offering new and refurbished computers, laptops, components, networking gear and CCTV solutions — along with expert repair, rental, data recovery and IT support services.</p>
              <p>What began as a small repair counter has grown into a trusted brand serving thousands of homes, students, schools and businesses. Our promise is simple: genuine products, honest advice and service that&apos;s there when you need it — 24×7.</p>
              <p>Unique Hub 24 is a unit of <span className="font-semibold text-zinc-900">{SITE.legalName}</span>, operating from {SITE.city}, {SITE.state}, and now delivering to customers across India through our online store.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
                <Target className="size-7 text-brand-600" />
                <h3 className="mt-3 font-semibold">Our Mission</h3>
                <p className="mt-1 text-sm text-zinc-600">Make reliable technology affordable and accessible with trustworthy after-sales support.</p>
              </div>
              <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
                <Eye className="size-7 text-brand-600" />
                <h3 className="mt-3 font-semibold">Our Vision</h3>
                <p className="mt-1 text-sm text-zinc-600">To be the most trusted tech retail and service brand in the region.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 py-14 text-white sm:py-16">
        <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {[["12,000+", "Happy Customers"], ["8,000+", "Devices Repaired"], ["1,500+", "CCTV Installs"], ["4.8★", "Average Rating"]].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-4xl font-extrabold sm:text-5xl">{v}</p>
              <p className="mt-1 text-sm font-medium text-white/90 sm:text-base">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="What We Offer" title="Products & services under one roof" text="Everything you need to buy, set up, repair and maintain your technology — from a single trusted partner." />
          <div className="mt-8 grid gap-6 sm:mt-12 lg:grid-cols-2">
            <div className="card p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold"><Store className="size-5 text-brand-600" />Products we sell</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {CATEGORIES.map((c) => (
                  <Link key={c.name} href={`/products?category=${encodeURIComponent(c.name)}`} className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 text-sm font-medium transition hover:border-brand-500 hover:bg-brand-50">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon name={c.icon} className="size-5" /></span>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="card p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold"><Wrench className="size-5 text-brand-600" />Services we provide</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {SERVICES.map((s) => (
                  <Link key={s.id} href={`/services#${s.id}`} className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 text-sm font-medium transition hover:border-brand-500 hover:bg-brand-50">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon name={s.icon} className="size-5" /></span>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-brand-50/60 py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Why Choose Us" title="The Unique Hub advantage" />
          <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map(({ I, t, d }) => (
              <div key={t} className="card flex gap-4 p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/10">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white"><I className="size-6" /></span>
                <div>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Our Values" title="What drives us every day" />
          <div className="mt-8 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ I, t, d }) => (
              <div key={t} className="card p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><I className="size-6" /></span>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-zinc-500">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve + promises */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 py-12 text-white sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <span className="eyebrow bg-white/15 text-white">Who We Serve</span>
            <h2 className="mt-3 text-[1.65rem] font-bold leading-tight sm:text-4xl">Trusted by homes, students and businesses</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {AUDIENCE.map(({ I, t, d }) => (
                <div key={t} className="flex gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600"><I className="size-5" /></span>
                  <div>
                    <h3 className="font-semibold">{t}</h3>
                    <p className="mt-0.5 text-sm text-white/85">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 text-zinc-800 shadow-2xl shadow-ink-900/20 sm:p-8">
              <h3 className="text-xl font-bold text-zinc-900">Our promise to you</h3>
              <ul className="mt-5 space-y-3">
                {PROMISES.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" />{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-zinc-50 py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Our Journey" title="Growing with our customers" />
          <div className="relative mx-auto mt-8 sm:mt-12 max-w-3xl">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-brand-200 sm:left-1/2" />
            {TIMELINE.map((e, i) => (
              <div key={e.y} className={`relative mb-8 flex sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"} pl-12 sm:pl-0`}>
                <span className={`absolute left-4 top-5 size-4 -translate-x-1/2 rounded-full border-4 border-white bg-brand-600 shadow ${i % 2 ? "sm:left-0" : "sm:left-full"}`} />
                <div className="card w-full p-5">
                  <span className="font-display text-sm font-bold text-brand-600">{e.y}</span>
                  <h3 className="font-semibold">{e.t}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Brands We Deal In" title="Leading brands, genuine warranty" />
          <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:grid-cols-4 lg:grid-cols-6">
            {BRANDS.map((b) => (
              <div key={b} className="flex h-16 items-center justify-center rounded-xl border border-zinc-200 bg-white font-display text-base font-bold text-zinc-500 transition hover:border-brand-500 hover:text-brand-600 sm:text-lg">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-zinc-50 py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Our Team" title="The people behind Unique Hub" />
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="overflow-hidden"><SmartImage src={m.img} alt={m.n} className="aspect-square w-full transition duration-500 group-hover:scale-105" /></div>
                <div className="p-4 text-center">
                  <p className="font-semibold">{m.n}</p>
                  <p className="text-sm text-zinc-500">{m.r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit us CTA */}
      <section className="py-12 sm:py-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-6 text-white sm:p-12">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10" />
            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold sm:text-4xl">Visit our store or give us a call</h2>
                <p className="mt-3 max-w-lg text-white/90">See products in person, get a free consultation or drop off your device for a same-day diagnosis.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn bg-white px-7 py-3 text-brand-700 hover:bg-ink-900 hover:text-white">Get in Touch<ArrowRight className="size-4" /></Link>
                  <a href={telHref(SITE.phone)} className="btn border border-white/40 bg-white/10 px-7 py-3 text-white hover:bg-white hover:text-brand-700"><Phone className="size-4" />{SITE.phone}</a>
                </div>
              </div>
              <ul className="space-y-4 rounded-2xl border border-white/20 bg-white/10 p-5 text-sm backdrop-blur-sm sm:p-6">
                <li className="flex gap-3"><MapPin className="size-5 shrink-0" />{SITE.address}</li>
                <li className="flex gap-3"><Clock className="size-5 shrink-0" />{SITE.hours}</li>
                <li className="flex gap-3"><Phone className="size-5 shrink-0" />Service: {SITE.phone} · Sales: {SITE.salesPhone}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
