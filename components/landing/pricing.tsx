"use client";

import { useSession } from "next-auth/react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, GlowCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For individuals trying out AI content creation.",
    features: [
      "5 AI generations / month",
      "Basic templates",
      "AI Chat Assistant",
      "1 brand voice",
      "Community support",
    ],
    cta: "Start for Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    desc: "For creators and growing teams who need more power.",
    features: [
      "Unlimited AI generations",
      "100+ premium templates",
      "AI Image Generation",
      "Unlimited brand voices",
      "Priority support",
      "Export & team sharing",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "For organizations that need scale, security, and control.",
    features: [
      "Everything in Pro",
      "SSO & advanced security",
      "Dedicated account manager",
      "Custom integrations",
      "SLA & uptime guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  const { status } = useSession();

  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="orange">Pricing</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-muted">Start free. Upgrade any time as your team grows.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const CardEl = plan.highlighted ? GlowCard : Card;
            const href =
              plan.name === "Enterprise"
                ? "/company#contact"
                : status === "authenticated"
                ? "/dashboard/settings"
                : "/signup";

            return (
              <CardEl
                key={plan.name}
                className={`relative p-8 ${
                  plan.highlighted ? "border-accent-purple/40 scale-[1.02]" : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-1 text-xs font-semibold text-white flex items-center gap-1">
                    <Sparkles size={11} /> Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.desc}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted">/ {plan.period}</span>
                </div>
                <Button
                  href={href}
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </Button>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className="mt-0.5 shrink-0 text-accent-green" />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardEl>
            );
          })}
        </div>
      </div>
    </section>
  );
}
