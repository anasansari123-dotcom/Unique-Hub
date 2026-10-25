import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { SITE, telHref, whatsappLink } from "@/lib/config";
import { SERVICES } from "@/lib/data";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, XIcon, YoutubeIcon } from "@/components/ui/BrandIcons";

const QUICK_LINKS = [["Home", "/"], ["Shop", "/products"], ["Services", "/services"], ["About Us", "/about"], ["Contact Us", "/contact"], ["My Account", "/account"]];

export function Footer() {
  const socials = [
    { href: SITE.social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { href: SITE.social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: SITE.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
    { href: SITE.social.x, Icon: XIcon, label: "X" },
  ];
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink-900 text-sky-100/75">
      <div className="absolute -right-40 -top-40 size-96 rounded-full bg-brand-600/20 blur-3xl" />

      {/* Newsletter */}
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 py-8 sm:gap-6 sm:py-10 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-2xl">Get exclusive deals in your inbox</h3>
            <p className="mt-1 text-xs sm:text-sm">New arrivals, festive offers and tech tips — no spam, ever.</p>
          </div>
          <form className="flex w-full max-w-md gap-2">
            <input type="email" required placeholder="Enter your email" className="input min-w-0 border-white/10 bg-white/5 text-white placeholder:text-sky-100/50" />
            <button className="btn-primary shrink-0 px-4 sm:px-5" aria-label="Subscribe"><Send className="size-4" /><span className="hidden sm:inline">Subscribe</span></button>
          </form>
        </div>
      </div>

      <div className="container-x relative grid grid-cols-2 gap-x-6 gap-y-9 py-10 sm:py-14 lg:grid-cols-12 lg:gap-10">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Unique Hub 24" width={72} height={72} className="size-16 rounded-full bg-white p-0.5 ring-2 ring-brand-500/40 sm:size-[72px]" />
            <div>
              <p className="font-display text-lg font-extrabold text-white sm:text-xl">UNIQUE <span className="text-brand-500">HUB</span> 24</p>
              <p className="text-[10px] uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">{SITE.tagline}</p>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed sm:mt-5">
            A team of dedicated technology professionals who care about your computing needs — from new and refurbished systems to repairs, CCTV and complete IT support.
          </p>

          {/* Quick contact actions — handy on phones */}
          <div className="mt-5 grid grid-cols-3 gap-2 lg:hidden">
            <a href={telHref(SITE.phone)} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 py-3 text-xs font-semibold text-white ring-1 ring-white/10 active:bg-white/10">
              <Phone className="size-5 text-brand-500" />Call
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 py-3 text-xs font-semibold text-white ring-1 ring-white/10 active:bg-white/10">
              <WhatsAppIcon className="size-5 text-[#25D366]" />WhatsApp
            </a>
            <a href={directions} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 py-3 text-xs font-semibold text-white ring-1 ring-white/10 active:bg-white/10">
              <Navigation className="size-5 text-sky-400" />Directions
            </a>
          </div>

          <div className="mt-5 flex gap-2.5 sm:mt-6">
            {socials.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex size-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition hover:bg-brand-600 hover:text-white">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Links — side by side on phones */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white sm:text-base sm:normal-case sm:tracking-normal">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm sm:mt-4 sm:space-y-2.5">
            {QUICK_LINKS.map(([l, h]) => (
              <li key={h}><Link href={h} className="transition hover:text-brand-500">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white sm:text-base sm:normal-case sm:tracking-normal">Our Services</h4>
          <ul className="mt-3 space-y-2 text-sm sm:mt-4 sm:space-y-2.5">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.id}><Link href={`/services#${s.id}`} className="transition hover:text-brand-500">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white sm:text-base sm:normal-case sm:tracking-normal">Get in Touch</h4>
          <ul className="mt-3 space-y-3.5 rounded-2xl bg-white/[0.03] p-4 text-sm ring-1 ring-white/10 sm:mt-4 sm:space-y-4 lg:bg-transparent lg:p-0 lg:ring-0">
            <li><a href={directions} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white"><MapPin className="size-5 shrink-0 text-brand-500" />{SITE.address}</a></li>
            <li className="flex gap-3">
              <Phone className="size-5 shrink-0 text-brand-500" />
              <span>
                <a href={telHref(SITE.phone)} className="block hover:text-white">Service: <span className="text-zinc-200">{SITE.phone}</span></a>
                <a href={telHref(SITE.salesPhone)} className="block hover:text-white">Sales: <span className="text-zinc-200">{SITE.salesPhone}</span></a>
              </span>
            </li>
            <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white"><WhatsAppIcon className="size-5 shrink-0 text-brand-500" />{SITE.whatsappDisplay}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex gap-3 break-all hover:text-white"><Mail className="size-5 shrink-0 text-brand-500" />{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        {/* extra bottom padding on phones so the mobile nav & WhatsApp button don't cover content */}
        <div className="container-x flex flex-col items-center justify-between gap-3 pb-40 pt-5 text-center text-xs sm:flex-row sm:text-left lg:pb-5">
          <p>© {new Date().getFullYear()} Unique Hub 24 — a unit of {SITE.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {["UPI", "VISA", "MasterCard", "RuPay", "NetBanking"].map((m) => (
              <span key={m} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-zinc-300">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
