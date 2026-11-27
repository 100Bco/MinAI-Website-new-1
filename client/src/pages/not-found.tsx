import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function NotFound() {
  const { openDemoModal } = useModal();
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700 mb-4">Error 404</p>
        <h1 className="text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          This page went to voicemail.
        </h1>
        <p className="text-lg text-slate-600 font-medium mb-10">
          The page you are looking for does not exist or has moved. Here is where to go next.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="min-h-11 px-6 py-3 rounded-2xl bg-blue-700 text-white font-bold hover:bg-blue-800 inline-flex items-center justify-center gap-2"
          >
            Back to homepage <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products"
            className="min-h-11 px-6 py-3 rounded-2xl border border-slate-200 font-bold text-slate-900 hover:bg-slate-50 inline-flex items-center justify-center"
          >
            Explore products
          </Link>
          <button
            type="button"
            onClick={openDemoModal}
            className="min-h-11 px-6 py-3 rounded-2xl border border-slate-200 font-bold text-slate-900 hover:bg-slate-50"
          >
            Book a demo
          </button>
        </div>
      </div>
    </div>
  );
}
