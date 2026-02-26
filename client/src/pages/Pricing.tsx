import React from "react";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { Check } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function Pricing() {
  const { openDemoModal } = useModal();

  return (
    <div className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <AnimatedReveal className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-display font-extrabold mb-4 text-slate-900 leading-tight">
            Stop Paying For<br /><span className="text-blue-700">10 Different Tools.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            One platform. One price. Unlimited growth. Replace your entire tech stack for less than the cost of your coffee budget.
          </p>
        </AnimatedReveal>

        {/* REPLACEMENT STACK TABLE */}
        <AnimatedReveal delay={0.1} className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            <div className="bg-slate-50/50 py-4 px-6 text-center border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-700 uppercase tracking-widest">The Machine Replaces:</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: "Salesforce / Hubspot", price: "$300+/mo" },
                { name: "Podium / Birdeye", price: "$250+/mo" },
                { name: "ClickFunnels / Leadpages", price: "$197/mo" },
                { name: "Calendly", price: "$15/mo" },
                { name: "Mailchimp / ActiveCampaign", price: "$100+/mo" },
                { name: "Wix / WordPress Hosting", price: "$30/mo" }
              ].map((tool, i) => (
                <div key={i} className="flex justify-between items-center py-3 px-6 md:px-12 hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="text-slate-400 line-through mr-3 text-sm">{tool.name}</span>
                    <span className="text-red-500 font-bold text-xs">{tool.price}</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-bold text-xs tracking-tight">
                    <Check size={14} className="mr-2" /> INCLUDED
                  </div>
                </div>
              ))}
              <div className="bg-blue-50/30 py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="text-lg font-bold text-slate-900">Total Value: ~$900/mo</div>
                <div className="text-lg font-black text-blue-700">MinAI: One Simple Price</div>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
          {/* Essentials */}
          <AnimatedReveal delay={0.2}>
            <div className="bg-white p-8 rounded-3xl h-full flex flex-col border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-2">THE ESSENTIALS</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">For solopreneurs or those just starting.</p>
              <div className="text-4xl font-black text-slate-900 mb-2">$297 <span className="text-base text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-blue-600 mb-8 font-bold uppercase tracking-wider">No Setup Fee</p>

              <ul className="space-y-3 mb-8 flex-1">
                {["2-Way SMS & Email: Unified Inbox", "Missed Call Text-Back", "Reputation Management", "Web Chat Widget", "Mobile App", "Payments: Accept CC via text"].map((feature, i) => (
                  <li key={i} className="flex text-slate-700 font-medium text-sm">
                    <Check size={18} className="text-blue-700 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button onClick={openDemoModal} className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                START FREE TRIAL
              </button>
            </div>
          </AnimatedReveal>

          {/* Growth Machine */}
          <AnimatedReveal delay={0.3}>
            <div className="bg-white p-8 rounded-3xl h-full flex flex-col border-2 border-blue-600 relative shadow-2xl shadow-blue-600/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 text-[10px] font-black rounded-full uppercase tracking-[0.2em]">
                Recommended
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">THE GROWTH MACHINE</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">Complete business infrastructure.</p>
              <div className="text-4xl font-black text-slate-900 mb-2">$497 <span className="text-base text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">+ Setup Fee</p>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex text-slate-900 font-bold text-sm bg-blue-50/50 py-2 px-3 rounded-lg mb-4">
                  <Check size={18} className="text-blue-600 mr-3 flex-shrink-0" />
                  Everything in Essentials, PLUS:
                </li>
                {["Full Website Builder", "Workflows & Automation", "Database Reactivation", "Appointment Booking", "Unlimited Users", "Unlimited Contacts", "AI Content Planner"].map((feature, i) => (
                  <li key={i} className="flex text-slate-700 font-medium text-sm px-3">
                    <Check size={18} className="text-blue-700 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button onClick={openDemoModal} className="w-full py-3.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                GET THE MACHINE
              </button>
            </div>
          </AnimatedReveal>
        </div>

        {/* GUARANTEE & FAQ */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimatedReveal direction="right">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">No Contracts.<br />No Hidden Fees.</h2>
            <p className="text-slate-600 mb-8 leading-relaxed font-medium text-sm">
              We hate contracts. We hate "per user" fees. We hate hidden "setup" costs that appear at checkout.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-slate-900 font-bold text-sm tracking-tight"><Check size={18} className="text-green-500 mr-3" /> Cancel anytime with one click.</li>
              <li className="flex items-center text-slate-900 font-bold text-sm tracking-tight"><Check size={18} className="text-green-500 mr-3" /> Add unlimited team members.</li>
              <li className="flex items-center text-slate-900 font-bold text-sm tracking-tight"><Check size={18} className="text-green-500 mr-3" /> Send unlimited emails.</li>
            </ul>
          </AnimatedReveal>

          <div className="grid grid-cols-1 gap-8">
            <AnimatedReveal direction="left" delay={0.2}>
              <h4 className="text-base font-bold text-slate-900 mb-2">Why is this cheaper than my CRM?</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Most companies charge per user or per contact. We charge a flat fee. We want you to grow, not punish you for it.</p>
            </AnimatedReveal>
            <AnimatedReveal direction="left" delay={0.3}>
              <h4 className="text-base font-bold text-slate-900 mb-2">Is there a setup fee?</h4>
              <p className="text-slate-500 text-sm leading-relaxed">DIY is free. If you want our team to build your system from scratch (Done-For-You), there is a small one-time fee.</p>
            </AnimatedReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
