"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "AI PLATFORM", href: "/ai-platform" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" as any }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-black border-b border-white/5"
      >
        <Link href="/" className="flex items-center group">
          <div className="relative w-[140px] h-[40px] md:w-[200px] md:h-[55px] lg:w-[240px] lg:h-[70px] group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/company-logo.png"
              alt="Aero Airworthiness Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gold transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link href="/ai-platform" className="hidden lg:block px-6 py-2 bg-gold text-black text-sm font-bold rounded-sm hover:bg-white transition-all duration-300">
          EXPLORE THE PLATFORM
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white p-2 hover:text-gold transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[45] flex flex-col items-center justify-center gap-8 lg:hidden px-6"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link 
                  href={link.href} 
                  className="text-2xl font-serif font-bold tracking-widest text-white hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-[300px] mt-4"
            >
              <Link 
                href="/ai-platform"
                className="w-full py-4 bg-gold text-black font-bold rounded-sm hover:bg-white transition-all duration-300 inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                EXPLORE THE PLATFORM
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
