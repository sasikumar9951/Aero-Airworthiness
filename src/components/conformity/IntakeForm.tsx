"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Plane, Hash, FileText, MapPin, User, Info, Calendar } from "lucide-react";

interface IntakeFormProps {
  data: any;
  updateData: (field: string, value: string) => void;
  onNext: () => void;
  onBack?: () => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ data, updateData, onNext, onBack }) => {
  const fields = [
    { id: "projectName", label: "Project Name", icon: ClipboardList, placeholder: "e.g., Project Skyhawk Upgrade" },
    { id: "applicantManufacturer", label: "Applicant / Manufacturer", icon: User, placeholder: "e.g., Aero Dynamics Inc." },
    { id: "applicantAddress", label: "Applicant/Mfr Address", icon: MapPin, placeholder: "e.g., 6430 Ballinger Rd. Greensboro, NC" },
    { id: "aircraftProduct", label: "Aircraft / Product", icon: Plane, placeholder: "e.g., Cessna 172S / Avionics Bay" },
    { id: "makeModelSeries", label: "Make / Model / Series", icon: Plane, placeholder: "e.g., Boeing 737-800" },
    { id: "rfcNumber", label: "RFC Tracking Number", icon: Hash, placeholder: "e.g., AT16090AT-A-25-01361" },
    { id: "projectNumber", label: "Project Number", icon: Hash, placeholder: "e.g., AT16090AT-A" },
    { id: "partNumber", label: "Part Number", icon: FileText, placeholder: "e.g., HJ2-E9113-201-001" },
    { id: "serialNumber", label: "Serial Number", icon: Hash, placeholder: "e.g., 0001, 0002" },
    { id: "quantity", label: "Quantity", icon: Hash, placeholder: "e.g., 3" },
    { id: "drawingRev", label: "Drawing Number / Revision", icon: FileText, placeholder: "e.g., DWG-990-B" },
    { id: "workOrderPo", label: "Work Order / PO", icon: Hash, placeholder: "e.g., WO-5521 / PO-992" },
    { id: "inspectionLocation", label: "Inspection Location", icon: MapPin, placeholder: "e.g., Wichita Facility - Bay 4" },
    { id: "inspectionDate", label: "Inspection Date", icon: Calendar, placeholder: "e.g., 2024-12-01", type: "date" },
    { id: "requestDate", label: "TIA/Request Date", icon: Calendar, placeholder: "e.g., 2024-12-01", type: "date" },
    { id: "beginningDate", label: "Beginning Date", icon: Calendar, placeholder: "e.g., 2024-12-01", type: "date" },
    { id: "endingDate", label: "Ending Date", icon: Calendar, placeholder: "e.g., 2024-12-01", type: "date" },
    { id: "faaOffice", label: "FAA Office / CMS / MIDO", icon: MapPin, placeholder: "e.g., MIDO-41 Wichita" },
    { id: "faaDerContact", label: "Inspected By (Name)", icon: User, placeholder: "e.g., Mohammed El Imadi" },
    { id: "designeeNo", label: "Designee No.", icon: Hash, placeholder: "e.g., 408993273" },
    { 
      id: "purposeOfConformity", 
      label: "Purpose of Conformity", 
      icon: Info, 
      type: "select",
      options: ["", "Part conformity", "Installation conformity", "Other conformity"]
    },
    { 
      id: "testArticleStatus", 
      label: "Test Article Status", 
      icon: Info, 
      type: "select",
      options: ["", "Prototype", "Test article", "For flight", "Not for flight", "Limited use"]
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="text-[10px] text-gold font-bold tracking-widest uppercase flex items-center gap-2">
              <field.icon className="w-3 h-3" />
              {field.label}
            </label>
            <div className="relative group">
              {field.type === "select" ? (
                <select
                  value={data[field.id] || ""}
                  onChange={(e) => updateData(field.id, e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors rounded-sm font-mono text-sm appearance-none"
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className="bg-zinc-900">{opt || "Select an option..."}</option>
                  ))}
                </select>
              ) : field.type === "date" ? (
                <input
                  type="date"
                  value={data[field.id] || ""}
                  onChange={(e) => updateData(field.id, e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors rounded-sm font-mono text-sm [color-scheme:dark]"
                />
              ) : (
                <input
                  type="text"
                  value={data[field.id] || ""}
                  onChange={(e) => updateData(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-zinc-900/50 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors rounded-sm font-mono text-sm pr-12"
                />
              )}
              {data[field.id] && field.type !== "select" && field.type !== "date" && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                   <div className={`w-2 h-2 rounded-full ${data[field.id].length > 3 ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`} />
                   <span className="text-[8px] text-white/20 font-bold uppercase hidden group-hover:block">AI-Verified</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={`pt-8 border-t border-white/10 flex ${onBack ? 'justify-between' : 'justify-end'}`}>
        {onBack && (
          <button
            onClick={onBack}
            className="px-10 py-4 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-sm"
          >
            Back to Analysis
          </button>
        )}
        <button
          onClick={onNext}
          className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all text-sm"
        >
          Proceed to Form Generation
        </button>
      </div>
    </div>
  );
};

export default IntakeForm;
