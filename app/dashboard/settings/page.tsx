"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { User2, Mail, CreditCard, Crown, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface UserData {
  name: string | null;
  email: string;
  plan: string;
  usageCount: number;
}

const PRO_FEATURES = [
  "Unlimited AI generations",
  "AI Image Generation",
  "Unlimited brand voices",
  "Priority support",
];

function SettingsContent() {
  const params = useSearchParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setName(data.user?.name ?? "");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reflect checkout redirect query params as a one-time banner
    if (params.get("success")) setMessage("Payment successful! Your plan will update shortly.");
    if (params.get("canceled")) setError("Checkout was canceled.");
  }, [params]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Profile updated successfully.");
    } else {
      const data = await res.json();
      setError(data.error ?? "Could not update profile.");
    }
  };

  const handleUpgrade = async () => {
    setUpgrading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Could not start checkout.");
        setUpgrading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 flex justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue/30 border-t-accent-blue" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted">Manage your profile and subscription.</p>

      {message && (
        <div className="mt-4">
          <Alert variant="success">{message}</Alert>
        </div>
      )}
      {error && (
        <div className="mt-4">
          <Alert>{error}</Alert>
        </div>
      )}

      <Card className="mt-6 p-6">
        <h2 className="flex items-center gap-2 font-semibold">
          <User2 size={16} /> Profile
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">
              <span className="flex items-center gap-1.5">
                <Mail size={12} /> Email address
              </span>
            </Label>
            <Input id="email" value={user?.email ?? ""} disabled className="opacity-60" />
          </div>
          <Button onClick={handleSave} loading={saving} size="sm">
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold">
            <CreditCard size={16} /> Plan & Billing
          </h2>
          <Badge tone={user?.plan === "free" ? "neutral" : "purple"}>
            {user?.plan === "free" ? "Free Plan" : "Pro Plan"}
          </Badge>
        </div>

        {user?.plan === "free" ? (
          <div className="mt-4">
            <p className="text-sm text-muted">
              You&apos;ve used{" "}
              <span className="font-medium text-foreground">{user?.usageCount ?? 0} / 5</span>{" "}
              free AI generations this period.
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                style={{ width: `${Math.min(100, ((user?.usageCount ?? 0) / 5) * 100)}%` }}
              />
            </div>

            <div className="mt-5 rounded-xl border border-accent-purple/30 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 p-4">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <Crown size={14} className="text-accent-orange" /> Upgrade to Pro — $29/mo
              </p>
              <ul className="mt-3 space-y-1.5">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted">
                    <Check size={12} className="text-accent-green" /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={handleUpgrade} loading={upgrading} className="mt-4 w-full" size="sm">
                Upgrade Now
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">
            You&apos;re on the Pro plan with unlimited AI generations. Thank you for your support!
          </p>
        )}
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsContent />
    </Suspense>
  );
}
