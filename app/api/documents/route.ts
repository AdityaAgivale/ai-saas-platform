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

  const documents = await prisma.document.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ documents });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserOrThrow(session.user.email);

  const { title, type, content, favorite } = await req.json();
  if (!title || !type || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const document = await prisma.document.create({
    data: { userId: user.id, title, type, content, favorite: !!favorite },
  });

  return NextResponse.json({ document });
}
