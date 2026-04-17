"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-start pt-36 lg:justify-center lg:pt-0 px-6 md:px-12 lg:px-24 pb-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      
      {/* Overlay Gradient */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)" 
        }}
      />

      <div className="relative z-20 max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-0 lg:pt-32 pb-20 lg:pb-0">
        {/* Left Content */}
        <motion.div 
          className="lg:col-span-7 px-2 md:px-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="text-gold font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
              FAA AIRWORTHINESS AUTHORITY • 30+ YEARS EXPERIENCE
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6 max-w-2xl"
          >
            Full-Spectrum FAA Certification Support
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed font-sans"
          >
            We provide elite-level regulatory expertise for advanced aerospace programs, from clean-sheet designs to full-scale production certification.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gold text-black font-bold rounded-sm border border-gold hover:bg-white hover:border-white transition-all duration-300">
              Request Consultation
            </button>
            <button className="px-8 py-4 bg-black/40 text-white font-bold rounded-sm border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Start Your Certification Assessment
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side Glass Card */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" as any }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="glass p-8 md:p-10 rounded-sm w-full max-w-[400px] border-gold/30">
            <h3 className="text-gold font-serif text-2xl font-bold mb-8 tracking-wide border-b border-gold/20 pb-4">
              FAA CERTIFICATION AUTHORITY
            </h3>
            <ul className="space-y-4">
              {[
                "TIA • TC • PC • STC",
                "Experimental (R&D • Show Comp • Market Survey • Crew Training) • SCoA",
                "MRA • Export",
                "PMA • 14 CFR §21.137",
                "Conformity • Flight Test • Certification Execution",
                "CTOL • Advanced Air Mobility (eVTOL)"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-gold/20 p-1 rounded-full">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-lg font-medium text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom Metrics Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            "30+ Years Aviation Experience",
            "18 Years Certification Experience",
            "Clean-Sheet to Production"
          ].map((metric, idx) => (
            <div key={idx} className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-1 h-8 bg-gold" />
              <span className="text-sm md:text-base font-bold tracking-widest uppercase text-white/80">
                {metric}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
