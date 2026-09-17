import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

// The reveal: the hero loads fully built, then the divider travels in from the left edge to its
// resting point, uncovering the spec, with a small settle at the end
const REVEAL = { delay: 700, travel: 1300 };
// Overshoots by a few percent near the end and comes back, so the divider lands like a handle
const easeOutBack = (t: number) => {
  const c1 = 0.9;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

// The divider between the spec and the built hero, as a percentage across the frame. Only the
// handle starts a drag, so whatever sits under the line stays usable.
export const useDivider = (initial: number) => {
  const [base, setSplit] = useState(initial);
  // 0 to 1 while the reveal travels; 1 means at rest
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const motionFrame = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const settle = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(settle);
    }
    let start = 0;
    const tick = (now: number) => {
      start ||= now;
      const t = (now - start) / REVEAL.travel;
      if (t >= 1) {
        setProgress(1);
        return;
      }
      setProgress(easeOutBack(t));
      motionFrame.current = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      // Skip it if someone already moved the divider
      if (motionFrame.current !== -1) motionFrame.current = requestAnimationFrame(tick);
    }, REVEAL.delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(motionFrame.current);
    };
  }, []);

  // Someone reached for the divider, so the reveal gets out of their way
  const stopMotion = () => {
    cancelAnimationFrame(motionFrame.current);
    motionFrame.current = -1;
    setProgress(1);
  };
  const split = Math.max(0, Math.min(100, base * progress));
  // True until the reveal has started moving, so the handle can stay hidden at the edge
  const beforeReveal = progress === 0;
  // True while the reveal is still travelling
  const revealing = progress < 1;
  // Where the reveal has got to, without the overshoot, so it only ever moves forward
  const revealSplit = base * Math.min(1, progress);

  const setFromPointer = (e: ReactPointerEvent<HTMLElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSplit(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
  };

  const frameProps = {
    ref: frameRef,
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('[data-divider]')) {
        stopMotion();
        dragging.current = true;
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromPointer(e);
      }
    },
    onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => dragging.current && setFromPointer(e),
    onPointerUp: () => {
      dragging.current = false;
      setIsDragging(false);
    },
    onKeyDown: () => stopMotion(),
  };

  return { split, setSplit, frameProps, isDragging, beforeReveal, revealing, revealSplit };
};
