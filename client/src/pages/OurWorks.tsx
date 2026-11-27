import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { useModal } from "@/context/ModalContext";
import { industriesData } from "@/lib/industries";

export default function Industries() {
  const { openDemoModal } = useModal();

  return (
    <div className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <AnimatedReveal immediate>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-4 text-slate-900 tracking-tight leading-[1.1]">
            Industries <span className="text-blue-700">We Serve.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            We build high-performance growth systems tailored to your industry.
            Click on your industry to see how MinAI works for you.
          </p>
        </AnimatedReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industriesData.map((industry, i) => (
            <AnimatedReveal key={industry.slug} delay={i * 0.05}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group block p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="h-24 w-24 shrink-0 flex items-center justify-center">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="max-h-24 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">
                      {industry.sub}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {industry.description}
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </AnimatedReveal>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Don't see your industry?
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium leading-relaxed">
              Our system works for any business that needs leads, follow-ups, and
              a reputation that sells. Book a demo and we'll show you exactly how
              it applies to your business.
            </p>
            <button
              onClick={openDemoModal}
              className="px-10 py-4 rounded-2xl font-bold bg-blue-700 text-white hover:scale-105 transition-transform shadow-xl shadow-blue-600/20"
            >
              Book a Demo
            </button>
          </AnimatedReveal>
        </div>
      </div>
    </div>
  );
}
