import { useEffect, useState } from "react";

export interface RedirectUrl {
  id: string;
  origin: string;
  createdAt: string;
}

export function useRedirectUrls() {
  const [urls, setUrls] = useState<RedirectUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/redirect-urls");
      if (!res.ok) return;
      const data = await res.json();
      setUrls(data.data ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function add(url: string): Promise<boolean> {
    setError(""); setSuccess(""); setAdding(true);
    try {
      const res = await fetch("/api/admin/redirect-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to add URL."); return false; }
      setSuccess("Redirect URL added successfully.");
      await load();
      return true;
    } catch {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setAdding(false);
    }
  }

  async function remove(id: string) {
    setError(""); setSuccess(""); setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/redirect-urls?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to remove URL."); return; }
      setSuccess("Redirect URL removed.");
      await load();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return { urls, loading, adding, deletingId, error, success, add, remove };
}
