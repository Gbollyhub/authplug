"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import StepIndicator from "@/components/auth/StepIndicator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import { useLogin } from "@/hooks/useLogin";

const STEPS = [{ label: "Credentials" }, { label: "Verify" }];

export default function LoginForm() {
  const params = useSearchParams();
  const customerId = params.get("customerId") ?? "";
  const redirectUrl = params.get("redirectUrl") ?? "";

  const {
    step, email, setEmail, password, setPassword,
    totpCode, setTotpCode, loading, error,
    submitCredentials, submitTotp, goBack,
  } = useLogin(customerId, redirectUrl);

  if (!customerId || !redirectUrl) {
    return (
      <AuthCard>
        <Alert type="error" message="Invalid login link. Please return to the application and try again." />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader title="Welcome back" subtitle="Sign in to continue to your account" />
      <StepIndicator steps={STEPS} current={step} />

      {error && <Alert type="error" message={error} className="mb-5" />}

      {step === 0 && (
        <div>
          <form onSubmit={submitCredentials} className="flex flex-col gap-4">
            <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required />
            <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">Continue</Button>
          </form>
          <p className="mt-6 text-center text-sm text-neutral-400">
            Don&apos;t have an account?{" "}
            <a href={`/register?customerId=${customerId}&redirectUrl=${encodeURIComponent(redirectUrl)}`} className="text-black font-medium hover:underline">Register</a>
          </p>
        </div>
      )}

      {step === 1 && (
        <div>
          <form onSubmit={submitTotp} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-1">
              <DevicePhoneMobileIcon className="w-5 h-5 text-neutral-500 flex-shrink-0" />
              <p className="text-sm text-neutral-600">Open your authenticator app and enter the 6-digit code.</p>
            </div>
            <Input label="Authenticator code" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={totpCode} onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" autoComplete="one-time-code" className="font-mono text-center text-xl tracking-[0.5em]" required />
            <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">Sign in</Button>
          </form>
          <button type="button" onClick={goBack} className="mt-5 flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mx-auto">
            <ArrowLeftIcon className="w-3.5 h-3.5" />Back
          </button>
        </div>
      )}
    </AuthCard>
  );
}
