"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, sub, I, tone = "brand" }: { label: string; value: string; sub?: React.ReactNode; I: React.ComponentType<{ className?: string }>; tone?: "brand" | "dark" | "green" | "amber" }) {
  const tones = {
    brand: "bg-brand-50 text-brand-600",
    dark: "bg-zinc-900 text-white",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <div className="card min-w-0 p-3.5 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-zinc-500 sm:text-sm">{label}</p>
        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-10 sm:rounded-xl", tones[tone])}><I className="size-4 sm:size-5" /></span>
      </div>
      <p className="mt-1 truncate font-display text-lg font-bold text-zinc-900 sm:mt-2 sm:text-2xl">{value}</p>
      {sub && <div className="mt-1 text-[11px] text-zinc-500 sm:text-xs">{sub}</div>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      {(title || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3.5 sm:px-5 sm:py-4 [&_input]:max-sm:w-full [&>div]:max-sm:w-full">
          <h3 className="font-semibold text-zinc-900">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={cn("flex max-h-[92vh] w-full animate-fade-up flex-col rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl", wide ? "max-w-3xl" : "max-w-lg")}>
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="flex size-9 items-center justify-center rounded-full hover:bg-zinc-100" aria-label="Close"><X className="size-5" /></button>
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

/** Card list shown instead of a table on phones. Pair with `<Table className="hidden md:block">`. */
export function MobileList({ children, empty }: { children: React.ReactNode; empty?: boolean }) {
  return (
    <div className="divide-y divide-zinc-100 md:hidden">
      {children}
      {empty && <p className="py-14 text-center text-sm text-zinc-500">No records found.</p>}
    </div>
  );
}

export function Table({ head, children, empty, className }: { head: React.ReactNode[]; children: React.ReactNode; empty?: boolean; className?: string }) {
  return (
    <div className={cn("scroll-thin overflow-x-auto", className)}>
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {head.map((h, i) => <th key={i} className="whitespace-nowrap px-5 py-3">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">{children}</tbody>
      </table>
      {empty && <p className="py-14 text-center text-sm text-zinc-500">No records found.</p>}
    </div>
  );
}

export function Pills<T extends string>({ value, options, onChange }: { value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="scroll-thin flex gap-1 overflow-x-auto rounded-xl bg-zinc-100 p-1">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} className={cn("shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition", value === o ? "bg-white text-zinc-900 shadow" : "text-zinc-500 hover:text-zinc-900")}>
          {o}
        </button>
      ))}
    </div>
  );
}
