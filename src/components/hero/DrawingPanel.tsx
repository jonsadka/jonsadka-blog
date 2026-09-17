import type { DrawingSettings } from '../NoiseTopography';

const LABEL = 'text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider';
const DENSITIES = [73, 512, 1800, 3276];
const SIZE_LABELS = ['1x', '7x', '25x', '45x'];

// The drawing's settings, always open. The hero holds the settings, so the source on the spec
// side rewrites itself as they change.
export const DrawingPanel = ({
  settings,
  onChange,
}: {
  settings: DrawingSettings;
  onChange: (next: DrawingSettings) => void;
}) => {
  const set = (patch: Partial<DrawingSettings>) => onChange({ ...settings, ...patch });

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-3 shadow-lg flex flex-col space-y-2 sm:space-y-3 w-48">
      {/* Color & Inverse Row */}
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col space-y-1 flex-1">
          <label htmlFor="drawing-color" className={LABEL}>
            Color
          </label>
          <select
            id="drawing-color"
            value={settings.color}
            onChange={(e) => set({ color: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded h-5 py-0 px-1.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors"
          >
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <span className={LABEL}>Inverse</span>
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
        </div>
      </div>

      {/*  Radius Slider */}
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <label htmlFor="drawing-radius" className={LABEL}>
            Radius
          </label>
          <span className="text-[10px] font-mono text-gray-500">{settings.radiusFactor}</span>
        </div>
        <input
          id="drawing-radius"
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={settings.radiusFactor}
          onChange={(e) => set({ radiusFactor: parseFloat(e.target.value) })}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-grab active:cursor-grabbing accent-black transition-all hover:accent-gray-800"
        />
      </div>

      {/* Resolution Segmented Control */}
      <div className="flex flex-col space-y-1">
        <span className={LABEL}>Resolution</span>
        <div className="flex bg-gray-100 rounded-lg rounded-bl-2xl rounded-br-2xl p-1 gap-1">
          {DENSITIES.map((option, index) => (
            <button
              key={option}
              type="button"
              aria-pressed={settings.numCircles === option}
              onClick={() => set({ numCircles: option })}
              className={`flex-1 py-1 text-[10px] font-mono font-bold rounded-md text-nowrap transition-all duration-200 ${
                index === 0 ? 'rounded-bl-xl' : ''
              } ${index === DENSITIES.length - 1 ? 'rounded-br-xl' : ''} ${
                settings.numCircles === option
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/50'
              }`}
            >
              {SIZE_LABELS[index]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
