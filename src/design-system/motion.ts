import { useEffect, useState } from 'react';

export const MOTION_TOKENS = {
  instant: '90ms',
  fast: '140ms',
  normal: '220ms',
  slow: '320ms',
  narrative: '460ms',
} as const;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  return reduced;
}

export function motionClass(className: string, reduced: boolean) {
  return reduced ? `${className} v2-motion-reduced` : className;
}
