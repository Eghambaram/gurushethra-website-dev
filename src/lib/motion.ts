export const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;

interface FadeUpOptions {
  index?: number;
  distance?: number;
  margin?: string;
}

/** Scroll-triggered entrance for grid/list cards. Fires once when scrolled into view. */
export function cardFadeUp({ index = 0, distance = 28, margin = "-60px" }: FadeUpOptions = {}) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { duration: 0.5, delay: index * 0.08, ease: EASE_STANDARD },
  } as const;
}

/** Mount-triggered entrance for cards that re-render on filter/tab change (not scroll-gated). */
export function cardMountFadeUp({ index = 0, distance = 28 }: FadeUpOptions = {}) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.08, ease: EASE_STANDARD },
  } as const;
}
