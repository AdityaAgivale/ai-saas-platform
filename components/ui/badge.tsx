import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "blue" | "purple" | "green" | "orange" | "pink" | "neutral";

const tones: Record<Tone, string> = {
  blue: "bg-accent-blue/10 text-accent-blue border-accent-blue/25",
  purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/25",
  green: "bg-accent-green/10 text-accent-green border-accent-green/25",
  orange: "bg-accent-orange/10 text-accent-orange border-accent-orange/25",
  pink: "bg-accent-pink/10 text-accent-pink border-accent-pink/25",
  neutral: "bg-surface-2 text-muted border-border",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "blue", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
