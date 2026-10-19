import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-sky-100 text-sky-700",
  Shipped: "bg-violet-100 text-violet-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-zinc-200 text-zinc-600",
  Paid: "bg-emerald-100 text-emerald-700",
  Failed: "bg-brand-100 text-brand-700",
  Refunded: "bg-zinc-200 text-zinc-600",
  Active: "bg-emerald-100 text-emerald-700",
  Hidden: "bg-zinc-200 text-zinc-600",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("badge gap-1.5", COLORS[status] ?? "bg-zinc-100 text-zinc-700", className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
