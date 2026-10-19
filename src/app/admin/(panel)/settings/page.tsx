"use client";

import { useState } from "react";
import { Database, KeyRound, RotateCcw, Save, Store } from "lucide-react";
import { SITE } from "@/lib/config";
import { useStore } from "@/lib/store";
import { Modal, Panel } from "@/components/admin/ui";
import { useToast } from "@/components/ui/Toast";

export default function SettingsPage() {
  const { resetDemo } = useStore();
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);
  const saved = (e: React.FormEvent) => {
    e.preventDefault();
    toast("success", "Settings saved", "These will be stored in the database once the backend is connected.");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Panel title={<span className="flex items-center gap-2"><Store className="size-4" />Business Profile</span>}>
        <form onSubmit={saved} className="grid gap-4 p-5 sm:grid-cols-2">
          <div><label className="label">Brand Name</label><input defaultValue={SITE.name} className="input" /></div>
          <div><label className="label">Legal / Firm Name</label><input defaultValue={SITE.legalName} className="input" /></div>
          <div><label className="label">Service Number</label><input defaultValue={SITE.phone} className="input" /></div>
          <div><label className="label">Sales Number</label><input defaultValue={SITE.salesPhone} className="input" /></div>
          <div><label className="label">WhatsApp Number</label><input defaultValue={SITE.whatsapp} className="input" /></div>
          <div><label className="label">Email</label><input defaultValue={SITE.email} className="input" /></div>
          <div><label className="label">GSTIN</label><input defaultValue={SITE.gstin} className="input" /></div>
          <div className="sm:col-span-2"><label className="label">Address</label><textarea rows={2} defaultValue={SITE.address} className="input resize-none" /></div>
          <div className="sm:col-span-2"><button className="btn-primary"><Save className="size-4" />Save Profile</button></div>
        </form>
      </Panel>

      <Panel title={<span className="flex items-center gap-2"><KeyRound className="size-4" />Payment Gateway</span>}>
        <form onSubmit={saved} className="grid gap-4 p-5">
          <div>
            <label className="label">Provider</label>
            <select className="input"><option>Razorpay</option><option>PhonePe PG</option><option>Cashfree</option><option>PayU</option><option>CCAvenue</option></select>
          </div>
          <div><label className="label">Key ID</label><input placeholder="rzp_test_xxxxxxxxxx" className="input font-mono" /></div>
          <div><label className="label">Key Secret</label><input type="password" placeholder="••••••••••••" className="input font-mono" /></div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="mode" defaultChecked className="accent-brand-600" />Test mode</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="mode" className="accent-brand-600" />Live mode</label>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="size-4 accent-brand-600" />Enable Cash on Delivery</label>
          <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">Secrets must be stored on the server only. This form is a UI placeholder for the backend integration.</p>
          <div><button className="btn-primary"><Save className="size-4" />Save Gateway</button></div>
        </form>
      </Panel>

      <Panel title={<span className="flex items-center gap-2"><Database className="size-4" />Store & Tax</span>}>
        <form onSubmit={saved} className="grid gap-4 p-5 sm:grid-cols-2">
          <div><label className="label">GST Rate (%)</label><input type="number" defaultValue={SITE.gstRate * 100} className="input" /></div>
          <div><label className="label">Invoice Prefix</label><input defaultValue="INV/26-27/" className="input" /></div>
          <div><label className="label">Free Shipping Above (₹)</label><input type="number" defaultValue={SITE.freeShippingAbove} className="input" /></div>
          <div><label className="label">Shipping Fee (₹)</label><input type="number" defaultValue={SITE.shippingFee} className="input" /></div>
          <div className="sm:col-span-2"><button className="btn-primary"><Save className="size-4" />Save</button></div>
        </form>
      </Panel>

      <Panel title={<span className="flex items-center gap-2"><RotateCcw className="size-4" />Demo Data</span>}>
        <div className="p-5">
          <p className="text-sm text-zinc-600">This frontend stores data in the browser (localStorage) as a stand-in for the MySQL database. Reset to restore the original sample products, orders and customers.</p>
          <button onClick={() => setConfirm(true)} className="btn-outline mt-4 border-brand-200 text-brand-600"><RotateCcw className="size-4" />Reset Demo Data</button>
        </div>
      </Panel>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Reset demo data?">
        <p className="text-sm text-zinc-600">All changes to products, orders, customers and enquiries will be lost.</p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => setConfirm(false)} className="btn-outline">Cancel</button>
          <button onClick={() => { resetDemo(); setConfirm(false); toast("success", "Demo data restored"); }} className="btn-primary">Reset</button>
        </div>
      </Modal>
    </div>
  );
}
