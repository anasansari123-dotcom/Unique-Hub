"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ArrowLeft, Mail, Printer } from "lucide-react";
import { useStore } from "@/lib/store";
import { Invoice } from "@/components/Invoice";
import { useToast } from "@/components/ui/Toast";

function InvoiceView() {
  const { id } = useParams<{ id: string }>();
  const autoPrint = useSearchParams().get("print");
  const { orders } = useStore();
  const toast = useToast();
  const order = orders.find((o) => o.id === id);

  useEffect(() => {
    if (order && autoPrint) setTimeout(() => window.print(), 400);
  }, [order, autoPrint]);

  if (!order) return <div className="card p-10 text-center">Invoice not found.</div>;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/admin/invoices" className="flex items-center gap-1 text-sm text-zinc-500 hover:text-brand-600"><ArrowLeft className="size-4" />All invoices</Link>
        <div className="flex gap-2">
          <button onClick={() => toast("success", "Invoice emailed", `Sent to ${order.customer.email || "customer"} (demo)`)} className="btn-outline"><Mail className="size-4" />Email</button>
          <button onClick={() => window.print()} className="btn-primary"><Printer className="size-4" />Print / Save PDF</button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl shadow-sm print:rounded-none print:shadow-none">
        <Invoice order={order} />
      </div>
    </div>
  );
}

export default function InvoicePage() {
  return <Suspense><InvoiceView /></Suspense>;
}
