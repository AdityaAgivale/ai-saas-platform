import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MeshBackground } from "./mesh-background";
import { DashboardPreview } from "./dashboard-preview";

const CHECKS = ["No credit card required", "7-day free trial", "Cancel anytime"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      <MeshBackground variant="hero" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="animate-fade-up flex justify-center">
          <Badge tone="purple">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple animate-pulse-soft" />
            The Future of Content is Here
          </Badge>
        </div>

        <h1
          className="animate-fade-up mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="text-gradient">AI SaaS</span> Platform
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted"
          style={{ animationDelay: "0.1s" }}
        >
          Create high-quality content in seconds with the power of advanced AI.
          Save time, boost productivity, and grow your business.
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.15s" }}
        >
          <Button href="/signup" size="lg">
            Get Started
            <ArrowRight size={16} />
          </Button>
          <Button href="/#how-it-works" variant="outline" size="lg">
            <PlayCircle size={16} />
            Try Live Demo
          </Button>
        </div>

        <div
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
          style={{ animationDelay: "0.2s" }}
        >
          {CHECKS.map((check) => (
            <span key={check} className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-accent-blue" />
              {check}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-16 px-4 sm:mt-20 sm:px-6">
        <DashboardPreview />
      </div>
    </section>
  );
}
