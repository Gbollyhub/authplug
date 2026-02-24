"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import QRCode from "react-qr-code";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import StepIndicator from "@/components/auth/StepIndicator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

const STEPS = [{ label: "Details" }, { label: "Setup 2FA" }];

export default function RegisterForm() {
  const params = useSearchParams();
  const customerId = params.get("customerId") ?? "";
  const redirectUrl = params.get("redirectUrl") ?? "";

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [qrUri, setQrUri] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!customerId || !redirectUrl) {
    return (
      <AuthCard>
        <Alert
          type="error"
          message="Invalid registration link. Please return to the application and try again."
        />
      </AuthCard>
    );
  }

  async function handleDetails(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register-user", {
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
      setQrUri(data.data.qrUri);
      setStep(1);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/setup", {
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
        title="Create your account"
        subtitle="Set up your identity to access the application"
      />
      <StepIndicator steps={STEPS} current={step} />

      {error && <Alert type="error" message={error} className="mb-5" />}

      {/* Step 1 — Details */}
      <Transition
        show={step === 0}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <form onSubmit={handleDetails} className="flex flex-col gap-4">
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
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            hint="Use a strong password with letters, numbers and symbols"
            required
            minLength={8}
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(""); }}
            placeholder="••••••••"
            autoComplete="new-password"
            error={passwordError}
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
          Already have an account?{" "}
          <a
            href={`/login?customerId=${customerId}&redirectUrl=${encodeURIComponent(redirectUrl)}`}
            className="text-brand-600 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </Transition>

      {/* Step 2 — 2FA Setup */}
      <Transition
        show={step === 1}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <form onSubmit={handleSetup} className="flex flex-col gap-5">
          <div className="flex items-start gap-3 p-4 bg-brand-50 rounded-xl">
            <QrCodeIcon className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-brand-700">
                Scan with your authenticator app
              </p>
              <p className="text-xs text-brand-500 mt-0.5">
                Use Google Authenticator, Authy, or any TOTP app.
              </p>
            </div>
          </div>

          {qrUri && (
            <div className="flex items-center justify-center p-5 bg-white border border-neutral-200 rounded-xl">
              <QRCode value={qrUri} size={180} />
            </div>
          )}

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
            hint="Enter the 6-digit code shown in your authenticator app"
            className="font-mono text-center text-xl tracking-[0.5em]"
            required
          />

          <Button
            type="submit"
            fullWidth
            loading={loading}
            size="lg"
          >
            Complete setup
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
