import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import logoPng from "@assets/logo-main.png";
import { useModal } from "@/context/ModalContext";
import { products } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [location] = useLocation();
  const { openDemoModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Homepage", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Our Works", href: "/works" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src={logoPng} alt="MinAI Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative group"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-bold transition-colors hover:text-blue-700 ${location.startsWith('/products') ? 'text-blue-700' : 'text-slate-600'}`}
            >
              Products
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                >
                  <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-2xl backdrop-blur-xl grid grid-cols-2 gap-4">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group/item p-4 rounded-2xl hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <product.icon size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover/item:text-blue-700 transition-colors">{product.title}</div>
                            <div className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">{product.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold transition-colors hover:text-blue-700 ${location === link.href ? "text-blue-700" : "text-slate-600"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={openDemoModal}
            className="bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-700/20"
          >
            Book Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2 rounded-xl hover:bg-black/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <div className="space-y-4">
                <div className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Products</div>
                <div className="pl-4 space-y-4 border-l-2 border-black/5">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="block text-sm font-semibold text-foreground"
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-foreground block"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDemoModal();
                }}
                className="bg-blue-700 text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-blue-700/20 mt-4"
              >
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
