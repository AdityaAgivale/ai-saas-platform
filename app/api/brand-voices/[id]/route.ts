import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserOrThrow } from "@/lib/usage";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserOrThrow(session.user.email);

  const existing = await prisma.brandVoice.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Brand voice not found" }, { status: 404 });
  }

  const body = await req.json();

  if (body.isDefault) {
    await prisma.brandVoice.updateMany({
      where: { userId: user.id },
      data: { isDefault: false },
    });
  }

  const data: Record<string, unknown> = {};
  for (const key of ["name", "tone", "description", "traits", "isDefault"]) {
    if (key in body) data[key] = body[key];
  }

  const brandVoice = await prisma.brandVoice.update({ where: { id }, data });
  return NextResponse.json({ brandVoice });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserOrThrow(session.user.email);

  const existing = await prisma.brandVoice.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Brand voice not found" }, { status: 404 });
  }

  await prisma.brandVoice.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
