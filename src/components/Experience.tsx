"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, History } from "lucide-react";
import Link from "next/link";

export default function Experience() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-gold font-bold tracking-[0.2em] text-sm uppercase mb-4 flex justify-center items-center gap-2">
            <History className="w-4 h-4" /> OUR DIFFERENTIATOR
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold">Unrivaled Aviation Pedigree</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "30+ Years Authority",
              value: "30+",
              desc: "Three decades of deep engagement with FAA regulatory frameworks and policy development.",
              icon: History
            },
            {
              title: "18 Years Certification",
              value: "18",
              desc: "Specialized certification leadership across 150+ successful aerospace projects.",
              icon: Award
            },
            {
              title: "Clean-Sheet to Production",
              value: "End-to-End",
              desc: "A proven track record of taking complex aerospace concepts through full production certification.",
              icon: Briefcase
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div className="mb-8 border-l-4 border-gold pl-6 py-2">
                <span className="text-5xl font-serif font-black text-gold/20 group-hover:text-gold transition-colors duration-500">
                  {item.value}
                </span>
                <h4 className="text-xl font-bold font-serif -mt-4">{item.title}</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-1">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-aviation-blue rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <h4 className="text-2xl font-serif font-bold mb-4 italic">"We don't just follow the regulations. We help the FAA define how they apply to the future of flight."</h4>
            <div className="w-12 h-1 bg-gold mb-4" />
            <p className="text-white/50 text-sm uppercase font-bold tracking-widest">Senoir Authority Delegate</p>
          </div>
          <Link href="/contact" className="relative z-10 px-8 py-4 bg-gold text-black font-bold rounded-sm border border-gold hover:bg-white transition-all duration-300 whitespace-nowrap text-center">
            Request Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
