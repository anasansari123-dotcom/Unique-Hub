"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { submitEnquiry } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";

export function ContactForm() {
  const params = useSearchParams();
  const { addEnquiry, user } = useStore();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    service: params.get("service") ?? "General Enquiry",
    message: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(form.phone)) return toast("error", "Invalid phone number", "Enter a 10-digit mobile number.");
    setBusy(true);
    await submitEnquiry();
    addEnquiry(form);
    setBusy(false);
    setDone(true);
    toast("success", "Enquiry sent!", "Our team will contact you shortly.");
  };

  if (done)
    return (
      <div className="mt-8 flex flex-col items-center rounded-2xl bg-emerald-50 px-6 py-12 text-center">
        <CheckCircle2 className="size-14 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold">Thank you, {form.name.split(" ")[0]}!</h3>
        <p className="mt-1 text-zinc-600">We&apos;ve received your enquiry about <b>{form.service}</b> and will reach out soon.</p>
        <button onClick={() => { setDone(false); setForm((f) => ({ ...f, message: "" })); }} className="btn-outline mt-6">Send another</button>
      </div>
    );

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <label className="label">Full Name *</label>
        <input required value={form.name} onChange={set("name")} className="input" placeholder="Your name" />
      </div>
      <div>
        <label className="label">Phone *</label>
        <input required value={form.phone} onChange={set("phone")} className="input" placeholder="10-digit mobile" maxLength={10} inputMode="numeric" />
      </div>
      <div>
        <label className="label">Email *</label>
        <input required type="email" value={form.email} onChange={set("email")} className="input" placeholder="you@example.com" />
      </div>
      <div>
        <label className="label">Service / Topic</label>
        <select value={form.service} onChange={set("service")} className="input">
          <option>General Enquiry</option>
          <option>Product Purchase</option>
          <option>Bulk / Corporate Order</option>
          {SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="label">Message *</label>
        <textarea required rows={5} value={form.message} onChange={set("message")} className="input resize-none" placeholder="Tell us how we can help…" />
      </div>
      <div className="sm:col-span-2">
        <button disabled={busy} className="btn-primary w-full py-3 sm:w-auto sm:px-8">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {busy ? "Sending…" : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}
