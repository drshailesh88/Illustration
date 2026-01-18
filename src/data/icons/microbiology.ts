/**
 * Microbiology Icon Library
 * Comprehensive SVG icons for microbiology
 *
 * Categories:
 * - Bacteria (morphology, structure, types)
 * - Viruses (structure, types, infection)
 * - Fungi (types, structure)
 * - Laboratory (microscopes, techniques, culture)
 */

import type { IconDefinition } from './index';

export const microbiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // BACTERIA
  // ===========================================================================
  {
    id: 'micro-bacteria-coccus',
    name: 'Coccus Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['coccus', 'spherical', 'bacteria', 'Staphylococcus', 'Streptococcus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="32" cy="16" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="48" cy="16" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="24" cy="32" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="40" cy="32" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="16" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="32" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="48" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-bacillus',
    name: 'Bacillus Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['bacillus', 'rod-shaped', 'bacteria', 'E. coli', 'Salmonella'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="36" y="12" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="12" y="28" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="40" y="32" width="18" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="8" y="48" width="22" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="36" y="48" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <path d="M4 12c-2-4 0-8 4-4"/>
      <path d="M60 16c2-4 0-8-4-4"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-spirillum',
    name: 'Spirillum Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['spirillum', 'spiral', 'bacteria', 'Spirochete', 'helical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-12 8 12 12 0s8 12 12 0 8 12 12 0 8 12 12 0" stroke="#E74C3C" stroke-width="3"/>
      <path d="M8 48c4-8 8 8 12 0s8 8 12 0 8 8 12 0 8 8 12 0" stroke="#E74C3C" stroke-width="2" opacity="0.6"/>
      <path d="M12 16c4-8 8 8 12 0s8 8 12 0 8 8 12 0" stroke="#E74C3C" stroke-width="2" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-vibrio',
    name: 'Vibrio Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['vibrio', 'comma-shaped', 'bacteria', 'cholera', 'curved'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 12c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M24 36c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M48 40c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M16 16c-4-8-4-12 0-12"/>
      <path d="M40 12c-4-8-4-12 0-12"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-structure',
    name: 'Bacterial Cell Structure',
    domain: 'biology',
    category: 'bacteria',
    tags: ['bacterial cell', 'structure', 'flagella', 'pili', 'capsule', 'cell wall'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#9B59B6" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="20" ry="12" stroke-dasharray="2 2"/>
      <circle cx="24" cy="28" r="4" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="40" cy="34" rx="6" ry="4" fill="#3498DB" opacity="0.5"/>
      <path d="M8 32c-8 0-8-8 0-8"/>
      <path d="M56 32c8 0 8 8 0 8"/>
      <path d="M56 28c6-4 6-8 2-8"/>
      <path d="M56 36c6 4 6 8 2 8"/>
      <text x="18" y="30" font-size="3" fill="currentColor" stroke="none">DNA</text>
      <text x="36" y="38" font-size="3" fill="currentColor" stroke="none">Ribosome</text>
    </svg>`
  },
  {
    id: 'micro-gram-stain',
    name: 'Gram Stain',
    domain: 'biology',
    category: 'bacteria',
    tags: ['Gram stain', 'Gram positive', 'Gram negative', 'staining', 'differential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="48" rx="2"/>
      <rect x="36" y="8" width="24" height="48" rx="2"/>
      <circle cx="12" cy="24" r="4" fill="#9B59B6"/>
      <circle cx="20" cy="32" r="4" fill="#9B59B6"/>
      <circle cx="14" cy="40" r="4" fill="#9B59B6"/>
      <ellipse cx="44" cy="24" rx="6" ry="3" fill="#E74C3C"/>
      <ellipse cx="52" cy="32" rx="6" ry="3" fill="#E74C3C"/>
      <ellipse cx="46" cy="42" rx="6" ry="3" fill="#E74C3C"/>
      <text x="6" y="60" font-size="4" fill="currentColor" stroke="none">Gram+</text>
      <text x="38" y="60" font-size="4" fill="currentColor" stroke="none">Gram-</text>
    </svg>`
  },

  // ===========================================================================
  // VIRUSES
  // ===========================================================================
  {
    id: 'micro-virus-icosahedral',
    name: 'Icosahedral Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['icosahedral', 'virus', 'capsid', 'adenovirus', 'poliovirus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,4 56,20 56,44 32,60 8,44 8,20" fill="#E74C3C" opacity="0.3"/>
      <polygon points="32,4 56,20 56,44 32,60 8,44 8,20"/>
      <line x1="32" y1="4" x2="32" y2="60"/>
      <line x1="8" y1="20" x2="56" y2="44"/>
      <line x1="56" y1="20" x2="8" y2="44"/>
      <circle cx="32" cy="32" r="8" fill="#9B59B6" opacity="0.5"/>
      <text x="26" y="36" font-size="4" fill="currentColor" stroke="none">DNA</text>
    </svg>`
  },
  {
    id: 'micro-virus-helical',
    name: 'Helical Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['helical', 'virus', 'TMV', 'tobacco mosaic', 'RNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="56" rx="4" fill="#27AE60" opacity="0.3"/>
      <path d="M20 12c12 4 12-4 24 0"/>
      <path d="M20 20c12 4 12-4 24 0"/>
      <path d="M20 28c12 4 12-4 24 0"/>
      <path d="M20 36c12 4 12-4 24 0"/>
      <path d="M20 44c12 4 12-4 24 0"/>
      <path d="M20 52c12 4 12-4 24 0"/>
      <line x1="32" y1="4" x2="32" y2="60" stroke="#E74C3C" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'micro-virus-envelope',
    name: 'Enveloped Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['enveloped', 'virus', 'influenza', 'HIV', 'membrane'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#F39C12" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M8 32l-4-4v8z"/>
      <path d="M56 32l4-4v8z"/>
      <path d="M32 8l-4-4h8z"/>
      <path d="M32 56l-4 4h8z"/>
      <path d="M12 16l-4-2 2-4"/>
      <path d="M52 16l4-2-2-4"/>
      <path d="M12 48l-4 2 2 4"/>
      <path d="M52 48l4 2-2 4"/>
      <text x="24" y="36" font-size="4" fill="currentColor" stroke="none">RNA</text>
    </svg>`
  },
  {
    id: 'micro-bacteriophage',
    name: 'Bacteriophage',
    domain: 'biology',
    category: 'viruses',
    tags: ['bacteriophage', 'phage', 'T4', 'lytic', 'lysogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,4 44,16 44,28 32,36 20,28 20,16" fill="#3498DB" opacity="0.3"/>
      <polygon points="32,4 44,16 44,28 32,36 20,28 20,16"/>
      <rect x="28" y="36" width="8" height="12"/>
      <path d="M28 48l-8 12"/>
      <path d="M36 48l8 12"/>
      <path d="M32 48v12"/>
      <line x1="20" y1="60" x2="44" y2="60"/>
      <text x="26" y="24" font-size="4" fill="currentColor" stroke="none">DNA</text>
    </svg>`
  },
  {
    id: 'micro-coronavirus',
    name: 'Coronavirus',
    domain: 'biology',
    category: 'viruses',
    tags: ['coronavirus', 'spike protein', 'COVID', 'SARS', 'RNA virus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <g fill="#E74C3C">
        <circle cx="32" cy="8" r="4"/>
        <circle cx="32" cy="56" r="4"/>
        <circle cx="8" cy="32" r="4"/>
        <circle cx="56" cy="32" r="4"/>
        <circle cx="14" cy="14" r="4"/>
        <circle cx="50" cy="14" r="4"/>
        <circle cx="14" cy="50" r="4"/>
        <circle cx="50" cy="50" r="4"/>
      </g>
      <path d="M32 16v-4"/>
      <path d="M32 52v-4"/>
      <path d="M16 32h-4"/>
      <path d="M52 32h-4"/>
    </svg>`
  },
  {
    id: 'micro-virus-replication',
    name: 'Viral Replication Cycle',
    domain: 'biology',
    category: 'viruses',
    tags: ['replication', 'lytic cycle', 'attachment', 'assembly', 'release'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" stroke-dasharray="4 2"/>
      <polygon points="8,32 16,28 16,36" fill="#E74C3C" opacity="0.5"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">1.Attach</text>
      <circle cx="32" cy="8" r="4" fill="#F39C12" opacity="0.5"/>
      <text x="38" y="12" font-size="3" fill="currentColor" stroke="none">2.Entry</text>
      <path d="M52 24c-4-4-4 4-8 0" stroke="#9B59B6"/>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">3.Copy</text>
      <polygon points="56,32 48,28 48,36" fill="#27AE60" opacity="0.5"/>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">4.Assembly</text>
      <circle cx="32" cy="56" r="4" fill="#3498DB" opacity="0.5"/>
      <path d="M28 56l-8 4"/>
      <path d="M36 56l8 4"/>
      <text x="24" y="64" font-size="3" fill="currentColor" stroke="none">5.Release</text>
    </svg>`
  },

  // ===========================================================================
  // FUNGI
  // ===========================================================================
  {
    id: 'micro-yeast',
    name: 'Yeast Cell',
    domain: 'biology',
    category: 'fungi',
    tags: ['yeast', 'Saccharomyces', 'budding', 'unicellular', 'fungi'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="16" ry="20" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="24" cy="32" rx="16" ry="20"/>
      <circle cx="24" cy="24" r="6" fill="#9B59B6" opacity="0.5"/>
      <ellipse cx="24" cy="36" rx="4" ry="6" fill="#E74C3C" opacity="0.3"/>
      <ellipse cx="48" cy="24" rx="8" ry="10" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="48" cy="24" rx="8" ry="10"/>
      <path d="M40 28c4 4 4 0 4 0"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Budding yeast</text>
    </svg>`
  },
  {
    id: 'micro-mold-hyphae',
    name: 'Fungal Hyphae',
    domain: 'biology',
    category: 'fungi',
    tags: ['hyphae', 'mycelium', 'mold', 'filamentous', 'septate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c8-16 8-32 24-32" stroke-width="2"/>
      <path d="M32 24c8 0 16 8 24 8" stroke-width="2"/>
      <path d="M32 24c0-8 8-16 16-16" stroke-width="2"/>
      <path d="M24 40c-8 0-16-8-16-16" stroke-width="2"/>
      <path d="M32 24c-8 8-8 24-8 32" stroke-width="2"/>
      <line x1="20" y1="36" x2="20" y2="52" stroke-dasharray="2 2"/>
      <line x1="32" y1="16" x2="40" y2="8" stroke-dasharray="2 2"/>
      <circle cx="8" cy="56" r="3" fill="#27AE60"/>
      <circle cx="48" cy="8" r="3" fill="#27AE60"/>
      <text x="36" y="60" font-size="4" fill="currentColor" stroke="none">Septa</text>
    </svg>`
  },
  {
    id: 'micro-mushroom',
    name: 'Mushroom Structure',
    domain: 'biology',
    category: 'fungi',
    tags: ['mushroom', 'basidiomycete', 'fruiting body', 'cap', 'gills'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 16-24 24-24s24 8 24 24" fill="#E74C3C" opacity="0.3"/>
      <path d="M8 32c0-16 16-24 24-24s24 8 24 24"/>
      <path d="M8 32c8 8 40 8 48 0"/>
      <rect x="26" y="32" width="12" height="20" fill="#F39C12" opacity="0.3"/>
      <rect x="26" y="32" width="12" height="20"/>
      <path d="M24 52c-8 4-8 8 0 8h16c8 0 8-4 0-8"/>
      <line x1="16" y1="32" x2="16" y2="36"/>
      <line x1="24" y1="32" x2="24" y2="38"/>
      <line x1="40" y1="32" x2="40" y2="38"/>
      <line x1="48" y1="32" x2="48" y2="36"/>
      <text x="10" y="44" font-size="3" fill="currentColor" stroke="none">Gills</text>
    </svg>`
  },
  {
    id: 'micro-spore',
    name: 'Fungal Spores',
    domain: 'biology',
    category: 'fungi',
    tags: ['spore', 'conidium', 'sporangium', 'reproduction', 'dispersal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-40"/>
      <circle cx="32" cy="12" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="24" cy="8" r="3" fill="#27AE60"/>
      <circle cx="32" cy="4" r="3" fill="#27AE60"/>
      <circle cx="40" cy="8" r="3" fill="#27AE60"/>
      <circle cx="28" cy="14" r="3" fill="#27AE60"/>
      <circle cx="36" cy="14" r="3" fill="#27AE60"/>
      <path d="M20 20l-8 8" stroke-dasharray="2 2"/>
      <path d="M44 20l8 8" stroke-dasharray="2 2"/>
      <circle cx="10" cy="30" r="2" fill="#27AE60" opacity="0.5"/>
      <circle cx="54" cy="30" r="2" fill="#27AE60" opacity="0.5"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Sporangium</text>
    </svg>`
  },

  // ===========================================================================
  // LABORATORY TECHNIQUES
  // ===========================================================================
  {
    id: 'micro-microscope',
    name: 'Light Microscope',
    domain: 'biology',
    category: 'laboratory',
    tags: ['microscope', 'optical', 'magnification', 'lens', 'specimen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="52" width="24" height="8" rx="2"/>
      <rect x="24" y="44" width="16" height="8"/>
      <path d="M32 44v-8"/>
      <rect x="26" y="32" width="12" height="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 32v-16"/>
      <circle cx="32" cy="12" r="6"/>
      <path d="M24 24l-8 8"/>
      <path d="M40 24l8 8"/>
      <circle cx="32" cy="36" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'micro-petri-dish',
    name: 'Petri Dish Culture',
    domain: 'biology',
    category: 'laboratory',
    tags: ['petri dish', 'culture', 'agar', 'colony', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="12" fill="#F39C12" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="28" ry="12"/>
      <ellipse cx="32" cy="28" rx="28" ry="12"/>
      <circle cx="16" cy="30" r="4" fill="#27AE60" opacity="0.6"/>
      <circle cx="28" cy="26" r="3" fill="#9B59B6" opacity="0.6"/>
      <circle cx="40" cy="32" r="5" fill="#E74C3C" opacity="0.6"/>
      <circle cx="48" cy="26" r="3" fill="#27AE60" opacity="0.6"/>
      <circle cx="24" cy="34" r="2" fill="#3498DB" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'micro-streak-plate',
    name: 'Streak Plate Method',
    domain: 'biology',
    category: 'laboratory',
    tags: ['streak plate', 'isolation', 'pure culture', 'technique', 'quadrant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28"/>
      <line x1="32" y1="4" x2="32" y2="60"/>
      <line x1="4" y1="32" x2="60" y2="32"/>
      <path d="M8 12c4 4 8-4 12 0s8-4 12 0" stroke="#27AE60"/>
      <path d="M40 8c0 4 4 8 0 12s4 8 0 12" stroke="#9B59B6"/>
      <path d="M56 40c-4 4-8-4-12 0s-8-4-12 0" stroke="#E74C3C"/>
      <circle cx="12" cy="48" r="2" fill="#3498DB"/>
      <circle cx="20" cy="44" r="2" fill="#3498DB"/>
      <circle cx="16" cy="52" r="2" fill="#3498DB"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">1</text>
      <text x="48" y="16" font-size="3" fill="currentColor" stroke="none">2</text>
      <text x="48" y="56" font-size="3" fill="currentColor" stroke="none">3</text>
      <text x="8" y="44" font-size="3" fill="currentColor" stroke="none">4</text>
    </svg>`
  },
  {
    id: 'micro-staining',
    name: 'Microscopy Staining',
    domain: 'biology',
    category: 'laboratory',
    tags: ['staining', 'dye', 'microscopy', 'visualization', 'contrast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="2"/>
      <rect x="20" y="12" width="24" height="40" fill="#9B59B6" opacity="0.2"/>
      <circle cx="28" cy="24" r="4" fill="#9B59B6"/>
      <circle cx="36" cy="32" r="3" fill="#9B59B6"/>
      <ellipse cx="32" cy="44" rx="6" ry="3" fill="#9B59B6"/>
      <path d="M8 20l8-4"/>
      <path d="M8 32l8-4"/>
      <path d="M8 44l8-4"/>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">Crystal</text>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">Violet</text>
    </svg>`
  },
  {
    id: 'micro-autoclave',
    name: 'Autoclave Sterilization',
    domain: 'biology',
    category: 'laboratory',
    tags: ['autoclave', 'sterilization', 'pressure', 'steam', 'sterile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="40" rx="4"/>
      <rect x="12" y="20" width="40" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="8" r="4"/>
      <circle cx="32" cy="8" r="4"/>
      <circle cx="44" cy="8" r="4"/>
      <path d="M20 36c2-4 2 4 4 0s2 4 4 0" stroke="#E74C3C"/>
      <path d="M36 36c2-4 2 4 4 0s2 4 4 0" stroke="#E74C3C"/>
      <rect x="24" y="44" width="16" height="4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">121C 15psi</text>
    </svg>`
  },
  {
    id: 'micro-antibiotic-test',
    name: 'Antibiotic Sensitivity Test',
    domain: 'biology',
    category: 'laboratory',
    tags: ['antibiotic', 'sensitivity', 'disc diffusion', 'Kirby-Bauer', 'zone of inhibition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#F39C12" opacity="0.1"/>
      <circle cx="32" cy="32" r="28"/>
      <circle cx="20" cy="20" r="4" fill="#FFFFFF" stroke="#333"/>
      <circle cx="20" cy="20" r="8" stroke-dasharray="2 2"/>
      <circle cx="44" cy="20" r="4" fill="#FFFFFF" stroke="#333"/>
      <circle cx="44" cy="20" r="12" stroke-dasharray="2 2"/>
      <circle cx="20" cy="44" r="4" fill="#FFFFFF" stroke="#333"/>
      <circle cx="20" cy="44" r="6" stroke-dasharray="2 2"/>
      <circle cx="44" cy="44" r="4" fill="#FFFFFF" stroke="#333"/>
      <text x="40" y="36" font-size="3" fill="currentColor" stroke="none">Resistant</text>
    </svg>`
  },
  {
    id: 'micro-pcr-tube',
    name: 'PCR Tube',
    domain: 'biology',
    category: 'laboratory',
    tags: ['PCR', 'tube', 'amplification', 'thermal cycler', 'DNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24v8c0 4-4 8-4 16v24c0 4-4 4-8 4s-8 0-8-4V32c0-8-4-12-4-16V8z"/>
      <path d="M20 8h24" stroke-width="2"/>
      <rect x="24" y="36" width="16" height="20" fill="#3498DB" opacity="0.3"/>
      <path d="M28 44c2-2 4 2 6 0"/>
      <path d="M28 48c2-2 4 2 6 0"/>
      <text x="40" y="24" font-size="4" fill="currentColor" stroke="none">0.2mL</text>
    </svg>`
  },
];

export default microbiologyIcons;
