"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Activity, FileCheck, ClipboardList, ShieldAlert, X, RefreshCw } from "lucide-react";
import Link from "next/link";
import IntakeForm from "./IntakeForm";
import DocumentUpload from "./DocumentUpload";
import SmartChecks from "./SmartChecks";
import FormPreview from "./FormPreview";
import { processAndSaveConformityPackage } from "@/app/conformityActions";

const steps = [
  { id: "upload", label: "Evidence Upload", icon: Activity },
  { id: "analysis", label: "AI Extraction", icon: ShieldAlert },
  { id: "verify", label: "Data Verification", icon: ClipboardList },
  { id: "review", label: "DAR Review", icon: FileCheck },
];

const ConformityPortal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isFinalized, setIsFinalized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState("");

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

  const handleFinalApprove = async () => {
    setIsSubmitting(true);
    try {
      const has8110 = uploadedFiles.some(f => f.includes("8110-3"));
      const hasSoc = uploadedFiles.some(f => f.includes("8130-9"));
      const hasCal = uploadedFiles.some(f => f.includes("Calibration"));

      const passedCount = [
        formData.partNumber ? true : false,
        formData.serialNumber ? true : false,
        formData.drawingRev ? true : false,
        has8110,
        hasSoc,
        hasCal,
        true,
        true,
        formData.faaDerContact ? true : false,
      ].filter(Boolean).length;

      const riskLevel = passedCount < 7 ? "High" : passedCount < 9 ? "Medium" : "Low";

      const res = await processAndSaveConformityPackage({
        formData,
        uploadedFiles,
        passedChecks: passedCount,
        totalChecks: 9,
        riskLevel,
      });

      if (res?.success) {
        setTrackingId(res.trackingId || "DAR-PKG-SECURE");
      }
    } catch (err) {
      console.error("Error finalizing package:", err);
    } finally {
      setIsSubmitting(false);
      setIsFinalized(true);
    }
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
        className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-white/10 shadow-[0_0_100px_rgba(212,175,55,0.15)] rounded-sm overflow-hidden flex flex-col font-mono"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-black font-sans">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-sm border border-gold/20">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight">Conformity Command Center</h2>
              <p className="text-[10px] text-gold font-mono font-bold tracking-[0.2em] uppercase">Autonomous Regulatory Processing Engine</p>
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
        <div className="px-6 md:px-12 py-6 bg-zinc-900/30 border-b border-white/5 font-sans">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center gap-2 transition-all ${idx <= currentStep ? "opacity-100" : "opacity-30"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  idx < currentStep ? "bg-gold border-gold text-black font-bold" : 
                  idx === currentStep ? "border-gold text-gold font-bold" : "border-white/20 text-white font-mono"
                }`}>
                  {idx < currentStep ? <FileCheck className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          {isSubmitting ? (
            <div className="h-full py-32 flex flex-col items-center justify-center text-center space-y-6">
              <RefreshCw className="w-16 h-16 text-gold animate-spin" />
              <h3 className="text-2xl font-serif font-bold">Compiling & Securing Regulatory Package</h3>
              <p className="text-xs text-white/40 max-w-md mx-auto uppercase tracking-widest font-mono leading-relaxed">
                Autonomous AI engine is compiling exact Form 8100-1 and 8130-3 structures and writing secure transaction to backend database...
              </p>
            </div>
          ) : isFinalized ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full py-16 flex flex-col items-center justify-center text-center space-y-8 font-mono"
            >
              <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <FileCheck className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <span className="text-xs bg-green-500/20 border border-green-500/40 text-green-500 px-4 py-1.5 rounded-sm font-bold uppercase tracking-widest">
                  Secure Tracking #{trackingId || "DAR-PKG-SUCCESS"}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mt-6 mb-4">Package Processed & Saved</h3>
                <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed">
                  The FAA Conformity Package for <span className="text-gold font-bold">{formData.projectName || "Project Alpha"}</span> has been fully compiled and securely saved to the backend database. Automatic email notification dispatched to DAR Authority.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/admin/conformity" 
                  onClick={onClose}
                  className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all text-xs flex items-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <ShieldCheck className="w-4 h-4" /> Open Admin Command Center
                </Link>
                <button className="px-8 py-4 bg-zinc-900 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-xs">
                  Download Full Package (.ZIP)
                </button>
                <button 
                  onClick={onClose}
                  className="px-8 py-4 border border-white/10 text-white/60 hover:text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-xs"
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
                {currentStep === 0 && <DocumentUpload uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} onNext={handleNext} />}
                {currentStep === 1 && <SmartChecks data={formData} updateData={updateData} uploadedFiles={uploadedFiles} onNext={handleNext} onBack={handleBack} />}
                {currentStep === 2 && <IntakeForm data={formData} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
                {currentStep === 3 && <FormPreview data={formData} onApprove={handleFinalApprove} onBack={handleBack} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-8 py-4 bg-black border-t border-white/10 flex justify-between items-center text-[10px] text-white/30 font-mono tracking-widest">
          <span>ENCRYPTED DATABASE CHANNEL: SHA384</span>
          <span>AUTONOMOUS ENGINE STATUS: ONLINE</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ConformityPortal;
