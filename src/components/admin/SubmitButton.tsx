"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  label: string;
  pendingLabel?: string;
}

export function SubmitButton({ label, pendingLabel = "Saving…" }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-brand-gold text-brand-background font-bold text-sm tracking-widest uppercase rounded hover:bg-[#C9A227] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
    >
      {pending && <Loader2 size={15} className="animate-spin" aria-hidden />}
      {pending ? pendingLabel : label}
    </button>
  );
}
