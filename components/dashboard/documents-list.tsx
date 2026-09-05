"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, Trash2, Copy, Check, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/ui/markdown-text";
import { DOC_TYPE_META } from "@/lib/content-types";
import { timeAgo, cn } from "@/lib/utils";

export interface DocumentItem {
  id: string;
  title: string;
  type: string;
  content: string;
  favorite: boolean;
  createdAt: string;
}

export function DocumentsList({
  onlyFavorites = false,
  forcedType,
  refreshKey,
}: {
  onlyFavorites?: boolean;
  forcedType?: string;
  refreshKey?: number;
}) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [active, setActive] = useState<DocumentItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading state when refreshKey changes
    setLoading(true);
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents ?? []))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      if (forcedType && doc.type !== forcedType) return false;
      if (onlyFavorites && !doc.favorite) return false;
      if (!forcedType && typeFilter !== "all" && doc.type !== typeFilter) return false;
      if (query && !doc.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [documents, query, typeFilter, onlyFavorites, forcedType]);

  const toggleFavorite = async (doc: DocumentItem) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, favorite: !d.favorite } : d))
    );
    await fetch(`/api/documents/${doc.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: !doc.favorite }),
    });
  };

  const deleteDocument = async (doc: DocumentItem) => {
    if (!confirm(`Delete "${doc.title}"? This can't be undone.`)) return;
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    if (active?.id === doc.id) setActive(null);
    await fetch(`/api/documents/${doc.id}`, { method: "DELETE" });
  };

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        {!forcedType && (
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent-blue/60"
          >
            <option value="all">All types</option>
            {Object.entries(DOC_TYPE_META).map(([id, meta]) => (
              <option key={id} value={id}>
                {meta.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-blue" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center justify-center gap-2 p-14 text-center">
          <FileText size={28} className="text-muted" />
          <p className="text-sm text-muted">
            {onlyFavorites ? "No favorites yet." : "No documents found."}
          </p>
          <Link href="/dashboard/templates" className="mt-1 text-sm text-accent-blue hover:underline">
            Browse templates to get started
          </Link>
        </Card>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => {
            const meta = DOC_TYPE_META[doc.type] ?? DOC_TYPE_META.blog;
            const isImage = doc.type === "image";
            return (
              <Card key={doc.id} className="flex flex-col overflow-hidden p-0">
                {isImage ? (
                  <button onClick={() => setActive(doc)} className="relative block h-40 w-full bg-surface-2">
                    <Image src={doc.content} alt={doc.title} fill className="object-cover" unoptimized />
                  </button>
                ) : (
                  <button
                    onClick={() => setActive(doc)}
                    className="block h-32 w-full overflow-hidden p-4 text-left"
                  >
                    <p className="line-clamp-5 text-xs leading-relaxed text-muted">{doc.content}</p>
                  </button>
                )}
                <div className="flex flex-1 flex-col p-4 pt-3">
                  <div className="flex items-center gap-2">
                    <meta.icon size={13} className={meta.tone} />
                    <Badge tone="neutral" className="px-2 py-0.5 text-[10px]">
                      {meta.label}
                    </Badge>
                  </div>
                  <button onClick={() => setActive(doc)} className="mt-2 text-left">
                    <p className="line-clamp-1 text-sm font-medium">{doc.title}</p>
                  </button>
                  <p className="mt-1 text-xs text-muted">{timeAgo(doc.createdAt)}</p>

                  <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3">
                    <button
                      onClick={() => toggleFavorite(doc)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-2",
                        doc.favorite ? "text-accent-orange" : "text-muted"
                      )}
                      aria-label="Toggle favorite"
                    >
                      <Star size={15} fill={doc.favorite ? "currentColor" : "none"} />
                    </button>
                    {!isImage && (
                      <button
                        onClick={() => handleCopy(doc.content)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2"
                        aria-label="Copy content"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteDocument(doc)}
                      className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-red-500/10 hover:text-red-400"
                      aria-label="Delete document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title ?? ""}>
        {active && (
          <div>
            {active.type === "image" ? (
              <div className="relative h-72 w-full overflow-hidden rounded-xl bg-surface-2">
                <Image src={active.content} alt={active.title} fill className="object-cover" unoptimized />
              </div>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto rounded-xl bg-surface-2 p-4">
                <MarkdownText content={active.content} className="text-sm" />
              </div>
            )}
            <div className="mt-4 flex justify-end gap-2">
              {active.type !== "image" && (
                <Button variant="secondary" size="sm" onClick={() => handleCopy(active.content)}>
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
              <Button variant="danger" size="sm" onClick={() => deleteDocument(active)}>
                <Trash2 size={13} /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
