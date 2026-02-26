import React from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { products } from "@/lib/data";
import { useModal } from "@/context/ModalContext";
import { Check, ArrowLeft, ArrowRight, Star, Phone, MessageSquare } from "lucide-react";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const { openDemoModal } = useModal();

  const product = products.find(p => p.slug === params?.slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Product Not Found</h1>
        <Link href="/products" className="text-primary hover:underline font-bold">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="relative bg-[#f8fafc] pt-12 overflow-hidden">
      {/* Product Title Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <AnimatedReveal>
          <h1 className="text-4xl md:text-7xl font-display font-extrabold text-slate-900 tracking-tight">
            {product.title}
          </h1>
        </AnimatedReveal>
      </div>

      {/* Optimized Hero: Vertical Stats + Demo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Vertical Stats Column (4/12) */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            {product.stats.map((stat, i) => (
              <AnimatedReveal key={i} delay={i * 0.1} direction="right" className="flex-1">
                <div className="bg-white border border-black/[0.03] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-center">
                  <div className="text-3xl font-extrabold text-blue-700 mb-2">{stat.value}</div>
                  <p className="text-slate-600 font-bold text-sm leading-snug">
                    {stat.label}
                  </p>
                </div>
              </AnimatedReveal>
            ))}
          </div>

          {/* Large Demo Card (8/12) */}
          <div className="lg:col-span-8">
            <AnimatedReveal direction="left" delay={0.2} className="h-full">
              <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] flex flex-col h-full min-h-[400px]">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900">See a short demo below</h3>
                  <div className="w-12 h-1 bg-blue-700/20 rounded-full mx-auto mt-2" />
                </div>

                <div className="flex-1 rounded-[1.5rem] bg-slate-900 overflow-hidden relative group">
                  {/* Video Mockup Simulation */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm z-10 group-hover:bg-slate-800/30 transition-colors">
                    <button
                      onClick={openDemoModal}
                      className="w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform"
                    >
                      <ArrowRight size={32} />
                    </button>
                  </div>

                  {/* UI Elements Simulation */}
                  <div className="p-8 space-y-4 opacity-40">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <div className="w-8 h-8 rounded-full bg-white/20" />
                      <div className="h-4 w-32 bg-white/20 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-white/10 rounded-xl" />
                      <div className="h-20 bg-primary/20 rounded-xl border border-primary/30" />
                    </div>
                    <div className="h-24 bg-white/5 rounded-xl" />
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-[0.05] pointer-events-none">
                    <product.icon size={200} className="text-white" />
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </div>

      {/* Diagonal Divider Section */}
      <div className="relative h-24 -mb-1 z-0">
        <svg
          viewBox="0 0 1440 100"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100 L1440 100 L1440 0 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      {/* Dark "What is" Section */}
      {product.whatIs && (
        <div className="bg-[#0f172a] py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4">
                {product.whatIs.title}
              </h2>
              <div className="w-20 h-1.5 bg-blue-700 rounded-full mx-auto" />
            </AnimatedReveal>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {product.whatIs.points.slice(0, 4).map((point, i) => (
                <AnimatedReveal key={i} delay={i * 0.1} direction="up" className="h-full">
                  <div className="bg-white p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl hover:-translate-y-1 transition-all group h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 shadow-inner flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-all duration-500">
                        <div className="scale-110">
                          {i === 0 && <Check size={24} className="stroke-[3px]" />}
                          {i === 1 && <Star size={24} className="stroke-[3px]" />}
                          {i === 2 && <Phone size={24} className="stroke-[3px]" />}
                          {i > 2 && <MessageSquare size={24} className="stroke-[3px]" />}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{point.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-bold text-[0.95rem]">
                      {point.description}
                    </p>
                  </div>
                </AnimatedReveal>
              ))}
            </div>

            {/* Integrated CTA within Dark Section */}
            <AnimatedReveal className="mt-20 text-center">
              <button
                onClick={openDemoModal}
                className="px-12 py-5 rounded-full bg-blue-700 text-white font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-blue-700/40 flex items-center gap-3 mx-auto"
              >
                Schedule A Demo <ArrowRight size={24} className="stroke-[3px]" />
              </button>
            </AnimatedReveal>
          </div>
        </div>
      )}
      {/* Back Link - Footer area */}
      <div className="bg-[#0f172a] pb-16 pt-8 text-center border-t border-white/5">
        <Link href="/products" className="inline-flex items-center text-sm font-bold text-white/40 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>
      </div>
    </div>
  );
}
