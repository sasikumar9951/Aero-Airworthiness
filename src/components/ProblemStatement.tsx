"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, Scale } from "lucide-react";

export default function ProblemStatement() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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

        <div className="grid grid-cols-1 gap-6">
          {[
            {
              title: "Complex Compliance Mapping",
              desc: "Navigating thousands of FAA regulations (14 CFR) requires more than just reading—it requires authority-level interpretation.",
              icon: Scale
            },
            {
              title: "Certification Deadlocks",
              desc: "Clean-sheet programs often stall at the 'Experimental' stage due to lack of production-ready quality systems.",
              icon: Clock
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-8 border border-white/10 bg-white/5 rounded-sm backdrop-blur-sm"
            >
              <item.icon className="w-8 h-8 text-gold mb-6" />
              <h4 className="text-xl font-serif font-bold mb-4">{item.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
