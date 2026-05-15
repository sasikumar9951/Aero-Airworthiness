"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronRight, Activity, FileCheck, ClipboardList, ShieldAlert, X } from "lucide-react";
import IntakeForm from "./IntakeForm";
import DocumentUpload from "./DocumentUpload";
import SmartChecks from "./SmartChecks";
import FormPreview from "./FormPreview";

const steps = [
  { id: "intake", label: "Client Intake", icon: ClipboardList },
  { id: "upload", label: "Evidence Upload", icon: Activity },
  { id: "analysis", label: "Smart Analysis", icon: ShieldAlert },
  { id: "review", label: "DAR Review", icon: FileCheck },
];

const ConformityPortal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
   const [formData, setFormData] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isFinalized, setIsFinalized] = useState(false);

  const updateData = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalApprove = () => {
    setIsFinalized(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-white/10 shadow-[0_0_100px_rgba(212,175,55,0.1)] rounded-sm overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-black">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-sm border border-gold/20">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight">Conformity Command Center</h2>
              <p className="text-[10px] text-gold font-bold tracking-[0.2em] uppercase">AI-Driven Regulatory Infrastructure</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 transition-colors rounded-full"
          >
            <X className="w-6 h-6 text-white/40" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 md:px-12 py-6 bg-zinc-900/30 border-b border-white/5">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center gap-2 transition-all ${idx <= currentStep ? "opacity-100" : "opacity-30"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  idx < currentStep ? "bg-gold border-gold text-black" : 
                  idx === currentStep ? "border-gold text-gold" : "border-white/20 text-white"
                }`}>
                  {idx < currentStep ? <FileCheck className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          {isFinalized ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-8"
            >
               <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <FileCheck className="w-12 h-12 text-green-500" />
               </div>
               <div>
                  <h3 className="text-3xl font-serif font-bold mb-4">Package Finalized</h3>
                  <p className="text-white/60 max-w-md mx-auto text-sm leading-relaxed">
                    The FAA Conformity Package for {formData.projectName || "Project Alpha"} has been reviewed and approved by the DAR logic. Forms 8100-1 and 8130-3 are now locked and ready for official submission.
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all text-sm">
                    Download Full Package (.ZIP)
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-10 py-4 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-sm"
                  >
                    Return to Platform
                  </button>
               </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && <IntakeForm data={formData} updateData={updateData} onNext={handleNext} />}
                {currentStep === 1 && <DocumentUpload uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} onNext={handleNext} onBack={handleBack} />}
                {currentStep === 2 && <SmartChecks data={formData} uploadedFiles={uploadedFiles} onNext={handleNext} onBack={handleBack} />}
                {currentStep === 3 && <FormPreview data={formData} onApprove={handleFinalApprove} onBack={handleBack} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-8 py-4 bg-black border-t border-white/10 flex justify-between items-center text-[10px] text-white/30 font-mono">
           <span>ENCRYPTED SESSION ID: AES-256-SHA384</span>
           <span>LOGGED AS: DAR-REPRESENTATIVE-AUTH</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ConformityPortal;
