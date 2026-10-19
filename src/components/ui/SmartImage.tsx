"use client";

import { ImageOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** <img> with a branded fallback when a remote image fails to load. */
export function SmartImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src)
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-400", className)}>
        <ImageOff className="size-8" />
      </div>
    );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={cn("object-cover", className)} />;
}
