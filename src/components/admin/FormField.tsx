import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-gray-300">
          {label}
        </label>
        {hint && <span className="text-[11px] text-gray-600">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// Shared input/textarea/select styling so every admin form looks consistent.
export const adminInputClass =
  "w-full px-4 py-3 bg-brand-surface-2 border border-white/8 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors";
