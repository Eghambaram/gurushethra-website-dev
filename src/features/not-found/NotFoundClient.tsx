"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function NotFoundClient() {
  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-8">
        {/* Animated 404 */}
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-black text-[10rem] sm:text-[14rem] leading-none text-white/5 select-none"
            aria-hidden
          >
            404
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          >
            <span className="font-heading font-black text-brand-gold text-5xl sm:text-6xl">404</span>
            <span className="text-white font-bold text-xl tracking-wide">Page Not Found</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-gray-400 text-base max-w-sm text-center leading-relaxed">
            The page you are looking for does not exist or has been moved.
            Even the best fighters lose their way sometimes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-7 py-3.5 bg-brand-gold text-brand-background font-bold text-sm tracking-widest uppercase rounded hover:bg-[#C9A227] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-7 py-3.5 border-2 border-white/15 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
