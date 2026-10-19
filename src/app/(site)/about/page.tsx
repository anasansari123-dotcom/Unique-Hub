import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Eye, Gem, HeartHandshake, Lightbulb, Target, ThumbsUp } from "lucide-react";
import { PageBanner, SectionHeading } from "@/components/site/PageBanner";
import { SmartImage } from "@/components/ui/SmartImage";
import { unsplash } from "@/lib/utils";

export const metadata: Metadata = { title: "About Us" };

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

const TEAM = [
  { n: "Founder Name", r: "Founder & CEO", img: unsplash("1507003211169-0a1dd7228f2d", 500) },
  { n: "Team Member", r: "Head of Technical Services", img: unsplash("1494790108377-be9c29b29330", 500) },
  { n: "Team Member", r: "Sales & Operations Manager", img: unsplash("1500648767791-00dcc994a43e", 500) },
  { n: "Team Member", r: "Customer Success Lead", img: unsplash("1438761681033-6461ffad8d80", 500) },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Unique Hub 24" subtitle="Your trusted local technology partner — now online." crumbs={[{ label: "About Us" }]} />

      <section className="py-12 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative grid grid-cols-2 gap-4">
            <SmartImage src={unsplash("1522071820081-009f0129c71c", 700)} alt="" className="aspect-[3/4] w-full rounded-3xl" />
            <div className="space-y-4 pt-10">
              <SmartImage src={unsplash("1581092918056-0c4c3acd3789", 600)} alt="" className="aspect-square w-full rounded-3xl" />
              <div className="flex items-center gap-3 rounded-3xl bg-ink-900 p-5 text-white">
                <Image src="/logo.jpeg" alt="" width={56} height={56} className="size-14 rounded-full" />
                <div>
                  <p className="font-display text-2xl font-extrabold">10+</p>
                  <p className="text-xs text-zinc-400">Years of excellence</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Who We Are" title="Technology professionals who care about your computing needs" center={false} />
            <div className="mt-5 space-y-4 text-zinc-600">
              <p>Unique Hub 24 is a one-stop technology destination offering new and refurbished computers, laptops, components, networking gear and CCTV solutions — along with expert repair, rental, data recovery and IT support services.</p>
              <p>What began as a small repair counter has grown into a trusted brand serving thousands of homes, students, schools and businesses. Our promise is simple: genuine products, honest advice and service that&apos;s there when you need it — 24×7.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 p-5">
                <Target className="size-7 text-brand-600" />
                <h3 className="mt-3 font-semibold">Our Mission</h3>
                <p className="mt-1 text-sm text-zinc-500">Make reliable technology affordable and accessible with trustworthy after-sales support.</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 p-5">
                <Eye className="size-7 text-brand-600" />
                <h3 className="mt-3 font-semibold">Our Vision</h3>
                <p className="mt-1 text-sm text-zinc-500">To be the most trusted tech retail and service brand in the region.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-16 text-white">
        <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {[["12,000+", "Happy Customers"], ["8,000+", "Devices Repaired"], ["1,500+", "CCTV Installs"], ["4.8★", "Average Rating"]].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-4xl font-extrabold text-brand-500">{v}</p>
              <p className="mt-1 text-sm text-zinc-400">{l}</p>
            </div>
          ))}
        </div>
      </section>

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

      <section className="bg-zinc-50 py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Our Journey" title="Growing with our customers" />
          <div className="relative mx-auto mt-8 sm:mt-12 max-w-3xl">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-zinc-300 sm:left-1/2" />
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

      <section className="py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Our Team" title="The people behind Unique Hub" />
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-zinc-200">
                <div className="overflow-hidden"><SmartImage src={m.img} alt={m.n} className="aspect-square w-full transition duration-500 group-hover:scale-105" /></div>
                <div className="p-4 text-center">
                  <p className="font-semibold">{m.n}</p>
                  <p className="text-sm text-zinc-500">{m.r}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Link href="/contact" className="btn-primary px-7 py-3">Get in Touch<ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
