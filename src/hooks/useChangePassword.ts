import { useState } from "react";

export function useChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (newPassword !== confirmPassword) { setPasswordError("Passwords do not match."); return; }
    setPasswordError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to update password."); return; }
      setSuccess("Password updated successfully.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return {
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    passwordError, setPasswordError,
    loading, error, success,
    submit,
  };
}
