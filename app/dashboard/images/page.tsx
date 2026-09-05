"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Label } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { DocumentsList } from "@/components/dashboard/documents-list";

const SUGGESTIONS = [
  "A futuristic city skyline at sunset, blue and purple tones",
  "Abstract gradient art for a tech startup landing page",
  "Minimalist geometric pattern for a social media banner",
];

export default function ImagesPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [latest, setLatest] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Describe the image you want to create.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setLatest(data.document.content);
        setRefreshKey((k) => k + 1);
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold">AI Image Generator</h1>
      <p className="mt-1 text-sm text-muted">
        Create stunning, unique artwork from a text description.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-2">
          <Label htmlFor="prompt">Describe your image</Label>
          <Textarea
            id="prompt"
            rows={5}
            placeholder="A serene mountain landscape with glowing gradients..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-accent-blue/50 hover:text-foreground"
              >
                {s.length > 32 ? s.slice(0, 32) + "…" : s}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-4">
              <Alert>{error}</Alert>
            </div>
          )}

          <Button onClick={handleGenerate} loading={loading} className="mt-5 w-full" size="lg">
            <Sparkles size={16} /> Generate Image
          </Button>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-surface-2 p-3 text-xs text-muted">
            <Info size={13} className="mt-0.5 shrink-0" />
            Generates unique prompt-derived abstract artwork. Connect a dedicated image-generation
            API key to produce photorealistic images.
          </div>
        </Card>

        <Card className="flex items-center justify-center p-6 lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-blue" />
              <p className="text-sm text-muted">Creating your image...</p>
            </div>
          ) : latest ? (
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl">
              <Image src={latest} alt="Generated artwork" fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Sparkles size={28} className="text-muted" />
              <p className="text-sm text-muted">Your generated image will appear here.</p>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold text-muted">Your Images</h2>
        <div className="mt-3">
          <DocumentsList forcedType="image" refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
