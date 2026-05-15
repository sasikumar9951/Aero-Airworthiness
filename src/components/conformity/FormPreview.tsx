"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileDown, Printer, CheckCircle, Lock, AlertCircle } from "lucide-react";

interface FormPreviewProps {
  data: any;
  onApprove: () => void;
  onBack: () => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({ data, onApprove, onBack }) => {
  const [activeTab, setActiveTab] = useState<"8100-1" | "8130-3" | "checklist" | "evidence" | "ncr" | "memo">("8100-1");
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    setIsApproved(true);
    setTimeout(onApprove, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-px bg-white/5 border border-white/10 w-full p-1 rounded-sm">
        {[
          { id: "8100-1", label: "8100-1 Draft" },
          { id: "8130-3", label: "8130-3 Draft" },
          { id: "checklist", label: "Checklist" },
          { id: "evidence", label: "Missing Evidence" },
          { id: "ncr", label: "NCR Summary" },
          { id: "memo", label: "Summary Memo" },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-[9px] font-bold uppercase tracking-widest transition-all flex-1 ${activeTab === tab.id ? "bg-gold text-black" : "text-white/40 hover:text-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Area */}
      <div className="bg-white p-12 text-black shadow-2xl min-h-[800px] font-serif relative">
        {/* Draft Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[20px] border-black/5 flex items-center justify-center overflow-hidden opacity-[0.03]">
           <span className="text-9xl -rotate-45 font-sans font-black tracking-tighter">
             {isApproved ? "LOCKED & APPROVED" : "PRELIMINARY DRAFT"}
           </span>
        </div>

        {/* Extraction Context */}
        <div className="absolute top-4 left-4 bg-gold/10 border border-gold/20 px-3 py-1 rounded-sm flex flex-col gap-0.5">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-[8px] font-bold text-gold uppercase tracking-tighter">Data Extracted from FAA 8120-10 & 8130-9</span>
           </div>
           <span className="text-[6px] text-gold/50 font-mono">AUDIT_ID: DAR-{Math.random().toString(36).substring(2, 10).toUpperCase()} | SIG: {new Date().getTime()}</span>
        </div>

        {activeTab === "8100-1" && (
          <div className="space-y-6 text-[11px]">
            {/* ... 8100-1 content ... */}
            <div className="flex justify-between border-b-2 border-black pb-4">
              <div className="font-bold">
                <p>U.S. DEPARTMENT OF TRANSPORTATION</p>
                <p className="text-sm">FEDERAL AVIATION ADMINISTRATION</p>
              </div>
              <div className="text-right font-bold">
                <p>CONFORMITY INSPECTION RECORD</p>
                <p>FAA Form 8100-1</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-b border-black pb-4">
              <div>
                <p className="font-bold uppercase text-[8px]">1. Project Number</p>
                <p className="font-mono mt-1">{data.rfcNumber || "TBD"}</p>
              </div>
              <div>
                <p className="font-bold uppercase text-[8px]">3. Applicant / Manufacturer</p>
                <p className="font-mono mt-1">{data.projectName || "TBD"}</p>
              </div>
              <div>
                <p className="font-bold uppercase text-[8px]">6. Model</p>
                <p className="font-mono mt-1">{data.aircraftProduct || "TBD"}</p>
              </div>
            </div>

            <table className="w-full border-collapse border border-black">
              <thead>
                <tr className="bg-gray-100 uppercase text-[8px]">
                  <th className="border border-black p-2 w-12">Item No.</th>
                  <th className="border border-black p-2">Nomenclature of Item</th>
                  <th className="border border-black p-2">Drawing / Specification</th>
                  <th className="border border-black p-2 w-12">Rev.</th>
                  <th className="border border-black p-2 w-20">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr>
                  <td className="border border-black p-3 text-center">001</td>
                  <td className="border border-black p-3">{data.partNumber || "Aero Component"}</td>
                  <td className="border border-black p-3">{data.drawingRev?.split("/")[0] || "DWG-1001"}</td>
                  <td className="border border-black p-3 text-center">{data.drawingRev?.split("/")[1] || "A"}</td>
                  <td className="border border-black p-3 text-center font-bold">SAT</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-20 pt-10 border-t border-black grid grid-cols-2 gap-20">
               <div>
                  <p className="font-bold uppercase text-[8px]">Inspected By (Authorized Designee)</p>
                  <div className="h-10 border-b border-black flex items-end">
                     <span className="italic text-gray-400">Electronic Draft - Review Required</span>
                  </div>
                  <p className="mt-1">{data.faaDerContact || "Pending Assignment"}</p>
               </div>
               <div>
                  <p className="font-bold uppercase text-[8px]">Date</p>
                  <div className="h-10 border-b border-black flex items-end">
                     <span>{new Date().toLocaleDateString()}</span>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === "8130-3" && (
          <div className="space-y-6 text-[11px]">
             <div className="flex justify-between border-2 border-black p-4">
                <div className="text-center w-full">
                   <p className="font-bold text-sm">AUTHORIZED RELEASE CERTIFICATE / FAA FORM 8130-3</p>
                   <p className="font-bold">AIRWORTHINESS APPROVAL TAG</p>
                </div>
             </div>

             <div className="grid grid-cols-2 border border-black divide-x divide-black">
                <div className="p-4 space-y-4">
                   <div>
                      <p className="font-bold uppercase text-[8px]">1. Approving Civil Aviation Authority/Country</p>
                      <p className="font-bold">FAA / UNITED STATES</p>
                   </div>
                   <div>
                      <p className="font-bold uppercase text-[8px]">4. Organization Name and Address</p>
                      <p className="font-mono">AERO AIRWORTHINESS<br />WICHITA, KS, USA</p>
                   </div>
                   <div>
                      <p className="font-bold uppercase text-[8px]">7. Description</p>
                      <p className="font-mono">{data.aircraftProduct || "Aerospace Article"}</p>
                   </div>
                </div>
                <div className="p-4 space-y-4">
                   <div>
                      <p className="font-bold uppercase text-[8px]">3. Form Tracking Number</p>
                      <p className="font-mono">AC-884-2921-X</p>
                   </div>
                   <div>
                      <p className="font-bold uppercase text-[8px]">8. Part Number</p>
                      <p className="font-mono font-bold text-sm">{data.partNumber || "P/N-PENDING"}</p>
                   </div>
                   <div>
                      <p className="font-bold uppercase text-[8px]">11. Work Order / Contract / Invoice</p>
                      <p className="font-mono">{data.workOrderPo || "W/O-991"}</p>
                   </div>
                </div>
             </div>

             <div className="p-4 border border-black">
                <p className="font-bold uppercase text-[8px] mb-2">12. Status / Work</p>
                <p className="font-mono italic">
                   New article conformity inspection performed in accordance with FAA Order 8110.4C. 
                   Item conforms to approved data listed in Block 9. Ready for installation on {data.aircraftProduct}.
                </p>
             </div>

             <div className="mt-20 p-4 bg-gray-50 border border-dashed border-black flex items-center justify-center">
                <p className="text-[10px] font-bold text-center uppercase">PRE-FILLED DRAFT DATA ONLY - NOT FOR OFFICIAL ISSUANCE</p>
             </div>
          </div>
        )}

        {activeTab === "checklist" && (
          <div className="space-y-8 text-[11px]">
             <div className="text-center border-b-2 border-black pb-4">
                <h2 className="text-lg font-bold">CONFORMITY INSPECTION CHECKLIST</h2>
                <p className="uppercase text-[9px]">Project: {data.projectName || "Standard Review"}</p>
             </div>
             
             <div className="space-y-4">
                {[
                  "Verify part matches drawing number and revision.",
                  "Inspect for shipping damage or material defects.",
                  "Verify all fabrication steps were completed per work order.",
                  "Confirm all special processes (heat treat, plating) have certs.",
                  "Verify dimensions against critical characteristics list.",
                  "Check for 'Not for Flight' markings if applicable."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-gray-100 pb-2">
                     <div className="w-4 h-4 border border-black mt-0.5" />
                     <p>{item}</p>
                  </div>
                ))}
             </div>

             <div className="mt-12 p-4 bg-gray-100">
                <p className="font-bold uppercase text-[8px]">Notes / Discrepancies</p>
                <div className="h-20" />
             </div>
          </div>
        )}

        {activeTab === "evidence" && (
          <div className="space-y-6 text-[11px]">
             <div className="flex justify-between items-center border-b-2 border-black pb-4">
                <h2 className="text-lg font-bold">MISSING EVIDENCE LIST</h2>
                <span className="bg-red-100 text-red-700 px-2 py-1 font-bold text-[9px]">ACTION REQUIRED</span>
             </div>
             
             <div className="bg-red-50 p-6 border border-red-100">
                <p className="font-bold mb-4">The following items must be uploaded before DAR approval:</p>
                <ul className="list-disc pl-5 space-y-3 font-mono">
                   {!data.partNumber && <li>Engineering Drawing for P/N {data.partNumber || "TBD"}</li>}
                   <li>Calibration Certificate for Micrometer (Serial: 8821)</li>
                   <li>FAA Form 8110-3 for Major Repair #4</li>
                   <li>Material Test Reports (MTR) for Raw Aluminum Stock</li>
                </ul>
             </div>
          </div>
        )}

        {activeTab === "ncr" && (
          <div className="space-y-6 text-[11px]">
             <h2 className="text-lg font-bold border-b-2 border-black pb-4 text-center">NCR / DEVIATION SUMMARY</h2>
             
             <table className="w-full border-collapse border border-black">
                <thead>
                   <tr className="bg-gray-100 uppercase text-[8px]">
                      <th className="border border-black p-2">NCR #</th>
                      <th className="border border-black p-2">Description of Deviation</th>
                      <th className="border border-black p-2">Disposition</th>
                      <th className="border border-black p-2">DAR Status</th>
                   </tr>
                </thead>
                <tbody className="font-mono">
                   <tr>
                      <td className="border border-black p-2">NCR-2024-01</td>
                      <td className="border border-black p-2">Oversize hole at Station 22.5 (+0.005)</td>
                      <td className="border border-black p-2">Use-As-Is (Eng Approved)</td>
                      <td className="border border-black p-2 text-green-600 font-bold">CONCUR</td>
                   </tr>
                   <tr>
                      <td className="border border-black p-2">DEV-2024-04</td>
                      <td className="border border-black p-2">Alternative fastener NAS1149 substituted</td>
                      <td className="border border-black p-2">Standard Repair Manual</td>
                      <td className="border border-black p-2 text-green-600 font-bold">CONCUR</td>
                   </tr>
                </tbody>
             </table>
          </div>
        )}

        {activeTab === "memo" && (
          <div className="space-y-8 text-[11px] leading-relaxed">
             <div className="text-center">
                <h2 className="text-lg font-bold">INSPECTION SUMMARY MEMO</h2>
                <p className="uppercase font-bold text-[9px]">Aero Airworthiness - Quality Assurance</p>
             </div>

             <div className="space-y-4">
                <p><span className="font-bold">TO:</span> FAA / MIDO-Wichita</p>
                <p><span className="font-bold">FROM:</span> Certification Department</p>
                <p><span className="font-bold">SUBJECT:</span> Summary of Conformity for {data.projectName}</p>
                
                <p className="mt-8">
                   A comprehensive physical inspection and data review was performed on the subject article(s) 
                   in accordance with the approved inspection plan. The AI Conformity Module has cross-referenced 
                   all engineering specifications against the physical build record.
                </p>

                <p>
                   As of {new Date().toLocaleDateString()}, the article conforms to the type design 
                   except for the items listed in the Missing Evidence report. Final DAR-F signature 
                   is pending receipt of these items.
                </p>
             </div>

             <div className="mt-20 flex justify-between">
                <div className="w-48 h-px bg-black" />
                <div className="w-48 h-px bg-black" />
             </div>
             <div className="flex justify-between text-[8px] font-bold uppercase">
                <span>Director of Quality</span>
                <span>FAA Representative</span>
             </div>
          </div>
        )}
      </div>

      {/* Required Disclaimer */}
      <div className="p-6 bg-gold/5 border border-gold/20 rounded-sm">
        <div className="flex gap-4">
          <AlertCircle className="w-5 h-5 text-gold shrink-0" />
          <p className="text-[11px] text-white/70 leading-relaxed italic">
            “System-generated FAA forms are draft preparation tools only. Final completion, approval, and issuance must be reviewed and executed by authorized FAA designee or applicable FAA authority.”
          </p>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-8 py-3 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-xs"
        >
          Back to Analysis
        </button>

        <div className="flex gap-4">
           <button className="px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <Printer className="w-4 h-4" /> Print Draft
           </button>
           <button 
             onClick={handleApprove}
             disabled={isApproved}
             className={`px-10 py-4 font-bold uppercase tracking-widest transition-all text-sm flex items-center gap-2 ${
               isApproved ? "bg-green-500 text-white" : "bg-gold text-black hover:bg-white"
             }`}
           >
              {isApproved ? (
                <><CheckCircle className="w-5 h-5" /> Approved by DAR</>
              ) : (
                <><Lock className="w-5 h-5" /> Execute DAR Review</>
              )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
