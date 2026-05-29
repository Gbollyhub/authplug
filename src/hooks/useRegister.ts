import { useState } from "react";

export function useRegister(customerId: string, redirectUrl: string) {
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

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setPasswordError("Passwords do not match."); return; }
    setPasswordError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, email, password, redirectUrl }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setTempToken(data.data.tempToken);
      setQrUri(data.data.qrUri);
      setStep(1);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function submitSetup(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempToken, totpCode }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      const { authId, redirectUrl: returnUrl } = data.data;
      window.location.href = `${returnUrl}?authId=${authId}`;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function goBack() {
    setStep(0); setError(""); setTotpCode("");
  }

  return {
    step,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    passwordError, setPasswordError,
    qrUri,
    totpCode, setTotpCode,
    loading, error,
    submitDetails, submitSetup, goBack,
  };
}
