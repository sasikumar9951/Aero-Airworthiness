"use client";

import { motion } from "framer-motion";

interface SubPageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
}

export default function SubPageHero({ title, subtitle, badge, image }: SubPageHeroProps) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-24">
      {/* Background Image with Zoom Animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Cinematic Overlay Gradient */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)" 
        }}
      />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #C5A059 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-20 max-w-[1200px] w-full mx-auto">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: "easeOut" as any }}
        >
          {badge && (
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase">
                {badge}
              </span>
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-[1.05] max-w-4xl">
            {title}
          </h1>
          
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 mt-12">
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-sans border-l-2 border-gold/30 pl-8">
              {subtitle}
            </p>
            
            <div className="flex gap-6 pb-2">
               <div className="text-center">
                  <p className="text-gold font-serif text-3xl font-bold">100%</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Authority</p>
               </div>
               <div className="w-[1px] h-12 bg-white/10" />
               <div className="text-center">
                  <p className="text-gold font-serif text-3xl font-bold">DAR-F</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Delegation</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent z-20" />
    </section>
  );
}
