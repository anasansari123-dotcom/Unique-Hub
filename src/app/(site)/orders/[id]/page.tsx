"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, Circle, Download, PackageX, Printer } from "lucide-react";
import { useStore } from "@/lib/store";
import type { OrderStatus } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Invoice } from "@/components/Invoice";

const FLOW: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered"];

function OrderView() {
  const { id } = useParams<{ id: string }>();
  const placed = useSearchParams().get("placed");
  const { orders, ready } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!ready) return null;
  if (!order)
    return (
      <div className="container-x flex flex-col items-center py-28 text-center">
        <PackageX className="size-14 text-zinc-300" />
        <h1 className="mt-4 text-2xl font-bold">Order not found</h1>
        <Link href="/account" className="btn-primary mt-6">My Orders</Link>
      </div>
    );

  const step = FLOW.indexOf(order.status);

  return (
    <section className="bg-zinc-50 py-10 print:bg-white print:py-0">
      <div className="container-x print:max-w-none print:px-0">
        {placed && (
          <div className="mb-8 flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm print:hidden">
            <span className="flex size-20 items-center justify-center rounded-full bg-emerald-50"><CheckCircle2 className="size-11 text-emerald-500" /></span>
            <h1 className="mt-4 text-3xl font-bold">Thank you for your order!</h1>
            <p className="mt-1 text-zinc-500">Order <b className="text-zinc-900">#{order.id}</b> has been placed. A confirmation has been sent to {order.customer.email}.</p>
          </div>
        )}

        <div className="mb-6 card p-6 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-500">Order #{order.id} · {formatDate(order.createdAt, true)}</p>
              <h2 className="text-xl font-bold">Status: <span className={order.status === "Cancelled" ? "text-brand-600" : "text-emerald-600"}>{order.status}</span></h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => window.print()} className="btn-outline"><Printer className="size-4" />Print</button>
              <button onClick={() => window.print()} className="btn-dark"><Download className="size-4" />Download PDF</button>
            </div>
          </div>
          {order.status !== "Cancelled" && (
            <div className="mt-8 grid grid-cols-4">
              {FLOW.map((s, i) => (
                <div key={s} className="relative flex flex-col items-center text-center">
                  {i > 0 && <span className={cn("absolute right-1/2 top-3.5 h-0.5 w-full", i <= step ? "bg-emerald-500" : "bg-zinc-200")} />}
                  {i <= step ? <CheckCircle2 className="relative z-10 size-7 rounded-full bg-white text-emerald-500" /> : <Circle className="relative z-10 size-7 rounded-full bg-white text-zinc-300" />}
                  <span className={cn("mt-2 text-xs font-semibold sm:text-sm", i <= step ? "text-zinc-900" : "text-zinc-400")}>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl shadow-sm print:rounded-none print:shadow-none">
          <Invoice order={order} />
        </div>

        <div className="mt-8 flex justify-center gap-3 print:hidden">
          <Link href="/account" className="btn-outline">View All Orders</Link>
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderView />
    </Suspense>
  );
}
