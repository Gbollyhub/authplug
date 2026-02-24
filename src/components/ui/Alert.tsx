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
    wrapper: "bg-success-50 border border-green-100 text-success-600",
    icon: "text-success-500",
  },
  info: {
    wrapper: "bg-brand-50 border border-brand-100 text-brand-700",
    icon: "text-brand-500",
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
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm ${styles[type].wrapper} ${className}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles[type].icon}`} />
      <span>{message}</span>
    </div>
  );
}
