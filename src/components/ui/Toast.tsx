"use client";

import { CheckCircle2, Info, XCircle, X } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type Kind = "success" | "error" | "info";
type ToastItem = { id: number; kind: Kind; title: string; message?: string };

const ToastContext = createContext<(kind: Kind, title: string, message?: string) => void>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((kind: Kind, title: string, message?: string) => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, kind, title, message }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), kind === "info" ? 9000 : 3500);
  }, []);

  const Icon = { success: CheckCircle2, error: XCircle, info: Info };

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6">
        {items.map((t) => {
          const I = Icon[t.kind];
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl shadow-black/10 print:hidden"
            >
              <I className={cn("mt-0.5 size-5 shrink-0", t.kind === "success" && "text-emerald-500", t.kind === "error" && "text-brand-600", t.kind === "info" && "text-sky-500")} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900">{t.title}</p>
                {t.message && <p className="mt-0.5 text-sm text-zinc-600">{t.message}</p>}
              </div>
              <button onClick={() => setItems((s) => s.filter((x) => x.id !== t.id))} className="text-zinc-400 hover:text-zinc-700" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
