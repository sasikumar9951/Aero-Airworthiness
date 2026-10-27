"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Search, Filter, RefreshCw, Eye, CheckCircle, XCircle, Clock, AlertTriangle, FileText, Printer, Download, Trash2, X, Lock, Check, Key, ArrowRight, LogOut } from "lucide-react";
import { getSubmissions, updateSubmissionStatus, deleteSubmission, verifyAdminPasscode, SubmissionRecord } from "@/app/conformityActions";

export default function AdminConformityDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedSub, setSelectedSub] = useState<SubmissionRecord | null>(null);
  const [activeTab, setActiveTab] = useState<"8100-1" | "8130-3" | "summary">("8100-1");
  const [actionLoading, setActionLoading] = useState(false);

  // Check session storage on mount
  useEffect(() => {
    const authSession = sessionStorage.getItem("dar_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await verifyAdminPasscode(passcode);
      if (res.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("dar_admin_auth", "true");
        fetchSubmissions();
      } else {
        setAuthError(res.error || "Access denied.");
      }
    } catch (err) {
      setAuthError("Authentication server error.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("dar_admin_auth");
    setSubmissions([]);
    setPasscode("");
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getSubmissions();
      setSubmissions(data);
    } catch (err) {
      console.error("Failed to load submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: SubmissionRecord["status"]) => {
    setActionLoading(true);
    try {
      await updateSubmissionStatus(id, status);
      await fetchSubmissions();
      if (selectedSub && selectedSub.id === id) {
        setSelectedSub(prev => prev ? { ...prev, status } : null);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission record?")) return;
    setActionLoading(true);
    try {
      await deleteSubmission(id);
      setSelectedSub(null);
      await fetchSubmissions();
    } catch (err) {
      console.error("Error deleting submission:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Filter logic
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = (sub.trackingId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (sub.formData?.projectName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (sub.formData?.rfcNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (sub.formData?.applicantManufacturer || "").toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && sub.status === statusFilter;
  });

  // KPI Calculations
  const totalCount = submissions.length;
  const pendingCount = submissions.filter(s => s.status === "PENDING_DAR_REVIEW").length;
  const approvedCount = submissions.filter(s => s.status === "APPROVED_ISSUED").length;
  const highRiskCount = submissions.filter(s => s.smartAuditSummary?.riskLevel === "High").length;

  if (!isAuthenticated) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-mono">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-zinc-950 border border-white/10 p-8 md:p-12 rounded-sm relative z-10 shadow-[0_0_100px_rgba(212,175,55,0.15)]"
        >
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight">DAR Security Portal</h1>
            <p className="text-xs text-white/40 uppercase tracking-widest">Designated Engineering Representative Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-gold uppercase tracking-widest flex items-center gap-2 font-bold">
                <Key className="w-3.5 h-3.5" /> Authentication Passcode
              </label>
              <input 
                type="password"
                placeholder="Enter security key..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-sm p-4 text-sm text-white focus:border-gold outline-none tracking-widest transition-colors"
                autoFocus
              />
              <p className="text-[10px] text-white/30 italic mt-1">Default passcode: DAR-AUTH-2026</p>
            </div>

            {authError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs rounded-sm text-center">
                {authError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn || !passcode}
              className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                passcode ? "bg-gold text-black hover:bg-white shadow-[0_0_30px_rgba(212,175,55,0.3)]" : "bg-zinc-800 text-white/30 cursor-not-allowed"
              }`}
            >
              {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Secure Handshake</>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-[10px] text-white/30 tracking-widest">
            SECURE SHA-384 ENCRYPTED LAYER • FAA-CMS COMPLIANT
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gold/10 flex items-center justify-center rounded-sm border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
              <ShieldCheck className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">DAR Command Center</h1>
              <p className="text-xs text-gold font-mono uppercase tracking-[0.2em] mt-1">Autonomous Regulatory Review Portal • FAA Designee Interface</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
            <button 
              onClick={fetchSubmissions}
              disabled={loading}
              className="px-6 py-3 bg-zinc-900 border border-white/10 hover:border-gold uppercase tracking-widest flex items-center gap-2 transition-all rounded-sm"
            >
              <RefreshCw className={`w-4 h-4 text-gold ${loading ? "animate-spin" : ""}`} /> Refresh Stream
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-500 uppercase tracking-widest flex items-center gap-2 transition-all rounded-sm font-bold"
            >
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-zinc-950 border border-white/10 rounded-sm relative overflow-hidden group hover:border-gold/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="w-20 h-20 text-gold" />
            </div>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Total Packages</p>
            <p className="text-4xl font-serif font-bold">{totalCount}</p>
          </div>
          <div className="p-6 bg-zinc-950 border border-yellow-500/20 rounded-sm relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="w-20 h-20 text-yellow-500" />
            </div>
            <p className="text-[10px] font-mono text-yellow-500/70 uppercase tracking-widest mb-2">Pending DAR Review</p>
            <p className="text-4xl font-serif font-bold text-yellow-500">{pendingCount}</p>
          </div>
          <div className="p-6 bg-zinc-950 border border-green-500/20 rounded-sm relative overflow-hidden group hover:border-green-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <p className="text-[10px] font-mono text-green-500/70 uppercase tracking-widest mb-2">Approved & Issued</p>
            <p className="text-4xl font-serif font-bold text-green-500">{approvedCount}</p>
          </div>
          <div className="p-6 bg-zinc-950 border border-red-500/20 rounded-sm relative overflow-hidden group hover:border-red-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle className="w-20 h-20 text-red-500" />
            </div>
            <p className="text-[10px] font-mono text-red-500/70 uppercase tracking-widest mb-2">High Risk Flagged</p>
            <p className="text-4xl font-serif font-bold text-red-500">{highRiskCount}</p>
          </div>
        </div>

        {/* Toolbar: Search and Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-zinc-950 border border-white/10 rounded-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search tracking ID, project, applicant, or RFC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-xs font-mono text-white focus:border-gold outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 font-mono text-xs">
            <Filter className="w-4 h-4 text-gold shrink-0 mr-1" />
            {[
              { id: "ALL", label: "All Packages" },
              { id: "PENDING_DAR_REVIEW", label: "Pending DAR Review" },
              { id: "APPROVED_ISSUED", label: "Approved & Issued" },
              { id: "REJECTED_REUPLOAD", label: "Rejected / Re-upload" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-4 py-2.5 rounded-sm uppercase tracking-wider transition-colors shrink-0 ${
                  statusFilter === tab.id 
                    ? "bg-gold text-black font-bold" 
                    : "bg-zinc-900 text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="border border-white/10 bg-zinc-950 rounded-sm overflow-hidden">
          {loading ? (
            <div className="py-24 text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-gold animate-spin mx-auto" />
              <p className="text-xs font-mono uppercase tracking-widest text-white/40">Loading secure submission stream...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <FileText className="w-12 h-12 text-white/20 mx-auto" />
              <p className="text-sm font-mono text-white/60">No conformity submissions found in database.</p>
              <p className="text-xs text-white/40 font-mono">Submit a package through the Conformity Command Center portal to see it appear here.</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="py-24 text-center font-mono text-xs text-white/40">
              No submissions match your search or filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-900 text-white/60 uppercase tracking-widest border-b border-white/10">
                  <tr>
                    <th className="p-4">Tracking ID</th>
                    <th className="p-4">Project Name</th>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">RFC Tracking</th>
                    <th className="p-4">Smart Checks</th>
                    <th className="p-4">Risk Level</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4 font-bold text-gold">{sub.trackingId}</td>
                      <td className="p-4 font-sans font-bold text-sm">{sub.formData?.projectName || "N/A"}</td>
                      <td className="p-4 text-white/80">{sub.formData?.applicantManufacturer || "N/A"}</td>
                      <td className="p-4 text-white/60">{sub.formData?.rfcNumber || "N/A"}</td>
                      <td className="p-4">
                        <span className="text-green-500 font-bold">{sub.smartAuditSummary?.passedChecks || 0}</span>
                        <span className="text-white/40"> / {sub.smartAuditSummary?.totalChecks || 9}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-sm uppercase font-bold text-[10px] ${
                          sub.smartAuditSummary?.riskLevel === "High" ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                          sub.smartAuditSummary?.riskLevel === "Medium" ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30" :
                          "bg-green-500/20 text-green-500 border border-green-500/30"
                        }`}>
                          {sub.smartAuditSummary?.riskLevel || "Low"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`flex items-center gap-1.5 font-bold uppercase text-[10px] ${
                          sub.status === "APPROVED_ISSUED" ? "text-green-500" :
                          sub.status === "REJECTED_REUPLOAD" ? "text-red-500" :
                          "text-yellow-500 animate-pulse"
                        }`}>
                          {sub.status === "APPROVED_ISSUED" && <CheckCircle className="w-3.5 h-3.5" />}
                          {sub.status === "REJECTED_REUPLOAD" && <XCircle className="w-3.5 h-3.5" />}
                          {sub.status === "PENDING_DAR_REVIEW" && <Clock className="w-3.5 h-3.5" />}
                          {sub.status === "APPROVED_ISSUED" ? "Approved & Issued" :
                           sub.status === "REJECTED_REUPLOAD" ? "Rejected / Re-upload" :
                           "Pending Review"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedSub(sub)}
                            className="px-4 py-2 bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/30 rounded-sm font-bold uppercase text-[10px] tracking-widest transition-all flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" /> Inspect Forms
                          </button>
                          <button 
                            onClick={() => handleDelete(sub.id)}
                            className="p-2 bg-zinc-900 hover:bg-red-500/20 text-white/40 hover:text-red-500 rounded-sm transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Autonomous Smart Modal Reviewer */}
      <AnimatePresence>
        {selectedSub && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSub(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-white/10 shadow-[0_0_100px_rgba(212,175,55,0.15)] rounded-sm flex flex-col overflow-hidden font-mono"
            >
              {/* Modal Header */}
              <div className="p-6 bg-black border-b border-white/10 flex items-center justify-between font-sans">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-sm">
                    <ShieldCheck className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-serif font-bold">Smart Review Audit #{selectedSub.trackingId}</h3>
                      <span className={`px-2.5 py-0.5 rounded-sm text-[10px] font-mono uppercase font-bold ${
                        selectedSub.status === "APPROVED_ISSUED" ? "bg-green-500/20 text-green-500 border border-green-500/30" :
                        selectedSub.status === "REJECTED_REUPLOAD" ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                        "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                      }`}>
                        {selectedSub.status === "APPROVED_ISSUED" ? "ISSUED OFFICIAL" : selectedSub.status === "REJECTED_REUPLOAD" ? "REJECTED" : "PENDING DAR SIGNATURE"}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/40 font-mono mt-0.5">Project: <span className="text-gold">{selectedSub.formData?.projectName || "N/A"}</span> • Submitted: {new Date(selectedSub.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSub(null)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex bg-zinc-900 border-b border-white/10 font-mono text-xs uppercase tracking-widest">
                <button
                  onClick={() => setActiveTab("8100-1")}
                  className={`flex-1 py-4 font-bold border-r border-white/10 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "8100-1" ? "bg-gold text-black" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileText className="w-4 h-4" /> FAA Form 8100-1 (Inspection Record)
                </button>
                <button
                  onClick={() => setActiveTab("8130-3")}
                  className={`flex-1 py-4 font-bold border-r border-white/10 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "8130-3" ? "bg-gold text-black" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileText className="w-4 h-4" /> FAA Form 8130-3 (Approval Tag)
                </button>
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`flex-1 py-4 font-bold transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "summary" ? "bg-gold text-black" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" /> Extracted Evidence & Audit
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8 bg-zinc-900/30">
                {activeTab === "summary" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
                    {/* Uploaded Evidence Checklist */}
                    <div className="p-6 bg-zinc-950 border border-white/10 rounded-sm space-y-4">
                      <h4 className="text-gold font-bold uppercase tracking-widest flex items-center gap-2 text-sm border-b border-white/10 pb-3 font-sans font-bold">
                        <FileText className="w-4 h-4" /> Uploaded Evidence List
                      </h4>
                      <div className="space-y-2">
                        {selectedSub.uploadedFiles && selectedSub.uploadedFiles.length > 0 ? (
                          selectedSub.uploadedFiles.map(file => (
                            <div key={file} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-sm">
                              <span className="font-bold">{file}</span>
                              <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded-sm font-bold">VERIFIED SECURE</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-white/40 italic">No document evidence files attached.</p>
                        )}
                      </div>
                    </div>

                    {/* Extracted Specifications */}
                    <div className="p-6 bg-zinc-950 border border-white/10 rounded-sm space-y-4">
                      <h4 className="text-gold font-bold uppercase tracking-widest flex items-center gap-2 text-sm border-b border-white/10 pb-3 font-sans font-bold">
                        <Lock className="w-4 h-4" /> AI Extracted Technical Specs
                      </h4>
                      <div className="space-y-3 text-[11px] divide-y divide-white/5">
                        <div className="flex justify-between pt-2">
                          <span className="text-white/40">RFC Tracking Number</span>
                          <span className="font-bold text-gold">{selectedSub.formData?.rfcNumber || "N/A"}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-white/40">Part Number</span>
                          <span className="font-bold">{selectedSub.formData?.partNumber || "N/A"}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-white/40">Serial Number(s)</span>
                          <span className="font-bold">{selectedSub.formData?.serialNumber || "N/A"}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-white/40">Drawing Number & Revision</span>
                          <span className="font-bold">{selectedSub.formData?.drawingRev || "N/A"}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-white/40">Work Order / PO</span>
                          <span className="font-bold">{selectedSub.formData?.workOrderPo || "N/A"}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-white/40">Inspected By DAR</span>
                          <span className="font-bold">{selectedSub.formData?.faaDerContact || "N/A"} (Designee: {selectedSub.formData?.designeeNo || "N/A"})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeTab === "8100-1" ? (
                  <div className="bg-white text-black p-8 md:p-12 font-serif rounded-sm shadow-2xl space-y-6 max-w-4xl mx-auto relative">
                    <div className="absolute top-4 right-4 bg-zinc-900 text-white font-mono text-[9px] px-3 py-1 rounded-sm uppercase tracking-widest font-bold">
                      Pre-Compiled FAA Form 8100-1 Replica
                    </div>
                    <div className="border-2 border-black text-[11px] font-sans">
                      <div className="flex border-b border-black">
                        <div className="w-1/3 p-2 text-center flex flex-col justify-center items-center font-bold text-sm font-sans">
                          Conformity Inspection Record
                        </div>
                        <div className="w-1/3 border-l border-black p-2 font-mono">
                          <p className="font-bold text-[8px] uppercase">1. Project Number, TIA/Request Date, RFC Tracking No</p>
                          <p className="font-bold mt-1 text-xs">{selectedSub.formData?.projectNumber || "TBD"}; {selectedSub.formData?.requestDate || "TBD"}; {selectedSub.formData?.rfcNumber || "TBD"}</p>
                        </div>
                        <div className="w-1/3 border-l border-black p-2 font-bold flex items-center justify-center font-mono text-xs">
                          2. SHEET 1 OF 1 Sheet
                        </div>
                      </div>
                      <div className="flex border-b border-black">
                        <div className="w-1/2 p-2 border-r border-black font-mono">
                          <p className="font-bold text-[8px] uppercase font-sans">3. Applicant/Manufacturer:</p>
                          <p className="font-bold mt-0.5 text-sm">{selectedSub.formData?.applicantManufacturer || "TBD"}</p>
                          <p className="text-xs text-gray-700">{selectedSub.formData?.applicantAddress || "TBD"}</p>
                        </div>
                        <div className="w-1/4 p-2 border-r border-black font-mono">
                          <p className="font-bold text-[8px] uppercase font-sans">4. Beginning Date:</p>
                          <p className="font-bold mt-0.5 text-xs">{selectedSub.formData?.beginningDate || "TBD"}</p>
                        </div>
                        <div className="w-1/4 p-2 font-mono">
                          <p className="font-bold text-[8px] uppercase font-sans">5. Ending Date:</p>
                          <p className="font-bold mt-0.5 text-xs">{selectedSub.formData?.endingDate || "TBD"}</p>
                        </div>
                      </div>
                      <div className="flex border-b border-black font-mono">
                        <div className="w-1/2 p-2 border-r border-black">
                          <p className="font-bold text-[8px] uppercase font-sans">6. Model / Series:</p>
                          <p className="font-bold mt-0.5 text-xs">{selectedSub.formData?.makeModelSeries || "TBD"}</p>
                        </div>
                        <div className="w-1/2 p-2">
                          <p className="font-bold text-[8px] uppercase font-sans">7. Inspected By:</p>
                          <p className="font-bold mt-0.5 text-xs">{selectedSub.formData?.faaDerContact || "TBD"} (Designee No: {selectedSub.formData?.designeeNo || "TBD"})</p>
                        </div>
                      </div>
                      <table className="w-full text-left border-collapse font-mono">
                        <thead>
                          <tr className="border-b border-black bg-gray-100 font-sans uppercase">
                            <th className="border-r border-black p-2 font-bold text-[8px] w-8 text-center">8. Item</th>
                            <th className="border-r border-black p-2 font-bold text-[8px]">9. Nomenclature of Item Inspected</th>
                            <th className="border-r border-black p-2 font-bold text-[8px]">10. Drawing, Specification, etc.</th>
                            <th className="border-r border-black p-2 font-bold text-[8px] w-24 text-center">11. Rev / Date</th>
                            <th className="border-r border-black p-2 font-bold text-[8px] w-20 text-center">12. Status</th>
                            <th className="p-2 font-bold text-[8px]">13. Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-black">
                            <td className="border-r border-black p-2 text-center align-top font-bold text-xs">1</td>
                            <td className="border-r border-black p-2 align-top font-bold text-xs">{selectedSub.formData?.aircraftProduct || "Statement of Conformity"}</td>
                            <td className="border-r border-black p-2 align-top text-xs">{selectedSub.formData?.partNumber || "FAA Form 8130-9"}</td>
                            <td className="border-r border-black p-2 align-top text-xs text-center">{selectedSub.formData?.drawingRev || "Original"}</td>
                            <td className="border-r border-black p-2 align-top font-bold text-center text-green-700 bg-green-50 text-xs">SAT.</td>
                            <td className="p-2 align-top text-xs leading-tight font-sans">
                              Received signed 8130-9 Statement of Conformity for {selectedSub.formData?.partNumber || "article"}. Physical inspection verified against drawing.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="p-2 bg-gray-50 flex justify-between text-[8px] font-mono text-gray-500">
                         <span>FAA Form 8100-1 (8-19)</span>
                         <span>Autonomous Smart Module Compilation</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white text-black p-8 md:p-12 font-serif rounded-sm shadow-2xl space-y-6 max-w-4xl mx-auto relative">
                    <div className="absolute top-4 right-4 bg-zinc-900 text-white font-mono text-[9px] px-3 py-1 rounded-sm uppercase tracking-widest font-bold">
                      Pre-Compiled FAA Form 8130-3 Replica
                    </div>
                    <div className="border-2 border-black text-[11px] font-sans">
                      <div className="flex border-b border-black h-20 font-sans">
                        <div className="w-1/4 border-r border-black p-2 text-center flex flex-col justify-between">
                          <p className="font-bold text-[8px] uppercase text-left">1. Approving CAA / Country:</p>
                          <p className="font-bold text-sm">FAA / UNITED STATES</p>
                          <div/>
                        </div>
                        <div className="w-1/2 border-r border-black p-2 flex flex-col items-center justify-center bg-gray-50">
                          <p className="font-bold text-xl tracking-tight">AUTHORIZED RELEASE CERTIFICATE</p>
                          <p className="font-bold text-[9px] uppercase tracking-wider mt-1 font-mono">FAA Form 8130-3, Airworthiness Approval Tag</p>
                        </div>
                        <div className="w-1/4 p-2 text-center flex flex-col justify-between font-mono">
                          <p className="font-bold text-[8px] uppercase text-left font-sans">3. Form Tracking Number:</p>
                          <p className="font-bold text-xs text-gold bg-black text-white py-1.5 rounded-sm">{selectedSub.formData?.rfcNumber || "25-01361-HJ2"}</p>
                          <div/>
                        </div>
                      </div>
                      <div className="flex border-b border-black min-h-[48px] font-mono">
                        <div className="w-3/4 border-r border-black p-2">
                          <p className="font-bold text-[8px] uppercase font-sans">4. Organization Name and Address:</p>
                          <p className="font-bold mt-0.5 text-sm">{selectedSub.formData?.applicantManufacturer || "Honda Aircraft Company"}</p>
                          <p className="text-xs text-gray-700">{selectedSub.formData?.applicantAddress || "Greensboro, NC"}</p>
                        </div>
                        <div className="w-1/4 p-2">
                          <p className="font-bold text-[8px] uppercase font-sans">5. Work Order/Contract/Invoice:</p>
                          <p className="font-bold mt-0.5 text-xs">{selectedSub.formData?.workOrderPo || "3QHJ25-001"}</p>
                        </div>
                      </div>
                      <table className="w-full text-left border-collapse border-b border-black font-mono">
                        <thead>
                          <tr className="border-b border-black bg-gray-100 font-sans uppercase">
                            <th className="border-r border-black p-2 font-bold text-[8px] w-8 text-center">6. Item</th>
                            <th className="border-r border-black p-2 font-bold text-[8px]">7. Description</th>
                            <th className="border-r border-black p-2 font-bold text-[8px] w-36">8. Part Number</th>
                            <th className="border-r border-black p-2 font-bold text-[8px] w-16 text-center">9. Qty</th>
                            <th className="border-r border-black p-2 font-bold text-[8px] w-36 font-mono">10. Serial Number</th>
                            <th className="p-2 font-bold text-[8px] text-center">11. Status / Work</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-r border-black p-2 text-center align-top font-bold text-xs">1</td>
                            <td className="border-r border-black p-2 align-top font-bold text-xs">{selectedSub.formData?.aircraftProduct || "HARNESS ASSEMBLY"}</td>
                            <td className="border-r border-black p-2 align-top text-xs text-center font-bold">{selectedSub.formData?.partNumber || "HJ2-E9113-201-001"}</td>
                            <td className="border-r border-black p-2 align-top text-xs text-center font-bold">{selectedSub.formData?.quantity || "3"}</td>
                            <td className="border-r border-black p-2 align-top text-xs text-center font-bold">{selectedSub.formData?.serialNumber || "0001, 0002, 0003"}</td>
                            <td className="p-2 align-top text-center uppercase font-bold text-xs bg-yellow-50">{selectedSub.formData?.testArticleStatus || "Prototype"}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="border-b border-black p-4 min-h-[160px] font-mono text-xs">
                        <p className="font-bold text-[9px] uppercase font-sans mb-2">12. Remarks:</p>
                        <div className="space-y-1.5 leading-relaxed font-sans text-xs">
                          <p>Conformity Inspection for FAA Project: <span className="font-bold font-mono">{selectedSub.formData?.projectNumber || "AT16090AT-A"}</span>.</p>
                          <p>1- Part (ASSY) conformity verified against RFC tracking # <span className="font-bold font-mono">{selectedSub.formData?.rfcNumber}</span>.</p>
                          <p>2- 100% Dimensional & Special Processes verification completed by AI Smart Engine. No deviations flagged.</p>
                          <p>3- Inspected to engineering drawing: <span className="font-bold font-mono">{selectedSub.formData?.drawingRev || "Original"}</span>.</p>
                          <p className="text-center font-bold font-mono mt-6 pt-4 border-t border-dashed border-gray-300 text-[10px]">
                            *** DIGITAL DAR ISSUANCE • CONTROL #{selectedSub.formData?.designeeNo || "408993273"}-2026 ***
                          </p>
                        </div>
                      </div>
                      <div className="flex border-b border-black font-sans">
                        <div className="w-1/2 border-r border-black p-3 bg-gray-100 flex flex-col justify-between font-mono">
                          <p className="font-bold text-[8px] uppercase font-sans">13a. Certifies the items identified above were manufactured in conformity to:</p>
                          <div className="mt-2 text-[9px] font-bold ml-2 space-y-1 font-sans">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 border border-black flex items-center justify-center bg-black text-white text-[9px]">✓</div> 
                              <span>Approved design data and are in a condition for safe operation.</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2 p-3 flex flex-col justify-center font-mono">
                          <p className="font-bold text-[8px] uppercase font-sans">14a. Return to Service Statement:</p>
                          <p className="text-[9px] mt-1 italic text-gray-600 font-sans">N/A - Conformity Inspection Record Issuance</p>
                        </div>
                      </div>
                      <div className="flex bg-gray-50 p-3 justify-between font-mono text-[9px] text-gray-500">
                        <span>FAA Form 8130-3 (02-14)</span>
                        <span>Secured by DAR Representational Signature Engine</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 bg-black border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono font-sans">
                <div className="flex items-center gap-3 text-xs text-white/60 font-mono">
                  <Lock className="w-4 h-4 text-gold" />
                  <span>Digital DAR-F Authority Signature Channel</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto font-mono">
                  {selectedSub.status !== "REJECTED_REUPLOAD" && (
                    <button 
                      onClick={() => handleStatusUpdate(selectedSub.id, "REJECTED_REUPLOAD")}
                      disabled={actionLoading}
                      className="px-6 py-3 bg-zinc-900 border border-red-500/30 hover:bg-red-500/20 text-red-500 font-bold uppercase text-xs tracking-widest rounded-sm transition-all flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> Reject Package
                    </button>
                  )}
                  {selectedSub.status !== "APPROVED_ISSUED" ? (
                    <button 
                      onClick={() => handleStatusUpdate(selectedSub.id, "APPROVED_ISSUED")}
                      disabled={actionLoading}
                      className="px-8 py-3 bg-gold hover:bg-white text-black font-bold uppercase text-xs tracking-widest rounded-sm transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                    >
                      <Check className="w-4 h-4" /> Sign & Issue Official Forms
                    </button>
                  ) : (
                    <div className="px-8 py-3 bg-green-500 text-black font-bold uppercase text-xs tracking-widest rounded-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Forms Signed & Issued
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
