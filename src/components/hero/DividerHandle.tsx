import { DRAFT_INK } from './draftInk';

// The line and knob at the divider. Drags are picked up by the frame through data-divider;
// arrow keys move it from here.
export const DividerHandle = ({
  split,
  setSplit,
  label,
}: {
  split: number;
  setSplit: (next: number) => void;
  label: string;
}) => (
  <div
    data-divider
    className="absolute group z-20 touch-none top-0 bottom-0 w-8 -ml-4 cursor-col-resize"
    style={{ left: `${split}%` }}
  >
    <div className="absolute inset-y-0 left-1/2 w-px" style={{ backgroundColor: DRAFT_INK.ink }} />
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(split)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setSplit(Math.max(0, split - 5));
        if (e.key === 'ArrowRight') setSplit(Math.min(100, split + 5));
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full font-mono text-[10px] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      style={{ backgroundColor: DRAFT_INK.ink, color: DRAFT_INK.onInk }}
    >
      ⇆
    </div>
  </div>
);
