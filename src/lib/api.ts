/**
 * Mock API layer.
 * Every function here simulates a backend call so the frontend works standalone.
 * When the backend (Node/PHP + MySQL) is ready, replace the body of each function
 * with a real `fetch()` to the matching endpoint — the UI does not need to change.
 */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const OTP_KEY = "uh_otp";

export type OtpResult = { ok: true; demoCode: string } | { ok: false; error: string };

// POST /api/auth/send-otp  { email }
export async function sendEmailOtp(email: string): Promise<OtpResult> {
  await wait(900);
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  const code = String(Math.floor(100000 + Math.random() * 900000));
  sessionStorage.setItem(OTP_KEY, JSON.stringify({ email: email.toLowerCase(), code, exp: Date.now() + 5 * 60_000 }));
  return { ok: true, demoCode: code };
}

// POST /api/auth/verify-otp  { email, code }
export async function verifyEmailOtp(email: string, code: string): Promise<{ ok: boolean; error?: string }> {
  await wait(700);
  const raw = sessionStorage.getItem(OTP_KEY);
  if (!raw) return { ok: false, error: "OTP not requested. Please request a new code." };
  const saved = JSON.parse(raw) as { email: string; code: string; exp: number };
  if (saved.email !== email.toLowerCase()) return { ok: false, error: "OTP was sent to a different email." };
  if (Date.now() > saved.exp) return { ok: false, error: "OTP expired. Please resend." };
  if (saved.code !== code) return { ok: false, error: "Incorrect OTP. Please try again." };
  sessionStorage.removeItem(OTP_KEY);
  return { ok: true };
}

// POST /api/payments/create-order -> opens gateway checkout (Razorpay / PhonePe / Cashfree etc.)
export async function processPayment(amount: number, method: string): Promise<{ ok: boolean; ref?: string }> {
  await wait(1800);
  if (method === "COD") return { ok: true };
  return { ok: true, ref: "pay_" + Math.random().toString(36).slice(2, 12).toUpperCase() + String(amount).slice(-2) };
}

// POST /api/enquiries
export async function submitEnquiry(): Promise<{ ok: boolean }> {
  await wait(900);
  return { ok: true };
}
