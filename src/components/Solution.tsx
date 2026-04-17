"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Solution() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gold text-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex flex-col mx-auto max-w-[600px]">
              <div className="relative aspect-square w-full border-4 border-black/10 rounded-sm p-4">
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
                <img 
                  src="/solution-img.png" 
                  alt="Engineering Authority" 
                  className="w-full h-full object-cover grayscale contrast-100 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="mt-6 text-center font-serif text-lg md:text-xl font-bold tracking-wider text-black/70">
                Precision in detail. Authority in certification.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-black/60 font-bold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> THE AERO SOLUTION
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
              Authority-Driven Certification. <br />
              <span className="text-black/50">From Concept to Canopy.</span>
            </h3>
            
            <div className="space-y-8">
              {[
                {
                  title: "Direct FAA DAR-F Delegation",
                  desc: "We provide direct delegation authority, bypassing traditional bureaucratic queues to accelerate your approval timeline."
                },
                {
                  title: "End-to-End Compliance Ownership",
                  desc: "We don't just advise; we own the certification process, integrating with your engineering team to ensure every rivet meets 14 CFR standards."
                },
                {
                  title: "Proven Aerospace Pedigree",
                  desc: "With 30+ years of airworthiness authority, we provide the credibility your program needs with regulatory bodies worldwide."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-black/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
