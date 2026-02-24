"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  type = "text",
  id,
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={resolvedType}
          className={[
            "w-full px-4 py-3 rounded-xl border text-neutral-700 text-sm placeholder:text-neutral-300 transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed",
            error
              ? "border-danger-500 bg-danger-50 focus:ring-danger-500"
              : "border-neutral-200 bg-white hover:border-neutral-300",
            isPassword ? "pr-12" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
        {error && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ExclamationCircleIcon className="w-5 h-5 text-danger-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-danger-600 flex items-center gap-1">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-neutral-400">{hint}</p>
      )}
    </div>
  );
}
