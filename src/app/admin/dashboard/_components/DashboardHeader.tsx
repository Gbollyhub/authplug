import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Logo } from "@/components/ui/Logo";
import type { AdminInfo } from "@/hooks/useAdminMe";

interface Props {
  admin: AdminInfo | null;
  loggingOut: boolean;
  onLogout: () => void;
}

export default function DashboardHeader({ admin, loggingOut, onLogout }: Props) {
  return (
    <header className="bg-white border-b border-neutral-200 px-6 h-14 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <Logo size={24} />
        {admin && (
          <span className="text-sm text-neutral-400 hidden sm:block border-l border-neutral-200 pl-3">
            {admin.companyName}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {admin && <span className="text-sm text-neutral-500 hidden sm:block">{admin.email}</span>}
        <button
          onClick={onLogout}
          disabled={loggingOut}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-black transition-colors disabled:opacity-50"
        >
          <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </header>
  );
}
