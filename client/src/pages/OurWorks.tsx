import React from "react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { useModal } from "@/context/ModalContext";

export default function OurWorks() {
  const { openDemoModal } = useModal();

  return (
    <div className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <AnimatedReveal>
          <h1 className="text-4xl md:text-7xl font-display font-extrabold mb-4 text-slate-900 leading-tight">
            Our <span className="text-blue-700">Masterpieces.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Take a look at some of the high-performance revenue machines we've built for our clients.
          </p>
        </AnimatedReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <AnimatedReveal key={i} delay={i * 0.05}>
              <div className="group relative aspect-[16/10] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-slate-50 group-hover:bg-blue-50/50 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    <span className="font-bold text-lg">0{i}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">Revenue Engine Zero-{i}</h3>
                  <p className="text-slate-600 max-w-xs leading-relaxed text-sm font-medium">Custom high-converting infrastructure with full AI automation & CRM integration.</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Want your business to look like this?</h2>
            <p className="text-xl text-slate-600 mb-10 font-medium leading-relaxed">Stop wasting time on mediocre tools. Let us build your high-converting infrastructure and turn your website into a 24/7 revenue machine.</p>
            <button
              onClick={openDemoModal}
              className="px-10 py-4 rounded-2xl font-bold bg-blue-700 text-white hover:scale-105 transition-transform shadow-xl shadow-blue-600/20"
            >
              Build My Machine
            </button>
          </AnimatedReveal>
        </div>
      </div>
    </div>
  );
}
