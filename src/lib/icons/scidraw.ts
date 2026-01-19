/**
 * SciDraw-Inspired Scientific Illustrations
 *
 * High-quality scientific illustrations for research presentations and publications.
 * Inspired by SciDraw.io (Federico Claudi & Alex Harston) - the open repository
 * of scientific drawings for the research community.
 *
 * Categories:
 * - Model Organisms: Mice, rats, flies, zebrafish, C. elegans, etc.
 * - Neuroscience: Neurons, brain regions, synapses, neural circuits
 * - Lab Equipment: Microscopes, pipettes, recording equipment
 * - Scientific Setups: Behavioral rigs, electrophysiology, imaging
 * - Molecular: DNA, RNA, proteins, membranes
 * - Anatomy: Organs, tissues, systems
 *
 * License: CC-BY (Attribution required)
 * @see https://scidraw.io/
 */

/**
 * SciDraw icon metadata for search and categorization
 */
export interface SciDrawIcon {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svg: string;
  viewBox: string;
  license: 'CC-BY';
  attribution?: string;
}

/**
 * SVG viewBox for all SciDraw icons (24x24 standard)
 */
const VIEWBOX = '0 0 24 24';

// ============================================================================
// Model Organisms - Lab animals and research specimens
// ============================================================================

const modelOrganismIcons: SciDrawIcon[] = [
  {
    id: 'mouse-side',
    name: 'Mouse (Side View)',
    category: 'model-organisms',
    keywords: ['mouse', 'mus musculus', 'rodent', 'mammal', 'model organism', 'animal'],
    svg: '<path d="M3 14c0-3 2-5 5-5h2c2 0 4-1 5-2l3-2c1 0 2 1 2 2v3c0 2-1 3-3 3h-2l-1 2c0 1-1 2-2 2H8c-3 0-5-1-5-3z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="9" r="1" fill="currentColor"/><path d="M3 12c-1 0-1-2 0-3s2-1 3-1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M21 15l2 1" stroke="currentColor" stroke-width="1"/><path d="M21 16l2 0" stroke="currentColor" stroke-width="1"/><path d="M21 17l2-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
    attribution: 'FINNISH/SciDraw-style',
  },
  {
    id: 'mouse-top',
    name: 'Mouse (Top View)',
    category: 'model-organisms',
    keywords: ['mouse', 'mus musculus', 'rodent', 'dorsal', 'top view', 'animal'],
    svg: '<ellipse cx="12" cy="10" rx="4" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="17" rx="2" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="7" r="0.5" fill="currentColor"/><circle cx="14" cy="7" r="0.5" fill="currentColor"/><path d="M12 20v2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'rat',
    name: 'Rat',
    category: 'model-organisms',
    keywords: ['rat', 'rattus', 'rodent', 'mammal', 'model organism', 'animal'],
    svg: '<path d="M2 13c0-3 2-5 6-5h3c2 0 4-1 5-2l4-2c1 0 2 1 2 2v4c0 2-1 3-3 3h-3l-1 2c0 1-1 2-2 2H7c-3 0-5-1-5-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="8" r="1" fill="currentColor"/><path d="M2 11c-1-1 0-3 1-3s2 0 3 1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M22 14l2 2m-2 0l2 0m-2 1l2-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'drosophila',
    name: 'Drosophila (Fruit Fly)',
    category: 'model-organisms',
    keywords: ['fly', 'drosophila', 'fruit fly', 'insect', 'genetics', 'model organism'],
    svg: '<ellipse cx="12" cy="14" rx="4" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="7" rx="3" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6" r="1.5" fill="currentColor" opacity="0.6"/><circle cx="14" cy="6" r="1.5" fill="currentColor" opacity="0.6"/><path d="M8 14c-3-1-5 0-6 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 14c3-1 5 0 6 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 12l-3-4M16 12l3-4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'zebrafish',
    name: 'Zebrafish',
    category: 'model-organisms',
    keywords: ['zebrafish', 'danio rerio', 'fish', 'vertebrate', 'development', 'model organism'],
    svg: '<path d="M2 12c0-2 3-4 8-4h4c3 0 6-1 8 0 0 2-2 3-4 4h-2c-2 1-3 2-3 3s1 2 3 2c-3 1-6 0-8-1-4 0-6-2-6-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="11" r="1" fill="currentColor"/><path d="M5 10v4M7 9v6M9 10v4" stroke="currentColor" stroke-width="0.75" opacity="0.6"/><path d="M12 8l2-2M12 8l-2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'c-elegans',
    name: 'C. elegans',
    category: 'model-organisms',
    keywords: ['c elegans', 'worm', 'nematode', 'caenorhabditis', 'model organism', 'connectome'],
    svg: '<path d="M4 8c2-2 4-2 6 0s4 2 6 0c2 2 4 2 4 4s-2 2-4 4c-2 2-4 2-6 0s-4-2-6 0c-2-2-2-4 0-6s2-4 0-2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="8" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="5" cy="8" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'xenopus',
    name: 'Xenopus (Frog)',
    category: 'model-organisms',
    keywords: ['xenopus', 'frog', 'amphibian', 'development', 'embryology', 'model organism'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="8" r="1" fill="currentColor"/><path d="M4 14l-2 3M6 16l-1 3M20 14l2 3M18 16l1 3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'macaque',
    name: 'Macaque',
    category: 'model-organisms',
    keywords: ['macaque', 'monkey', 'primate', 'NHP', 'non-human primate', 'model organism'],
    svg: '<circle cx="12" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="13" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><path d="M6 6c-1-2-2-2-3-1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M18 6c1-2 2-2 3-1" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="19" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'ferret',
    name: 'Ferret',
    category: 'model-organisms',
    keywords: ['ferret', 'mustela', 'carnivore', 'visual cortex', 'model organism'],
    svg: '<ellipse cx="14" cy="12" rx="7" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="6" cy="10" rx="3" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="9" r="0.7" fill="currentColor"/><path d="M4 7l-1-2M8 7l1-2" stroke="currentColor" stroke-width="1"/><path d="M21 12c2 0 2 2 1 3" stroke="currentColor" stroke-width="1"/><path d="M14 16l-1 2M16 16l0 2M18 16l1 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'marmoset',
    name: 'Marmoset',
    category: 'model-organisms',
    keywords: ['marmoset', 'callithrix', 'primate', 'NHP', 'model organism', 'small monkey'],
    svg: '<circle cx="12" cy="11" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 7c-2-1-3 0-3 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17 7c2-1 3 0 3 2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="10" r="1" fill="currentColor"/><ellipse cx="12" cy="13" rx="1.5" ry="1" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="19" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Neuroscience - Neural structures and brain anatomy
// ============================================================================

const neuroscienceIcons: SciDrawIcon[] = [
  {
    id: 'pyramidal-neuron',
    name: 'Pyramidal Neuron',
    category: 'neuroscience',
    keywords: ['neuron', 'pyramidal', 'cortex', 'excitatory', 'dendrite', 'axon'],
    svg: '<path d="M12 2v4" stroke="currentColor" stroke-width="1.5"/><path d="M10 3l2-1 2 1" stroke="currentColor" stroke-width="1"/><path d="M8 4l4-2 4 2" stroke="currentColor" stroke-width="1"/><polygon points="12,6 8,12 16,12" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.5"/><path d="M12 12v10" stroke="currentColor" stroke-width="1.5"/><path d="M12 16l-3 2M12 16l3 2M12 19l-2 1M12 19l2 1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
    attribution: 'FINNISH/SciDraw-style',
  },
  {
    id: 'purkinje-cell',
    name: 'Purkinje Cell',
    category: 'neuroscience',
    keywords: ['purkinje', 'cerebellum', 'neuron', 'dendrite', 'GABAergic', 'inhibitory'],
    svg: '<path d="M12 20v-6" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="15" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 14c0-2-4-3-6-6s0-4 2-4c1 0 2 1 2 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 14c0-2 4-3 6-6s0-4-2-4c-1 0-2 1-2 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 5c-2-2-3-2-4-1M16 5c2-2 3-2 4-1" stroke="currentColor" stroke-width="0.75"/><path d="M10 8c-1-2-2-3-4-2M14 8c1-2 2-3 4-2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'interneuron',
    name: 'Interneuron',
    category: 'neuroscience',
    keywords: ['interneuron', 'inhibitory', 'GABAergic', 'local circuit', 'neuron'],
    svg: '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5"/><path d="M8 12l-4-2M8 12l-4 2M16 12l4-2M16 12l4 2" stroke="currentColor" stroke-width="1"/><path d="M12 8l-2-4M12 8l2-4M12 16l-2 4M12 16l2 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'synapse',
    name: 'Synapse',
    category: 'neuroscience',
    keywords: ['synapse', 'neurotransmitter', 'vesicle', 'receptor', 'synaptic cleft'],
    svg: '<rect x="2" y="4" width="8" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="4" width="8" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="8" r="1" fill="currentColor"/><circle cx="7" cy="10" r="1" fill="currentColor"/><circle cx="4" cy="10" r="1" fill="currentColor"/><path d="M10 8h4" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/><circle cx="15" cy="10" r="0.5" fill="currentColor"/><circle cx="17" cy="8" r="0.5" fill="currentColor"/><circle cx="16" cy="12" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'brain-sagittal',
    name: 'Brain (Sagittal)',
    category: 'neuroscience',
    keywords: ['brain', 'sagittal', 'cortex', 'cerebellum', 'brainstem', 'neuroanatomy'],
    svg: '<path d="M4 10c0-4 3-7 8-7s8 3 8 7c0 3-2 5-4 6l-2 3c0 1-1 2-2 2s-2-1-2-2l-2-3c-2-1-4-3-4-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10c2 0 3 1 4 3" stroke="currentColor" stroke-width="1"/><path d="M18 10c-2 0-3 1-4 3" stroke="currentColor" stroke-width="1"/><ellipse cx="16" cy="14" rx="2" ry="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'brain-coronal',
    name: 'Brain (Coronal)',
    category: 'neuroscience',
    keywords: ['brain', 'coronal', 'section', 'cortex', 'hippocampus', 'neuroanatomy'],
    svg: '<ellipse cx="12" cy="10" rx="9" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v3M8 4v2M16 4v2" stroke="currentColor" stroke-width="1"/><ellipse cx="8" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="16" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 17l2 3 2-3" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    category: 'neuroscience',
    keywords: ['hippocampus', 'memory', 'CA1', 'CA3', 'dentate gyrus', 'limbic'],
    svg: '<path d="M4 16c0-3 2-6 6-8 3-2 6-1 8 1s3 4 2 7c-1 2-3 3-6 3-4 0-7-1-9-2-1 0-1-1-1-1z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 14c1-2 3-3 5-3s4 1 5 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 12c2 0 3 1 4 2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cortical-column',
    name: 'Cortical Column',
    category: 'neuroscience',
    keywords: ['cortex', 'column', 'layers', 'L1', 'L2/3', 'L4', 'L5', 'L6', 'barrel'],
    svg: '<rect x="6" y="2" width="12" height="20" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="5" x2="18" y2="5" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="16" x2="18" y2="16" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="19" x2="18" y2="19" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><text x="4" y="4" font-size="2" fill="currentColor">1</text><text x="4" y="7" font-size="2" fill="currentColor">2</text><text x="4" y="10" font-size="2" fill="currentColor">4</text><text x="4" y="14" font-size="2" fill="currentColor">5</text><text x="4" y="18" font-size="2" fill="currentColor">6</text>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'action-potential',
    name: 'Action Potential',
    category: 'neuroscience',
    keywords: ['action potential', 'spike', 'depolarization', 'voltage', 'electrophysiology'],
    svg: '<path d="M2 16h4l1-2 2 8 2-14 2 6 1-2h8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 12h20" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'dendritic-spine',
    name: 'Dendritic Spine',
    category: 'neuroscience',
    keywords: ['spine', 'dendrite', 'synapse', 'plasticity', 'mushroom spine', 'PSD'],
    svg: '<path d="M4 20h16" stroke="currentColor" stroke-width="2"/><path d="M8 20v-4" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="14" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 20v-6" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="2.5" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 20v-8l2-4" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="7" r="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'astrocyte',
    name: 'Astrocyte',
    category: 'neuroscience',
    keywords: ['astrocyte', 'glia', 'glial cell', 'star cell', 'blood brain barrier'],
    svg: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 9l0-6M12 15l0 6M9 12l-6 0M15 12l6 0" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 9.5l-4-4M14.5 9.5l4-4M9.5 14.5l-4 4M14.5 14.5l4 4" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="3" r="1" fill="currentColor" opacity="0.5"/><circle cx="12" cy="21" r="1" fill="currentColor" opacity="0.5"/><circle cx="3" cy="12" r="1" fill="currentColor" opacity="0.5"/><circle cx="21" cy="12" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'microglia',
    name: 'Microglia',
    category: 'neuroscience',
    keywords: ['microglia', 'glia', 'immune', 'phagocyte', 'neuroinflammation'],
    svg: '<circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 9.5c0-3-2-5-2-6M12 9.5c0-3 2-5 2-6" stroke="currentColor" stroke-width="1"/><path d="M14.5 12c3 0 5-2 6-2M14.5 12c3 0 5 2 6 2" stroke="currentColor" stroke-width="1"/><path d="M12 14.5c0 3-2 5-2 6M12 14.5c0 3 2 5 2 6" stroke="currentColor" stroke-width="1"/><path d="M9.5 12c-3 0-5-2-6-2M9.5 12c-3 0-5 2-6 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Lab Equipment - Scientific instruments and tools
// ============================================================================

const labEquipmentIcons: SciDrawIcon[] = [
  {
    id: 'microscope',
    name: 'Microscope',
    category: 'lab-equipment',
    keywords: ['microscope', 'optics', 'imaging', 'magnification', 'objective'],
    svg: '<path d="M8 20h8" stroke="currentColor" stroke-width="1.5"/><path d="M10 20v-4h4v4" stroke="currentColor" stroke-width="1.5"/><path d="M12 16v-4" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="8" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8V4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="3" r="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 10h4l-2 3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'pipette',
    name: 'Pipette',
    category: 'lab-equipment',
    keywords: ['pipette', 'micropipette', 'pipettor', 'liquid handling', 'tip'],
    svg: '<rect x="10" y="2" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 6h4M10 10h4" stroke="currentColor" stroke-width="0.75"/><path d="M11 14v4l1 4 1-4v-4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'electrode',
    name: 'Recording Electrode',
    category: 'lab-equipment',
    keywords: ['electrode', 'recording', 'electrophysiology', 'patch clamp', 'probe'],
    svg: '<path d="M4 4l8 8" stroke="currentColor" stroke-width="1.5"/><path d="M12 12l4 4" stroke="currentColor" stroke-width="1"/><circle cx="17" cy="17" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4l-2 2M4 4l2-2" stroke="currentColor" stroke-width="1"/><path d="M20 20l2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'syringe',
    name: 'Syringe',
    category: 'lab-equipment',
    keywords: ['syringe', 'injection', 'needle', 'infusion', 'cannula'],
    svg: '<rect x="8" y="4" width="8" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4v-2h4v2" stroke="currentColor" stroke-width="1"/><path d="M11 16v4l1 2 1-2v-4" stroke="currentColor" stroke-width="1.5"/><path d="M8 8h8M8 12h8" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'petri-dish',
    name: 'Petri Dish',
    category: 'lab-equipment',
    keywords: ['petri dish', 'culture', 'plate', 'agar', 'bacteria', 'cell culture'],
    svg: '<ellipse cx="12" cy="14" rx="9" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 12v2M21 12v2" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'beaker',
    name: 'Beaker',
    category: 'lab-equipment',
    keywords: ['beaker', 'flask', 'glassware', 'chemistry', 'liquid'],
    svg: '<path d="M6 4h12v2l-2 14H8L6 6V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 4h12" stroke="currentColor" stroke-width="2"/><path d="M8 10h8M8 14h6" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'test-tube',
    name: 'Test Tube',
    category: 'lab-equipment',
    keywords: ['test tube', 'tube', 'sample', 'chemistry', 'reaction'],
    svg: '<path d="M9 3h6v2l-1 14c0 1-1 2-2 2s-2-1-2-2L9 5V3z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 3h6" stroke="currentColor" stroke-width="2"/><path d="M10 10c1 0 2 1 4 0" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'centrifuge-tube',
    name: 'Centrifuge Tube',
    category: 'lab-equipment',
    keywords: ['eppendorf', 'centrifuge tube', 'microcentrifuge', 'sample'],
    svg: '<path d="M8 4h8l-1 2v10l-3 5-3-5V6L8 4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4c0-1 2-2 4-2s4 1 4 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 6h6" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'multi-well-plate',
    name: 'Multi-Well Plate',
    category: 'lab-equipment',
    keywords: ['96 well plate', 'microplate', 'assay', 'high throughput', 'ELISA'],
    svg: '<rect x="2" y="6" width="20" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="11" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="14" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="17" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="5" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="11" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="14" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="17" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="5" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="11" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="14" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="17" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'stereotax',
    name: 'Stereotaxic Frame',
    category: 'lab-equipment',
    keywords: ['stereotax', 'stereotaxic', 'surgery', 'brain surgery', 'injection'],
    svg: '<rect x="4" y="18" width="16" height="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 18v-6h2v6M16 18v-6h2v6" stroke="currentColor" stroke-width="1.5"/><path d="M8 14h8" stroke="currentColor" stroke-width="1.5"/><path d="M12 14v-8" stroke="currentColor" stroke-width="1.5"/><path d="M10 6h4" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="4" r="1" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'headplate',
    name: 'Headplate',
    category: 'lab-equipment',
    keywords: ['headplate', 'head fixation', 'chronic implant', 'imaging window'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="4" width="8" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="14" r="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="6" cy="10" r="1" fill="currentColor"/><circle cx="18" cy="10" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'fiber-optic',
    name: 'Fiber Optic Cannula',
    category: 'lab-equipment',
    keywords: ['fiber optic', 'optogenetics', 'cannula', 'implant', 'light delivery'],
    svg: '<rect x="10" y="2" width="4" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M11 8v10l1 4 1-4V8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="1" fill="currentColor" opacity="0.5"/><path d="M10 22c-1-1 0-2 2-2s3 1 2 2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Scientific Setups - Behavioral and experimental rigs
// ============================================================================

const scientificSetupIcons: SciDrawIcon[] = [
  {
    id: 'treadmill-setup',
    name: 'Treadmill Setup',
    category: 'scientific-setups',
    keywords: ['treadmill', 'locomotion', 'running', 'behavior', 'virtual reality'],
    svg: '<ellipse cx="12" cy="16" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8c0-2 2-4 4-4s4 2 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M4 16v-4M20 16v-4" stroke="currentColor" stroke-width="1.5"/><path d="M6 16l2-2 2 1 2-1 2 1 2-1 2 2" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'two-photon-setup',
    name: 'Two-Photon Setup',
    category: 'scientific-setups',
    keywords: ['two photon', '2P', 'microscopy', 'imaging', 'calcium imaging'],
    svg: '<rect x="8" y="2" width="8" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4" stroke="currentColor" stroke-width="1.5"/><path d="M8 12h8" stroke="currentColor" stroke-width="1.5"/><path d="M12 12v4" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="18" rx="4" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4l4 2M14 4l-4 2" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'maze-plus',
    name: 'Plus Maze',
    category: 'scientific-setups',
    keywords: ['elevated plus maze', 'EPM', 'anxiety', 'behavior', 'rodent'],
    svg: '<rect x="8" y="2" width="8" height="20" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="8" width="20" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8v8M16 8v8M8 8h8M8 16h8" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'maze-t',
    name: 'T-Maze',
    category: 'scientific-setups',
    keywords: ['T maze', 'alternation', 'working memory', 'choice', 'behavior'],
    svg: '<rect x="10" y="10" width="4" height="12" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="4" width="20" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10h4" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'open-field',
    name: 'Open Field',
    category: 'scientific-setups',
    keywords: ['open field', 'locomotion', 'anxiety', 'exploration', 'behavior'],
    svg: '<rect x="2" y="4" width="20" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="8" width="12" height="8" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'water-maze',
    name: 'Morris Water Maze',
    category: 'scientific-setups',
    keywords: ['water maze', 'morris', 'spatial memory', 'hippocampus', 'navigation'],
    svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M3 12h18" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1" opacity="0.5"/><path d="M12 3v18" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1" opacity="0.5"/><path d="M5 10c1 0 2 1 3 0s2 1 3 0" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'operant-chamber',
    name: 'Operant Chamber',
    category: 'scientific-setups',
    keywords: ['operant', 'skinner box', 'lever press', 'conditioning', 'reward'],
    svg: '<rect x="3" y="4" width="18" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="8" width="4" height="2" fill="currentColor" opacity="0.5"/><rect x="14" y="8" width="4" height="2" fill="currentColor" opacity="0.5"/><circle cx="8" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 12v4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'patch-rig',
    name: 'Patch Clamp Rig',
    category: 'scientific-setups',
    keywords: ['patch clamp', 'electrophysiology', 'whole cell', 'recording', 'slice'],
    svg: '<rect x="4" y="14" width="16" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 14v-4h4v4" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="8" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M4 6l4 4" stroke="currentColor" stroke-width="1"/><path d="M4 4l2 1-1 1" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'lickometer',
    name: 'Lickometer',
    category: 'scientific-setups',
    keywords: ['lickometer', 'licking', 'drinking', 'reward', 'spout'],
    svg: '<rect x="8" y="2" width="8" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12v6" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 6h8" stroke="currentColor" stroke-width="0.5"/><circle cx="12" cy="20" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'running-wheel',
    name: 'Running Wheel',
    category: 'scientific-setups',
    keywords: ['running wheel', 'activity', 'circadian', 'exercise', 'voluntary'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" stroke-width="1"/><rect x="18" y="10" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Molecular - DNA, RNA, proteins, membranes
// ============================================================================

const molecularIcons: SciDrawIcon[] = [
  {
    id: 'dna-helix',
    name: 'DNA Helix',
    category: 'molecular',
    keywords: ['DNA', 'double helix', 'nucleotide', 'base pair', 'genetics'],
    svg: '<path d="M6 2c2 2 2 4 0 6s-2 4 0 6 2 4 0 6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 2c-2 2-2 4 0 6s2 4 0 6 2 4 0 6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 5h12M6 8h12M6 11h12M6 14h12M6 17h12M6 20h12" stroke="currentColor" stroke-width="0.75" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'rna-strand',
    name: 'RNA Strand',
    category: 'molecular',
    keywords: ['RNA', 'mRNA', 'transcript', 'single strand', 'nucleotide'],
    svg: '<path d="M4 4c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 3-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 3-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c2 0 3 2 5 2s3-2 5-2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="4" r="1" fill="currentColor"/><circle cx="14" cy="4" r="1" fill="currentColor"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'protein-structure',
    name: 'Protein Structure',
    category: 'molecular',
    keywords: ['protein', 'alpha helix', 'beta sheet', 'folding', 'tertiary'],
    svg: '<path d="M4 8c2-2 4 0 6 0s4-4 6-2 2 6 0 8-4 0-6 0-4 4-6 2-2-6 0-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.5"/><circle cx="16" cy="10" r="1.5" fill="currentColor" opacity="0.5"/><circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'lipid-bilayer',
    name: 'Lipid Bilayer',
    category: 'molecular',
    keywords: ['lipid bilayer', 'membrane', 'phospholipid', 'cell membrane'],
    svg: '<circle cx="4" cy="6" r="1.5" fill="currentColor"/><path d="M4 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M3 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="6" r="1.5" fill="currentColor"/><path d="M8 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M7 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="12" cy="6" r="1.5" fill="currentColor"/><path d="M12 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M11 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="16" cy="6" r="1.5" fill="currentColor"/><path d="M16 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M15 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="6" r="1.5" fill="currentColor"/><path d="M20 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M19 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/><path d="M4 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M3 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="18" r="1.5" fill="currentColor"/><path d="M8 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M7 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><path d="M12 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M11 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="16" cy="18" r="1.5" fill="currentColor"/><path d="M16 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M15 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="18" r="1.5" fill="currentColor"/><path d="M20 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M19 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'ion-channel',
    name: 'Ion Channel',
    category: 'molecular',
    keywords: ['ion channel', 'membrane protein', 'pore', 'conductance', 'gating'],
    svg: '<rect x="4" y="6" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="6" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10h8M8 14h8" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><circle cx="12" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path d="M12 4v2M12 18v2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'receptor',
    name: 'Receptor',
    category: 'molecular',
    keywords: ['receptor', 'GPCR', 'transmembrane', 'ligand', 'binding'],
    svg: '<path d="M8 2c-2 0-4 2-4 4v12c0 2 2 4 4 4h8c2 0 4-2 4-4V6c0-2-2-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2h8" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="5" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M9 7v10M15 7v10M9 12h6" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'vesicle',
    name: 'Vesicle',
    category: 'molecular',
    keywords: ['vesicle', 'exocytosis', 'endocytosis', 'transport', 'membrane'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.5"/><circle cx="14" cy="11" r="1" fill="currentColor" opacity="0.5"/><circle cx="11" cy="14" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'antibody',
    name: 'Antibody',
    category: 'molecular',
    keywords: ['antibody', 'immunoglobulin', 'IgG', 'antigen', 'immune'],
    svg: '<path d="M12 14v6" stroke="currentColor" stroke-width="1.5"/><path d="M12 14l-6-8" stroke="currentColor" stroke-width="1.5"/><path d="M12 14l6-8" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 20h6" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'enzyme',
    name: 'Enzyme',
    category: 'molecular',
    keywords: ['enzyme', 'catalyst', 'active site', 'substrate', 'reaction'],
    svg: '<path d="M4 8c0-2 3-4 8-4s8 2 8 4c0 3-3 4-4 6s0 4-4 4-3-2-4-4-4-3-4-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10c0 1 1 2 2 2s2-1 2-2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'atp',
    name: 'ATP Molecule',
    category: 'molecular',
    keywords: ['ATP', 'adenosine triphosphate', 'energy', 'phosphate', 'metabolism'],
    svg: '<circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="21" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 12h1M14 12h1M19 12h0.5" stroke="currentColor" stroke-width="1"/><path d="M6 9v-4l2 2-2 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Anatomy - Organs and systems (complements bioicons)
// ============================================================================

const anatomyIcons: SciDrawIcon[] = [
  {
    id: 'eye-detailed',
    name: 'Eye (Detailed)',
    category: 'anatomy',
    keywords: ['eye', 'retina', 'cornea', 'lens', 'optic nerve', 'vision'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M3 12c2 0 2 2 0 2" stroke="currentColor" stroke-width="1"/><ellipse cx="8" cy="12" rx="1" ry="2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'spinal-cord',
    name: 'Spinal Cord',
    category: 'anatomy',
    keywords: ['spinal cord', 'spine', 'vertebra', 'CNS', 'motor neuron'],
    svg: '<ellipse cx="12" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 6v12c0 2 2 4 4 4s4-2 4-4V6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v16" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><path d="M4 10l4 0M16 10l4 0M4 14l4 0M16 14l4 0M4 18l4 0M16 18l4 0" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cochlea',
    name: 'Cochlea',
    category: 'anatomy',
    keywords: ['cochlea', 'ear', 'hearing', 'inner ear', 'auditory', 'spiral'],
    svg: '<path d="M12 20c-4 0-8-4-8-8s4-8 8-8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 16c-2 0-4-2-4-4s2-4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12c0 0 0 0 0 0" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M20 12h-4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'muscle-fiber',
    name: 'Muscle Fiber',
    category: 'anatomy',
    keywords: ['muscle', 'fiber', 'sarcomere', 'myosin', 'actin', 'contraction'],
    svg: '<rect x="2" y="8" width="20" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 8v8M10 8v8M14 8v8M18 8v8" stroke="currentColor" stroke-width="0.75"/><path d="M4 10h4M4 14h4M8 10h4M8 14h4M12 10h4M12 14h4M16 10h4M16 14h4" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'blood-vessel',
    name: 'Blood Vessel',
    category: 'anatomy',
    keywords: ['blood vessel', 'artery', 'vein', 'capillary', 'endothelium'],
    svg: '<path d="M2 8c4 0 6 4 10 4s6-4 10-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 16c4 0 6-4 10-4s6 4 10 4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="8" cy="12" rx="1.5" ry="1" fill="currentColor" opacity="0.5"/><ellipse cx="14" cy="12" rx="1.5" ry="1" fill="currentColor" opacity="0.5"/><ellipse cx="20" cy="12" rx="1.5" ry="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'alveolus',
    name: 'Alveolus',
    category: 'anatomy',
    keywords: ['alveolus', 'lung', 'respiration', 'gas exchange', 'pulmonary'],
    svg: '<circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'nephron',
    name: 'Nephron',
    category: 'anatomy',
    keywords: ['nephron', 'kidney', 'glomerulus', 'tubule', 'filtration', 'renal'],
    svg: '<circle cx="6" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c2 0 4 2 4 4v4c0 2 2 4 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 20c2 0 2-2 2-4v-8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'villus',
    name: 'Intestinal Villus',
    category: 'anatomy',
    keywords: ['villus', 'intestine', 'absorption', 'gut', 'epithelium'],
    svg: '<path d="M4 20c0-8 4-16 8-16s8 8 8 16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 20c0-4 2-8 4-8s4 4 4 8" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 4v8" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Combine all icons
// ============================================================================

/**
 * All SciDraw icons combined
 */
export const scidrawIcons: SciDrawIcon[] = [
  ...modelOrganismIcons,
  ...neuroscienceIcons,
  ...labEquipmentIcons,
  ...scientificSetupIcons,
  ...molecularIcons,
  ...anatomyIcons,
];

/**
 * Get icons by category
 */
export function getIconsByCategory(category: string): SciDrawIcon[] {
  return scidrawIcons.filter((icon) => icon.category === category);
}

/**
 * Search icons by keyword
 */
export function searchSciDrawIcons(query: string): SciDrawIcon[] {
  const lowerQuery = query.toLowerCase();
  return scidrawIcons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery)) ||
      icon.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all available categories
 */
export function getCategories(): string[] {
  return [...new Set(scidrawIcons.map((icon) => icon.category))];
}

/**
 * Get icon count
 */
export function getIconCount(): number {
  return scidrawIcons.length;
}

/**
 * Get icon by ID
 */
export function getIconById(id: string): SciDrawIcon | undefined {
  return scidrawIcons.find((icon) => icon.id === id);
}

/**
 * Convert SciDraw icon to full SVG string
 */
export function toSvgString(icon: SciDrawIcon): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" fill="none">${icon.svg}</svg>`;
}

export default scidrawIcons;
