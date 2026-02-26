import React from "react";
import { Link } from "wouter";
import logoPng from "@assets/logo-main.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img src={logoPng} alt="MinAI Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Replacing fragmented tech stacks with a single, high-performance infrastructure designed for rapid scale and conversion.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/works" className="text-muted-foreground hover:text-primary transition-colors">Our Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground tracking-wide">
          <p>© {currentYear} MinAI Digital. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors uppercase">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors uppercase">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
