"use client";

import { useEffect, useState } from "react";
import { LinkIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface RedirectUrl {
  id: string;
  origin: string;
  createdAt: string;
}

export default function RedirectUrlsSection() {
  const [urls, setUrls] = useState<RedirectUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadUrls();
  }, []);

  async function loadUrls() {
    setLoading(true);
    const res = await fetch("/api/admin/redirect-urls");
    const data = await res.json();
    setUrls(data.data ?? []);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setAdding(true);
    try {
      const res = await fetch("/api/admin/redirect-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to add URL.");
        return;
      }
      setNewUrl("");
      setSuccess("Redirect URL added successfully.");
      await loadUrls();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    setError("");
    setSuccess("");
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/redirect-urls?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to remove URL.");
        return;
      }
      setSuccess("Redirect URL removed.");
      await loadUrls();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-800">Redirect URLs</h2>
        <p className="text-sm text-neutral-400 mt-1">
          Only these origins are permitted as redirect destinations after authentication.
        </p>
      </div>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      {/* Add URL form */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-card">
        <p className="text-sm font-medium text-neutral-700 mb-4">Add a new origin</p>
        <form onSubmit={handleAdd} className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              label=""
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://yourapp.com"
              hint="Only the origin (scheme + domain) is stored, e.g. https://yourapp.com"
              required
            />
          </div>
          <Button type="submit" loading={adding} className="mb-6">
            <PlusIcon className="w-4 h-4 mr-1.5" />
            Add
          </Button>
        </form>
      </div>

      {/* URL list */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-neutral-400 text-sm">
            Loading…
          </div>
        ) : urls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-neutral-400">
            <LinkIcon className="w-8 h-8" />
            <p className="text-sm">No redirect URLs registered yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {urls.map((u) => (
              <li key={u.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700">{u.origin}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Added{" "}
                    {new Date(u.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(u.id)}
                  disabled={deletingId === u.id}
                  className="flex items-center gap-1.5 text-sm text-danger-500 hover:text-danger-700 transition-colors disabled:opacity-40"
                >
                  <TrashIcon className="w-4 h-4" />
                  {deletingId === u.id ? "Removing…" : "Remove"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
