import { useState } from 'react';
import { Dices, SlidersHorizontal } from 'lucide-react';
import type { DrawingSettings } from '../NoiseTopography';

const LABEL = 'text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider';

// Cells across the drawing's short side, so the grid reads the same on every screen: a 9 × 9, a
// 4× finer one, and a dense texture
const DENSITIES = [9, 18, 45];
const DENSITY_LABELS = ['1x', '4x', '25x'];
const newSeed = () => String(100000 + Math.floor(Math.random() * 900000));

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

  if (collapsible && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg px-3 h-8 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-700"
      >
        <SlidersHorizontal size={12} strokeWidth={2} aria-hidden="true" />
        Play with it
      </button>
    );
  }

  return (
    <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-3 shadow-lg flex flex-col space-y-3 w-64">
      {/* Inverse and Radius: labels on one line, toggle and slider centered on the next. On small
          screens a small close sits at the end of the label line. */}
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 items-center">
        <span className={LABEL}>Inverse</span>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="drawing-radius" className={LABEL}>
            Radius
          </label>
          {/* The value sits on the label line, or on phones at the end of the slider */}
          {!collapsible && <span className="text-[10px] font-mono text-gray-500 tabular-nums">{settings.radiusFactor}</span>}
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
        <div className="flex items-center gap-2 min-w-0">
          <input
            id="drawing-radius"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings.radiusFactor}
            onChange={(e) => set({ radiusFactor: parseFloat(e.target.value) })}
            className="flex-1 min-w-0 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-grab active:cursor-grabbing accent-black transition-all hover:accent-gray-800"
          />
          {collapsible && <span className="text-[10px] font-mono text-gray-500 tabular-nums w-5 text-right">{settings.radiusFactor}</span>}
        </div>
      </div>

      {/* Resolution with the reseed beside it; the row follows the panel's rounded corners */}
      <div className="flex flex-col space-y-1">
        <span className={LABEL}>Resolution</span>
        <div className="flex gap-2">
          <div className="flex flex-1 bg-gray-100 rounded-lg rounded-bl-2xl p-1 gap-1">
            {DENSITIES.map((value, index) => (
              <button
                key={value}
                type="button"
                aria-pressed={settings.cellsAcross === value}
                onClick={() => set({ cellsAcross: value })}
                className={`flex-1 py-1 px-1 text-[10px] font-mono font-bold rounded-md text-nowrap transition-all duration-200 ${
                  index === 0 ? 'rounded-bl-xl' : ''
                } ${settings.cellsAcross === value ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black hover:bg-gray-200/50'}`}
              >
                {DENSITY_LABELS[index]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => set({ seed: newSeed() })}
            aria-label="Reseed the noise"
            title="Reseed the noise"
            className="w-[30px] h-[30px] shrink-0 rounded-lg rounded-br-2xl bg-gray-100 text-gray-600 flex items-center justify-center hover:text-black hover:bg-gray-200/70 active:bg-gray-200 transition-colors"
          >
            <Dices size={13} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
