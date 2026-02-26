import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, CheckCircle, Play, Star, Zap, Shield, Clock,
  BarChart, PhoneMissed, MessageSquare, LayoutDashboard,
  MapPin, ChevronDown, ChevronUp, X, Wrench, Building2,
  Briefcase, Scale, MonitorPlay, Settings, Rocket,
  Phone, Mail, Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { products } from "@/lib/data";
import { useModal } from "@/context/ModalContext";
import { AnimatedReveal } from "@/components/AnimatedReveal";
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

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-foreground">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed pb-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white pointer-events-none" />

        {/* --- 2. Floating Icons Background (Updated) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-5xl md:text-7xl font-extrabold font-display tracking-tight mb-4 leading-[1.1] text-slate-900">
              We Build The Machine <br />
              That <span className="text-blue-700 relative inline-block">
                <span className="absolute inset-0 blur-2xl bg-blue-400/30 -z-10"></span>
                Builds Your Business.
              </span>
            </h1>

            <p className="text-xs text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed font-bold uppercase tracking-[0.2em]">
              Stop chasing leads. Stop missing calls. Stop guessing.
              We install the complete AI infrastructure that captures, nurtures, and closes deals on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={openDemoModal}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 flex items-center gap-2 group w-full sm:w-auto justify-center"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/products"
                className="px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                View The System
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            {/* Trusted Partners */}
            <div className="mt-12 max-w-5xl mx-auto">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Trusted Partners</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-x-16">
                {[
                  { name: "Google", img: googleLogo },
                  { name: "Meta", img: metaLogo },
                  { name: "Wordpress", img: wordpressLogo },
                  { name: "GoDaddy", img: godaddyLogo },
                  { name: "Canva", img: canvaLogo }
                ].map((partner, i) => (
                  <div key={partner.name} className="flex items-center">
                    <img
                      src={partner.img}
                      alt={partner.name}
                      className="h-5 md:h-7 w-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold font-display mb-8 text-foreground tracking-wide uppercase">
            Watch This Video! <span className="text-primary">(You Need To Turn Sound On)</span>
          </h2>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 cursor-pointer hover:scale-110 transition-transform group">
                <Play className="w-8 h-8 text-white fill-white ml-1 group-hover:text-primary group-hover:fill-primary transition-colors" />
              </div>
            </div>
            {/* Placeholder for actual video embed */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium">
              5 Min Demo
            </div>
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
            <div className="p-8 rounded-3xl bg-secondary/30 border border-border opacity-70 grayscale hover:grayscale-0 transition-all">
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
              <div className="order-1 md:order-2 bg-secondary rounded-3xl p-8 border border-border aspect-square flex items-center justify-center">
                <LayoutDashboard className="w-48 h-48 text-muted-foreground/20" />
              </div>
            </div>

            {/* Phase 2: Nurture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-secondary rounded-3xl p-8 border border-border aspect-square flex items-center justify-center">
                <MessageSquare className="w-48 h-48 text-muted-foreground/20" />
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
                <Link href="/products/sms-lead-follow-up" className="text-primary font-semibold hover:underline flex items-center gap-2">
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
              <div className="order-1 md:order-2 bg-secondary rounded-3xl p-8 border border-border aspect-square flex items-center justify-center">
                <Star className="w-48 h-48 text-muted-foreground/20" />
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
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <product.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
                quote: "Stop missing jobs because you were on a ladder.",
                icon: Wrench
              },
              {
                title: "Real Estate Developers",
                sub: "Condos, Subdivisions, Commercial",
                quote: "Move units faster without hiring a massive sales admin team.",
                icon: Building2
              },
              {
                title: "Brokerages",
                sub: "Real Estate, Mortgage, Insurance",
                quote: "Feed your agents appointments, not cold leads.",
                icon: Briefcase
              },
              {
                title: "Personal Injury Law",
                sub: "MVA, Slip & Fall, Workers Comp",
                quote: "Sign the case before the other firm even checks their voicemail.",
                icon: Scale
              }
            ].map((industry, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <industry.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{industry.title}</h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">{industry.sub}</p>
                <p className="text-slate-600 italic font-medium">"{industry.quote}"</p>
              </div>
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
            <FAQItem
              question="Do I need to be 'tech savvy'?"
              answer="No. If you can use email and text on your phone, you can use MinAI. We handle the heavy lifting."
            />
            <FAQItem
              question="Does this replace my current website?"
              answer="It can, and it should. But if you love your current site, we can integrate our tools into it seamlessly."
            />
            <FAQItem
              question="Is there a long-term contract?"
              answer="Never. We earn your business every month. Cancel anytime with a click."
            />
            <FAQItem
              question="How fast can I get started?"
              answer="We can have your core system live in 7 days or less after onboarding."
            />
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
