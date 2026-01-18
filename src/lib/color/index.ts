/**
 * Color Manipulation Module
 *
 * Provides color conversion, manipulation, and palette generation
 * using the 'color' library for immutable color operations.
 *
 * @see https://github.com/Qix-/color
 */

import Color from 'color';

// TODO: Create ColorPicker component
// - Color wheel interface
// - HSL/RGB/HEX input modes
// - Alpha channel support
// - Eyedropper tool integration

// TODO: Implement color palette management
// - Create palettes from images
// - Generate harmonious color schemes
// - Save and load custom palettes
// - Domain-specific palettes (biology, chemistry, etc.)

// TODO: Add accessibility features
// - Color contrast checker (WCAG compliance)
// - Color blindness simulation
// - Accessible color suggestions
// - High contrast mode support

// TODO: Create gradient tools
// - Linear gradient builder
// - Radial gradient builder
// - Gradient presets for scientific viz
// - Export gradients to CSS/SVG

// TODO: Implement color theming
// - Light/dark mode color mapping
// - Automatic color adjustment for themes
// - Print-friendly color conversion

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
 * Generate triadic colors
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

export { Color };
