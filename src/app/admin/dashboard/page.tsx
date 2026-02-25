"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  LinkIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import OverviewSection from "./_components/OverviewSection";
import UsersSection from "./_components/UsersSection";
import RedirectUrlsSection from "./_components/RedirectUrlsSection";
import ApiDocsSection from "./_components/ApiDocsSection";
import SettingsSection from "./_components/SettingsSection";

type Section = "overview" | "users" | "redirect-urls" | "api-docs" | "settings";

interface AdminInfo {
  userId: string;
  email: string;
  customerId: string;
  companyName: string;
  role: string;
}

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: HomeIcon },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "redirect-urls", label: "Redirect URLs", icon: LinkIcon },
  { id: "api-docs", label: "API Docs", icon: DocumentTextIcon },
  { id: "settings", label: "Settings", icon: Cog6ToothIcon },
];

export default function DashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [active, setActive] = useState<Section>("overview");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => {
        if (r.status === 401) { router.push("/admin/login"); return null; }
        return r.json();
      })
      .then((d) => { if (d) setAdmin(d.data); });
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-neutral-200 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheckIcon className="w-7 h-7 text-brand-500" />
          <span className="font-bold text-neutral-800 text-lg">AuthPlug</span>
          {admin && (
            <span className="ml-2 text-sm text-neutral-400 hidden sm:block">
              — {admin.companyName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {admin && (
            <span className="text-sm text-neutral-500 hidden sm:block">{admin.email}</span>
          )}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-danger-600 transition-colors disabled:opacity-50"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-neutral-200 flex flex-col py-4 shrink-0">
          <nav className="flex-1 px-3 space-y-0.5">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active === id
                    ? "bg-brand-50 text-brand-700"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
                }`}
              >
                <Icon className="w-4.5 h-4.5 w-[18px] h-[18px] flex-shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {!admin ? (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
              Loading…
            </div>
          ) : (
            <>
              {active === "overview" && (
                <OverviewSection
                  customerId={admin.customerId}
                  companyName={admin.companyName}
                  email={admin.email}
                />
              )}
              {active === "users" && <UsersSection />}
              {active === "redirect-urls" && <RedirectUrlsSection />}
              {active === "api-docs" && <ApiDocsSection customerId={admin.customerId} />}
              {active === "settings" && <SettingsSection />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
