"use client";

import { motion } from "framer-motion";
import { History, Shield, Users, Award, Plane } from "lucide-react";
import SubPageHero from "@/components/SubPageHero";
import Recognition from "@/components/Recognition";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <SubPageHero
        badge="ESTABLISHED 2008"
        title="Decades of Regulatory Command."
        subtitle="A heritage built on integrity, authority, and the safe integration of revolutionary aerospace technologies."
        image="/about-hero.png"
        position="bg-[center_60%]"
      />

      {/* Heritage Narrative Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] overflow-hidden border border-white/10 rounded-sm">
            <img
              src="/founder-portrait.png"
              alt="Sasikumar - Founder and Lead FAA Delegate"
              className="w-full h-full object-cover object-top contrast-110 brightness-90 transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gold/5 mix-blend-multiply" />
            <div className="absolute top-12 left-12">
              <p className="text-gold font-serif text-6xl font-bold opacity-20">2008</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-2">
              <History className="w-4 h-4" /> THE MISSION
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8">Authority Defined by <br />Experience.</h3>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Aero Airworthiness was founded by veteran delegates who recognized a critical gap in the aerospace market: the lack of clear, authoritative leadership in the certification process.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Over the last 30 years, we have transitioned from traditional manufacturing to the frontier of electric flight and autonomous systems. Our mission remains unchanged: to provide the authority required to make flight possible.
            </p>

            {/* Technical Sketch Inset */}
            <div className="hidden lg:block absolute -right-24 -bottom-16 w-64 aspect-[3/4] border border-white/10 rounded-sm overflow-hidden shadow-2xl rotate-3 group hover:rotate-0 transition-transform duration-700">
              <img
                src="/clean-sheet-sketch.png"
                alt="Legacy Clean Sheet Draft"
                className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all"
              />
              <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
            </div>

            <div className="p-8 border-l-2 border-gold bg-white/5 italic font-serif text-xl opacity-90 relative z-10 mb-12">
              "We don't just follow the regulations—we have been defining them for three decades."
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-[16/9] border border-white/10 rounded-sm overflow-hidden bg-zinc-950 shadow-2xl"
            >
              <img
                src="/clean-sheet-aircraft-blueprint.png"
                alt="Clean-Sheet Aircraft Design Blueprint"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gold/5 mix-blend-multiply opacity-30 shadow-inner" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Recognition />
      


      {/* Cinematic Stats Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-950 border-y border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { val: "30+", label: "Years in Aviation", icon: History },
              { val: "18", label: "Years DAR-F Authority", icon: Shield },
              { val: "50+", label: "Approved Programs", icon: Plane },
              { val: "12", label: "Elite FAA Commendations", icon: Award }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <p className="text-5xl font-serif font-bold text-white mb-2">{stat.val}</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values: Cinematic Narrative */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto text-center mb-24">
          <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-6">OUR COMMAND</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold max-w-2xl mx-auto">Elite Specialist Collective</h3>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            { title: "DAR-F Delegates", d: "Senior-most authority level for technical and production certification approvals." },
            { title: "DER Specialists", d: "Deep engineering delegation for structures, systems, and software compliance." },
            { title: "Quality Systems", d: "Architects of 14 CFR §21.137 compliant manufacturing environments." }
          ].map((value, i) => (
            <div key={i} className="p-12 glass border-white/5 hover:border-gold/30 transition-all duration-500 rounded-sm group">
              <h4 className="text-2xl font-serif font-bold mb-6 group-hover:text-gold transition-colors">{value.title}</h4>
              <p className="text-white/40 leading-relaxed text-sm">{value.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
