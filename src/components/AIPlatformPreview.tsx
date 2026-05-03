"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Layout, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AIPlatformPreview() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-gold font-bold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> THE AI PLATFORM
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
            Digital certification <br />
            <span className="text-white/40">at the speed of code.</span>
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            Our proprietary AI platform maps your engineering data directly to FAA 14 CFR requirements in real-time, identifying compliance gaps before they become program delays.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[
              { title: "Compliance Mapping", icon: Database },
              { title: "Real-time Tracking", icon: Layout },
              { title: "Gap Analysis", icon: ShieldCheck },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-sm">
                <item.icon className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold tracking-wide uppercase">{item.title}</span>
              </div>
            ))}
          </div>

          <Link href="/ai-platform" className="px-8 py-4 bg-transparent border border-gold text-gold font-bold rounded-sm hover:bg-gold hover:text-black transition-all duration-300 inline-block">
            Explore the Platform
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Mock AI Dashboard UI */}
          <div className="glass p-6 md:p-8 rounded-lg shadow-2xl relative z-10 border-white/20">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40">SYSTEM STATUS: OPTIMAL</span>
            </div>
            
            <div className="space-y-6">
              <div className="h-4 w-2/3 bg-gold/20 rounded-full animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-sm border border-white/10 p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-white/40 uppercase">Compliance Score</span>
                  <span className="text-2xl font-serif text-gold">94.8%</span>
                </div>
                <div className="h-24 bg-white/5 rounded-sm border border-white/10 p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-white/40 uppercase">Active STCs</span>
                  <span className="text-2xl font-serif text-white">12</span>
                </div>
              </div>
              <div className="h-32 bg-white/5 rounded-sm border border-white/10 p-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <div className="w-full h-[1px] bg-gold" />
                   <div className="w-[1px] h-full bg-gold" />
                </div>
                <span className="text-[10px] text-white/40 uppercase">Regulatory Mapping Grid</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Floating Element */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 border border-gold/20 rounded-full flex items-center justify-center animate-spin-slow pointer-events-none">
            <div className="w-32 h-32 border border-gold/10 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
