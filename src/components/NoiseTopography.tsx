import { useEffect, useRef, useState } from 'react';

import Random from '../utils/random';
import { createNoiseGrid } from '../utils/noise';
import { getColor, numX } from '../utils/pathUtils';

export const NoiseTopography = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('black');
  const [numCircles, setNumCircles] = useState(73);
  const [radiusFactor, setRadiusFactor] = useState(0.5);
  const [isInverse, setIsInverse] = useState(false);

  // Use a ref to access the latest state in the animation loop without restarting it
  const paramsRef = useRef({ color, numCircles, radiusFactor, isInverse });

  useEffect(() => {
    paramsRef.current = { color, numCircles, radiusFactor, isInverse };
  }, [color, numCircles, radiusFactor, isInverse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    const duration = 5; // seconds

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

      // context.fillStyle = 'transparent'; // Background color
      // context.fillRect(0, 0, width, height);

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

      const grid = createNoiseGrid({
        height,
        resolution,
        seed: Random.getSeed(),
        width,
        xInc: 0.0145,
        yInc: 0.0145,
      });

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

      // Animation time
      const time = Date.now() / 1000;
      const playhead = (time % duration) / duration;

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

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initial resize
    handleResize();

    // Start loop
    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const densityOptions = [73, 512, 1800, 3276];
  const sizeLabels = ['1x', '7x', '25x', '45x'];

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-3 z-10">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg flex flex-col space-y-3 w-48">
          {/* Color & Inverse Row */}
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col space-y-1 flex-1">
              <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                Color
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded h-5 py-0 px-1.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors"
              >
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                Inverse
              </label>
              <button
                onClick={() => setIsInverse(!isInverse)}
                className={`w-8 h-5 rounded-full relative transition-colors duration-200 ease-in-out ${
                  isInverse ? 'bg-black' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                    isInverse ? 'translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/*  Radius Slider */}
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                Radius
              </label>
              <span className="text-[10px] font-mono text-gray-400">{radiusFactor}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={radiusFactor}
              onChange={(e) => setRadiusFactor(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-grab active:cursor-grabbing accent-black transition-all hover:accent-gray-800"
            />
          </div>

          {/* Resolution Segmented Control */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
              Resolution
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
              {densityOptions.map((option, index) => (
                <button
                  key={option}
                  onClick={() => setNumCircles(option)}
                  className={`flex-1 py-1 text-[10px] font-mono font-bold rounded-md text-nowrap transition-all duration-200 ${
                    numCircles === option
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-500 hover:text-black hover:bg-gray-200/50'
                  }`}
                >
                  {sizeLabels[index]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
