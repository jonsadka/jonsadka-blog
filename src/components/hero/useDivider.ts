import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

// The reveal: the hero loads fully built, then the divider travels in from the left edge,
// uncovering the spec. It lands at its resting point with a small settle, or, given a reach past
// that point, travels as it would to the reach and pulls back to rest from where it turns.
const REVEAL = { delay: 700, travel: 1300, pullback: 700 };
const C1 = 0.9;
const C3 = C1 + 1;
// Overshoots by a few percent near the end and comes back, so the divider lands like a handle
const easeOutBack = (t: number) => 1 + C3 * (t - 1) ** 3 + C1 * (t - 1) ** 2;
// The share of the travel where that overshoot peaks and turns back
const TURN = 1 - (2 * C1) / (3 * C3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

// The divider between the spec and the built hero, as a percentage across the frame. Only the
// handle starts a drag, so whatever sits under the line stays usable. A drag stops `edge` px short
// of either side, so the handle is never left where it is hard to grab.
export const useDivider = (initial: number, edge = 0) => {
  const [base, setSplit] = useState(initial);
  // How far the reveal travels before it pulls back to rest, when that is past the resting point
  const [reach, setReach] = useState<number | null>(null);
  // Milliseconds into the reveal; Infinity once it is over
  const [elapsed, setElapsed] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const motionFrame = useRef(0);

  const from = reach !== null && reach > base ? reach : base;
  const pullsBack = from > base;
  const turn = TURN * REVEAL.travel;
  const duration = pullsBack ? turn + REVEAL.pullback : REVEAL.travel;
  // The frame loop reads the length of the reveal as the layout settles
  const durationRef = useRef(duration);
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const settle = requestAnimationFrame(() => setElapsed(Infinity));
      return () => cancelAnimationFrame(settle);
    }
    let start = 0;
    const tick = (now: number) => {
      start ||= now;
      if (now - start >= durationRef.current) {
        setElapsed(Infinity);
        return;
      }
      setElapsed(now - start);
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
    setElapsed(Infinity);
  };

  // The divider's place a given time into the reveal
  const at = (ms: number) => {
    const outward = from * easeOutBack(Math.min(1, ms / REVEAL.travel));
    if (!pullsBack || ms <= turn) return outward;
    const peak = from * easeOutBack(TURN);
    return peak + (base - peak) * easeInOutCubic(Math.min(1, (ms - turn) / REVEAL.pullback));
  };
  const split = Math.max(0, Math.min(100, elapsed === Infinity ? base : at(elapsed)));
  // True until the reveal has started moving, so the handle can stay hidden at the edge
  const beforeReveal = elapsed === 0;
  // True while the reveal is still travelling
  const revealing = elapsed !== Infinity;
  // Where the reveal has got to, without the overshoot or the pullback, so it only ever moves forward
  const revealSplit = Math.min(from, at(pullsBack ? Math.min(elapsed, turn) : elapsed));

  const setFromPointer = (e: ReactPointerEvent<HTMLElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(edge, Math.min(rect.width - edge, e.clientX - rect.left));
    setSplit((x / rect.width) * 100);
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

  return { split, setSplit, setReach, frameProps, isDragging, beforeReveal, revealing, revealSplit };
};
