import {
  CalendarClock, Cctv, Cpu, HardDriveDownload, Keyboard, Laptop, Monitor, MonitorCog, Network, Printer,
  RefreshCcw, Router, ShieldCheck, Tv, Wrench, type LucideIcon, Box,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  CalendarClock, Cctv, Cpu, HardDriveDownload, Keyboard, Laptop, Monitor, MonitorCog, Network, Printer,
  RefreshCcw, Router, ShieldCheck, Tv, Wrench,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const I = MAP[name] ?? Box;
  return <I className={className} />;
}
