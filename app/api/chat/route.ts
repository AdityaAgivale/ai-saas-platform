import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Free plan limit check
  if (user.plan === "free" && user.usageCount >= 5) {
    return NextResponse.json(
      { error: "Free limit reached. Upgrade to Pro." },
      { status: 403 }
    );
  }

  const { prompt } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response.text();

  await prisma.chat.create({
    data: { userId: user.id, prompt, response },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { usageCount: { increment: 1 } },
  });

  return NextResponse.json({ response });
}