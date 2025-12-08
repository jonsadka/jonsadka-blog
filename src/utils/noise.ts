import Random from '../utils/random';

export interface NoiseGridOptions {
    width: number;
    height: number;
    resolution: number;
    xInc: number;
    yInc: number;
    seed?: string | number;
}

export interface NoiseCell {
    x: number;
    y: number;
    width: number;
    height: number;
    noiseValue: number;
}

export function createNoiseGrid(opts: NoiseGridOptions) {
    if (opts.seed) {
        Random.setSeed(opts.seed);
    }

    const numCols = opts.resolution;
    const numRows = opts.resolution;
    const colSize = opts.width / numCols;
    const rowSize = opts.height / numRows;

    const cells = new Array(numCols * numRows);

    let yOff = 0;

    for (let y = 0; y < opts.height; y += rowSize) {
        let xOff = 0;

        for (let x = 0; x < opts.width; x += colSize) {
            if (
                Math.floor(x + colSize) <= opts.width &&
                Math.floor(y + rowSize) <= opts.height
            ) {
                cells[Math.round(x / colSize + (y / rowSize) * numCols)] = {
                    x,
                    y,
                    width: colSize,
                    height: rowSize,
                    noiseValue: Random.noise2D(xOff, yOff),
                };

                xOff += opts.xInc;
            }
        }

        yOff += opts.yInc;
    }

    return {
        cells,
        lookup: lookup(
            cells,
            opts.width,
            opts.height,
            numCols,
            Math.max(colSize, rowSize)
        ),
    };
}

function clamp(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max));
}

function lookup(cells: NoiseCell[], width: number, height: number, cols: number, resolution: number) {
    return function (pos: { x: number; y: number }) {
        const x = Math.floor(clamp(pos.x, 0, width - 1) / resolution);
        const y = Math.floor(clamp(pos.y, 0, height - 1) / resolution);

        return cells[x + y * cols];
    };
}
