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
            <div className="border-2 border-black text-[9px] font-sans">
              <div className="flex border-b border-black">
                <div className="w-1/3 p-2 text-center flex flex-col justify-center items-center font-bold text-sm">
                  Conformity Inspection Record
                </div>
                <div className="w-1/3 border-l border-black p-1">
                  <p className="font-bold text-[7px] leading-tight">1. Project Number, TIA/Request Date, RFC Tracking No<br/> Rev. Original. Dated:</p>
                  <p className="mt-1">{data.projectNumber || "TBD"}; {data.requestDate || "TBD"}; {data.rfcNumber || "TBD"}; {data.drawingRev?.split("/")[1] || "Original"}; {data.inspectionDate || "TBD"}</p>
                </div>
                <div className="w-1/3 border-l border-black p-1 font-bold flex items-center justify-center">
                  2. SHEET 1 OF 2 Sheets
                </div>
              </div>
              <div className="flex border-b border-black">
                <div className="w-1/2 p-1 border-r border-black">
                  <p className="font-bold text-[7px]">3. Applicant/Manufacturer:</p>
                  <p>{data.applicantManufacturer || "TBD"}<br/>{data.applicantAddress || "TBD"}</p>
                </div>
                <div className="w-1/4 p-1 border-r border-black">
                  <p className="font-bold text-[7px]">4. Beginning Date:</p>
                  <p>{data.beginningDate || "TBD"}</p>
                </div>
                <div className="w-1/4 p-1">
                  <p className="font-bold text-[7px]">5. Ending Date:</p>
                  <p>{data.endingDate || "TBD"}</p>
                </div>
              </div>
              <div className="flex border-b border-black">
                <div className="w-1/2 p-1 border-r border-black">
                  <p className="font-bold text-[7px]">6. Model:</p>
                  <p>{data.makeModelSeries || "TBD"}</p>
                </div>
                <div className="w-1/2 p-1">
                  <p className="font-bold text-[7px]">7. Inspected By:</p>
                  <p>{data.faaDerContact || "TBD"} Designee No. {data.designeeNo || "TBD"}</p>
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black">
                    <th className="border-r border-black p-1 font-bold text-[7px] w-8">8. Item No.</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-48">9. Nomenclature of Item Inspected</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-48">10. Drawing, Document, Specification, etc.</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-20">11. Revision and Date</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-24">
                      12. No. of Items Determined
                      <div className="flex justify-between mt-1 border-t border-black pt-1">
                        <span className="w-1/2 text-center border-r border-black">SAT.</span>
                        <span className="w-1/2 text-center">UNSAT.</span>
                      </div>
                    </th>
                    <th className="p-1 font-bold text-[7px]">13. Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-r border-black p-1 text-center align-top">1</td>
                    <td className="border-r border-black p-1 align-top">{data.aircraftProduct || "Statement of Conformity"}</td>
                    <td className="border-r border-black p-1 align-top text-center">FAA Form 8130-9</td>
                    <td className="border-r border-black p-1 align-top text-center">07/25</td>
                    <td className="border-r border-black p-0 align-top">
                      <div className="flex h-full min-h-[30px]">
                         <div className="w-1/2 text-center border-r border-black p-1">1</div>
                         <div className="w-1/2 text-center p-1"></div>
                      </div>
                    </td>
                    <td className="p-1 align-top text-[7px]">
                      Received signed 8130-9 dated {data.beginningDate || "03/10/2026"}, signed by Authorized Agent. Reviewed for accuracy, completeness. Original Attached.
                    </td>
                  </tr>
                  <tr className="border-t border-black">
                    <td className="border-r border-black p-1 text-center align-top">2</td>
                    <td className="border-r border-black p-1 align-top">Statement of Compliance with the Airworthiness Standards Design Data<br/>{data.partNumber}</td>
                    <td className="border-r border-black p-1 align-top text-center">{data.partNumber}</td>
                    <td className="border-r border-black p-1 align-top text-center">{data.drawingRev}</td>
                    <td className="border-r border-black p-0 align-top">
                      <div className="flex h-full min-h-[30px]">
                         <div className="w-1/2 text-center border-r border-black p-1">{data.quantity || 1}</div>
                         <div className="w-1/2 text-center p-1"></div>
                      </div>
                    </td>
                    <td className="p-1 align-top text-[7px]">
                      Drawings, Parts List & EO have been FAA DER approved for the purpose of FAA Conformity Inspection.
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="border-t border-black p-1 flex justify-between text-[6px]">
                 <span>FAA Form 8100-1 (8-19) Supersedes Previous Edition</span>
                 <span>Electronic version page 1</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "8130-3" && (
          <div className="space-y-6 text-[11px]">
            <div className="border-2 border-black text-[9px] font-sans">
              <div className="flex border-b border-black h-16">
                <div className="w-1/4 border-r border-black p-1 text-center flex flex-col justify-between">
                  <p className="font-bold text-[7px] text-left">1. Approving Civil Aviation Authority/Country:</p>
                  <p className="font-bold">FAA/UNITED STATES</p>
                  <div/>
                </div>
                <div className="w-1/2 border-r border-black p-1 flex flex-col items-center justify-center">
                  <p className="font-bold text-lg">AUTHORIZED RELEASE CERTIFICATE</p>
                  <p className="font-bold text-[7px]">FAA Form 8130-3, AIRWORTHINESS APPROVAL TAG</p>
                </div>
                <div className="w-1/4 p-1">
                  <p className="font-bold text-[7px]">3. Form Tracking Number:</p>
                  <p className="text-center font-bold mt-2">{data.rfcNumber || "25-01361-HJ2"}</p>
                </div>
              </div>

              <div className="flex border-b border-black min-h-[40px]">
                <div className="w-3/4 border-r border-black p-1">
                  <p className="font-bold text-[7px]">4. Organization Name and Address:</p>
                  <p>Applicant: {data.applicantManufacturer || "Honda Aircraft Company"}</p>
                  <p>{data.applicantAddress || "6430 Ballinger Rd. Greensboro, NC 27410"}</p>
                </div>
                <div className="w-1/4 p-1">
                  <p className="font-bold text-[7px]">5. Work Order/Contract/Invoice Number:</p>
                  <p>{data.workOrderPo || "3QHJ25-001"}</p>
                </div>
              </div>

              <table className="w-full text-left border-collapse border-b border-black">
                <thead>
                  <tr className="border-b border-black">
                    <th className="border-r border-black p-1 font-bold text-[7px] w-8">6. Item:</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-48">7. Description:</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-32">8. Part Number:</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-16">9. Quantity:</th>
                    <th className="border-r border-black p-1 font-bold text-[7px] w-32">10. Serial Number:</th>
                    <th className="p-1 font-bold text-[7px]">11. Status/Work:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-r border-black p-1 text-center align-top">1</td>
                    <td className="border-r border-black p-1 align-top">{data.aircraftProduct || "LEFT CABIN POWER ELECTRICAL HARNESS ASSEMBLY"}</td>
                    <td className="border-r border-black p-1 text-center align-top">{data.partNumber || "HJ2-E9113-201-001"}</td>
                    <td className="border-r border-black p-1 text-center align-top">{data.quantity || 3}</td>
                    <td className="border-r border-black p-1 text-center align-top">{data.serialNumber || "0001,0002 and 0003"}</td>
                    <td className="p-1 text-center align-top">{data.testArticleStatus || "Prototype"}</td>
                  </tr>
                  <tr>
                     <td colSpan={6} className="h-4"></td>
                  </tr>
                </tbody>
              </table>

              <div className="border-b border-black p-1 min-h-[160px]">
                <p className="font-bold text-[7px]">12. Remarks:</p>
                <div className="mt-1 text-[7px] leading-tight space-y-1">
                  <p>Conformity Inspection: Conformity Inspection for FAA Project {data.projectNumber}.</p>
                  <p>1- Part (ASSY) conformity as Listed on RFC FAA Form 8120-10, tracking number: {data.rfcNumber}, Rev. Original, dated: {data.requestDate}.</p>
                  <p>2- Signed FAA 8130-9 Statement of conformity by Applicant Authorized Agent, dated {data.beginningDate} was provided, no deviation has been listed, reviewed for accuracy and completeness.</p>
                  <p>3- Part Numbers: {data.partNumber}, {data.aircraftProduct} is inspected to engineering drawing {data.drawingRev}.</p>
                  <p>4- RFC 8120-10 Special Instructions are complied with: Current or Later FAA-Approved Revision is Acceptable; Items will be used for Test articles.</p>
                  <p>5- Performed remote conformity IAW with RFC item 6 and OMS Remote Conformity Inspection.</p>
                  <div className="text-center font-bold mt-4">
                    <p>DMS Control Number #{data.designeeNo || "408993273"}-2026-0022</p>
                    <p>****************************************************** END ******************************************************</p>
                  </div>
                </div>
              </div>

              <div className="flex border-b border-black">
                <div className="w-1/2 border-r border-black p-1 bg-gray-100 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-[7px]">13a. Certifies the items identified above were manufactured in conformity to:</p>
                    <div className="mt-2 text-[7px] ml-4 space-y-1">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black bg-white"></div> <span>Approved design data and are in a condition for safe operation.</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black flex items-center justify-center font-bold bg-white">X</div> <span>Non-approved design data specified in Block 12.</span></div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-1 flex flex-col">
                   <div className="flex items-center gap-4 text-[7px] font-bold">
                      <div className="flex items-center gap-1">14a. <div className="w-3 h-3 border border-black"></div> 14 CFR 43.9 Return to Service</div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> Other regulation specified in Block 12</div>
                   </div>
                   <p className="text-[6px] mt-2 leading-tight">Certifies that unless otherwise specified in block 12, the work identified in Block 11 and described in Block 12 was accomplished in accordance with Title 14, Code of Federal Regulations, part 43 and in respect to that work, the items are approved for return to service.</p>
                </div>
              </div>

              <div className="flex border-b border-black">
                <div className="w-1/4 border-r border-black p-1 h-12">
                  <p className="font-bold text-[7px]">13b. Authorized Signature:</p>
                </div>
                <div className="w-1/4 border-r border-black p-1 h-12">
                  <p className="font-bold text-[7px]">13c. Approval/Authorization No.:</p>
                  <p className="text-center font-bold mt-2">{data.designeeNo || "408993273"}</p>
                </div>
                <div className="w-1/4 border-r border-black p-1 h-12 bg-gray-100">
                  <p className="font-bold text-[7px]">14b. Authorized Signature:</p>
                </div>
                <div className="w-1/4 p-1 h-12 bg-gray-100">
                  <p className="font-bold text-[7px]">14c. Approval/Certificate No.:</p>
                </div>
              </div>

              <div className="flex border-b border-black">
                <div className="w-1/4 border-r border-black p-1 h-10 flex flex-col justify-between">
                  <p className="font-bold text-[7px]">13d. Name (Typed or Printed):</p>
                  <p className="text-center font-bold">{data.faaDerContact || "Mohammed El Imadi"}</p>
                </div>
                <div className="w-1/4 border-r border-black p-1 h-10 flex flex-col justify-between">
                  <p className="font-bold text-[7px]">13e. Date (dd/mmm/yyyy):</p>
                  <p className="text-center font-bold">{data.inspectionDate || "17 /Mar /2026"}</p>
                </div>
                <div className="w-1/4 border-r border-black p-1 h-10 bg-gray-100">
                  <p className="font-bold text-[7px]">14d. Name (Typed or Printed):</p>
                </div>
                <div className="w-1/4 p-1 h-10 bg-gray-100">
                  <p className="font-bold text-[7px]">14e. Date (dd/mmm/yyyy):</p>
                </div>
              </div>

              <div className="p-1">
                 <p className="text-center font-bold text-[8px]">User/Installer Responsibilities</p>
                 <p className="text-[6px] font-bold mt-1 leading-tight">It is important to understand that the existence of this document alone does not automatically constitute authority to install the aircraft engine/propeller/article.</p>
                 <p className="text-[6px] font-bold mt-1 leading-tight">Where the user/installer performs work in accordance with the national regulations of an airworthiness authority different than the airworthiness authority of the country specified in Block 1, it is essential that the user/installer ensures that his/her airworthiness authority accepts aircraft engine(s)/propeller(s)/article(s) from the airworthiness authority of the country specified in Block 1.</p>
                 <p className="text-[6px] font-bold mt-1 leading-tight">Statements in Blocks 13a and 14a do not constitute installation certification. In all cases, aircraft maintenance records must contain an installation certification issued in accordance with the national regulations by the user/installer before the aircraft may be flown.</p>
              </div>
              
              <div className="border-t border-black p-1 flex justify-between text-[6px]">
                 <span>FAA Form 8130-3 (02-14)</span>
                 <span>NSN: 0052-00-012-9005</span>
              </div>
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
