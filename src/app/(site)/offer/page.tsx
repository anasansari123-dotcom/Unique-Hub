import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gift, Percent, Phone, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { PageBanner, SectionHeading } from "@/components/site/PageBanner";
import { OfferProducts } from "@/components/site/OfferProducts";
import { SITE, telHref, whatsappLink } from "@/lib/config";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export const metadata: Metadata = {
  title: "Offers & Deals",
  description: `Exclusive tech offers at Unique Hub 24, ${SITE.city} — discounted laptops, CCTV packages, student deals and bulk pricing. Call sales at ${SITE.salesPhone}.`,
};

const HIGHLIGHTS = [
  { I: Percent, t: "Up to 60% Off", d: "On select refurbished laptops and upgrade kits." },
  { I: Gift, t: "Freebies with Bundle", d: "Bag, mouse or antivirus on selected laptop packages." },
  { I: Tag, t: "Student & Office Deals", d: "Special quotes for colleges, institutes and bulk orders." },
  { I: ShieldCheck, t: "Warranty Backed", d: "Every deal product ships with genuine warranty support." },
];

const PROMO = [
  {
    eyebrow: "Laptop Mega Sale",
    title: "Save big on new & refurbished laptops",
    text: "Work, study or gaming — pick from HP, Dell, Lenovo and more at festive prices.",
    href: "/products?category=Laptops",
    cta: "Shop Laptops",
    tone: "from-brand-600 to-brand-800",
  },
  {
    eyebrow: "CCTV Combo Offer",
    title: "Home & shop security kits",
    text: "Camera + DVR packages with free basic installation consultation in Muzaffarnagar.",
    href: "/products?category=CCTV%20%26%20Security",
    cta: "View CCTV Deals",
    tone: "from-ink-900 to-ink-800",
  },
  {
    eyebrow: "Upgrade Special",
    title: "SSD & RAM upgrade combo",
    text: "Make your old PC feel new — genuine SSD + RAM kits with fitting support at our store.",
    href: "/products?category=Components",
    cta: "Shop Components",
    tone: "from-sky-700 to-brand-700",
  },
];

export default function OfferPage() {
  return (
    <>
      <PageBanner
        title="Exclusive Offers"
        subtitle="Limited-time deals on laptops, CCTV, components and accessories — genuine products, transparent pricing."
        crumbs={[{ label: "Offer" }]}
      />

      <section className="border-b border-zinc-200 bg-white py-10 sm:py-14">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ I, t, d }) => (
            <div key={t} className="flex gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                <I className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold text-zinc-900">{t}</h3>
                <p className="mt-1 text-sm text-zinc-600">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-x">
          <SectionHeading eyebrow="This Season" title="Featured deal packages" text="Popular offers customers are grabbing right now — call sales for the latest stock and price." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3 sm:mt-12">
            {PROMO.map((p) => (
              <div key={p.title} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${p.tone} p-7 text-white sm:p-8`}>
                <div className="absolute -bottom-12 -right-12 size-40 rounded-full bg-white/10" />
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/75">
                  <Sparkles className="size-3.5" />{p.eyebrow}
                </span>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm text-white/85">{p.text}</p>
                <Link href={p.href} className="btn mt-6 border border-white/35 bg-white/10 px-5 py-2.5 text-white hover:bg-white hover:text-brand-700">
                  {p.cta}<ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfferProducts />

      <section className="pb-16 sm:pb-20">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-8 text-white sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_auto]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-100">Need a custom quote?</span>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Bulk, corporate & festival offers on request</h2>
                <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base">
                  Tell us your requirement — we&apos;ll share the best available offer for offices, schools, shops and bulk buyers.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={telHref(SITE.salesPhone)} className="btn border border-white/40 bg-white/10 px-6 py-3 text-white hover:bg-white hover:text-brand-700">
                  <Phone className="size-4" />Sales: {SITE.salesPhone}
                </a>
                <a href={whatsappLink("Hi! I want to know about current offers.")} target="_blank" rel="noreferrer" className="btn bg-white px-6 py-3 text-brand-700 hover:bg-brand-50">
                  <WhatsAppIcon className="size-4 text-[#25D366]" />WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
