import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AdminInfo {
  userId: string;
  email: string;
  customerId: string;
  companyName: string;
  role: string;
}

export function useAdminMe() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => {
        if (r.status === 401) { router.push("/admin/login"); return null; }
        return r.json();
      })
      .then((d) => { if (d) setAdmin(d.data); });
  }, [router]);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return { admin, loggingOut, logout };
}
