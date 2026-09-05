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

  const existing = await prisma.document.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const body = await req.json();
  const data: { title?: string; content?: string; favorite?: boolean } = {};
  if (typeof body.title === "string") data.title = body.title;
  if (typeof body.content === "string") data.content = body.content;
  if (typeof body.favorite === "boolean") data.favorite = body.favorite;

  const document = await prisma.document.update({ where: { id }, data });
  return NextResponse.json({ document });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserOrThrow(session.user.email);

  const existing = await prisma.document.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  await prisma.document.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
