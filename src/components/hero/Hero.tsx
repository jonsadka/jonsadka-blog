import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { NoiseTopography, type DrawingSettings } from '../NoiseTopography';
import { DividerHandle } from './DividerHandle';
import { DrawingPanel } from './DrawingPanel';
import { RenderLoopSource } from './RenderLoopSource';
import { DRAFT_INK } from './draftInk';
import { useDivider } from './useDivider';

const DEFAULT_SETTINGS: DrawingSettings = { color: 'black', numCircles: 73, radiusFactor: 0.5, isInverse: false };

// The hero drawn twice at the same size: left of the divider as its own spec on a drafting sheet,
// right of it as built. The dimensions are measured from the page, so they stay true at every
// width. The drawing's spec box holds its render loop, and changing the built drawing's settings
// rewrites the values in that code.
export const Hero = () => {
  const { split, setSplit, frameProps } = useDivider(42);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Covers the whole section, as the frame the divider is measured against
  const [frameLayer, setFrameLayer] = useState<HTMLDivElement | null>(null);
  // The settings panel lives in that layer, above the divider, so it is never clipped
  const [panelPosition, setPanelPosition] = useState<{ right: number; bottom: number } | null>(null);

  // Start the divider 15% into the drawing, and keep it there as the layout settles or the
  // window resizes, until someone moves it
  const placed = useRef<number | null>(null);
  useLayoutEffect(() => {
    const frame = frameLayer?.parentElement;
    const art = frame?.querySelector<HTMLElement>('[data-built-art]');
    if (!frame || !art) return;
    const place = () => {
      const f = frame.getBoundingClientRect();
      const a = art.getBoundingClientRect();
      const next = ((a.left + a.width * 0.15 - f.left) / f.width) * 100;
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
    return () => observer.disconnect();
  }, [frameLayer, setSplit]);

  return (
    <section id="home" {...frameProps} className="relative min-h-screen select-none overflow-hidden">
      <div aria-hidden="true" className="relative z-0">
        <HeroLayer spec settings={settings} />
      </div>
      <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
        <HeroLayer settings={settings} />
      </div>
      <DividerHandle split={split} setSplit={setSplit} label="Move between the spec and the built hero" />
      <div ref={setFrameLayer} className="absolute inset-0 z-30 pointer-events-none">
        {panelPosition && (
          <div className="absolute pointer-events-auto" style={panelPosition}>
            <DrawingPanel settings={settings} onChange={setSettings} />
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

// A note on the spec, set in the ink
const Callout = ({ className, children }: { className: string; children: ReactNode }) => (
  <span
    className={`absolute z-10 px-1.5 rounded-sm font-mono text-[10px] leading-[18px] whitespace-nowrap ${className}`}
    style={{ backgroundColor: DRAFT_INK.ink, color: DRAFT_INK.onInk }}
  >
    {children}
  </span>
);

// One copy of the hero. The spec copy draws every part as a dashed outline in the ink, measures it,
// and puts the render loop where the drawing goes.
const HeroLayer = ({ spec = false, settings }: { spec?: boolean; settings: DrawingSettings }) => {
  const [cardRef, card] = useSize<HTMLDivElement>();
  const [titleRef, title] = useSize<HTMLHeadingElement>();
  const [artRef, art] = useSize<HTMLDivElement>();

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
        {/* Dimension line across the top of the card */}
        {spec && (
          <div className="absolute -top-7 left-0 right-0 h-4 flex items-center" style={{ color: DRAFT_INK.ink }}>
            <span className="h-3 w-px" style={{ backgroundColor: DRAFT_INK.ink }} />
            <span className="flex-1 h-px" style={{ backgroundColor: DRAFT_INK.line }} />
            <span className="px-2 font-mono text-[10px] tabular-nums">{card.width.toLocaleString()} px, max 1,400</span>
            <span className="flex-1 h-px" style={{ backgroundColor: DRAFT_INK.line }} />
            <span className="h-3 w-px" style={{ backgroundColor: DRAFT_INK.ink }} />
          </div>
        )}

        <div
          ref={cardRef}
          className={`relative w-full rounded-[2.5rem] md:rounded-[3rem] flex flex-col md:flex-row min-h-[600px] md:min-h-[680px] ${
            spec ? 'border border-dashed' : 'bg-white shadow-2xl overflow-hidden border border-white/50'
          }`}
          style={spec ? { borderColor: DRAFT_INK.ink, backgroundColor: DRAFT_INK.card } : undefined}
        >
          {spec && (
            <Callout className="-top-2.5 left-14">
              Card, radius 48, shadow 2xl, {card.height.toLocaleString()} tall
            </Callout>
          )}

          <div className="md:basis-[45%] md:shrink-0 flex flex-col justify-center items-start px-6 pt-16 pb-10 sm:px-12 sm:pt-16 sm:pb-12 md:py-16 md:pl-16 md:pr-10">
            <div className="relative">
              {spec && (
                <Callout className="-top-7 left-0">
                  Serif 600, {title.height ? Math.round(title.height / 0.9) : 72} px, leading 0.9, tracking −4.5%
                </Callout>
              )}
              <h1
                ref={titleRef}
                className={`text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.9] ${outline} ${
                  spec ? '' : 'text-gray-900'
                }`}
                style={drawn}
              >
                Jon Sadka
              </h1>
            </div>

            <div className="relative mt-12">
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
              {spec && <Callout className="top-0 left-full ml-4">Link to #work</Callout>}
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
                className="absolute inset-3 rounded-[2.25rem] border border-dashed overflow-hidden"
                style={{ borderColor: DRAFT_INK.line }}
              >
                <div className="absolute left-4 top-16">
                  <RenderLoopSource settings={settings} />
                </div>
                <Callout className="top-6 left-6">
                  NoiseTopography, canvas 2d, {art.width.toLocaleString()} × {art.height.toLocaleString()}
                </Callout>
                <Callout className="bottom-6 left-6 max-md:hidden">
                  Redraws every frame, pauses off screen, still under reduced motion
                </Callout>
                <Callout className="bottom-6 right-6 max-md:hidden">Settings panel, always open</Callout>
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
