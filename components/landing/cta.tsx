import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="glass-card glow-border relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, var(--glow-purple), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to supercharge your content?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Join thousands of creators and teams building faster with AI SaaS.
              Start free — no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/signup" size="lg">
                Get Started Free
                <ArrowRight size={16} />
              </Button>
              <Button href="/#pricing" variant="outline" size="lg">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
