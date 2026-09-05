import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, GlowCard } from "@/components/ui/card";
import { CONTENT_TYPES, DOC_TYPE_META } from "@/lib/content-types";
import { timeAgo } from "@/lib/utils";
import { FileText, ImageIcon, Type, TrendingUp, ArrowRight, ImageIcon as ImgIcon } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { email: session!.user!.email! } });

  const documents = await prisma.document.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const [documentCount, imageCount, chatCount] = await Promise.all([
    prisma.document.count({ where: { userId: user!.id, type: { not: "image" } } }),
    prisma.document.count({ where: { userId: user!.id, type: "image" } }),
    prisma.chat.count({ where: { userId: user!.id } }),
  ]);

  const wordsGenerated = documents.length
    ? await prisma.document
        .findMany({ where: { userId: user!.id, type: { not: "image" } }, select: { content: true } })
        .then((docs) => docs.reduce((sum, d) => sum + d.content.split(/\s+/).filter(Boolean).length, 0))
    : 0;

  const stats = [
    { label: "Documents Created", value: documentCount, icon: FileText, tone: "text-accent-purple" },
    { label: "Images Generated", value: imageCount, icon: ImageIcon, tone: "text-accent-blue" },
    { label: "Words Generated", value: wordsGenerated.toLocaleString(), icon: Type, tone: "text-accent-cyan" },
    { label: "AI Chats", value: chatCount, icon: TrendingUp, tone: "text-accent-green" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! What would you like to
          create today?
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
              <stat.icon size={18} className={stat.tone} />
            </div>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted">Create New</h2>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CONTENT_TYPES.map((type) => (
          <Link key={type.id} href={`/dashboard/generate?type=${type.id}`}>
            <GlowCard className="h-full p-4">
              <type.icon size={18} className={type.tone} />
              <p className="mt-3 text-sm font-semibold">{type.label}</p>
              <p className="mt-1 text-xs text-muted leading-tight">{type.description}</p>
            </GlowCard>
          </Link>
        ))}
        <Link href="/dashboard/images">
          <GlowCard className="h-full p-4">
            <ImgIcon size={18} className="text-accent-green" />
            <p className="mt-3 text-sm font-semibold">AI Image</p>
            <p className="mt-1 text-xs text-muted leading-tight">Generate stunning images</p>
          </GlowCard>
        </Link>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted">Recent Documents</h2>
        <Link
          href="/dashboard/documents"
          className="flex items-center gap-1 text-sm text-accent-blue hover:underline"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-3">
        {documents.length === 0 ? (
          <Card className="flex flex-col items-center justify-center gap-2 p-10 text-center">
            <FileText size={28} className="text-muted" />
            <p className="text-sm text-muted">
              No documents yet. Create your first piece of content above.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => {
              const meta = DOC_TYPE_META[doc.type] ?? DOC_TYPE_META.blog;
              return (
                <Link key={doc.id} href="/dashboard/documents">
                  <Card className="glow-hover h-full p-4">
                    <div className="flex items-center gap-2">
                      <meta.icon size={14} className={meta.tone} />
                      <span className="text-xs text-muted">{meta.label}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm font-medium">{doc.title}</p>
                    <p className="mt-2 text-xs text-muted">{timeAgo(doc.createdAt)}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
