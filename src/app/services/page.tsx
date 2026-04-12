"use client";

import { motion } from "framer-motion";
import { Shield, Plane, Settings, Zap, ArrowRight } from "lucide-react";
import SubPageHero from "@/components/SubPageHero";

export default function ServicesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <SubPageHero 
        badge="CERTIFICATION AUTHORITY"
        title="Engineering the Path to the Sky."
        subtitle="Comprehensive FAA DAR-F delegation authority and technical program management for the world's most advanced aerospace innovators."
        image="/services-hero.png"
      />

      {/* Narrative Section: Impact */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-6">REGULATORY LEADERSHIP</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Beyond Advisory: <br />We Hold the Authority.</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                In the complex environment of 14 CFR regulations, general advice isn't enough. We provide direct delegation authority, meaning we don't just tell you how to certify—we act as the bridge to the FAA, streamlining the entire approval lifecycle.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                   <p className="text-3xl font-serif font-bold text-gold">300+</p>
                   <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2 font-bold">Projects Approved</p>
                </div>
                <div>
                   <p className="text-3xl font-serif font-bold text-gold">DAR-F</p>
                   <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2 font-bold">Standard Delegation</p>
                </div>
              </div>
           </motion.div>
           <div className="relative aspect-video lg:aspect-square group overflow-hidden border border-white/10 rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200" 
                alt="Jet Inspection" 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gold/5 mix-blend-multiply" />
              <div className="absolute inset-x-8 bottom-8 p-6 glass border-gold/20 flex items-center justify-between">
                 <span className="text-xs font-bold tracking-widest uppercase">Production Certification Support</span>
                 <Shield className="w-5 h-5 text-gold" />
              </div>
           </div>
        </div>
      </section>

      {/* Services Showcase: Cinematic Cards */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-950">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
               <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4">CORE CAPABILITIES</h2>
               <h3 className="text-4xl font-serif font-bold">Elite Authority Services</h3>
            </div>
            <p className="text-white/40 max-w-sm text-sm">Dedicated specialists for Part 21, 23, 25, 27, and 29 certification programs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {[
              {
                title: "Type Certification (TC)",
                icon: Shield,
                items: ["Clean-sheet designs", "STC modifications", "Regulatory roadmaps"],
                img: "https://images.unsplash.com/photo-1464039397811-476f652a3b71?auto=format&fit=crop&q=80&w=1200"
              },
              {
                title: "Production Certification (PC)",
                icon: Settings,
                items: ["§21.137 Quality Systems", "Supply Chain Audits", "Manufacturing Approvals"],
                img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
              },
              {
                title: "Experimental & SCoA",
                icon: Zap,
                items: ["R&D Flight Permits", "Market Survey SCoA", "Exhibition Approvals"],
                img: "https://images.unsplash.com/photo-1540962351504-03099e0a75c3?auto=format&fit=crop&q=80&w=1200"
              },
              {
                title: "PMA & TSO Compliance",
                icon: Plane,
                items: ["Design Approvals", "Production Approvals", "Test & Computation"],
                img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1200"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative h-[400px] overflow-hidden bg-black p-12 flex flex-col justify-end"
              >
                <div className="absolute inset-0 opacity-40 grayscale group-hover:scale-110 group-hover:opacity-60 transition-all duration-[3s]">
                   <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="relative z-10">
                   <service.icon className="w-8 h-8 text-gold mb-6" />
                   <h4 className="text-3xl font-serif font-bold mb-6">{service.title}</h4>
                   <ul className="space-y-3 mb-8">
                     {service.items.map((item, i) => (
                       <li key={i} className="text-white/40 text-xs tracking-widest font-bold uppercase flex items-center gap-2">
                          <div className="w-1 h-1 bg-gold rounded-full" /> {item}
                       </li>
                     ))}
                   </ul>
                   <button className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase group/link">
                      Detailed Briefing <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Cinematic Footer CTA */}
      <section className="py-24 px-6 text-center bg-black relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale" />
         <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-6xl font-serif font-bold mb-12">Elite Authority for <span className="text-gold">Elite Programs.</span></h3>
            <button className="px-12 py-5 bg-gold text-black font-bold hover:bg-white transition-all duration-300">
               Connect with a Senior Delegate
            </button>
         </div>
      </section>
    </main>
  );
}
