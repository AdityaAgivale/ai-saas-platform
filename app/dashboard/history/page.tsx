"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, MessageSquare, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { timeAgo } from "@/lib/utils";

interface ChatEntry {
  id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [chats, setChats] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => setChats(data.chats ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => chats.filter((c) => c.prompt.toLowerCase().includes(query.toLowerCase())),
    [chats, query]
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold">History</h1>
      <p className="mt-1 text-sm text-muted">Every question you&apos;ve asked the AI assistant.</p>

      <div className="relative mt-6 w-full sm:w-72">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <Input
          placeholder="Search history..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-blue" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center gap-2 p-14 text-center">
          <MessageSquare size={28} className="text-muted" />
          <p className="text-sm text-muted">No chat history yet.</p>
        </Card>
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((chat) => (
            <Card key={chat.id} className="p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-muted">
                  <MessageSquare size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{chat.prompt}</p>
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted">{chat.response}</p>
                  <p className="mt-2 flex items-center gap-1 text-[11px] text-muted">
                    <Clock size={10} /> {timeAgo(chat.createdAt)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
