import {
  Sparkles,
  LayoutTemplate,
  ImageIcon,
  MessageCircle,
  Mic2,
  Users,
} from "lucide-react";
import { GlowCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Content Generation",
    desc: "Generate high-quality content in seconds for blogs, ads, emails, and more.",
    tone: "text-accent-purple",
    bg: "from-accent-purple/15 to-accent-purple/5",
  },
  {
    icon: LayoutTemplate,
    title: "Smart Templates",
    desc: "Choose from 100+ templates designed for conversions and engagement.",
    tone: "text-accent-blue",
    bg: "from-accent-blue/15 to-accent-blue/5",
  },
  {
    icon: ImageIcon,
    title: "AI Image Generation",
    desc: "Create stunning, unique images with the power of generative AI models.",
    tone: "text-accent-green",
    bg: "from-accent-green/15 to-accent-green/5",
  },
  {
    icon: MessageCircle,
    title: "AI Chat Assistant",
    desc: "Get instant answers, brainstorm ideas, and improve your writing.",
    tone: "text-accent-orange",
    bg: "from-accent-orange/15 to-accent-orange/5",
  },
  {
    icon: Mic2,
    title: "Brand Voice",
    desc: "Create and manage your brand voice for consistent content everywhere.",
    tone: "text-accent-pink",
    bg: "from-accent-pink/15 to-accent-pink/5",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Collaborate with your team in real-time and manage projects together.",
    tone: "text-accent-cyan",
    bg: "from-accent-cyan/15 to-accent-cyan/5",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="blue">Features</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features to Supercharge Your Workflow
          </h2>
          <p className="mt-4 text-muted">
            Everything you need to create amazing content with AI, all in one platform.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <GlowCard key={feature.title} className="p-6">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.bg}`}
              >
                <feature.icon size={20} className={feature.tone} />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.desc}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
