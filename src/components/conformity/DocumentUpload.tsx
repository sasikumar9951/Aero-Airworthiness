"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, File, X, AlertCircle, Info } from "lucide-react";

interface DocumentUploadProps {
  uploadedFiles: string[];
  setUploadedFiles: (files: string[]) => void;
  onNext: () => void;
  onBack?: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ uploadedFiles, setUploadedFiles, onNext, onBack }) => {

  const requiredDocs = [
    "RFC / FAA Form 8120-10",
    "FAA Form 8110-3 Approval",
    "Statement of Conformity (8130-9)"
  ];
  
  const optionalDocs = [
    "Drawings", "Inspection plan", "Test plan", "Supplier certs", "Photos", 
    "Calibration records", "NCRs/deviations", "PO / work order", "FAA/DER concurrence emails"
  ];

  const handleUpload = (type: string) => {
    if (!uploadedFiles.includes(type)) {
      setUploadedFiles([...uploadedFiles, type]);
    }
  };

  const removeFile = (type: string) => {
    setUploadedFiles(uploadedFiles.filter(f => f !== type));
  };

  const renderDocGrid = (docs: string[], isRequired: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {docs.map((doc) => (
        <div 
          key={doc}
          onClick={() => handleUpload(doc)}
          className={`p-6 border rounded-sm cursor-pointer transition-all flex flex-col items-center justify-center gap-4 text-center group relative ${
            uploadedFiles.includes(doc) 
              ? "bg-gold/10 border-gold/50" 
              : isRequired 
                ? "bg-red-500/5 border-red-500/20 hover:border-red-500/50"
                : "bg-zinc-900/50 border-white/10 hover:border-gold/30"
          }`}
        >
          {uploadedFiles.includes(doc) ? (
            <CheckCircle className="w-8 h-8 text-gold" />
          ) : (
            <Upload className={`w-8 h-8 transition-colors ${isRequired ? "text-red-500/40 group-hover:text-red-500" : "text-white/20 group-hover:text-gold"}`} />
          )}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-1">{doc}</p>
            <p className={`text-[9px] uppercase ${isRequired ? "text-red-400 font-bold" : "text-white/40"}`}>
              {isRequired ? "Required Evidence" : "Optional Evidence"}
            </p>
          </div>
          
          {uploadedFiles.includes(doc) && (
            <button 
              onClick={(e) => { e.stopPropagation(); removeFile(doc); }}
              className="absolute top-2 right-2 p-1 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-red-400">
          <AlertCircle className="w-4 h-4" /> Required Uploads
        </h4>
        {renderDocGrid(requiredDocs, true)}
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-white/60">
          <Info className="w-4 h-4" /> Optional / Supporting Evidence
        </h4>
        {renderDocGrid(optionalDocs, false)}
      </div>

      <div className="p-8 bg-zinc-950 border border-white/5 rounded-sm">
        <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <File className="w-4 h-4 text-gold" /> Uploaded Evidence Queue
        </h4>
        <div className="space-y-2">
          <AnimatePresence>
            {uploadedFiles.length === 0 ? (
              <p className="text-white/30 text-xs italic">No documents uploaded yet...</p>
            ) : (
              uploadedFiles.map((file) => (
                <motion.div 
                  key={file}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-sm border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <File className="w-4 h-4 text-gold" />
                    <span className="text-xs font-mono">{file}_V1_FINAL.pdf</span>
                  </div>
                  <span className="text-[10px] text-green-500 font-bold">READY</span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={`pt-8 border-t border-white/10 flex ${onBack ? 'justify-between' : 'justify-end'}`}>
        {onBack && (
          <button
            onClick={onBack}
            className="px-10 py-4 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-sm"
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={uploadedFiles.length === 0}
          className={`px-10 py-4 font-bold uppercase tracking-widest transition-all text-sm ${
            uploadedFiles.length > 0 
              ? "bg-gold text-black hover:bg-white" 
              : "bg-zinc-800 text-white/30 cursor-not-allowed"
          }`}
        >
          Run Smart Checks
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
