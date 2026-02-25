"use client";

import { useEffect, useState } from "react";
import { UsersIcon, LinkIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

interface Props {
  customerId: string;
  companyName: string;
  email: string;
}

interface Stats {
  totalUsers: number;
  totalRedirectUrls: number;
}

export default function OverviewSection({ customerId, companyName, email }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d.data));
  }, []);

  function copyCustomerId() {
    navigator.clipboard.writeText(customerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-800">Overview</h2>
        <p className="text-sm text-neutral-400 mt-1">Your company&apos;s AuthPlug account summary.</p>
      </div>

      {/* Company info card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Company</span>
          <span className="text-lg font-semibold text-neutral-800">{companyName}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Admin email</span>
          <span className="text-sm text-neutral-700">{email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Company ID</span>
          <div className="flex items-center gap-3">
            <code className="text-sm font-mono bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-700 break-all">
              {customerId}
            </code>
            <button
              onClick={copyCustomerId}
              className="flex-shrink-0 flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 transition-colors"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-success-600" />
              ) : (
                <ClipboardDocumentIcon className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Use this ID when integrating AuthPlug into your app.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <UsersIcon className="w-5 h-5 text-brand-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-800">
              {stats ? stats.totalUsers : "—"}
            </p>
            <p className="text-sm text-neutral-400">Total users</p>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <LinkIcon className="w-5 h-5 text-brand-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-800">
              {stats ? stats.totalRedirectUrls : "—"}
            </p>
            <p className="text-sm text-neutral-400">Redirect URLs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
