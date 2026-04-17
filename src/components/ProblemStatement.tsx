"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, Scale } from "lucide-react";

export default function ProblemStatement() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Context & Stats */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-gold font-bold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> THE REGULATORY BOTTLENECK
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
              Aerospace Innovation is Moving Faster Than Ever. <br />
              <span className="text-white/50">Certification Isn't.</span>
            </h3>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              In today's aerospace landscape, revolutionary designs are often grounded not by physics, but by the overwhelming complexity of regulatory compliance. Without expert DAR-F guidance, programs face years of delays and millions in unforeseen costs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Complex Compliance Mapping",
                desc: "Navigating thousands of FAA regulations (14 CFR) requires more than just reading—it requires authority-level interpretation.",
                icon: Scale
              },
              {
                title: "Certification Deadlocks",
                desc: "Clean-sheet programs don’t fail in engineering- they fail when configuration control collapses and the aircraft no longer match its approved design",
                icon: Clock
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="p-8 border border-white/10 bg-white/5 rounded-sm backdrop-blur-sm hover:border-gold/30 transition-colors"
              >
                <item.icon className="w-8 h-8 text-gold mb-6" />
                <h4 className="text-xl font-serif font-bold mb-4">{item.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: The Sketch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 relative group"
        >
          <div className="absolute -inset-4 border border-white/5 rounded-sm pointer-events-none group-hover:border-gold/20 transition-colors duration-700" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl shadow-gold/5 bg-zinc-900">
             <img 
               src="/clean-sheet-sketch.png" 
               alt="Clean Sheet Concept Draft" 
               className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
             />
             {/* Paper Texture Overlay (Approximate with CSS) */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
             
             {/* Badge */}
             <div className="absolute bottom-6 left-6 right-6 p-4 glass border-white/10 backdrop-blur-md">
                <p className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Concept Phase 01</p>
                <p className="text-sm font-serif italic text-white/70 mt-1">"The Clean Sheet Blueprint"</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
