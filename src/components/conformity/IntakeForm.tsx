"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Plane, Hash, FileText, MapPin, User, Info } from "lucide-react";

interface IntakeFormProps {
  data: any;
  updateData: (field: string, value: string) => void;
  onNext: () => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ data, updateData, onNext }) => {
  const fields = [
    { id: "projectName", label: "Project Name", icon: ClipboardList, placeholder: "e.g., Project Skyhawk Upgrade" },
    { id: "aircraftProduct", label: "Aircraft / Product", icon: Plane, placeholder: "e.g., Cessna 172S / Avionics Bay" },
    { id: "rfcNumber", label: "RFC Number", icon: Hash, placeholder: "e.g., RFC-2024-001" },
    { id: "partNumber", label: "Part Number", icon: FileText, placeholder: "e.g., 670-10023-01" },
    { id: "serialNumber", label: "Serial Number", icon: Hash, placeholder: "e.g., SN-8842-A" },
    { id: "drawingRev", label: "Drawing Number / Revision", icon: FileText, placeholder: "e.g., DWG-990-B" },
    { id: "workOrderPo", label: "Work Order / PO", icon: Hash, placeholder: "e.g., WO-5521 / PO-992" },
    { id: "testArticleStatus", label: "Test Article Status", icon: Info, placeholder: "e.g., Prototype - Conformity Pending" },
    { id: "inspectionLocation", label: "Inspection Location", icon: MapPin, placeholder: "e.g., Wichita Facility - Bay 4" },
    { id: "faaDerContact", label: "FAA / DER Contact", icon: User, placeholder: "e.g., John Doe (DER-8892)" },
    { id: "purposeOfConformity", label: "Purpose of Conformity", icon: Info, placeholder: "e.g., STC Certification" },
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
            <input
              type="text"
              value={data[field.id] || ""}
              onChange={(e) => updateData(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="w-full bg-zinc-900/50 border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors rounded-sm font-mono text-sm"
            />
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-white/10 flex justify-end">
        <button
          onClick={onNext}
          className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all text-sm"
        >
          Continue to Uploads
        </button>
      </div>
    </div>
  );
};

export default IntakeForm;
