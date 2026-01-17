/**
 * chemistry.ts
 * Chemistry icon definitions for FINNISH Icon Library
 *
 * Contains icons related to chemistry, laboratory equipment,
 * molecular structures, and chemical processes.
 */

import type { IconDefinition } from './index';

/**
 * Chemistry domain icons collection
 */
export const chemistryIcons: IconDefinition[] = [
  {
    id: 'chem-beaker',
    name: 'Beaker',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['laboratory', 'container', 'mixing', 'measurement', 'liquid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 3h16v16a2 2 0 01-2 2H6a2 2 0 01-2-2V3z"/>
  <path d="M4 3l2-1h12l2 1"/>
  <path d="M4 13h16"/>
  <path d="M7 7h2"/>
  <path d="M7 10h2"/>
</svg>`,
  },
  {
    id: 'chem-flask',
    name: 'Erlenmeyer Flask',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['conical', 'titration', 'reaction', 'laboratory', 'experiment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 2h6"/>
  <path d="M10 2v6l-6 10a1 1 0 001 1h14a1 1 0 001-1l-6-10V2"/>
  <path d="M6 15h12"/>
</svg>`,
  },
  {
    id: 'chem-molecule',
    name: 'Molecule',
    domain: 'chemistry',
    category: 'structure',
    tags: ['atoms', 'bonds', 'compound', 'organic', 'model'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <circle cx="5" cy="8" r="2"/>
  <circle cx="5" cy="16" r="2"/>
  <circle cx="19" cy="12" r="2"/>
  <path d="M9.5 10.5l-2.5-1.5"/>
  <path d="M9.5 13.5l-2.5 1.5"/>
  <path d="M15 12h2"/>
</svg>`,
  },
  {
    id: 'chem-atom',
    name: 'Atom',
    domain: 'chemistry',
    category: 'structure',
    tags: ['nucleus', 'electron', 'orbit', 'element', 'particle'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <ellipse cx="12" cy="12" rx="10" ry="4"/>
  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
</svg>`,
  },
  {
    id: 'chem-benzene',
    name: 'Benzene Ring',
    domain: 'chemistry',
    category: 'structure',
    tags: ['aromatic', 'hexagonal', 'organic', 'ring', 'hydrocarbon'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,3 20,7 20,17 12,21 4,17 4,7"/>
  <circle cx="12" cy="12" r="4"/>
</svg>`,
  },
  {
    id: 'chem-bond',
    name: 'Chemical Bond',
    domain: 'chemistry',
    category: 'structure',
    tags: ['covalent', 'ionic', 'connection', 'link', 'electron'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="4"/>
  <path d="M10 11h4"/>
  <path d="M10 13h4"/>
</svg>`,
  },
  {
    id: 'chem-burette',
    name: 'Burette',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['titration', 'measurement', 'volumetric', 'precision', 'analysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="9" y="2" width="6" height="16" rx="1"/>
  <path d="M9 6h6"/>
  <path d="M9 10h6"/>
  <path d="M9 14h6"/>
  <path d="M12 18v3"/>
  <path d="M10 21h4"/>
  <circle cx="12" cy="21" r="1"/>
</svg>`,
  },
  {
    id: 'chem-periodic-table',
    name: 'Periodic Table',
    domain: 'chemistry',
    category: 'reference',
    tags: ['elements', 'mendeleev', 'periodic', 'atomic', 'chart'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="4" height="4"/>
  <rect x="18" y="4" width="4" height="4"/>
  <rect x="2" y="8" width="4" height="4"/>
  <rect x="6" y="8" width="4" height="4"/>
  <rect x="14" y="8" width="4" height="4"/>
  <rect x="18" y="8" width="4" height="4"/>
  <rect x="2" y="12" width="4" height="4"/>
  <rect x="6" y="12" width="4" height="4"/>
  <rect x="10" y="12" width="4" height="4"/>
  <rect x="14" y="12" width="4" height="4"/>
  <rect x="18" y="12" width="4" height="4"/>
  <rect x="6" y="18" width="12" height="2"/>
</svg>`,
  },
  {
    id: 'chem-reaction',
    name: 'Chemical Reaction',
    domain: 'chemistry',
    category: 'process',
    tags: ['arrow', 'equilibrium', 'reversible', 'yield', 'transformation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="5" cy="12" r="3"/>
  <circle cx="19" cy="12" r="3"/>
  <path d="M8 10h8"/>
  <path d="M8 14h8"/>
  <path d="M14 8l2 2-2 2"/>
  <path d="M10 16l-2-2 2-2"/>
</svg>`,
  },
  {
    id: 'chem-crystal',
    name: 'Crystal',
    domain: 'chemistry',
    category: 'structure',
    tags: ['lattice', 'solid', 'crystallography', 'mineral', 'geometric'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 20,8 20,16 12,22 4,16 4,8"/>
  <path d="M12 2v20"/>
  <path d="M4 8l16 8"/>
  <path d="M20 8l-16 8"/>
</svg>`,
  },
  {
    id: 'chem-test-tube',
    name: 'Test Tube',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['sample', 'reaction', 'tube', 'holder', 'experiment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 2h6"/>
  <path d="M9 2v13a4 4 0 0 0 6 0V2"/>
  <path d="M9 10h6"/>
  <circle cx="12" cy="17" r="1"/>
</svg>`,
  },
  {
    id: 'chem-distillation',
    name: 'Distillation',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['separation', 'purification', 'boiling', 'condensation', 'fractional'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 18h4v-8l4-6h4l-4 6v8h4"/>
  <circle cx="8" cy="20" r="2"/>
  <path d="M12 4v-2"/>
  <path d="M16 10l4 2v8"/>
  <circle cx="20" cy="22" r="2"/>
</svg>`,
  },
  {
    id: 'chem-funnel',
    name: 'Funnel',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['filtration', 'separation', 'transfer', 'laboratory', 'pouring'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 4h18l-6 8v8l-6-2V12L3 4z"/>
  <path d="M3 4c0 1 4 2 9 2s9-1 9-2"/>
</svg>`,
  },
  {
    id: 'chem-pipette',
    name: 'Pipette',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['dropper', 'measurement', 'transfer', 'precision', 'volumetric'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v6"/>
  <path d="M10 4h4"/>
  <path d="M9 8h6v8l-3 6-3-6V8z"/>
  <path d="M9 12h6"/>
</svg>`,
  },
  {
    id: 'chem-mortar',
    name: 'Mortar and Pestle',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['grinding', 'crushing', 'powder', 'homogenization', 'mixing'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14c0 4 4 6 8 6s8-2 8-6c0-2-1-4-4-5H8c-3 1-4 3-4 5z"/>
  <path d="M4 14c0-1 2-2 4-2h8c2 0 4 1 4 2"/>
  <path d="M15 4l-3 8"/>
  <circle cx="15" cy="3" r="1"/>
</svg>`,
  },
  {
    id: 'chem-bunsen',
    name: 'Bunsen Burner',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['flame', 'heating', 'gas', 'burner', 'heat source'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="14" width="8" height="8" rx="1"/>
  <path d="M10 14v-2h4v2"/>
  <path d="M12 12V8"/>
  <path d="M10 6c0-2 1-4 2-4s2 2 2 4c0 1-1 2-2 2s-2-1-2-2z"/>
  <path d="M6 22h12"/>
</svg>`,
  },
  {
    id: 'chem-ph-meter',
    name: 'pH Meter',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['acidity', 'alkalinity', 'measurement', 'electrode', 'indicator'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="2" width="12" height="8" rx="2"/>
  <path d="M10 4h4"/>
  <path d="M12 10v12"/>
  <ellipse cx="12" cy="20" rx="2" ry="1"/>
  <path d="M8 6h2"/>
  <path d="M14 6h2"/>
</svg>`,
  },
  {
    id: 'chem-balance',
    name: 'Analytical Balance',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['weighing', 'mass', 'precision', 'measurement', 'scale'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3v18"/>
  <path d="M8 21h8"/>
  <path d="M3 8l4 2v4l-4 2"/>
  <path d="M21 8l-4 2v4l4 2"/>
  <path d="M7 10h10"/>
  <circle cx="12" cy="6" r="2"/>
</svg>`,
  },
  {
    id: 'chem-spectrum',
    name: 'Spectrum',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['spectroscopy', 'wavelength', 'absorption', 'emission', 'NMR'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 18h20"/>
  <path d="M2 18V6"/>
  <path d="M4 18v-4"/>
  <path d="M7 18v-8"/>
  <path d="M10 18v-12"/>
  <path d="M13 18v-6"/>
  <path d="M16 18v-10"/>
  <path d="M19 18v-3"/>
</svg>`,
  },
  {
    id: 'chem-catalyst',
    name: 'Catalyst',
    domain: 'chemistry',
    category: 'process',
    tags: ['enzyme', 'accelerate', 'activation energy', 'reaction rate', 'efficiency'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 4v2"/>
  <path d="M12 18v2"/>
  <path d="M4 12h2"/>
  <path d="M18 12h2"/>
  <path d="M8 8l8 8"/>
  <path d="M16 8l-8 8"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
];

export default chemistryIcons;
