import { HomeIcon, UsersIcon, LinkIcon, DocumentTextIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export type Section = "overview" | "users" | "redirect-urls" | "api-docs" | "settings";

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview",      label: "Overview",     icon: HomeIcon },
  { id: "users",         label: "Users",        icon: UsersIcon },
  { id: "redirect-urls", label: "Redirect URLs", icon: LinkIcon },
  { id: "api-docs",      label: "API Docs",     icon: DocumentTextIcon },
  { id: "settings",      label: "Settings",     icon: Cog6ToothIcon },
];

interface Props {
  active: Section;
  onSelect: (section: Section) => void;
}

export default function DashboardSidebar({ active, onSelect }: Props) {
  return (
    <aside className="w-52 bg-white border-r border-neutral-200 flex flex-col py-4 shrink-0">
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === id
                ? "bg-black text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
            }`}
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
