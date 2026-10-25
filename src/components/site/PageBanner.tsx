import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageBanner({ title, subtitle, crumbs }: { title: string; subtitle?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.22),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(8,47,73,0.35),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="container-x relative py-9 sm:py-20">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-brand-100 sm:text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="font-semibold text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-2 text-[1.75rem] font-bold drop-shadow-sm leading-tight sm:mt-3 sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-white/90 sm:mt-3 sm:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-[1.65rem] font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-sm text-zinc-600 sm:text-base">{text}</p>}
    </div>
  );
}
