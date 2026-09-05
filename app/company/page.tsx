import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MeshBackground } from "@/components/landing/mesh-background";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Users, Globe2, Mail, MapPin } from "lucide-react";

const VALUES = [
  { title: "Ship fast, ship useful", desc: "We build tools we'd want to use ourselves — no fluff." },
  { title: "Creators first", desc: "Every feature starts with a real content workflow, not a demo." },
  { title: "Honest AI", desc: "We're upfront about what our AI can and can't do." },
];

const OPEN_ROLES = [
  { title: "Senior Frontend Engineer", location: "Remote" },
  { title: "Product Designer", location: "Remote" },
  { title: "AI/ML Engineer", location: "Remote" },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative overflow-hidden pb-16 pt-20 text-center">
          <MeshBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-2xl px-6">
            <Badge tone="green">Company</Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Helping teams create more, faster
            </h1>
            <p className="mt-4 text-muted">
              AI SaaS started with a simple idea: content creation shouldn&apos;t be the bottleneck
              between an idea and shipping it.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {VALUES.map((v) => (
                <Card key={v.title} className="p-6">
                  <Target size={18} className="text-accent-blue" />
                  <h3 className="mt-3 font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted">{v.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="careers" className="scroll-mt-24 pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Users size={18} className="text-accent-purple" /> Careers
            </h2>
            <p className="mt-2 text-sm text-muted">
              We&apos;re a small, remote-first team. Here&apos;s what we&apos;re currently hiring for.
            </p>
            <div className="mt-5 space-y-3">
              {OPEN_ROLES.map((role) => (
                <Card key={role.title} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">{role.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                      <Globe2 size={11} /> {role.location}
                    </p>
                  </div>
                  <Button href="/company#contact" variant="secondary" size="sm">
                    Apply
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <Card className="glow-border flex flex-col items-center gap-4 p-8 text-center">
              <Mail size={24} className="text-accent-cyan" />
              <h2 className="text-xl font-semibold">Get in touch</h2>
              <p className="max-w-md text-sm text-muted">
                Questions about sales, partnerships, or press? Reach out and we&apos;ll get back to
                you within 1-2 business days.
              </p>
              <Button href="mailto:hello@aisaas.app" size="lg">
                <Mail size={15} /> hello@aisaas.app
              </Button>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <MapPin size={11} /> Remote-first, worldwide
              </p>
            </Card>
          </div>
        </section>

        <section id="terms" className="scroll-mt-24 pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-xl font-semibold">Terms of Service</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                By creating an account and using AI SaaS, you agree to use the platform only for
                lawful purposes and in accordance with these terms. You retain ownership of the
                content you generate; we claim no rights over your outputs.
              </p>
              <p>
                Free-plan accounts are limited to 5 AI generations per period. Paid subscriptions
                renew automatically and can be canceled anytime from Settings — access continues
                until the end of the current billing period.
              </p>
              <p>
                We reserve the right to suspend accounts that abuse the service, attempt to
                circumvent usage limits, or generate content that violates applicable law.
              </p>
            </div>
          </div>
        </section>

        <section id="privacy" className="scroll-mt-24 pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                We collect the minimum data required to operate your account: your name, email,
                and the content you generate. Passwords are hashed and never stored in plain text.
              </p>
              <p>
                Your documents, chats, and brand voices are private to your account and are never
                sold or shared with third parties. Payment processing is handled securely by
                Stripe — we never see or store your card details.
              </p>
              <p>
                You can request deletion of your account and associated data at any time by
                contacting <Link href="mailto:hello@aisaas.app" className="text-accent-blue hover:underline">hello@aisaas.app</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
