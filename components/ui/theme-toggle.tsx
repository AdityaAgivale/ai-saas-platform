"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe mount flag (next-themes docs pattern)
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("h-9 w-9 rounded-lg bg-surface-2", className)} />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2 text-foreground transition-colors hover:border-accent-blue/50 hover:text-accent-blue cursor-pointer",
        className
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
