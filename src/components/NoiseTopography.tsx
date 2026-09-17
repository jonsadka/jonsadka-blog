import { useEffect, useRef } from 'react';

import Random from '../utils/random';
import { createNoiseGrid } from '../utils/noise';
import { getColor, numX } from '../utils/pathUtils';

export type DrawingSettings = {
  color: string;
  numCircles: number;
  radiusFactor: number;
  isInverse: boolean;
};

// The drawing only draws: its settings come from outside, so a panel and the source beside it can share them
export const NoiseTopography = ({ settings }: { settings: DrawingSettings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use a ref to access the latest settings in the animation loop without restarting it
  const paramsRef = useRef(settings);
  // Draws a frame straight away, so a change shows even while the loop is paused
  const drawRef = useRef(() => {});

  useEffect(() => {
    paramsRef.current = settings;
    drawRef.current();
  }, [settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId = 0;
    let isVisible = true;
    const duration = 5; // seconds
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // The noise grid only changes with the canvas size, so build it once per size
    let cached: { key: string; grid: ReturnType<typeof createNoiseGrid> } | null = null;
    const getGrid = (width: number, height: number, resolution: number, seed: string | number) => {
      const key = `${Math.round(width)}x${Math.round(height)}x${resolution}`;
      if (!cached || cached.key !== key) {
        cached = {
          key,
          grid: createNoiseGrid({ height, resolution, seed, width, xInc: 0.0145, yInc: 0.0145 }),
        };
      }
      return cached.grid;
    };

    const render = () => {
      const {
        color: currentColor,
        numCircles: currentNumCircles,
        radiusFactor: currentRadiusFactor,
        isInverse: currentIsInverse,
      } = paramsRef.current;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Reset transform to clear full physical canvas
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Apply dpr scale
      context.scale(dpr, dpr);

      // Settings
      Random.setSeed('660939');
      const resolution = Random.rangeFloor(125, 175);

      // Use user controlled radius factor instead of random
      const radiusFactor = currentRadiusFactor;

      // Use user controlled inverse setting
      const isInverse = currentIsInverse;

      const lineWidth = 1;
      const padding = 24;
      const numPoints = currentNumCircles;

      const grid = getGrid(width, height, resolution, Random.getSeed());

      const xCount = numX(numPoints, width - 2 * padding, height - 2 * padding);
      const yCount = numPoints / xCount;

      const drawnCols = Math.floor(xCount);
      const drawnRows = Math.floor(yCount);

      // Calculate actual grid dimensions
      const cellWidth = (width - 2 * padding) / xCount;
      const cellHeight = (height - 2 * padding) / yCount;

      const gridWidth = drawnCols * cellWidth;
      const gridHeight = drawnRows * cellHeight;

      // Center the grid
      const offsetX = (width - gridWidth) / 2;
      const offsetY = (height - gridHeight) / 2;

      // Animation time; a still frame when the visitor asks for reduced motion
      const time = Date.now() / 1000;
      const playhead = motionQuery.matches ? 0.5 : (time % duration) / duration;

      for (let xdx = 0; xdx < drawnCols; xdx++) {
        for (let ydx = 0; ydx < drawnRows; ydx++) {
          const u = drawnCols <= 1 ? 0.5 : xdx / (drawnCols - 1);
          const v = drawnRows <= 1 ? 0.5 : ydx / (drawnRows - 1);

          const offset = u * 0.2 + v * 0.1;
          const t = (playhead + offset) % 1;
          let mod = Math.sin(t * Math.PI);
          mod = Math.pow(mod, 5);

          const maxRadius = Math.min(cellWidth, cellHeight) / 2;
          const centroidX = xdx * cellWidth + offsetX;
          const centroidY = ydx * cellHeight + offsetY;
          const lookupResult = grid.lookup({ x: centroidX, y: centroidY });

          if (!lookupResult) continue;

          const { noiseValue } = lookupResult;

          const isLast = xdx === drawnCols - 1 || ydx === drawnRows - 1;

          // Draw directly
          context.save();
          context.lineWidth = lineWidth;
          if (currentNumCircles > 1500) {
            context.strokeStyle = `rgba(0, 0, 0, 8%)`;
          } else {
            context.strokeStyle = getColor(currentColor);
          }
          context.translate(centroidX + maxRadius, centroidY + maxRadius);

          // Outer
          context.beginPath();
          if (context.roundRect) {
            context.roundRect(
              -maxRadius,
              -maxRadius,
              maxRadius * 2,
              maxRadius * 2,
              maxRadius * radiusFactor
            );
          } else {
            context.rect(-maxRadius, -maxRadius, maxRadius * 2, maxRadius * 2);
          }
          context.closePath();
          context.stroke();

          if (isInverse && isLast) {
            context.restore();
            continue;
          }

          // Inner
          const radiusInner = Math.max(
            0.005,
            maxRadius * Math.abs(noiseValue) + maxRadius * (1 - Math.abs(noiseValue)) * mod
          );

          context.strokeStyle = getColor(currentColor);

          if (isInverse) {
            context.translate(maxRadius - radiusInner, maxRadius - radiusInner);
          } else {
            context.translate(-radiusInner, -radiusInner);
          }

          context.beginPath();
          if (context.roundRect) {
            context.roundRect(0, 0, radiusInner * 2, radiusInner * 2, radiusInner * radiusFactor);
          } else {
            context.rect(0, 0, radiusInner * 2, radiusInner * 2);
          }
          context.closePath();
          context.stroke();

          context.restore();
        }
      }

      // Keep animating only while the drawing is on screen and motion is welcome
      if (isVisible && !motionQuery.matches) {
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
        if (isVisible) draw();
        else cancelAnimationFrame(animationFrameId);
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
