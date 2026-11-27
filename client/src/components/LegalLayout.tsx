import React from "react";

export const LEGAL_EFFECTIVE_DATE = "November 27, 2026";

export function LegalLayout({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto text-slate-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1.5 [&_a]:text-blue-700 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
          {title}
        </h1>
        <p className="text-sm font-semibold text-slate-500 mb-6">Effective date: {LEGAL_EFFECTIVE_DATE}</p>
        <p className="text-lg">{intro}</p>
        {children}
      </article>
    </div>
  );
}
