import { CheckIcon } from "@heroicons/react/24/solid";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  current: number; // 0-indexed
}

export default function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, i) => {
        const isCompleted = i < current;
        const isActive = i === current;

        return (
          <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200",
                  isCompleted
                    ? "bg-brand-500 text-white"
                    : isActive
                    ? "bg-brand-500 text-white ring-4 ring-brand-100"
                    : "bg-neutral-100 text-neutral-400",
                ].join(" ")}
              >
                {isCompleted ? (
                  <CheckIcon className="w-3.5 h-3.5" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive ? "text-neutral-700" : "text-neutral-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px transition-all duration-300 ${
                  isCompleted ? "bg-brand-400" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
