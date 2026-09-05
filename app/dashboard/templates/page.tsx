"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates";
import { getContentType } from "@/lib/content-types";

export default function TemplatesPage() {
  const [category, setCategory] = useState<(typeof TEMPLATE_CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery =
        !query ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold">Templates</h1>
      <p className="mt-1 text-sm text-muted">
        Choose from {TEMPLATES.length}+ templates designed for conversions and engagement.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                category === cat
                  ? "border-accent-blue/50 bg-accent-blue/10 text-accent-blue"
                  : "border-border text-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search templates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => {
          const contentType = getContentType(template.type);
          return (
            <Card key={template.id} className="glow-hover flex flex-col p-5">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2",
                    contentType.tone
                  )}
                >
                  <contentType.icon size={18} />
                </div>
                <Badge tone="neutral">{template.category}</Badge>
              </div>
              <h3 className="mt-4 font-semibold">{template.title}</h3>
              <p className="mt-1.5 flex-1 text-sm text-muted">{template.description}</p>
              <Link
                href={`/dashboard/generate?type=${template.type}&title=${encodeURIComponent(
                  template.title
                )}&seed=${encodeURIComponent(template.seed)}`}
                className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:underline"
              >
                Use template <ArrowRight size={14} />
              </Link>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-muted">
            No templates match your search.
          </p>
        )}
      </div>
    </div>
  );
}
