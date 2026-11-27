import { products } from "./data";
import { industriesData } from "./industries";
import { homeFaqs, pricingFaqs, type FAQ } from "./faqs";

export const SITE = {
  url: "https://minai.biz",
  name: "MinAI",
  legalName: "MinAI Digital",
  logo: "https://minai.biz/logo.png",
  defaultImage: "/og/default.jpg",
  description:
    "MinAI is an AI-powered marketing automation platform for small businesses and contractors: website, unified inbox, missed call text back, reviews, local SEO and SMS follow-up in one system.",
};

export interface Crumb {
  name: string;
  path: string;
}

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  group: "Main" | "Products" | "Industries" | "Legal";
  breadcrumbs: Crumb[];
  schema: Record<string, unknown>[];
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
}

const abs = (path: string) => `${SITE.url}${path === "/" ? "/" : path}`;

const ORG_ID = `${SITE.url}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: abs("/"),
  logo: SITE.logo,
  description: SITE.description,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: abs("/"),
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

const faqSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

const serviceSchema = (name: string, description: string, path: string, extra: Record<string, unknown> = {}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: abs(path),
  provider: { "@id": ORG_ID },
  ...extra,
});

const itemListSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    url: abs(item.path),
  })),
});

const HOME: Crumb = { name: "Home", path: "/" };

const PRODUCT_META: Record<string, { title: string; description: string }> = {
  "functional-website": {
    title: "Talking Website: Lead-Generating Websites | MinAI",
    description:
      "Get a lead-generating website in days: SEO optimized, mobile friendly, showcases your best reviews and starts SMS conversations with visitors instantly.",
  },
  "all-in-one-inbox": {
    title: "All In One Inbox: SMS, Email & Social DMs | MinAI",
    description:
      "Every conversation in one place. Reply to SMS, email, Google Business, Facebook and Instagram messages from one inbox and never lose a lead again.",
  },
  "magic-review-funnel": {
    title: "5-Star Review Funnel: Automated Reviews | MinAI",
    description:
      "Automated review requests by SMS and email, private handling of negative feedback, and follow-ups that help you rise in Google Maps results.",
  },
  "missed-call-text-back": {
    title: "Missed Call Text Back: Capture Every Lead | MinAI",
    description:
      "Instantly text back every caller you miss, 24/7, so they don't call the next contractor. 85% of customers appreciate getting a text back.",
  },
  "business-phone": {
    title: "Business Phone: Dedicated Line & Call Tracking | MinAI",
    description:
      "A professional business number with call tracking, instant notifications and privacy, so you can separate personal life from work.",
  },
  "one-click-marketing": {
    title: "Marketing Campaigns: Reactivate Old Leads | MinAI",
    description:
      "Turn old leads into new profit. One-click SMS and email campaigns for lead revival, holiday promos, review requests and customer nurture.",
  },
  "local-seo": {
    title: "Local SEO: Be the #1 Choice in Your City | MinAI",
    description:
      "On-site, off-site and technical SEO plus Google Business Profile optimization to get your business ranking at the top of local search and Maps.",
  },
  "sms-lead-followup": {
    title: "SMS Lead Follow-Up: Automated Sequences | MinAI",
    description:
      "70% of customers buy from the first responder. Automated SMS sequences answer new leads instantly and nurture them until they book.",
  },
};

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "MinAI | AI Marketing Automation for Small Businesses",
    description:
      "MinAI installs an AI system that answers leads 24/7, texts back missed calls, follows up automatically, books appointments and grows 5-star reviews.",
    image: "/og/home.jpg",
    imageAlt: "MinAI: AI marketing automation for small businesses",
    group: "Main",
    breadcrumbs: [HOME],
    schema: [websiteSchema, faqSchema(homeFaqs)],
    changefreq: "weekly",
    priority: 1,
  },
  {
    path: "/products",
    title: "MinAI Products | The Full AI Marketing Stack",
    description:
      "Explore the 8 tools in the MinAI stack: website, unified inbox, review funnel, missed call text back, business phone, campaigns, local SEO and SMS follow-up.",
    image: "/og/products.jpg",
    imageAlt: "The full MinAI marketing automation stack",
    group: "Products",
    breadcrumbs: [HOME, { name: "Products", path: "/products" }],
    schema: [itemListSchema(products.map((p) => ({ name: p.title, path: `/products/${p.slug}` })))],
    changefreq: "weekly",
    priority: 0.9,
  },
  ...products.map<PageMeta>((p) => ({
    path: `/products/${p.slug}`,
    title: PRODUCT_META[p.slug]?.title ?? `${p.title} | MinAI`,
    description: PRODUCT_META[p.slug]?.description ?? p.description,
    image: `/og/products-${p.slug}.jpg`,
    imageAlt: `MinAI ${p.title}`,
    group: "Products",
    breadcrumbs: [HOME, { name: "Products", path: "/products" }, { name: p.title, path: `/products/${p.slug}` }],
    schema: [
      serviceSchema(p.title, `${p.description} ${p.details}`, `/products/${p.slug}`, {
        serviceType: p.title,
        category: "Marketing automation",
      }),
      ...(p.whatIs
        ? [
            faqSchema([
              {
                question: p.whatIs.title,
                answer: p.whatIs.points.map((pt) => `${pt.title}: ${pt.description}`).join(" "),
              },
            ]),
          ]
        : []),
    ],
    changefreq: "monthly",
    priority: 0.8,
  })),
  {
    path: "/pricing",
    title: "MinAI Pricing | One Platform Replaces 10 Tools",
    description:
      "Replace your CRM, review tool, funnel builder, scheduler and email platform with one flat-rate system. No contracts, unlimited users and contacts.",
    image: "/og/pricing.jpg",
    imageAlt: "MinAI pricing: one platform, one price",
    group: "Main",
    breadcrumbs: [HOME, { name: "Pricing", path: "/pricing" }],
    schema: [faqSchema(pricingFaqs)],
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/industries",
    title: "Industries We Serve | MinAI",
    description:
      "AI growth systems built for local service contractors, real estate developers, agencies and brokerages, and personal injury law firms.",
    image: "/og/industries.jpg",
    imageAlt: "Industries served by MinAI",
    group: "Industries",
    breadcrumbs: [HOME, { name: "Industries", path: "/industries" }],
    schema: [itemListSchema(industriesData.map((i) => ({ name: i.title, path: `/industries/${i.slug}` })))],
    changefreq: "monthly",
    priority: 0.8,
  },
  ...industriesData.map<PageMeta>((i) => ({
    path: `/industries/${i.slug}`,
    title: `MinAI for ${i.title} | AI Lead Follow-Up`,
    description: i.description,
    image: `/og/industries-${i.slug}.jpg`,
    imageAlt: `MinAI for ${i.title}`,
    group: "Industries",
    breadcrumbs: [HOME, { name: "Industries", path: "/industries" }, { name: i.title, path: `/industries/${i.slug}` }],
    schema: [
      serviceSchema(`MinAI for ${i.title}`, i.description, `/industries/${i.slug}`, {
        serviceType: "Marketing automation",
        audience: { "@type": "BusinessAudience", audienceType: `${i.title} (${i.sub})` },
      }),
    ],
    changefreq: "monthly",
    priority: 0.7,
  })),
  {
    path: "/about",
    title: "About MinAI | We Build Marketing Infrastructure",
    description:
      "MinAI builds AI infrastructure that captures, nurtures and closes leads for small businesses. Our rules: profit first, zero friction, speed is power.",
    image: "/og/about.jpg",
    imageAlt: "About MinAI",
    group: "Main",
    breadcrumbs: [HOME, { name: "About Us", path: "/about" }],
    schema: [{ "@context": "https://schema.org", "@type": "AboutPage", url: abs("/about"), about: { "@id": ORG_ID } }],
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    title: "Contact MinAI | Book a Demo",
    description:
      "Book a 20-minute MinAI demo. We show you the system, the real numbers and answer your questions. No boring slides, no long-term contract.",
    image: "/og/contact.jpg",
    imageAlt: "Contact MinAI and book a demo",
    group: "Main",
    breadcrumbs: [HOME, { name: "Contact", path: "/contact" }],
    schema: [{ "@context": "https://schema.org", "@type": "ContactPage", url: abs("/contact"), about: { "@id": ORG_ID } }],
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    title: "Privacy & Cookie Policy | MinAI",
    description:
      "How MinAI collects, uses and protects personal information, which cookies the site uses, SMS terms, and your privacy rights under U.S. state laws.",
    image: SITE.defaultImage,
    imageAlt: "MinAI",
    group: "Legal",
    breadcrumbs: [HOME, { name: "Privacy & Cookie Policy", path: "/privacy" }],
    schema: [],
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    title: "Terms of Use & Disclaimer | MinAI",
    description:
      "The terms for using the MinAI website, including results and AI content disclaimers, trademarks, limitation of liability and accessibility.",
    image: SITE.defaultImage,
    imageAlt: "MinAI",
    group: "Legal",
    breadcrumbs: [HOME, { name: "Terms of Use & Disclaimer", path: "/terms" }],
    schema: [],
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    path: "/sitemap",
    title: "Sitemap | MinAI",
    description: "Every page on the MinAI website: products, industries, pricing, company and legal pages.",
    image: SITE.defaultImage,
    imageAlt: "MinAI",
    group: "Legal",
    breadcrumbs: [HOME, { name: "Sitemap", path: "/sitemap" }],
    schema: [],
    changefreq: "monthly",
    priority: 0.3,
  },
];

export const notFoundMeta: PageMeta = {
  path: "/404",
  title: "Page Not Found | MinAI",
  description: "The page you are looking for does not exist. Explore MinAI products or book a demo.",
  image: SITE.defaultImage,
  imageAlt: "MinAI",
  group: "Main",
  breadcrumbs: [],
  schema: [],
  changefreq: "yearly",
  priority: 0,
};

export function normalizePath(path: string) {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function getPageMeta(path: string): PageMeta {
  const p = normalizePath(path);
  return pages.find((page) => page.path === p) ?? notFoundMeta;
}

export const canonicalUrl = (meta: PageMeta) => abs(meta.path);

export function jsonLdFor(meta: PageMeta): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [organizationSchema, ...meta.schema];
  if (meta.breadcrumbs.length > 1) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: meta.breadcrumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: abs(c.path),
      })),
    });
  }
  return blocks;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function headTags(meta: PageMeta): string {
  const isNotFound = meta === notFoundMeta;
  const url = canonicalUrl(meta);
  const image = `${SITE.url}${meta.image}`;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    isNotFound ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  if (!isNotFound) {
    for (const block of jsonLdFor(meta)) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`);
    }
  }
  return tags.join("\n    ");
}
