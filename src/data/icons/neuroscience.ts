/**
 * Neuroscience Icon Library
 * Comprehensive SVG icons for neuroscience
 *
 * Categories:
 * - Neurons (structure, types)
 * - Synapses (structure, transmission)
 * - Brain Regions (anatomy, function)
 * - Neural Circuits (pathways, networks)
 */

import type { IconDefinition } from './index';

export const neuroscienceIcons: IconDefinition[] = [
  // ===========================================================================
  // NEURONS
  // ===========================================================================
  {
    id: 'neuro-neuron',
    name: 'Neuron Structure',
    domain: 'biology',
    category: 'neurons',
    tags: ['neuron', 'soma', 'axon', 'dendrite', 'nerve cell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10" fill="#9B59B6" opacity="0.4"/>
      <circle cx="16" cy="32" r="4" fill="#9B59B6"/>
      <path d="M4 24l8 4"/>
      <path d="M4 32l6 0"/>
      <path d="M4 40l8-4"/>
      <path d="M8 20l4 8"/>
      <path d="M8 44l4-8"/>
      <path d="M26 32h30"/>
      <path d="M56 24l-8 8 8 8"/>
      <path d="M36 32c0-2 2-4 4-4"/>
      <path d="M44 32c0-2 2-4 4-4"/>
      <path d="M52 32c0-2 2-4 4-4"/>
      <text x="10" y="52" font-size="3" fill="currentColor" stroke="none">Dendrites</text>
      <text x="28" y="52" font-size="3" fill="currentColor" stroke="none">Axon</text>
      <text x="48" y="52" font-size="3" fill="currentColor" stroke="none">Terminal</text>
    </svg>`
  },
  {
    id: 'neuro-multipolar',
    name: 'Multipolar Neuron',
    domain: 'biology',
    category: 'neurons',
    tags: ['multipolar', 'motor neuron', 'interneuron', 'many dendrites'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="10" fill="#E74C3C" opacity="0.4"/>
      <path d="M24 16l-8-8"/>
      <path d="M32 14l0-8"/>
      <path d="M40 16l8-8"/>
      <path d="M22 24l-8 0"/>
      <path d="M42 24l8 0"/>
      <path d="M26 30l-4 4"/>
      <path d="M38 30l4 4"/>
      <path d="M32 34v24"/>
      <path d="M28 58l4-4 4 4"/>
      <path d="M24 54l4-4"/>
      <path d="M40 54l-4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Multipolar</text>
    </svg>`
  },
  {
    id: 'neuro-bipolar',
    name: 'Bipolar Neuron',
    domain: 'biology',
    category: 'neurons',
    tags: ['bipolar', 'sensory neuron', 'retina', 'two processes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l-4-4 4-2 4 2-4 4"/>
      <path d="M32 8v16"/>
      <circle cx="32" cy="32" r="8" fill="#3498DB" opacity="0.4"/>
      <path d="M32 40v16"/>
      <path d="M28 56l4 4 4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Bipolar</text>
    </svg>`
  },
  {
    id: 'neuro-unipolar',
    name: 'Unipolar Neuron',
    domain: 'biology',
    category: 'neurons',
    tags: ['unipolar', 'pseudounipolar', 'sensory', 'DRG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="8" fill="#27AE60" opacity="0.4"/>
      <path d="M32 28v8"/>
      <path d="M32 36l-16 16"/>
      <path d="M32 36l16 16"/>
      <path d="M16 52l-4-4 4-4"/>
      <path d="M48 52l4-4-4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Unipolar</text>
    </svg>`
  },
  {
    id: 'neuro-myelin',
    name: 'Myelinated Axon',
    domain: 'biology',
    category: 'neurons',
    tags: ['myelin', 'Schwann cell', 'node of Ranvier', 'saltatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32" stroke-width="2"/>
      <ellipse cx="12" cy="32" rx="6" ry="8" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="28" cy="32" rx="6" ry="8" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="44" cy="32" rx="6" ry="8" fill="#F39C12" opacity="0.4"/>
      <path d="M6 24v16"/>
      <path d="M18 24v16"/>
      <path d="M22 24v16"/>
      <path d="M34 24v16"/>
      <path d="M38 24v16"/>
      <path d="M50 24v16"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Node of Ranvier</text>
      <text x="8" y="18" font-size="3" fill="currentColor" stroke="none">Myelin sheath</text>
    </svg>`
  },
  {
    id: 'neuro-action-potential',
    name: 'Action Potential',
    domain: 'biology',
    category: 'neurons',
    tags: ['action potential', 'depolarization', 'repolarization', 'threshold'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M8 44h12l4-32 8 40 4-8h20" stroke="#E74C3C" stroke-width="2"/>
      <line x1="8" y1="44" x2="56" y2="44" stroke-dasharray="2 2"/>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">Threshold</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Time</text>
      <text x="2" y="28" font-size="3" fill="currentColor" stroke="none">mV</text>
      <text x="24" y="20" font-size="3" fill="currentColor" stroke="none">Spike</text>
    </svg>`
  },

  // ===========================================================================
  // SYNAPSES
  // ===========================================================================
  {
    id: 'neuro-synapse',
    name: 'Chemical Synapse',
    domain: 'biology',
    category: 'synapses',
    tags: ['synapse', 'neurotransmitter', 'vesicle', 'receptor', 'cleft'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#9B59B6" opacity="0.3"/>
      <circle cx="12" cy="16" r="3" fill="#E74C3C"/>
      <circle cx="20" cy="12" r="3" fill="#E74C3C"/>
      <circle cx="16" cy="20" r="3" fill="#E74C3C"/>
      <rect x="4" y="32" width="56" height="4" fill="#87CEEB" opacity="0.2"/>
      <circle cx="12" cy="34" r="2" fill="#E74C3C"/>
      <circle cx="20" cy="34" r="2" fill="#E74C3C"/>
      <circle cx="28" cy="34" r="2" fill="#E74C3C"/>
      <rect x="4" y="40" width="56" height="20" rx="4" fill="#3498DB" opacity="0.3"/>
      <ellipse cx="16" cy="44" rx="4" ry="2" fill="#27AE60"/>
      <ellipse cx="28" cy="44" rx="4" ry="2" fill="#27AE60"/>
      <text x="36" y="16" font-size="3" fill="currentColor" stroke="none">Presynaptic</text>
      <text x="36" y="36" font-size="3" fill="currentColor" stroke="none">Cleft</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Postsynaptic</text>
    </svg>`
  },
  {
    id: 'neuro-vesicle-release',
    name: 'Vesicle Release',
    domain: 'biology',
    category: 'synapses',
    tags: ['vesicle', 'exocytosis', 'neurotransmitter release', 'calcium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="28" rx="4" fill="#9B59B6" opacity="0.2"/>
      <circle cx="20" cy="16" r="6" fill="#E74C3C" opacity="0.5"/>
      <circle cx="36" cy="16" r="6" fill="#E74C3C" opacity="0.5"/>
      <circle cx="28" cy="24" r="6" stroke-dasharray="2 2"/>
      <path d="M28 30v8"/>
      <circle cx="28" cy="42" r="2" fill="#E74C3C"/>
      <circle cx="24" cy="46" r="2" fill="#E74C3C"/>
      <circle cx="32" cy="46" r="2" fill="#E74C3C"/>
      <circle cx="28" cy="50" r="2" fill="#E74C3C"/>
      <rect x="4" y="52" width="56" height="8" fill="#3498DB" opacity="0.3"/>
      <circle cx="48" cy="12" r="3" fill="#87CEEB"/>
      <text x="40" y="16" font-size="3" fill="currentColor" stroke="none">Ca²⁺</text>
    </svg>`
  },
  {
    id: 'neuro-neurotransmitters',
    name: 'Neurotransmitters',
    domain: 'biology',
    category: 'synapses',
    tags: ['neurotransmitter', 'dopamine', 'serotonin', 'GABA', 'glutamate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="8" fill="#E74C3C" opacity="0.4"/>
      <text x="6" y="20" font-size="4" fill="currentColor" stroke="none">DA</text>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">Dopamine</text>
      <circle cx="36" cy="16" r="8" fill="#3498DB" opacity="0.4"/>
      <text x="30" y="20" font-size="4" fill="currentColor" stroke="none">5HT</text>
      <text x="26" y="32" font-size="3" fill="currentColor" stroke="none">Serotonin</text>
      <circle cx="12" cy="48" r="8" fill="#27AE60" opacity="0.4"/>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">Glu</text>
      <text x="2" y="62" font-size="3" fill="currentColor" stroke="none">Glutamate</text>
      <circle cx="36" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
      <text x="28" y="52" font-size="4" fill="currentColor" stroke="none">GABA</text>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">Inhibitory</text>
      <text x="48" y="16" font-size="3" fill="currentColor" stroke="none">+</text>
      <text x="48" y="48" font-size="3" fill="currentColor" stroke="none">-</text>
    </svg>`
  },
  {
    id: 'neuro-receptor-types',
    name: 'Receptor Types',
    domain: 'biology',
    category: 'synapses',
    tags: ['receptor', 'ionotropic', 'metabotropic', 'ligand-gated', 'GPCR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="24" height="24" fill="#3498DB" opacity="0.2"/>
      <circle cx="16" cy="16" r="4" fill="#E74C3C"/>
      <ellipse cx="16" cy="32" rx="8" ry="12" fill="#27AE60" opacity="0.4"/>
      <path d="M8 32h16"/>
      <path d="M16 44v8" stroke-dasharray="2 2"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Ionotropic</text>
      <rect x="36" y="20" width="24" height="24" fill="#3498DB" opacity="0.2"/>
      <circle cx="48" cy="16" r="4" fill="#E74C3C"/>
      <path d="M40 24c4-4 12-4 16 0" fill="#9B59B6" opacity="0.4"/>
      <path d="M48 28v8"/>
      <circle cx="48" cy="40" r="4" fill="#F39C12"/>
      <path d="M48 44v8" stroke-dasharray="2 2"/>
      <text x="34" y="60" font-size="3" fill="currentColor" stroke="none">Metabotropic</text>
    </svg>`
  },
  {
    id: 'neuro-synaptic-plasticity',
    name: 'Synaptic Plasticity',
    domain: 'biology',
    category: 'synapses',
    tags: ['plasticity', 'LTP', 'LTD', 'learning', 'memory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="20" fill="#9B59B6" opacity="0.2"/>
      <circle cx="12" cy="16" r="2" fill="#E74C3C"/>
      <circle cx="20" cy="16" r="2" fill="#E74C3C"/>
      <rect x="4" y="32" width="24" height="8" fill="#3498DB" opacity="0.2"/>
      <text x="8" y="42" font-size="3" fill="currentColor" stroke="none">Baseline</text>
      <rect x="36" y="8" width="24" height="20" fill="#9B59B6" opacity="0.3"/>
      <circle cx="40" cy="14" r="3" fill="#E74C3C"/>
      <circle cx="48" cy="14" r="3" fill="#E74C3C"/>
      <circle cx="56" cy="14" r="3" fill="#E74C3C"/>
      <circle cx="44" cy="22" r="3" fill="#E74C3C"/>
      <circle cx="52" cy="22" r="3" fill="#E74C3C"/>
      <rect x="36" y="32" width="24" height="8" fill="#27AE60" opacity="0.4"/>
      <text x="44" y="42" font-size="3" fill="currentColor" stroke="none">LTP</text>
      <path d="M28 20l8 0"/>
      <path d="M36 16l4 4-4 4"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Before stimulation</text>
      <text x="36" y="56" font-size="3" fill="currentColor" stroke="none">After stimulation</text>
    </svg>`
  },

  // ===========================================================================
  // BRAIN REGIONS
  // ===========================================================================
  {
    id: 'neuro-brain-overview',
    name: 'Brain Overview',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['brain', 'cerebrum', 'cerebellum', 'brainstem', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 12-24 24-24s24 8 24 20c0 8-4 16-12 20"/>
      <path d="M8 32c-4 4-4 12 0 16s8 4 12 0"/>
      <path d="M44 48c4-4 8-8 8-16"/>
      <ellipse cx="48" cy="48" rx="8" ry="6" fill="#E74C3C" opacity="0.3"/>
      <path d="M20 40l-8 16"/>
      <path d="M16 20c8 4 8-4 16 0"/>
      <path d="M20 32c8 4 8-4 16 0"/>
      <text x="20" y="18" font-size="3" fill="currentColor" stroke="none">Cerebrum</text>
      <text x="40" y="54" font-size="3" fill="currentColor" stroke="none">Cerebellum</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Brainstem</text>
    </svg>`
  },
  {
    id: 'neuro-cerebral-cortex',
    name: 'Cerebral Cortex Lobes',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['cortex', 'lobes', 'frontal', 'parietal', 'temporal', 'occipital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40c0-20 12-32 28-32s20 8 20 24"/>
      <path d="M8 40c-4 4-4 12 4 12h44"/>
      <line x1="28" y1="8" x2="28" y2="40" stroke-dasharray="2 2"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
      <path d="M28 40l28-8" stroke-dasharray="2 2"/>
      <text x="12" y="24" font-size="4" fill="#E74C3C" stroke="none">F</text>
      <text x="36" y="24" font-size="4" fill="#3498DB" stroke="none">P</text>
      <text x="12" y="44" font-size="4" fill="#27AE60" stroke="none">T</text>
      <text x="44" y="44" font-size="4" fill="#F39C12" stroke="none">O</text>
    </svg>`
  },
  {
    id: 'neuro-hippocampus',
    name: 'Hippocampus',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['hippocampus', 'memory', 'learning', 'limbic system', 'temporal lobe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-16 24-16 32-8s8 16 0 24-24 8-32-8c0-4 4-8 8-8s8 4 8 8"/>
      <path d="M24 32c4-8 12-8 16 0" fill="#27AE60" opacity="0.3"/>
      <path d="M28 44c4-4 8-4 12 0" fill="#27AE60" opacity="0.3"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Hippocampus</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Memory formation</text>
    </svg>`
  },
  {
    id: 'neuro-basal-ganglia',
    name: 'Basal Ganglia',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['basal ganglia', 'striatum', 'movement', 'dopamine', 'reward'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="20" ry="12" fill="#E74C3C" opacity="0.3"/>
      <text x="22" y="24" font-size="4" fill="currentColor" stroke="none">Caudate</text>
      <ellipse cx="24" cy="36" rx="12" ry="8" fill="#3498DB" opacity="0.3"/>
      <text x="16" y="40" font-size="4" fill="currentColor" stroke="none">Putamen</text>
      <ellipse cx="44" cy="40" rx="8" ry="6" fill="#27AE60" opacity="0.3"/>
      <text x="38" y="44" font-size="3" fill="currentColor" stroke="none">GP</text>
      <circle cx="32" cy="52" r="6" fill="#9B59B6" opacity="0.3"/>
      <text x="28" y="56" font-size="3" fill="currentColor" stroke="none">STN</text>
    </svg>`
  },
  {
    id: 'neuro-thalamus',
    name: 'Thalamus',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['thalamus', 'relay', 'sensory', 'diencephalon', 'nuclei'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M4 16l20 12"/>
      <path d="M4 48l20-12"/>
      <path d="M60 16l-20 12"/>
      <path d="M60 48l-20-12"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <circle cx="24" cy="28" r="4" fill="#E74C3C" opacity="0.4"/>
      <circle cx="40" cy="28" r="4" fill="#3498DB" opacity="0.4"/>
      <circle cx="32" cy="40" r="4" fill="#27AE60" opacity="0.4"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">Thalamus</text>
    </svg>`
  },

  // ===========================================================================
  // NEURAL CIRCUITS
  // ===========================================================================
  {
    id: 'neuro-reflex-arc',
    name: 'Reflex Arc',
    domain: 'biology',
    category: 'circuits',
    tags: ['reflex', 'arc', 'sensory', 'motor', 'interneuron', 'spinal cord'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">S</text>
      <path d="M14 32h8"/>
      <circle cx="28" cy="32" r="6" fill="#9B59B6" opacity="0.4"/>
      <text x="24" y="36" font-size="3" fill="currentColor" stroke="none">IN</text>
      <path d="M34 32h8"/>
      <circle cx="48" cy="32" r="6" fill="#E74C3C" opacity="0.4"/>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">M</text>
      <path d="M54 32h6"/>
      <rect x="4" y="48" width="56" height="8" fill="#F39C12" opacity="0.2"/>
      <path d="M8 38v10"/>
      <path d="M28 38v10"/>
      <path d="M48 38v10"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Sensory</text>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">Motor</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Spinal cord</text>
    </svg>`
  },
  {
    id: 'neuro-neural-network',
    name: 'Neural Network',
    domain: 'biology',
    category: 'circuits',
    tags: ['network', 'connections', 'layers', 'input', 'output', 'processing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="16" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="8" cy="32" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="8" cy="48" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="32" cy="12" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="28" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="44" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="56" cy="24" r="4" fill="#E74C3C" opacity="0.5"/>
      <circle cx="56" cy="40" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M12 16l16-4"/>
      <path d="M12 16l16 12"/>
      <path d="M12 32l16-20"/>
      <path d="M12 32l16-4"/>
      <path d="M12 32l16 12"/>
      <path d="M12 48l16-4"/>
      <path d="M12 48l16-20"/>
      <path d="M36 12l16 12"/>
      <path d="M36 28l16-4"/>
      <path d="M36 28l16 12"/>
      <path d="M36 44l16-4"/>
      <path d="M36 44l16-20"/>
      <text x="2" y="62" font-size="3" fill="currentColor" stroke="none">Input</text>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">Hidden</text>
      <text x="48" y="62" font-size="3" fill="currentColor" stroke="none">Output</text>
    </svg>`
  },
  {
    id: 'neuro-reward-pathway',
    name: 'Reward Pathway',
    domain: 'biology',
    category: 'circuits',
    tags: ['reward', 'dopamine', 'VTA', 'nucleus accumbens', 'motivation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="48" rx="8" ry="6" fill="#27AE60" opacity="0.4"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">VTA</text>
      <path d="M24 48l16-16" stroke="#E74C3C" stroke-width="2"/>
      <ellipse cx="44" cy="28" rx="10" ry="8" fill="#3498DB" opacity="0.4"/>
      <text x="36" y="32" font-size="3" fill="currentColor" stroke="none">NAc</text>
      <path d="M44 20l0-8" stroke="#E74C3C" stroke-width="2"/>
      <ellipse cx="44" cy="8" rx="12" ry="6" fill="#9B59B6" opacity="0.4"/>
      <text x="36" y="12" font-size="3" fill="currentColor" stroke="none">PFC</text>
      <text x="4" y="60" font-size="3" fill="#E74C3C" stroke="none">Dopamine pathway</text>
    </svg>`
  },
  {
    id: 'neuro-sensory-pathway',
    name: 'Sensory Pathway',
    domain: 'biology',
    category: 'circuits',
    tags: ['sensory', 'afferent', 'ascending', 'thalamus', 'cortex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="56" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="26" y="60" font-size="4" fill="currentColor" stroke="none">R</text>
      <path d="M32 50v-8"/>
      <path d="M28 42l4 4 4-4"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#F39C12" opacity="0.4"/>
      <text x="28" y="36" font-size="3" fill="currentColor" stroke="none">Th</text>
      <path d="M32 26v-8"/>
      <path d="M28 18l4 4 4-4"/>
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#9B59B6" opacity="0.4"/>
      <text x="24" y="14" font-size="3" fill="currentColor" stroke="none">Cortex</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Receptor</text>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">Thalamus</text>
    </svg>`
  },
  {
    id: 'neuro-motor-pathway',
    name: 'Motor Pathway',
    domain: 'biology',
    category: 'circuits',
    tags: ['motor', 'efferent', 'descending', 'pyramidal', 'corticospinal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#E74C3C" opacity="0.4"/>
      <text x="20" y="14" font-size="3" fill="currentColor" stroke="none">Motor cortex</text>
      <path d="M32 16v8"/>
      <path d="M28 24l4-4 4 4"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#F39C12" opacity="0.4"/>
      <text x="26" y="36" font-size="3" fill="currentColor" stroke="none">BS</text>
      <path d="M24 36l-8 16"/>
      <path d="M40 36l8 16"/>
      <circle cx="14" cy="54" r="4" fill="#27AE60" opacity="0.4"/>
      <circle cx="50" cy="54" r="4" fill="#27AE60" opacity="0.4"/>
      <text x="2" y="62" font-size="3" fill="currentColor" stroke="none">Muscle</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Muscle</text>
    </svg>`
  },
  {
    id: 'neuro-eeg',
    name: 'EEG Brain Waves',
    domain: 'biology',
    category: 'circuits',
    tags: ['EEG', 'brain waves', 'alpha', 'beta', 'theta', 'delta'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 12c2-4 4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0" stroke="#E74C3C"/>
      <text x="52" y="14" font-size="3" fill="currentColor" stroke="none">Beta</text>
      <path d="M4 24c4-4 4 4 8 0s4 4 8 0s4 4 8 0s4 4 8 0s4 4 8 0s4 4 8 0" stroke="#F39C12"/>
      <text x="52" y="26" font-size="3" fill="currentColor" stroke="none">Alpha</text>
      <path d="M4 36c4-6 8 6 12 0s8 6 12 0s8 6 12 0s8 6 12 0" stroke="#27AE60"/>
      <text x="52" y="38" font-size="3" fill="currentColor" stroke="none">Theta</text>
      <path d="M4 52c8-8 8 8 16 0s8 8 16 0s8 8 16 0" stroke="#3498DB"/>
      <text x="52" y="54" font-size="3" fill="currentColor" stroke="none">Delta</text>
    </svg>`
  },
];

export default neuroscienceIcons;
