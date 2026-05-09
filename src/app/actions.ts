"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const certificationGoal = formData.get('certification_goal') as string;
  const projectDetails = formData.get('project_details') as string;

  if (!name || !email || !projectDetails) {
    return { success: false, error: "Missing required fields." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Aero Airworthiness <onboarding@resend.dev>',
      to: ['info@aeroairworthiness.com'],
      subject: `New Certification Assessment: ${company || 'General Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border: 1px solid #c5a059;">
          <h1 style="color: #c5a059; border-bottom: 1px solid #333; padding-bottom: 20px; font-size: 24px;">New Certification Assessment Request</h1>
          
          <div style="margin-top: 30px; space-y: 20px;">
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Principal Name:</strong><br/> ${name}</p>
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Email Address:</strong><br/> ${email}</p>
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Organization:</strong><br/> ${company || 'N/A'}</p>
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Certification Goal:</strong><br/> ${certificationGoal}</p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 30px 0;" />
            <p><strong style="color: #c5a059; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Mission Scope:</strong></p>
            <p style="background-color: #111; padding: 20px; border-left: 4px solid #c5a059; font-style: italic;">${projectDetails}</p>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 10px; color: #666; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
            Secure Authority Channel • Aero Airworthiness Certification LLC
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
