import React from "react";
import { Link } from "wouter";
import logoPng from "@assets/logo-main.png";
import { openCookieSettings } from "@/lib/consent";

const linkClass = "text-muted-foreground hover:text-primary transition-colors";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img src={logoPng} alt="MinAI" width={120} height={40} className="h-10 w-auto" loading="lazy" />
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Replacing fragmented tech stacks with a single, high-performance infrastructure designed for rapid scale and conversion.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Platform</h2>
            <ul className="space-y-4">
              <li><Link href="/products" className={linkClass}>Products</Link></li>
              <li><Link href="/pricing" className={linkClass}>Pricing</Link></li>
              <li><Link href="/industries" className={linkClass}>Industries</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Company</h2>
            <ul className="space-y-4">
              <li><Link href="/about" className={linkClass}>About Us</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><Link href="/sitemap" className={linkClass}>Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Legal</h2>
            <ul className="space-y-4">
              <li><Link href="/privacy" className={linkClass}>Privacy &amp; Cookies</Link></li>
              <li><Link href="/terms" className={linkClass}>Terms &amp; Disclaimer</Link></li>
              <li>
                <button type="button" onClick={openCookieSettings} className={linkClass}>
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground tracking-wide">
          <p>
            © {currentYear} MinAI Digital. All rights reserved. · Powered by{" "}
            <a href="https://100bold.co" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
              100Bold
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy &amp; Cookies</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms &amp; Disclaimer</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            <button type="button" onClick={openCookieSettings} className="hover:text-primary transition-colors">
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
