import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import type { DrawingSettings } from '../NoiseTopography';

const LABEL = 'text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider';

// Cells across the drawing's short side, so the grid reads the same on every screen: a 9 × 9, a
// 4× finer one, a dense texture, and a denser one with fainter outlines still
const DENSITIES = [9, 18, 45, 90];
const DENSITY_LABELS = ['1x', '4x', '25x', '100x'];
// Corner radius as a share of half the cell: square, soft, rounded, circle. Soft corners only show
// on the coarsest grid, so the finer ones offer the other three.
const RADII = [
  { value: 0, label: 'Square' },
  { value: 0.25, label: 'Soft corners', coarseOnly: true },
  { value: 0.5, label: 'Rounded' },
  { value: 1, label: 'Circle' },
];
const radiiFor = (cellsAcross: number) => RADII.filter((radius) => cellsAcross === DENSITIES[0] || !radius.coarseOnly);
// The offered radius closest to the current one, the rounder on a tie
const nearestRadius = (cellsAcross: number, current: number) =>
  radiiFor(cellsAcross).reduce((best, { value }) => (Math.abs(value - current) <= Math.abs(best - current) ? value : best), 0);

// How fast the drawing breathes and drifts, as a multiple of its normal pace
const SPEEDS = [
  { value: 0.5, label: 'Slow' },
  { value: 1, label: 'Normal' },
  { value: 2, label: 'Fast' },
];

// The shape a cell takes at that radius
const RadiusPreview = ({ factor }: { factor: number }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
    <rect x="1.5" y="1.5" width="11" height="11" rx={5.5 * factor} />
  </svg>
);

// The drawing's settings, always open. The hero holds the settings, so the source on the spec
// side rewrites itself as they change. On small screens the panel starts as a chip and opens on
// tap, so it does not cover the drawing.
export const DrawingPanel = ({
  settings,
  onChange,
  collapsible = false,
}: {
  settings: DrawingSettings;
  onChange: (next: DrawingSettings) => void;
  collapsible?: boolean;
}) => {
  const set = (patch: Partial<DrawingSettings>) => onChange({ ...settings, ...patch });
  const [open, setOpen] = useState(false);
  const radii = radiiFor(settings.cellsAcross);

  if (collapsible && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg px-3 h-8 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-700"
      >
        <SlidersHorizontal size={12} strokeWidth={2} aria-hidden="true" />
        Change me
      </button>
    );
  }

  return (
    <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-3 shadow-lg flex flex-col space-y-3 w-64">
      {/* Inverse and Resolution: labels on one line, toggle and densities centered on the next. On
          small screens a small close sits at the end of the label line. */}
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 items-center">
        <span className={LABEL}>Inverse</span>
        <div className="flex justify-between items-center gap-2">
          <span className={LABEL}>Resolution</span>
          {collapsible && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="h-5 w-5 -my-1 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M1 1l6 6M7 1L1 7" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="button"
          aria-label="Inverse"
          aria-pressed={settings.isInverse}
          onClick={() => set({ isInverse: !settings.isInverse })}
          className={`w-8 h-5 rounded-full relative transition-colors duration-200 ease-in-out ${
            settings.isInverse ? 'bg-black' : 'bg-gray-200'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
              settings.isInverse ? 'translate-x-3' : 'translate-x-0'
            }`}
          />
        </button>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1 min-w-0">
          {DENSITIES.map((value, index) => (
            <button
              key={value}
              type="button"
              aria-pressed={settings.cellsAcross === value}
              onClick={() => set({ cellsAcross: value, radiusFactor: nearestRadius(value, settings.radiusFactor) })}
              className={`flex-1 py-1 px-1 text-[10px] font-mono font-bold rounded-md text-nowrap transition-all duration-200 ${
                settings.cellsAcross === value ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black hover:bg-gray-200/50'
              }`}
            >
              {DENSITY_LABELS[index]}
            </button>
          ))}
        </div>
      </div>

      {/* Radius, with the speed beside it; the row follows the panel's rounded corners */}
      <div className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-1">
        <span className={LABEL}>Radius</span>
        <label htmlFor="drawing-speed" className={LABEL}>
          Speed
        </label>
        <div className="flex bg-gray-100 rounded-lg rounded-bl-2xl p-1 gap-1 min-w-0">
          {radii.map(({ value, label }, index) => (
            <button
              key={value}
              type="button"
              aria-label={label}
              title={label}
              aria-pressed={settings.radiusFactor === value}
              onClick={() => set({ radiusFactor: value })}
              className={`flex-1 h-[22px] rounded-md flex items-center justify-center transition-all duration-200 ${
                index === 0 ? 'rounded-bl-xl' : ''
              } ${settings.radiusFactor === value ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black hover:bg-gray-200/50'}`}
            >
              <RadiusPreview factor={value} />
            </button>
          ))}
        </div>
        {/* A native select laid invisibly over the shown value, so phones open their own picker. Its
            16 px text keeps iOS from zooming the page when it takes focus. */}
        <div className="relative w-[76px] h-[30px] pl-2.5 pr-2 rounded-lg rounded-br-2xl bg-gray-100 text-gray-600 flex items-center justify-between hover:text-black hover:bg-gray-200/70 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-black">
          <span className="text-[10px] font-mono font-bold">{SPEEDS.find(({ value }) => value === settings.speed)?.label}</span>
          <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
          <select
            id="drawing-speed"
            value={settings.speed}
            onChange={(e) => set({ speed: Number(e.target.value) })}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base"
          >
            {SPEEDS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
