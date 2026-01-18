/**
 * Cell Biology Icon Library
 * Comprehensive SVG icons for cell biology
 *
 * Categories:
 * - Cell Structure (organelles, membranes)
 * - Cell Division (mitosis, meiosis)
 * - Cellular Transport (diffusion, active transport)
 * - Cell Signaling (receptors, pathways)
 */

import type { IconDefinition } from './index';

export const cellbiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // CELL STRUCTURE
  // ===========================================================================
  {
    id: 'cell-animal-cell',
    name: 'Animal Cell',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['animal cell', 'eukaryote', 'organelles', 'nucleus', 'cytoplasm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <circle cx="32" cy="28" r="10" fill="#9B59B6" opacity="0.4"/>
      <circle cx="32" cy="26" r="3" fill="#9B59B6"/>
      <ellipse cx="16" cy="40" rx="6" ry="4" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="48" cy="36" rx="4" ry="6" fill="#27AE60" opacity="0.5"/>
      <circle cx="44" cy="20" r="4" fill="#F39C12" opacity="0.5"/>
      <path d="M20 20c4 4 8-4 12 0" stroke="#3498DB"/>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">Nucleus</text>
    </svg>`
  },
  {
    id: 'cell-nucleus',
    name: 'Nucleus Structure',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['nucleus', 'nuclear envelope', 'nucleolus', 'chromatin', 'nuclear pore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#9B59B6" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="22" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="8" fill="#9B59B6" opacity="0.6"/>
      <path d="M20 24c8 4 8-4 16 0s8-4 12 0" stroke="#333" stroke-width="0.5"/>
      <path d="M16 36c8 4 8-4 16 0s8-4 16 0" stroke="#333" stroke-width="0.5"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="56" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="8" r="2" fill="currentColor"/>
      <circle cx="32" cy="56" r="2" fill="currentColor"/>
      <text x="24" y="36" font-size="3" fill="currentColor" stroke="none">Nucleolus</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Pore</text>
    </svg>`
  },
  {
    id: 'cell-mitochondria',
    name: 'Mitochondrion',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['mitochondria', 'cristae', 'matrix', 'ATP', 'respiration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="16" fill="#E74C3C" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="28" ry="16"/>
      <ellipse cx="32" cy="32" rx="24" ry="12" stroke-dasharray="2 2"/>
      <path d="M12 32c4-8 4 8 8 0s4 8 8 0s4 8 8 0s4 8 8 0s4 8 8 0"/>
      <path d="M12 28c0-4 4-4 4 0"/>
      <path d="M48 28c0-4 4-4 4 0"/>
      <circle cx="32" cy="32" r="4" fill="#F39C12" opacity="0.5"/>
      <text x="28" y="36" font-size="3" fill="currentColor" stroke="none">ATP</text>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Cristae</text>
      <text x="40" y="52" font-size="3" fill="currentColor" stroke="none">Matrix</text>
    </svg>`
  },
  {
    id: 'cell-er',
    name: 'Endoplasmic Reticulum',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['ER', 'endoplasmic reticulum', 'rough ER', 'smooth ER', 'ribosomes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <path d="M20 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <circle cx="8" cy="16" r="2" fill="currentColor"/>
      <circle cx="8" cy="24" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="8" cy="40" r="2" fill="currentColor"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <circle cx="20" cy="36" r="2" fill="currentColor"/>
      <path d="M36 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <path d="M48 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <text x="4" y="62" font-size="4" fill="currentColor" stroke="none">Rough ER</text>
      <text x="36" y="62" font-size="4" fill="currentColor" stroke="none">Smooth ER</text>
    </svg>`
  },
  {
    id: 'cell-golgi',
    name: 'Golgi Apparatus',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['Golgi', 'cisternae', 'vesicle', 'secretion', 'modification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c16 4 32-4 48 0" stroke-width="2" fill="#F39C12" opacity="0.2"/>
      <path d="M10 24c14 4 28-4 44 0" stroke-width="2" fill="#F39C12" opacity="0.3"/>
      <path d="M12 32c12 4 24-4 40 0" stroke-width="2" fill="#F39C12" opacity="0.4"/>
      <path d="M14 40c10 4 20-4 36 0" stroke-width="2" fill="#F39C12" opacity="0.5"/>
      <path d="M16 48c8 4 16-4 32 0" stroke-width="2" fill="#F39C12" opacity="0.6"/>
      <circle cx="8" cy="32" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="56" cy="32" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M12 32h4" stroke-dasharray="2 2"/>
      <path d="M48 32h4" stroke-dasharray="2 2"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Cis</text>
      <text x="48" y="60" font-size="3" fill="currentColor" stroke="none">Trans</text>
    </svg>`
  },
  {
    id: 'cell-lysosome',
    name: 'Lysosome',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['lysosome', 'digestive', 'enzymes', 'hydrolytic', 'autophagy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="24" cy="28" r="4" fill="#E74C3C" opacity="0.5"/>
      <circle cx="40" cy="28" r="3" fill="#F39C12" opacity="0.5"/>
      <circle cx="28" cy="40" r="3" fill="#3498DB" opacity="0.5"/>
      <circle cx="38" cy="38" r="4" fill="#27AE60" opacity="0.5"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">pH ~5</text>
      <text x="8" y="20" font-size="3" fill="currentColor" stroke="none">Hydrolases</text>
    </svg>`
  },
  {
    id: 'cell-membrane',
    name: 'Cell Membrane',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['cell membrane', 'phospholipid bilayer', 'fluid mosaic', 'proteins'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(0,8)">
        <circle cx="8" cy="12" r="4" fill="#3498DB"/>
        <path d="M8 16v12"/>
        <path d="M6 16v12"/>
        <circle cx="20" cy="12" r="4" fill="#3498DB"/>
        <path d="M20 16v12"/>
        <path d="M18 16v12"/>
        <circle cx="32" cy="12" r="4" fill="#3498DB"/>
        <path d="M32 16v12"/>
        <path d="M30 16v12"/>
        <circle cx="44" cy="12" r="4" fill="#3498DB"/>
        <path d="M44 16v12"/>
        <path d="M42 16v12"/>
        <circle cx="56" cy="12" r="4" fill="#3498DB"/>
        <path d="M56 16v12"/>
        <path d="M54 16v12"/>
      </g>
      <g transform="translate(0,24)">
        <circle cx="8" cy="24" r="4" fill="#E74C3C"/>
        <path d="M8 12v12"/>
        <path d="M10 12v12"/>
        <circle cx="20" cy="24" r="4" fill="#E74C3C"/>
        <path d="M20 12v12"/>
        <path d="M22 12v12"/>
        <circle cx="32" cy="24" r="4" fill="#E74C3C"/>
        <path d="M32 12v12"/>
        <path d="M34 12v12"/>
        <circle cx="44" cy="24" r="4" fill="#E74C3C"/>
        <path d="M44 12v12"/>
        <path d="M46 12v12"/>
        <circle cx="56" cy="24" r="4" fill="#E74C3C"/>
        <path d="M56 12v12"/>
        <path d="M58 12v12"/>
      </g>
      <ellipse cx="32" cy="36" rx="8" ry="12" fill="#27AE60" opacity="0.5"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Protein</text>
    </svg>`
  },
  {
    id: 'cell-cytoskeleton',
    name: 'Cytoskeleton',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['cytoskeleton', 'microtubules', 'actin', 'intermediate filaments'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <path d="M16 16l32 32" stroke="#E74C3C" stroke-width="3"/>
      <path d="M48 16l-32 32" stroke="#E74C3C" stroke-width="3"/>
      <path d="M32 8v48" stroke="#E74C3C" stroke-width="3"/>
      <path d="M8 32h48" stroke="#E74C3C" stroke-width="3"/>
      <path d="M12 20c8 4 8-4 16 0s8-4 16 0s8-4 12 0" stroke="#3498DB"/>
      <path d="M12 44c8 4 8-4 16 0s8-4 16 0s8-4 12 0" stroke="#3498DB"/>
      <circle cx="32" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Microtubules Actin Filaments</text>
    </svg>`
  },

  // ===========================================================================
  // CELL DIVISION
  // ===========================================================================
  {
    id: 'cell-mitosis',
    name: 'Mitosis Overview',
    domain: 'biology',
    category: 'cell-division',
    tags: ['mitosis', 'cell division', 'prophase', 'metaphase', 'anaphase', 'telophase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="12" cy="16" r="4" fill="#9B59B6" opacity="0.5"/>
      <text x="4" y="30" font-size="3" fill="currentColor" stroke="none">Interphase</text>
      <ellipse cx="32" cy="16" rx="10" ry="8" fill="#FFE4E1" opacity="0.3"/>
      <path d="M24 16h16"/>
      <path d="M28 12l-4 4 4 4" stroke="#E74C3C"/>
      <path d="M36 12l4 4-4 4" stroke="#3498DB"/>
      <text x="24" y="30" font-size="3" fill="currentColor" stroke="none">Metaphase</text>
      <ellipse cx="52" cy="16" rx="10" ry="8" fill="#FFE4E1" opacity="0.3"/>
      <path d="M44 16l6-4"/>
      <path d="M60 16l-6-4"/>
      <path d="M44 16l6 4"/>
      <path d="M60 16l-6 4"/>
      <text x="44" y="30" font-size="3" fill="currentColor" stroke="none">Anaphase</text>
      <circle cx="22" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="22" cy="48" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="42" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="42" cy="48" r="4" fill="#9B59B6" opacity="0.5"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">2 Daughter cells</text>
    </svg>`
  },
  {
    id: 'cell-meiosis',
    name: 'Meiosis Overview',
    domain: 'biology',
    category: 'cell-division',
    tags: ['meiosis', 'reduction division', 'gametes', 'haploid', 'crossing over'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#FFE4E1" opacity="0.3"/>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">2n</text>
      <path d="M32 14v4"/>
      <circle cx="24" cy="26" r="6" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="40" cy="26" r="6" fill="#FFE4E1" opacity="0.3"/>
      <text x="20" y="28" font-size="3" fill="currentColor" stroke="none">2n</text>
      <text x="36" y="28" font-size="3" fill="currentColor" stroke="none">2n</text>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">Meiosis I</text>
      <path d="M24 32v4"/>
      <path d="M40 32v4"/>
      <circle cx="16" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <circle cx="48" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <text x="13" y="46" font-size="3" fill="currentColor" stroke="none">n</text>
      <text x="29" y="46" font-size="3" fill="currentColor" stroke="none">n</text>
      <text x="45" y="46" font-size="3" fill="currentColor" stroke="none">n</text>
      <text x="48" y="46" font-size="3" fill="currentColor" stroke="none">Meiosis II</text>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">4 Haploid gametes</text>
    </svg>`
  },
  {
    id: 'cell-cell-cycle',
    name: 'Cell Cycle',
    domain: 'biology',
    category: 'cell-division',
    tags: ['cell cycle', 'G1', 'S phase', 'G2', 'M phase', 'checkpoint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8a24 24 0 0 1 20.8 12" fill="none" stroke="#E74C3C" stroke-width="4"/>
      <path d="M52.8 20a24 24 0 0 1 0 24" fill="none" stroke="#F39C12" stroke-width="4"/>
      <path d="M52.8 44a24 24 0 0 1-20.8 12" fill="none" stroke="#27AE60" stroke-width="4"/>
      <path d="M32 56a24 24 0 0 1-20.8-12" fill="none" stroke="#3498DB" stroke-width="4"/>
      <path d="M11.2 44a24 24 0 0 1 0-24" fill="none" stroke="#9B59B6" stroke-width="4"/>
      <path d="M11.2 20a24 24 0 0 1 20.8-12" fill="none" stroke="#9B59B6" stroke-width="4"/>
      <text x="28" y="14" font-size="4" fill="currentColor" stroke="none">M</text>
      <text x="46" y="28" font-size="4" fill="currentColor" stroke="none">G1</text>
      <text x="46" y="44" font-size="4" fill="currentColor" stroke="none">S</text>
      <text x="28" y="54" font-size="4" fill="currentColor" stroke="none">G2</text>
      <text x="10" y="36" font-size="4" fill="currentColor" stroke="none">M</text>
    </svg>`
  },
  {
    id: 'cell-spindle',
    name: 'Mitotic Spindle',
    domain: 'biology',
    category: 'cell-division',
    tags: ['spindle', 'microtubules', 'centrosome', 'kinetochore', 'chromosome'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="4" fill="#F39C12" opacity="0.6"/>
      <circle cx="56" cy="32" r="4" fill="#F39C12" opacity="0.6"/>
      <path d="M12 32l16-8"/>
      <path d="M12 32l16 0"/>
      <path d="M12 32l16 8"/>
      <path d="M52 32l-16-8"/>
      <path d="M52 32l-16 0"/>
      <path d="M52 32l-16 8"/>
      <rect x="28" y="22" width="8" height="4" fill="#E74C3C" opacity="0.5"/>
      <rect x="28" y="30" width="8" height="4" fill="#3498DB" opacity="0.5"/>
      <rect x="28" y="38" width="8" height="4" fill="#27AE60" opacity="0.5"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Centrosome</text>
      <text x="24" y="56" font-size="3" fill="currentColor" stroke="none">Chromosomes</text>
    </svg>`
  },
  {
    id: 'cell-cytokinesis',
    name: 'Cytokinesis',
    domain: 'biology',
    category: 'cell-division',
    tags: ['cytokinesis', 'cleavage furrow', 'cell plate', 'division'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="20" fill="#FFE4E1" opacity="0.2"/>
      <path d="M32 12c0 8-8 12-8 20s8 12 8 20" fill="none"/>
      <path d="M32 12c0 8 8 12 8 20s-8 12-8 20" fill="none"/>
      <path d="M32 24v16" stroke="#E74C3C" stroke-width="2" stroke-dasharray="2 2"/>
      <circle cx="20" cy="32" r="6" fill="#9B59B6" opacity="0.4"/>
      <circle cx="44" cy="32" r="6" fill="#9B59B6" opacity="0.4"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Cleavage furrow</text>
      <path d="M32 20l-4 4 4 4" stroke="#333"/>
      <path d="M32 20l4 4-4 4" stroke="#333"/>
    </svg>`
  },

  // ===========================================================================
  // CELLULAR TRANSPORT
  // ===========================================================================
  {
    id: 'cell-diffusion',
    name: 'Diffusion',
    domain: 'biology',
    category: 'transport',
    tags: ['diffusion', 'passive transport', 'concentration gradient', 'molecules'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="56" fill="#E74C3C" opacity="0.2"/>
      <rect x="36" y="4" width="24" height="56" fill="#E74C3C" opacity="0.05"/>
      <line x1="32" y1="4" x2="32" y2="60" stroke-dasharray="4 2"/>
      <circle cx="12" cy="16" r="3" fill="#E74C3C"/>
      <circle cx="20" cy="24" r="3" fill="#E74C3C"/>
      <circle cx="8" cy="32" r="3" fill="#E74C3C"/>
      <circle cx="16" cy="40" r="3" fill="#E74C3C"/>
      <circle cx="24" cy="48" r="3" fill="#E74C3C"/>
      <circle cx="44" cy="28" r="3" fill="#E74C3C" opacity="0.5"/>
      <circle cx="52" cy="40" r="3" fill="#E74C3C" opacity="0.5"/>
      <path d="M28 32l8 0" stroke="#E74C3C"/>
      <path d="M36 28l4 4-4 4" stroke="#E74C3C"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">High</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Low</text>
    </svg>`
  },
  {
    id: 'cell-osmosis',
    name: 'Osmosis',
    domain: 'biology',
    category: 'transport',
    tags: ['osmosis', 'water', 'semipermeable', 'hypertonic', 'hypotonic', 'isotonic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="16" height="48" fill="#87CEEB" opacity="0.2"/>
      <rect x="24" y="8" width="16" height="48" fill="#87CEEB" opacity="0.4"/>
      <rect x="44" y="8" width="16" height="48" fill="#87CEEB" opacity="0.6"/>
      <circle cx="12" cy="32" r="8" fill="#FFE4E1"/>
      <circle cx="12" cy="32" r="6"/>
      <circle cx="32" cy="32" r="8" fill="#FFE4E1"/>
      <circle cx="52" cy="32" r="8" fill="#FFE4E1"/>
      <circle cx="52" cy="32" r="10"/>
      <path d="M4 24l4 0" stroke="#3498DB"/>
      <path d="M8 28l-4 4" stroke="#3498DB"/>
      <path d="M36 24l4 0" stroke="#3498DB"/>
      <path d="M36 28l4 0" stroke="#3498DB"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Hypertonic</text>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">Isotonic</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Hypotonic</text>
    </svg>`
  },
  {
    id: 'cell-active-transport',
    name: 'Active Transport',
    domain: 'biology',
    category: 'transport',
    tags: ['active transport', 'ATP', 'pump', 'against gradient', 'Na-K pump'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="#27AE60" opacity="0.4"/>
      <circle cx="16" cy="16" r="4" fill="#E74C3C"/>
      <circle cx="24" cy="12" r="4" fill="#E74C3C"/>
      <path d="M20 20v8" stroke="#E74C3C"/>
      <path d="M16 28l4 4 4-4" stroke="#E74C3C"/>
      <circle cx="48" cy="48" r="4" fill="#3498DB"/>
      <circle cx="40" cy="52" r="4" fill="#3498DB"/>
      <path d="M44 44v-8" stroke="#3498DB"/>
      <path d="M40 36l4-4 4 4" stroke="#3498DB"/>
      <circle cx="32" cy="56" r="3" fill="#F39C12"/>
      <text x="28" y="60" font-size="4" fill="currentColor" stroke="none">ATP</text>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Na+ out</text>
      <text x="44" y="10" font-size="3" fill="currentColor" stroke="none">K+ in</text>
    </svg>`
  },
  {
    id: 'cell-endocytosis',
    name: 'Endocytosis',
    domain: 'biology',
    category: 'transport',
    tags: ['endocytosis', 'phagocytosis', 'pinocytosis', 'vesicle', 'uptake'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c0-4 8-8 16-8h24c8 0 16 4 16 8"/>
      <path d="M20 24c0 8 8 16 12 16s12-8 12-16" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="20" r="6" fill="#E74C3C" opacity="0.5"/>
      <path d="M4 32c0 4 8 8 16 8"/>
      <path d="M60 32c0 4-8 8-16 8"/>
      <path d="M20 40c0-4 8-8 12-8s12 4 12 8"/>
      <circle cx="32" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="48" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M32 12v-4"/>
      <path d="M28 8l4 4 4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Vesicle forms</text>
    </svg>`
  },
  {
    id: 'cell-exocytosis',
    name: 'Exocytosis',
    domain: 'biology',
    category: 'transport',
    tags: ['exocytosis', 'secretion', 'vesicle', 'release', 'fusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c0 4 8 8 16 8h24c8 0 16-4 16-8"/>
      <circle cx="32" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="48" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M32 40v-8"/>
      <path d="M28 32l4-4 4 4"/>
      <path d="M24 32c0 4 4 8 8 8s8-4 8-8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="20" r="4" fill="#27AE60" opacity="0.5"/>
      <circle cx="24" cy="12" r="2" fill="#27AE60" opacity="0.5"/>
      <circle cx="40" cy="12" r="2" fill="#27AE60" opacity="0.5"/>
      <circle cx="32" cy="8" r="2" fill="#27AE60" opacity="0.5"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Contents released</text>
    </svg>`
  },

  // ===========================================================================
  // CELL SIGNALING
  // ===========================================================================
  {
    id: 'cell-receptor',
    name: 'Cell Surface Receptor',
    domain: 'biology',
    category: 'signaling',
    tags: ['receptor', 'ligand', 'signal transduction', 'binding', 'membrane'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="56" height="8" fill="#3498DB" opacity="0.3"/>
      <path d="M32 28v-8c-4 0-8-4-8-8s4-8 8-8 8 4 8 8-4 8-8 8" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="8" r="4" fill="#E74C3C"/>
      <path d="M32 36v20" stroke-width="2"/>
      <path d="M24 44l8 4 8-4"/>
      <path d="M24 52l8 4 8-4"/>
      <circle cx="32" cy="56" r="3" fill="#F39C12"/>
      <text x="40" y="12" font-size="3" fill="currentColor" stroke="none">Ligand</text>
      <text x="40" y="24" font-size="3" fill="currentColor" stroke="none">Receptor</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Signal cascade</text>
    </svg>`
  },
  {
    id: 'cell-signal-cascade',
    name: 'Signal Transduction Cascade',
    domain: 'biology',
    category: 'signaling',
    tags: ['signal transduction', 'cascade', 'kinase', 'phosphorylation', 'pathway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="12" font-size="4" fill="currentColor" stroke="none">L</text>
      <path d="M32 14v6"/>
      <rect x="24" y="20" width="16" height="8" fill="#27AE60" opacity="0.4"/>
      <text x="28" y="26" font-size="3" fill="currentColor" stroke="none">R</text>
      <path d="M32 28v4"/>
      <circle cx="32" cy="36" r="4" fill="#3498DB" opacity="0.5"/>
      <path d="M32 40v4"/>
      <circle cx="32" cy="48" r="4" fill="#9B59B6" opacity="0.5"/>
      <path d="M32 52v4"/>
      <rect x="24" y="56" width="16" height="6" fill="#F39C12" opacity="0.4"/>
      <text x="20" y="64" font-size="3" fill="currentColor" stroke="none">Gene expression</text>
      <text x="40" y="38" font-size="3" fill="currentColor" stroke="none">Kinase 1</text>
      <text x="40" y="50" font-size="3" fill="currentColor" stroke="none">Kinase 2</text>
    </svg>`
  },
  {
    id: 'cell-second-messenger',
    name: 'Second Messengers',
    domain: 'biology',
    category: 'signaling',
    tags: ['second messenger', 'cAMP', 'calcium', 'IP3', 'intracellular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="8" fill="#3498DB" opacity="0.3"/>
      <path d="M20 20v-8"/>
      <circle cx="20" cy="8" r="4" fill="#E74C3C"/>
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="#27AE60" opacity="0.4"/>
      <path d="M20 28v8"/>
      <circle cx="20" cy="40" r="4" fill="#F39C12"/>
      <text x="28" y="42" font-size="3" fill="currentColor" stroke="none">cAMP</text>
      <circle cx="16" cy="52" r="2" fill="#F39C12" opacity="0.6"/>
      <circle cx="24" cy="52" r="2" fill="#F39C12" opacity="0.6"/>
      <circle cx="20" cy="56" r="2" fill="#F39C12" opacity="0.6"/>
      <ellipse cx="48" cy="24" rx="6" ry="4" fill="#9B59B6" opacity="0.4"/>
      <path d="M48 28v8"/>
      <circle cx="48" cy="40" r="4" fill="#87CEEB"/>
      <text x="52" y="42" font-size="3" fill="currentColor" stroke="none">Ca²⁺</text>
      <circle cx="44" cy="52" r="2" fill="#87CEEB" opacity="0.6"/>
      <circle cx="52" cy="52" r="2" fill="#87CEEB" opacity="0.6"/>
      <circle cx="48" cy="56" r="2" fill="#87CEEB" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'cell-apoptosis',
    name: 'Apoptosis',
    domain: 'biology',
    category: 'signaling',
    tags: ['apoptosis', 'programmed cell death', 'caspase', 'fragmentation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="10" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="12" cy="32" r="4" fill="#9B59B6" opacity="0.5"/>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Normal</text>
      <circle cx="36" cy="32" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="36" cy="32" r="3" fill="#9B59B6" opacity="0.5"/>
      <path d="M28 32c4-4 12-4 16 0"/>
      <path d="M28 32c4 4 12 4 16 0"/>
      <text x="28" y="52" font-size="3" fill="currentColor" stroke="none">Blebbing</text>
      <circle cx="52" cy="28" r="4" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="56" cy="36" r="3" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="48" cy="36" r="3" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="52" cy="40" r="2" fill="#FFE4E1" opacity="0.3"/>
      <text x="44" y="52" font-size="3" fill="currentColor" stroke="none">Apoptotic</text>
      <text x="48" y="58" font-size="3" fill="currentColor" stroke="none">bodies</text>
    </svg>`
  },
];

export default cellbiologyIcons;
