"use client";

import { UsersIcon, LinkIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useStats } from "@/hooks/useStats";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface Props {
  customerId: string;
  companyName: string;
  email: string;
}

export default function OverviewSection({ customerId, companyName, email }: Props) {
  const { stats } = useStats();
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Overview</h2>
        <p className="text-sm text-neutral-400 mt-1">Your company&apos;s AuthPlug account summary.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
            <UsersIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-black text-neutral-900">{stats ? stats.totalUsers : "—"}</p>
            <p className="text-sm text-neutral-400">Total users</p>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-black text-neutral-900">{stats ? stats.totalRedirectUrls : "—"}</p>
            <p className="text-sm text-neutral-400">Redirect URLs</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-card space-y-5">
        <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest">Company details</h3>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Company</span>
          <span className="text-base font-semibold text-neutral-800">{companyName}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Admin email</span>
          <span className="text-sm text-neutral-700">{email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Company ID</span>
          <div className="flex items-center gap-3">
            <code className="text-sm font-mono bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-700 break-all flex-1">
              {customerId}
            </code>
            <button
              onClick={() => copy(customerId)}
              className="flex-shrink-0 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-black transition-colors font-medium"
            >
              {copied ? <CheckIcon className="w-4 h-4 text-black" /> : <ClipboardDocumentIcon className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-1">Use this ID when integrating AuthPlug into your app.</p>
        </div>
      </div>
    </div>
  );
}
