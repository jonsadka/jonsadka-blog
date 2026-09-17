import { DRAFT_INK } from './draftInk';

// The line and knob at the divider. Drags are picked up by the frame through data-divider;
// arrow keys move it from here. With a mouse the whole strip grabs; on touch screens only the
// region around the knob does, so taps on the name and link near the line still land.
export const DividerHandle = ({
  split,
  setSplit,
  label,
  hidden = false,
  touch = false,
}: {
  split: number;
  setSplit: (next: number) => void;
  label: string;
  // Kept invisible at the edge until the reveal starts to travel
  hidden?: boolean;
  touch?: boolean;
}) => {
  const grab = touch ? {} : { 'data-divider': true };
  return (
    <div
      {...grab}
      className={`absolute group z-20 touch-none top-0 bottom-0 w-8 -ml-4 ${touch ? 'pointer-events-none' : 'cursor-col-resize'} ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ left: `${split}%` }}
    >
      <div
        className="absolute inset-y-0 left-1/2 w-px"
        style={{
          backgroundColor: DRAFT_INK.ink,
          // Solid only through the middle of the card, so it reads as a stroke of the drawing, not of the page
          maskImage: 'linear-gradient(to bottom, transparent, black 38%, black 62%, transparent)',
        }}
      />
      {touch && <div data-divider className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-28 pointer-events-auto cursor-col-resize" />}
      <div
        {...(touch ? { 'data-divider': true } : {})}
        role="slider"
        tabIndex={hidden ? -1 : 0}
        aria-label={label}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setSplit(Math.max(0, split - 5));
          if (e.key === 'ArrowRight') setSplit(Math.min(100, split + 5));
        }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          touch ? 'pointer-events-auto' : ''
        }`}
        style={{ backgroundColor: DRAFT_INK.ink, color: DRAFT_INK.onInk }}
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 1 1 5l3.5 4M9.5 1 13 5l-3.5 4" />
        </svg>
      </div>
    </div>
  );
};
