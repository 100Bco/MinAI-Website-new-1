import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, CheckCircle, Play, Star, Zap, Shield, Clock,
  BarChart, PhoneMissed, MessageSquare, LayoutDashboard,
  MapPin, ChevronDown, ChevronUp, X, MonitorPlay, Settings, Rocket,
  Phone, Mail, Sparkles, CalendarCheck
} from "lucide-react";
import { Link } from "wouter";
import { products } from "@/lib/data";
import { useModal } from "@/context/ModalContext";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { LazyVideo } from "@/components/LazyVideo";
import { VideoFacade } from "@/components/VideoFacade";
import { HeroStory } from "@/components/HeroStory";
import { LogoMarquee } from "@/components/LogoMarquee";

// Each word slides up from behind its own line mask; pure CSS so it plays from the prerendered HTML.
const riseWords = (text: string, start: number) =>
  text.split(" ").map((word, i, all) => (
    <React.Fragment key={word + i}>
      <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
        <span className="word-up" style={{ animationDelay: `${start + i * 0.06}s` }}>{word}</span>
      </span>
      {i < all.length - 1 ? " " : null}
    </React.Fragment>
  ));
import { homeFaqs } from "@/lib/faqs";
import canvaLogo from "@assets/Canva_logo.svg.png";
import godaddyLogo from "@assets/Godaddy-logo.png";
import googleLogo from "@assets/Google_2015_logo.svg.png";
import metaLogo from "@assets/Meta_Platforms_Inc._logo.svg.png";
import wordpressLogo from "@assets/WordPress_blue_logo.svg.png";

// --- 1. Component FloatingElement: Bouncing icons nền ---
const FloatingElement = ({ icon: Icon, x, y, depth, delay, size = "md" }: any) => {
  const { scrollY } = useScroll();

  // Parallax scrolling: icon gần (depth cao) di chuyển nhiều hơn
  const scrollYTransform = useTransform(scrollY, [0, 1000], [0, -200 * depth]);

  // Giữ giá trị ngẫu nhiên ổn định qua re-render
  const [config] = useState(() => ({
    // Quỹ đạo di chuyển tự do
    randomX: (Math.random() - 0.5) * 180,
    randomY: (Math.random() - 0.5) * 180,
    randomRotate: (Math.random() - 0.5) * 60,
    duration: 6 + Math.random() * 6, // 6s - 12s: chậm hơn, mượt hơn
    // Bouncing: nhảy lên xuống nhẹ
    bounceY: 8 + Math.random() * 12, // Bounce 8-20px
    bounceDuration: 2 + Math.random() * 1.5, // 2s - 3.5s cho 1 nhịp bounce
  }));

  // Size classes dựa trên prop
  const sizeClass = size === "lg" ? "w-10 h-10" : size === "sm" ? "w-5 h-5" : "w-7 h-7";

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        y: scrollYTransform,
        zIndex: 0,
      }}
      className="absolute pointer-events-none"
    >
      {/* Layer 1: Drifting chậm (quỹ đạo lớn) */}
      <motion.div
        animate={{
          x: [0, config.randomX, 0],
          y: [0, config.randomY, 0],
          rotate: [0, config.randomRotate, 0],
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay,
        }}
      >
        {/* Layer 2: Bouncing nhanh (nảy lên xuống) */}
        <motion.div
          animate={{
            y: [0, -config.bounceY, 0],
          }}
          transition={{
            duration: config.bounceDuration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            opacity: 0.18 + (depth * 0.25), // 18% - 43%
            scale: 0.6 + (depth * 0.5),
            filter: `blur(${(1 - depth) * 1.2}px)`,
          }}
        >
          <Icon
            strokeWidth={1.5}
            className={`${sizeClass} text-blue-400/70`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
  <details className="group border-b border-border">
    <summary className="w-full py-6 flex items-center justify-between gap-4 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 rounded">
      <h3 className="text-lg font-medium text-foreground">{question}</h3>
      <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
    </summary>
    <p className="text-muted-foreground leading-relaxed pb-6">{answer}</p>
  </details>
);

export default function Home() {
  const { openDemoModal } = useModal();

  // Danh sách icon trải đều khắp hero, nhiều hơn để tạo density như screenshot
  const floatingIcons = [
    // Hàng trên (y: 5-20%)
    { icon: Phone, x: '8%', y: '8%', depth: 0.8, delay: 0, size: 'lg' },
    { icon: Star, x: '25%', y: '5%', depth: 0.5, delay: 0.8, size: 'sm' },
    { icon: Mail, x: '42%', y: '12%', depth: 0.6, delay: 1.4, size: 'md' },
    { icon: Sparkles, x: '60%', y: '6%', depth: 0.7, delay: 0.3, size: 'lg' },
    { icon: Shield, x: '78%', y: '10%', depth: 0.5, delay: 2.1, size: 'md' },
    { icon: Zap, x: '93%', y: '8%', depth: 0.8, delay: 1, size: 'sm' },

    // Hàng trên-giữa (y: 20-40%)
    { icon: Clock, x: '5%', y: '28%', depth: 0.4, delay: 0.5, size: 'md' },
    { icon: BarChart, x: '18%', y: '35%', depth: 0.9, delay: 2, size: 'lg' },
    { icon: Rocket, x: '35%', y: '22%', depth: 0.6, delay: 1.8, size: 'sm' },
    { icon: Settings, x: '65%', y: '25%', depth: 0.7, delay: 0.6, size: 'md' },
    { icon: MessageSquare, x: '82%', y: '32%', depth: 0.5, delay: 3, size: 'lg' },
    { icon: Phone, x: '95%', y: '25%', depth: 0.8, delay: 1.5, size: 'sm' },

    // Hàng giữa (y: 40-60%)
    { icon: MapPin, x: '3%', y: '50%', depth: 0.7, delay: 2.5, size: 'lg' },
    { icon: Zap, x: '15%', y: '45%', depth: 0.6, delay: 1.2, size: 'sm' },
    { icon: Star, x: '30%', y: '55%', depth: 0.8, delay: 0.2, size: 'md' },
    { icon: Mail, x: '70%', y: '48%', depth: 0.5, delay: 2.8, size: 'sm' },
    { icon: Shield, x: '85%', y: '52%', depth: 0.9, delay: 0.9, size: 'lg' },
    { icon: Sparkles, x: '96%', y: '45%', depth: 0.4, delay: 1.7, size: 'md' },

    // Hàng dưới (y: 60-85%)
    { icon: LayoutDashboard, x: '7%', y: '70%', depth: 0.7, delay: 3.2, size: 'md' },
    { icon: Rocket, x: '22%', y: '65%', depth: 0.5, delay: 1.3, size: 'lg' },
    { icon: Clock, x: '40%', y: '75%', depth: 0.8, delay: 0.4, size: 'sm' },
    { icon: BarChart, x: '55%', y: '68%', depth: 0.6, delay: 2.4, size: 'md' },
    { icon: Settings, x: '72%', y: '72%', depth: 0.8, delay: 0.7, size: 'lg' },
    { icon: MessageSquare, x: '90%', y: '65%', depth: 0.5, delay: 1.9, size: 'sm' },
    { icon: MapPin, x: '48%', y: '82%', depth: 0.7, delay: 2.6, size: 'md' },
  ];

  return (
    <div className="bg-background">
      {/* Hero: on desktop a scroll story that flows into the demo video */}
      <HeroStory
        background={
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {floatingIcons.map((item, i) => (
          <FloatingElement
            key={i}
            icon={item.icon}
            x={item.x}
            y={item.y}
            depth={item.depth}
            delay={item.delay}
            size={item.size}
          />
        ))}
    </div>
        }
        copy={
    <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-20 text-center">
      <div
        className="hero-rise inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 backdrop-blur px-3.5 py-1.5 mb-4 md:mb-6 text-xs sm:text-sm font-bold text-blue-800 shadow-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
        </span>
        AI marketing automation for contractors, real estate, agencies &amp; law firms
      </div>

      <h1 className="text-[1.9rem] min-[400px]:text-[2.1rem] sm:text-5xl md:text-7xl font-extrabold font-display tracking-tight mb-4 leading-[1.1] text-slate-900">
        <span className="block">{riseWords("We Build The Machine", 0.05)}</span>{" "}
        <span className="block">
          {riseWords("That", 0.29)}{" "}
          <span className="text-blue-700 relative inline-block">
            <span className="absolute inset-0 blur-2xl bg-blue-400/30 -z-10"></span>
            {riseWords("Builds Your Business.", 0.35)}
          </span>
        </span>
      </h1>

      <div className="hero-rise" style={{ animationDelay: "0.35s" }}>
        <p className="text-[15px] sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-5 md:mb-8 leading-relaxed font-medium">
          Stop chasing leads. Stop missing calls. Stop guessing.
          We install the complete AI infrastructure that captures, nurtures, and closes deals on autopilot.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={openDemoModal}
            className="px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 flex items-center gap-2 group w-full sm:w-auto justify-center"
          >
            Book a Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            href="/products"
            className="px-8 py-3.5 sm:py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            View The System
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Trusted Partners */}
        <div className="mt-6 md:mt-8">
          <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 md:mb-4">Trusted Partners</p>
          <LogoMarquee
            logos={[
              { name: "Google", img: googleLogo },
              { name: "Meta", img: metaLogo },
              { name: "WordPress", img: wordpressLogo },
              { name: "GoDaddy", img: godaddyLogo },
              { name: "Canva", img: canvaLogo },
            ]}
          />
        </div>
      </div>
    </div>
        }
      />

      {/* Industries Served */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4 text-slate-900">Serving all these industries and more...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Local Service Contractors",
                sub: "HVAC, Roofing, Plumbing, Solar",
                image: "/industry-1.webp",
                slug: "local-service-contractors"
              },
              {
                title: "Real Estate Developers",
                sub: "Condos, Subdivisions, Commercial",
                image: "/industry-2.webp",
                slug: "real-estate-developers"
              },
              {
                title: "Agencies &\nBrokerages",
                sub: "Real Estate, Mortgage, Insurance",
                image: "/industry-3.webp",
                slug: "agencies-brokerages"
              },
              {
                title: "Personal Injury\nLaw Firms",
                sub: "MVA, Slip & Fall, Workers Comp",
                image: "/industry-4.webp",
                slug: "personal-injury-law-firms"
              }
            ].map((industry, i) => (
              <Link key={i} href={`/industries/${industry.slug}`} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group block">
                <div className="h-44 flex items-center justify-center mb-6">
                  <img src={industry.image} alt={industry.title.replace("\n", " ")} width={176} height={176} loading="lazy" className="max-h-44 w-auto object-contain group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 whitespace-pre-line group-hover:text-blue-700 transition-colors">{industry.title}</h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{industry.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section (desktop shows the video inside the hero story) */}
      <section className="py-12 bg-background border-b border-border lg:hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold font-display mb-8 text-foreground tracking-wide uppercase">
            Watch This Video! <span className="text-primary">(You Need To Turn Sound On)</span>
          </h2>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border bg-black">
            <VideoFacade driveId="1UqAtNkMNQ94rE2JwkrEy9MOWDD2guL88" title="MinAI Demo Video" />
          </div>
        </div>
      </section>

      {/* Comparison Section: Amateurs vs Systems */}
      <section className="py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4 text-slate-900">The "Old Way" is Dead.</h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">Stop trying to outwork a broken system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Amateur */}
            <div className="p-8 rounded-3xl bg-secondary/30 border border-border opacity-95 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">The Amateur</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-600 font-medium">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  Misses calls while on the job site.
                </li>
                <li className="flex gap-3 text-slate-600 font-medium">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  Chases "bad leads" for weeks.
                </li>
                <li className="flex gap-3 text-slate-600 font-medium">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  Pays for 5 different software tools.
                </li>
                <li className="flex gap-3 text-slate-600 font-medium">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  Relies on "word of mouth" (hope).
                </li>
              </ul>
            </div>

            {/* The System Architect */}
            <div className="p-8 rounded-3xl bg-card border-2 border-primary shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                You
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">The System Architect</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-900 font-bold">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  AI answers calls & texts instantly 24/7.
                </li>
                <li className="flex gap-3 text-slate-900 font-bold">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  Automated follow-up until they buy.
                </li>
                <li className="flex gap-3 text-slate-900 font-bold">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  One platform, one price, total control.
                </li>
                <li className="flex gap-3 text-slate-900 font-bold">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  Predictable revenue on demand.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The System Breakdown (3 Pillars) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-6 text-slate-900">The MinAI Ecosystem</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              We don't just "build websites". We install a 3-part growth engine.
            </p>
          </div>

          <div className="space-y-24">
            {/* Phase 1: Capture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                  Phase 1
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold font-display mb-6 text-slate-900">Capture Every Opportunity</h3>
                <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                  Most websites are digital brochures. Ours are lead traps. We ensure you get found and nobody leaves without giving you their info.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "High-Converting Website Design",
                    "Local SEO Domination",
                    "Missed Call Text-Back (Never lose a lead)",
                    "Unified Inbox (FB, IG, SMS, Email)"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-900 font-bold">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/products/functional-website" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Explore Capture Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="order-1 md:order-2 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
                <LazyVideo src="/media/minai-phase-1.mp4" poster="/media/minai-phase-1.jpg" label="Capture Every Opportunity" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Phase 2: Nurture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
                <LazyVideo src="/media/minai-phase-2.mp4" poster="/media/minai-phase-2.jpg" label="Nurture On Autopilot" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
                  Phase 2
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold font-display mb-6 text-slate-900">Nurture On Autopilot</h3>
                <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                  The money is in the follow-up. Our AI chases leads for you, answers questions, and books appointments while you sleep.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "AI Booking Bot (24/7 Appointment Setter)",
                    "Automated SMS & Email Sequences",
                    "Database Reactivation (Wake up dead leads)",
                    "Social Media Auto-Posting"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-900 font-bold">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/products/sms-lead-followup" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Explore Nurture Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Phase 3: Close & Scale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                  Phase 3
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold font-display mb-6 text-slate-900">Close & Scale Reputation</h3>
                <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                  Turn happy customers into your best marketing channel. Automate reviews and payments to keep cash flow healthy.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Automated Google Review Requests",
                    "Text-to-Pay Invoicing",
                    "Referral Management System",
                    "Detailed ROI Reporting"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-900 font-bold">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/products/magic-review-funnel" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Explore Scale Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="order-1 md:order-2 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
                <LazyVideo src="/media/minai-phase-3.mp4" poster="/media/minai-phase-3.jpg" label="Close & Scale Reputation" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The MinAI Machine */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4 text-slate-900">The MinAI Machine</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              We combine AI automation with high-level sales psychology to build a system that runs your business for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block h-full">
                {product.iconImage ? (
                  <div className="w-[60px] h-[60px] mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img src={product.iconImage} alt="" width={60} height={60} loading="lazy" className="w-[60px] h-[60px] object-contain" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <product.icon className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4 text-slate-900">What working with MinAI looks like...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-slate-100 -z-10" />
            {[
              {
                step: "Step 1",
                title: "The Demo (No Fluff)",
                text: "No boring slides. We show you the system, the real numbers, and answer your questions in 20 minutes.",
                icon: MonitorPlay
              },
              {
                step: "Step 2",
                title: "We Build It For You",
                text: "We build the site, set up the AI, and import your contacts. You focus on business, we handle the tech. (7 Days).",
                icon: Settings
              },
              {
                step: "Step 3",
                title: "The Handoff & Launch",
                text: "We hand you the keys, show you the 'money buttons', and launch. You start closing deals on autopilot.",
                icon: Rocket
              }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center mb-8 shadow-sm group hover:border-blue-600 transition-colors">
                  <item.icon className="w-10 h-10 text-slate-900 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed max-w-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-6 text-slate-900">Receipts.</h2>
            <p className="text-xl text-slate-600 font-medium font-medium leading-relaxed">We don't hide results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { quote: "Revenue up 30% in 30 days.", author: "Local Contractor", role: "Roofing" },
              { quote: "Sold out Phase 2 in half the time.", author: "Real Estate Dev", role: "Development" },
              { quote: "My phone actually rings now.", author: "Dr. Smith", role: "Chiropractor" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-secondary border border-border relative">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xl font-medium mb-6 leading-relaxed text-foreground">"{item.quote}"</p>
                <div>
                  <div className="font-bold text-foreground">{item.author}</div>
                  <div className="text-sm text-muted-foreground">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4 text-slate-900">FAQ</h2>
            <p className="text-slate-600 text-xl font-medium leading-relaxed">You have questions. We have answers.</p>
          </div>

          <div className="space-y-2">
            {homeFaqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#1a44ad] overflow-hidden relative">
        <div className="absolute inset-0 bg-blue-600/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold font-display mb-12 text-white tracking-tight">
            Ready to stop playing small?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openDemoModal}
              className="px-8 py-4 bg-white text-[#1a44ad] hover:bg-slate-50 rounded-xl font-bold text-lg transition-all shadow-xl shadow-black/10 w-full sm:w-auto"
            >
              Book a Demo
            </button>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-transparent border border-white/40 hover:bg-white/10 text-white rounded-xl font-bold text-lg transition-all w-full sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
