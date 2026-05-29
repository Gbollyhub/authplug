"use client";

import { useState } from "react";
import { useAdminMe } from "@/hooks/useAdminMe";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar, { type Section } from "./_components/DashboardSidebar";
import OverviewSection from "./_components/OverviewSection";
import UsersSection from "./_components/UsersSection";
import RedirectUrlsSection from "./_components/RedirectUrlsSection";
import ApiDocsSection from "./_components/ApiDocsSection";
import SettingsSection from "./_components/SettingsSection";

export default function DashboardPage() {
  const { admin, loggingOut, logout } = useAdminMe();
  const [active, setActive] = useState<Section>("overview");

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <DashboardHeader admin={admin} loggingOut={loggingOut} onLogout={logout} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar active={active} onSelect={setActive} />
        <main className="flex-1 overflow-y-auto p-8">
          {!admin ? (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm">Loading…</div>
          ) : (
            <>
              {active === "overview"      && <OverviewSection customerId={admin.customerId} companyName={admin.companyName} email={admin.email} />}
              {active === "users"         && <UsersSection />}
              {active === "redirect-urls" && <RedirectUrlsSection />}
              {active === "api-docs"      && <ApiDocsSection customerId={admin.customerId} />}
              {active === "settings"      && <SettingsSection />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
