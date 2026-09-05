"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LayoutTemplate,
  FileText,
  ImageIcon,
  MessageSquare,
  Mic2,
  History,
  Star,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/images", label: "AI Images", icon: ImageIcon },
  { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquare },
  { href: "/dashboard/brand-voice", label: "Brand Voice", icon: Mic2 },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/favorites", label: "Favorites", icon: Star },
];

export function DashboardSidebar({
  plan,
  mobileOpen,
  onClose,
}: {
  plan: string;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const content = (
    <div className="flex h-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple">
            <Sparkles size={16} className="text-white" />
          </span>
          AI SaaS
        </Link>
        <button onClick={onClose} className="text-muted md:hidden" aria-label="Close sidebar">
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-foreground font-medium"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              )}
            >
              <item.icon size={16} className={active ? "text-accent-blue" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {plan === "free" && (
        <div className="mt-4 rounded-xl bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 p-4">
          <p className="text-sm font-semibold">Upgrade Plan</p>
          <p className="mt-1 text-xs text-muted">Unlock unlimited AI generations</p>
          <Button href="/dashboard/settings" size="sm" className="mt-3 w-full">
            Upgrade Now
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border md:block">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="glass absolute left-0 top-0 h-full w-72 border-r border-border">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
