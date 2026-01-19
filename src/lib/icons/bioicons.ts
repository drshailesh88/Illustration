/**
 * Bioicons Integration Module
 *
 * High-quality scientific icons for biological and life science illustrations.
 * These icons are designed for scientific diagrams and presentations.
 * Based on Bioicons (bioicons.com) - CC0/MIT/CC-BY licensed.
 *
 * Categories:
 * - Cell Biology: Cells, organelles, membranes
 * - Molecular Biology: DNA, RNA, proteins, enzymes
 * - Microbiology: Bacteria, viruses, fungi
 * - Biochemistry: Pathways, molecules, reactions
 * - Laboratory: Equipment, techniques
 * - Anatomy: Organs, tissues, systems
 *
 * @see https://bioicons.com/
 */

/**
 * Bioicon metadata for search and categorization
 */
export interface BioiconMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svg: string;
  viewBox: string;
  license: 'CC0' | 'MIT' | 'CC-BY';
}

/**
 * SVG viewBox for all bioicons (24x24 standard)
 */
const VIEWBOX = '0 0 24 24';

/**
 * Cell Biology Icons
 */
const cellBiologyIcons: BioiconMeta[] = [
  {
    id: 'cell-membrane',
    name: 'Cell Membrane',
    category: 'cell-biology',
    keywords: ['membrane', 'phospholipid', 'bilayer', 'plasma membrane', 'cell'],
    svg: '<path d="M2 12c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2zm6 0c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2zm6 0c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="10" r="1" fill="currentColor"/><circle cx="11" cy="10" r="1" fill="currentColor"/><circle cx="17" cy="10" r="1" fill="currentColor"/><circle cx="5" cy="14" r="1" fill="currentColor"/><circle cx="11" cy="14" r="1" fill="currentColor"/><circle cx="17" cy="14" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'animal-cell',
    name: 'Animal Cell',
    category: 'cell-biology',
    keywords: ['eukaryote', 'cell', 'animal', 'nucleus', 'organelles'],
    svg: '<ellipse cx="12" cy="12" rx="10" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/><ellipse cx="6" cy="10" rx="1.5" ry="1" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="18" cy="10" rx="1.5" ry="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M7 15c1-1 2-1 3 0" stroke="currentColor" stroke-width="1" fill="none"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'plant-cell',
    name: 'Plant Cell',
    category: 'cell-biology',
    keywords: ['eukaryote', 'cell', 'plant', 'chloroplast', 'vacuole', 'cell wall'],
    svg: '<rect x="2" y="4" width="20" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><ellipse cx="12" cy="12" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="7" cy="9" rx="1.5" ry="1" fill="currentColor" opacity="0.6"/><ellipse cx="17" cy="9" rx="1.5" ry="1" fill="currentColor" opacity="0.6"/><ellipse cx="7" cy="15" rx="1.5" ry="1" fill="currentColor" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'nucleus',
    name: 'Nucleus',
    category: 'cell-biology',
    keywords: ['nucleus', 'nucleolus', 'nuclear envelope', 'chromatin', 'DNA'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/><circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    category: 'cell-biology',
    keywords: ['mitochondria', 'powerhouse', 'ATP', 'energy', 'organelle', 'cristae'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 12c0-2 2-3 3-3s2 1 2 3-1 3-2 3-3-1-3-3zm6 0c0-2 1-3 2-3s2 1 2 3-1 3-2 3-2-1-2-3zm5 0c0-2 1-3 2-3s2 1 2 3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'chloroplast',
    name: 'Chloroplast',
    category: 'cell-biology',
    keywords: ['chloroplast', 'photosynthesis', 'thylakoid', 'grana', 'plant'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="7" cy="12" rx="2" ry="3" fill="currentColor" opacity="0.3"/><ellipse cx="12" cy="12" rx="2" ry="3" fill="currentColor" opacity="0.3"/><ellipse cx="17" cy="12" rx="2" ry="3" fill="currentColor" opacity="0.3"/><line x1="5" y1="10" x2="5" y2="14" stroke="currentColor" stroke-width="0.5"/><line x1="19" y1="10" x2="19" y2="14" stroke="currentColor" stroke-width="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'endoplasmic-reticulum',
    name: 'Endoplasmic Reticulum',
    category: 'cell-biology',
    keywords: ['ER', 'rough ER', 'smooth ER', 'ribosomes', 'protein synthesis'],
    svg: '<path d="M4 8c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 16c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="8" r="0.7" fill="currentColor"/><circle cx="9" cy="8" r="0.7" fill="currentColor"/><circle cx="13" cy="8" r="0.7" fill="currentColor"/><circle cx="5" cy="12" r="0.7" fill="currentColor"/><circle cx="13" cy="12" r="0.7" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'golgi-apparatus',
    name: 'Golgi Apparatus',
    category: 'cell-biology',
    keywords: ['golgi', 'golgi body', 'cisternae', 'vesicles', 'protein modification'],
    svg: '<path d="M4 7c4 1 12 1 16 0" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 10c3 1 10 1 14 0" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 13c3 1 8 1 12 0" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 16c2 1 6 1 10 0" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="9" r="1" fill="currentColor"/><circle cx="18" cy="14" r="1" fill="currentColor"/><circle cx="5" cy="14" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'ribosome',
    name: 'Ribosome',
    category: 'cell-biology',
    keywords: ['ribosome', 'protein synthesis', 'translation', 'RNA', 'subunit'],
    svg: '<ellipse cx="12" cy="10" rx="6" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="15" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10l-2 2" stroke="currentColor" stroke-width="1"/><path d="M18 10l2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lysosome',
    name: 'Lysosome',
    category: 'cell-biology',
    keywords: ['lysosome', 'digestion', 'enzyme', 'vesicle', 'autophagy'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="10" r="1" fill="currentColor"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="13" cy="13" r="1.5" fill="currentColor"/><circle cx="15" cy="15" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'vesicle',
    name: 'Vesicle',
    category: 'cell-biology',
    keywords: ['vesicle', 'transport', 'exocytosis', 'endocytosis', 'membrane'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'cytoskeleton',
    name: 'Cytoskeleton',
    category: 'cell-biology',
    keywords: ['cytoskeleton', 'microtubules', 'actin', 'filaments', 'structure'],
    svg: '<line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'centriole',
    name: 'Centriole',
    category: 'cell-biology',
    keywords: ['centriole', 'centrosome', 'cell division', 'microtubules', 'spindle'],
    svg: '<rect x="8" y="4" width="8" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" stroke-width="1"/><line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="1"/><line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1"/><line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'peroxisome',
    name: 'Peroxisome',
    category: 'cell-biology',
    keywords: ['peroxisome', 'oxidation', 'catalase', 'detoxification', 'organelle'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Molecular Biology Icons
 */
const molecularBiologyIcons: BioiconMeta[] = [
  {
    id: 'dna-helix',
    name: 'DNA Helix',
    category: 'molecular-biology',
    keywords: ['DNA', 'double helix', 'genetics', 'nucleotide', 'gene'],
    svg: '<path d="M6 2c0 4 4 5 6 5s6-1 6-5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 9c0 4 4 5 6 5s6-1 6-5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 16c0 4 4 5 6 5s6-1 6-5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="4" x2="16" y2="4" stroke="currentColor" stroke-width="1"/><line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="1"/><line x1="8" y1="18" x2="16" y2="18" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'rna-strand',
    name: 'RNA Strand',
    category: 'molecular-biology',
    keywords: ['RNA', 'mRNA', 'tRNA', 'rRNA', 'transcription', 'single strand'],
    svg: '<path d="M4 4c2 2 4 0 6 2s4 0 6 2 2 4 4 4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="4" r="1.5" fill="currentColor"/><circle cx="10" cy="6" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><path d="M4 14c2 2 4 0 6 2s4 0 6 2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="14" r="1.5" fill="currentColor"/><circle cx="10" cy="16" r="1.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'protein-structure',
    name: 'Protein Structure',
    category: 'molecular-biology',
    keywords: ['protein', 'amino acid', 'folding', 'tertiary', 'structure'],
    svg: '<path d="M4 12c0-4 3-6 6-6s4 2 4 4-2 4-4 6 2 4 6 4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.5"/><circle cx="10" cy="6" r="2" fill="currentColor" opacity="0.5"/><circle cx="14" cy="10" r="2" fill="currentColor" opacity="0.5"/><circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'enzyme',
    name: 'Enzyme',
    category: 'molecular-biology',
    keywords: ['enzyme', 'catalyst', 'active site', 'substrate', 'reaction'],
    svg: '<path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10c0-2 2-4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="12" r="3" fill="currentColor" opacity="0.3"/><path d="M18 8l3-3M18 16l3 3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'amino-acid',
    name: 'Amino Acid',
    category: 'molecular-biology',
    keywords: ['amino acid', 'protein', 'peptide', 'residue', 'R group'],
    svg: '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="8" x2="12" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="1.5"/><text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">R</text><text x="12" y="3" text-anchor="middle" font-size="3" fill="currentColor">NH2</text><text x="12" y="22" text-anchor="middle" font-size="3" fill="currentColor">COOH</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'nucleotide',
    name: 'Nucleotide',
    category: 'molecular-biology',
    keywords: ['nucleotide', 'base', 'sugar', 'phosphate', 'DNA', 'RNA'],
    svg: '<polygon points="12,4 16,8 16,14 12,18 8,14 8,8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="12" y2="18" stroke="currentColor" stroke-width="1.5"/><circle cx="4" cy="20" r="1.5" fill="currentColor"/><line x1="6" y1="20" x2="10" y2="20" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'codon',
    name: 'Codon',
    category: 'molecular-biology',
    keywords: ['codon', 'triplet', 'genetic code', 'translation', 'mRNA'],
    svg: '<rect x="3" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9.5" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="5.5" y="13" text-anchor="middle" font-size="4" fill="currentColor">A</text><text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">U</text><text x="18.5" y="13" text-anchor="middle" font-size="4" fill="currentColor">G</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'gene',
    name: 'Gene',
    category: 'molecular-biology',
    keywords: ['gene', 'exon', 'intron', 'promoter', 'coding sequence'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><rect x="10" y="10" width="3" height="4" fill="currentColor" opacity="0.5"/><rect x="16" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><path d="M2 10L4 6M22 10L20 6" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'promoter',
    name: 'Promoter',
    category: 'molecular-biology',
    keywords: ['promoter', 'transcription', 'TATA box', 'gene expression', 'regulation'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="8,6 14,6 11,10" fill="currentColor"/><path d="M11 6V3" stroke="currentColor" stroke-width="1.5"/><circle cx="11" cy="2" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'plasmid',
    name: 'Plasmid',
    category: 'molecular-biology',
    keywords: ['plasmid', 'vector', 'cloning', 'circular DNA', 'bacteria'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="12" r="1" fill="currentColor"/><circle cx="17" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'chromosome',
    name: 'Chromosome',
    category: 'molecular-biology',
    keywords: ['chromosome', 'chromatin', 'centromere', 'sister chromatids', 'karyotype'],
    svg: '<path d="M8 4c-2 0-3 2-3 4s1 3 3 3h0c2 0 3 2 3 4s-1 5-3 5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 4c2 0 3 2 3 4s-1 3-3 3h0c-2 0-3 2-3 4s1 5 3 5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'helicase',
    name: 'Helicase',
    category: 'molecular-biology',
    keywords: ['helicase', 'DNA replication', 'unwinding', 'enzyme', 'replication fork'],
    svg: '<path d="M4 8c4 0 4 4 8 4s4-4 8-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 16c4 0 4-4 8-4s4 4 8 4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10l4 4M14 10l-4 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Microbiology Icons
 */
const microbiologyIcons: BioiconMeta[] = [
  {
    id: 'bacterium',
    name: 'Bacterium',
    category: 'microbiology',
    keywords: ['bacteria', 'prokaryote', 'microbe', 'rod', 'bacillus'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="6" ry="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="8" cy="12" r="1" fill="currentColor"/><line x1="4" y1="8" x2="2" y2="5" stroke="currentColor" stroke-width="1"/><line x1="4" y1="16" x2="2" y2="19" stroke="currentColor" stroke-width="1"/><line x1="20" y1="8" x2="22" y2="5" stroke="currentColor" stroke-width="1"/><line x1="20" y1="16" x2="22" y2="19" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'coccus',
    name: 'Coccus',
    category: 'microbiology',
    keywords: ['coccus', 'bacteria', 'spherical', 'staphylococcus', 'streptococcus'],
    svg: '<circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'spirillum',
    name: 'Spirillum',
    category: 'microbiology',
    keywords: ['spirillum', 'bacteria', 'spiral', 'helical', 'spirochete'],
    svg: '<path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="2" cy="12" r="1" fill="currentColor"/><circle cx="22" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'virus-particle',
    name: 'Virus Particle',
    category: 'microbiology',
    keywords: ['virus', 'virion', 'pathogen', 'infection', 'capsid'],
    svg: '<polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" stroke-width="1"/><line x1="22" y1="8" x2="19" y2="9" stroke="currentColor" stroke-width="1"/><line x1="22" y1="16" x2="19" y2="15" stroke="currentColor" stroke-width="1"/><line x1="12" y1="22" x2="12" y2="19" stroke="currentColor" stroke-width="1"/><line x1="2" y1="16" x2="5" y2="15" stroke="currentColor" stroke-width="1"/><line x1="2" y1="8" x2="5" y2="9" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'bacteriophage',
    name: 'Bacteriophage',
    category: 'microbiology',
    keywords: ['phage', 'bacteriophage', 'virus', 'T4', 'bacteria eater'],
    svg: '<polygon points="12,2 18,8 12,10 6,8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" stroke-width="2"/><path d="M8 16l-4 6M12 16v6M16 16l4 6" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="13" x2="5" y2="15" stroke="currentColor" stroke-width="1"/><line x1="15" y1="13" x2="19" y2="15" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'coronavirus',
    name: 'Coronavirus',
    category: 'microbiology',
    keywords: ['coronavirus', 'covid', 'SARS', 'spike protein', 'pandemic'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="2" r="1.5" fill="currentColor"/><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="22" r="1.5" fill="currentColor"/><line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="2" cy="12" r="1.5" fill="currentColor"/><line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="22" cy="12" r="1.5" fill="currentColor"/><line x1="5" y1="5" x2="8" y2="8" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="4.5" r="1.5" fill="currentColor"/><line x1="19" y1="5" x2="16" y2="8" stroke="currentColor" stroke-width="1.5"/><circle cx="19.5" cy="4.5" r="1.5" fill="currentColor"/><line x1="5" y1="19" x2="8" y2="16" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="19.5" r="1.5" fill="currentColor"/><line x1="19" y1="19" x2="16" y2="16" stroke="currentColor" stroke-width="1.5"/><circle cx="19.5" cy="19.5" r="1.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'yeast',
    name: 'Yeast',
    category: 'microbiology',
    keywords: ['yeast', 'fungus', 'saccharomyces', 'budding', 'fermentation'],
    svg: '<ellipse cx="10" cy="12" rx="6" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="17" cy="8" rx="4" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="17" cy="7" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'fungal-hyphae',
    name: 'Fungal Hyphae',
    category: 'microbiology',
    keywords: ['hyphae', 'fungus', 'mycelium', 'mold', 'filamentous'],
    svg: '<path d="M2 20c4-4 6-8 10-8s6 4 10 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 12c2-4 4-6 6-8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12c2 2 4 4 8 2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="4" r="1" fill="currentColor"/><circle cx="20" cy="14" r="1" fill="currentColor"/><circle cx="22" cy="16" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'amoeba',
    name: 'Amoeba',
    category: 'microbiology',
    keywords: ['amoeba', 'protozoa', 'pseudopod', 'protist', 'unicellular'],
    svg: '<path d="M4 12c0-2 1-4 3-5s4 0 5-2 3-1 5 1 3 4 3 6-1 4-3 5-4 0-5 2-3 1-5-1-3-4-3-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="14" r="1" fill="currentColor" opacity="0.5"/><circle cx="8" cy="14" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'paramecium',
    name: 'Paramecium',
    category: 'microbiology',
    keywords: ['paramecium', 'protozoa', 'cilia', 'protist', 'unicellular'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 9c1 0.5 1 1 1 1.5M3 15c1-0.5 1-1 1-1.5M21 9c-1 0.5-1 1-1 1.5M21 15c-1-0.5-1-1-1-1.5" stroke="currentColor" stroke-width="0.5"/><ellipse cx="8" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M14 10c2 0 3 1 4 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Biochemistry Icons
 */
const biochemistryIcons: BioiconMeta[] = [
  {
    id: 'atp-molecule',
    name: 'ATP Molecule',
    category: 'biochemistry',
    keywords: ['ATP', 'energy', 'adenosine triphosphate', 'metabolism', 'phosphate'],
    svg: '<polygon points="12,4 16,8 16,12 12,16 8,12 8,8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="16" x2="12" y2="16" stroke="currentColor" stroke-width="1"/><line x1="10" y1="18" x2="8" y2="20" stroke="currentColor" stroke-width="1"/><line x1="14" y1="18" x2="16" y2="20" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'glucose',
    name: 'Glucose',
    category: 'biochemistry',
    keywords: ['glucose', 'sugar', 'carbohydrate', 'metabolism', 'glycolysis'],
    svg: '<polygon points="12,4 18,8 18,16 12,20 6,16 6,8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="3" y2="6" stroke="currentColor" stroke-width="1"/><line x1="18" y1="8" x2="21" y2="6" stroke="currentColor" stroke-width="1"/><line x1="6" y1="16" x2="3" y2="18" stroke="currentColor" stroke-width="1"/><circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="21" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lipid-bilayer',
    name: 'Lipid Bilayer',
    category: 'biochemistry',
    keywords: ['lipid', 'membrane', 'phospholipid', 'bilayer', 'hydrophobic'],
    svg: '<circle cx="4" cy="6" r="2" fill="currentColor"/><line x1="4" y1="8" x2="4" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6" r="2" fill="currentColor"/><line x1="10" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="6" r="2" fill="currentColor"/><line x1="16" y1="8" x2="16" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="18" r="2" fill="currentColor"/><line x1="7" y1="16" x2="7" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="18" r="2" fill="currentColor"/><line x1="13" y1="16" x2="13" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="18" r="2" fill="currentColor"/><line x1="19" y1="16" x2="19" y2="12" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'enzyme-substrate',
    name: 'Enzyme Substrate Complex',
    category: 'biochemistry',
    keywords: ['enzyme', 'substrate', 'active site', 'lock and key', 'catalysis'],
    svg: '<path d="M4 8c0-2 2-4 6-4s6 2 6 4v8c0 2-2 4-6 4s-6-2-6-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8v4h0c2 0 4 1 4 2v2" fill="none" stroke="currentColor" stroke-width="1"/><rect x="16" y="8" width="6" height="4" rx="1" fill="currentColor" opacity="0.5"/><path d="M16 10h-2" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'metabolic-pathway',
    name: 'Metabolic Pathway',
    category: 'biochemistry',
    keywords: ['metabolism', 'pathway', 'reaction', 'cycle', 'biochemistry'],
    svg: '<circle cx="4" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 11l4-4M14 8l4 3M18 13l-4 4M10 17l-4-4" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow)"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'krebs-cycle',
    name: 'Krebs Cycle',
    category: 'biochemistry',
    keywords: ['krebs', 'citric acid', 'TCA', 'cycle', 'respiration'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="1.5" fill="currentColor"/><circle cx="19" cy="9" r="1.5" fill="currentColor"/><circle cx="19" cy="15" r="1.5" fill="currentColor"/><circle cx="12" cy="20" r="1.5" fill="currentColor"/><circle cx="5" cy="15" r="1.5" fill="currentColor"/><circle cx="5" cy="9" r="1.5" fill="currentColor"/><path d="M11 5l2 0M17 8l1 1M18 14l-1 1M13 19l-2 0M6 14l-1-1M6 10l1-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'glycolysis',
    name: 'Glycolysis',
    category: 'biochemistry',
    keywords: ['glycolysis', 'glucose', 'pyruvate', 'metabolism', 'energy'],
    svg: '<polygon points="12,2 16,6 14,6 14,10 10,10 10,6 8,6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" stroke-width="1.5"/><polygon points="10,14 14,14 13,18 11,18" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="18" x2="9" y2="22" stroke="currentColor" stroke-width="1.5"/><line x1="13" y1="18" x2="15" y2="22" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="22" r="1" fill="currentColor"/><circle cx="15" cy="22" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'electron-transport',
    name: 'Electron Transport Chain',
    category: 'biochemistry',
    keywords: ['electron transport', 'ETC', 'oxidative phosphorylation', 'ATP', 'mitochondria'],
    svg: '<rect x="2" y="8" width="4" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="6" width="4" height="12" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="8" width="4" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="20" y="4" width="2" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10l2-2M12 8l2 2M18 10l2-4" stroke="currentColor" stroke-width="1"/><circle cx="7" cy="9" r="0.5" fill="currentColor"/><circle cx="13" cy="9" r="0.5" fill="currentColor"/><circle cx="19" cy="7" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'water-molecule',
    name: 'Water Molecule',
    category: 'biochemistry',
    keywords: ['water', 'H2O', 'molecule', 'polar', 'solvent'],
    svg: '<circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="13" x2="7" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="13" x2="17" y2="14" stroke="currentColor" stroke-width="1.5"/><text x="12" y="11" text-anchor="middle" font-size="3" fill="currentColor">O</text><text x="6" y="17" text-anchor="middle" font-size="3" fill="currentColor">H</text><text x="18" y="17" text-anchor="middle" font-size="3" fill="currentColor">H</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'carbon-dioxide',
    name: 'Carbon Dioxide',
    category: 'biochemistry',
    keywords: ['CO2', 'carbon dioxide', 'respiration', 'photosynthesis', 'gas'],
    svg: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="12" x2="7" y2="12" stroke="currentColor" stroke-width="2"/><line x1="15" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="2"/><text x="12" y="13" text-anchor="middle" font-size="3" fill="currentColor">C</text><text x="5" y="13" text-anchor="middle" font-size="2.5" fill="currentColor">O</text><text x="19" y="13" text-anchor="middle" font-size="2.5" fill="currentColor">O</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Laboratory Equipment Icons
 */
const laboratoryIcons: BioiconMeta[] = [
  {
    id: 'test-tube',
    name: 'Test Tube',
    category: 'laboratory',
    keywords: ['test tube', 'tube', 'experiment', 'sample', 'chemistry'],
    svg: '<path d="M8 2h8v2H8zM9 4v14c0 2 1.5 4 3 4s3-2 3-4V4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 14c1.5 0 3 1 4.5 1s2.5-1 2.5-1" fill="currentColor" opacity="0.3"/><line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'erlenmeyer-flask',
    name: 'Erlenmeyer Flask',
    category: 'laboratory',
    keywords: ['flask', 'erlenmeyer', 'conical', 'chemistry', 'experiment'],
    svg: '<path d="M10 2h4v6l6 12H4l6-12V2z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="2" x2="15" y2="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 16c2 0 4 1 6 1s4-1 6-1" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'beaker',
    name: 'Beaker',
    category: 'laboratory',
    keywords: ['beaker', 'container', 'chemistry', 'lab', 'glassware'],
    svg: '<path d="M4 4h16v14c0 2-2 4-4 4H8c-2 0-4-2-4-4V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4h4l-2-2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="8" y2="8" stroke="currentColor" stroke-width="1"/><line x1="6" y1="12" x2="8" y2="12" stroke="currentColor" stroke-width="1"/><line x1="6" y1="16" x2="8" y2="16" stroke="currentColor" stroke-width="1"/><path d="M4 14c4 0 8 2 12 2s4-2 4-2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pipette',
    name: 'Pipette',
    category: 'laboratory',
    keywords: ['pipette', 'transfer', 'precision', 'liquid', 'measure'],
    svg: '<path d="M12 2c1 0 2 1 2 2v4l2 2v8l-2 4h-4l-2-4v-8l2-2V4c0-1 1-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" stroke-width="1"/><line x1="10" y1="13" x2="14" y2="13" stroke="currentColor" stroke-width="1"/><line x1="10" y1="16" x2="14" y2="16" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'petri-dish',
    name: 'Petri Dish',
    category: 'laboratory',
    keywords: ['petri dish', 'culture', 'bacteria', 'agar', 'microbiology'],
    svg: '<ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="14" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.5"/><circle cx="14" cy="11" r="1.5" fill="currentColor" opacity="0.5"/><circle cx="11" cy="13" r="0.8" fill="currentColor" opacity="0.5"/><circle cx="16" cy="13" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'microscope-slide',
    name: 'Microscope Slide',
    category: 'laboratory',
    keywords: ['slide', 'microscope', 'specimen', 'sample', 'histology'],
    svg: '<rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="9" width="8" height="6" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'centrifuge-tube',
    name: 'Centrifuge Tube',
    category: 'laboratory',
    keywords: ['centrifuge', 'tube', 'eppendorf', 'microcentrifuge', 'sample'],
    svg: '<path d="M8 2h8l-1 2H9l-1-2zM9 4h6v8l-3 10-3-10V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8h6" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="14" rx="2" ry="1" fill="currentColor" opacity="0.4"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'gel-electrophoresis',
    name: 'Gel Electrophoresis',
    category: 'laboratory',
    keywords: ['electrophoresis', 'gel', 'DNA', 'bands', 'separation'],
    svg: '<rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="7" width="2" height="1" fill="currentColor"/><rect x="6" y="10" width="2" height="1" fill="currentColor"/><rect x="6" y="14" width="2" height="1" fill="currentColor"/><rect x="11" y="7" width="2" height="1" fill="currentColor"/><rect x="11" y="11" width="2" height="1" fill="currentColor"/><rect x="11" y="16" width="2" height="1" fill="currentColor"/><rect x="16" y="7" width="2" height="1" fill="currentColor"/><rect x="16" y="9" width="2" height="1" fill="currentColor"/><rect x="16" y="12" width="2" height="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pcr-tube',
    name: 'PCR Tube',
    category: 'laboratory',
    keywords: ['PCR', 'tube', 'thermocycler', 'amplification', 'DNA'],
    svg: '<path d="M8 4h8c1 0 2 1 2 2H6c0-1 1-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 6h10v4l-2 10H9L7 10V6z" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="3" ry="1" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'well-plate',
    name: '96-Well Plate',
    category: 'laboratory',
    keywords: ['well plate', 'microplate', '96 well', 'assay', 'screening'],
    svg: '<rect x="2" y="6" width="20" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="8" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="11" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="14" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="17" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="20" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="5" cy="12" r="1" fill="currentColor" opacity="0.4"/><circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.4"/><circle cx="11" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="14" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="17" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="20" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="5" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="8" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="11" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="14" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="17" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="20" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'bunsen-burner',
    name: 'Bunsen Burner',
    category: 'laboratory',
    keywords: ['bunsen', 'burner', 'flame', 'heat', 'chemistry'],
    svg: '<rect x="8" y="14" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 14V10c0-1 1-2 2-2s2 1 2 2v4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2c-2 2-2 4 0 6 2-2 2-4 0-6z" fill="currentColor" opacity="0.6"/><line x1="8" y1="18" x2="6" y2="20" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lab-coat',
    name: 'Lab Coat',
    category: 'laboratory',
    keywords: ['lab coat', 'PPE', 'scientist', 'safety', 'clothing'],
    svg: '<path d="M8 4c0-1 2-2 4-2s4 1 4 2l2 6v10H6V10l2-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4l-4 4v6h4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 4l4 4v6h-4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="6" x2="12" y2="20" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="10" r="0.8" fill="currentColor"/><circle cx="10" cy="13" r="0.8" fill="currentColor"/><circle cx="14" cy="10" r="0.8" fill="currentColor"/><circle cx="14" cy="13" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Anatomy Icons
 */
const anatomyIcons: BioiconMeta[] = [
  {
    id: 'brain-anatomy',
    name: 'Brain',
    category: 'anatomy',
    keywords: ['brain', 'neurology', 'nervous system', 'cerebrum', 'cortex'],
    svg: '<path d="M12 4c-4 0-7 3-7 6 0 2 1 3 2 4-1 1-1 2-1 3 0 2 2 4 4 4h4c2 0 4-2 4-4 0-1 0-2-1-3 1-1 2-2 2-4 0-3-3-6-7-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8c1-1 3-1 4 0M12 8c1-1 3-1 4 0" stroke="currentColor" stroke-width="1"/><path d="M7 12c2 0 3 1 5 1s3-1 5-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'heart-anatomy',
    name: 'Heart',
    category: 'anatomy',
    keywords: ['heart', 'cardiac', 'cardiovascular', 'organ', 'circulation'],
    svg: '<path d="M12 6c-1-2-3-4-5-4s-4 2-4 5c0 4 5 8 9 11 4-3 9-7 9-11 0-3-2-5-4-5s-4 2-5 4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v4M10 8h4" stroke="currentColor" stroke-width="1"/><path d="M8 14c2 1 4 1 6 0" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lungs-anatomy',
    name: 'Lungs',
    category: 'anatomy',
    keywords: ['lungs', 'pulmonary', 'respiratory', 'breathing', 'alveoli'],
    svg: '<path d="M12 4v8" stroke="currentColor" stroke-width="1.5"/><path d="M12 6c-4 0-6 4-6 8s2 6 4 6c1 0 2-1 2-2v-6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6c4 0 6 4 6 8s-2 6-4 6c-1 0-2-1-2-2v-6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10c-1 0-2 1-2 2M16 10c1 0 2 1 2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'liver-anatomy',
    name: 'Liver',
    category: 'anatomy',
    keywords: ['liver', 'hepatic', 'organ', 'digestive', 'metabolism'],
    svg: '<path d="M4 10c0-2 2-4 4-4h8c3 0 5 2 5 5 0 4-3 7-8 7H8c-3 0-4-2-4-4v-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v12" stroke="currentColor" stroke-width="1"/><path d="M8 10c0 2 2 4 4 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'kidney-anatomy',
    name: 'Kidney',
    category: 'anatomy',
    keywords: ['kidney', 'renal', 'nephron', 'urinary', 'organ'],
    svg: '<path d="M12 4c-4 0-6 4-6 8s2 8 6 8 6-4 6-8-2-8-6-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4c-2 2-2 6 0 8s2 6 0 8" fill="none" stroke="currentColor" stroke-width="1"/><path d="M9 12h6" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'stomach-anatomy',
    name: 'Stomach',
    category: 'anatomy',
    keywords: ['stomach', 'gastric', 'digestive', 'GI', 'organ'],
    svg: '<path d="M8 6c-3 0-5 3-5 6s2 6 5 6h6c2 0 4-2 5-5 1-3 0-6-3-7H8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 6v0c0-2 2-4 4-4" stroke="currentColor" stroke-width="1.5"/><path d="M19 11c-1 0-2 1-2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'intestine-anatomy',
    name: 'Intestines',
    category: 'anatomy',
    keywords: ['intestine', 'bowel', 'colon', 'GI tract', 'digestive'],
    svg: '<path d="M6 4c2 0 4 2 4 2s-2 2-2 4 2 4 4 4-2 2-2 4 2 4 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4c2 0 4 2 4 2s-2 2-2 4 2 4 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 10c0 2-2 4-2 4s2 2 2 4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'bone-anatomy',
    name: 'Bone',
    category: 'anatomy',
    keywords: ['bone', 'skeletal', 'femur', 'orthopedic', 'skeleton'],
    svg: '<path d="M8 4c-2 0-3 1-3 2s1 2 2 2c-1 0-2 1-2 2v6c0 1 1 2 2 2-1 0-2 1-2 2s1 2 3 2h0c2 0 3-1 3-2s-1-2-2-2c1 0 2-1 2-2v-6c0-1-1-2-2-2 1 0 2-1 2-2s-1-2-3-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 4c2 0 3 1 3 2s-1 2-2 2c1 0 2 1 2 2v6c0 1-1 2-2 2 1 0 2 1 2 2s-1 2-3 2h0c-2 0-3-1-3-2s1-2 2-2c-1 0-2-1-2-2v-6c0-1 1-2 2-2-1 0-2-1-2-2s1-2 3-2z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'muscle-anatomy',
    name: 'Muscle',
    category: 'anatomy',
    keywords: ['muscle', 'skeletal muscle', 'fiber', 'myocyte', 'muscular'],
    svg: '<path d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" stroke-width="2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'neuron',
    name: 'Neuron',
    category: 'anatomy',
    keywords: ['neuron', 'nerve cell', 'axon', 'dendrite', 'synapse'],
    svg: '<circle cx="8" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12h8" stroke="currentColor" stroke-width="1.5"/><path d="M18 12l2 2M18 12l2-2M20 14v-4" stroke="currentColor" stroke-width="1"/><path d="M4 8l-2-2M4 8l-2 2M4 16l-2 2M4 16l-2-2M6 8l-3-4M10 8l3-4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'eye-anatomy',
    name: 'Eye',
    category: 'anatomy',
    keywords: ['eye', 'vision', 'retina', 'optic', 'ophthalmology'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M3 12c0-3 4-6 9-6s9 3 9 6" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'skin-layers',
    name: 'Skin Layers',
    category: 'anatomy',
    keywords: ['skin', 'epidermis', 'dermis', 'integumentary', 'tissue'],
    svg: '<path d="M2 6h20" stroke="currentColor" stroke-width="1.5"/><path d="M2 10c2 1 4 0 6 1s4 0 6 1 4 0 6 1" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c2 1 4 0 6 1s4 0 6 1 4 0 6 1" stroke="currentColor" stroke-width="1.5"/><path d="M2 18h20" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="8" r="0.5" fill="currentColor"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/><circle cx="18" cy="8" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Combined bioicons list
 */
export const bioiconsList: BioiconMeta[] = [
  ...cellBiologyIcons,
  ...molecularBiologyIcons,
  ...microbiologyIcons,
  ...biochemistryIcons,
  ...laboratoryIcons,
  ...anatomyIcons,
];

/**
 * Bioicon categories
 */
export const bioiconCategories = {
  'cell-biology': {
    name: 'Cell Biology',
    description: 'Cells, organelles, and cellular structures',
    count: cellBiologyIcons.length,
  },
  'molecular-biology': {
    name: 'Molecular Biology',
    description: 'DNA, RNA, proteins, and genetic elements',
    count: molecularBiologyIcons.length,
  },
  'microbiology': {
    name: 'Microbiology',
    description: 'Bacteria, viruses, fungi, and microorganisms',
    count: microbiologyIcons.length,
  },
  'biochemistry': {
    name: 'Biochemistry',
    description: 'Molecules, pathways, and metabolic processes',
    count: biochemistryIcons.length,
  },
  'laboratory': {
    name: 'Laboratory',
    description: 'Lab equipment and techniques',
    count: laboratoryIcons.length,
  },
  'anatomy': {
    name: 'Anatomy',
    description: 'Organs, tissues, and body systems',
    count: anatomyIcons.length,
  },
};

/**
 * Search bioicons by query
 */
export function searchBioicons(query: string): BioiconMeta[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return bioiconsList;

  return bioiconsList.filter((icon) => {
    const searchText = [icon.name, icon.category, ...icon.keywords]
      .join(' ')
      .toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Get bioicons by category
 */
export function getBioiconsByCategory(category: string): BioiconMeta[] {
  return bioiconsList.filter((icon) => icon.category === category);
}

/**
 * Get bioicon by ID
 */
export function getBioiconById(id: string): BioiconMeta | undefined {
  return bioiconsList.find((icon) => icon.id === id);
}

/**
 * Convert bioicon to full SVG string
 */
export function bioiconToSvg(
  icon: BioiconMeta,
  size: number = 24,
  color: string = 'currentColor'
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="none" stroke="${color}">${icon.svg}</svg>`;
}

/**
 * Get total bioicon count
 */
export function getBioiconCount(): number {
  return bioiconsList.length;
}

/**
 * Get bioicon counts by category
 */
export function getBioiconCountsByCategory(): Record<string, number> {
  return Object.entries(bioiconCategories).reduce(
    (acc, [key, value]) => {
      acc[key] = value.count;
      return acc;
    },
    {} as Record<string, number>
  );
}
