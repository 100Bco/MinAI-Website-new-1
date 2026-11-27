import React from "react";
import { Link } from "wouter";
import { pages, type PageMeta } from "@/lib/seo";

const GROUPS: PageMeta["group"][] = ["Main", "Products", "Industries", "Legal"];

const label = (page: PageMeta) => page.breadcrumbs[page.breadcrumbs.length - 1]?.name ?? page.title;

export default function SitemapPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-12">Sitemap</h1>
        <div className="grid sm:grid-cols-2 gap-10">
          {GROUPS.map((group) => (
            <section key={group}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{group}</h2>
              <ul className="space-y-3">
                {pages
                  .filter((p) => p.group === group)
                  .map((p) => (
                    <li key={p.path}>
                      <Link href={p.path} className="font-bold text-slate-900 hover:text-blue-700">
                        {label(p)}
                      </Link>
                      <p className="text-sm text-slate-500">{p.description}</p>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
