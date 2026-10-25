import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronDown, Clock, Headphones, Mail, MapPin, Navigation, Phone, ShoppingCart, Truck, Wrench } from "lucide-react";
import { PageBanner, SectionHeading } from "@/components/site/PageBanner";
import { ContactForm } from "@/components/site/ContactForm";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SITE, telHref, whatsappLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Unique Hub 24, ${SITE.city} — call ${SITE.phone} for service, ${SITE.salesPhone} for sales, or WhatsApp us for quick replies.`,
};

const DEPARTMENTS = [
  { I: Wrench, t: "Service & Repairs", d: "Repair bookings, service status, data recovery and AMC support.", v: SITE.phone, href: telHref(SITE.phone) },
  { I: ShoppingCart, t: "Sales & Bulk Orders", d: "Product availability, quotations, corporate and bulk pricing.", v: SITE.salesPhone, href: telHref(SITE.salesPhone) },
  { I: Headphones, t: "Order Support", d: "Online order tracking, delivery, returns and invoices.", v: SITE.whatsappDisplay, href: whatsappLink("Hi! I need help with my order.") },
];

const FAQS = [
  { q: "How quickly will I get a response?", a: "Calls and WhatsApp messages are answered during working hours, usually within minutes. Enquiry form submissions are answered within a few hours." },
  { q: "Do you offer on-site service?", a: `Yes. We provide on-site support for CCTV installation, networking, office IT setup and AMC customers in and around ${SITE.city}.` },
  { q: "Can I get a quotation for bulk or business orders?", a: "Absolutely. Call our sales line or use the enquiry form with your requirements and we'll share a detailed quotation with GST invoice." },
  { q: "Do you deliver outside " + SITE.city + "?", a: `Yes, we deliver across India. Shipping is free on orders above ₹${SITE.freeShippingAbove.toLocaleString("en-IN")}.` },
  { q: "Is my data safe when I give my device for repair?", a: "We respect your privacy. Your data is never accessed beyond what the repair requires, and you can request a backup before any work begins." },
];

export default function ContactPage() {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;
  const cards = [
    { I: Phone, t: "Call Us", lines: [{ l: "Service", v: SITE.phone, href: telHref(SITE.phone) }, { l: "Sales", v: SITE.salesPhone, href: telHref(SITE.salesPhone) }] },
    { I: Mail, t: "Email & WhatsApp", lines: [{ v: SITE.email, href: `mailto:${SITE.email}` }, { l: "WhatsApp", v: SITE.whatsappDisplay, href: whatsappLink() }] },
    { I: MapPin, t: "Visit Store", lines: [{ v: SITE.address }] },
    { I: Clock, t: "Working Hours", lines: [{ v: SITE.hours }, { v: "WhatsApp support after hours" }] },
  ];
  return (
    <>
      <PageBanner title="Contact Us" subtitle="Questions, service bookings or bulk orders — we're happy to help." crumbs={[{ label: "Contact" }]} />

      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ I, t, lines }) => (
            <div key={t} className="card p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/10">
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white"><I className="size-6" /></span>
              <h3 className="mt-4 font-semibold">{t}</h3>
              {lines.map((x: { l?: string; v: string; href?: string }) => (
                <p key={x.v} className="mt-1 text-sm text-zinc-600">
                  {x.l && <span className="font-medium text-zinc-900">{x.l}: </span>}
                  {x.href ? <a href={x.href} target={x.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="hover:text-brand-600">{x.v}</a> : x.v}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 py-12 text-white sm:py-16">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow bg-white/15 text-white">Reach the Right Team</span>
            <h2 className="mt-3 text-[1.65rem] font-bold leading-tight sm:text-4xl">Talk directly to the team you need</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {DEPARTMENTS.map(({ I, t, d, v, href }) => (
              <a key={t} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/20">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-600"><I className="size-5" /></span>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-white/85">{d}</p>
                <p className="mt-4 font-display text-lg font-bold tracking-wide">{v}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <div className="card p-6 sm:p-8 lg:col-span-3">
            <h2 className="text-2xl font-bold">Send us an enquiry</h2>
            <p className="mt-1 text-sm text-zinc-500">Fill in the form and our team will get back to you within a few hours.</p>
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-zinc-200">
              <iframe
                title="Store location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
                className="h-72 w-full lg:h-80"
                loading="lazy"
              />
              <div className="flex items-center justify-between gap-3 border-t border-zinc-200 bg-brand-50/60 p-4">
                <p className="text-sm text-zinc-600"><span className="font-semibold text-zinc-900">Prakash Chowk,</span> {SITE.city}</p>
                <a href={directions} target="_blank" rel="noreferrer" className="btn-primary btn-sm shrink-0"><Navigation className="size-3.5" />Directions</a>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-6 text-white">
              <WhatsAppIcon className="size-10" />
              <h3 className="mt-3 text-xl font-bold">Prefer WhatsApp?</h3>
              <p className="mt-1 text-sm text-white/85">Get instant replies on product availability, prices and service bookings.</p>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn mt-5 bg-white text-[#128C7E] hover:bg-ink-900 hover:text-white">Start Chat</a>
            </div>
            <div className="card flex gap-4 p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Truck className="size-5" /></span>
              <div>
                <h3 className="font-semibold">Service area</h3>
                <p className="mt-1 text-sm text-zinc-600">On-site service in {SITE.city} and nearby areas. Online orders delivered across India.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-50/60 py-12 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <div className="mx-auto mt-8 max-w-3xl space-y-3 sm:mt-12">
            {FAQS.map((f) => (
              <details key={f.q} className="group card p-5 open:border-brand-200 open:shadow-md open:shadow-brand-600/5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="size-5 shrink-0 text-brand-600 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-zinc-600">
            Still have questions? <a href={telHref(SITE.phone)} className="font-semibold text-brand-600 hover:underline">Call {SITE.phone}</a> or <Link href="/services" className="font-semibold text-brand-600 hover:underline">browse our services</Link>
          </p>
        </div>
      </section>
    </>
  );
}
