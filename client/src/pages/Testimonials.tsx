import React from "react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { Play } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function Testimonials() {
  const { openDemoModal } = useModal();

  const caseStudies = [
    { hook: "I'm on a roof all day. I can't answer the phone. MinAI's text-back feature literally saved my business.", author: "John D.", role: "Roofing & Solar", headline: "SAVED $10K/MO IN MISSED CALLS." },
    { hook: "We had 500 leads sitting in an Excel sheet. We uploaded them, hit 'Send', and booked 40 showings the next day.", author: "Sarah M.", role: "Property Development", headline: "SOLD 4 CONDOS IN 24 HOURS." },
    { hook: "Speed to lead is everything. If we don't answer in 5 mins, they're gone. MinAI answers instantly.", author: "Mark T.", role: "Injury Law Partner", headline: "WE SIGN CASES INSTANTLY." },
    { hook: "The system chases the leads automatically until they answer. My stress is gone.", author: "David L.", role: "Real Estate Broker", headline: "REPLACED LAZY AGENTS." },
    { hook: "I was paying for 6 different software subscriptions. MinAI replaced all of them for a fraction of the price.", author: "Jessica B.", role: "MedSpa Owner", headline: "CANCELLED SALESFORCE." },
    { hook: "I tried MinAI because there was no contract. It paid for itself in the first week.", author: "Mike R.", role: "HVAC Contractor", headline: "IT PAID FOR ITSELF IN 7 DAYS." },
  ];

  return (
    <div className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <AnimatedReveal className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-display font-extrabold mb-4 uppercase tracking-tight text-slate-900 leading-tight">
            We don't need to "sell" you.<br />
            <span className="text-blue-700">Our clients do it for us.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
            Marketing agencies love to talk a big game. We prefer results. Here are real business owners using MinAI to print money.
          </p>
          <button onClick={openDemoModal} className="px-8 py-3 rounded-xl font-bold bg-blue-700 text-white hover:bg-blue-800 transition-all shadow-lg shadow-blue-600/20">
            JOIN THEM
          </button>
        </AnimatedReveal>

        {/* VIDEOS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {caseStudies.map((study, i) => (
            <AnimatedReveal key={i} delay={i * 0.05}>
              <div className="bg-white rounded-3xl overflow-hidden group border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                {/* Video Placeholder */}
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center pl-1 z-20 group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/30">
                    <Play size={18} fill="currentColor" />
                  </div>
                  <img src={`https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80`} alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />

                  <div className="absolute bottom-3 left-4 right-4 z-20">
                    <h3 className="text-white font-bold text-base leading-tight drop-shadow-sm">{study.headline}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col text-sm">
                  <p className="text-slate-600 italic mb-6 leading-relaxed font-medium">"{study.hook}"</p>
                  <div className="mt-auto flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-50 mr-3 flex items-center justify-center font-bold text-blue-600 text-xs shadow-inner">
                      {study.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-xs leading-none mb-1">{study.author}</p>
                      <p className="text-blue-700 text-[10px] font-bold uppercase tracking-widest">{study.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        {/* RECEIPTS */}
        <AnimatedReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2">Real Texts. Real Revenue.</h2>
          <p className="text-slate-600 text-sm font-medium">The proof is in the pudding.</p>
        </AnimatedReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { cap: "AI engaged a lead at 9:30 PM & booked it." },
            { cap: "Client reacting to our Reactivation campaign." },
            { cap: "Reviews jumping from 12 to 84 in one month." }
          ].map((img, i) => (
            <AnimatedReveal key={i} delay={i * 0.05} direction="up" className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-slate-50 p-4 flex flex-col border border-slate-100 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="flex-1 bg-white rounded-2xl border border-slate-100 mb-4 relative overflow-hidden flex items-center justify-center italic">
                  <span className="text-slate-200 font-black text-lg rotate-[-20deg] select-none uppercase tracking-[0.2em]">Verified Proof</span>
                </div>
                <p className="text-xs text-center text-slate-600 font-bold leading-relaxed px-2">"{img.cap}"</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
