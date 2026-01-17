/**
 * biology.ts
 * Biology icon definitions for FINNISH Icon Library
 *
 * Contains icons related to biological sciences, cell biology,
 * molecular biology, and life sciences research.
 */

import type { IconDefinition } from './index';

/**
 * Biology domain icons collection
 */
export const biologyIcons: IconDefinition[] = [
  {
    id: 'bio-cell-membrane',
    name: 'Cell Membrane',
    domain: 'biology',
    category: 'cellular',
    tags: ['phospholipid', 'bilayer', 'plasma membrane', 'permeability', 'transport'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="10" ry="6"/>
  <ellipse cx="12" cy="12" rx="7" ry="4"/>
  <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="8" cy="9" r="1" fill="currentColor"/>
  <circle cx="16" cy="15" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-dna-helix',
    name: 'DNA Helix',
    domain: 'biology',
    category: 'molecular',
    tags: ['double helix', 'genetics', 'nucleotide', 'base pair', 'genome'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 2c0 4 6 6 6 10s-6 6-6 10"/>
  <path d="M18 2c0 4-6 6-6 10s6 6 6 10"/>
  <path d="M7 4h10"/>
  <path d="M7 9h10"/>
  <path d="M7 15h10"/>
  <path d="M7 20h10"/>
</svg>`,
  },
  {
    id: 'bio-chloroplast',
    name: 'Chloroplast',
    domain: 'biology',
    category: 'organelle',
    tags: ['photosynthesis', 'plant cell', 'thylakoid', 'chlorophyll', 'green'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="10" ry="6"/>
  <ellipse cx="12" cy="12" rx="7" ry="3"/>
  <path d="M5 10c2 1 4 1 6 0s4-1 6 0"/>
  <path d="M5 14c2-1 4-1 6 0s4 1 6 0"/>
  <circle cx="8" cy="12" r="1.5"/>
  <circle cx="16" cy="12" r="1.5"/>
</svg>`,
  },
  {
    id: 'bio-mitochondria',
    name: 'Mitochondria',
    domain: 'biology',
    category: 'organelle',
    tags: ['powerhouse', 'ATP', 'energy', 'respiration', 'cristae'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="9" ry="5"/>
  <path d="M5 12c2-3 4-3 7-3s5 0 7 3"/>
  <path d="M6 9c2 2 3 2 5 2"/>
  <path d="M13 9c2 0 3 0 5-2"/>
  <path d="M6 15c2-2 3-2 5-2"/>
  <path d="M13 15c2 0 3 0 5 2"/>
  <path d="M8 12v0"/>
  <path d="M16 12v0"/>
</svg>`,
  },
  {
    id: 'bio-enzyme',
    name: 'Enzyme',
    domain: 'biology',
    category: 'molecular',
    tags: ['catalyst', 'protein', 'substrate', 'active site', 'reaction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3c-4 0-7 3-7 7 0 2 1 4 2 5 1 2 1 4 0 6h10c-1-2-1-4 0-6 1-1 2-3 2-5 0-4-3-7-7-7z"/>
  <path d="M9 21h6"/>
  <path d="M9 10c0 2 1.5 3 3 3s3-1 3-3"/>
  <circle cx="9" cy="8" r="1"/>
  <circle cx="15" cy="8" r="1"/>
</svg>`,
  },
  {
    id: 'bio-neuron',
    name: 'Neuron',
    domain: 'biology',
    category: 'cellular',
    tags: ['nerve cell', 'synapse', 'axon', 'dendrite', 'brain'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="12" r="4"/>
  <path d="M12 12h8"/>
  <path d="M20 12l-2 2"/>
  <path d="M20 12l-2-2"/>
  <path d="M4 8l-2-3"/>
  <path d="M4 10l-3-1"/>
  <path d="M4 14l-3 1"/>
  <path d="M4 16l-2 3"/>
  <circle cx="21" cy="12" r="1.5"/>
  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-protein',
    name: 'Protein',
    domain: 'biology',
    category: 'molecular',
    tags: ['amino acid', 'polypeptide', 'folding', 'structure', 'macromolecule'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12c0-3 2-5 4-5s3 1 4 3c1-2 2-3 4-3s4 2 4 5-2 5-4 5-3-1-4-3c-1 2-2 3-4 3s-4-2-4-5z"/>
  <circle cx="7" cy="12" r="2"/>
  <circle cx="17" cy="12" r="2"/>
  <path d="M9 12h6"/>
</svg>`,
  },
  {
    id: 'bio-rna',
    name: 'RNA',
    domain: 'biology',
    category: 'molecular',
    tags: ['ribonucleic acid', 'transcription', 'mRNA', 'codon', 'ribosome'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 2c0 3 4 4 4 7s-4 4-4 7 4 4 4 6"/>
  <path d="M10 5h8"/>
  <path d="M10 9h6"/>
  <path d="M6 12h8"/>
  <path d="M10 16h6"/>
  <path d="M10 20h4"/>
</svg>`,
  },
  {
    id: 'bio-antibody',
    name: 'Antibody',
    domain: 'biology',
    category: 'immunology',
    tags: ['immunoglobulin', 'immune', 'antigen', 'Y-shaped', 'defense'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22v-8"/>
  <path d="M12 14l-6-6"/>
  <path d="M12 14l6-6"/>
  <circle cx="4" cy="6" r="2"/>
  <circle cx="20" cy="6" r="2"/>
  <path d="M4 8v2"/>
  <path d="M20 8v2"/>
  <circle cx="12" cy="14" r="2"/>
</svg>`,
  },
  {
    id: 'bio-receptor',
    name: 'Receptor',
    domain: 'biology',
    category: 'cellular',
    tags: ['membrane protein', 'signal', 'ligand', 'binding', 'cell surface'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14h16"/>
  <path d="M4 16h16"/>
  <path d="M10 14v-4c0-2 1-3 2-3s2 1 2 3v4"/>
  <circle cx="12" cy="5" r="2"/>
  <path d="M8 16v4"/>
  <path d="M16 16v4"/>
</svg>`,
  },
  {
    id: 'bio-chromosome',
    name: 'Chromosome',
    domain: 'biology',
    category: 'genetics',
    tags: ['DNA', 'chromatin', 'centromere', 'telomere', 'karyotype'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 3c-1 0-2 1-2 2v6c0 1 1 2 2 2"/>
  <path d="M6 13c-1 0-2 1-2 2v4c0 1 1 2 2 2"/>
  <path d="M18 3c1 0 2 1 2 2v6c0 1-1 2-2 2"/>
  <path d="M18 13c1 0 2 1 2 2v4c0 1-1 2-2 2"/>
  <path d="M6 11h12"/>
  <path d="M6 13h12"/>
</svg>`,
  },
  {
    id: 'bio-ribosome',
    name: 'Ribosome',
    domain: 'biology',
    category: 'organelle',
    tags: ['protein synthesis', 'translation', 'rRNA', 'subunit', 'amino acid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="10" rx="6" ry="4"/>
  <ellipse cx="12" cy="15" rx="8" ry="5"/>
  <path d="M4 15c0 0 2-1 4-1"/>
  <path d="M16 14c2 0 4 1 4 1"/>
  <circle cx="10" cy="10" r="1"/>
  <circle cx="14" cy="10" r="1"/>
</svg>`,
  },
  {
    id: 'bio-leaf',
    name: 'Leaf',
    domain: 'biology',
    category: 'botany',
    tags: ['plant', 'photosynthesis', 'vein', 'chlorophyll', 'foliage'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
</svg>`,
  },
  {
    id: 'bio-flower',
    name: 'Flower',
    domain: 'biology',
    category: 'botany',
    tags: ['plant', 'petal', 'pollination', 'reproduction', 'botany'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6"/>
  <path d="M12 16a3 3 0 0 0 0 6 3 3 0 0 0 0-6"/>
  <path d="M2 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0"/>
  <path d="M16 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0"/>
  <path d="M4.93 4.93a3 3 0 0 0 4.24 4.24 3 3 0 0 0-4.24-4.24"/>
  <path d="M14.83 14.83a3 3 0 0 0 4.24 4.24 3 3 0 0 0-4.24-4.24"/>
  <path d="M14.83 9.17a3 3 0 0 0 4.24-4.24 3 3 0 0 0-4.24 4.24"/>
  <path d="M4.93 19.07a3 3 0 0 0 4.24-4.24 3 3 0 0 0-4.24 4.24"/>
</svg>`,
  },
  {
    id: 'bio-tree',
    name: 'Phylogenetic Tree',
    domain: 'biology',
    category: 'evolution',
    tags: ['evolution', 'cladogram', 'taxonomy', 'speciation', 'ancestor'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20h16"/>
  <path d="M12 20v-8"/>
  <path d="M12 12l-6-8"/>
  <path d="M12 12l6-8"/>
  <path d="M6 4l-2-2"/>
  <path d="M6 4l2-2"/>
  <path d="M18 4l-2-2"/>
  <path d="M18 4l2-2"/>
</svg>`,
  },
  {
    id: 'bio-bacteria',
    name: 'Bacteria',
    domain: 'biology',
    category: 'microbiology',
    tags: ['prokaryote', 'microbe', 'flagella', 'colony', 'culture'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="6" ry="4"/>
  <path d="M6 12c-2 0-3-1-3-2"/>
  <path d="M18 12c2 0 3-1 3-2"/>
  <path d="M6 12c-2 0-3 1-3 2"/>
  <path d="M18 12c2 0 3 1 3 2"/>
  <path d="M9 8c-1-2-1-4 0-5"/>
  <path d="M15 8c1-2 1-4 0-5"/>
  <path d="M9 16c-1 2-1 4 0 5"/>
  <path d="M15 16c1 2 1 4 0 5"/>
  <circle cx="10" cy="11" r="0.5" fill="currentColor"/>
  <circle cx="14" cy="13" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-amoeba',
    name: 'Amoeba',
    domain: 'biology',
    category: 'microbiology',
    tags: ['protozoa', 'pseudopod', 'unicellular', 'eukaryote', 'protist'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12c0-2 1-3 2-4s3-2 4-1 2 2 3 2 2-1 3 0 2 2 3 3 1 3 1 4-1 2-2 3-3 1-4 1-2-1-3-1-2 1-3 0-2-2-2-3-1-3-2-4z"/>
  <circle cx="10" cy="11" r="2"/>
  <circle cx="15" cy="13" r="1"/>
</svg>`,
  },
  {
    id: 'bio-ecosystem',
    name: 'Ecosystem',
    domain: 'biology',
    category: 'ecology',
    tags: ['environment', 'food web', 'habitat', 'biodiversity', 'nature'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <path d="M12 2a7 7 0 0 0 0 14"/>
  <path d="M12 16c-2 0-4 2-4 4"/>
  <path d="M12 16c2 0 4 2 4 4"/>
  <path d="M8 8c1-1 2-1 3 0"/>
  <path d="M13 8c1-1 2-1 3 0"/>
  <circle cx="6" cy="12" r="1"/>
  <circle cx="18" cy="12" r="1"/>
</svg>`,
  },
  {
    id: 'bio-petri-dish',
    name: 'Petri Dish',
    domain: 'biology',
    category: 'laboratory',
    tags: ['culture', 'agar', 'colony', 'microbiology', 'experiment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="14" rx="10" ry="5"/>
  <ellipse cx="12" cy="12" rx="10" ry="5"/>
  <circle cx="8" cy="12" r="1.5"/>
  <circle cx="14" cy="11" r="1"/>
  <circle cx="11" cy="14" r="1"/>
  <circle cx="16" cy="13" r="0.5"/>
</svg>`,
  },
  {
    id: 'bio-pipette',
    name: 'Pipette',
    domain: 'biology',
    category: 'laboratory',
    tags: ['micropipette', 'transfer', 'measurement', 'liquid', 'precision'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 2h4v4l-1 1v8l1 1v4c0 1-1 2-2 2s-2-1-2-2v-4l1-1V7l-1-1V2z"/>
  <path d="M10 6h4"/>
  <path d="M10 15h4"/>
  <circle cx="12" cy="18" r="1"/>
</svg>`,
  },
];

export default biologyIcons;
