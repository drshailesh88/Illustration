/**
 * physics.ts
 * Physics icon definitions for FINNISH Icon Library
 *
 * Contains icons related to physics, physical phenomena,
 * optics, electromagnetism, and mechanics.
 */

import type { IconDefinition } from './index';

/**
 * Physics domain icons collection
 */
export const physicsIcons: IconDefinition[] = [
  {
    id: 'phys-magnet',
    name: 'Magnet',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['magnetic field', 'poles', 'attraction', 'horseshoe', 'ferromagnetic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 15V9a6 6 0 0 1 12 0v6"/>
  <path d="M6 15a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2"/>
  <path d="M18 15a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2"/>
  <rect x="4" y="15" width="4" height="4"/>
  <rect x="16" y="15" width="4" height="4"/>
</svg>`,
  },
  {
    id: 'phys-wave',
    name: 'Wave',
    domain: 'physics',
    category: 'waves',
    tags: ['oscillation', 'frequency', 'amplitude', 'sine', 'periodic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0"/>
</svg>`,
  },
  {
    id: 'phys-circuit',
    name: 'Electric Circuit',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['electricity', 'current', 'voltage', 'resistor', 'schematic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <path d="M4 12h4"/>
  <path d="M8 10v4l2-2 2 2 2-2 2 2v-4"/>
  <path d="M16 12h4"/>
  <circle cx="6" cy="12" r="1" fill="currentColor"/>
  <circle cx="18" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'phys-lens',
    name: 'Lens',
    domain: 'physics',
    category: 'optics',
    tags: ['convex', 'concave', 'refraction', 'focus', 'magnification'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="4" ry="10"/>
  <path d="M2 12h6"/>
  <path d="M16 12h6"/>
  <path d="M8 12l4-3"/>
  <path d="M8 12l4 3"/>
</svg>`,
  },
  {
    id: 'phys-pendulum',
    name: 'Pendulum',
    domain: 'physics',
    category: 'mechanics',
    tags: ['oscillation', 'gravity', 'period', 'harmonic', 'motion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 4h12"/>
  <path d="M12 4l4 12"/>
  <circle cx="16" cy="18" r="3"/>
  <path d="M12 4l-4 10" stroke-dasharray="2 2"/>
  <circle cx="8" cy="15" r="2" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'phys-prism',
    name: 'Prism',
    domain: 'physics',
    category: 'optics',
    tags: ['refraction', 'spectrum', 'dispersion', 'light', 'rainbow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,3 22,20 2,20"/>
  <path d="M2 12l6 0"/>
  <path d="M16 12l2 2"/>
  <path d="M16 14l3 1"/>
  <path d="M16 16l4 0"/>
</svg>`,
  },
  {
    id: 'phys-electron',
    name: 'Electron',
    domain: 'physics',
    category: 'particles',
    tags: ['particle', 'charge', 'orbit', 'quantum', 'lepton'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="18" cy="8" r="2"/>
  <path d="M12 4a8 8 0 0 1 0 16"/>
</svg>`,
  },
  {
    id: 'phys-force',
    name: 'Force Vector',
    domain: 'physics',
    category: 'mechanics',
    tags: ['vector', 'arrow', 'newton', 'direction', 'magnitude'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 19L19 5"/>
  <path d="M12 5h7v7"/>
  <circle cx="5" cy="19" r="2"/>
</svg>`,
  },
  {
    id: 'phys-laser',
    name: 'Laser',
    domain: 'physics',
    category: 'optics',
    tags: ['coherent', 'beam', 'photon', 'stimulated emission', 'monochromatic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="8" height="8" rx="1"/>
  <path d="M10 12h12"/>
  <circle cx="6" cy="12" r="2"/>
  <path d="M22 10v4"/>
</svg>`,
  },
  {
    id: 'phys-thermometer',
    name: 'Thermometer',
    domain: 'physics',
    category: 'thermodynamics',
    tags: ['temperature', 'heat', 'celsius', 'fahrenheit', 'measurement'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 1 1 4 0Z"/>
  <path d="M10 10h4"/>
  <path d="M10 6h4"/>
</svg>`,
  },
  {
    id: 'phys-gravity',
    name: 'Gravity',
    domain: 'physics',
    category: 'mechanics',
    tags: ['gravitational', 'mass', 'attraction', 'weight', 'free fall'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="18" r="4"/>
  <path d="M12 2v8"/>
  <path d="M8 6l4 4 4-4"/>
  <path d="M4 18h4"/>
  <path d="M16 18h4"/>
</svg>`,
  },
  {
    id: 'phys-radiation',
    name: 'Radiation',
    domain: 'physics',
    category: 'nuclear',
    tags: ['radioactive', 'nuclear', 'decay', 'emission', 'hazard'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 2a10 10 0 0 1 8.66 5"/>
  <path d="M12 2a10 10 0 0 0-8.66 5"/>
  <path d="M20.66 17a10 10 0 0 1-8.66 5"/>
  <path d="M3.34 17a10 10 0 0 0 8.66 5"/>
  <path d="M3.34 7a10 10 0 0 0 0 10"/>
  <path d="M20.66 7a10 10 0 0 1 0 10"/>
</svg>`,
  },
  {
    id: 'phys-capacitor',
    name: 'Capacitor',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['charge', 'storage', 'electric field', 'farad', 'parallel plate'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h6"/>
  <path d="M14 12h6"/>
  <path d="M10 6v12"/>
  <path d="M14 6v12"/>
</svg>`,
  },
  {
    id: 'phys-inductor',
    name: 'Inductor',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['coil', 'magnetic field', 'inductance', 'henry', 'electromagnetic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h2"/>
  <path d="M6 12c0-2 1-3 2-3s2 1 2 3"/>
  <path d="M10 12c0-2 1-3 2-3s2 1 2 3"/>
  <path d="M14 12c0-2 1-3 2-3s2 1 2 3"/>
  <path d="M18 12h2"/>
</svg>`,
  },
  {
    id: 'phys-photon',
    name: 'Photon',
    domain: 'physics',
    category: 'particles',
    tags: ['light', 'quantum', 'electromagnetic', 'boson', 'energy'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M4.93 4.93l2.83 2.83"/>
  <path d="M16.24 16.24l2.83 2.83"/>
  <path d="M4.93 19.07l2.83-2.83"/>
  <path d="M16.24 7.76l2.83-2.83"/>
</svg>`,
  },
  {
    id: 'phys-momentum',
    name: 'Momentum',
    domain: 'physics',
    category: 'mechanics',
    tags: ['mass', 'velocity', 'collision', 'conservation', 'impulse'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="3"/>
  <path d="M10 12h2"/>
  <path d="M13 10l2 2-2 2"/>
</svg>`,
  },
  {
    id: 'phys-spring',
    name: 'Spring',
    domain: 'physics',
    category: 'mechanics',
    tags: ['hooke', 'elastic', 'oscillation', 'restoring force', 'coil'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h2"/>
  <path d="M6 12l1-3 2 6 2-6 2 6 2-6 2 6 1-3"/>
  <path d="M18 12h2"/>
  <rect x="2" y="10" width="2" height="4"/>
  <rect x="20" y="10" width="2" height="4"/>
</svg>`,
  },
  {
    id: 'phys-mirror',
    name: 'Mirror',
    domain: 'physics',
    category: 'optics',
    tags: ['reflection', 'concave', 'convex', 'focal point', 'image'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 3c2 3 3 6 3 9s-1 6-3 9"/>
  <path d="M2 12h10"/>
  <path d="M12 12l-4 4"/>
  <path d="M12 12l4-4"/>
  <path d="M16 3v18"/>
</svg>`,
  },
  {
    id: 'phys-pulley',
    name: 'Pulley',
    domain: 'physics',
    category: 'mechanics',
    tags: ['simple machine', 'mechanical advantage', 'rope', 'tension', 'lift'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="6" r="4"/>
  <path d="M12 2v-0"/>
  <path d="M8 6v14"/>
  <path d="M16 6v10"/>
  <rect x="6" y="20" width="4" height="2"/>
  <rect x="14" y="16" width="4" height="4"/>
</svg>`,
  },
  {
    id: 'phys-oscilloscope',
    name: 'Oscilloscope',
    domain: 'physics',
    category: 'measurement',
    tags: ['waveform', 'signal', 'frequency', 'voltage', 'display'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <path d="M4 12h2c1-2 2-2 3 0s2 2 3 0 2-2 3 0 2 2 3 0h2"/>
  <circle cx="6" cy="18" r="0.5" fill="currentColor"/>
  <circle cx="18" cy="18" r="0.5" fill="currentColor"/>
</svg>`,
  },
];

export default physicsIcons;
