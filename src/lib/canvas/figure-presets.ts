/**
 * Journal Figure Size Presets
 * Standard canvas sizes for scientific journal figures.
 */

export interface FigurePreset {
  id: string;
  name: string;
  description: string;
  widthMm: number;
  heightMm: number;
  category: 'journal' | 'standard' | 'presentation' | 'custom';
}

/** Convert mm to pixels at a given DPI */
export function mmToPx(mm: number, dpi = 300): number {
  return Math.round((mm / 25.4) * dpi);
}

export const FIGURE_PRESETS: FigurePreset[] = [
  // Journal presets
  { id: 'nature-single', name: 'Nature (single column)', description: '89 × 89 mm', widthMm: 89, heightMm: 89, category: 'journal' },
  { id: 'nature-1.5', name: 'Nature (1.5 column)', description: '120 × 89 mm', widthMm: 120, heightMm: 89, category: 'journal' },
  { id: 'nature-double', name: 'Nature (double column)', description: '183 × 120 mm', widthMm: 183, heightMm: 120, category: 'journal' },
  { id: 'nejm', name: 'NEJM (single column)', description: '86 × 86 mm', widthMm: 86, heightMm: 86, category: 'journal' },
  { id: 'lancet', name: 'Lancet (single column)', description: '89 × 119 mm', widthMm: 89, heightMm: 119, category: 'journal' },
  { id: 'science', name: 'Science (single column)', description: '85 × 85 mm', widthMm: 85, heightMm: 85, category: 'journal' },
  { id: 'cell', name: 'Cell (full width)', description: '174 × 120 mm', widthMm: 174, heightMm: 120, category: 'journal' },
  { id: 'plos', name: 'PLOS ONE (full width)', description: '190 × 120 mm', widthMm: 190, heightMm: 120, category: 'journal' },

  // Standard paper sizes
  { id: 'a4-portrait', name: 'A4 Portrait', description: '210 × 297 mm', widthMm: 210, heightMm: 297, category: 'standard' },
  { id: 'a4-landscape', name: 'A4 Landscape', description: '297 × 210 mm', widthMm: 297, heightMm: 210, category: 'standard' },
  { id: 'letter', name: 'US Letter', description: '215.9 × 279.4 mm', widthMm: 215.9, heightMm: 279.4, category: 'standard' },

  // Presentation
  { id: 'slide-16x9', name: 'Slide 16:9', description: '338.7 × 190.5 mm', widthMm: 338.7, heightMm: 190.5, category: 'presentation' },
  { id: 'slide-4x3', name: 'Slide 4:3', description: '254 × 190.5 mm', widthMm: 254, heightMm: 190.5, category: 'presentation' },
];

export function getPresetsByCategory(category: FigurePreset['category']): FigurePreset[] {
  return FIGURE_PRESETS.filter((p) => p.category === category);
}

export function getPresetById(id: string): FigurePreset | undefined {
  return FIGURE_PRESETS.find((p) => p.id === id);
}
