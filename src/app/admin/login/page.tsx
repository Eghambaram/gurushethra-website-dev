import type { Metadata } from "next";
import { signIn } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-background px-4">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-brand-surface border border-white/8 flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="font-heading font-black text-white text-2xl">GIMA Admin</h1>
          <p className="text-gray-500 text-sm">Sign in to manage site content.</p>
        </div>

        {error && (
          <p className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm" role="alert">
            {error}
          </p>
        )}

        <form action={signIn} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-brand-surface-2 border border-white/8 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors"
              placeholder="you@gurushethra.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-brand-surface-2 border border-white/8 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full min-h-[44px] py-3 mt-2 bg-brand-gold text-brand-background font-bold text-sm tracking-widest uppercase rounded hover:bg-[#C9A227] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
