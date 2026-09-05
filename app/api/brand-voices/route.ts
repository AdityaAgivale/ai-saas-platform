import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserOrThrow } from "@/lib/usage";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserOrThrow(session.user.email);

  const brandVoices = await prisma.brandVoice.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ brandVoices });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserOrThrow(session.user.email);

  const { name, tone, description, traits, isDefault } = await req.json();
  if (!name || !tone) {
    return NextResponse.json({ error: "Name and tone are required" }, { status: 400 });
  }

  if (isDefault) {
    await prisma.brandVoice.updateMany({
      where: { userId: user.id },
      data: { isDefault: false },
    });
  }

  const brandVoice = await prisma.brandVoice.create({
    data: {
      userId: user.id,
      name,
      tone,
      description: description ?? "",
      traits: traits ?? "",
      isDefault: !!isDefault,
    },
  });

  return NextResponse.json({ brandVoice });
}
