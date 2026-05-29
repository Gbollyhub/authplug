"use client";

import { useState } from "react";
import { LinkIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRedirectUrls } from "@/hooks/useRedirectUrls";

export default function RedirectUrlsSection() {
  const { urls, loading, adding, deletingId, error, success, add, remove } = useRedirectUrls();
  const [newUrl, setNewUrl] = useState("");

  async function handleAdd(e: React.FormEvent) {
    const ok = await add(newUrl);
    if (ok) setNewUrl("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Redirect URLs</h2>
        <p className="text-sm text-neutral-400 mt-1">Only these origins are permitted as redirect destinations after authentication.</p>
      </div>

      {error   && <Alert type="error"   message={error} />}
      {success && <Alert type="success" message={success} />}

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-card">
        <p className="text-sm font-semibold text-neutral-700 mb-4">Add a new origin</p>
        <form onSubmit={handleAdd} className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              label=""
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://yourapp.com"
              hint="Only the origin (scheme + domain) is stored"
              required
            />
          </div>
          <Button type="submit" loading={adding} className="mb-6">
            <PlusIcon className="w-4 h-4 mr-1.5" />Add
          </Button>
        </form>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-neutral-400 text-sm">Loading…</div>
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
                    Added {new Date(u.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <button
                  onClick={() => remove(u.id)}
                  disabled={deletingId === u.id}
                  className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-black transition-colors disabled:opacity-40"
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
