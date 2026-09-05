import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl",
        className
      )}
      {...props}
    />
  );
}

export function GlowCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-card glow-hover rounded-2xl",
        className
      )}
      {...props}
    />
  );
}
