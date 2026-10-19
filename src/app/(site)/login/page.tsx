import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginFlow } from "@/components/site/LoginFlow";

export const metadata: Metadata = { title: "Login / Register" };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginFlow />
    </Suspense>
  );
}
