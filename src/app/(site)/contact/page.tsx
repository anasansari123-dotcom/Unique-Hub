import { Suspense } from "react";
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageBanner } from "@/components/site/PageBanner";
import { ContactForm } from "@/components/site/ContactForm";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SITE, telHref, whatsappLink } from "@/lib/config";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  const cards = [
    { I: Phone, t: "Call Us", lines: [{ l: "Service", v: SITE.phone, href: telHref(SITE.phone) }, { l: "Sales", v: SITE.salesPhone, href: telHref(SITE.salesPhone) }] },
    { I: Mail, t: "Email & WhatsApp", lines: [{ v: SITE.email, href: `mailto:${SITE.email}` }, { l: "WhatsApp", v: SITE.whatsappDisplay, href: whatsappLink() }] },
    { I: MapPin, t: "Visit Store", lines: [{ v: SITE.address }] },
    { I: Clock, t: "Working Hours", lines: [{ v: SITE.hours }] },
  ];
  return (
    <>
      <PageBanner title="Contact Us" subtitle="Questions, service bookings or bulk orders — we're happy to help." crumbs={[{ label: "Contact" }]} />

      <section className="py-16">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ I, t, lines }) => (
            <div key={t} className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white"><I className="size-6" /></span>
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

      <section className="pb-20">
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
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-6 text-white">
              <WhatsAppIcon className="size-10" />
              <h3 className="mt-3 text-xl font-bold">Prefer WhatsApp?</h3>
              <p className="mt-1 text-sm text-white/85">Get instant replies on product availability, prices and service bookings.</p>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn mt-5 bg-white text-[#128C7E] hover:bg-ink-900 hover:text-white">Start Chat</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
