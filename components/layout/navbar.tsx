"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Sparkles, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn, initials } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-[0_1px_0_0_var(--border-color)]" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple">
            <Sparkles size={16} className="text-white" />
          </span>
          AI SaaS
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {status === "authenticated" ? (
            <>
              <Button href="/dashboard" variant="secondary" size="sm">
                <LayoutDashboard size={14} />
                Dashboard
              </Button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple text-xs font-semibold text-white cursor-pointer"
                title={session.user?.email ?? "Sign out"}
                aria-label="Sign out"
              >
                {initials(session.user?.name, session.user?.email)}
              </button>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">
                Log In
              </Button>
              <Button href="/signup" size="sm">
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <ThemeToggle />
              {status === "authenticated" ? (
                <div className="flex gap-2">
                  <Button href="/dashboard" variant="secondary" size="sm">
                    Dashboard
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut size={14} />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button href="/login" variant="ghost" size="sm">
                    Log In
                  </Button>
                  <Button href="/signup" size="sm">
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
