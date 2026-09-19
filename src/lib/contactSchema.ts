import { z } from "zod";

// Normalise Indian phone: strip leading +91 / 91 / spaces / dashes before validating
const normalisePhone = (v: string) =>
  v.trim().replace(/[\s\-()]/g, "").replace(/^(\+91|91)/, "");

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long")
    .regex(/[a-zA-Z]/, "Please enter a valid name"),
  phone: z
    .string()
    .transform(normalisePhone)
    .pipe(
      z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(100, "Email is too long"),
  program: z.string().min(1, "Please select a program"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
