import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDE_INTERVAL_MS } from '../services/hero-slider';

export const useHeroSlider = (slideCount: number) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    const nextIndex = ((i % slideCount) + slideCount) % slideCount;
    setIndex(nextIndex);
  };
  const next = () => setIndex((prev) => (prev + 1) % slideCount);
  const prev = () => setIndex((prev) => (prev - 1 + slideCount) % slideCount);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slideCount]);

  return {
    index,
    paused,
    setPaused,
    goTo,
    next,
    prev,
  };
};
