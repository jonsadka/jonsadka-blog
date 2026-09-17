import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

// The load nudge: out and back over about a second, after the page has had a moment to settle
const NUDGE = { delay: 700, out: 420, hold: 90, back: 620, distance: 72 };
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

// The divider between the spec and the built hero, as a percentage across the frame. Only the
// handle starts a drag, so whatever sits under the line stays usable. On load the divider nudges
// toward the built side and settles back, so the eye finds it.
export const useDivider = (initial: number) => {
  const [base, setSplit] = useState(initial);
  // Added on top of the resting position while the nudge plays, so nothing else sees it
  const [nudge, setNudge] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const nudgeFrame = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let start = 0;
    const tick = (now: number) => {
      const width = frameRef.current?.getBoundingClientRect().width;
      if (!width) return;
      start ||= now;
      const t = now - start;
      const peak = (NUDGE.distance / width) * 100;
      if (t < NUDGE.out) {
        setNudge(peak * easeOutCubic(t / NUDGE.out));
      } else if (t < NUDGE.out + NUDGE.hold) {
        setNudge(peak);
      } else if (t < NUDGE.out + NUDGE.hold + NUDGE.back) {
        setNudge(peak * (1 - easeInOutCubic((t - NUDGE.out - NUDGE.hold) / NUDGE.back)));
      } else {
        setNudge(0);
        return;
      }
      nudgeFrame.current = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      // Skip it if someone already moved the divider
      if (nudgeFrame.current !== -1) nudgeFrame.current = requestAnimationFrame(tick);
    }, NUDGE.delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(nudgeFrame.current);
    };
  }, []);

  // Someone reached for the divider, so the nudge gets out of their way
  const stopNudge = () => {
    cancelAnimationFrame(nudgeFrame.current);
    nudgeFrame.current = -1;
    setNudge(0);
  };
  const split = Math.max(0, Math.min(100, base + nudge));

  const setFromPointer = (e: ReactPointerEvent<HTMLElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSplit(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
  };

  const frameProps = {
    ref: frameRef,
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('[data-divider]')) {
        stopNudge();
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromPointer(e);
      }
    },
    onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => dragging.current && setFromPointer(e),
    onPointerUp: () => {
      dragging.current = false;
    },
    onKeyDown: () => stopNudge(),
  };

  return { split, setSplit, frameProps };
};
