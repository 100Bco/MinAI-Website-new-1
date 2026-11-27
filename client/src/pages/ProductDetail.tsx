import React from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { VideoFacade } from "@/components/VideoFacade";
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
        <AnimatedReveal immediate>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            {product.title}
          </h1>
        </AnimatedReveal>
      </div>

      {/* Optimized Hero: Stats + Demo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        {product.demoVideoId ? (
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Vertical Stats Column (4/12) */}
            <div className="lg:col-span-4 grid grid-rows-3 gap-4">
              {product.stats.map((stat, i) => (
                <AnimatedReveal key={i} delay={i * 0.1} direction="right">
                  <div className="bg-white border border-black/[0.03] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center text-center">
                    <div className="text-4xl font-extrabold text-blue-700 mb-2">{stat.value}</div>
                    <p className="text-slate-600 font-bold text-sm leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </AnimatedReveal>
              ))}
            </div>

            {/* Large Demo Card (8/12) */}
            <div className="lg:col-span-8">
              <AnimatedReveal direction="left" delay={0.2}>
                <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02]">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">See a short demo below</h2>
                    <div className="w-12 h-1 bg-blue-700/20 rounded-full mx-auto mt-2" />
                  </div>

                  <div className="aspect-video rounded-[1.5rem] bg-slate-900 overflow-hidden relative">
                    <div className="absolute inset-0">
                      <VideoFacade
                        embedUrl={`https://drive.google.com/file/d/${product.demoVideoId}/preview?autoplay=1`}
                        title={`${product.title} Demo Video`}
                      />
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          </div>
        ) : (
          /* No video: stats displayed horizontally */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.stats.map((stat, i) => (
              <AnimatedReveal key={i} delay={i * 0.1} direction="up">
                <div className="bg-white border border-black/[0.03] p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center text-center">
                  <div className="text-5xl font-extrabold text-blue-700 mb-3">{stat.value}</div>
                  <p className="text-slate-600 font-bold text-sm leading-snug">
                    {stat.label}
                  </p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        )}
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
        <Link href="/products" className="inline-flex items-center text-sm font-bold text-white/75 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>
      </div>
    </div>
  );
}
