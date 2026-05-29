"use client";

import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useChangePassword } from "@/hooks/useChangePassword";

export default function SettingsSection() {
  const {
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    passwordError, setPasswordError,
    loading, error, success,
    submit,
  } = useChangePassword();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Settings</h2>
        <p className="text-sm text-neutral-400 mt-1">Manage your admin account settings.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-card max-w-md">
        <p className="text-sm font-semibold text-neutral-700 mb-5 uppercase tracking-widest">Change password</p>

        {error   && <Alert type="error"   message={error}   className="mb-5" />}
        {success && <Alert type="success" message={success} className="mb-5" />}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input label="Current password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required />
          <Input label="New password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 8 characters" autoComplete="new-password" required minLength={8} />
          <Input label="Confirm new password" type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(""); }} placeholder="••••••••" autoComplete="new-password" error={passwordError} required />
          <Button type="submit" loading={loading} className="mt-2 self-start">Update password</Button>
        </form>
      </div>
    </div>
  );
}
