/**
 * ImageBackend.ts
 * AI image generation backend using fal.ai FLUX
 *
 * Bridges the fal.ai image generation library into the DiagramGenerator pipeline.
 * Generated images are embedded in SVG <image> elements for seamless integration
 * with the existing preview, export, and "Send to Editor" flows.
 */

import type { AIBackend, GenerationRequest, GenerationResult } from '../types';
import {
  generateScientificDiagram,
  imageToDataUrl,
  isClientConfigured,
  type IllustrationStyle,
} from '../../../lib/ai/image-generation';
import { AIServiceError } from '../types';

/**
 * Keywords that indicate the user wants an AI-generated image/illustration
 * rather than a structured diagram (flowchart, pathway, etc.)
 */
const IMAGE_KEYWORDS = [
  'illustration',
  'illustrate',
  'render',
  'realistic',
  'photorealistic',
  '3d',
  'artistic',
  'drawing',
  'painting',
  'sketch of',
  'picture of',
  'image of',
  'depict',
  'visualize',
  'visual of',
  'generate image',
  'generate illustration',
  'show me what',
  'what does',
  'look like',
];

/**
 * Detect illustration style from prompt text
 */
function detectStyle(prompt: string): IllustrationStyle {
  const lower = prompt.toLowerCase();

  if (lower.includes('photorealistic') || lower.includes('realistic') || lower.includes('3d')) {
    return 'photorealistic';
  }
  if (lower.includes('sketch') || lower.includes('hand-drawn') || lower.includes('pencil')) {
    return 'sketch';
  }
  if (lower.includes('detailed') || lower.includes('precise') || lower.includes('anatomical')) {
    return 'detailed';
  }
  if (lower.includes('diagram') || lower.includes('schematic') || lower.includes('technical')) {
    return 'diagram';
  }

  return 'clean';
}

/**
 * ImageBackend implements the AIBackend interface for fal.ai FLUX image generation.
 *
 * It wraps generated images in SVG so they integrate with the existing
 * DiagramGenerator → DiagramPreview → Editor pipeline.
 */
export class ImageBackend implements AIBackend {
  name = 'image';

  canHandle(prompt: string): boolean {
    if (!isClientConfigured()) {
      return false;
    }

    const lower = prompt.toLowerCase();
    return IMAGE_KEYWORDS.some((kw) => lower.includes(kw));
  }

  async generate(request: GenerationRequest): Promise<GenerationResult> {
    if (!isClientConfigured()) {
      throw new AIServiceError(
        'fal.ai is not configured. Set VITE_FAL_AI_API_KEY in your environment.',
        'BACKEND_UNAVAILABLE'
      );
    }

    const startTime = Date.now();
    const style = detectStyle(request.prompt);

    try {
      // Generate the image via fal.ai
      const result = await generateScientificDiagram(
        request.prompt,
        style
      );

      if (!result.images || result.images.length === 0) {
        throw new AIServiceError(
          'No images were generated',
          'GENERATION_FAILED'
        );
      }

      const image = result.images[0];

      // Convert the image URL to a data URL so it works offline and in SVG
      let imageHref: string;
      try {
        imageHref = await imageToDataUrl(image.url);
      } catch {
        // Fallback to direct URL if data URL conversion fails
        imageHref = image.url;
      }

      // Wrap in SVG for compatibility with the existing pipeline
      const width = image.width || 1024;
      const height = image.height || 1024;

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <image href="${imageHref}" x="0" y="0" width="${width}" height="${height}" />
</svg>`;

      return {
        svg,
        backend: 'image',
        metadata: {
          generatedAt: new Date(),
          promptTokens: 0,
          completionTokens: 0,
          generationTimeMs: Date.now() - startTime,
          provider: 'fallback',
        },
        warnings: result.hasNsfw
          ? ['NSFW content was detected and may have been filtered.']
          : undefined,
      };
    } catch (error) {
      if (error instanceof AIServiceError) {
        throw error;
      }

      throw new AIServiceError(
        `Image generation failed: ${(error as Error).message}`,
        'GENERATION_FAILED',
        { originalError: (error as Error).message }
      );
    }
  }
}
