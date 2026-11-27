import React from "react";
import { useRoute, Link } from "wouter";
import { CheckCircle, ArrowRight, ArrowLeft, Zap, Shield, BarChart, Clock } from "lucide-react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { useModal } from "@/context/ModalContext";
import { industriesData } from "@/lib/industries";

export default function IndustryDetail() {
  const [, params] = useRoute("/industries/:slug");
  const { openDemoModal } = useModal();

  const industry = industriesData.find((ind) => ind.slug === params?.slug);

  if (!industry) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Industry Not Found</h1>
        <Link href="/industries" className="text-primary hover:underline font-bold">
          Back to Industries
        </Link>
      </div>
    );
  }

  const featureIcons = [Zap, Shield, Clock, BarChart];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedReveal immediate>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {industry.sub}
              </p>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                {industry.headline}
              </h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
                {industry.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openDemoModal}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/products"
                  className="px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  View The System
                </Link>
              </div>
            </AnimatedReveal>
            <AnimatedReveal immediate delay={0.15}>
              <div className="flex items-center justify-center">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="max-h-80 w-auto object-contain"
                />
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {industry.stats.map((stat, i) => (
              <AnimatedReveal key={i} delay={i * 0.1}>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold font-display text-slate-900 mb-4">
                Sound Familiar?
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                These problems cost you money every single day.
              </p>
            </div>
          </AnimatedReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {industry.painPoints.map((point, i) => (
              <AnimatedReveal key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 font-bold text-sm">✕</span>
                  </div>
                  <p className="text-slate-900 font-bold">{point}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold font-display text-slate-900 mb-4">
                Here's How MinAI Fixes It.
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                A complete system built specifically for {industry.title.toLowerCase()}.
              </p>
            </div>
          </AnimatedReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {industry.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <AnimatedReveal key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedReveal>
            <div className="flex justify-center gap-1 text-yellow-500 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-snug">
              "{industry.testimonial.quote}"
            </p>
            <div>
              <div className="font-bold text-slate-900 text-lg">{industry.testimonial.author}</div>
              <div className="text-slate-500 font-medium">{industry.testimonial.role}</div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#1a44ad] overflow-hidden relative">
        <div className="absolute inset-0 bg-blue-600/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold font-display mb-6 text-white tracking-tight">
            Ready to grow your {industry.title.toLowerCase().replace(/\s*&\s*/, " & ")} business?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium">
            Book a 20-minute demo. We'll show you exactly how the system works for your industry.
          </p>
          <button
            onClick={openDemoModal}
            className="px-8 py-4 bg-white text-[#1a44ad] hover:bg-slate-50 rounded-xl font-bold text-lg transition-all shadow-xl shadow-black/10"
          >
            Book a Demo
          </button>
        </div>
      </section>

      {/* Back Link */}
      <div className="py-8 text-center bg-white border-t border-slate-100">
        <Link
          href="/industries"
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-700 transition-colors group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to All Industries
        </Link>
      </div>
    </div>
  );
}
