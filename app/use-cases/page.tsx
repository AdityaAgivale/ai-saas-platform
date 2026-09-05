import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MeshBackground } from "@/components/landing/mesh-background";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Megaphone,
  Building2,
  ShoppingCart,
  Rocket,
  GraduationCap,
  Newspaper,
  ArrowRight,
  Check,
} from "lucide-react";

const USE_CASES = [
  {
    icon: Megaphone,
    tone: "text-accent-blue",
    title: "Marketing Teams",
    desc: "Plan campaigns, write copy, and keep every channel on-brand without the bottleneck.",
    points: ["Campaign copy in minutes", "Consistent brand voice", "Social + email in one place"],
  },
  {
    icon: Building2,
    tone: "text-accent-purple",
    title: "Agencies",
    desc: "Serve more clients without growing headcount — templates and brand voices per account.",
    points: ["Multi-brand voice profiles", "Faster client turnaround", "Reusable templates"],
  },
  {
    icon: ShoppingCart,
    tone: "text-accent-pink",
    title: "E-commerce",
    desc: "Generate product descriptions and promo emails at catalog scale.",
    points: ["Bulk product copy", "Promo email sequences", "SEO-ready listings"],
  },
  {
    icon: Rocket,
    tone: "text-accent-cyan",
    title: "Startups",
    desc: "Ship landing pages, launch posts, and investor updates without a full content team.",
    points: ["Launch announcements", "Press releases", "Landing page copy"],
  },
  {
    icon: GraduationCap,
    tone: "text-accent-green",
    title: "Educators & Creators",
    desc: "Draft lesson content, newsletters, and social posts faster.",
    points: ["Newsletter drafts", "Course outlines", "Social content calendars"],
  },
  {
    icon: Newspaper,
    tone: "text-accent-orange",
    title: "PR & Communications",
    desc: "Turn announcements into polished press releases and media copy in seconds.",
    points: ["Press releases", "Media statements", "Crisis-ready templates"],
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative overflow-hidden pb-16 pt-20 text-center">
          <MeshBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-2xl px-6">
            <Badge tone="blue">Use Cases</Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Built for every team that creates
            </h1>
            <p className="mt-4 text-muted">
              From solo founders to full marketing departments — see how teams use AI SaaS to move
              faster.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.map((uc) => (
                <Card key={uc.title} className="glow-hover p-6">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 ${uc.tone}`}>
                    <uc.icon size={20} />
                  </div>
                  <h3 className="mt-4 font-semibold">{uc.title}</h3>
                  <p className="mt-2 text-sm text-muted">{uc.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {uc.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-muted">
                        <Check size={12} className="text-accent-green" /> {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <h2 className="text-2xl font-bold">Don&apos;t see your use case?</h2>
              <p className="max-w-md text-sm text-muted">
                AI SaaS adapts to any content workflow. Start free and see what fits your team.
              </p>
              <Button href="/signup" size="lg">
                Get Started Free <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
