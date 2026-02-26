import React from "react";
import { Link } from "wouter";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { products } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function ProductsIndex() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AnimatedReveal>
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-display font-extrabold mb-4 text-slate-900 leading-tight">
            The Full MinAI Stack
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Explore the specialized features that make up the MinAI infrastructure.
            Individually powerful, together unstoppable.
          </p>
        </div>
      </AnimatedReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <AnimatedReveal key={product.id} delay={i * 0.05}>
            <Link href={`/products/${product.slug}`}>
              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block h-full">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <product.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {product.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm mb-4 font-medium">
                  {product.description}
                </p>
                <div className="flex items-center text-blue-700 font-bold text-xs group-hover:translate-x-1 transition-transform">
                  View System <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            </Link>
          </AnimatedReveal>
        ))}
      </div>
    </div>
  );
}
