import { Logo } from "@/components/ui/Logo";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <Logo size={28} />
      </div>
      <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-neutral-400">{subtitle}</p>}
    </div>
  );
}
