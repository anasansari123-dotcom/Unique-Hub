"use client";

import { Mail, MessageSquare, Phone } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn, formatDate } from "@/lib/utils";
import { Panel } from "@/components/admin/ui";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export default function EnquiriesPage() {
  const { enquiries, markEnquiryRead } = useStore();

  return (
    <Panel title={`Enquiries (${enquiries.length})`} action={<span className="text-sm text-zinc-500">{enquiries.filter((e) => !e.read).length} unread</span>}>
      {enquiries.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <MessageSquare className="size-12 text-zinc-300" />
          <p className="mt-4 font-semibold">No enquiries yet</p>
          <p className="mt-1 text-sm text-zinc-500">Messages submitted from the website&apos;s Contact page appear here.</p>
        </div>
      ) : (
        <div className="divide-y">
          {enquiries.map((e) => (
            <div key={e.id} onClick={() => markEnquiryRead(e.id)} className={cn("flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start", !e.read && "bg-brand-50/40")}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink-900 font-semibold text-white">{e.name[0]}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{e.name}</p>
                  <span className="badge bg-zinc-100 text-zinc-700">{e.service}</span>
                  {!e.read && <span className="badge bg-brand-600 text-white">New</span>}
                  <span className="ml-auto text-xs text-zinc-400">{formatDate(e.createdAt, true)}</span>
                </div>
                <p className="mt-1.5 text-sm text-zinc-700">{e.message}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={`tel:${e.phone}`} className="btn-outline btn-sm"><Phone className="size-3.5" />{e.phone}</a>
                  <a href={`mailto:${e.email}`} className="btn-outline btn-sm"><Mail className="size-3.5" />{e.email}</a>
                  <a href={`https://wa.me/91${e.phone}?text=${encodeURIComponent(`Hi ${e.name}, thanks for contacting Unique Hub 24 regarding ${e.service}.`)}`} target="_blank" rel="noreferrer" className="btn btn-sm bg-[#25D366] text-white"><WhatsAppIcon className="size-3.5" />Reply</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
