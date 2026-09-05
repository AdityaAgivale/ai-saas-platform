"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Menu, Settings, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";

export function DashboardTopbar({
  name,
  email,
  plan,
  usageCount,
  onMenuClick,
}: {
  name?: string | null;
  email?: string | null;
  plan: string;
  usageCount: number;
  onMenuClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="glass sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={16} />
        </button>
        <Badge tone={plan === "free" ? "neutral" : "purple"} className="hidden sm:inline-flex">
          {plan === "free" ? `${usageCount}/5 free generations` : "Pro plan"}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-2 py-1.5 pr-3 text-sm cursor-pointer"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple text-xs font-semibold text-white">
              {initials(name, email)}
            </span>
            <span className="hidden max-w-[120px] truncate sm:inline">{name || email}</span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          {open && (
            <div className="glass-card absolute right-0 mt-2 w-56 rounded-xl p-1.5 shadow-xl">
              <div className="border-b border-border px-3 py-2">
                <p className="truncate text-sm font-medium">{name || "Your account"}</p>
                <p className="truncate text-xs text-muted">{email}</p>
              </div>
              <Link
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
              >
                <UserIcon size={15} /> Profile
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
              >
                <Settings size={15} /> Settings
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
