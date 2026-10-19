import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, PackageCheck, Stethoscope } from "lucide-react";
import { PageBanner, SectionHeading } from "@/components/site/PageBanner";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SERVICES } from "@/lib/data";
import { whatsappLink } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Services" };

const STEPS = [
  { I: CalendarCheck, t: "Book", d: "Book online, call or WhatsApp us." },
  { I: Stethoscope, t: "Diagnose", d: "Free inspection & transparent quote." },
  { I: ClipboardList, t: "Approve", d: "Work starts only after your approval." },
  { I: PackageCheck, t: "Deliver", d: "Tested, delivered & backed by warranty." },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Our Services" subtitle="Repairs, rentals, refurbished sales, data recovery, CCTV and complete IT support — all under one roof." crumbs={[{ label: "Services" }]} />

      {/* Overview grid */}
      <section className="py-16">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="group card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white"><Icon name={s.icon} className="size-6" /></span>
              <span className="font-semibold text-zinc-900">{s.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Detailed rows */}
      <section className="pb-8">
        <div className="container-x space-y-20">
          {SERVICES.map((s, i) => (
            <div key={s.id} id={s.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={cn("relative", i % 2 && "lg:order-2")}>
                <div className="overflow-hidden rounded-3xl">
                  <SmartImage src={s.image} alt={s.title} className="aspect-[16/11] w-full" />
                </div>
                <span className="absolute -bottom-5 left-6 flex size-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-xl shadow-brand-600/30"><Icon name={s.icon} className="size-8" /></span>
              </div>
              <div>
                <span className="font-display text-sm font-bold text-brand-600">SERVICE {String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 text-3xl font-bold text-zinc-900">{s.title}</h2>
                <p className="mt-3 text-lg text-zinc-600">{s.short}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-zinc-700"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" />{pt}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/contact?service=${encodeURIComponent(s.title)}`} className="btn-primary">Book This Service<ArrowRight className="size-4" /></Link>
                  <a href={whatsappLink(`Hi, I want to enquire about ${s.title}.`)} target="_blank" rel="noreferrer" className="btn-outline"><WhatsAppIcon className="size-4 text-[#25D366]" />WhatsApp</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-16 bg-zinc-50 py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="How It Works" title="Simple 4-step service process" />
          <div className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ I, t, d }, i) => (
              <div key={t} className="card relative p-6 text-center">
                <span className="absolute right-4 top-3 font-display text-4xl font-extrabold text-zinc-100">{i + 1}</span>
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-ink-900 text-white"><I className="size-6" /></span>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-zinc-500">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
