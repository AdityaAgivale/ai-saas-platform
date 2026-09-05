"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, User2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { MarkdownText } from "@/components/ui/markdown-text";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Brainstorm 5 blog post ideas about productivity",
  "Write a catchy tagline for a fitness app",
  "Explain SEO best practices in simple terms",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (prompt: string) => {
    if (!prompt.trim() || loading) return;
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
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
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-4xl flex-col">
      <div>
        <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
        <p className="mt-1 text-sm text-muted">Ask anything, brainstorm ideas, or get instant answers.</p>
      </div>

      <Card className="mt-6 flex flex-1 flex-col overflow-hidden p-0">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple">
                <Sparkles size={20} className="text-white" />
              </div>
              <p className="text-sm text-muted">Start a conversation, or try a suggestion:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted hover:border-accent-blue/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      msg.role === "user"
                        ? "bg-surface-2 text-muted"
                        : "bg-gradient-to-br from-accent-blue to-accent-purple text-white"
                    )}
                  >
                    {msg.role === "user" ? <User2 size={14} /> : <Bot size={14} />}
                  </span>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white"
                        : "bg-surface-2"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <MarkdownText content={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple text-white">
                    <Bot size={14} />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl bg-surface-2 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-muted"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {error && (
          <div className="px-6">
            <Alert>{error}</Alert>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent-blue/60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </Card>
    </div>
  );
}
