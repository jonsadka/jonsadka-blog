import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { NoiseTopography, type DrawingSettings } from '../NoiseTopography';
import { useMedia } from '../../hooks/useMedia';
import { DividerHandle } from './DividerHandle';
import { DrawingPanel } from './DrawingPanel';
import { RenderLoopSource } from './RenderLoopSource';
import { DRAFT_INK } from './draftInk';
import { useDivider } from './useDivider';

const DEFAULT_SETTINGS: DrawingSettings = {
  color: 'black',
  cellsAcross: 9,
  radiusFactor: 0.5,
  isInverse: false,
  seed: '660939',
  speed: 1,
};

// On phones a drag stops this far from the screen's edges, and the divider rests no nearer than it
const PHONE_EDGE = 32;

// The divider's client x while the reveal travels, null otherwise. Callouts pop in as it passes them.
const RevealContext = createContext<number | null>(null);

// The hero drawn twice at the same size: left of the divider as its own spec on a drafting sheet,
// right of it as built. The dimensions are measured from the page, so they stay true at every
// width. The drawing's spec box holds its render loop, and changing the built drawing's settings
// rewrites the values in that code. On load the hero is built; the divider then sweeps in from the
// left and uncovers the spec.
export const Hero = () => {
  const small = useMedia('(max-width: 767px)');
  const coarse = useMedia('(pointer: coarse)');
  // On phones a drag stops with the knob just inside the card, clear of the screen edges
  const { split, setSplit, setReach, frameProps, isDragging, beforeReveal, revealing, revealSplit } = useDivider(
    42,
    small ? PHONE_EDGE : 0
  );
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Covers the whole section, as the frame the divider is measured against
  const [frameLayer, setFrameLayer] = useState<HTMLDivElement | null>(null);
  const [frameRect, setFrameRect] = useState<{ left: number; width: number } | null>(null);
  // The settings panel lives in that layer, above the divider, so it is never clipped
  const [panelPosition, setPanelPosition] = useState<{ right: number; bottom: number } | null>(null);

  // Rest the divider where none of the drawing starts as spec: between the name and the drawing, or
  // on phones, where the drawing sits below the name, just left of the name. The reveal first
  // travels three quarters across the drawing, so most of its source shows, and pulls back to rest.
  // Keep it there as the layout settles or the window resizes, until someone moves it.
  const phoneRest = small;
  const placed = useRef<number | null>(null);
  useLayoutEffect(() => {
    const frame = frameLayer?.parentElement;
    const art = frame?.querySelector<HTMLElement>('[data-built-art]');
    const name = frame?.querySelector<HTMLElement>('[data-hero-name]');
    if (!frame || !art || !name) return;
    const place = () => {
      const f = frame.getBoundingClientRect();
      const a = art.getBoundingClientRect();
      const n = name.getBoundingClientRect();
      const restX = phoneRest ? Math.max(f.left + PHONE_EDGE, n.left - 16) : Math.min((n.right + a.left) / 2, a.left);
      const reachX = a.left + a.width * 0.75;
      const next = ((restX - f.left) / f.width) * 100;
      setReach(((reachX - f.left) / f.width) * 100);
      setFrameRect({ left: f.left, width: f.width });
      setPanelPosition({ right: f.right - a.right + 12, bottom: f.bottom - a.bottom + 12 });
      // Only follow the layout while the divider still sits where it was last placed
      const last = placed.current;
      placed.current = next;
      setSplit((prev) => (last === null || prev === last ? next : prev));
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(frame);
    observer.observe(art);
    observer.observe(name);
    return () => observer.disconnect();
  }, [frameLayer, setSplit, setReach, phoneRest]);

  // On phones the callouts are the bare element names; there is no room for the measurements
  const layerProps = { settings, tagsOnly: small };
  const revealX = revealing && frameRect ? frameRect.left + (revealSplit / 100) * frameRect.width : null;

  return (
    // Only a drag needs select-none, so the code on the spec side stays selectable
    <section id="home" {...frameProps} className={`relative min-h-screen overflow-hidden ${isDragging ? 'select-none' : ''}`}>
      <RevealContext.Provider value={revealX}>
        <div aria-hidden="true" className="relative z-0">
          <HeroLayer spec {...layerProps} />
        </div>
      </RevealContext.Provider>
      <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
        <HeroLayer {...layerProps} />
      </div>
      <DividerHandle
        split={split}
        setSplit={setSplit}
        label="Move between the spec and the built hero"
        hidden={beforeReveal}
        touch={coarse}
      />
      <div ref={setFrameLayer} className="absolute inset-0 z-30 pointer-events-none">
        {panelPosition && (
          <div className="absolute pointer-events-auto" style={panelPosition}>
            <DrawingPanel settings={settings} onChange={setSettings} collapsible={small} />
          </div>
        )}
      </div>
    </section>
  );
};

const useSize = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0];
      setSize({ width: Math.round(box.inlineSize), height: Math.round(box.blockSize) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
};

// Hidden until the divider has passed this element's left edge. The reveal position only moves
// forward, so once shown a callout stays shown.
const useRevealed = <T extends HTMLElement>() => {
  const [el, setEl] = useState<T | null>(null);
  const revealX = useContext(RevealContext);
  const shown = revealX === null || (el !== null && el.getBoundingClientRect().left < revealX);
  return [setEl, shown] as const;
};
const popClass = (shown: boolean) =>
  `transition-[opacity,transform] duration-300 ease-out origin-left ${shown ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`;

// A note on the spec, set in the ink
const Callout = ({ className, children }: { className: string; children: ReactNode }) => {
  const [ref, shown] = useRevealed<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={`absolute z-10 px-1.5 rounded-sm font-mono text-[10px] leading-[18px] whitespace-nowrap ${popClass(shown)} ${className}`}
      style={{ backgroundColor: DRAFT_INK.ink, color: DRAFT_INK.onInk }}
    >
      {children}
    </span>
  );
};

// One copy of the hero. The spec copy draws every part as a dashed outline in the ink, measures it,
// and puts the render loop where the drawing goes.
const HeroLayer = ({ spec = false, settings, tagsOnly }: { spec?: boolean; settings: DrawingSettings; tagsOnly: boolean }) => {
  const [cardRef, card] = useSize<HTMLDivElement>();
  const [titleRef, title] = useSize<HTMLHeadingElement>();
  const [artRef, art] = useSize<HTMLDivElement>();
  const [dimRef, dimShown] = useRevealed<HTMLDivElement>();

  const outline = spec ? 'outline outline-1 outline-dashed outline-offset-4' : '';
  const drawn = spec ? { outlineColor: DRAFT_INK.line, color: DRAFT_INK.ink } : undefined;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 pt-24 sm:pt-24 md:pt-24 bg-[#E5E5E5]">
      {/* The drafting sheet, solid only through the middle fifth and fading into the page gray above and below */}
      {spec && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: DRAFT_INK.ground,
            backgroundImage: `linear-gradient(${DRAFT_INK.gridMajor} 1px, transparent 1px), linear-gradient(90deg, ${DRAFT_INK.gridMajor} 1px, transparent 1px), linear-gradient(${DRAFT_INK.gridMinor} 1px, transparent 1px), linear-gradient(90deg, ${DRAFT_INK.gridMinor} 1px, transparent 1px)`,
            backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)',
          }}
        />
      )}
      <div className="relative w-full max-w-[1400px]">
        {/* Dimension line across the top of the card; the max only matters once the card has reached it */}
        {spec && (
          <div
            ref={dimRef}
            className={`absolute -top-7 left-0 right-0 h-4 flex items-center ${popClass(dimShown)}`}
            style={{ color: DRAFT_INK.ink }}
          >
            <span className="h-3 w-px" style={{ backgroundColor: DRAFT_INK.ink }} />
            <span className="flex-1 h-px" style={{ backgroundColor: DRAFT_INK.line }} />
            <span className="px-2 font-mono text-[10px] tabular-nums">
              {card.width >= 1400 ? '1,400 px (max)' : `${card.width.toLocaleString()} px`}
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: DRAFT_INK.line }} />
            <span className="h-3 w-px" style={{ backgroundColor: DRAFT_INK.ink }} />
          </div>
        )}

        <div
          ref={cardRef}
          className={`relative w-full rounded-[2.5rem] md:rounded-[3rem] flex flex-col md:flex-row md:min-h-[680px] ${
            spec ? 'border border-dashed' : 'bg-white shadow-2xl overflow-hidden border border-white/50'
          }`}
          style={spec ? { borderColor: DRAFT_INK.ink, backgroundColor: DRAFT_INK.card } : undefined}
        >
          {spec && (
            <Callout className="-top-2.5 left-14">
              {tagsOnly ? 'div' : `Card, radius 48, shadow 2xl, ${card.height.toLocaleString()} tall`}
            </Callout>
          )}

          <div className="md:basis-[45%] md:shrink-0 flex flex-col justify-center items-start px-6 pt-16 pb-10 sm:px-12 sm:pt-16 sm:pb-12 md:py-16 md:pl-16 md:pr-10">
            <div className="relative">
              {spec && (
                <Callout className="-top-7 left-0">
                  {tagsOnly ? 'h1' : `Serif 600, ${title.height ? Math.round(title.height / 0.9) : 72} px, leading 0.9, tracking −4.5%`}
                </Callout>
              )}
              {/* The nav watches the spec copy of the name, which the divider never clips */}
              <h1
                ref={titleRef}
                data-hero-name={spec ? true : undefined}
                className={`text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.9] ${outline} ${
                  spec ? '' : 'text-gray-900'
                }`}
                style={drawn}
              >
                Jon Sadka
              </h1>
            </div>

            <div className="relative mt-6 md:mt-12">
              <a
                href="/#work"
                tabIndex={spec ? -1 : undefined}
                className={`font-mono text-xs pb-1 border-b ${outline} ${
                  spec ? 'border-transparent' : 'text-gray-900 border-gray-400 hover:border-gray-900'
                }`}
                style={drawn}
              >
                View selected works
              </a>
              {spec && <Callout className="top-0 left-full ml-4">{tagsOnly ? 'a' : 'Link to #work'}</Callout>}
            </div>
          </div>

          <div
            ref={artRef}
            data-built-art={spec ? undefined : true}
            className={`relative md:basis-[55%] md:grow min-h-[380px] md:min-h-0 ${
              spec ? '' : 'bg-gray-50 border-t md:border-t-0 md:border-l border-black/5'
            }`}
          >
            {spec ? (
              <div
                className="absolute inset-3 max-md:top-0 rounded-[2.25rem] border border-dashed overflow-hidden"
                style={{ borderColor: DRAFT_INK.line }}
              >
                <div className="absolute left-4 top-16">
                  <RenderLoopSource settings={settings} />
                </div>
                <Callout className="top-6 left-6">
                  {tagsOnly ? 'canvas' : `NoiseTopography, canvas 2d, ${art.width.toLocaleString()} × ${art.height.toLocaleString()}`}
                </Callout>
                <Callout className="bottom-6 left-6 max-md:hidden">
                  Redraws every frame, pauses off screen, still under reduced motion
                </Callout>
                {/* Sits above the real panel rather than under it */}
                <Callout className="bottom-[172px] right-6 max-md:hidden">Settings panel, always open</Callout>
              </div>
            ) : (
              <NoiseTopography settings={settings} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
