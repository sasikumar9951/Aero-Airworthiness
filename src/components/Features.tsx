"use client";

import { motion } from "framer-motion";
import { Shield, Target, Briefcase, Zap } from "lucide-react";

const features = [
  {
    title: "Strategic Compliance",
    icon: Shield,
    points: [
      "Customized FAA certification roadmaps",
      "Risk assessment and mitigation planning",
      "Regulatory strategy for novel technologies",
      "Liaison with FAA and EASA authorities"
    ]
  },
  {
    title: "Technical Excellence",
    icon: Target,
    points: [
      "DAR-F engineering oversight",
      "Flight test safety and data analysis",
      "Design approval (TC/STC) support",
      "Technical standard order (TSO) guidance"
    ]
  },
  {
    title: "Manufacturing Quality",
    icon: Briefcase,
    points: [
      "Production Certificate (PC) establishment",
      "PMA system development and auditing",
      "14 CFR §21.137 quality system compliance",
      "Supplier quality control oversight"
    ]
  },
  {
    title: "Program Acceleration",
    icon: Zap,
    points: [
      "Streamlined certification workflows",
      "Rapid delegation and approval paths",
      "Clean-sheet to production management",
      "Experimental and SCoA authority"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-aviation-blue p-8 rounded-lg shadow-2xl border-t-4 border-gold group hover:-translate-y-2 transition-transform duration-300"
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
