import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:shadow-[0_10px_40px_-10px_var(--glow-purple)] hover:brightness-110",
  secondary:
    "bg-surface-2 text-foreground border border-border hover:border-accent-blue/50 hover:bg-surface",
  outline:
    "bg-transparent border border-border text-foreground hover:border-accent-blue/60 hover:text-accent-blue",
  ghost: "bg-transparent text-foreground hover:bg-surface-2",
  danger: "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-xl gap-2",
  lg: "text-base px-6 py-3.5 rounded-xl gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
