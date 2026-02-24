import { Transition } from "@headlessui/react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 disabled:bg-neutral-200 disabled:text-neutral-400",
  secondary:
    "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 disabled:opacity-50",
  ghost:
    "bg-transparent text-brand-600 hover:bg-brand-50 active:bg-brand-100 disabled:opacity-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </span>
      )}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
}
