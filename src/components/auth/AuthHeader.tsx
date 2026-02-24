import { ShieldCheckIcon } from "@heroicons/react/24/solid";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
          <ShieldCheckIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-base font-bold text-neutral-700 tracking-tight">
          AuthPlug
        </span>
      </div>
      <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 text-sm text-neutral-400">{subtitle}</p>
      )}
    </div>
  );
}
