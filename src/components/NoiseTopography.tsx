import { useEffect, useRef } from 'react';

import Random from '../utils/random';
import { createNoiseGrid } from '../utils/noise';
import { getColor, numX } from '../utils/pathUtils';

export type DrawingSettings = {
  color: string;
  // Cells across the drawing's short side; the count follows from the canvas, so a phone and a
  // desktop show the same grid at each step
  cellsAcross: number;
  radiusFactor: number;
  isInverse: boolean;
  // Seed of the noise field that sets each cell's floor
  seed: string;
  // How fast the breath and the drift run; 1 is a breath every TEMPO seconds
  speed: number;
};

// Seconds per breath, and the exponent that makes it a swell rather than a sway
const TEMPO = 3.75;
const BREATH = 5;
const LINE_WIDTH = 1;

// How far into the cycle a cell starts, by its place in the grid: a diagonal sweep
const waveOffset = (u: number, v: number) => u * 0.2 + v * 0.1;

// The field the cells read is built with this much margin and read through a slowly moving window
const DRIFT_MARGIN = 200;
// A change to the grid itself (density, seed) cross-fades the old grid into the new one
const FADE_MS = 300;
// On mount the cells grow in, in the same order as the breath
const STAGGER_MS = 550;
const STAGGER_CELL_MS = 350;
// Grids finer than this many cells across draw their outer squares faint, as texture, and finer
// than the second a step fainter, and only in inverse
const FAINT_ABOVE = 9;
const FAINTER_ABOVE = 45;
// Cells never get smaller than this, whatever the step asks for
const MIN_CELL = 5;
// Squares per path when the grid is stroked in batches
const CHUNK = 8;
// Preview only: ?outline=mid draws the coarsest grid's outer squares at half strength. Remove once decided.
const MID_OUTLINES = new URLSearchParams(window.location.search).get('outline') === 'mid';

type GridSnapshot = Pick<DrawingSettings, 'cellsAcross' | 'seed'>;
const gridChanged = (a: GridSnapshot, b: GridSnapshot) => a.cellsAcross !== b.cellsAcross || a.seed !== b.seed;

// The drawing only draws: its settings come from outside, so a panel and the source beside it can
// share them. Changes to the settings ease in rather than snap.
export const NoiseTopography = ({ settings }: { settings: DrawingSettings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use a ref to access the latest settings in the animation loop without restarting it
  const paramsRef = useRef(settings);
  // Draws a frame straight away, so a change shows even while the loop is paused
  const drawRef = useRef(() => {});
  // What is currently shown: eases toward the settings each frame
  const shownRef = useRef({ radius: settings.radiusFactor, inverse: settings.isInverse ? 1 : 0, speed: settings.speed });
  const fadeRef = useRef<{ from: GridSnapshot; start: number } | null>(null);
  // The breath's phase, 0 to 1, advanced by the frame time so a tempo change never jumps
  const phaseRef = useRef(0);
  // Seconds of drift, advanced the same way so the drift keeps pace with the breath
  const clockRef = useRef(0);
  // Stamped once the canvas is set up, so the stagger counts from the first frame
  const mountedAt = useRef(0);

  useEffect(() => {
    const previous = paramsRef.current;
    paramsRef.current = settings;
    if (gridChanged(previous, settings)) {
      fadeRef.current = { from: { cellsAcross: previous.cellsAcross, seed: previous.seed }, start: performance.now() };
    }
    drawRef.current();
  }, [settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId = 0;
    let isVisible = true;
    let lastFrame = performance.now();
    mountedAt.current = lastFrame;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // The noise grid only changes with the canvas size and seed. Two are kept, so a reseed can
    // cross-fade without rebuilding both every frame
    const grids = new Map<string, ReturnType<typeof createNoiseGrid>>();
    const getGrid = (width: number, height: number, seed: string) => {
      const key = `${Math.round(width)}x${Math.round(height)}:${seed}`;
      let grid = grids.get(key);
      if (!grid) {
        Random.setSeed(seed);
        const resolution = Random.rangeFloor(125, 175);
        grid = createNoiseGrid({ height, resolution, seed, width, xInc: 0.0145, yInc: 0.0145 });
        grids.set(key, grid);
        if (grids.size > 2) grids.delete(grids.keys().next().value as string);
      }
      return grid;
    };

    // One pass over the grid, so a grid change can cross-fade two passes
    const drawGrid = (opts: {
      width: number;
      height: number;
      snapshot: GridSnapshot;
      radiusFactor: number;
      inverseMix: number;
      color: string;
      alpha: number;
      playhead: number;
      elapsed: number;
      drift: { x: number; y: number };
    }) => {
      const { width, height, snapshot, radiusFactor, inverseMix, color, alpha, playhead, elapsed, drift } = opts;
      const padding = 24;
      const still = motionQuery.matches;
      const innerW = width - 2 * padding;
      const innerH = height - 2 * padding;
      const cellSize = Math.max(MIN_CELL, Math.min(innerW, innerH) / snapshot.cellsAcross);
      const numPoints = Math.max(4, Math.round((innerW * innerH) / cellSize ** 2));
      const grid = getGrid(width + DRIFT_MARGIN, height + DRIFT_MARGIN, snapshot.seed);

      const xCount = numX(numPoints, innerW, innerH);
      const yCount = numPoints / xCount;

      const drawnCols = Math.floor(xCount);
      const drawnRows = Math.floor(yCount);

      // Calculate actual grid dimensions
      const cellWidth = innerW / xCount;
      const cellHeight = innerH / yCount;

      const gridWidth = drawnCols * cellWidth;
      const gridHeight = drawnRows * cellHeight;

      // Center the grid
      const offsetX = (width - gridWidth) / 2;
      const offsetY = (height - gridHeight) / 2;

      const faint = snapshot.cellsAcross > FAINT_ABOVE;
      const fainter = snapshot.cellsAcross > FAINTER_ABOVE;
      const stroke = fainter ? `rgba(0, 0, 0, 5%)` : faint ? `rgba(0, 0, 0, 8%)` : getColor(color, MID_OUTLINES ? 50 : 100);
      const innerStroke = getColor(color);
      // The finest grid's outer squares fade in and out with inverse
      const outerAlpha = fainter ? inverseMix : 1;

      // The squares are gathered into paths of CHUNK per stroke and opacity, and each path is stroked
      // once. A stroke per square slows the fine grids in Chrome, and one path for the whole grid
      // stalls Safari. Opacity is rounded to 1/32 while the cells stagger in.
      type Batch = { paths: Path2D[]; squares: number };
      const outerPaths = new Map<number, Batch>();
      const innerPaths = new Map<number, Batch>();
      const pathFor = (batches: Map<number, Batch>, opacity: number) => {
        const key = Math.round(opacity * 32) / 32;
        let batch = batches.get(key);
        if (!batch) {
          batch = { paths: [], squares: 0 };
          batches.set(key, batch);
        }
        if (batch.squares++ % CHUNK === 0) batch.paths.push(new Path2D());
        return batch.paths[batch.paths.length - 1];
      };
      const addSquare = (path: Path2D, x: number, y: number, size: number, radius: number) => {
        if (path.roundRect) {
          path.roundRect(x, y, size, size, radius);
        } else {
          path.rect(x, y, size, size);
        }
      };

      for (let xdx = 0; xdx < drawnCols; xdx++) {
        for (let ydx = 0; ydx < drawnRows; ydx++) {
          const u = drawnCols <= 1 ? 0.5 : xdx / (drawnCols - 1);
          const v = drawnRows <= 1 ? 0.5 : ydx / (drawnRows - 1);

          const offset = waveOffset(u, v);
          const t = (playhead + offset) % 1;
          const mod = Math.pow(Math.sin(t * Math.PI), BREATH);

          // The load stagger, skipped under reduced motion
          let appear = 1;
          if (!still) {
            const delay = (offset / 0.3) * STAGGER_MS;
            const a = Math.max(0, Math.min(1, (elapsed - delay) / STAGGER_CELL_MS));
            appear = 1 - (1 - a) ** 3;
            if (appear <= 0) continue;
          }

          const fullRadius = Math.min(cellWidth, cellHeight) / 2;
          const maxRadius = fullRadius * appear;
          const centroidX = xdx * cellWidth + offsetX;
          const centroidY = ydx * cellHeight + offsetY;
          const lookupResult = grid.lookup({ x: centroidX + drift.x, y: centroidY + drift.y });

          if (!lookupResult) continue;

          const { noiseValue } = lookupResult;

          const isLast = xdx === drawnCols - 1 || ydx === drawnRows - 1;
          const centerX = centroidX + fullRadius;
          const centerY = centroidY + fullRadius;

          // Outer
          if (outerAlpha > 0.001) {
            addSquare(
              pathFor(outerPaths, alpha * appear * outerAlpha),
              centerX - maxRadius,
              centerY - maxRadius,
              maxRadius * 2,
              maxRadius * radiusFactor
            );
          }

          // In inverse the last row and column keep only their outer square; mid-tween it fades
          const innerAlpha = isLast ? 1 - inverseMix : 1;
          if (innerAlpha <= 0.001) continue;

          // Inner
          const radiusInner = Math.max(
            0.005,
            maxRadius * Math.abs(noiseValue) + maxRadius * (1 - Math.abs(noiseValue)) * mod
          );

          // Centered for the normal drawing, tucked into the corner for inverse; the mix slides between
          const shift = -radiusInner + maxRadius * inverseMix;
          addSquare(
            pathFor(innerPaths, alpha * appear * innerAlpha),
            centerX + shift,
            centerY + shift,
            radiusInner * 2,
            radiusInner * radiusFactor
          );
        }
      }

      context.lineWidth = LINE_WIDTH;
      for (const [batches, style] of [
        [outerPaths, stroke],
        [innerPaths, innerStroke],
      ] as const) {
        context.strokeStyle = style;
        for (const [opacity, { paths }] of batches) {
          if (opacity <= 0) continue;
          context.globalAlpha = opacity;
          for (const path of paths) context.stroke(path);
        }
      }
      context.globalAlpha = 1;
    };

    const render = () => {
      const current = paramsRef.current;

      const now = performance.now();
      const dt = Math.min(64, now - lastFrame);
      lastFrame = now;
      const looping = isVisible && !motionQuery.matches;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Reset transform to clear full physical canvas
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Apply dpr scale
      context.scale(dpr, dpr);

      // Ease what is shown toward the settings; snap when the loop is not running
      const shown = shownRef.current;
      const targetInverse = current.isInverse ? 1 : 0;
      if (looping) {
        const k = 1 - Math.exp(-dt / 90);
        shown.radius += (current.radiusFactor - shown.radius) * k;
        shown.inverse += (targetInverse - shown.inverse) * k;
        shown.speed += (current.speed - shown.speed) * k;
        if (Math.abs(shown.radius - current.radiusFactor) < 0.002) shown.radius = current.radiusFactor;
        if (Math.abs(shown.inverse - targetInverse) < 0.005) shown.inverse = targetInverse;
        if (Math.abs(shown.speed - current.speed) < 0.005) shown.speed = current.speed;
      } else {
        shown.radius = current.radiusFactor;
        shown.inverse = targetInverse;
        shown.speed = current.speed;
      }

      // The breath and drift advance by the frame time at the shown speed; a still frame when the
      // visitor asks for reduced motion
      if (looping) {
        const step = (dt / 1000) * shown.speed;
        clockRef.current += step;
        phaseRef.current = (phaseRef.current + step / TEMPO) % 1;
      }
      const seconds = clockRef.current;
      const drift = {
        x: DRIFT_MARGIN / 2 + Math.sin(seconds / 19) * (DRIFT_MARGIN / 2),
        y: DRIFT_MARGIN / 2 + Math.cos(seconds / 23) * (DRIFT_MARGIN / 2),
      };
      const playhead = motionQuery.matches ? 0.5 : phaseRef.current;
      const elapsed = now - mountedAt.current;

      const common = {
        width,
        height,
        radiusFactor: shown.radius,
        inverseMix: shown.inverse,
        color: current.color,
        playhead,
        elapsed,
        drift,
      };
      const snapshot: GridSnapshot = { cellsAcross: current.cellsAcross, seed: current.seed };

      const fade = fadeRef.current;
      const fadeT = fade ? (now - fade.start) / FADE_MS : 1;
      if (fade && fadeT < 1 && looping) {
        const a = fadeT * fadeT * (3 - 2 * fadeT);
        drawGrid({ ...common, snapshot: fade.from, alpha: 1 - a });
        drawGrid({ ...common, snapshot, alpha: a });
      } else {
        fadeRef.current = null;
        drawGrid({ ...common, snapshot, alpha: 1 });
      }

      // Keep animating only while the drawing is on screen and motion is welcome
      if (looping) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const draw = () => {
      cancelAnimationFrame(animationFrameId);
      render();
    };
    drawRef.current = draw;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        draw();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Stop drawing once the hero scrolls away, and pick it up again when it returns
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastFrame = performance.now();
          draw();
        } else cancelAnimationFrame(animationFrameId);
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    const handleMotionPreference = () => draw();
    motionQuery.addEventListener('change', handleMotionPreference);

    // Sizes the canvas and draws the first frame
    handleResize();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motionQuery.removeEventListener('change', handleMotionPreference);
      cancelAnimationFrame(animationFrameId);
      drawRef.current = () => {};
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
