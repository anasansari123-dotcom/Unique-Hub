"use client";

import { useRef } from "react";

export function OtpInput({ value, onChange, length = 6 }: { value: string; onChange: (v: string) => void; length?: number }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const setAt = (i: number, d: string) => {
    const arr = digits.slice();
    arr[i] = d;
    onChange(arr.join("").slice(0, length));
  };

  return (
    <div className="flex justify-between gap-2" onPaste={(e) => {
      const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (txt) {
        e.preventDefault();
        onChange(txt);
        refs.current[Math.min(txt.length, length - 1)]?.focus();
      }
    }}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          value={d}
          inputMode="numeric"
          maxLength={1}
          autoFocus={i === 0}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(-1);
            setAt(i, v);
            if (v && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus();
          }}
          className="size-12 rounded-xl border border-zinc-300 text-center text-xl font-bold outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 sm:size-14"
        />
      ))}
    </div>
  );
}
