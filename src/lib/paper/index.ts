/**
 * Paper.js Integration Module
 *
 * Paper.js is an open source vector graphics scripting framework
 * that runs on top of the HTML5 Canvas.
 *
 * @see https://paperjs.org/
 */

import paper from 'paper';

// TODO: Create PaperCanvas component that initializes Paper.js on a canvas element
// - Handle canvas setup and teardown
// - Manage Paper.js scope lifecycle
// - Support multiple canvas instances

// TODO: Implement PaperTools for common drawing operations
// - Pen tool with bezier curve support
// - Shape tools (rectangle, ellipse, polygon)
// - Path manipulation tools
// - Selection and transformation tools

// TODO: Create path utilities
// - Path smoothing algorithms
// - Path simplification
// - Boolean operations (union, intersect, subtract)
// - Path to SVG conversion

// TODO: Implement layer management
// - Layer creation and deletion
// - Layer ordering (bring to front, send to back)
// - Layer visibility and locking
// - Layer grouping

// TODO: Add Paper.js to Fabric.js bridge
// - Convert Paper.js paths to Fabric.js objects
// - Maintain path fidelity during conversion
// - Handle complex paths with multiple segments

/**
 * Initialize a new Paper.js scope on a canvas element
 */
export function initializePaperScope(canvas: HTMLCanvasElement): typeof paper {
  const scope = new paper.PaperScope();
  scope.setup(canvas);
  return scope as unknown as typeof paper;
}

/**
 * Create a basic path from points
 */
export function createPathFromPoints(points: Array<{ x: number; y: number }>): paper.Path {
  const path = new paper.Path();
  points.forEach((point, index) => {
    if (index === 0) {
      path.moveTo(new paper.Point(point.x, point.y));
    } else {
      path.lineTo(new paper.Point(point.x, point.y));
    }
  });
  return path;
}

/**
 * Export Paper.js path to SVG path data
 */
export function pathToSvgData(path: paper.Path): string {
  return path.pathData;
}

export { paper };
