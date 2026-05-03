"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Globe, Shield, Clock } from "lucide-react";
import SubPageHero from "@/components/SubPageHero";

export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <SubPageHero 
        badge="SECURE CHANNEL"
        title="Direct Authority Access."
        subtitle="Initialize your certification program with senior DAR-F delegates and regulatory specialists."
        image="/contact-hero.png"
      />

      {/* Contact Cards: Glassmorphism */}
      <section className="px-6 md:px-12 lg:px-24 mb-24 relative z-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32">
            {[
              { label: "Executive Email", val: "info@aeroairworthiness.com", icon: Mail, href: "mailto:info@aeroairworthiness.com" },
              { label: "DAR-F Phone", val: "+1 (336) 370-5825", icon: Phone, href: "tel:+13363705825" },
              { label: "HQ Operations", val: "North Carolina Greensboro USA", icon: MapPin },
              { label: "Authority Desk", val: "Global Scope", icon: Globe },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.8 }}
                className="p-10 glass border-gold/20 hover:border-gold transition-all duration-500 rounded-sm group shadow-2xl"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-10 group-hover:bg-gold/20 transition-colors">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-3">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-serif text-xl text-white group-hover:text-gold transition-colors block">
                    {item.val}
                  </a>
                ) : (
                  <p className="font-serif text-xl text-white group-hover:text-gold transition-colors">{item.val}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Authority Banner */}
      <section className="px-6 md:px-12 lg:px-24 mb-12 relative z-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative w-full overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-zinc-900">
            <img 
              src="/production-authority.png" 
              alt="Production Certification Authority" 
              className="w-full h-auto grayscale brightness-90 hover:brightness-100 transition-all duration-700 block"
            />
            <div className="absolute inset-0 bg-gold/5 mix-blend-multiply pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Form Section: Cinematic Layout */}
      <section className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Abstract background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 relative z-10">
          <div className="lg:col-span-4">
             <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-8">PROGRAM INQUIRY</h2>
             <h3 className="text-4xl font-serif font-bold mb-8">Initiate Certification.</h3>
             <p className="text-white/40 leading-relaxed mb-12">
                Our intake process is designed for high-intensity aerospace programs requiring immediate regulatory clarity and DAR-F delegation.
             </p>
             
             <div className="space-y-8">
                <div className="flex gap-4">
                   <Shield className="w-5 h-5 text-gold shrink-0" />
                   <div>
                      <h4 className="font-serif font-bold mb-1">DAR-F Integration</h4>
                      <p className="text-xs text-white/40 leading-relaxed">Direct communication with your MIDO/ACO office.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <Clock className="w-5 h-5 text-gold shrink-0" />
                   <div>
                      <h4 className="font-serif font-bold mb-1">Priority Review</h4>
                      <p className="text-xs text-white/40 leading-relaxed">Assessment briefing scheduled within 24 hours of inquiry.</p>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="lg:col-span-8">
             <ContactForm standalone={false} />
          </div>
        </div>
      </section>

      {/* Global Map Footer: High Tech */}
      <section className="py-32 bg-zinc-950 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold mb-16">Global Authority Network</h2>
            <div className="relative aspect-video max-w-5xl mx-auto overflow-hidden grayscale brightness-50 contrast-125 border border-white/10 group">
               <img 
                 src="/map-img.png" 
                 alt="Global Connectivity" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s] opacity-60"
               />
               <div className="absolute inset-0 bg-gold/10 mix-blend-multiply" />
               <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gold rounded-full animate-ping" />
               <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-gold rounded-full animate-ping delay-700" />
            </div>
        </div>
      </section>
    </main>
  );
}
