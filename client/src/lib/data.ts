import {
  Globe, Inbox, Star, PhoneMissed, Phone,
  MousePointerClick, Search, MessageSquare
} from "lucide-react";

export interface ProductStat {
  label: string;
  value: string;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface WhatIsPoint {
  title: string;
  description: string;
}

export interface WhatIsSection {
  title: string;
  points: WhatIsPoint[];
}

export interface CTASection {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: any;
  description: string;
  details: string;
  benefits: string[];
  stats: ProductStat[];
  keyFeatures: KeyFeature[];
  whatIs?: WhatIsSection;
  ctaSection?: CTASection;
}

export const products: Product[] = [
  {
    id: "functional-website",
    slug: "functional-website",
    title: "Functional Website",
    subtitle: "Get a lead-generating Website in just days.",
    icon: Globe,
    description: "High-converting funnels and websites built into one platform.",
    details: "Stop relying on static brochures. We build dynamic, high-converting websites optimized for speed, SEO, and immediate lead capture.",
    benefits: ["Optimized for conversions", "Integrated forms & chat", "Blazing fast load speeds"],
    stats: [
      { value: "75%", label: "judge credibility based on website" },
      { value: "78%", label: "say a website boosted growth" },
      { value: "67%", label: "trust seamless websites" }
    ],
    keyFeatures: [
      { title: "Actually Get Found Online", description: "SEO optimized with right keywords, meta tags, and page speed." },
      { title: "Showcase Best Reviews", description: "Display top reviews on every page to build trust instantly." },
      { title: "Mobile Friendly", description: "Optimized for the 87% of people visiting on phones." },
      { title: "Instant SMS Conversations", description: "Chat widget starts text conversations directly to your phone." }
    ],
    whatIs: {
      title: "What is the functional website?",
      points: [
        { title: "Actually Get Found Online", description: "We ensure all our websites are properly indexed to appear on Google. We follow all of Google's best practices for SEO, optimized for page speed." },
        { title: "Showcase Your Best Reviews", description: "An online reputation is the most important part of any business. We showcase your top reviews on every page." },
        { title: "Mobile Friendly", description: "87% of customers search for local businesses on mobile. Our optimizations include clear CTAs and quick load speeds." },
        { title: "Instantly Starts SMS Conversations", description: "Eliminate email back-and-forth for quotes. Chat widgets instantly start a text conversation with customers." }
      ]
    },
    ctaSection: {
      title: "Want to schedule a time to talk?",
      description: "See everything we do to help you grow your business so you can implement it yourself or let us do it for you."
    }
  },
  {
    id: "all-in-one-inbox",
    slug: "all-in-one-inbox",
    title: "All In One Inbox",
    subtitle: "Every conversation, in one place.",
    icon: Inbox,
    description: "2-Way SMS, Email, and social DMs in one unified view.",
    details: "Never lose a conversation again. Communicate with leads and customers across SMS, Email, Facebook, Instagram, and Web Chat.",
    benefits: ["Unified messaging", "Faster response times", "Zero lost leads"],
    stats: [
      { value: "70%", label: "respond faster with one inbox" },
      { value: "61%", label: "are less overwhelmed" },
      { value: "83%", label: "become more organized" }
    ],
    keyFeatures: [
      { title: "Unified Dashboard", description: "One login for SMS, Email, GMB, and social DMs." },
      { title: "Speed-to-Lead", description: "Get notified instantly when a lead reaches out." },
      { title: "Mobile App", description: "Manage your business conversations on the go." },
      { title: "Lead History", description: "Full context for every contact you talk to." }
    ],
    whatIs: {
      title: "What is the all in one inbox?",
      points: [
        { title: "4-in-1 Unified Inbox", description: "Consolidate Facebook messages, Instagram DMs, texts, and emails into one place. This ensures you never miss a lead." },
        { title: "Efficiency & Organization", description: "Manage and prioritize communications effortlessly, reducing overwhelm and increasing responsiveness." },
        { title: "Speed-to-Lead", description: "Get notified instantly the second a lead reaches out, allowing you to respond while intent is highest." },
        { title: "Centralized Client History", description: "View the entire history of any customer's conversation across all platforms in one single scroll." }
      ]
    },
    ctaSection: {
      title: "Stop losing leads today.",
      description: "Join the 83% of contractors who became more organized by consolidating their communication."
    }
  },
  {
    id: "magic-review-funnel",
    slug: "magic-review-funnel",
    title: "5-Star Magic Review Funnel",
    subtitle: "Dominate your local search results.",
    icon: Star,
    description: "Automated reputation management to dominate local search.",
    details: "Your reputation is your strongest marketing asset. Our automated review injector sends personalized review requests.",
    benefits: ["Automated requests", "Filter negative feedback", "Dominate local map pack"],
    stats: [
      { value: "97%", label: "read reviews before buying" },
      { value: "72%", label: "use Google reviews" },
      { value: "2.7x", label: "more people buy services" }
    ],
    keyFeatures: [
      { title: "Automated Requests", description: "Send review invites via SMS or Email automatically." },
      { title: "Review Filtering", description: "Handle negative feedback privately before it goes live." },
      { title: "Map Pack Placement", description: "Rise to the top of Google Maps search results." },
      { title: "Review Monitoring", description: "Get alerts for every new review across platforms." }
    ],
    whatIs: {
      title: "What is the 5-star magic review funnel?",
      points: [
        { title: "5-Star Reviews Only", description: "Redirect customers rating below 4 stars to private feedback so you can address issues directly." },
        { title: "Automatic Follow-Up", description: "We gently remind customers 4-5 times over four weeks until they leave their review." },
        { title: "One-Click Requests", description: "Just enter name and phone number - our system handles the rest seamlessly." },
        { title: "Review Injector", description: "Run campaigns to request reviews from your entire past customer list gradually." }
      ]
    },
    ctaSection: {
      title: "Automate your reputation.",
      description: "Join the businesses getting 2.7x more sales by dominating their local reviews."
    }
  },
  {
    id: "missed-call-text-back",
    slug: "missed-call-text-back",
    title: "Missed Call Text Back",
    subtitle: "Instantly capture every missed opportunity.",
    icon: PhoneMissed,
    description: "Instantly text back missed callers so they don't call the next guy.",
    details: "85% of customers appreciate getting a text back after missing a call. Turn a missed call into a text conversation instantly.",
    benefits: ["Instant engagement", "Saves lost revenue", "Professional appearance"],
    stats: [
      { value: "85%", label: "appreciate getting a text back" },
      { value: "72%", label: "respond to texts vs voicemails" },
      { value: "69%", label: "gain more customers" }
    ],
    keyFeatures: [
      { title: "Instant Auto-Reply", description: "Send a friendly text the second you miss a call." },
      { title: "Custom Scripts", description: "Personalize the response based on business hours." },
      { title: "Lead Routing", description: "Notify your team instantly of the missed opportunity." },
      { title: "Appointment Booking", description: "Link to your calendar directly in the text." }
    ],
    whatIs: {
      title: "What is missed call text back?",
      points: [
        { title: "Stand out from competition", description: "Ackonwledge missed calls with instant, customized messages redirecting to your website." },
        { title: "No More Lost Leads", description: "Prevent leads from moving to the next contractor by starting an instant conversation." },
        { title: "Show Customers You Care", description: "Show customers you're available and serious about their business." },
        { title: "Available 24/7", description: "Our system responds even after hours, ensuring every inquiry is addressed." }
      ]
    },
    ctaSection: {
      title: "Never miss another call.",
      description: "Join the 69% of businesses gaining more customers with automated text back."
    }
  },
  {
    id: "business-phone",
    slug: "business-phone",
    title: "Business Phone",
    subtitle: "Professional communication for your firm.",
    icon: Phone,
    description: "Dedicated business line with call tracking and advanced routing.",
    details: "Build trust with a professional business number. Track calls and separate your personal life from work.",
    benefits: ["Professional number", "Call tracking", "Privacy"],
    stats: [
      { value: "80%", label: "more calls lead to jobs" },
      { value: "71%", label: "more likely to refer" },
      { value: "58%", label: "handle appointments better" }
    ],
    keyFeatures: [
      { title: "Legal Phone Number", description: "Dedicated number representing your firm professionally." },
      { title: "Call Tracking", description: "Monitor and record calls to gain valuable marketing insights." },
      { title: "Privacy", description: "Keep personal and business interactions strictly separated." },
      { title: "Instant Notifications", description: "Get alerted for every call so you can respond promptly." }
    ],
    whatIs: {
      title: "Why do I need a business phone?",
      points: [
        { title: "Legal Branding", description: "A dedicated line builds trust and shows you're serious about legal matters and professional appearance." },
        { title: "Marketing Insights", description: "Track which marketing efforts are working based on call volume and source tracking." },
        { title: "Work-Life Balance", description: "Maintain clear boundaries by separating professional and personal calls on a single device." },
        { title: "Enhanced Professionalism", description: "Separate your personal life from your business. Build trust with a dedicated number strictly for your firm." }
      ]
    },
    ctaSection: {
      title: "Get your professional line.",
      description: "Upgrade your firm's professional image and start tracking your success today."
    }
  },
  {
    id: "one-click-marketing",
    slug: "one-click-marketing",
    title: "Marketing Campaigns",
    subtitle: "Turn old leads into new profit.",
    icon: MousePointerClick,
    description: "Reactivate dead leads and past clients with a single click.",
    details: "Sitting on a list of old leads? Our one-click reactivation campaigns send perfectly timed SMS and Email offers.",
    benefits: ["Zero ad spend required", "Instant ROI", "High SMS open rates"],
    stats: [
      { value: "98%", label: "read within 3 minutes" },
      { value: "30%", label: "result in immediate sales" },
      { value: "62%", label: "likely to engage with SMS promotions" }
    ],
    keyFeatures: [
      { title: "Lead Revival", description: "Blast your old list with a compelling one-time offer." },
      { title: "Review Injector", description: "Launch campaigns to boost your 5-star review count." },
      { title: "Holiday Promos", description: "Seasonal campaigns to bring past customers back." },
      { title: "Customer Nurture", description: "Keep your services top-of-mind with personalized follow-ups." }
    ],
    whatIs: {
      title: "Why do I need marketing campaigns?",
      points: [
        { title: "Reactivate Dead Leads", description: "Run campaigns to get past leads through the door again instantly with targeted offers." },
        { title: "Seasonal Sales Boost", description: "Use holiday promos to rekindle interest and boost seasonal revenue significantly." },
        { title: "Repeat Business", description: "Nurture existing clients to encourage loyalty and long-term profit through consistent engagement." },
        { title: "Automated Review Injection", description: "Our system sends review requests that are read within 3 minutes, boosting your reputation." }
      ]
    },
    ctaSection: {
      title: "Profit from your list.",
      description: "Stop setting money on fire and start extracting revenue from your existing assets."
    }
  },
  {
    id: "local-seo",
    slug: "local-seo",
    title: "Local SEO",
    subtitle: "Be the #1 choice in your city.",
    icon: Search,
    description: "Own your local market search results with technical precision.",
    details: "We handle the complex on-site, off-site, and technical SEO required to get your business ranking at the top.",
    benefits: ["Higher organic traffic", "GMB optimization", "Technical health checks"],
    stats: [
      { value: "93%", label: "use Google to find local businesses" },
      { value: "97%", label: "learn about companies online" },
      { value: "46%", label: "searches have local purchase intent" }
    ],
    keyFeatures: [
      { title: "On-Site SEO", description: "Optimize content, keywords, and technical structure." },
      { title: "Off-Site SEO", description: "Manage GMB listings and inbound link building." },
      { title: "Technical SEO", description: "Site load, speed, SSL, and mobile responsiveness." },
      { title: "GMB Optimization", description: "Maximize visibility on Google Maps." }
    ],
    whatIs: {
      title: "What is local SEO?",
      points: [
        { title: "On-Site Optimization", description: "Focus on content, keyword rankings, and technical structure to align with Google's algorithms." },
        { title: "Market Visibility", description: "Ensure your geographic targeting reaches the right local audience actively searching for your services." },
        { title: "Technical Health", description: "Constant evaluation of site speed, security, SSL, and mobile readiness for peak performance." },
        { title: "Google Maps Domination", description: "Maximize visibility on Google Maps so you are the #1 choice when local customers search." }
      ]
    },
    ctaSection: {
      title: "Dominate local search.",
      description: "Stop paying for unqualified leads and start building an organic acquisition system."
    }
  },
  {
    id: "sms-lead-followup",
    slug: "sms-lead-followup",
    title: "SMS Lead Follow-Up",
    subtitle: "Automated sequences that close.",
    icon: MessageSquare,
    description: "Never let a lead go cold with automated SMS follow-up sequences.",
    details: "70% of customers buy from the first responder. Our system ensures you are always first.",
    benefits: ["Instant follow-up", "Consistent nurturing", "Higher close rates"],
    stats: [
      { value: "70%", label: "buy from first responder" },
      { value: "5min", label: "max response time goal" },
      { value: "3x", label: "more likely to close" }
    ],
    keyFeatures: [
      { title: "Instant Sequences", description: "Trigger follow-up texts the second a form is filled." },
      { title: "Drip Campaigns", description: "Nurture leads over days or weeks automatically." },
      { title: "Smart Logic", description: "Stop sequences when a lead replies or books." },
      { title: "Team Alerts", description: "Notify your team when it's time for a human touch." }
    ],
    whatIs: {
      title: "What is SMS lead follow-up?",
      points: [
        { title: "Real-Time Response", description: "Engage leads within 5 minutes when the intent is highest, significantly increasing conversion." },
        { title: "Automated Nurturing", description: "Stay top-of-mind without manual effort or reminders, turning cold prospects into warm leads." },
        { title: "Increased ROI", description: "Maximize the value of every dollar spent on lead acquisition by never letting a lead go cold." },
        { title: "Higher Close Rates", description: "Automated sequences ensure no lead falls through the cracks, closing 3x more deals on average." }
      ]
    },
    ctaSection: {
      title: "Close more deals.",
      description: "Join the elite contractors closing 3x more leads with automated follow-up."
    }
  }
];
