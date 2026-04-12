"use client";

import { motion } from "framer-motion";

export default function CinematicSection() {
  return (
    <section className="relative w-full py-32 md:py-48 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Image with Fade Edges */}
      <div className="relative w-full max-w-[1400px] aspect-[21/9] rounded-sm overflow-hidden group">
        <motion.div
           initial={{ scale: 1.1, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: "easeOut" as any }}
           className="w-full h-full bg-cover bg-center"
           style={{ backgroundImage: "url('/jet-section.png')" }}
        />
        
        {/* Soft Fade Edges (Gradients) */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_40px_rgba(0,0,0,0.8)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.5 }}
           className="p-8 border border-white/10 backdrop-blur-md bg-black/20 rounded-sm"
         >
           <h3 className="text-2xl md:text-3xl font-serif italic text-white/90">
             "Precision in detail. Authority in certification."
           </h3>
           <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
         </motion.div>
      </div>
    </section>
  );
}
