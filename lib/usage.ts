import { prisma } from "@/lib/prisma";

export const FREE_PLAN_LIMIT = 5;

export async function getUserOrThrow(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  return user;
}

export function isOverLimit(plan: string, usageCount: number) {
  return plan === "free" && usageCount >= FREE_PLAN_LIMIT;
}

export async function incrementUsage(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { usageCount: { increment: 1 } },
  });
}
