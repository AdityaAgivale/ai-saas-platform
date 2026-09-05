"use client";

import { useState } from "react";
import { DashboardSidebar } from "./sidebar";
import { DashboardTopbar } from "./topbar";

export function DashboardShell({
  name,
  email,
  plan,
  usageCount,
  children,
}: {
  name?: string | null;
  email?: string | null;
  plan: string;
  usageCount: number;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar plan={plan} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar
          name={name}
          email={email}
          plan={plan}
          usageCount={usageCount}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
