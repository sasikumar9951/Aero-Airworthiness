"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Shield, CheckCircle } from "lucide-react";

interface ContactFormProps {
  standalone?: boolean;
}

export default function ContactForm({ standalone = true }: ContactFormProps) {
  const content = (
    <div className={`max-w-[1200px] mx-auto grid grid-cols-1 ${standalone ? 'lg:grid-cols-2' : ''} gap-16`}>
      {standalone && (
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-gold font-bold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-2">
            <Mail className="w-4 h-4" /> CONTACT AUTHORITY
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8 text-white">
            Begin Your Certification Assessment.
          </h3>
          <p className="text-lg text-white/60 leading-relaxed mb-12">
            For executive-level consultation regarding DAR-F authority, 14 CFR §21.137 quality systems, or clean-sheet certification roadmaps, please submit your program details below.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                 <MapPin className="w-6 h-6 text-gold" />
               </div>
               <div>
                 <p className="text-sm font-bold uppercase tracking-widest text-white/30">Headquarters</p>
                 <p className="font-serif text-white">Aerospace Certification Center, FL</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                 <Phone className="w-6 h-6 text-gold" />
               </div>
               <div>
                 <p className="text-sm font-bold uppercase tracking-widest text-white/30">Direct Multi-Line</p>
                 <p className="font-serif text-white">+1 (555) AER-CERT</p>
               </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
         initial={standalone ? { opacity: 0, y: 50 } : { opacity: 1 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 1 }}
         className={`${standalone ? 'bg-zinc-900/50 p-8 md:p-12 border border-white/10' : ''} rounded-sm`}
      >
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Full Name</label>
              <input 
                type="text" 
                className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 placeholder:text-white/10" 
                placeholder="PRINCIPAL REPRESENTATIVE" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 placeholder:text-white/10" 
                placeholder="AUTHORITY@COMPANY.AERO" 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Company / Organization</label>
            <input 
              type="text" 
              className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 placeholder:text-white/10" 
              placeholder="AEROSPACE TECHNOLOGIES INC." 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Certification Goal</label>
            <div className="relative">
              <select className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 appearance-none cursor-pointer">
                <option className="bg-zinc-900">New Production Certificate (PC)</option>
                <option className="bg-zinc-900">Experimental Authority (SCoA)</option>
                <option className="bg-zinc-900">Parts Manufacturer Approval (PMA)</option>
                <option className="bg-zinc-900">Technical Standard Order (TSO)</option>
                <option className="bg-zinc-900">Other / Full Program Support</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <Shield className="w-4 h-4 opacity-50" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Project Details & Mission Scope</label>
            <textarea 
              className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 h-32 placeholder:text-white/10 resize-none" 
              placeholder="Brief description of your certification requirements..." 
            />
          </div>

          <button className="w-full py-5 bg-gold text-black font-bold flex items-center justify-center gap-3 hover:bg-white transition-all duration-500 group">
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            INITIALIZE ASSESSMENT
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase tracking-widest font-bold">
            <CheckCircle className="w-3 h-3 text-gold" />
            Secure Authority Channel
          </div>
        </form>
      </motion.div>
    </div>
  );

  if (!standalone) {
    return content;
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white relative overflow-hidden" id="contact">
      {/* Abstract gradients to match cinematic theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aviation-blue/20 blur-[120px] rounded-full pointer-events-none" />
      
      {content}
    </section>
  );
}
