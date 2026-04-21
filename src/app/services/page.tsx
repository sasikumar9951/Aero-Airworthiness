"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Plane, Settings, Zap, ArrowRight, FileText, Globe } from "lucide-react";
import SubPageHero from "@/components/SubPageHero";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);

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
                   <p className="text-3xl font-serif font-bold text-gold">100+</p>
                   <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2 font-bold">Aircraft Certifications</p>
                </div>
                <div>
                   <p className="text-3xl font-serif font-bold text-gold">50+</p>
                   <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2 font-bold">Certification Programs</p>
                </div>
              </div>
           </motion.div>
           <div className="relative aspect-video lg:aspect-square group overflow-hidden border border-white/10 rounded-sm">
              <img 
                src="/ServiceContent.png" 
                alt="Jet Inspection" 
                className="w-full h-full object-cover brightness-90 group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gold/5 mix-blend-multiply" />
              <div className="absolute inset-x-8 bottom-8 p-6 glass border-gold/20 flex items-center justify-between">
                 <span className="text-xs font-bold tracking-widest uppercase">Production Certification Support</span>
                 <Shield className="w-5 h-5 text-gold" />
              </div>
           </div>
        </div>
      </section>

      {/* Services Showcase: Interactive Premium Tabs */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-950">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
               <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4">CORE CAPABILITIES</h2>
               <h3 className="text-4xl font-serif font-bold">Elite Authority Services</h3>
            </div>
            <p className="text-white/40 max-w-sm text-sm">Dedicated specialists for Part 21, 23, 25, 27, and 29 certification programs.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Tab Navigation */}
            <div className="lg:w-1/3 flex flex-col gap-2">
              {[
                { id: 0, title: "Type Certification & Design Approval", icon: Shield },
                { id: 1, title: "Production Certification & Quality Systems", icon: Settings },
                { id: 2, title: "Experimental & SCoA", icon: Zap },
                { id: 3, title: "PMA & TSO Compliance", icon: Plane },
                { id: 4, title: "Certification Documentation & Program Support", icon: FileText }
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`group flex items-center gap-4 p-6 transition-all duration-500 border-l-2 text-left ${
                    activeTab === idx 
                      ? 'bg-gold/5 border-gold text-white' 
                      : 'bg-transparent border-white/5 text-white/40 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 transition-colors duration-500 ${activeTab === idx ? 'text-gold' : 'text-white/20 group-hover:text-gold/50'}`} />
                  <span className="text-sm font-bold tracking-widest uppercase">{tab.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <div className="lg:w-2/3 min-h-[500px] relative overflow-hidden bg-black border border-white/10 p-8 md:p-12 flex flex-col justify-between">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Full Background Image */}
                <div className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden">
                  <img 
                    src={[
                      "/tc-card-bg.png",
                      "/production-authority.png",
                      "/exp-card-bg.png",
                      "/pma-card-bg.png",
                      "/doc-card-bg.png"
                    ][activeTab]} 
                    alt="Background Detail"
                    className="w-full h-full object-cover brightness-110 group-hover:scale-110 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10">
                   <h4 className="text-3xl font-serif font-bold mb-8 text-gold">
                      {[
                        "Type Certification & Design Approval",
                        "Production Certification & Quality Systems",
                        "Experimental & SCoA",
                        "PMA & TSO Compliance",
                        "Certification Documentation & Program Support"
                      ][activeTab]}
                   </h4>
                   <ul className="space-y-6 mb-12">
                      {[
                        [
                          "Type Certification (TC) support, including clean-sheet aircraft programs",
                          "Supplemental Type Certificate (STC) modification support",
                          "Certification pathways aligned with FAA requirements",
                          "Executive-level certification briefings"
                        ],
                        [
                          "Production Certification (PC) support and manufacturing approvals",
                          "14 CFR §21.137 quality system compliance",
                          "Supplier quality and supply chain audits",
                          "Executive-level production briefings"
                        ],
                        [
                          "Experimental certification support (R&D, flight permits), including market survey and crew training",
                          "Standard Certificate of Airworthiness (SCoA) support",
                          "Airworthiness approval alignment and FAA coordination",
                          "Executive-level certification briefings"
                        ],
                        [
                          "PMA and TSO certification support and compliance alignment",
                          "Design and production approval support",
                          "Test planning, analysis, and compliance validation"
                        ],
                        [
                          "CIP and PSCP development and alignment",
                          "Program Letter and Agent Letter preparation",
                          "Certification processes and procedures definition",
                          "Flight test support and documentation"
                        ]
                      ][activeTab].map((item, i) => (
                        <li key={i} className="flex gap-4 group">
                           <div className="mt-1.5 w-1.5 h-1.5 bg-gold rounded-full shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                           <p className="text-white/60 text-lg leading-relaxed group-hover:text-white transition-colors uppercase tracking-wider text-xs font-bold">
                              {item}
                           </p>
                        </li>
                      ))}
                   </ul>
                   
                   <button className="flex items-center gap-2 text-gold text-xs font-bold tracking-[0.2em] uppercase group/link border-b border-gold/20 pb-2 hover:border-gold transition-all">
                        Request Program Briefing <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                   </button>
                </div>
              </motion.div>
              
              {/* Glass Overlays for Elite Feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 blur-[80px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Cinematic Footer CTA */}
      <section className="py-24 px-6 text-center bg-black relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1464039397811-476f652a3b71?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale" />
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
