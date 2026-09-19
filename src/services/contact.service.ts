import { Resend } from "resend";
import { createPublicClient } from "@/lib/supabase/public";
import type { ContactFormData } from "@/lib/contactSchema";

export interface ContactFormResult {
  success: boolean;
  message: string;
}

// Anon insert only — never chain .select() here. contact_submissions has an
// admin-only SELECT policy, so a chained .select() on the anon insert gets
// blocked by RLS even though the row itself inserts fine.
async function saveSubmission(data: ContactFormData) {
  const supabase = createPublicClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: data.name,
    phone: data.phone,
    email: data.email,
    program: data.program,
    message: data.message,
  });
  if (error) console.error("Failed to save contact submission:", error);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  await saveSubmission(data);

  const apiKey = process.env.RESEND_API_KEY;

  // If no API key is configured (local dev without .env.local), warn loudly rather
  // than silently pretending to send — this must never happen in production.
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — contact form submission was not emailed:", data);
    return {
      success: true,
      message: "Thank you for your enquiry. We will get back to you within 24 hours.",
    };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Gurushethra Institute of Martial Arts <onboarding@resend.dev>",
    to: ["gurushethra1991@gmail.com"],
    replyTo: data.email,
    subject: `New Enquiry from ${data.name} — ${data.program}`,
    text: [
      `Name:    ${data.name}`,
      `Phone:   ${data.phone}`,
      `Email:   ${data.email}`,
      `Program: ${data.program}`,
      ``,
      `Message:`,
      data.message,
    ].join("\n"),
    html: `
      <h2 style="margin:0 0 16px">New Enquiry — GIMA Website</h2>
      <table cellpadding="4" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td style="color:#888;padding-right:16px">Name</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
        <tr><td style="color:#888">Phone</td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td style="color:#888">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="color:#888">Program</td><td>${escapeHtml(data.program)}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px">Message</h3>
      <p style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    `,
  });

  if (error) {
    console.error("Resend failed to send contact form email:", error);
    return {
      success: false,
      message: "Something went wrong sending your message. Please call us directly.",
    };
  }

  return {
    success: true,
    message: "Thank you for your enquiry. We will get back to you within 24 hours.",
  };
}
