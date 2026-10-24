"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, AlertTriangle, Search, Lock, Database, LayoutDashboard, TableProperties } from "lucide-react";

interface SmartChecksProps {
  data: any;
  updateData: (field: string, value: string) => void;
  uploadedFiles: string[];
  onNext: () => void;
  onBack: () => void;
}

const SmartChecks: React.FC<SmartChecksProps> = ({ data, updateData, uploadedFiles, onNext, onBack }) => {
  const [analyzing, setAnalyzing] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
      // Simulate AI Extraction by auto-populating if empty
      if (!data.projectName) updateData("projectName", "Honda Aircraft Upgrade");
      if (!data.applicantManufacturer) updateData("applicantManufacturer", "Honda Aircraft Company");
      if (!data.applicantAddress) updateData("applicantAddress", "6430 Ballinger Rd. Greensboro, NC 27410");
      if (!data.aircraftProduct) updateData("aircraftProduct", "LEFT CABIN POWER ELECTRICAL HARNESS ASSEMBLY");
      if (!data.partNumber) updateData("partNumber", "HJ2-E9113-201-001");
      if (!data.serialNumber) updateData("serialNumber", "0001, 0002, 0003");
      if (!data.quantity) updateData("quantity", "3");
      if (!data.drawingRev) updateData("drawingRev", "Rev -2");
      if (!data.rfcNumber) updateData("rfcNumber", "AT16090AT-A-25-01361");
      if (!data.projectNumber) updateData("projectNumber", "AT16090AT-A");
      if (!data.workOrderPo) updateData("workOrderPo", "3QHJ25-001");
      if (!data.requestDate) updateData("requestDate", "2025-05-08");
      if (!data.beginningDate) updateData("beginningDate", "2026-03-10");
      if (!data.endingDate) updateData("endingDate", "2026-03-17");
      if (!data.inspectionDate) updateData("inspectionDate", "2026-03-17");
      if (!data.faaDerContact) updateData("faaDerContact", "Mohammed El Imadi");
      if (!data.designeeNo) updateData("designeeNo", "408993273");
      if (!data.testArticleStatus) updateData("testArticleStatus", "Prototype");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const hasRfc = uploadedFiles.some(f => f.includes("RFC"));
  const has8110 = uploadedFiles.some(f => f.includes("8110-3"));
  const hasSoc = uploadedFiles.some(f => f.includes("8130-9"));
  const hasCal = uploadedFiles.some(f => f.includes("Calibration"));
  const hasNcr = uploadedFiles.some(f => f.includes("NCR"));

  const getReasoning = (id: string, status: string) => {
    switch (id) {
      case "pn": return status === "pass" ? `P/N ${data.partNumber || "verified"} matches drawing.` : "Missing Part Number entry.";
      case "sn": return status === "pass" ? `S/N ${data.serialNumber || "verified"} matches build record.` : "Serial Number not provided.";
      case "qty": return status === "pass" ? "Quantity matches PO." : "Quantity mismatch detected.";
      case "rev": return status === "pass" ? "Drawing revision matches master data." : "Revision mismatch detected.";
      case "8110": return status === "pass" ? "8110-3 approval found." : "Missing FAA 8110-3 approval data.";
      case "soc": return status === "pass" ? "8130-9 validated." : "Missing 8130-9.";
      case "cal": return status === "pass" ? "Calibration records found." : "Missing calibration evidence.";
      case "ncr": return status === "pass" ? "No open NCRs/Deviations." : "Open NCRs detected.";
      case "limit": return status === "pass" ? "No limitations flagged." : "'Not for flight' limitation detected.";
      case "der": return status === "pass" ? "DER/DAR concurrence confirmed." : "Missing DER/FAA concurrence.";
      default: return "";
    }
  };

  const checks = [
    { id: "pn", label: "Part Number Mismatch", status: data.partNumber ? "pass" : "fail" },
    { id: "sn", label: "Serial Number Mismatch", status: data.serialNumber ? "pass" : "fail" },
    { id: "rev", label: "Drawing Revision Mismatch", status: data.drawingRev ? "pass" : "fail" },
    { id: "8110", label: "Missing 8110-3 Approval", status: has8110 ? "pass" : "fail" },
    { id: "soc", label: "Missing 8130-9", status: hasSoc ? "pass" : "fail" },
    { id: "cal", label: "Missing Calibration Evidence", status: hasCal ? "pass" : "fail" },
    { id: "ncr", label: "Open NCR / Deviation", status: hasNcr ? "warning" : "pass" },
    { id: "limit", label: "Test Limitation (Not for Flight)", status: data.testArticleStatus?.includes("Not for flight") ? "warning" : "pass" },
    { id: "der", label: "Missing DER/FAA Concurrence", status: data.faaDerContact ? "pass" : "warning" },
  ].map(c => ({ ...c, reason: getReasoning(c.id, c.status) }));

  const passedItems = checks.filter(c => c.status === "pass").length;
  const failedItems = checks.filter(c => c.status === "fail").length;
  const warningItems = checks.filter(c => c.status === "warning").length;
  const riskLevel = failedItems > 2 ? "High" : failedItems > 0 ? "Medium" : "Low";

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
      {/* Readiness Dashboard */}
      <div className="bg-zinc-900/50 p-6 border border-white/10 rounded-sm">
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-gold" /> Readiness Dashboard
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-black/50 border border-white/5 rounded-sm">
            <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Total Checks</p>
            <p className="text-2xl font-serif">{checks.length}</p>
          </div>
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-sm">
            <p className="text-[10px] text-green-500/70 uppercase font-bold mb-1">Passed</p>
            <p className="text-2xl font-serif text-green-500">{passedItems}</p>
          </div>
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-sm">
            <p className="text-[10px] text-red-500/70 uppercase font-bold mb-1">Missing / Failed</p>
            <p className="text-2xl font-serif text-red-500">{failedItems}</p>
          </div>
          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-sm">
            <p className="text-[10px] text-yellow-500/70 uppercase font-bold mb-1">Risk Level</p>
            <p className={`text-xl font-serif font-bold mt-1 ${riskLevel === "High" ? "text-red-500" : riskLevel === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{riskLevel}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Extraction Panel */}
        <div className="lg:col-span-1 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Database className="w-4 h-4 text-gold" /> Extracted Data
          </h4>
          <div className="bg-zinc-950 border border-white/10 rounded-sm p-4 space-y-3 text-[11px] font-mono">
             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">RFC Tracking</span>
               <span className="text-gold">{data.rfcNumber || "PENDING"}</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">Applicant</span>
               <span>{data.applicantManufacturer || "Not Found"}</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">Project No</span>
               <span>{data.projectNumber || "Not Found"}</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">8130-9 Certifier</span>
               <span>{hasSoc ? "Extracted from PDF" : "Missing"}</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">Test Status</span>
               <span className={data.testArticleStatus?.includes("Not for flight") ? "text-red-400" : ""}>{data.testArticleStatus || "N/A"}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-white/40">Auth DER/DAR</span>
               <span>{data.faaDerContact || "N/A"}</span>
             </div>
          </div>
        </div>

        {/* Validation Rules List */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-gold" /> Smart Validation Rules
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checks.map((check) => (
              <div key={check.id} className="p-3 bg-zinc-900/50 border border-white/5 rounded-sm flex items-start gap-3">
                <div className="mt-0.5">
                  {check.status === "pass" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {check.status === "fail" && <ShieldAlert className="w-4 h-4 text-red-500" />}
                  {check.status === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5">{check.label}</span>
                  <p className="text-[9px] text-white/40">{check.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design Data Table */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <TableProperties className="w-4 h-4 text-gold" /> Design Data Table
        </h4>
        <div className="overflow-x-auto border border-white/10 rounded-sm">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-white/5 font-mono text-white/60 uppercase">
              <tr>
                <th className="p-3 border-b border-white/10">Line</th>
                <th className="p-3 border-b border-white/10">Nomenclature</th>
                <th className="p-3 border-b border-white/10">Part No.</th>
                <th className="p-3 border-b border-white/10">Serial No.</th>
                <th className="p-3 border-b border-white/10">Drawing Rev</th>
                <th className="p-3 border-b border-white/10">Qty</th>
                <th className="p-3 border-b border-white/10">8130-9 Status</th>
                <th className="p-3 border-b border-white/10">Risk</th>
              </tr>
            </thead>
            <tbody className="bg-black/20 font-mono">
              <tr>
                <td className="p-3 border-b border-white/5">001</td>
                <td className="p-3 border-b border-white/5">{data.aircraftProduct || "Article"}</td>
                <td className="p-3 border-b border-white/5">{data.partNumber || "-"}</td>
                <td className="p-3 border-b border-white/5">{data.serialNumber || "-"}</td>
                <td className="p-3 border-b border-white/5">{data.drawingRev || "-"}</td>
                <td className="p-3 border-b border-white/5">1</td>
                <td className="p-3 border-b border-white/5">
                  <span className={`px-2 py-0.5 rounded-full ${hasSoc ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                    {hasSoc ? "VERIFIED" : "MISSING"}
                  </span>
                </td>
                <td className="p-3 border-b border-white/5">
                  {failedItems > 0 ? (
                    <span className="text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> High</span>
                  ) : (
                    <span className="text-green-500">Low</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-sm">
        <h5 className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <Lock className="w-3 h-3" /> System Recommendation
        </h5>
        <p className="text-sm text-white/70 leading-relaxed">
          {failedItems > 0 
            ? "Critical evidence is missing. You can generate a draft, but the DAR will reject the final package until all required fields and documents are provided." 
            : "All critical checks passed. The package is ready for DAR review."}
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
          Verify Extracted Data
        </button>
      </div>
    </div>
  );
};

export default SmartChecks;
