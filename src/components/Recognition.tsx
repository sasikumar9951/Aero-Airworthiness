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
  capabilities?: { title: string; desc: string }[];
  aspect?: string;
  fit?: "cover" | "contain";
}

function Milestone({ 
  badge, 
  badgeIcon: BadgeIcon, 
  title, 
  titleGold, 
  description, 
  quote, 
  footer, 
  image, 
  objectPos, 
  reverse = false,
  capabilities,
  aspect = "lg:aspect-[4/5]",
  fit = "cover"
}: MilestoneProps) {
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

        {capabilities && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12 border-l border-white/10 pl-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="group/cap">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-2 group-hover/cap:text-gold transition-colors">
                  {cap.title}
                </h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        )}

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

        <div className={`relative z-10 aspect-video ${aspect} overflow-hidden rounded-sm shadow-2xl shadow-black/50 bg-zinc-900 mx-auto`}>
          <img 
            src={image} 
            alt={title} 
            className={`w-full h-full ${fit === "cover" ? "object-cover" : "object-contain p-4"} grayscale-0 contrast-110 transition-all duration-700 group-hover:scale-110 ${objectPos} ${image.includes('partnership') ? 'scale-125' : ''}`}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Recognition() {
  const milestones: MilestoneProps[] = [
    {
      badge: "ELITE COMMENDATION",
      badgeIcon: Star,
      title: "Recognized at the",
      titleGold: "Highest Level",
      description: "Personally recognized by Mr. Michimasa Fujino (Founder and CEO of HondaJet) for airworthiness authority and execution on one of the most advanced clean-sheet aircraft programs in modern aviation.",
      quote: "From certification strategy to execution — delivered at the level where decisions define programs.",
      footer: "AWARDED FOR DIRECT CONTRIBUTION TO CERTIFICATION EXECUTION WITHIN THE HONDAJET PROGRAM.",
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
      footer: "COLLABORATING ON MAJOR CERTIFICATION MILESTONES FOR THE ALIA ELECTRIC AIRCRAFT WITH KYLE CLARK (FOUNDER AND CEO OF BETA TECHNOLOGY).",
      image: "/beta-certification.png",
      objectPos: "object-center",
      reverse: false,
      aspect: "lg:aspect-[4/5]",
      fit: "cover"
    },
    {
      badge: "PROPULSION INNOVATION",
      badgeIcon: Zap,
      title: "Defining the Future of",
      titleGold: "Quiet Propulsion",
      description: "Strategic partnership with Whisper Aero to establish the certification roadmap for ultra-quiet, high-efficiency electric propulsion systems.",
      capabilities: [
        { title: "FAA Designer Certification", desc: "Seamlessly integrating Whisper Aero's innovations with FAA standards." },
        { title: "Flight Test Expertise", desc: "Comprehensive flight monitoring, data analysis, and validation." },
        { title: "Innovation Safety Assurance", desc: "Delivering the highest level of regulatory confidence in eVTOL propulsion." },
        { title: "Special Airworthiness", desc: "Expediting the route to first flight through targeted certification strategies." }
      ],
      quote: "Quiet propulsion is the prerequisite for urban aviation. We are building the regulatory bridge to make it a reality.",
      footer: "DELIVERING WHISPER AERO’S FIRST SPECIAL AIRWORTHINESS CERTIFICATION.",
      image: "/whisper-aero-partnership.png",
      objectPos: "object-right",
      reverse: false,
      aspect: "lg:aspect-[3/4]",
      fit: "cover"
    },
    {
      badge: "PMA EXCELLENCE",
      badgeIcon: ShieldCheck,
      title: "Authority in High-Performance",
      titleGold: "Braking Systems",
      description: "Direct regulatory oversight and PMA certification leadership for Beringer Aero's industry-leading wheel and braking technologies.",
      capabilities: [
        { title: "PMA Certification", desc: "Expert guidance and audit readiness for high-performance braking systems." },
        { title: "Data Traceability Control", desc: "Ensuring every component meets stringent FAA quality standards." },
        { title: "Reliability Analysis", desc: "Solid approach with technical validation for mission-critical hardware." },
        { title: "Supply Chain Optimization", desc: "Streamlining certification to ensure global supply chain resilience." }
      ],
      quote: "From first touchdown to final stop, we ensure that every component meets the highest standards of safety and compliance.",
      footer: "DRIVING BERINGER AERO’S PMA CERTIFICATION & FAA AUDIT READINESS.",
      image: "/beringer-pma-partnership.png",
      objectPos: "object-right",
      reverse: false,
      aspect: "lg:aspect-[3/4]",
      fit: "cover"
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

