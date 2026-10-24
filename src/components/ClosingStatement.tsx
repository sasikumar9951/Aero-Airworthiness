"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ClosingStatement() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-black text-white text-center relative overflow-hidden">
      {/* Background Jet Trail Effect */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <div className="w-[1px] h-[200%] bg-gold/50 rotate-45 transform" />
        <div className="w-[1px] h-[200%] bg-gold/50 -rotate-45 transform" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <h2 className="text-gold font-bold tracking-[0.3em] text-[10px] md:text-sm uppercase mb-10">THE AUTHORITY OF EXPERIENCE</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-12">
            Your vision is bold. <br />
            Our certification expertise makes it <span className="text-gold">inevitable.</span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="px-10 py-5 bg-gold text-black font-bold rounded-sm border border-gold hover:bg-white hover:border-white transition-all duration-300 inline-block">
              Start Your Certification Assessment
            </Link>
            <Link href="/ai-platform" className="px-10 py-5 bg-transparent text-white font-bold rounded-sm border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm inline-block">
              Explore the Platform
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
