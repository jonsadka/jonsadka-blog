import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import type { DrawingSettings } from '../NoiseTopography';
import { DRAFT_INK } from './draftInk';

const K = ({ children }: { children: ReactNode }) => <span style={{ color: DRAFT_INK.code.strong }}>{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span style={{ color: DRAFT_INK.code.faint }}>{children}</span>;
const V = ({ children }: { children: ReactNode }) => <span style={{ color: DRAFT_INK.ink }}>{children}</span>;

// A value that flashes when it changes, so the edit is visible in the source
const Live = ({ value }: { value: string }) => {
  const [flash, setFlash] = useState(false);
  const shown = useRef(value);
  useEffect(() => {
    if (shown.current === value) return;
    shown.current = value;
    setFlash(true);
    const id = setTimeout(() => setFlash(false), 700);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <span
      className="rounded-sm px-0.5 -mx-0.5 transition-colors duration-500"
      style={flash ? { backgroundColor: DRAFT_INK.ink, color: DRAFT_INK.onInk } : { color: DRAFT_INK.ink }}
    >
      {value}
    </span>
  );
};

// The frame's playhead, written straight into the DOM so the source ticks without re-rendering
const Playhead = () => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (ref.current) ref.current.textContent = '0.50';
      return;
    }
    let id = 0;
    const tick = () => {
      if (ref.current) ref.current.textContent = (((Date.now() / 1000) % 5) / 5).toFixed(2);
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, []);
  return <span ref={ref} className="tabular-nums" style={{ color: DRAFT_INK.ink }} />;
};

// The drawing's render loop, line by line, with its settings written in live
export const RenderLoopSource = ({ settings }: { settings: DrawingSettings }) => {
  const lines: ReactNode[] = [
    <C>{'// NoiseTopography.tsx, once per frame'}</C>,
    <>
      <K>const</K> playhead = <Playhead />;
    </>,
    <>
      <K>const</K> numPoints = <Live value={settings.numCircles.toLocaleString('en-US').replace(',', '_')} />;
    </>,
    <>
      <K>const</K> radiusFactor = <Live value={settings.radiusFactor.toFixed(1)} />;
    </>,
    <>
      <K>const</K> isInverse = <Live value={String(settings.isInverse)} />;
    </>,
    <>
      <K>const</K> grid = createNoiseGrid({'{'} width, height, seed: <V>'660939'</V> {'}'});
    </>,
    '',
    <>
      <K>for</K> (<K>const</K> cell <K>of</K> cells(numPoints)) {'{'}
    </>,
    <>
      {'  '}<K>const</K> t = (playhead + cell.u * <V>0.2</V> + cell.v * <V>0.1</V>) % <V>1</V>;
    </>,
    <>
      {'  '}<K>const</K> breath = Math.sin(t * Math.PI) ** <V>5</V>;
    </>,
    <>
      {'  '}<K>const</K> n = Math.abs(grid.lookup(cell.center).noiseValue);
    </>,
    '',
    <>
      {'  '}ctx.strokeStyle = getColor(<Live value={`'${settings.color}'`} />);
    </>,
    <>
      {'  '}ctx.roundRect(cell.box, cell.max * radiusFactor);
    </>,
    <>
      {'  '}<K>if</K> (isInverse && cell.isLast) <K>continue</K>;
    </>,
    '',
    <>
      {'  '}<C>{'// noise sets the floor, the breath fills the rest'}</C>
    </>,
    <>
      {'  '}<K>const</K> inner = cell.max * n + cell.max * (<V>1</V> - n) * breath;
    </>,
    <>
      {'  '}ctx.roundRect(anchor(inner, isInverse), inner * radiusFactor);
    </>,
    '}',
  ];

  return (
    <pre className="font-mono text-[12px] leading-[22px] whitespace-pre" style={{ color: DRAFT_INK.code.text }}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span className="inline-block w-12 pr-4 text-right select-none opacity-60" style={{ color: DRAFT_INK.code.faint }}>
            {i + 1}
          </span>
          {line}
          {'\n'}
        </Fragment>
      ))}
    </pre>
  );
};
