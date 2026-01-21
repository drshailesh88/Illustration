/**
 * Image Filters using glfx.js
 * Browser-based image filters using WebGL
 *
 * @module lib/image/filters
 */

// ============================================================================
// Types
// ============================================================================

export type FilterType =
  | 'blur'
  | 'sharpen'
  | 'denoise'
  | 'brightness'
  | 'contrast'
  | 'saturation'
  | 'hue'
  | 'vignette'
  | 'sepia'
  | 'grayscale'
  | 'invert';

export interface FilterSettings {
  type: FilterType;
  value: number;
}

export interface AdjustmentsSettings {
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  hue: number; // -180 to 180
}

// ============================================================================
// Filter Functions
// ============================================================================

/**
 * Apply filters to a canvas element using glfx.js
 *
 * @param canvas - The canvas element to apply filters to
 * @param settings - Array of filter settings to apply
 * @returns Promise resolving to the filtered canvas data URL
 */
export async function applyFilters(
  canvas: HTMLCanvasElement,
  settings: FilterSettings[]
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Dynamic import of glfx.js
      import('glfx').then((glfxModule) => {
        const fx = (glfxModule as any).canvas();

        // Set canvas size
        fx.canvas.width = canvas.width;
        fx.canvas.height = canvas.height;

        // Draw original canvas to fx canvas
        fx.texture(canvas);

        // Apply each filter
        settings.forEach((setting) => {
          const value = setting.value;

          switch (setting.type) {
            case 'blur':
              fx.update('gaussianBlur', value);
              break;
            case 'sharpen':
              fx.update('unsharpMask', 20, value);
              break;
            case 'denoise':
              fx.update('denoise', value);
              break;
            case 'brightness':
              fx.update('brightnessContrast', value / 100, 0);
              break;
            case 'contrast':
              fx.update('brightnessContrast', 0, value / 100);
              break;
            case 'saturation':
              fx.update('hueSaturation', 0, value / 100);
              break;
            case 'hue':
              fx.update('hueSaturation', value / 360, 0);
              break;
            case 'vignette':
              fx.update('vignette', value / 100, 0.5);
              break;
            case 'sepia':
              fx.update('sepia', value / 100);
              break;
            case 'grayscale':
              fx.update('grayscale', value / 100);
              break;
            case 'invert':
              fx.update('invert', value / 100);
              break;
          }
        });

        // Get the filtered image
        resolve(fx.toDataURL());
      }).catch((error) => {
        reject(new Error(`Failed to load glfx: ${error.message}`));
      });
    } catch (error) {
      reject(new Error(`Filter application failed: ${error instanceof Error ? error.message : String(error)}`));
    }
  });
}

/**
 * Apply adjustments (brightness, contrast, saturation, hue) to a canvas
 *
 * @param canvas - The canvas element to apply adjustments to
 * @param settings - Adjustment settings
 * @returns Promise resolving to the adjusted canvas data URL
 */
export async function applyAdjustments(
  canvas: HTMLCanvasElement,
  settings: AdjustmentsSettings
): Promise<string> {
  const filters: FilterSettings[] = [];

  if (settings.brightness !== 0) {
    filters.push({ type: 'brightness', value: settings.brightness });
  }

  if (settings.contrast !== 0) {
    filters.push({ type: 'contrast', value: settings.contrast });
  }

  if (settings.saturation !== 0) {
    filters.push({ type: 'saturation', value: settings.saturation });
  }

  if (settings.hue !== 0) {
    filters.push({ type: 'hue', value: settings.hue });
  }

  if (filters.length === 0) {
    // No adjustments needed
    return canvas.toDataURL();
  }

  return applyFilters(canvas, filters);
}

/**
 * Apply a blur filter
 *
 * @param canvas - The canvas element
 * @param radius - Blur radius (0-10)
 * @returns Promise resolving to filtered data URL
 */
export async function applyBlur(
  canvas: HTMLCanvasElement,
  radius: number
): Promise<string> {
  return applyFilters(canvas, [{ type: 'blur', value: radius }]);
}

/**
 * Apply a sharpen filter
 *
 * @param canvas - The canvas element
 * @param amount - Sharpen amount (0-10)
 * @returns Promise resolving to filtered data URL
 */
export async function applySharpen(
  canvas: HTMLCanvasElement,
  amount: number
): Promise<string> {
  return applyFilters(canvas, [{ type: 'sharpen', value: amount }]);
}

/**
 * Apply denoise filter
 *
 * @param canvas - The canvas element
 * @param strength - Denoise strength (0-20)
 * @returns Promise resolving to filtered data URL
 */
export async function applyDenoise(
  canvas: HTMLCanvasElement,
  strength: number
): Promise<string> {
  return applyFilters(canvas, [{ type: 'denoise', value: strength }]);
}

/**
 * Apply sepia tone
 *
 * @param canvas - The canvas element
 * @param amount - Sepia amount (0-100)
 * @returns Promise resolving to filtered data URL
 */
export async function applySepia(
  canvas: HTMLCanvasElement,
  amount: number
): Promise<string> {
  return applyFilters(canvas, [{ type: 'sepia', value: amount }]);
}

/**
 * Convert to grayscale
 *
 * @param canvas - The canvas element
 * @param amount - Grayscale amount (0-100)
 * @returns Promise resolving to filtered data URL
 */
export async function applyGrayscale(
  canvas: HTMLCanvasElement,
  amount: number
): Promise<string> {
  return applyFilters(canvas, [{ type: 'grayscale', value: amount }]);
}

/**
 * Invert colors
 *
 * @param canvas - The canvas element
 * @param amount - Invert amount (0-100)
 * @returns Promise resolving to filtered data URL
 */
export async function applyInvert(
  canvas: HTMLCanvasElement,
  amount: number
): Promise<string> {
  return applyFilters(canvas, [{ type: 'invert', value: amount }]);
}

/**
 * Apply vignette effect
 *
 * @param canvas - The canvas element
 * @param amount - Vignette amount (0-100)
 * @returns Promise resolving to filtered data URL
 */
export async function applyVignette(
  canvas: HTMLCanvasElement,
  amount: number
): Promise<string> {
  return applyFilters(canvas, [{ type: 'vignette', value: amount }]);
}

// ============================================================================
// Default Settings
// ============================================================================

export const defaultAdjustments: AdjustmentsSettings = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hue: 0,
};

export const filterRanges: Record<FilterType, { min: number; max: number; step: number; default: number }> = {
  blur: { min: 0, max: 10, step: 0.5, default: 2 },
  sharpen: { min: 0, max: 10, step: 0.5, default: 2 },
  denoise: { min: 0, max: 20, step: 1, default: 5 },
  brightness: { min: -100, max: 100, step: 5, default: 0 },
  contrast: { min: -100, max: 100, step: 5, default: 0 },
  saturation: { min: -100, max: 100, step: 5, default: 0 },
  hue: { min: -180, max: 180, step: 5, default: 0 },
  vignette: { min: 0, max: 100, step: 5, default: 50 },
  sepia: { min: 0, max: 100, step: 5, default: 30 },
  grayscale: { min: 0, max: 100, step: 5, default: 100 },
  invert: { min: 0, max: 100, step: 5, default: 100 },
};
