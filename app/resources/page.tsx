import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MeshBackground } from "@/components/landing/mesh-background";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code2, LifeBuoy, Newspaper, ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    title: "5 ways AI is changing content marketing in 2026",
    tag: "Trends",
    read: "6 min read",
  },
  {
    title: "How to build a brand voice AI actually follows",
    tag: "Guide",
    read: "8 min read",
  },
  {
    title: "From prompt to publish: our content workflow",
    tag: "Workflow",
    read: "5 min read",
  },
];

const GUIDES = [
  { title: "Getting started with AI SaaS", desc: "Set up your account and generate your first document." },
  { title: "Mastering brand voice", desc: "Create voices that keep every output on-brand." },
  { title: "Templates 101", desc: "Pick the right template for every content type." },
];

const HELP_TOPICS = [
  { q: "How does the free plan work?", a: "5 AI generations per month across chat, content, and images — no credit card required." },
  { q: "Can I cancel anytime?", a: "Yes. Manage or cancel your subscription anytime from Settings." },
  { q: "Is my content private?", a: "Your documents and chats are tied to your account and never shared with other users." },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative overflow-hidden pb-16 pt-20 text-center">
          <MeshBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-2xl px-6">
            <Badge tone="purple">Resources</Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Guides, updates, and help
            </h1>
            <p className="mt-4 text-muted">Everything you need to get the most out of AI SaaS.</p>
          </div>
        </section>

        <section id="blog" className="scroll-mt-24 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Newspaper size={18} className="text-accent-blue" /> From the Blog
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <Card key={post.title} className="glow-hover p-5">
                  <Badge tone="blue">{post.tag}</Badge>
                  <h3 className="mt-3 text-sm font-semibold leading-snug">{post.title}</h3>
                  <p className="mt-3 text-xs text-muted">{post.read}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="guides" className="scroll-mt-24 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <BookOpen size={18} className="text-accent-purple" /> Guides
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {GUIDES.map((g) => (
                <Card key={g.title} className="glow-hover p-5">
                  <h3 className="text-sm font-semibold">{g.title}</h3>
                  <p className="mt-2 text-xs text-muted">{g.desc}</p>
                  <Link
                    href="/dashboard"
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
                  >
                    Try it in your dashboard <ArrowRight size={11} />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="help" className="scroll-mt-24 pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <LifeBuoy size={18} className="text-accent-green" /> Help Center
            </h2>
            <div className="mt-5 space-y-3">
              {HELP_TOPICS.map((h) => (
                <Card key={h.q} className="p-5">
                  <p className="text-sm font-semibold">{h.q}</p>
                  <p className="mt-1.5 text-sm text-muted">{h.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-24 pb-24">
          <div className="mx-auto max-w-4xl px-6">
            <Card className="glow-border p-8 text-center">
              <Code2 size={26} className="mx-auto text-accent-cyan" />
              <h2 className="mt-4 text-xl font-semibold">API access</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Programmatic API access is on our roadmap for Pro and Enterprise plans. Contact
                sales to join the early access list.
              </p>
              <Link
                href="/company#contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
              >
                Contact us <ArrowRight size={14} />
              </Link>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
