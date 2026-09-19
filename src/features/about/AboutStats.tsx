import { getHero } from "@/services/hero.service";
import { Counter } from "@/components/common/Counter";

export async function AboutStats() {
  const hero = await getHero();
  return (
    <section className="py-16 bg-brand-surface border-y border-white/5" aria-label="Academy statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-white/5">
          {hero.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-1 py-4">
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="font-heading font-black text-brand-gold text-5xl leading-none"
              />
              <span className="text-gray-400 text-sm tracking-wide uppercase font-medium mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
