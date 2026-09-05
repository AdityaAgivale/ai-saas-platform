import Link from "next/link";
import { Sparkles, Globe, MessageCircle, Rss } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Pricing", href: "/#pricing" },
    { label: "AI Chat Assistant", href: "/dashboard/chat" },
    { label: "AI Image Generator", href: "/dashboard/images" },
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Careers", href: "/company#careers" },
    { label: "Contact", href: "/company#contact" },
  ],
  Resources: [
    { label: "Blog", href: "/resources#blog" },
    { label: "Guides", href: "/resources#guides" },
    { label: "Help Center", href: "/resources#help" },
    { label: "API Docs", href: "/resources#api" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/company#privacy" },
    { label: "Terms of Service", href: "/company#terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple">
                <Sparkles size={16} className="text-white" />
              </span>
              AI SaaS
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              The all-in-one AI platform for content, images, and chat — built for
              teams that move fast.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, MessageCircle, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
                  aria-label="Social link"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} AI SaaS. All rights reserved.</p>
          <p>Built with Next.js, Prisma & Gemini AI.</p>
        </div>
      </div>
    </footer>
  );
}
