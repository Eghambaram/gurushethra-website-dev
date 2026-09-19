import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function AdminPageHeader({ title, description, action, backHref, backLabel = "Back" }: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-gold transition-colors mb-3"
        >
          <ArrowLeft size={14} aria-hidden />
          {backLabel}
        </Link>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-white text-2xl">{title}</h1>
          {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}
