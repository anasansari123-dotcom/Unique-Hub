"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { ADMIN_DEMO } from "@/lib/config";
import { useStore } from "@/lib/store";

export default function AdminLogin() {
  const router = useRouter();
  const { admin, adminLogin, ready } = useStore();
  const [email, setEmail] = useState(ADMIN_DEMO.email);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && admin) router.replace("/admin");
  }, [ready, admin, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setTimeout(() => {
      if (email === ADMIN_DEMO.email && password === ADMIN_DEMO.password) {
        adminLogin();
        router.replace("/admin");
      } else {
        setError("Invalid email or password.");
        setBusy(false);
      }
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-900 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.35),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(14,165,233,0.2),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative w-full max-w-md animate-fade-up rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.png" alt="Unique Hub 24" width={84} height={84} className="size-21 rounded-full" priority />
          <h1 className="mt-4 text-2xl font-bold">ERP Admin Panel</h1>
          <p className="text-sm text-zinc-500">Sign in to manage your store</p>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-10" />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="input px-10" placeholder="••••••••" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700" aria-label="Toggle password">
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          {error && <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">{error}</p>}
          <button disabled={busy} className="btn-primary w-full py-3">{busy && <Loader2 className="size-4 animate-spin" />}Sign In</button>
        </form>
        <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-3 text-center text-xs text-zinc-600">
          Demo credentials: <b>{ADMIN_DEMO.email}</b> / <b>{ADMIN_DEMO.password}</b>
        </div>
        <Link href="/" className="mt-6 flex items-center justify-center gap-1 text-sm text-zinc-500 hover:text-brand-600"><ArrowLeft className="size-4" />Back to website</Link>
      </div>
    </div>
  );
}
