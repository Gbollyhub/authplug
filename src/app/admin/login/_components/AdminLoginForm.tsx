"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import StepIndicator from "@/components/auth/StepIndicator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import { useAdminLogin } from "@/hooks/useAdminLogin";

const STEPS = [{ label: "Credentials" }, { label: "Verify 2FA" }];

export default function AdminLoginForm() {
  const params = useSearchParams();
  const justRegistered = params.get("registered") === "true";

  const {
    step, email, setEmail, password, setPassword,
    totpCode, setTotpCode, loading, error,
    submitCredentials, submitTotp, goBack,
  } = useAdminLogin();

  return (
    <AuthSplitLayout
      headline={"Welcome\nback."}
      subtext="Sign in to your AuthPlug dashboard to manage users, tokens, and integrations."
    >
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Admin sign in</h1>
          <p className="mt-1.5 text-sm text-neutral-400">Sign in to your AuthPlug dashboard</p>
        </div>

        <StepIndicator steps={STEPS} current={step} />

        {justRegistered && step === 0 && (
          <Alert type="success" message="Company registered successfully. Sign in to access your dashboard." className="mb-5" />
        )}
        {error && <Alert type="error" message={error} className="mb-5" />}

        {step === 0 && (
          <div>
            <form onSubmit={submitCredentials} className="flex flex-col gap-4">
              <Input label="Admin email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" required />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required />
              <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2 rounded-xl">Continue</Button>
            </form>
            <p className="mt-6 text-center text-sm text-neutral-400">
              Don&apos;t have an account?{" "}
              <a href="/admin/register" className="text-black font-medium hover:underline">Register your company</a>
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <form onSubmit={submitTotp} className="flex flex-col gap-5">
              <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl mb-1">
                <p className="text-sm text-neutral-600">Open your authenticator app and enter the 6-digit code for AuthPlug.</p>
              </div>
              <Input label="Authenticator code" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={totpCode} onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" autoComplete="one-time-code" className="font-mono text-center text-xl tracking-[0.5em]" required />
              <Button type="submit" fullWidth loading={loading} size="lg" className="rounded-xl">Sign in</Button>
            </form>
            <button type="button" onClick={goBack} className="mt-5 flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mx-auto">
              <ArrowLeftIcon className="w-3.5 h-3.5" />Back
            </button>
          </div>
        )}
      </div>
    </AuthSplitLayout>
  );
}
