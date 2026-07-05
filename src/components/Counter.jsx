import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animated counter that counts up when scrolled into view.
 */
export default function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <strong ref={ref}>
      {value}
      {suffix}
    </strong>
  );
}
