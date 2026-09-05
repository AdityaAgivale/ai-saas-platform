import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "We cut our content production time by 70%. The brand voice feature keeps everything on-message across the whole team.",
    name: "Maya Chen",
    role: "Head of Marketing, Vertex Labs",
  },
  {
    quote:
      "The AI chat assistant has basically replaced three tabs of research every time I write a post. It's become part of my daily workflow.",
    name: "Diego Ramirez",
    role: "Content Lead, Cascade",
  },
  {
    quote:
      "Templates plus AI generation means our small team ships like an agency five times our size. Genuinely changed how we work.",
    name: "Priya Nair",
    role: "Founder, Orbit Studio",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="pink">Testimonials</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by teams that create
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="p-6">
              <div className="flex gap-1 text-accent-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple text-xs font-semibold text-white">
                  {initials(t.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
