"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Lock, Mail, MailCheck, ShieldCheck, Truck, User } from "lucide-react";
import { sendEmailOtp, verifyEmailOtp } from "@/lib/api";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { OtpInput } from "@/components/ui/OtpInput";
import { useToast } from "@/components/ui/Toast";

type Mode = "login" | "register";

export function LoginFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/account";
  const { loginCustomer, user, ready } = useStore();
  const toast = useToast();

  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<"details" | "otp" | "done">("details");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user && step === "details") router.replace(next);
  }, [ready, user, step, next, router]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    if (mode === "register" && !/^[6-9]\d{9}$/.test(form.phone)) return setError("Enter a valid 10-digit mobile number.");
    setBusy(true);
    const r = await sendEmailOtp(form.email);
    setBusy(false);
    if (!r.ok) return setError(r.error);
    setStep("otp");
    setOtp("");
    setTimer(30);
    // Demo only: in production the OTP is emailed and never shown in the UI.
    toast("info", `OTP sent to ${form.email}`, `Demo mode — your code is ${r.demoCode}`);
  };

  const verify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (otp.length !== 6) return setError("Enter the 6-digit code.");
    setError("");
    setBusy(true);
    const r = await verifyEmailOtp(form.email, otp);
    setBusy(false);
    if (!r.ok) return setError(r.error ?? "Verification failed.");
    loginCustomer({ email: form.email, name: form.name || undefined, phone: form.phone || undefined });
    setStep("done");
    toast("success", "Email verified", "Welcome to Unique Hub 24!");
    setTimeout(() => router.push(next), 1200);
  };

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-12 sm:py-20">
      <div className="absolute -left-40 top-0 size-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="container-x relative">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/5 lg:grid-cols-2">
          {/* Brand panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-900 p-10 text-white lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(14,165,233,0.45),transparent_55%)]" />
            <div className="relative">
              <Image src="/logo.png" alt="Unique Hub 24" width={80} height={80} className="size-20 rounded-full ring-4 ring-white/10" />
              <h2 className="mt-8 text-3xl font-bold leading-tight">Secure, password-free login with Email OTP</h2>
              <p className="mt-3 text-zinc-400">No passwords to remember. We send a one-time code to your email every time you sign in.</p>
            </div>
            <ul className="relative space-y-4 text-sm">
              {[
                { I: ShieldCheck, t: "Bank-grade secure verification" },
                { I: Truck, t: "Track orders & download invoices" },
                { I: Lock, t: "Your data stays private" },
              ].map(({ I, t }) => (
                <li key={t} className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-white/10"><I className="size-4 text-brand-500" /></span>{t}</li>
              ))}
            </ul>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-10">
            {step === "details" && (
              <>
                <div className="flex rounded-xl bg-zinc-100 p-1">
                  {(["login", "register"] as Mode[]).map((m) => (
                    <button key={m} onClick={() => { setMode(m); setError(""); }} className={cn("flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition", mode === m ? "bg-white text-zinc-900 shadow" : "text-zinc-500")}>
                      {m === "login" ? "Login" : "Register"}
                    </button>
                  ))}
                </div>
                <h1 className="mt-8 text-2xl font-bold">{mode === "login" ? "Welcome back 👋" : "Create your account"}</h1>
                <p className="mt-1 text-sm text-zinc-500">{mode === "login" ? "Enter your email to receive a login code." : "Register in seconds — verify with an email OTP."}</p>

                <form onSubmit={send} className="mt-6 space-y-4">
                  {mode === "register" && (
                    <>
                      <div>
                        <label className="label">Full Name</label>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input pl-10" placeholder="Your full name" />
                        </div>
                      </div>
                      <div>
                        <label className="label">Mobile Number</label>
                        <div className="flex">
                          <span className="flex items-center rounded-l-xl border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-sm text-zinc-600">+91</span>
                          <input required value={form.phone} maxLength={10} inputMode="numeric" onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} className="input rounded-l-none" placeholder="10-digit number" />
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <label className="label">Email Address</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input pl-10" placeholder="you@example.com" />
                    </div>
                  </div>
                  {error && <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">{error}</p>}
                  <button disabled={busy} className="btn-primary w-full py-3">
                    {busy && <Loader2 className="size-4 animate-spin" />}
                    {busy ? "Sending OTP…" : "Send OTP"}
                  </button>
                </form>
                <p className="mt-6 text-center text-xs text-zinc-500">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
              </>
            )}

            {step === "otp" && (
              <>
                <button onClick={() => setStep("details")} className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900"><ArrowLeft className="size-4" />Change email</button>
                <span className="mt-8 flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><MailCheck className="size-7" /></span>
                <h1 className="mt-5 text-2xl font-bold">Verify your email</h1>
                <p className="mt-1 text-sm text-zinc-500">We&apos;ve sent a 6-digit code to <b className="text-zinc-900">{form.email}</b>. It expires in 5 minutes.</p>
                <form onSubmit={verify} className="mt-8 space-y-5">
                  <OtpInput value={otp} onChange={setOtp} />
                  {error && <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">{error}</p>}
                  <button disabled={busy || otp.length !== 6} className="btn-primary w-full py-3">
                    {busy && <Loader2 className="size-4 animate-spin" />}
                    {busy ? "Verifying…" : "Verify & Continue"}
                  </button>
                </form>
                <p className="mt-6 text-center text-sm text-zinc-500">
                  Didn&apos;t get the code?{" "}
                  {timer > 0 ? <span>Resend in <b>{timer}s</b></span> : <button onClick={() => send()} className="font-semibold text-brand-600 hover:underline">Resend OTP</button>}
                </p>
              </>
            )}

            {step === "done" && (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="size-16 text-emerald-500" />
                <h1 className="mt-4 text-2xl font-bold">You&apos;re verified!</h1>
                <p className="mt-1 text-zinc-500">Redirecting…</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
