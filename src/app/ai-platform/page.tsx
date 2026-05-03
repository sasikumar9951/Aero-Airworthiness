"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Database, LineChart, Shield, Zap } from "lucide-react";
import Link from "next/link";
import SubPageHero from "@/components/SubPageHero";

export default function AIPlatformPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <SubPageHero 
        badge="DIGITAL INFRASTRUCTURE"
        title="Predictive Compliance Intelligence."
        subtitle="Harnessing deep-learning to bridge the gap between engineering innovation and FAA regulatory authority."
        image="/ai-hero.png"
      />

      {/* Feature Narrative: Split Screen */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative aspect-square lg:order-2"
           >
              <div className="absolute inset-0 bg-gold/5 blur-[100px] animate-pulse" />
              <div className="relative z-10 p-1 bg-gradient-to-br from-gold/40 via-transparent to-white/10 rounded-sm">
                 <div className="bg-zinc-950 p-8 md:p-12 border border-white/10 rounded-sm">
                    <h4 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                       <Zap className="w-6 h-6 text-gold" /> The Digital Path
                    </h4>
                    <div className="space-y-8">
                       {[
                         { t: "Automated §21.137 Mapping", s: "Real-time auditing of quality systems against FAR Part 21 requirements." },
                         { t: "Predictive GAP Analysis", s: "Identifying certification hurdles before they impact your engineering schedule." },
                         { t: "Live Authority Sync", s: "Direct data-exchange protocols for FAA representative briefings." }
                       ].map((item, i) => (
                         <div key={i} className="border-l border-gold/30 pl-6 group">
                            <p className="font-bold text-sm tracking-widest uppercase mb-2 group-hover:text-gold transition-colors">{item.t}</p>
                            <p className="text-white/40 text-sm leading-relaxed">{item.s}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:order-1"
           >
              <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-6">PLATFORM ARCHITECTURE</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">Certification at the <br />Speed of Code.</h3>
              <p className="text-white/60 text-xl leading-relaxed mb-10">
                The traditional paper-based mapping of engineering specs to 14 CFR sections is the single greatest bottleneck in aerospace innovation. Our platform digitizes this process using DAR-F logic.
              </p>
              <Link href="/contact" className="px-10 py-5 bg-gold text-black font-bold flex items-center gap-3 hover:bg-white transition-all w-fit">
                 <Terminal className="w-5 h-5" /> Request Developer Access
              </Link>
           </motion.div>
        </div>
      </section>

      {/* Futuristic Interactive Terminal Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-950 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
         
         <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-20">
               <h3 className="text-3xl font-serif font-bold mb-6">Engineered for Advanced Tech</h3>
               <p className="text-white/40 max-w-xl mx-auto uppercase tracking-widest text-[10px] font-bold">Optimized for eVTOL/eCTOL, Supersonic, and Hydrogen Propulsion Systems</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
              {[
                { title: "Distributed Compute", icon: Cpu, label: "Hardware" },
                { title: "LLM Compliance", icon: Database, label: "Intelligence" },
                { title: "Real-time Auditing", icon: LineChart, label: "Operations" },
                { title: "DAR-F Protocol", icon: Shield, label: "Authority" }
              ].map((card, idx) => (
                <div key={idx} className="p-10 bg-black group hover:bg-zinc-900 transition-colors">
                   <card.icon className="w-6 h-6 text-gold mb-8 group-hover:scale-110 transition-transform" />
                   <p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-2">{card.label}</p>
                   <h5 className="text-xl font-serif font-bold">{card.title}</h5>
                </div>
              ))}
            </div>

            {/* The Terminal Mockup */}
            <div className="mt-24 p-1 bg-gradient-to-b from-white/10 to-transparent rounded-sm">
               <div className="bg-black border border-white/5 rounded-sm overflow-hidden">
                  <div className="px-6 py-4 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between">
                     <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/30" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                        <div className="w-2 h-2 rounded-full bg-green-500/30" />
                     </div>
                     <span className="text-[10px] text-white/30 font-mono">compliance_engine_v7.0.4.sh</span>
                  </div>
                  <div className="p-8 font-mono text-sm space-y-4">
                     <p className="text-gold">&gt; Initializing Aero-Link AI Core [Authority Context Enabled]</p>
                     <p className="text-white/60">&gt; Loading 14 CFR Part 23 Amdt. 64 Data Layers...</p>
                     <p className="text-white/60">&gt; Mapping Engineering Specifications [Spec ID: #eVTOL-eCTOL-2234]...</p>
                     <div className="flex items-center gap-4 py-4">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: "0%" }}
                             whileInView={{ width: "98%" }}
                             transition={{ duration: 2, delay: 0.5 }}
                             className="h-full bg-gold"
                           />
                        </div>
                        <span className="text-gold font-bold">98% SYNC</span>
                     </div>
                     <p className="text-green-500">&gt; SUCCESS: Regulatory alignment identified at §23.2100 - §23.2165</p>
                     <p className="text-white animate-pulse">&gt; ALERT: Certification Roadmap Updated. [Ready for DAR-F Audit]</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
