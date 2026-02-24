"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import StepIndicator from "@/components/auth/StepIndicator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

const STEPS = [{ label: "Credentials" }, { label: "Verify" }];

export default function LoginForm() {
  const params = useSearchParams();
  const customerId = params.get("customerId") ?? "";
  const redirectUrl = params.get("redirectUrl") ?? "";

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!customerId || !redirectUrl) {
    return (
      <AuthCard>
        <Alert
          type="error"
          message="Invalid login link. Please return to the application and try again."
        />
      </AuthCard>
    );
  }

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, email, password, redirectUrl }),
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
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempToken, totpCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      const { authId, redirectUrl: returnUrl } = data.data;
      window.location.href = `${returnUrl}?authId=${authId}`;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to continue to your account"
      />
      <StepIndicator steps={STEPS} current={step} />

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
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
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
          <Button
            type="submit"
            fullWidth
            loading={loading}
            size="lg"
            className="mt-2"
          >
            Continue
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don&apos;t have an account?{" "}
          <a
            href={`/register?customerId=${customerId}&redirectUrl=${encodeURIComponent(redirectUrl)}`}
            className="text-brand-600 font-medium hover:underline"
          >
            Register
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
        <form onSubmit={handleTotp} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl mb-1">
            <DevicePhoneMobileIcon className="w-5 h-5 text-brand-500 flex-shrink-0" />
            <p className="text-sm text-brand-700">
              Open your authenticator app and enter the 6-digit code.
            </p>
          </div>
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
          <Button
            type="submit"
            fullWidth
            loading={loading}
            size="lg"
            className="mt-2"
          >
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
