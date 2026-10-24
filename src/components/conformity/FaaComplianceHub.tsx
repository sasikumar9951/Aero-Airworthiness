"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShieldCheck, ClipboardList, FolderKanban, FileText, 
  HelpCircle, CheckCircle2, ChevronRight, BookOpen, Download, 
  Lock, RefreshCw, AlertTriangle, ArrowRight, ShieldAlert 
} from "lucide-react";

// Pre-seeded AI Search Database
interface SearchResult {
  title: string;
  summary: string;
  references: string[];
  prerequisites: string[];
  systemAction: string;
}

const SEARCH_DATABASE: Record<string, SearchResult> = {
  prerequisites: {
    title: "Conforming an Article to Design Data — Prerequisite Check",
    summary: "To validate and conform a physical article to its type design data for FAA approval, you must establish traceability, compliance, and material validity. The AI engine flags these exact prerequisites as mandatory prior to completing FAA Form 8100-1.",
    references: ["14 CFR § 21.33 - Inspection and Tests", "14 CFR § 21.137 - Quality System Requirements", "FAA Order 8120.23 - Designee Management"],
    prerequisites: [
      "Request for Conformity (RFC) / FAA Form 8120-11",
      "FAA Approved Design Drawing Package & Assembly Drawings",
      "Exact Drawing Revision Matching (matching the master engineering order)",
      "Statement of Conformity (FAA Form 8130-9) signed by manufacturer",
      "Valid Material Test Reports (MTR) & Process Certifications (Heat Treat/Plating)",
      "NIST-traceable Calibration Records for all precision inspection tools"
    ],
    systemAction: "Recommended Tool: Launch the Conformity Command Center (Step 1) to upload and scan these drawing documents."
  },
  "8100-1": {
    title: "FAA Form 8100-1 — Conformity Inspection Record Guide",
    summary: "FAA Form 8100-1 is the primary permanent record documenting that a manufactured part conforms to its approved design data. The AI engine automatically generates this draft based on drawing extracts, RFC fields, and supplier certifications.",
    references: ["FAA Order 8110.4C - Type Certification", "FAA Order 8130.21 - Procedures for Completion of FAA Form 8130-3"],
    prerequisites: [
      "Drawing Nomenclature and Part Number verification",
      "Work Order / Purchase Order tracking sequence",
      "Beginning and Ending inspection dates",
      "Record of Satisfactory (SAT) / Unsatisfactory (UNSAT) determinations per item",
      "Authorized FAA Designee Signature and Designee Number"
    ],
    systemAction: "Recommended Action: Access the 'Form Checklist' tab above to audit your Form 8100-1 draft."
  },
  "8130-9": {
    title: "FAA Form 8130-9 — Statement of Conformity Overview",
    summary: "FAA Form 8130-9 is completed by the applicant/manufacturer to certify that the test article matches the approved design specifications and is in safe condition for tests.",
    references: ["14 CFR § 21.53 - Statement of Conformity", "FAA Advisory Circular AC 21-21"],
    prerequisites: [
      "Full manufacturer/applicant name and physical address",
      "Part Number and Description of Product",
      "List of any deviations from approved design data (NCRs must be attached)",
      "Signature of authorized quality representative"
    ],
    systemAction: "Verification status: Smart scanner extracts form signatures and cross-references them against active drawings."
  },
  "21.137": {
    title: "14 CFR § 21.137 Quality System Chapters",
    summary: "Establishes regulatory requirements for manufacturing quality control systems. An FAA-approved manufacturer must create and backup standard procedures matching these specified chapters.",
    references: ["14 CFR § 21.137 (a) through (n)", "AS9100 Rev D Quality Standard"],
    prerequisites: [
      "Chapter 1: Design Document Control & Change Logs",
      "Chapter 2: Supplier Control & Material Validation Flow",
      "Chapter 3: Manufacturing & Tooling Calibration Standards",
      "Chapter 4: Non-Conforming Product (NCR) Dispositions & Traceability"
    ],
    systemAction: "Recommended Action: Click the 'Manuals Backup' tab to examine our simulated Quality Systems Manual."
  }
};

export default function FaaComplianceHub() {
  const [activeTab, setActiveTab] = useState<"search" | "checklist" | "manuals">("search");
  
  // Search Engine State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestedSearches] = useState([
    { label: "Design Prerequisites", query: "prerequisites" },
    { label: "FAA Form 8100-1 Guide", query: "8100-1" },
    { label: "Statement of Conformity", query: "8130-9" },
    { label: "14 CFR § 21.137 System", query: "21.137" }
  ]);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    setTimeout(() => {
      // Find matching keywords
      const cleaned = query.toLowerCase();
      let match = SEARCH_DATABASE.prerequisites; // fallback
      
      if (cleaned.includes("8100-1") || cleaned.includes("inspection") || cleaned.includes("record")) {
        match = SEARCH_DATABASE["8100-1"];
      } else if (cleaned.includes("8130-9") || cleaned.includes("statement") || cleaned.includes("conformity")) {
        match = SEARCH_DATABASE["8130-9"];
      } else if (cleaned.includes("21.137") || cleaned.includes("quality") || cleaned.includes("chapter")) {
        match = SEARCH_DATABASE["21.137"];
      } else if (cleaned.includes("prereq") || cleaned.includes("conform") || cleaned.includes("design")) {
        match = SEARCH_DATABASE.prerequisites;
      }
      
      setSearchResults(match);
      setIsSearching(false);
    }, 800);
  };

  // Checklist State
  const [activeChecklist, setActiveChecklist] = useState<"8100-1" | "8130-3" | "8130-9">("8100-1");
  const [checklistItems, setChecklistItems] = useState({
    "8100-1": [
      { id: "rfc", text: "Request for Conformity (FAA Form 8120-11) uploaded", checked: true },
      { id: "draw", text: "Master engineering drawings uploaded & revision confirmed", checked: true },
      { id: "parts", text: "Nomenclature & Part Numbers verified per E.O.", checked: false },
      { id: "serial", text: "Physical serial numbers inspected & verified", checked: false },
      { id: "soc", text: "FAA Form 8130-9 Statement of Conformity attached", checked: false },
      { id: "cal", text: "Equipment calibration validation records submitted", checked: false },
      { id: "ncr", text: "Discrepancy logs & NCR deviations cleared", checked: false },
    ],
    "8130-3": [
      { id: "org", text: "Organization Name and Address verified", checked: true },
      { id: "po", text: "Purchase order and invoice numbers attached", checked: false },
      { id: "qty", text: "Quantity count matching shipment box", checked: false },
      { id: "rem", text: "Block 12 Remarks section auto-populated from drawing specs", checked: false },
      { id: "sig", text: "Authorized FAA Designee Signature mapped", checked: false },
    ],
    "8130-9": [
      { id: "app", text: "Applicant name and project identification defined", checked: true },
      { id: "safe", text: "Safe operation condition verified", checked: false },
      { id: "dev", text: "Any drawing deviations listed in Block 12", checked: false },
      { id: "auth", text: "Manufacturer quality manager signature verified", checked: false },
    ]
  });

  const toggleChecklistItem = (checklistId: "8100-1" | "8130-3" | "8130-9", itemId: string) => {
    setChecklistItems(prev => {
      const items = prev[checklistId].map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );
      return { ...prev, [checklistId]: items };
    });
  };

  const getComplianceScore = (checklistId: "8100-1" | "8130-3" | "8130-9") => {
    const list = checklistItems[checklistId];
    const checked = list.filter(item => item.checked).length;
    return Math.round((checked / list.length) * 100);
  };

  // Manuals State
  const [selectedManual, setSelectedManual] = useState<string>("qm-ch1");
  const manuals = [
    {
      id: "qm-ch1",
      category: "14 CFR § 21.137 System",
      title: "Chapter 1: Design & Document Control",
      text: "Establishes systematic procedures to control the drawing distribution, engineering revisions, and document issue logs. This section maps directly to FAR Part 21 requirements, ensuring that no unapproved drawings are used during a conformity inspection.",
      checklists: ["Verify engineering authorization signatures", "Check E.O. (Engineering Order) match logs", "Validate electronic master vault sync statuses"]
    },
    {
      id: "qm-ch2",
      category: "14 CFR § 21.137 System",
      title: "Chapter 2: Supplier & Material Control",
      text: "Defines supplier quality standards and raw material inspection flows. Requires all raw metallic stock and electronics assemblies to arrive with valid Material Test Reports (MTR) and certificate of conformities, trace-mapped back to original melt/batch sources.",
      checklists: ["Raw material visual checks", "Material Test Reports (MTR) validation", "Supplier risk factor indexing audits"]
    },
    {
      id: "qm-ch3",
      category: "14 CFR § 21.137 System",
      title: "Chapter 3: Calibration & Tooling Logs",
      text: "Mandates strict NIST-traceability calibrations for all micrometers, calipers, torque wrenches, and thermal processing tooling. Outlines standard procedure for flagging and locking expired tools to prevent test measurement errors.",
      checklists: ["Check tool expiration dates", "Verify NIST trace certificate numbers", "Perform secondary pre-test alignment checks"]
    },
    {
      id: "remote-proc",
      category: "Standard Procedures",
      title: "OP-200: Remote FAA Conformity audits",
      text: "Details specific workflows for performing remote video inspections with DAR-F oversight. Restricts feed latency limits, requires active screen drawing grids, and provides instructions for capturing high-definition pictures of stamping plates.",
      checklists: ["Validate network latency is < 200ms", "Verify lens calibration is clear", "Prepare visual check sheet for stamp inspection"]
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-zinc-950/40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.01] to-transparent pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <h2 className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> AI FAA COMPLIANCE HUB
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
              FAA Search & Conformity Portal.
            </h3>
          </div>
          
          {/* Tab Selection */}
          <div className="flex bg-black/60 p-1 border border-white/10 rounded-sm font-mono text-xs w-fit">
            {[
              { id: "search", label: "AI FAA Search", icon: Search },
              { id: "checklist", label: "Form Checklist", icon: ClipboardList },
              { id: "manuals", label: "Manuals Backup", icon: BookOpen },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-widest rounded-sm transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.2)]" 
                    : "text-white/40 hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-zinc-900/20 border border-white/10 rounded-sm p-6 md:p-12 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: AI FAA SEARCH ENGINE */}
            {activeTab === "search" && (
              <motion.div
                key="search-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div className="max-w-3xl space-y-4">
                  <h4 className="text-xl md:text-2xl font-serif font-bold text-white">
                    Ask the Compliance Engine.
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed font-sans">
                    Ask our AI compliance module about FAA conformity requirements, FAR references, or step-by-step checklists to conform test articles directly to engineering specs.
                  </p>
                </div>

                {/* The Search Console */}
                <div className="space-y-6">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }}
                    className="relative flex items-center bg-black/60 border border-white/15 focus-within:border-gold transition-all rounded-sm p-1"
                  >
                    <Search className="w-6 h-6 text-white/30 ml-4 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. What are the prerequisites to conform an article to the design data?"
                      className="w-full bg-transparent p-5 pl-4 outline-none text-white text-sm placeholder:text-white/20 font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="px-8 py-4 bg-gold text-black font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-white transition-all disabled:opacity-50"
                    >
                      {isSearching ? "INDEXING..." : "SEARCH AI"}
                    </button>
                  </form>

                  {/* Suggestion tags */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono font-bold tracking-wide">
                    <span className="text-white/30 uppercase">SUGGESTED SEARCHES:</span>
                    {suggestedSearches.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(s.query)}
                        className="px-3 py-1.5 border border-white/5 hover:border-gold hover:text-gold transition-all text-white/60 bg-white/[0.02]"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Results Display */}
                <div className="relative border border-white/5 bg-black/30 p-6 md:p-8 rounded-sm font-mono overflow-hidden">
                  {isSearching ? (
                    <div className="py-16 flex flex-col items-center justify-center space-y-4">
                      <RefreshCw className="w-10 h-10 text-gold animate-spin" />
                      <p className="text-xs uppercase tracking-widest text-gold/60">Searching 14 CFR database layers...</p>
                    </div>
                  ) : searchResults ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="flex items-start gap-4 border-b border-white/5 pb-6">
                        <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <span className="text-[9px] bg-gold/10 border border-gold/30 text-gold px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold">Verified AI Compliance Record</span>
                          <h4 className="text-lg md:text-xl font-serif font-bold text-white mt-2">{searchResults.title}</h4>
                        </div>
                      </div>

                      <div className="space-y-4 font-sans">
                        <p className="text-sm text-white/70 leading-relaxed">{searchResults.summary}</p>
                      </div>

                      {/* Required Prerequisites */}
                      <div className="space-y-4">
                        <h5 className="text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                          <ClipboardList className="w-4 h-4" /> Checklist of Prerequisite Evidence
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                          {searchResults.prerequisites.map((p, idx) => (
                            <div key={idx} className="p-3 bg-zinc-950 border border-white/5 rounded-sm flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              <span className="text-xs text-white/80 leading-relaxed">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Regulations Referenced */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 font-mono text-[9px] text-white/40">
                        <span className="uppercase font-bold pt-1 mr-2">FAA Regulatory Sources:</span>
                        {searchResults.references.map((r, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-sm text-gold font-bold">{r}</span>
                        ))}
                      </div>

                      {/* System action recommendation */}
                      <div className="p-4 bg-gold/5 border border-gold/10 text-gold/80 rounded-sm flex items-center justify-between text-xs font-sans">
                        <span className="italic">{searchResults.systemAction}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-16 text-center text-white/30 space-y-4 font-sans">
                      <HelpCircle className="w-12 h-12 text-white/10 mx-auto" />
                      <p className="text-sm">Type a search above or click a suggestion to retrieve FAA prerequisites and manuals.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 2: PREREQUISITE CHECKLISTS */}
            {activeTab === "checklist" && (
              <motion.div
                key="checklist-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div className="max-w-3xl space-y-4">
                  <h4 className="text-xl md:text-2xl font-serif font-bold text-white">
                    Interactive Form Prerequisite Auditing.
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed font-sans">
                    Toggle mandatory prerequisite items for each of the core FAA certification forms below to calculate your compliance index and audit validity.
                  </p>
                </div>

                {/* Form Switcher */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 p-1 rounded-sm">
                  {[
                    { id: "8100-1", title: "FAA Form 8100-1", sub: "Conformity Record" },
                    { id: "8130-3", title: "FAA Form 8130-3", sub: "Airworthiness Tag" },
                    { id: "8130-9", title: "FAA Form 8130-9", sub: "Statement of Conformity" },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveChecklist(item.id as any)}
                      className={`p-4 font-mono transition-all text-center rounded-sm uppercase tracking-widest ${
                        activeChecklist === item.id 
                          ? "bg-gold text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.15)]" 
                          : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <p className="text-xs font-bold">{item.title}</p>
                      <p className="text-[8px] opacity-60 mt-0.5">{item.sub}</p>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                  
                  {/* Checklist Items list */}
                  <div className="lg:col-span-2 space-y-4">
                    <h5 className="text-xs uppercase tracking-widest text-gold font-bold font-mono">
                      Traceability & Prerequisite Audits
                    </h5>
                    <div className="space-y-3 font-sans">
                      {checklistItems[activeChecklist].map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => toggleChecklistItem(activeChecklist, item.id)}
                          className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/5 hover:border-gold/30 rounded-sm cursor-pointer select-none transition-all duration-300"
                        >
                          <div className="flex gap-4 items-center">
                            <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                              item.checked ? "bg-gold border-gold text-black" : "border-white/20"
                            }`}>
                              {item.checked && <CheckCircle2 className="w-4 h-4 text-black" />}
                            </div>
                            <span className={`text-xs ${item.checked ? "text-white" : "text-white/40"}`}>{item.text}</span>
                          </div>
                          
                          <span className={`text-[9px] font-mono font-bold tracking-widest uppercase ${
                            item.checked ? "text-green-500" : "text-red-500"
                          }`}>
                            {item.checked ? "VERIFIED" : "PENDING"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Readiness Summary Sidebar */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-black/60 border border-white/10 rounded-sm p-6 space-y-6 font-mono text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                        <FolderKanban className="w-32 h-32 text-gold" />
                      </div>
                      
                      <h5 className="text-xs font-bold uppercase tracking-widest text-white/40">Audit Readiness</h5>
                      
                      {/* Score Indicator */}
                      <div className="relative w-36 h-36 mx-auto flex items-center justify-center border-4 border-white/5 rounded-full">
                        <div className="absolute inset-0 bg-gold/5 blur-[25px] rounded-full" />
                        <div className="text-center">
                          <p className="text-3xl font-serif text-gold font-bold">{getComplianceScore(activeChecklist)}%</p>
                          <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Ready Index</p>
                        </div>
                      </div>

                      {/* Status details */}
                      <div className="space-y-4 text-left border-t border-white/5 pt-4 text-xs font-sans">
                        <div className="flex justify-between">
                          <span className="text-white/40">Conformity Status:</span>
                          <span className={`font-bold font-mono ${
                            getComplianceScore(activeChecklist) === 100 
                              ? "text-green-500 animate-pulse" 
                              : "text-yellow-500"
                          }`}>
                            {getComplianceScore(activeChecklist) === 100 ? "FULLY COMPLIANT" : "INCOMPLETE"}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed italic border-t border-white/5 pt-3">
                          {getComplianceScore(activeChecklist) === 100 
                            ? "All FAA validation prerequisites met! Form is ready to lock and deliver to DAR-F review portal." 
                            : "Ensure all checklist items are trace-checked prior to official designee submission."}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 text-yellow-400 rounded-sm flex items-start gap-3 text-xs font-sans">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p className="leading-relaxed">
                        <strong>Warning:</strong> Non-conformance list (NCR) items must have DER/DAR concurrence approval loaded as a deviation annex.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 3: QUALITY SYSTEM MANUALS */}
            {activeTab === "manuals" && (
              <motion.div
                key="manuals-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div className="max-w-3xl space-y-4">
                  <h4 className="text-xl md:text-2xl font-serif font-bold text-white">
                    Compliance Manuals & Quality Backup.
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed font-sans">
                    View and search chapters from your Quality Systems Manual matching 14 CFR § 21.137. Acts as your digital operational compliance backup library.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
                  
                  {/* Left directory tree list */}
                  <div className="lg:col-span-1 border border-white/10 rounded-sm p-4 bg-black/60 font-mono text-xs flex flex-col space-y-6">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                        <FolderKanban className="w-3.5 h-3.5" /> System Directories
                      </p>
                      <div className="space-y-1">
                        {manuals.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setSelectedManual(m.id)}
                            className={`w-full text-left p-3 border rounded-sm flex justify-between items-center transition-all ${
                              selectedManual === m.id 
                                ? "bg-gold/10 border-gold text-gold font-bold" 
                                : "border-white/5 hover:border-white/10 text-white/60 hover:text-white bg-white/[0.01]"
                            }`}
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{m.title}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right standard viewer */}
                  <div className="lg:col-span-2 border border-white/10 bg-black/40 rounded-sm p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                    {/* Visual stamp watermark */}
                    <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none">
                      <ShieldAlert className="w-80 h-80 text-gold" />
                    </div>

                    {(() => {
                      const m = manuals.find(item => item.id === selectedManual) || manuals[0];
                      return (
                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-mono">{m.category}</span>
                              <h4 className="text-lg md:text-xl font-serif font-bold text-white mt-1">{m.title}</h4>
                            </div>
                            
                            <button className="flex items-center gap-2 border border-white/15 px-3 py-1.5 rounded-sm hover:border-gold hover:text-gold transition-all font-mono text-[9px] text-white/40">
                              <Download className="w-3.5 h-3.5" /> EXPORT PDF
                            </button>
                          </div>

                          <div className="space-y-4 font-sans text-sm text-white/70 leading-relaxed">
                            <p>{m.text}</p>
                          </div>

                          {/* Action checklist embedded */}
                          <div className="space-y-4 border-t border-white/5 pt-6 font-mono text-xs">
                            <h5 className="font-bold text-gold uppercase tracking-wider">DAR Quality Verification Checklist:</h5>
                            <div className="space-y-2">
                              {m.checklists.map((c, i) => (
                                <div key={i} className="flex gap-3 items-center text-white/60">
                                  <div className="w-3.5 h-3.5 bg-green-500/10 border border-green-500/30 text-green-500 flex items-center justify-center rounded-full shrink-0">
                                    ✓
                                  </div>
                                  <span className="font-sans text-xs">{c}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="flex items-center gap-2 text-[9px] font-mono text-white/20 uppercase tracking-widest border-t border-white/5 pt-6 mt-8">
                      <Lock className="w-3.5 h-3.5" /> SECURE AUDIT ARCHIVE • ACTIVE
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
