/**
 * Color Manipulation Module
 *
 * Provides color conversion, manipulation, and palette generation
 * using the 'color' library for immutable color operations.
 *
 * Features:
 * - Color space conversions (RGB, HSL, LAB, LCH)
 * - WCAG contrast ratio calculation (AA/AAA compliance)
 * - Palette generation (complementary, analogous, triadic, etc.)
 * - Scientific domain color schemes
 *
 * @see https://github.com/Qix-/color
 */

import Color from 'color';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/** RGB color representation */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

/** HSL color representation */
export interface HSLColor {
  h: number;
  s: number;
  l: number;
  alpha?: number;
}

/** LAB color representation (CIE L*a*b*) */
export interface LABColor {
  l: number;
  a: number;
  b: number;
  alpha?: number;
}

/** LCH color representation (CIE LCH) */
export interface LCHColor {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

/** WCAG compliance levels */
export type WCAGLevel = 'AAA' | 'AA' | 'AA-large' | 'fail';

/** Contrast check result */
export interface ContrastResult {
  ratio: number;
  level: WCAGLevel;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
}

/** Palette generation options */
export interface PaletteOptions {
  count?: number;
  includeBase?: boolean;
}

// ============================================================================
// COLOR SPACE CONVERSIONS
// ============================================================================

/**
 * Convert any color input to RGB
 */
export function toRGB(input: string | number | object): RGBColor {
  const c = Color(input);
  const rgb = c.rgb().object();
  return {
    r: Math.round(rgb.r),
    g: Math.round(rgb.g),
    b: Math.round(rgb.b),
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to HSL
 */
export function toHSL(input: string | number | object): HSLColor {
  const c = Color(input);
  const hsl = c.hsl().object();
  return {
    h: Math.round(hsl.h),
    s: Math.round(hsl.s),
    l: Math.round(hsl.l),
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to LAB (CIE L*a*b*)
 * LAB is perceptually uniform, ideal for scientific color comparisons
 */
export function toLAB(input: string | number | object): LABColor {
  const c = Color(input);
  const lab = c.lab().object();
  return {
    l: lab.l,
    a: lab.a,
    b: lab.b,
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to LCH (CIE LCH)
 * LCH is the cylindrical representation of LAB, useful for perceptual hue shifts
 */
export function toLCH(input: string | number | object): LCHColor {
  const c = Color(input);
  const lch = c.lch().object();
  return {
    l: lch.l,
    c: lch.c,
    h: lch.h,
    alpha: c.alpha(),
  };
}

/**
 * Convert any color input to HEX string
 */
export function toHex(input: string | number | object): string {
  return Color(input).hex();
}

/**
 * Create a color from RGB values
 */
export function fromRGB(r: number, g: number, b: number, alpha?: number): string {
  const c = Color.rgb(r, g, b);
  return alpha !== undefined ? c.alpha(alpha).hexa() : c.hex();
}

/**
 * Create a color from HSL values
 */
export function fromHSL(h: number, s: number, l: number, alpha?: number): string {
  const c = Color.hsl(h, s, l);
  return alpha !== undefined ? c.alpha(alpha).hexa() : c.hex();
}

/**
 * Create a color from LAB values
 */
export function fromLAB(l: number, a: number, b: number, alpha?: number): string {
  const c = Color.lab(l, a, b);
  return alpha !== undefined ? c.alpha(alpha).hexa() : c.hex();
}

/**
 * Create a color from LCH values
 */
export function fromLCH(l: number, c: number, h: number, alpha?: number): string {
  const color = Color.lch(l, c, h);
  return alpha !== undefined ? color.alpha(alpha).hexa() : color.hex();
}

// ============================================================================
// WCAG CONTRAST RATIO CALCULATION
// ============================================================================

/**
 * Calculate WCAG contrast ratio between two colors
 * @returns Contrast ratio (1:1 to 21:1)
 */
export function getContrastRatio(foreground: string, background: string): number {
  const fg = Color(foreground);
  const bg = Color(background);
  return fg.contrast(bg);
}

/**
 * Check WCAG compliance level for a color pair
 * - AAA: 7:1 contrast (highest, for body text)
 * - AA: 4.5:1 contrast (minimum for body text)
 * - AA-large: 3:1 contrast (minimum for large text, 18pt+)
 */
export function checkWCAGCompliance(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  let level: WCAGLevel = 'fail';
  if (ratio >= 7) {
    level = 'AAA';
  } else if (ratio >= 4.5) {
    level = 'AA';
  } else if (ratio >= 3) {
    level = 'AA-large';
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
    passesAALarge: ratio >= 3,
  };
}

/**
 * Find the best foreground color (black or white) for a given background
 */
export function getBestForeground(background: string): string {
  const bg = Color(background);
  const whiteContrast = Color('#FFFFFF').contrast(bg);
  const blackContrast = Color('#000000').contrast(bg);
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
}

/**
 * Suggest an accessible color based on a target hue
 * Adjusts lightness to meet minimum contrast requirements
 */
export function suggestAccessibleColor(
  targetHue: number,
  background: string,
  minContrast: number = 4.5
): string {
  const bg = Color(background);
  const bgIsLight = bg.isLight();

  // Start with target hue at medium saturation
  let testColor = Color.hsl(targetHue, 70, bgIsLight ? 35 : 65);
  let contrast = testColor.contrast(bg);

  // Adjust lightness until we meet contrast requirement
  let iterations = 0;
  while (contrast < minContrast && iterations < 50) {
    if (bgIsLight) {
      testColor = testColor.darken(0.05);
    } else {
      testColor = testColor.lighten(0.05);
    }
    contrast = testColor.contrast(bg);
    iterations++;
  }

  return testColor.hex();
}

// TODO: Create ColorPicker component
// - Color wheel interface
// - HSL/RGB/HEX input modes
// - Alpha channel support
// - Eyedropper tool integration

// TODO: Add color blindness simulation
// - Protanopia, deuteranopia, tritanopia filters
// - Preview modes for accessibility testing

// TODO: Create gradient tools
// - Linear gradient builder
// - Radial gradient builder
// - Gradient presets for scientific viz
// - Export gradients to CSS/SVG

/**
 * Scientific domain color palettes
 */
export const domainPalettes = {
  biology: {
    cell: '#E8F5E9',
    membrane: '#81C784',
    nucleus: '#4CAF50',
    protein: '#FF9800',
    dna: '#2196F3',
    rna: '#9C27B0',
    mitochondria: '#F44336',
    chloroplast: '#8BC34A',
  },

  chemistry: {
    carbon: '#333333',
    oxygen: '#F44336',
    nitrogen: '#2196F3',
    hydrogen: '#FFFFFF',
    sulfur: '#FFEB3B',
    phosphorus: '#FF9800',
    chlorine: '#4CAF50',
    bond: '#9E9E9E',
  },

  physics: {
    positive: '#F44336',
    negative: '#2196F3',
    neutral: '#9E9E9E',
    field: '#9C27B0',
    wave: '#00BCD4',
    energy: '#FFEB3B',
    force: '#FF5722',
  },

  medical: {
    artery: '#F44336',
    vein: '#3F51B5',
    nerve: '#FFEB3B',
    bone: '#EFEBE9',
    muscle: '#D32F2F',
    organ: '#FF8A80',
    tissue: '#FFCCBC',
  },
};

/** Color instance type */
type ColorInstance = ReturnType<typeof Color>;

/**
 * Create a Color instance from various formats
 */
export function createColor(input: string | number | object): ColorInstance {
  return Color(input);
}

/**
 * Generate a complementary color
 */
export function getComplementary(color: string): string {
  return Color(color).rotate(180).hex();
}

/**
 * Generate analogous colors
 */
export function getAnalogous(color: string, count: number = 3): string[] {
  const base = Color(color);
  const step = 30;
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i - Math.floor(count / 2)) * step;
    colors.push(base.rotate(angle).hex());
  }

  return colors;
}

/**
 * Generate triadic colors (3 colors evenly spaced on the color wheel)
 */
export function getTriadic(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(120).hex(),
    base.rotate(240).hex(),
  ];
}

/**
 * Generate split-complementary colors
 * Base color + two colors adjacent to its complement
 */
export function getSplitComplementary(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(150).hex(),
    base.rotate(210).hex(),
  ];
}

/**
 * Generate tetradic (rectangular) colors
 * Two complementary pairs
 */
export function getTetradic(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(60).hex(),
    base.rotate(180).hex(),
    base.rotate(240).hex(),
  ];
}

/**
 * Generate square colors (4 colors evenly spaced on the color wheel)
 */
export function getSquare(color: string): string[] {
  const base = Color(color);
  return [
    base.hex(),
    base.rotate(90).hex(),
    base.rotate(180).hex(),
    base.rotate(270).hex(),
  ];
}

/**
 * Generate a monochromatic scale
 */
export function getMonochromatic(color: string, steps: number = 5): string[] {
  const base = Color(color);
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    const lightness = 20 + (60 * i / (steps - 1));
    colors.push(base.lightness(lightness).hex());
  }

  return colors;
}

/**
 * Mix two colors
 */
export function mixColors(color1: string, color2: string, weight: number = 0.5): string {
  return Color(color1).mix(Color(color2), weight).hex();
}

/**
 * Adjust color for better contrast against background
 */
export function ensureContrast(foreground: string, background: string, minContrast: number = 4.5): string {
  let fg = Color(foreground);
  const bg = Color(background);

  let contrast = fg.contrast(bg);

  // Darken or lighten until we meet minimum contrast
  while (contrast < minContrast) {
    if (bg.isLight()) {
      fg = fg.darken(0.1);
    } else {
      fg = fg.lighten(0.1);
    }
    contrast = fg.contrast(bg);

    // Prevent infinite loop
    if (fg.lightness() <= 0 || fg.lightness() >= 100) break;
  }

  return fg.hex();
}

/**
 * Convert color to print-friendly CMYK approximation
 */
export function toPrintSafe(color: string): string {
  // Reduce saturation slightly for print compatibility
  return Color(color).saturate(-0.1).hex();
}

// ============================================================================
// SCIENTIFIC COLOR SCHEMES
// ============================================================================

/**
 * Generate a sequential color scale (good for data visualization)
 * Uses LAB color space for perceptually uniform lightness steps
 */
export function getSequentialScale(
  baseColor: string,
  steps: number = 5,
  reverse: boolean = false
): string[] {
  const base = Color(baseColor);
  const lab = base.lab().object();
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    // Vary lightness from 95 (light) to 25 (dark)
    const lightness = 95 - (70 * i / (steps - 1));
    colors.push(Color.lab(lightness, lab.a, lab.b).hex());
  }

  return reverse ? colors.reverse() : colors;
}

/**
 * Generate a diverging color scale (good for showing positive/negative values)
 * Two hues diverging from a neutral center
 */
export function getDivergingScale(
  lowColor: string,
  highColor: string,
  steps: number = 9
): string[] {
  const low = Color(lowColor);
  const high = Color(highColor);
  const colors: string[] = [];
  const midpoint = Math.floor(steps / 2);

  for (let i = 0; i < steps; i++) {
    if (i < midpoint) {
      // Low to white
      const t = i / midpoint;
      colors.push(low.lightness(low.lightness() + (95 - low.lightness()) * t).hex());
    } else if (i === midpoint) {
      // Neutral center
      colors.push('#F5F5F5');
    } else {
      // White to high
      const t = (i - midpoint) / (steps - 1 - midpoint);
      colors.push(high.lightness(95 - (95 - high.lightness()) * t).hex());
    }
  }

  return colors;
}

/**
 * Generate a qualitative color palette (good for categorical data)
 * Uses LCH color space for perceptually distinct colors
 */
export function getQualitativeScale(count: number, saturation: number = 70): string[] {
  const colors: string[] = [];
  const lightness = 55;

  for (let i = 0; i < count; i++) {
    const hue = (i * 360 / count + 30) % 360; // Offset to avoid starting at red
    colors.push(Color.lch(lightness, saturation, hue).hex());
  }

  return colors;
}

/**
 * Calculate perceptual color difference (Delta E)
 * Uses CIE LAB color space for accurate color comparison
 * @returns Delta E value (0 = identical, >2.3 = noticeable difference)
 */
export function getColorDifference(color1: string, color2: string): number {
  const lab1 = toLAB(color1);
  const lab2 = toLAB(color2);

  // CIE76 Delta E formula
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

/**
 * Check if two colors are perceptually similar
 * @param threshold Delta E threshold (default 2.3 = just noticeable difference)
 */
export function areColorsSimilar(
  color1: string,
  color2: string,
  threshold: number = 2.3
): boolean {
  return getColorDifference(color1, color2) < threshold;
}

/**
 * Lighten a color by a percentage
 */
export function lighten(color: string, amount: number = 0.1): string {
  return Color(color).lighten(amount).hex();
}

/**
 * Darken a color by a percentage
 */
export function darken(color: string, amount: number = 0.1): string {
  return Color(color).darken(amount).hex();
}

/**
 * Saturate a color by a percentage
 */
export function saturate(color: string, amount: number = 0.1): string {
  return Color(color).saturate(amount).hex();
}

/**
 * Desaturate a color by a percentage
 */
export function desaturate(color: string, amount: number = 0.1): string {
  return Color(color).desaturate(amount).hex();
}

/**
 * Get the grayscale version of a color
 */
export function grayscale(color: string): string {
  return Color(color).grayscale().hex();
}

/**
 * Invert a color
 */
export function invert(color: string): string {
  return Color(color).negate().hex();
}

export { Color };
