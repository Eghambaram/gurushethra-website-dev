"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle, RotateCcw, ChevronDown } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/contactSchema";

// Sourced from src/data/programs.json — update here if programs change
const PROGRAMS = [
  { value: "Tiny Tigers (4–6 Years)",        label: "Tiny Tigers",         meta: "4–6 Years" },
  { value: "Kids Karate (7–12 Years)",        label: "Kids Karate",         meta: "7–12 Years" },
  { value: "Junior Karate (13–17 Years)",     label: "Junior Karate",       meta: "13–17 Years" },
  { value: "Adult Karate (18+ Years)",        label: "Adult Karate",        meta: "18+ Years" },
  { value: "Silambam (All Ages)",             label: "Silambam",            meta: "All Ages" },
  { value: "Women's Self Defence (16+ Years)", label: "Women's Self Defence", meta: "16+ Years" },
  { value: "General Enquiry",                 label: "General Enquiry",     meta: "" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched", // validate on blur, then live as user types
  });

  const messageValue = watch("message") ?? "";

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center">
          <CheckCircle2 size={36} className="text-brand-gold" />
        </div>
        <h3 className="font-heading font-bold text-white text-2xl">Message Received!</h3>
        <p className="text-gray-400 max-w-sm leading-relaxed">
          Thank you for reaching out. Aasan Saravanan will get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); reset(); }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-gold transition-colors mt-2"
        >
          <RotateCcw size={14} aria-hidden />
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="name" label="Your Name" error={errors.name?.message} valid={!errors.name && touchedFields.name}>
          <input
            {...register("name")}
            id="name"
            placeholder="Rahul Sharma"
            autoComplete="name"
            className={inputCls(!!errors.name, !errors.name && !!touchedFields.name)}
          />
        </Field>
        <Field id="phone" label="Mobile Number" error={errors.phone?.message} valid={!errors.phone && touchedFields.phone}>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            placeholder="93805 21770"
            autoComplete="tel"
            inputMode="numeric"
            className={inputCls(!!errors.phone, !errors.phone && !!touchedFields.phone)}
          />
        </Field>
      </div>

      <Field id="email" label="Email Address" error={errors.email?.message} valid={!errors.email && touchedFields.email}>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className={inputCls(!!errors.email, !errors.email && !!touchedFields.email)}
        />
      </Field>

      <Field id="program" label="Select Program" error={errors.program?.message} valid={!errors.program && touchedFields.program}>
        <div className="relative">
          <select
            {...register("program")}
            id="program"
            className={inputCls(!!errors.program, !errors.program && !!touchedFields.program) + " appearance-none pr-10 cursor-pointer"}
            defaultValue=""
          >
            <option value="" disabled>Choose a program…</option>
            {PROGRAMS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}{p.meta ? ` — ${p.meta}` : ""}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            aria-hidden
          />
        </div>
      </Field>

      <Field
        id="message"
        label="Message"
        error={errors.message?.message}
        valid={!errors.message && !!touchedFields.message && messageValue.trim().length >= 10}
        hint={`${messageValue.length}/1000`}
      >
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder="Tell us about yourself, your goals, or any questions you have…"
          className={inputCls(!!errors.message, !errors.message && !!touchedFields.message && messageValue.trim().length >= 10) + " resize-none"}
        />
      </Field>

      <AnimatePresence>
        {submitError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            role="alert"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden />
            <span>
              Something went wrong. Please try again or{" "}
              <a href="tel:+919380521770" className="underline hover:text-red-300">
                call us directly
              </a>
              .
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2.5 w-full min-h-[44px] py-4 bg-brand-gold text-brand-background font-bold text-sm tracking-widest uppercase rounded hover:bg-[#C9A227] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
      >
        {isSubmitting
          ? <Loader2 size={16} className="animate-spin" aria-hidden />
          : <Send size={16} aria-hidden />
        }
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  valid?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, valid, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-gray-300">
          {label}
        </label>
        {hint && (
          <span className="text-[11px] text-gray-600 tabular-nums">{hint}</span>
        )}
      </div>
      {children}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-red-400 text-xs flex items-center gap-1"
            role="alert"
          >
            <AlertCircle size={11} aria-hidden />
            {error}
          </motion.p>
        ) : valid ? (
          <motion.p
            key="valid"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-emerald-500 text-xs flex items-center gap-1"
          >
            <CheckCircle2 size={11} aria-hidden />
            Looks good
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function inputCls(hasError: boolean, isValid: boolean = false) {
  if (hasError) {
    return "w-full px-4 py-3 bg-brand-surface-2 border border-red-500/60 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-colors";
  }
  if (isValid) {
    return "w-full px-4 py-3 bg-brand-surface-2 border border-emerald-500/40 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-colors";
  }
  return "w-full px-4 py-3 bg-brand-surface-2 border border-white/8 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-gold hover:border-white/15 transition-colors";
}
