import { UserPlus, FileEdit, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    icon: UserPlus,
    title: "Sign Up",
    desc: "Create your free account in less than a minute — no credit card needed.",
  },
  {
    icon: FileEdit,
    title: "Choose a Template",
    desc: "Select from 100+ templates or start with a blank canvas for full control.",
  },
  {
    icon: Rocket,
    title: "Generate & Publish",
    desc: "Let AI create content for you. Review, refine, and publish instantly.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="green">Process</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-muted">Get started in 3 simple steps.</p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px border-t border-dashed border-border sm:block" />
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-blue/40 bg-surface text-accent-blue">
                <step.icon size={22} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
