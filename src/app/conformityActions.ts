"use server";

import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

export interface SubmissionRecord {
  id: string;
  trackingId: string;
  submittedAt: string;
  status: 'PENDING_DAR_REVIEW' | 'APPROVED_ISSUED' | 'REJECTED_REUPLOAD';
  formData: Record<string, any>;
  uploadedFiles: string[];
  smartAuditSummary: {
    passedChecks: number;
    totalChecks: number;
    riskLevel: string;
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'conformity-submissions.json');

// Helper to ensure data directory and file exist
async function ensureDataStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error("Error ensuring data store:", err);
  }
}

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function processAndSaveConformityPackage(payload: {
  formData: Record<string, any>;
  uploadedFiles: string[];
  passedChecks: number;
  totalChecks: number;
  riskLevel: string;
}) {
  await ensureDataStore();

  const id = Math.random().toString(36).substring(2, 12).toUpperCase();
  const trackingId = `DAR-PKG-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  const newRecord: SubmissionRecord = {
    id,
    trackingId,
    submittedAt: new Date().toISOString(),
    status: 'PENDING_DAR_REVIEW',
    formData: payload.formData,
    uploadedFiles: payload.uploadedFiles,
    smartAuditSummary: {
      passedChecks: payload.passedChecks,
      totalChecks: payload.totalChecks,
      riskLevel: payload.riskLevel,
    },
  };

  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    const records: SubmissionRecord[] = JSON.parse(rawData);
    records.unshift(newRecord); // Add newest first
    await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');

    // Attempt to send email notification
    if (process.env.SMTP_USER) {
      const emailContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border: 1px solid #c5a059;">
          <h1 style="color: #c5a059; border-bottom: 1px solid #333; padding-bottom: 20px; font-size: 24px;">New Smart Conformity Submission</h1>
          <div style="margin-top: 30px; line-height: 1.6;">
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Tracking ID:</strong> ${trackingId}</p>
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Project:</strong> ${payload.formData.projectName || 'Alpha Project'}</p>
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Applicant:</strong> ${payload.formData.applicantManufacturer || 'N/A'}</p>
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">RFC Number:</strong> ${payload.formData.rfcNumber || 'N/A'}</p>
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Uploaded Files:</strong> ${payload.uploadedFiles.join(', ')}</p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 30px 0;" />
            <p style="color: #c5a059; font-weight: bold;">Smart Audit Results:</p>
            <p>Passed ${payload.passedChecks} of ${payload.totalChecks} checks. Evaluated Risk Level: <span style="color: ${payload.riskLevel === 'High' ? '#ef4444' : payload.riskLevel === 'Medium' ? '#eab308' : '#22c55e'}; font-weight: bold;">${payload.riskLevel}</span></p>
            <p style="margin-top: 30px;"><a href="https://aeroairworthiness.com/admin/conformity" style="display: inline-block; padding: 12px 24px; background-color: #c5a059; color: #000; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">Access Command Center</a></p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `Conformity Engine <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'info@aeroairworthiness.com',
        subject: `[Conformity Command Center] Submission ${trackingId} - ${payload.formData.projectName || 'Project'}`,
        html: emailContent,
      }).catch(err => console.error("Email send warning (non-fatal):", err));
    }

    return { success: true, trackingId, id };
  } catch (err: any) {
    console.error("Error processing conformity package:", err);
    return { success: false, error: err.message || "Failed to save submission." };
  }
}

export async function getSubmissions(): Promise<SubmissionRecord[]> {
  await ensureDataStore();
  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Error reading submissions:", err);
    return [];
  }
}

export async function updateSubmissionStatus(id: string, status: SubmissionRecord['status']) {
  await ensureDataStore();
  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    const records: SubmissionRecord[] = JSON.parse(rawData);
    const updated = records.map(rec => rec.id === id ? { ...rec, status } : rec);
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return { success: true };
  } catch (err: any) {
    console.error("Error updating submission status:", err);
    return { success: false, error: err.message };
  }
}

export async function deleteSubmission(id: string) {
  await ensureDataStore();
  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    const records: SubmissionRecord[] = JSON.parse(rawData);
    const filtered = records.filter(rec => rec.id !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting submission:", err);
    return { success: false, error: err.message };
  }
}

export async function verifyAdminPasscode(passcode: string) {
  const correctPasscode = process.env.ADMIN_PASSCODE || "DAR-AUTH-2026";
  if (passcode === correctPasscode) {
    return { success: true };
  }
  return { success: false, error: "Invalid security passcode." };
}

