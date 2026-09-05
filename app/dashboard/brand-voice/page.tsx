"use client";

import { useEffect, useState } from "react";
import { Plus, Mic2, Star, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";

interface BrandVoice {
  id: string;
  name: string;
  tone: string;
  description: string;
  traits: string;
  isDefault: boolean;
}

const TONE_OPTIONS = ["Professional", "Friendly", "Witty", "Bold", "Minimal", "Playful"];

const emptyForm = { name: "", tone: TONE_OPTIONS[0], description: "", traits: "", isDefault: false };

export default function BrandVoicePage() {
  const [voices, setVoices] = useState<BrandVoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BrandVoice | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/brand-voices")
      .then((res) => res.json())
      .then((data) => setVoices(data.brandVoices ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  };

  const openEdit = (voice: BrandVoice) => {
    setEditing(voice);
    setForm({
      name: voice.name,
      tone: voice.tone,
      description: voice.description,
      traits: voice.traits,
      isDefault: voice.isDefault,
    });
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Give your brand voice a name.");
      return;
    }
    setSaving(true);
    setError("");
    const url = editing ? `/api/brand-voices/${editing.id}` : "/api/brand-voices";
    const method = editing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);

    if (res.ok) {
      setOpen(false);
      load();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
    }
  };

  const handleDelete = async (voice: BrandVoice) => {
    if (!confirm(`Delete "${voice.name}"?`)) return;
    setVoices((prev) => prev.filter((v) => v.id !== voice.id));
    await fetch(`/api/brand-voices/${voice.id}`, { method: "DELETE" });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Voice</h1>
          <p className="mt-1 text-sm text-muted">
            Define voices to keep AI-generated content consistent with your brand.
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus size={14} /> New Voice
        </Button>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-blue" />
        </div>
      ) : voices.length === 0 ? (
        <Card className="mt-6 flex flex-col items-center gap-2 p-14 text-center">
          <Mic2 size={28} className="text-muted" />
          <p className="text-sm text-muted">No brand voices yet. Create your first one.</p>
          <Button size="sm" onClick={openCreate} className="mt-2">
            <Plus size={14} /> New Voice
          </Button>
        </Card>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {voices.map((voice) => (
            <Card key={voice.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-pink/10 text-accent-pink">
                  <Mic2 size={17} />
                </div>
                {voice.isDefault && (
                  <Badge tone="orange" className="gap-1">
                    <Star size={10} fill="currentColor" /> Default
                  </Badge>
                )}
              </div>
              <h3 className="mt-3 font-semibold">{voice.name}</h3>
              <p className="mt-0.5 text-xs text-accent-blue">{voice.tone}</p>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {voice.description || "No description added."}
              </p>
              <div className="mt-4 flex gap-2 border-t border-border pt-3">
                <Button variant="secondary" size="sm" onClick={() => openEdit(voice)}>
                  <Pencil size={12} /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(voice)}>
                  <Trash2 size={12} className="text-red-400" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Brand Voice" : "New Brand Voice"}>
        <div className="space-y-4">
          {error && <Alert>{error}</Alert>}
          <div>
            <Label htmlFor="bv-name">Name</Label>
            <Input
              id="bv-name"
              placeholder="e.g. Marketing Voice"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bv-tone">Tone</Label>
            <select
              id="bv-tone"
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent-blue/60"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="bv-desc">Description</Label>
            <Textarea
              id="bv-desc"
              rows={3}
              placeholder="Describe how this voice should sound..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bv-traits">Traits (comma-separated)</Label>
            <Input
              id="bv-traits"
              placeholder="concise, confident, data-driven"
              value={form.traits}
              onChange={(e) => setForm({ ...form, traits: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-[--accent-blue]"
            />
            Set as default voice
          </label>
          <Button onClick={handleSave} loading={saving} className="w-full">
            {editing ? "Save Changes" : "Create Voice"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
