import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserOrThrow, isOverLimit, incrementUsage } from "@/lib/usage";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const user = await getUserOrThrow(session.user.email);

  if (isOverLimit(user.plan, user.usageCount)) {
    return NextResponse.json(
      { error: "Free limit reached. Upgrade to Pro for unlimited generations." },
      { status: 403 }
    );
  }

  const { title, type, prompt, brandVoiceId } = await req.json();
  if (!prompt || !type) {
    return NextResponse.json({ error: "Missing prompt or type" }, { status: 400 });
  }

  let voiceInstruction = "";
  if (brandVoiceId) {
    const voice = await prisma.brandVoice.findUnique({ where: { id: brandVoiceId } });
    if (voice && voice.userId === user.id) {
      voiceInstruction = `Write in this brand voice — tone: ${voice.tone}. ${voice.description}. Traits: ${voice.traits}.\n\n`;
    }
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`${voiceInstruction}${prompt}`);
    const content = result.response.text();

    const document = await prisma.document.create({
      data: {
        userId: user.id,
        title: title || prompt.slice(0, 60),
        type,
        content,
      },
    });

    await incrementUsage(user.id);

    return NextResponse.json({ document });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
