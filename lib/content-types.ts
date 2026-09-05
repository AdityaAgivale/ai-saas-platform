import {
  FileText,
  Share2,
  ShoppingBag,
  Mail,
  ImageIcon,
  MessageSquare,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export interface ContentType {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  promptTemplate: (topic: string) => string;
}

export const CONTENT_TYPES: ContentType[] = [
  {
    id: "blog",
    label: "Blog Post",
    description: "Write SEO-friendly blog posts",
    icon: FileText,
    tone: "text-accent-blue",
    promptTemplate: (topic) =>
      `Write a well-structured, SEO-friendly blog post with a headline, intro, and 3-4 subheadings about: ${topic}`,
  },
  {
    id: "social",
    label: "Social Media",
    description: "Create engaging social content",
    icon: Share2,
    tone: "text-accent-purple",
    promptTemplate: (topic) =>
      `Write 3 engaging, scroll-stopping social media post variations (with relevant hashtags) about: ${topic}`,
  },
  {
    id: "product",
    label: "Product Description",
    description: "Drive sales with smart descriptions",
    icon: ShoppingBag,
    tone: "text-accent-pink",
    promptTemplate: (topic) =>
      `Write a persuasive, benefit-driven e-commerce product description for: ${topic}`,
  },
  {
    id: "email",
    label: "Email Copy",
    description: "Write high-converting emails",
    icon: Mail,
    tone: "text-accent-cyan",
    promptTemplate: (topic) =>
      `Write a high-converting marketing email (subject line + body) about: ${topic}`,
  },
  {
    id: "press",
    label: "Press Release",
    description: "Announce news professionally",
    icon: Newspaper,
    tone: "text-accent-orange",
    promptTemplate: (topic) =>
      `Write a professional press release announcing: ${topic}`,
  },
];

export function getContentType(id: string): ContentType {
  return CONTENT_TYPES.find((t) => t.id === id) ?? CONTENT_TYPES[0];
}

export const DOC_TYPE_META: Record<string, { label: string; icon: LucideIcon; tone: string }> = {
  blog: { label: "Blog Post", icon: FileText, tone: "text-accent-blue" },
  social: { label: "Social Media", icon: Share2, tone: "text-accent-purple" },
  product: { label: "Product Description", icon: ShoppingBag, tone: "text-accent-pink" },
  email: { label: "Email Copy", icon: Mail, tone: "text-accent-cyan" },
  press: { label: "Press Release", icon: Newspaper, tone: "text-accent-orange" },
  image: { label: "AI Image", icon: ImageIcon, tone: "text-accent-green" },
  chat: { label: "Chat", icon: MessageSquare, tone: "text-accent-orange" },
};
