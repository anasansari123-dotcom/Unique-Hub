"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/data";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { MobileList, Modal, Panel, Table } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/ProductForm";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/components/ui/Toast";

function ProductsAdmin() {
  const { products, saveProduct, deleteProduct } = useStore();
  const toast = useToast();
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [editing, setEditing] = useState<Product | null | "new">(null);
  const [confirm, setConfirm] = useState<Product | null>(null);

  useEffect(() => {
    if (params.get("new")) setEditing("new");
    const id = params.get("edit");
    if (id) setEditing(products.find((p) => p.id === id) ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const close = () => {
    setEditing(null);
    if (params.toString()) router.replace("/admin/products");
  };

  const list = useMemo(
    () => products.filter((p) => (cat === "All" || p.category === cat) && `${p.name} ${p.id} ${p.brand}`.toLowerCase().includes(q.toLowerCase())),
    [products, q, cat],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {[
          ["Total Products", products.length],
          ["Active", products.filter((p) => p.active).length],
          ["Low Stock (<8)", products.filter((p) => p.stock > 0 && p.stock < 8).length],
          ["Out of Stock", products.filter((p) => p.stock === 0).length],
        ].map(([l, v]) => (
          <div key={l} className="card p-3.5 sm:p-4"><p className="text-xs text-zinc-500 sm:text-sm">{l}</p><p className="mt-1 font-display text-xl font-bold sm:text-2xl">{v}</p></div>
        ))}
      </div>

      <Panel
        title="Product Catalogue"
        action={
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="input w-full py-2 pl-9 sm:w-48" />
            </div>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="input w-auto py-2">
              <option>All</option>
              {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
            <button onClick={() => setEditing("new")} className="btn-primary"><Plus className="size-4" />Add Product</button>
          </div>
        }
      >
        <MobileList empty={!list.length}>
          {list.map((p) => (
            <div key={p.id} className="flex gap-3 px-4 py-3">
              <SmartImage src={p.image} alt="" className="size-16 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium leading-snug">{p.name}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{p.id} · {p.category}</p>
                <div className="mt-1.5 flex items-center gap-2 text-sm">
                  <span className="font-semibold">{formatINR(p.price)}</span>
                  <span className={p.stock === 0 ? "text-xs font-semibold text-brand-600" : p.stock < 8 ? "text-xs font-semibold text-amber-600" : "text-xs text-zinc-500"}>Stock {p.stock}</span>
                  {!p.active && <StatusBadge status="Hidden" />}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => setEditing(p)} className="rounded-lg border border-zinc-200 p-2 text-zinc-600" aria-label="Edit"><Pencil className="size-4" /></button>
                <button onClick={() => setConfirm(p)} className="rounded-lg border border-zinc-200 p-2 text-zinc-600" aria-label="Delete"><Trash2 className="size-4" /></button>
              </div>
            </div>
          ))}
        </MobileList>
        <Table className="hidden md:block" head={["Product", "Category", "Price", "Stock", "Status", "Actions"]} empty={!list.length}>
          {list.map((p) => (
            <tr key={p.id} className="hover:bg-zinc-50">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <SmartImage src={p.image} alt="" className="size-12 shrink-0 rounded-lg" />
                  <div className="min-w-0">
                    <p className="max-w-xs truncate font-medium">{p.name}</p>
                    <p className="text-xs text-zinc-500">{p.id} · {p.brand}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-zinc-600">{p.category}</td>
              <td className="px-5 py-3"><p className="font-semibold">{formatINR(p.price)}</p><p className="text-xs text-zinc-400 line-through">{formatINR(p.mrp)}</p></td>
              <td className="px-5 py-3">
                <span className={p.stock === 0 ? "font-semibold text-brand-600" : p.stock < 8 ? "font-semibold text-amber-600" : "font-semibold"}>{p.stock}</span>
              </td>
              <td className="px-5 py-3"><StatusBadge status={p.active ? "Active" : "Hidden"} /></td>
              <td className="px-5 py-3">
                <div className="flex gap-1">
                  <button onClick={() => setEditing(p)} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900" title="Edit"><Pencil className="size-4" /></button>
                  <button onClick={() => { saveProduct({ ...p, active: !p.active }); toast("success", p.active ? "Product hidden from website" : "Product published"); }} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900" title={p.active ? "Hide" : "Publish"}>
                    {p.active ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                  <button onClick={() => setConfirm(p)} className="rounded-lg p-2 text-zinc-500 hover:bg-brand-50 hover:text-brand-600" title="Delete"><Trash2 className="size-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>

      <Modal open={editing !== null} onClose={close} title={editing === "new" ? "Add New Product" : "Edit Product"} wide>
        {editing !== null && (
          <ProductForm
            initial={editing === "new" ? undefined : editing}
            onCancel={close}
            onSave={(p) => {
              saveProduct(p);
              toast("success", editing === "new" ? "Product added" : "Product updated", p.name);
              close();
            }}
          />
        )}
      </Modal>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Delete product?">
        <p className="text-sm text-zinc-600">This will permanently remove <b>{confirm?.name}</b> from the catalogue.</p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => setConfirm(null)} className="btn-outline">Cancel</button>
          <button onClick={() => { deleteProduct(confirm!.id); toast("success", "Product deleted"); setConfirm(null); }} className="btn-primary">Delete</button>
        </div>
      </Modal>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense><ProductsAdmin /></Suspense>;
}
