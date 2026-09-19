import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, max = 5, size = 16, className }: StarRatingProps) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating} out of ${max} stars`}
      role="img"
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-brand-gold text-brand-gold"
              : "fill-transparent text-gray-600"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}
