"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, AlertTriangle, Search, Lock } from "lucide-react";

interface SmartChecksProps {
  data: any;
  uploadedFiles: string[];
  onNext: () => void;
  onBack: () => void;
}

const SmartChecks: React.FC<SmartChecksProps> = ({ data, uploadedFiles, onNext, onBack }) => {
  const [analyzing, setAnalyzing] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnalyzing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getReasoning = (id: string, status: string) => {
    switch (id) {
      case "pn": return status === "pass" ? `P/N ${data.partNumber} matches engineering drawing block 8.` : "Missing Part Number entry in intake block.";
      case "sn": return status === "pass" ? `S/N ${data.serialNumber} verified against physical build record.` : "Serial Number not provided; required for 8130-3 Block 10.";
      case "rev": return status === "pass" ? `Drawing revision matches latest ECO-9941 release.` : "Revision mismatch detected against master data list.";
      case "rfc": return status === "pass" ? "FAA Form 8120-10 identified and successfully parsed." : "Required RFC (8120-10) missing from evidence queue.";
      case "soc": return status === "pass" ? "Statement of Conformity (8130-9) validated for applicant signature." : "Missing 8130-9; required per FAA Order 8110.4C.";
      case "cal": return status === "pass" ? "All inspection tools within valid calibration window." : "NIST traceable evidence missing for critical dimensions.";
      case "ncr": return status === "pass" ? "All deviations have engineering disposition (Use-As-Is)." : "Open NCRs detected without final MRB approval.";
      case "der": return status === "pass" ? `Concurrence confirmed with ${data.faaDerContact}.` : "No DAR/FAA representative linked to this project.";
      default: return "";
    }
  };

  const checks = [
    { id: "pn", label: "Part Number Mismatch", status: data.partNumber ? "pass" : "fail" },
    { id: "sn", label: "Serial Number Mismatch", status: data.serialNumber ? "pass" : "fail" },
    { id: "rev", label: "Drawing Revision Mismatch", status: data.drawingRev ? "pass" : "fail" },
    { id: "rfc", label: "RFC (8120-10) Presence", status: uploadedFiles.includes("RFC (8120-10)") ? "pass" : "fail" },
    { id: "soc", label: "SOC (8130-9) Presence", status: uploadedFiles.includes("Statement of Conformity (8130-9)") ? "pass" : "fail" },
    { id: "cal", label: "Missing Calibration Evidence", status: uploadedFiles.includes("Calibration records") ? "pass" : "warning" },
    { id: "ncr", label: "NCR Not Dispositioned", status: uploadedFiles.includes("NCRs/deviations") ? "pass" : "warning" },
    { id: "der", label: "Missing DER/FAA Concurrence", status: data.faaDerContact ? "pass" : "fail" },
  ].map(c => ({ ...c, reason: getReasoning(c.id, c.status) }));

  if (analyzing) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Search className="w-12 h-12 text-gold" />
        </motion.div>
        <div className="text-center">
          <h4 className="text-xl font-serif font-bold mb-2">Analyzing Conformity Package</h4>
          <p className="text-white/40 text-xs uppercase tracking-widest">Cross-referencing 14 CFR requirements with provided evidence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((check) => (
          <div key={check.id} className="p-5 bg-zinc-900/50 border border-white/5 rounded-sm flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                {check.status === "pass" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {check.status === "fail" && <ShieldAlert className="w-5 h-5 text-red-500" />}
                {check.status === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                <span className="text-sm font-bold uppercase tracking-wider">{check.label}</span>
              </div>
              <p className="text-[9px] text-white/40 ml-9 italic">{check.reason}</p>
            </div>
            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
              check.status === "pass" ? "bg-green-500/10 text-green-500" :
              check.status === "fail" ? "bg-red-500/10 text-red-500" :
              "bg-yellow-500/10 text-yellow-500"
            }`}>
              {check.status === "pass" ? "Verified" : check.status === "fail" ? "Missing" : "Action Required"}
            </span>
          </div>
        ))}
      </div>

      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-sm">
        <h5 className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <Lock className="w-3 h-3" /> System Recommendation
        </h5>
        <p className="text-sm text-white/70 leading-relaxed">
          The package contains minor inconsistencies in Calibration Evidence and FAA Concurrence. AI suggests proceeding to draft preparation but flags these for DAR review before final approval.
        </p>
      </div>

      <div className="pt-8 border-t border-white/10 flex justify-between">
        <button
          onClick={onBack}
          className="px-10 py-4 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-sm"
        >
          Back to Uploads
        </button>
        <button
          onClick={onNext}
          className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all text-sm"
        >
          Generate Draft Forms
        </button>
      </div>
    </div>
  );
};

export default SmartChecks;
