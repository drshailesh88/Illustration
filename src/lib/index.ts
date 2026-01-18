/**
 * Library Integration Index
 *
 * This file exports all integrated libraries for the Illustrator-like editor.
 * Each library provides specific functionality for vector graphics, drawing, and export.
 */

// Paper.js - Vector graphics scripting framework
// @see https://paperjs.org/
export { default as paper } from 'paper';
export type { Project, Tool, Item, Segment, Curve } from 'paper';

// Rough.js - Create graphics with a hand-drawn, sketchy appearance
// @see https://roughjs.com/
export { default as rough } from 'roughjs';
export type { RoughCanvas } from 'roughjs/bin/canvas';
export type { Options as RoughOptions } from 'roughjs/bin/core';

// Perfect Freehand - Draw perfect pressure-sensitive freehand lines
// @see https://github.com/steveruizok/perfect-freehand
export { getStroke, getStrokeOutlinePoints, getStrokePoints } from 'perfect-freehand';
export type { StrokeOptions, StrokePoint } from 'perfect-freehand';

// Color - Immutable color conversion and manipulation
// @see https://github.com/Qix-/color
export { default as Color } from 'color';

// Color.js - Advanced color space support (OKLCH, P3, wide gamut)
// @see https://colorjs.io/
export { default as ColorJS } from 'colorjs.io';

// Save SVG as PNG - Export SVG elements as PNG images
// @see https://github.com/exupero/saveSvgAsPng
// @ts-expect-error - save-svg-as-png doesn't have TypeScript definitions
export { saveSvgAsPng, svgAsPngUri, svgAsDataUri, download } from 'save-svg-as-png';

// jsPDF - Client-side JavaScript PDF generation
// @see https://github.com/parallax/jsPDF
export { jsPDF } from 'jspdf';

// svg2pdf.js - Convert SVG elements to PDF using jsPDF
// @see https://github.com/yWorks/svg2pdf.js
export { svg2pdf } from 'svg2pdf.js';

// Tabler Icons - Free and open source icons for React
// @see https://tabler.io/icons
export * as TablerIcons from '@tabler/icons-react';

// glfx.js - WebGL image effects library
// @see https://evanw.github.io/glfx.js/
// Note: glfx doesn't have default exports, imported via local wrapper

// Re-export from local modules
export * from './paper';
export * from './rough';
export * from './freehand';
export * from './color';
export * from './color/useColorManager';
export * from './export';
export * from './icons';
export * from './glfx';
export * from './image';
