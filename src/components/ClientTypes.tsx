"use client";

import { motion } from "framer-motion";
import { Plane, Rocket, Settings, Users } from "lucide-react";

const clients = [
  { name: "Global OEMs", icon: Settings, desc: "Tier-1 aircraft manufacturers seeking production certification." },
  { name: "eVTOL/eCTOL Startups", icon: Rocket, desc: "Next-gen mobility companies with clean-sheet designs." },
  { name: "MRO Facilities", icon: Plane, desc: "Maintenance organizations requiring STC and PMA authority." },
  { name: "Defense Programs", icon: Users, desc: "Advanced aerospace programs for government initiatives." },
];

export default function ClientTypes() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-50 text-black">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-gold font-bold tracking-[0.2em] text-sm uppercase mb-4">WHO WE SERVE</h2>
          <h3 className="text-4xl font-serif font-bold">Certification Partners for Every Tier</h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-white border border-black/5 hover:border-gold/50 transition-all duration-300 rounded-sm text-center group"
            >
              <div className="mb-6 mx-auto w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                <client.icon className="w-8 h-8 text-black/20 group-hover:text-gold transition-colors duration-300" />
              </div>
              <h4 className="text-lg font-bold font-serif mb-3">{client.name}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{client.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-150">
           {/* Mock logos */}
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-black rounded-sm" />
                <span className="text-xs font-bold tracking-tighter uppercase">AEROSPACE CO</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
