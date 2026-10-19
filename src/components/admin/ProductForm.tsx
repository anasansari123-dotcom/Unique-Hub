"use client";

import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { BRANDS, CATEGORIES } from "@/lib/data";
import type { Product } from "@/lib/types";
import { uid } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

export function ProductForm({ initial, onSave, onCancel }: { initial?: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [p, setP] = useState<Product>(
    initial ?? {
      id: uid("P"),
      name: "",
      category: CATEGORIES[0].name,
      brand: BRANDS[0],
      price: 0,
      mrp: 0,
      rating: 4.5,
      reviews: 0,
      stock: 10,
      image: "",
      short: "",
      description: "",
      specs: {},
      active: true,
      featured: false,
      createdAt: new Date().toISOString(),
    },
  );
  const [specs, setSpecs] = useState<[string, string][]>(Object.entries(initial?.specs ?? { Warranty: "1 Year" }));
  const [error, setError] = useState("");

  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((x) => ({ ...x, [k]: v }));

  const onFile = (f?: File) => {
    if (!f) return;
    if (f.size > 1_500_000) return setError("Image too large for demo storage (max 1.5MB).");
    const r = new FileReader();
    r.onload = () => set("image", String(r.result));
    r.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (p.price <= 0) return setError("Price must be greater than 0.");
    if (p.mrp < p.price) return setError("MRP cannot be lower than selling price.");
    onSave({ ...p, specs: Object.fromEntries(specs.filter(([k, v]) => k.trim() && v.trim())) });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
        <div>
          <label className="label">Image</label>
          <label className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-400 hover:border-brand-500">
            {p.image ? <SmartImage src={p.image} alt="" className="absolute inset-0 size-full" /> : <><Upload className="size-6" /><span className="mt-1 text-xs">Upload</span></>}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <input value={p.image.startsWith("data:") ? "" : p.image} onChange={(e) => set("image", e.target.value)} placeholder="or paste image URL" className="input mt-2 py-2 text-xs" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label">Product Name *</label><input required value={p.name} onChange={(e) => set("name", e.target.value)} className="input" /></div>
          <div>
            <label className="label">Category</label>
            <select value={p.category} onChange={(e) => set("category", e.target.value)} className="input">{CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}</select>
          </div>
          <div>
            <label className="label">Brand</label>
            <input list="brands" value={p.brand} onChange={(e) => set("brand", e.target.value)} className="input" />
            <datalist id="brands">{BRANDS.map((b) => <option key={b} value={b} />)}</datalist>
          </div>
          <div><label className="label">Selling Price (₹) *</label><input required type="number" min={0} value={p.price || ""} onChange={(e) => set("price", +e.target.value)} className="input" /></div>
          <div><label className="label">MRP (₹) *</label><input required type="number" min={0} value={p.mrp || ""} onChange={(e) => set("mrp", +e.target.value)} className="input" /></div>
          <div><label className="label">Stock Qty</label><input type="number" min={0} value={p.stock} onChange={(e) => set("stock", +e.target.value)} className="input" /></div>
          <div><label className="label">Badge</label><input value={p.badge ?? ""} onChange={(e) => set("badge", e.target.value || undefined)} placeholder="e.g. Bestseller" className="input" /></div>
        </div>
      </div>

      <div><label className="label">Short Highlights</label><input value={p.short} onChange={(e) => set("short", e.target.value)} placeholder="16GB RAM · 512GB SSD · …" className="input" /></div>
      <div><label className="label">Description</label><textarea rows={3} value={p.description} onChange={(e) => set("description", e.target.value)} className="input resize-none" /></div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="label mb-0">Specifications</label>
          <button type="button" onClick={() => setSpecs((s) => [...s, ["", ""]])} className="btn-ghost btn-sm"><Plus className="size-3.5" />Add row</button>
        </div>
        <div className="space-y-2">
          {specs.map(([k, v], i) => (
            <div key={i} className="flex gap-2">
              <input value={k} onChange={(e) => setSpecs((s) => s.map((r, j) => (j === i ? [e.target.value, r[1]] : r)))} placeholder="Label" className="input w-2/5 py-2" />
              <input value={v} onChange={(e) => setSpecs((s) => s.map((r, j) => (j === i ? [r[0], e.target.value] : r)))} placeholder="Value" className="input py-2" />
              <button type="button" onClick={() => setSpecs((s) => s.filter((_, j) => j !== i))} className="rounded-lg px-2 text-zinc-400 hover:text-brand-600" aria-label="Remove"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={p.active} onChange={(e) => set("active", e.target.checked)} className="size-4 accent-brand-600" />Visible on website</label>
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={!!p.featured} onChange={(e) => set("featured", e.target.checked)} className="size-4 accent-brand-600" />Featured on homepage</label>
      </div>

      {error && <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">{error}</p>}
      <div className="flex justify-end gap-2 border-t pt-5">
        <button type="button" onClick={onCancel} className="btn-outline">Cancel</button>
        <button className="btn-primary">{initial ? "Save Changes" : "Add Product"}</button>
      </div>
    </form>
  );
}
