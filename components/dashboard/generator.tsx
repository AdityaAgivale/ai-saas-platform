"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Copy, Check, RefreshCcw, ArrowRight, Mic2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Label, Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { MarkdownText } from "@/components/ui/markdown-text";
import { CONTENT_TYPES, getContentType } from "@/lib/content-types";
import { cn } from "@/lib/utils";

interface BrandVoice {
  id: string;
  name: string;
}

export function ContentGenerator() {
  const params = useSearchParams();
  const router = useRouter();

  const initialType = params.get("type") || "blog";
  const initialTitle = params.get("title") || "";
  const initialSeed = params.get("seed") || "";

  const [typeId, setTypeId] = useState(initialType);
  const [title, setTitle] = useState(initialTitle);
  const [topic, setTopic] = useState(initialSeed);
  const [brandVoiceId, setBrandVoiceId] = useState("");
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>([]);
  const [result, setResult] = useState("");
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const contentType = getContentType(typeId);

  useEffect(() => {
    fetch("/api/brand-voices")
      .then((res) => res.json())
      .then((data) => setBrandVoices(data.brandVoices ?? []))
      .catch(() => {});
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Describe what you'd like to create.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || topic.slice(0, 60),
          type: typeId,
          prompt: contentType.promptTemplate(topic),
          brandVoiceId: brandVoiceId || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.document.content);
        setDocumentId(data.document.id);
        if (!title) setTitle(data.document.title);
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">AI Content Generator</h1>
      <p className="mt-1 text-sm text-muted">
        Describe what you need and let AI write the first draft.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-2">
          <Label>Content type</Label>
          <div className="grid grid-cols-2 gap-2">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setTypeId(type.id)}
                className={cn(
                  "flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-colors",
                  typeId === type.id
                    ? "border-accent-blue/50 bg-accent-blue/10"
                    : "border-border hover:bg-surface-2"
                )}
              >
                <type.icon size={16} className={type.tone} />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              placeholder="e.g. Summer Sale Announcement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <Label htmlFor="topic">What do you want to create?</Label>
            <Textarea
              id="topic"
              rows={6}
              placeholder="Describe your topic, product, or idea in a few sentences..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {brandVoices.length > 0 && (
            <div className="mt-5">
              <Label htmlFor="voice">
                <span className="flex items-center gap-1.5">
                  <Mic2 size={12} /> Brand voice (optional)
                </span>
              </Label>
              <select
                id="voice"
                value={brandVoiceId}
                onChange={(e) => setBrandVoiceId(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent-blue/60"
              >
                <option value="">Default (no specific voice)</option>
                {brandVoices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && (
            <div className="mt-4">
              <Alert>{error}</Alert>
            </div>
          )}

          <Button onClick={handleGenerate} loading={loading} className="mt-6 w-full" size="lg">
            Generate {contentType.label}
            <ArrowRight size={16} />
          </Button>
        </Card>

        <Card className="flex flex-col p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Result</h2>
            {result && (
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleGenerate}>
                  <RefreshCcw size={13} /> Regenerate
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4 flex-1 overflow-y-auto rounded-xl border border-border bg-surface-2 p-4">
            {loading ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-blue" />
                <p className="text-sm text-muted">Generating your {contentType.label.toLowerCase()}...</p>
              </div>
            ) : result ? (
              <MarkdownText content={result} className="text-sm" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center">
                <contentType.icon size={28} className="text-muted" />
                <p className="text-sm text-muted">
                  Your generated {contentType.label.toLowerCase()} will appear here.
                </p>
              </div>
            )}
          </div>

          {result && documentId && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-accent-green/10 px-4 py-2.5 text-sm text-accent-green">
              <span>Saved to Documents</span>
              <button
                onClick={() => router.push("/dashboard/documents")}
                className="font-medium underline"
              >
                View
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
