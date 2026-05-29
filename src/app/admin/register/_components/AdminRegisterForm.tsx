"use client";

import { ArrowLeftIcon, QrCodeIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import QRCode from "react-qr-code";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import StepIndicator from "@/components/auth/StepIndicator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import { useAdminRegister } from "@/hooks/useAdminRegister";

const STEPS = [{ label: "Company details" }, { label: "Setup 2FA" }];

export default function AdminRegisterForm() {
  const {
    step,
    companyName, setCompanyName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    passwordError, setPasswordError,
    qrUri, totpCode, setTotpCode,
    loading, error,
    submitDetails, submitSetup, goBack,
  } = useAdminRegister();

  return (
    <AuthSplitLayout
      headline={"Auth,\nsolved."}
      subtext="Register your company and start integrating secure authentication in minutes."
    >
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Register your company</h1>
          <p className="mt-1.5 text-sm text-neutral-400">Create an AuthPlug account to manage your users</p>
        </div>

        <StepIndicator steps={STEPS} current={step} />

        {error && <Alert type="error" message={error} className="mb-5" />}

        {step === 0 && (
          <div>
            <form onSubmit={submitDetails} className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                <BuildingOfficeIcon className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                <p className="text-sm text-neutral-500">Your company ID is shown after registration — needed for SDK integration.</p>
              </div>
              <Input label="Company name" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Corp" autoComplete="organization" required />
              <Input label="Admin email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" required />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" autoComplete="new-password" hint="Use a strong password with letters, numbers and symbols" required minLength={8} />
              <Input label="Confirm password" type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(""); }} placeholder="••••••••" autoComplete="new-password" error={passwordError} required />
              <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2 rounded-xl">Continue</Button>
            </form>
            <p className="mt-6 text-center text-sm text-neutral-400">
              Already registered?{" "}
              <a href="/admin/login" className="text-black font-medium hover:underline">Sign in</a>
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <form onSubmit={submitSetup} className="flex flex-col gap-5">
              <div className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <QrCodeIcon className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-700">Scan with your authenticator app</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Use Google Authenticator, Authy, or any TOTP app.</p>
                </div>
              </div>
              {qrUri && (
                <div className="flex items-center justify-center p-5 bg-white border border-neutral-200 rounded-xl">
                  <QRCode value={qrUri} size={180} />
                </div>
              )}
              <Input label="Authenticator code" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={totpCode} onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" autoComplete="one-time-code" hint="Enter the 6-digit code shown in your authenticator app" className="font-mono text-center text-xl tracking-[0.5em]" required />
              <Button type="submit" fullWidth loading={loading} size="lg" className="rounded-xl">Complete registration</Button>
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
