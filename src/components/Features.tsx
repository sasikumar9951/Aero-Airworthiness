"use client";

import { motion } from "framer-motion";
import { Shield, Target, Briefcase, Zap } from "lucide-react";

const features = [
  {
    title: "Certification Strategy & Regulatory Execution",
    icon: Shield,
    points: [
      "Certification roadmap development aligned with FAA certification basis and program objectives",
      "Early identification and mitigation of certification, conformity, and compliance risks",
      "Regulatory strategy for advanced and novel aircraft technologies",
      "Direct engagement support with FAA and international authorities"
    ]
  },
  {
    title: "Engineering & Certification Execution",
    icon: Target,
    points: [
      "DAR-F engineering oversight aligned with FAA certification requirements",
      "Flight test execution support, including safety oversight and data validation",
      "Design approval support for TC and STC programs, including conformity and compliance alignment",
      "Technical Standard Order (TSO) certification support and compliance integration"
    ]
  },
  {
    title: "Production & Quality System Control",
    icon: Briefcase,
    points: [
      "Establishment and support of Production Certificate (PC) systems aligned with FAA requirements",
      "PMA quality system development, implementation, and audit readiness",
      "Full compliance with 14 CFR §21.137 quality system requirements",
      "Supplier quality control and oversight to ensure traceability and regulatory compliance"
    ]
  },
  {
    title: "Program Execution & Certification Acceleration",
    icon: Zap,
    points: [
      "Structured certification workflows designed to reduce delays and maintain regulatory alignment",
      "Execution within FAA delegation authority to support efficient certification and approval timelines",
      "End-to-end program support from clean-sheet development through production certification",
      "Airworthiness support across Experimental and Standard Certificates of Airworthiness (SCoA)"
    ]
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            What You Get — Not Just What We Do
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-aviation-blue p-8 rounded-lg shadow-2xl border-t-4 border-gold group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col"
            >
              <div className="mb-6 bg-gold/10 w-fit p-3 rounded-sm group-hover:bg-gold transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-gold group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-6">
                {feature.title}
              </h3>
              <ul className="space-y-4">
                {feature.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-sm text-gray-400 leading-tight">
                    <span className="text-gold font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
