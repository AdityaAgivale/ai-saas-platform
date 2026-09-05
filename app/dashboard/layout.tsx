import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell name={user.name} email={user.email} plan={user.plan} usageCount={user.usageCount}>
      {children}
    </DashboardShell>
  );
}
