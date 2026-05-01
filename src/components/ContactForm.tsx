"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Shield, CheckCircle } from "lucide-react";

interface ContactFormProps {
  standalone?: boolean;
}

export default function ContactForm({ standalone = true }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@aeroairworthiness.com", {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        setSubmitStatus("success");
        e.currentTarget.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="text-lg text-white/60 leading-relaxed mb-12">
            <p className="mb-4">
              For executive-level consultation regarding DAR-F authority FAA, CERTIFICATION AUTHORITY
            </p>
            <ul className="space-y-1 text-base text-white/70">
              <li>TIA • TC • PC • STC</li>
              <li>Experimental (R&D • Show Comp • Market Survey • Crew Training) • SCoA</li>
              <li>MRA • Export</li>
              <li>PMA • 14 CFR §21.137</li>
              <li>Conformity • Flight Test • Certification Execution</li>
              <li>eVTOL/eCTOL • Advanced Air Mobility</li>
            </ul>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                 <MapPin className="w-6 h-6 text-gold" />
               </div>
               <div>
                 <p className="text-sm font-bold uppercase tracking-widest text-white/30">Headquarters</p>
                 <p className="font-serif text-white">North Carolina Greensboro USA</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                 <Phone className="w-6 h-6 text-gold" />
               </div>
               <div>
                 <p className="text-sm font-bold uppercase tracking-widest text-white/30">Direct Multi-Line</p>
                 <p className="font-serif text-white">+1 (336) 370-5825</p>
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
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="New Certification Assessment Request" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 placeholder:text-white/10" 
                placeholder="PRINCIPAL REPRESENTATIVE" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 placeholder:text-white/10" 
                placeholder="AUTHORITY@COMPANY.AERO" 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Company / Organization</label>
            <input 
              type="text" 
              name="company"
              className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 placeholder:text-white/10" 
              placeholder="AEROSPACE TECHNOLOGIES INC." 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Certification Goal</label>
            <div className="relative">
              <select name="certification_goal" className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 appearance-none cursor-pointer">
                <option value="New Production Certificate (PC)" className="bg-zinc-900">New Production Certificate (PC)</option>
                <option value="Experimental Authority (SCoA)" className="bg-zinc-900">Experimental Authority (SCoA)</option>
                <option value="Parts Manufacturer Approval (PMA)" className="bg-zinc-900">Parts Manufacturer Approval (PMA)</option>
                <option value="Technical Standard Order (TSO)" className="bg-zinc-900">Technical Standard Order (TSO)</option>
                <option value="Other / Full Program Support" className="bg-zinc-900">Other / Full Program Support</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <Shield className="w-4 h-4 opacity-50" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Project Details & Mission Scope</label>
            <textarea 
              name="project_details"
              required
              className="w-full p-4 bg-white/5 border border-white/10 text-white focus:border-gold outline-none transition-all duration-300 h-32 placeholder:text-white/10 resize-none" 
              placeholder="Brief description of your certification requirements..." 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-gold text-black font-bold flex items-center justify-center gap-3 hover:bg-white transition-all duration-500 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send className={`w-4 h-4 ${!isSubmitting && 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} /> 
            {isSubmitting ? "INITIALIZING..." : "INITIALIZE ASSESSMENT"}
          </button>
          
          {submitStatus === "success" && (
            <div className="p-4 bg-green-500/20 border border-green-500/50 text-green-400 text-sm text-center rounded-sm font-medium tracking-wide">
              Your assessment request has been securely transmitted. We will be in touch shortly.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-400 text-sm text-center rounded-sm font-medium tracking-wide">
              An error occurred while transmitting your request. Please try again.
            </div>
          )}

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
