import React from "react";
import { CheckCircle } from "lucide-react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { DemoForm } from "@/components/DemoForm";

export default function Contact() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <AnimatedReveal immediate>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6 text-slate-900 tracking-tight leading-[1.1]">
            Book Your <span className="text-blue-700">MinAI Demo.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
            No boring slides. We show you the system, the real numbers, and answer your questions in 20 minutes.
          </p>
          <ul className="space-y-4">
            {[
              "See exactly how MinAI captures, nurtures and closes leads for your business.",
              "We build it for you: website, AI and contact import, live in 7 days or less after onboarding.",
              "No long-term contract. Cancel anytime with a click.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-900 font-bold">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </AnimatedReveal>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-2">
          <DemoForm />
        </div>
      </div>
    </div>
  );
}
