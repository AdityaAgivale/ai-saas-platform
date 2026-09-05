import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Alert({
  variant = "error",
  children,
  className,
}: {
  variant?: "error" | "success";
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = variant === "error" ? AlertCircle : CheckCircle2;
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm",
        variant === "error"
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : "border-accent-green/30 bg-accent-green/10 text-accent-green",
        className
      )}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
