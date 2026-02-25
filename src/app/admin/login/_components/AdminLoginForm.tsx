"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import StepIndicator from "@/components/auth/StepIndicator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

const STEPS = [{ label: "Credentials" }, { label: "Verify 2FA" }];

export default function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const justRegistered = params.get("registered") === "true";

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, customerId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setTempToken(data.data.tempToken);
      setStep(1);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleTotp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempToken, totpCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      router.push("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Admin sign in"
        subtitle="Sign in to your AuthPlug dashboard"
      />
      <StepIndicator steps={STEPS} current={step} />

      {justRegistered && step === 0 && (
        <Alert
          type="success"
          message="Company registered successfully. Sign in to access your dashboard."
          className="mb-5"
        />
      )}

      {error && <Alert type="error" message={error} className="mb-5" />}

      {/* Step 1 — Credentials */}
      <Transition
        show={step === 0}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <form onSubmit={handleCredentials} className="flex flex-col gap-4">
          <Input
            label="Company ID"
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Your company ID from registration"
            hint="This was shown when you completed registration"
            required
          />
          <Input
            label="Admin email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
            Continue
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don&apos;t have an account?{" "}
          <a href="/admin/register" className="text-brand-600 font-medium hover:underline">
            Register your company
          </a>
        </p>
      </Transition>

      {/* Step 2 — TOTP */}
      <Transition
        show={step === 1}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <form onSubmit={handleTotp} className="flex flex-col gap-5">
          <p className="text-sm text-neutral-500 text-center">
            Open your authenticator app and enter the 6-digit code for AuthPlug.
          </p>

          <Input
            label="Authenticator code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={totpCode}
            onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            autoComplete="one-time-code"
            className="font-mono text-center text-xl tracking-[0.5em]"
            required
          />

          <Button type="submit" fullWidth loading={loading} size="lg">
            Sign in
          </Button>
        </form>

        <button
          type="button"
          onClick={() => { setStep(0); setError(""); setTotpCode(""); }}
          className="mt-5 flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mx-auto"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          Back
        </button>
      </Transition>
    </AuthCard>
  );
}
