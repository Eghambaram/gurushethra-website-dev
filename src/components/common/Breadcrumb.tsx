import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/utils/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex items-center flex-wrap gap-1.5 text-sm list-none">
        <li>
          <Link
            href="/"
            className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-1.5"
          >
            <Home size={13} aria-hidden />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-gray-500" aria-hidden />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-400 hover:text-brand-gold transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
