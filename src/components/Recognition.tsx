"use client";

import { motion } from "framer-motion";
import { Award, Star, Zap, ShieldCheck } from "lucide-react";

interface MilestoneProps {
  badge: string;
  badgeIcon: any;
  title: string;
  titleGold: string;
  description: string;
  quote: string;
  footer: string;
  image: string;
  objectPos: string;
  reverse?: boolean;
}

function Milestone({ badge, badgeIcon: BadgeIcon, title, titleGold, description, quote, footer, image, objectPos, reverse = false }: MilestoneProps) {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-20">
      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}
      >
        <div className="flex items-center gap-2 mb-8 text-gold">
          <BadgeIcon className="w-5 h-5 fill-gold/20" />
          <span className="font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase">
            {badge}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8">
          {title} <br /> 
          <span className="text-gold">{titleGold}</span>
        </h2>

        <div className="w-16 h-1 bg-gold mb-10" />

        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-sans">
          {description}
        </p>

        <p className="text-white/50 text-base leading-relaxed mb-10 italic font-serif">
          "{quote}"
        </p>

        <div className="flex items-center gap-6 pt-6 border-t border-white/10">
          <Award className="w-10 h-10 text-gold shrink-0" />
          <p className="text-sm font-bold uppercase tracking-widest text-white/40">
            {footer}
          </p>
        </div>
      </motion.div>

      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={`relative group lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}
      >
        {/* Decorative Frames */}
        <div className="absolute -inset-4 border border-gold/20 rounded-sm pointer-events-none transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-gold/40 rounded-sm pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-gold/40 rounded-sm pointer-events-none" />

        <div className="relative z-10 aspect-video lg:aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-black/50 bg-zinc-900 mx-auto">
          <img 
            src={image} 
            alt={title} 
            className={`w-full h-full object-cover grayscale-0 contrast-110 transition-all duration-700 group-hover:scale-110 ${objectPos}`}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Recognition() {
  const milestones = [
    {
      badge: "ELITE COMMENDATION",
      badgeIcon: Star,
      title: "Recognized at the",
      titleGold: "Highest Level",
      description: "Personally recognized by Mr. Michimasa Fujino (Founder and CEO of HondaJet) for airworthiness authority and execution on one of the most advanced clean-sheet aircraft programs in modern aviation.",
      quote: "From certification strategy to execution — delivered at the level where decisions define programs.",
      footer: "Awarded for direct contribution to certification execution within the HondaJet program.",
      image: "/hondajet-award.png",
      objectPos: "object-[95%_center]",
      reverse: false
    },
    {
      badge: "FUTURE OF FLIGHT",
      badgeIcon: Zap,
      title: "Pioneering the Future of",
      titleGold: "Electric Aviation",
      description: "Partnering with Beta Technologies to navigate the complex regulatory roadmaps of eVTOL/eCTOL and zero-emission flight systems.",
      quote: "Defining the standards for the next generation of flight — from special airworthiness to full-scale type certification.",
      footer: "Collaborating on major certification milestones for the ALIA electric aircraft with Kyle Clark (Founder and CEO of BETA Technology).",
      image: "/beta-certification.png",
      objectPos: "object-[50%_center] scale-125",
      reverse: true
    }
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden border-y border-white/5">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[15rem] font-serif italic whitespace-nowrap">Airworthiness</h2>
      </div>

      <div className="flex flex-col gap-32 relative z-10">
        <div className="text-center mb-10">
           <h2 className="text-gold font-bold tracking-[0.4em] text-xs uppercase mb-4">Commanding Authority</h2>
           <h3 className="text-4xl md:text-5xl font-serif font-bold">Industry-Defining Milestones</h3>
        </div>

        {milestones.map((milestone, idx) => (
          <Milestone key={idx} {...milestone} />
        ))}
      </div>
    </section>
  );
}
