import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserOrThrow, isOverLimit, incrementUsage } from "@/lib/usage";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const user = await getUserOrThrow(session.user.email);
  const chats = await prisma.chat.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ chats });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const user = await getUserOrThrow(session.user.email);

  if (isOverLimit(user.plan, user.usageCount)) {
    return NextResponse.json(
      { error: "Free limit reached. Upgrade to Pro." },
      { status: 403 }
    );
  }

  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const chat = await prisma.chat.create({
      data: { userId: user.id, prompt, response },
    });

    await incrementUsage(user.id);

    return NextResponse.json({ response, chat });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Chat failed. Please try again." }, { status: 500 });
  }
}
