export interface Template {
  id: string;
  title: string;
  description: string;
  type: string;
  category: "Marketing" | "Sales" | "Social" | "Email" | "PR";
  seed: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "blog-howto",
    title: "How-To Blog Post",
    description: "Step-by-step guide that ranks and educates.",
    type: "blog",
    category: "Marketing",
    seed: "a step-by-step how-to guide about [topic] for beginners",
  },
  {
    id: "blog-listicle",
    title: "Listicle Blog Post",
    description: "A scannable top-10 style list post.",
    type: "blog",
    category: "Marketing",
    seed: "a listicle titled '10 ways to [achieve outcome]'",
  },
  {
    id: "blog-comparison",
    title: "Comparison Post",
    description: "Compare two products, tools, or approaches.",
    type: "blog",
    category: "Marketing",
    seed: "a comparison blog post: [Product A] vs [Product B]",
  },
  {
    id: "social-launch",
    title: "Product Launch Post",
    description: "Announce a new product or feature.",
    type: "social",
    category: "Social",
    seed: "an exciting product launch announcement for [product name]",
  },
  {
    id: "social-tips",
    title: "Quick Tips Carousel",
    description: "Bite-sized tips for a carousel post.",
    type: "social",
    category: "Social",
    seed: "5 quick tips about [topic] formatted for a carousel post",
  },
  {
    id: "social-engagement",
    title: "Engagement Question",
    description: "A question post designed to spark comments.",
    type: "social",
    category: "Social",
    seed: "a thought-provoking engagement question about [topic]",
  },
  {
    id: "product-ecom",
    title: "E-commerce Listing",
    description: "Benefit-driven copy for a store listing.",
    type: "product",
    category: "Sales",
    seed: "an e-commerce product listing for [product name], highlighting key benefits",
  },
  {
    id: "product-feature",
    title: "Feature Announcement",
    description: "Explain a new feature and why it matters.",
    type: "product",
    category: "Sales",
    seed: "a feature announcement explaining [feature name] and its benefits",
  },
  {
    id: "email-welcome",
    title: "Welcome Email",
    description: "Greet new users or subscribers.",
    type: "email",
    category: "Email",
    seed: "a warm welcome email for new users of [product/service]",
  },
  {
    id: "email-promo",
    title: "Promotional Email",
    description: "Drive urgency around an offer or sale.",
    type: "email",
    category: "Email",
    seed: "a promotional email about [offer/sale] with a strong call to action",
  },
  {
    id: "email-newsletter",
    title: "Newsletter Update",
    description: "Recap recent news and updates.",
    type: "email",
    category: "Email",
    seed: "a monthly newsletter update covering [recent updates/news]",
  },
  {
    id: "press-funding",
    title: "Funding Announcement",
    description: "Announce a funding round or milestone.",
    type: "press",
    category: "PR",
    seed: "a press release announcing [company name]'s [funding round/milestone]",
  },
  {
    id: "press-partnership",
    title: "Partnership Announcement",
    description: "Announce a new strategic partnership.",
    type: "press",
    category: "PR",
    seed: "a press release announcing a partnership between [Company A] and [Company B]",
  },
];

export const TEMPLATE_CATEGORIES = ["All", "Marketing", "Sales", "Social", "Email", "PR"] as const;
