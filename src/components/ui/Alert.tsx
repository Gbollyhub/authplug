import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type AlertType = "error" | "success" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

const styles: Record<AlertType, { wrapper: string; icon: string }> = {
  error: {
    wrapper: "bg-danger-50 border border-danger-100 text-danger-700",
    icon: "text-danger-500",
  },
  success: {
    wrapper: "bg-neutral-50 border border-neutral-200 text-neutral-700",
    icon: "text-neutral-600",
  },
  info: {
    wrapper: "bg-neutral-50 border border-neutral-200 text-neutral-700",
    icon: "text-neutral-500",
  },
};

const icons: Record<AlertType, React.ElementType> = {
  error: ExclamationCircleIcon,
  success: CheckCircleIcon,
  info: InformationCircleIcon,
};

export default function Alert({ type, message, className = "" }: AlertProps) {
  const Icon = icons[type];
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm ${styles[type].wrapper} ${className}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles[type].icon}`} />
      <span>{message}</span>
    </div>
  );
}
