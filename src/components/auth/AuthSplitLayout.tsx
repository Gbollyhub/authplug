import { ShieldCheckIcon, UsersIcon, BoltIcon } from "@heroicons/react/24/outline";
import { Logo } from "@/components/ui/Logo";

interface Highlight {
  icon: React.ElementType;
  text: string;
}

interface Props {
  headline: string;
  subtext: string;
  children: React.ReactNode;
}

const highlights: Highlight[] = [
  { icon: ShieldCheckIcon, text: "Enterprise-grade security, self-hosted" },
  { icon: UsersIcon,       text: "Multi-tenant with role-based access" },
  { icon: BoltIcon,        text: "Redis-backed sessions, < 50ms tokens" },
];

export default function AuthSplitLayout({ headline, subtext, children }: Props) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — black panel */}
      <div className="hidden lg:flex flex-col bg-black px-14 py-12">
        <a href="/" className="mb-auto"><Logo size={26} inverted /></a>
        <div className="mb-auto">
          <h2 className="text-5xl font-black text-white tracking-tight leading-none mb-4">{headline}</h2>
          <p className="text-white/50 text-base leading-relaxed max-w-xs mb-10">{subtext}</p>
          <ul className="space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white/60" />
                </div>
                <span className="text-sm text-white/60">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-white/20 mt-auto">© 2026 AuthPlug. All rights reserved.</p>
      </div>

      {/* Right — form panel */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-white">
        <a href="/" className="mb-10 lg:hidden"><Logo size={26} /></a>
        {children}
      </div>
    </div>
  );
}
