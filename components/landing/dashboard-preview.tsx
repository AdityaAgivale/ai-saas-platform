import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Mic2,
  Search,
  Sparkles,
  Mail,
  ShoppingBag,
  Share2,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Templates" },
  { icon: FileText, label: "Documents" },
  { icon: ImageIcon, label: "AI Images" },
  { icon: MessageSquare, label: "AI Chat" },
  { icon: Mic2, label: "Brand Voice" },
];

const STATS = [
  { label: "Documents Created", value: "23", tone: "text-accent-purple" },
  { label: "Images Generated", value: "12", tone: "text-accent-blue" },
  { label: "Words Generated", value: "8.4k", tone: "text-accent-cyan" },
  { label: "Success Rate", value: "98%", tone: "text-accent-green" },
];

const QUICK_ACTIONS = [
  { icon: FileText, label: "Blog Post", desc: "SEO-friendly posts", tone: "text-accent-blue" },
  { icon: Share2, label: "Social Media", desc: "Engaging content", tone: "text-accent-purple" },
  { icon: ShoppingBag, label: "Product Copy", desc: "Drive more sales", tone: "text-accent-pink" },
  { icon: Mail, label: "Email Copy", desc: "High-converting", tone: "text-accent-cyan" },
];

export function DashboardPreview() {
  return (
    <div className="glass-card glow-border relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_var(--glow-purple)]">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-52 shrink-0 flex-col border-r border-border p-4 sm:flex">
          <div className="mb-6 flex items-center gap-2 px-2 text-sm font-semibold">
            <Sparkles size={16} className="text-accent-blue" />
            AI SaaS
          </div>
          <div className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs ${
                  item.active
                    ? "bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-foreground"
                    : "text-muted"
                }`}
              >
                <item.icon size={13} />
                {item.label}
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-xl bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 p-3">
            <p className="text-xs font-semibold">Upgrade Plan</p>
            <p className="mt-0.5 text-[10px] text-muted">Unlock all features</p>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Dashboard</h3>
              <p className="text-xs text-muted">Welcome back! What will you create today?</p>
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted sm:flex">
              <Search size={12} />
              Search anything...
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-surface-2 p-3">
                <p className={`text-lg font-bold ${stat.tone}`}>{stat.value}</p>
                <p className="mt-0.5 text-[10px] text-muted leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs font-medium text-muted">Create New</p>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_ACTIONS.map((action) => (
              <div
                key={action.label}
                className="rounded-xl border border-border bg-surface-2 p-3 transition-colors hover:border-accent-blue/40"
              >
                <action.icon size={16} className={action.tone} />
                <p className="mt-2 text-xs font-semibold">{action.label}</p>
                <p className="mt-0.5 text-[10px] text-muted leading-tight">{action.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
