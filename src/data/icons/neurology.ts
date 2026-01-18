/**
 * Neurology Icon Library
 * Comprehensive SVG icons for neurological medicine
 *
 * Categories:
 * - Brain Anatomy (cerebrum, cerebellum, brainstem, ventricles, lobes)
 * - Neurons & Synapses (motor, sensory, interneurons, synaptic structures)
 * - Spinal Cord & Nerves (cord segments, peripheral nerves, plexuses)
 * - Pathology (stroke, tumor, aneurysm, demyelination)
 * - Diagnostic Equipment (EEG, MRI brain, lumbar puncture)
 */

import type { IconDefinition } from './index';

export const neurologyIcons: IconDefinition[] = [
  // ===========================================================================
  // BRAIN ANATOMY
  // ===========================================================================
  {
    id: 'neuro-brain-lateral',
    name: 'Brain Lateral View',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brain', 'lateral', 'cerebrum', 'anatomy', 'cortex', 'gyri', 'sulci'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <path d="M20 20c4 1 8 1 12 0"/>
      <path d="M16 28c6 2 14 2 20 0"/>
      <path d="M18 36c4 1 10 1 14 0"/>
      <path d="M36 16v8"/>
      <circle cx="40" cy="40" r="3"/>
    </svg>`
  },
  {
    id: 'neuro-brain-superior',
    name: 'Brain Superior View',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brain', 'superior', 'top', 'hemispheres', 'longitudinal fissure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <line x1="32" y1="10" x2="32" y2="54"/>
      <path d="M12 24c6 2 12 2 18 0"/>
      <path d="M34 24c6 2 12 2 18 0"/>
      <path d="M12 40c6-2 12-2 18 0"/>
      <path d="M34 40c6-2 12-2 18 0"/>
      <text x="16" y="34" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="44" y="34" font-size="5" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'neuro-cerebrum',
    name: 'Cerebrum',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['cerebrum', 'cerebral', 'cortex', 'gray matter', 'white matter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 10-20 24-20s24 8 24 20c0 10-8 18-20 20h-8c-12-2-20-10-20-20z" fill="currentColor" opacity="0.15"/>
      <path d="M8 28c0-12 10-20 24-20s24 8 24 20c0 10-8 18-20 20h-8c-12-2-20-10-20-20z"/>
      <path d="M14 22c4 2 10 2 14 0"/>
      <path d="M36 22c4 2 10 2 14 0"/>
      <path d="M16 32c4 2 8 2 12 0"/>
      <path d="M36 32c4 2 8 2 12 0"/>
      <path d="M20 40c4 1 8 1 12 0"/>
      <line x1="32" y1="10" x2="32" y2="48" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'neuro-cerebellum',
    name: 'Cerebellum',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['cerebellum', 'posterior fossa', 'coordination', 'vermis', 'folia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="22" ry="16" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="36" rx="22" ry="16"/>
      <path d="M32 20v32"/>
      <path d="M12 32c4 1 8 1 12 0"/>
      <path d="M40 32c4 1 8 1 12 0"/>
      <path d="M14 40c3 1 7 1 10 0"/>
      <path d="M40 40c3 1 7 1 10 0"/>
      <path d="M16 48c3 0 6 0 9-1"/>
      <path d="M39 47c3 1 6 1 9 1"/>
      <ellipse cx="32" cy="36" rx="4" ry="12" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'neuro-brainstem',
    name: 'Brainstem',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brainstem', 'midbrain', 'pons', 'medulla', 'cranial nerves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16c4 0 8 4 8 10v8c0 4-2 8-4 10v12c0 6-4 12-12 12s-12-6-12-12V36c-2-2-4-6-4-10v-8c0-6 4-10 8-10z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16c4 0 8 4 8 10v8c0 4-2 8-4 10v12c0 6-4 12-12 12s-12-6-12-12V36c-2-2-4-6-4-10v-8c0-6 4-10 8-10z"/>
      <line x1="20" y1="18" x2="44" y2="18" stroke-dasharray="2 2"/>
      <line x1="20" y1="30" x2="44" y2="30" stroke-dasharray="2 2"/>
      <text x="24" y="14" font-size="4" fill="currentColor" stroke="none">Midbrain</text>
      <text x="28" y="26" font-size="4" fill="currentColor" stroke="none">Pons</text>
      <text x="24" y="42" font-size="4" fill="currentColor" stroke="none">Medulla</text>
    </svg>`
  },
  {
    id: 'neuro-ventricles',
    name: 'Cerebral Ventricles',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['ventricles', 'lateral', 'third', 'fourth', 'CSF', 'aqueduct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 4-4 12 0 16l4 4-4 4v8l16 8 16-8v-8l-4-4 4-4c4-4 4-12 0-16l-8-4h-16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 16c-4 4-4 12 0 16l4 4-4 4v8l16 8 16-8v-8l-4-4 4-4c4-4 4-12 0-16l-8-4h-16z"/>
      <ellipse cx="32" cy="32" rx="4" ry="3"/>
      <path d="M32 35v10"/>
      <text x="8" y="24" font-size="4" fill="currentColor" stroke="none">Lat</text>
      <text x="48" y="24" font-size="4" fill="currentColor" stroke="none">Lat</text>
      <text x="26" y="35" font-size="4" fill="currentColor" stroke="none">3rd</text>
      <text x="26" y="52" font-size="4" fill="currentColor" stroke="none">4th</text>
    </svg>`
  },
  {
    id: 'neuro-frontal-lobe',
    name: 'Frontal Lobe',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['frontal', 'lobe', 'prefrontal', 'motor', 'Broca', 'executive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-14 10-24 24-24s24 10 24 24c0 14-10 24-24 24S8 46 8 32z" stroke-dasharray="3 3" opacity="0.3"/>
      <path d="M8 32c0-10 6-20 16-24v48c-10-4-16-14-16-24z" fill="currentColor" opacity="0.3"/>
      <path d="M8 32c0-10 6-20 16-24v48c-10-4-16-14-16-24z"/>
      <line x1="24" y1="8" x2="24" y2="56" stroke-dasharray="4 2"/>
      <path d="M12 24c3 1 6 1 9 0"/>
      <path d="M12 40c3-1 6-1 9 0"/>
      <text x="10" y="34" font-size="5" fill="currentColor" stroke="none">F</text>
    </svg>`
  },
  {
    id: 'neuro-temporal-lobe',
    name: 'Temporal Lobe',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['temporal', 'lobe', 'auditory', 'Wernicke', 'memory', 'hippocampus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-14 10-24 24-24s24 10 24 24c0 14-10 24-24 24S8 46 8 32z" stroke-dasharray="3 3" opacity="0.3"/>
      <path d="M16 48c-5-4-8-10-8-16s3-12 8-16c4 8 4 24 0 32z" fill="currentColor" opacity="0.3"/>
      <path d="M16 48c-5-4-8-10-8-16s3-12 8-16c4 8 4 24 0 32z"/>
      <path d="M10 36c2 1 4 1 6 0"/>
      <path d="M10 44c2 1 4 1 6 0"/>
      <text x="8" y="34" font-size="5" fill="currentColor" stroke="none">T</text>
    </svg>`
  },

  // ===========================================================================
  // NEURONS & SYNAPSES
  // ===========================================================================
  {
    id: 'neuro-neuron-multipolar',
    name: 'Multipolar Neuron',
    domain: 'medicine',
    category: 'neurons',
    tags: ['neuron', 'multipolar', 'motor', 'cell body', 'dendrites', 'axon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="32" r="8"/>
      <circle cx="20" cy="32" r="3" fill="currentColor"/>
      <path d="M8 24l6 4"/>
      <path d="M6 32h6"/>
      <path d="M8 40l6-4"/>
      <path d="M14 22l4 6"/>
      <path d="M14 42l4-6"/>
      <path d="M28 32h28"/>
      <path d="M32 32v-4"/>
      <path d="M40 32v4"/>
      <path d="M48 32v-4"/>
      <path d="M56 28l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'neuro-neuron-sensory',
    name: 'Sensory Neuron',
    domain: 'medicine',
    category: 'neurons',
    tags: ['neuron', 'sensory', 'afferent', 'pseudounipolar', 'DRG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="6"/>
      <path d="M32 26v12"/>
      <path d="M32 38l-16 16"/>
      <path d="M32 38l16 16"/>
      <path d="M16 54l-4-2m0 0l-2-4"/>
      <path d="M48 54l4-2m0 0l2-4"/>
      <circle cx="32" cy="20" r="2" fill="currentColor"/>
      <path d="M32 8v6"/>
    </svg>`
  },
  {
    id: 'neuro-synapse',
    name: 'Synapse',
    domain: 'medicine',
    category: 'neurons',
    tags: ['synapse', 'synaptic cleft', 'vesicles', 'neurotransmitter', 'receptor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16" stroke-width="3"/>
      <rect x="24" y="24" width="8" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="24" width="8" height="16" rx="2"/>
      <circle cx="27" cy="28" r="1.5" fill="currentColor"/>
      <circle cx="27" cy="32" r="1.5" fill="currentColor"/>
      <circle cx="27" cy="36" r="1.5" fill="currentColor"/>
      <rect x="36" y="24" width="4" height="16" fill="currentColor" opacity="0.1"/>
      <path d="M40 28c2 0 4 2 4 4s-2 4-4 4"/>
      <path d="M44 32h12" stroke-width="3"/>
      <circle cx="37" cy="32" r="1" fill="currentColor"/>
      <circle cx="39" cy="28" r="1" fill="currentColor"/>
      <circle cx="39" cy="36" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'neuro-axon-myelin',
    name: 'Myelinated Axon',
    domain: 'medicine',
    category: 'neurons',
    tags: ['axon', 'myelin', 'Schwann cell', 'node of Ranvier', 'saltatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32"/>
      <rect x="8" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="50" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="26" width="10" height="12" rx="2"/>
      <rect x="22" y="26" width="10" height="12" rx="2"/>
      <rect x="36" y="26" width="10" height="12" rx="2"/>
      <rect x="50" y="26" width="10" height="12" rx="2"/>
      <text x="16" y="48" font-size="4" fill="currentColor" stroke="none">Node</text>
    </svg>`
  },
  {
    id: 'neuro-action-potential',
    name: 'Action Potential',
    domain: 'medicine',
    category: 'neurons',
    tags: ['action potential', 'depolarization', 'repolarization', 'threshold', 'voltage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="56" y2="48"/>
      <line x1="8" y1="8" x2="8" y2="56"/>
      <path d="M12 44h8l2-4 2 4 4-32 4 40 4-8 4 4h12"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke-dasharray="2 2" opacity="0.5"/>
      <text x="4" y="42" font-size="4" fill="currentColor" stroke="none">Th</text>
      <text x="28" y="60" font-size="4" fill="currentColor" stroke="none">Time</text>
      <text x="2" y="32" font-size="4" fill="currentColor" stroke="none">mV</text>
    </svg>`
  },
  {
    id: 'neuro-neurotransmitter',
    name: 'Neurotransmitter Release',
    domain: 'medicine',
    category: 'neurons',
    tags: ['neurotransmitter', 'vesicle', 'exocytosis', 'receptor', 'signal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="20" height="24" rx="2"/>
      <circle cx="14" cy="14" r="2" fill="currentColor"/>
      <circle cx="22" cy="14" r="2" fill="currentColor"/>
      <circle cx="18" cy="20" r="2" fill="currentColor"/>
      <circle cx="14" cy="26" r="2" fill="currentColor"/>
      <circle cx="22" cy="26" r="2" fill="currentColor"/>
      <path d="M28 20c4-2 8-2 8 4"/>
      <circle cx="38" cy="28" r="2" fill="currentColor"/>
      <circle cx="42" cy="36" r="2" fill="currentColor"/>
      <circle cx="46" cy="44" r="2" fill="currentColor"/>
      <rect x="36" y="48" width="20" height="8" rx="2"/>
      <path d="M42 48v-4c0-2 4-2 4 0v4"/>
      <path d="M50 48v-4c0-2 4-2 4 0v4"/>
    </svg>`
  },

  // ===========================================================================
  // SPINAL CORD & NERVES
  // ===========================================================================
  {
    id: 'neuro-spinal-cord',
    name: 'Spinal Cord Cross Section',
    domain: 'medicine',
    category: 'spinal',
    tags: ['spinal cord', 'gray matter', 'white matter', 'dorsal', 'ventral horn'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M20 24c0-4 4-8 12-8s12 4 12 8c0 2-2 4-4 4h-16c-2 0-4-2-4-4z" fill="currentColor" opacity="0.3"/>
      <path d="M20 40c0 4 4 8 12 8s12-4 12-8c0-2-2-4-4-4h-16c-2 0-4 2-4 4z" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M8 28l10 2"/>
      <path d="M8 36l10-2"/>
      <path d="M46 30l10-2"/>
      <path d="M46 34l10 2"/>
      <text x="28" y="18" font-size="4" fill="currentColor" stroke="none">DH</text>
      <text x="28" y="50" font-size="4" fill="currentColor" stroke="none">VH</text>
    </svg>`
  },
  {
    id: 'neuro-spinal-cord-long',
    name: 'Spinal Cord Longitudinal',
    domain: 'medicine',
    category: 'spinal',
    tags: ['spinal cord', 'cervical', 'thoracic', 'lumbar', 'sacral', 'segments'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 4h8v12c2 0 4 0 6 2v10c-2 2-4 2-6 2v20c2 2 4 6 0 10h-8c-4-4-2-8 0-10V30c-2 0-4 0-6-2V18c2-2 4-2 6-2V4z" fill="currentColor" opacity="0.1"/>
      <path d="M28 4h8v12c2 0 4 0 6 2v10c-2 2-4 2-6 2v20c2 2 4 6 0 10h-8c-4-4-2-8 0-10V30c-2 0-4 0-6-2V18c2-2 4-2 6-2V4z"/>
      <path d="M22 20h-8"/>
      <path d="M22 26h-8"/>
      <path d="M22 40h-10"/>
      <path d="M22 48h-10"/>
      <path d="M42 20h8"/>
      <path d="M42 26h8"/>
      <path d="M42 40h10"/>
      <path d="M42 48h10"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">C</text>
      <text x="4" y="30" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="4" y="50" font-size="4" fill="currentColor" stroke="none">L</text>
    </svg>`
  },
  {
    id: 'neuro-peripheral-nerve',
    name: 'Peripheral Nerve',
    domain: 'medicine',
    category: 'spinal',
    tags: ['peripheral', 'nerve', 'fascicle', 'epineurium', 'perineurium', 'endoneurium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="24" cy="28" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="28" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="38" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="28" rx="6" ry="5"/>
      <ellipse cx="40" cy="28" rx="6" ry="5"/>
      <ellipse cx="32" cy="38" rx="6" ry="5"/>
      <circle cx="24" cy="28" r="1" fill="currentColor"/>
      <circle cx="40" cy="28" r="1" fill="currentColor"/>
      <circle cx="32" cy="38" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'neuro-brachial-plexus',
    name: 'Brachial Plexus',
    domain: 'medicine',
    category: 'spinal',
    tags: ['brachial plexus', 'roots', 'trunks', 'cords', 'branches', 'arm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h4"/>
      <path d="M8 16h4"/>
      <path d="M8 24h4"/>
      <path d="M8 32h4"/>
      <path d="M8 40h4"/>
      <path d="M12 8l8 8"/>
      <path d="M12 16l8 4"/>
      <path d="M12 24h8"/>
      <path d="M12 32l8-4"/>
      <path d="M12 40l8-8"/>
      <path d="M20 16v8"/>
      <path d="M20 24v8"/>
      <path d="M20 16l12 8"/>
      <path d="M20 24l12 4"/>
      <path d="M20 32l12-4"/>
      <path d="M32 24l16 8"/>
      <path d="M32 28l16 4"/>
      <path d="M32 28l16-4"/>
      <circle cx="20" cy="24" r="2" fill="currentColor"/>
      <text x="2" y="10" font-size="4" fill="currentColor" stroke="none">C5</text>
      <text x="2" y="42" font-size="4" fill="currentColor" stroke="none">T1</text>
    </svg>`
  },
  {
    id: 'neuro-dermatome',
    name: 'Dermatome Map',
    domain: 'medicine',
    category: 'spinal',
    tags: ['dermatome', 'sensory', 'distribution', 'spinal level', 'sensation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c8 0 14 4 14 12v36c0 4-6 8-14 8s-14-4-14-8V16c0-8 6-12 14-12z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4c8 0 14 4 14 12v36c0 4-6 8-14 8s-14-4-14-8V16c0-8 6-12 14-12z"/>
      <path d="M18 20h28"/>
      <path d="M18 28h28"/>
      <path d="M18 36h28"/>
      <path d="M18 44h28"/>
      <text x="20" y="18" font-size="4" fill="currentColor" stroke="none">C4</text>
      <text x="20" y="26" font-size="4" fill="currentColor" stroke="none">T4</text>
      <text x="20" y="34" font-size="4" fill="currentColor" stroke="none">T10</text>
      <text x="20" y="42" font-size="4" fill="currentColor" stroke="none">L1</text>
      <text x="20" y="50" font-size="4" fill="currentColor" stroke="none">S1</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY
  // ===========================================================================
  {
    id: 'neuro-stroke-ischemic',
    name: 'Ischemic Stroke',
    domain: 'medicine',
    category: 'pathology',
    tags: ['stroke', 'ischemic', 'infarct', 'MCA', 'occlusion', 'penumbra'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <ellipse cx="36" cy="28" rx="10" ry="8" fill="red" opacity="0.3"/>
      <ellipse cx="36" cy="28" rx="10" ry="8" stroke="red"/>
      <path d="M24 20l8 4"/>
      <path d="M32 24l-8 8" stroke="red" stroke-width="2"/>
      <line x1="28" y1="24" x2="36" y2="32" stroke="red" stroke-width="2"/>
      <text x="32" y="44" font-size="4" fill="red" stroke="none">MCA</text>
    </svg>`
  },
  {
    id: 'neuro-stroke-hemorrhagic',
    name: 'Hemorrhagic Stroke',
    domain: 'medicine',
    category: 'pathology',
    tags: ['stroke', 'hemorrhagic', 'ICH', 'bleeding', 'hypertensive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <circle cx="32" cy="30" r="10" fill="red" opacity="0.4"/>
      <circle cx="32" cy="30" r="10" stroke="red" stroke-width="2"/>
      <path d="M26 26c2-2 4-2 6 0" stroke="red"/>
      <path d="M32 26c2-2 4-2 6 0" stroke="red"/>
      <path d="M28 34c3 2 6 2 8 0" stroke="red"/>
      <circle cx="32" cy="30" r="4" fill="red" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'neuro-brain-tumor',
    name: 'Brain Tumor',
    domain: 'medicine',
    category: 'pathology',
    tags: ['tumor', 'glioma', 'meningioma', 'mass', 'neoplasm', 'lesion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <circle cx="40" cy="24" r="12" fill="purple" opacity="0.3"/>
      <circle cx="40" cy="24" r="12" stroke="purple" stroke-width="2"/>
      <path d="M34 20c4-2 8-2 12 0" stroke="purple"/>
      <path d="M36 28c3 1 6 1 8 0" stroke="purple"/>
      <path d="M48 24h8" stroke="purple" stroke-dasharray="2 2"/>
      <text x="48" y="20" font-size="4" fill="purple" stroke="none">Mass</text>
    </svg>`
  },
  {
    id: 'neuro-aneurysm',
    name: 'Cerebral Aneurysm',
    domain: 'medicine',
    category: 'pathology',
    tags: ['aneurysm', 'saccular', 'berry', 'subarachnoid', 'Circle of Willis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32h12"/>
      <path d="M36 32h12"/>
      <path d="M28 32c0-8 8-8 8 0"/>
      <circle cx="32" cy="16" r="8" fill="red" opacity="0.3"/>
      <circle cx="32" cy="16" r="8" stroke="red" stroke-width="2"/>
      <path d="M32 24v8"/>
      <text x="40" y="18" font-size="4" fill="red" stroke="none">Aneurysm</text>
      <path d="M28 48l4-8 4 8" stroke-dasharray="2 2"/>
      <text x="20" y="54" font-size="4" fill="currentColor" stroke="none">ACA</text>
      <text x="38" y="54" font-size="4" fill="currentColor" stroke="none">MCA</text>
    </svg>`
  },
  {
    id: 'neuro-demyelination',
    name: 'Demyelination',
    domain: 'medicine',
    category: 'pathology',
    tags: ['demyelination', 'MS', 'multiple sclerosis', 'plaque', 'lesion', 'white matter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32"/>
      <rect x="8" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="26" width="10" height="12" rx="2"/>
      <rect x="22" y="26" width="10" height="12" rx="2" fill="orange" opacity="0.3" stroke="orange"/>
      <rect x="36" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="26" width="10" height="12" rx="2"/>
      <rect x="50" y="26" width="10" height="12" rx="2" fill="orange" opacity="0.3" stroke="orange"/>
      <path d="M24 28l6 8m0-8l-6 8" stroke="orange"/>
      <path d="M52 28l6 8m0-8l-6 8" stroke="orange"/>
      <text x="20" y="48" font-size="4" fill="orange" stroke="none">Demyelinated</text>
    </svg>`
  },
  {
    id: 'neuro-hydrocephalus',
    name: 'Hydrocephalus',
    domain: 'medicine',
    category: 'pathology',
    tags: ['hydrocephalus', 'ventricle', 'dilation', 'CSF', 'NPH', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <path d="M16 20c-4 4-6 12-4 20 4 4 12 6 20 4" fill="blue" opacity="0.2"/>
      <path d="M48 20c4 4 6 12 4 20-4 4-12 6-20 4" fill="blue" opacity="0.2"/>
      <path d="M16 20c-4 4-6 12-4 20 4 4 12 6 20 4" stroke="blue"/>
      <path d="M48 20c4 4 6 12 4 20-4 4-12 6-20 4" stroke="blue"/>
      <line x1="32" y1="10" x2="32" y2="54"/>
      <text x="18" y="36" font-size="4" fill="blue" stroke="none">Dilated</text>
    </svg>`
  },

  // ===========================================================================
  // DIAGNOSTIC EQUIPMENT
  // ===========================================================================
  {
    id: 'neuro-eeg',
    name: 'EEG Electrodes',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['EEG', 'electroencephalogram', 'electrodes', 'brain waves', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="22" ry="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="22" ry="18"/>
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
      <circle cx="44" cy="20" r="3" fill="currentColor"/>
      <circle cx="32" cy="14" r="3" fill="currentColor"/>
      <circle cx="16" cy="32" r="3" fill="currentColor"/>
      <circle cx="48" cy="32" r="3" fill="currentColor"/>
      <path d="M20 20v-8"/>
      <path d="M44 20v-8"/>
      <path d="M32 14v-6"/>
      <path d="M4 48h56"/>
      <path d="M8 48c2-4 4 4 6 0s4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0"/>
    </svg>`
  },
  {
    id: 'neuro-mri-brain',
    name: 'Brain MRI',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['MRI', 'magnetic resonance', 'brain', 'imaging', 'neuroimaging', 'scan'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="32" rx="18" ry="20" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="18" ry="20"/>
      <line x1="32" y1="12" x2="32" y2="52" stroke-dasharray="2 2"/>
      <path d="M18 24c4 1 8 1 12 0"/>
      <path d="M34 24c4 1 8 1 12 0"/>
      <path d="M20 36c4-1 8-1 12 0"/>
      <path d="M32 36c4-1 8-1 12 0"/>
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'neuro-ct-head',
    name: 'Head CT',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['CT', 'computed tomography', 'head', 'brain', 'scan', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.05"/>
      <circle cx="32" cy="32" r="24"/>
      <ellipse cx="32" cy="32" rx="18" ry="16" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="18" ry="16"/>
      <path d="M20 28c4 2 8 2 12 0"/>
      <path d="M32 28c4 2 8 2 12 0"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <text x="24" y="60" font-size="4" fill="currentColor" stroke="none">AXIAL</text>
    </svg>`
  },
  {
    id: 'neuro-lumbar-puncture',
    name: 'Lumbar Puncture',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['lumbar puncture', 'spinal tap', 'CSF', 'L3', 'L4', 'procedure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 4-4 8-4 16s0 12 4 16v16h24V40c4-4 4-8 4-16s0-12-4-16" fill="currentColor" opacity="0.1"/>
      <path d="M20 8c-4 4-4 8-4 16s0 12 4 16v16h24V40c4-4 4-8 4-16s0-12-4-16"/>
      <line x1="16" y1="28" x2="48" y2="28" stroke-dasharray="2 2"/>
      <line x1="16" y1="36" x2="48" y2="36" stroke-dasharray="2 2"/>
      <path d="M56 28l-16 4" stroke-width="2"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <text x="8" y="26" font-size="4" fill="currentColor" stroke="none">L3</text>
      <text x="8" y="38" font-size="4" fill="currentColor" stroke="none">L4</text>
      <path d="M48 40c0-4 4-8 8-8"/>
    </svg>`
  },
  {
    id: 'neuro-reflex-hammer',
    name: 'Reflex Hammer',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['reflex', 'hammer', 'DTR', 'neurological exam', 'patellar', 'tendon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v32"/>
      <ellipse cx="32" cy="44" rx="20" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="20" ry="8"/>
      <path d="M32 36c-4 0-8 2-8 8"/>
      <path d="M32 36c4 0 8 2 8 8"/>
      <ellipse cx="32" cy="50" rx="16" ry="6"/>
      <circle cx="32" cy="4" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'neuro-emg',
    name: 'EMG Needle',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['EMG', 'electromyography', 'needle', 'nerve conduction', 'NCS', 'muscle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="32" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="24" width="32" height="16" rx="2"/>
      <path d="M40 32h16l4-4v8l-4-4"/>
      <line x1="12" y1="32" x2="36" y2="32" stroke-dasharray="2 2"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M8 48h48"/>
      <path d="M12 48c2-4 4 4 6 0s4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0"/>
    </svg>`
  },
];

export default neurologyIcons;
