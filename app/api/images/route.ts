import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserOrThrow, isOverLimit, incrementUsage } from "@/lib/usage";
import { generatePlaceholderImage, svgToDataUri } from "@/lib/generation";

// NOTE: No image-generation API key is configured for this project (only a
// text-model key is present). This endpoint produces a unique, prompt-derived
// abstract artwork rather than calling a real image model — swap the body of
// this handler for a real image API once a key is available.
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

  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const svg = generatePlaceholderImage(prompt, user.id + Date.now());
  const dataUri = svgToDataUri(svg);

  const document = await prisma.document.create({
    data: {
      userId: user.id,
      title: prompt.slice(0, 60),
      type: "image",
      content: dataUri,
    },
  });

  await incrementUsage(user.id);

  return NextResponse.json({ document });
}
