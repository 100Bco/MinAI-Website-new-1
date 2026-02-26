import React from "react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function AboutUs() {
  const { openDemoModal } = useModal();

  return (
    <div className="py-16 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HERO */}
        <AnimatedReveal className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-7xl font-display font-extrabold mb-6 text-slate-900 uppercase tracking-tight leading-[1.1]">
            We don't build "websites".<br />
            <span className="text-blue-700">We build infrastructure.</span>
          </h1>
          <div className="space-y-4">
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              The world doesn't need another generic marketing agency. It needs engineers who understand that <span className="text-slate-900 font-bold italic underline decoration-blue-500/30 underline-offset-4">profit is the only metric that matters.</span>
            </p>
            <p className="text-slate-900 text-xl font-bold">
              We are different. We are System Architects.
            </p>
          </div>
        </AnimatedReveal>

        {/* THE MISSION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <AnimatedReveal direction="right">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">We got tired of watching good businesses burn money.</h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed font-medium">
              We spent years inside the machine, watching owners get trapped by old-school "lead gen" traps.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Trapped answering phones all day.",
                "Trapped chasing leads that never picked up.",
                "Trapped paying for expensive leads they didn't have time to work."
              ].map((item, i) => (
                <li key={i} className="flex text-slate-900 font-bold items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-3 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-900 font-bold text-lg italic">
              MinAI was built to kill that trap.
            </p>
          </AnimatedReveal>

          <AnimatedReveal direction="left" delay={0.2}>
            <div className="aspect-square rounded-3xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center p-12 overflow-hidden relative group">
              <div className="absolute inset-0 bg-blue-500/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="text-[10rem] font-black text-blue-600/10 select-none">AI</div>
            </div>
          </AnimatedReveal>
        </div>

        {/* THE RULES */}
        <div className="mb-24">
          <AnimatedReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">The 3 Rules We Live By</h2>
            <div className="h-1.5 w-16 bg-blue-700 mx-auto rounded-full" />
          </AnimatedReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Profit First", desc: "If our system doesn't make you more than it costs you, we don't want you as a client." },
              { title: "Zero Friction", desc: "Automation should make your life easier, not more complex. If a 10-year old can't use it, it's broken." },
              { title: "Speed is Power", desc: "In 2024, if you don't answer a lead in 2 minutes, you're invisible. Our systems answer in seconds." }
            ].map((rule, i) => (
              <AnimatedReveal key={i} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 font-bold text-lg">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{rule.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">{rule.desc}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimatedReveal className="bg-blue-700 p-12 md:p-16 rounded-[2.5rem] text-center shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight leading-tight">Ready to work with a team that actually cares about your profit?</h2>
            <button
              onClick={openDemoModal}
              className="px-10 py-4 rounded-2xl font-bold text-lg bg-white text-blue-600 hover:scale-105 transition-transform shadow-xl"
            >
              Get Started →
            </button>
          </div>
        </AnimatedReveal>

      </div>
    </div>
  );
}
