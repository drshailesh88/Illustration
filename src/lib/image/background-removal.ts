/**
 * Background Removal Library
 * Browser-based background removal using @imgly/background-removal
 *
 * This library runs entirely in the browser with no API costs.
 * Uses WebAssembly and TensorFlow.js for ML-based background removal.
 *
 * @module lib/image/background-removal
 */

import { removeBackground, Config } from '@imgly/background-removal';

// ============================================================================
// Types
// ============================================================================

/**
 * Progress stages during background removal
 */
export type BackgroundRemovalStage =
  | 'loading-model'
  | 'processing'
  | 'encoding'
  | 'complete';

/**
 * Progress callback function signature
 */
export type ProgressCallback = (
  progress: number,
  stage?: BackgroundRemovalStage
) => void;

/**
 * Options for background removal
 */
export interface BackgroundRemovalOptions {
  /** Progress callback for UI feedback */
  onProgress?: ProgressCallback;
  /** Model to use: 'small' (faster) or 'medium' (better quality) */
  model?: 'small' | 'medium';
  /** Output format */
  output?: {
    /** Output format type */
    format?: 'image/png' | 'image/webp' | 'image/jpeg';
    /** Quality for lossy formats (0-1) */
    quality?: number;
  };
}

/**
 * Result of background removal operation
 */
export interface BackgroundRemovalResult {
  /** The processed image blob */
  blob: Blob;
  /** Width of the processed image */
  width: number;
  /** Height of the processed image */
  height: number;
  /** Processing time in milliseconds */
  processingTime: number;
}

/**
 * Error thrown during background removal
 */
export class BackgroundRemovalError extends Error {
  constructor(
    message: string,
    public readonly stage?: BackgroundRemovalStage,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'BackgroundRemovalError';
  }
}

// ============================================================================
// Configuration
// ============================================================================

/**
 * Default configuration for background removal
 */
const DEFAULT_CONFIG: Partial<Config> = {
  debug: false,
  // Use public CDN for model files
  publicPath: 'https://unpkg.com/@anthropic-ai/background-removal@latest/dist/',
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Maps internal progress keys to human-readable stages
 */
function mapProgressKeyToStage(key: string): BackgroundRemovalStage {
  if (key.includes('model') || key.includes('load')) {
    return 'loading-model';
  }
  if (key.includes('inference') || key.includes('process')) {
    return 'processing';
  }
  if (key.includes('encode') || key.includes('output')) {
    return 'encoding';
  }
  return 'processing';
}

/**
 * Get image dimensions from a blob
 */
async function getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for dimension detection'));
    };

    img.src = url;
  });
}

/**
 * Fetch an image from URL and return as Blob
 */
async function fetchImageAsBlob(url: string): Promise<Blob> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new BackgroundRemovalError(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.startsWith('image/')) {
    throw new BackgroundRemovalError(
      `URL does not point to an image. Content-Type: ${contentType}`
    );
  }

  return response.blob();
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Remove background from an image file
 *
 * @param imageFile - The image file to process
 * @param options - Processing options
 * @returns Promise resolving to the processed image result
 *
 * @example
 * ```typescript
 * const result = await removeImageBackground(file, {
 *   onProgress: (progress, stage) => {
 *     console.log(`${stage}: ${Math.round(progress * 100)}%`);
 *   }
 * });
 *
 * // Use the result
 * const imageUrl = URL.createObjectURL(result.blob);
 * ```
 */
export async function removeImageBackground(
  imageFile: File,
  options: BackgroundRemovalOptions = {}
): Promise<BackgroundRemovalResult> {
  const startTime = performance.now();

  // Validate input
  if (!imageFile) {
    throw new BackgroundRemovalError('No image file provided');
  }

  if (!imageFile.type.startsWith('image/')) {
    throw new BackgroundRemovalError(
      `Invalid file type: ${imageFile.type}. Expected an image file.`
    );
  }

  try {
    // Build configuration
    const config: Partial<Config> = {
      ...DEFAULT_CONFIG,
      progress: options.onProgress
        ? (key: string, current: number, total: number) => {
            const progress = total > 0 ? current / total : 0;
            const stage = mapProgressKeyToStage(key);
            options.onProgress!(progress, stage);
          }
        : undefined,
      output: options.output,
    };

    // Perform background removal
    const resultBlob = await removeBackground(imageFile, config);

    // Get dimensions
    const dimensions = await getImageDimensions(resultBlob);

    // Final progress callback
    if (options.onProgress) {
      options.onProgress(1, 'complete');
    }

    return {
      blob: resultBlob,
      width: dimensions.width,
      height: dimensions.height,
      processingTime: performance.now() - startTime,
    };
  } catch (error) {
    if (error instanceof BackgroundRemovalError) {
      throw error;
    }

    throw new BackgroundRemovalError(
      `Background removal failed: ${error instanceof Error ? error.message : String(error)}`,
      'processing',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Remove background from an image URL
 *
 * @param imageUrl - URL of the image to process
 * @param options - Processing options
 * @returns Promise resolving to the processed image result
 *
 * @example
 * ```typescript
 * const result = await removeBackgroundFromUrl(
 *   'https://example.com/image.jpg',
 *   { onProgress: (p) => console.log(`Progress: ${p * 100}%`) }
 * );
 * ```
 */
export async function removeBackgroundFromUrl(
  imageUrl: string,
  options: BackgroundRemovalOptions = {}
): Promise<BackgroundRemovalResult> {
  // Validate URL
  if (!imageUrl) {
    throw new BackgroundRemovalError('No image URL provided');
  }

  try {
    new URL(imageUrl);
  } catch {
    throw new BackgroundRemovalError(`Invalid URL: ${imageUrl}`);
  }

  try {
    // Report initial progress for fetching
    if (options.onProgress) {
      options.onProgress(0, 'loading-model');
    }

    // Fetch the image
    const imageBlob = await fetchImageAsBlob(imageUrl);

    // Convert blob to file for processing
    const file = new File([imageBlob], 'image', { type: imageBlob.type });

    // Process with background removal
    return removeImageBackground(file, options);
  } catch (error) {
    if (error instanceof BackgroundRemovalError) {
      throw error;
    }

    throw new BackgroundRemovalError(
      `Failed to process image from URL: ${error instanceof Error ? error.message : String(error)}`,
      'loading-model',
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Remove background from a Blob
 *
 * @param imageBlob - The image blob to process
 * @param options - Processing options
 * @returns Promise resolving to the processed image result
 */
export async function removeBackgroundFromBlob(
  imageBlob: Blob,
  options: BackgroundRemovalOptions = {}
): Promise<BackgroundRemovalResult> {
  if (!imageBlob) {
    throw new BackgroundRemovalError('No image blob provided');
  }

  // Determine mime type
  const mimeType = imageBlob.type || 'image/png';

  // Convert blob to file
  const file = new File([imageBlob], `image.${mimeType.split('/')[1]}`, {
    type: mimeType
  });

  return removeImageBackground(file, options);
}

/**
 * Check if background removal is supported in the current environment
 */
export function isBackgroundRemovalSupported(): boolean {
  // Check for required APIs
  const hasWebAssembly = typeof WebAssembly !== 'undefined';
  const hasCanvas = typeof HTMLCanvasElement !== 'undefined';
  const hasBlob = typeof Blob !== 'undefined';
  const hasURL = typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function';

  return hasWebAssembly && hasCanvas && hasBlob && hasURL;
}

/**
 * Create an object URL from the result blob for preview
 */
export function createPreviewUrl(result: BackgroundRemovalResult): string {
  return URL.createObjectURL(result.blob);
}

/**
 * Clean up a preview URL when no longer needed
 */
export function revokePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
