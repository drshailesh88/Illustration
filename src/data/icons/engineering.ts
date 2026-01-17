/**
 * engineering.ts
 * Engineering icon definitions for FINNISH Icon Library
 *
 * Contains icons related to engineering disciplines including
 * electrical, mechanical, civil, and systems engineering.
 */

import type { IconDefinition } from './index';

/**
 * Engineering domain icons collection
 */
export const engineeringIcons: IconDefinition[] = [
  {
    id: 'eng-gear',
    name: 'Gear',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['cog', 'mechanism', 'rotation', 'transmission', 'machine'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 1v3"/>
  <path d="M12 20v3"/>
  <path d="M1 12h3"/>
  <path d="M20 12h3"/>
  <path d="M4.22 4.22l2.12 2.12"/>
  <path d="M17.66 17.66l2.12 2.12"/>
  <path d="M4.22 19.78l2.12-2.12"/>
  <path d="M17.66 6.34l2.12-2.12"/>
  <circle cx="12" cy="12" r="7"/>
</svg>`,
  },
  {
    id: 'eng-capacitor',
    name: 'Capacitor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['electronic', 'component', 'charge', 'circuit', 'storage'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h6"/>
  <path d="M14 12h6"/>
  <path d="M10 6v12"/>
  <path d="M14 8v8" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'eng-circuit-board',
    name: 'Circuit Board',
    domain: 'engineering',
    category: 'electrical',
    tags: ['PCB', 'electronic', 'traces', 'components', 'board'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <circle cx="6" cy="8" r="1.5"/>
  <circle cx="18" cy="8" r="1.5"/>
  <circle cx="6" cy="16" r="1.5"/>
  <circle cx="18" cy="16" r="1.5"/>
  <rect x="9" y="9" width="6" height="6"/>
  <path d="M6 9.5v3"/>
  <path d="M18 9.5v3"/>
  <path d="M9 12h-1.5"/>
  <path d="M16.5 12h-1.5"/>
</svg>`,
  },
  {
    id: 'eng-resistor',
    name: 'Resistor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['ohm', 'component', 'resistance', 'circuit', 'electronic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M6 12l1-4 2 8 2-8 2 8 2-8 2 8 1-4"/>
</svg>`,
  },
  {
    id: 'eng-transistor',
    name: 'Transistor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['semiconductor', 'amplifier', 'switch', 'BJT', 'MOSFET'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M8 8v8"/>
  <path d="M8 12l6-4v8l-6-4"/>
  <path d="M14 6v2"/>
  <path d="M14 16v2"/>
  <path d="M4 12h4"/>
</svg>`,
  },
  {
    id: 'eng-beam',
    name: 'Structural Beam',
    domain: 'engineering',
    category: 'civil',
    tags: ['I-beam', 'structure', 'steel', 'construction', 'load'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 6h16"/>
  <path d="M4 18h16"/>
  <path d="M12 6v12"/>
  <path d="M6 6v2"/>
  <path d="M18 6v2"/>
  <path d="M6 16v2"/>
  <path d="M18 16v2"/>
</svg>`,
  },
  {
    id: 'eng-bridge',
    name: 'Bridge',
    domain: 'engineering',
    category: 'civil',
    tags: ['structure', 'span', 'truss', 'construction', 'infrastructure'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 18h20"/>
  <path d="M4 18v-6"/>
  <path d="M20 18v-6"/>
  <path d="M4 12c4-6 12-6 16 0"/>
  <path d="M8 12v6"/>
  <path d="M12 9v9"/>
  <path d="M16 12v6"/>
</svg>`,
  },
  {
    id: 'eng-motor',
    name: 'Electric Motor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['rotor', 'stator', 'rotation', 'power', 'actuator'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M6 12H2"/>
  <path d="M22 12h-4"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 10v-2"/>
</svg>`,
  },
  {
    id: 'eng-pipe',
    name: 'Pipe',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['tube', 'conduit', 'flow', 'plumbing', 'piping'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 8h8v8H2z"/>
  <path d="M14 8h8v8h-8z"/>
  <path d="M10 10h4v4h-4z"/>
  <path d="M4 8v-4"/>
  <path d="M8 8v-4"/>
  <path d="M16 16v4"/>
  <path d="M20 16v4"/>
</svg>`,
  },
  {
    id: 'eng-valve',
    name: 'Valve',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['control', 'flow', 'gate', 'regulation', 'fluid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h6l2-4 4 8 2-4h6"/>
  <path d="M12 4v4"/>
  <circle cx="12" cy="3" r="1"/>
  <path d="M10 8h4"/>
</svg>`,
  },
  {
    id: 'eng-bolt',
    name: 'Bolt',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['fastener', 'screw', 'thread', 'hardware', 'assembly'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 17,5 17,9 12,12 7,9 7,5"/>
  <path d="M12 12v10"/>
  <path d="M9 14h6"/>
  <path d="M9 17h6"/>
  <path d="M9 20h6"/>
</svg>`,
  },
  {
    id: 'eng-nut',
    name: 'Nut',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['fastener', 'hex', 'thread', 'hardware', 'assembly'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 20,6 20,18 12,22 4,18 4,6"/>
  <circle cx="12" cy="12" r="4"/>
</svg>`,
  },
  {
    id: 'eng-bearing',
    name: 'Bearing',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['ball bearing', 'rotation', 'friction', 'shaft', 'support'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="4"/>
  <circle cx="12" cy="4" r="1.5"/>
  <circle cx="12" cy="20" r="1.5"/>
  <circle cx="4" cy="12" r="1.5"/>
  <circle cx="20" cy="12" r="1.5"/>
  <circle cx="6.34" cy="6.34" r="1.5"/>
  <circle cx="17.66" cy="17.66" r="1.5"/>
  <circle cx="6.34" cy="17.66" r="1.5"/>
  <circle cx="17.66" cy="6.34" r="1.5"/>
</svg>`,
  },
  {
    id: 'eng-piston',
    name: 'Piston',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['cylinder', 'engine', 'reciprocating', 'combustion', 'stroke'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="2" width="12" height="8" rx="1"/>
  <path d="M10 10v4"/>
  <path d="M14 10v4"/>
  <circle cx="12" cy="17" r="3"/>
  <path d="M12 20v2"/>
</svg>`,
  },
  {
    id: 'eng-transformer',
    name: 'Transformer',
    domain: 'engineering',
    category: 'electrical',
    tags: ['voltage', 'coil', 'power', 'AC', 'induction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 6v12"/>
  <path d="M22 6v12"/>
  <path d="M6 6c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M6 12c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M14 6c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M14 12c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M14 18c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <rect x="10" y="4" width="4" height="16"/>
</svg>`,
  },
  {
    id: 'eng-diode',
    name: 'Diode',
    domain: 'engineering',
    category: 'electrical',
    tags: ['semiconductor', 'rectifier', 'LED', 'current', 'one-way'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h6"/>
  <path d="M16 12h6"/>
  <polygon points="8,6 16,12 8,18"/>
  <path d="M16 6v12"/>
</svg>`,
  },
  {
    id: 'eng-chip',
    name: 'Microchip',
    domain: 'engineering',
    category: 'electrical',
    tags: ['IC', 'processor', 'integrated circuit', 'CPU', 'semiconductor'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="6" width="12" height="12" rx="1"/>
  <path d="M9 2v4"/>
  <path d="M15 2v4"/>
  <path d="M9 18v4"/>
  <path d="M15 18v4"/>
  <path d="M2 9h4"/>
  <path d="M2 15h4"/>
  <path d="M18 9h4"/>
  <path d="M18 15h4"/>
  <rect x="9" y="9" width="6" height="6"/>
</svg>`,
  },
  {
    id: 'eng-sensor',
    name: 'Sensor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['detector', 'measurement', 'transducer', 'signal', 'input'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <path d="M6 12c0-3.3 2.7-6 6-6"/>
  <path d="M18 12c0 3.3-2.7 6-6 6"/>
</svg>`,
  },
  {
    id: 'eng-antenna',
    name: 'Antenna',
    domain: 'engineering',
    category: 'electrical',
    tags: ['radio', 'wireless', 'transmission', 'receiver', 'signal'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22v-10"/>
  <path d="M12 12l-8-8"/>
  <path d="M12 12l8-8"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M6 8c-1-1-2-3-2-4"/>
  <path d="M18 8c1-1 2-3 2-4"/>
</svg>`,
  },
  {
    id: 'eng-pump',
    name: 'Pump',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['fluid', 'pressure', 'flow', 'hydraulic', 'centrifugal'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <path d="M2 12h4"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M9 9l6 6"/>
  <path d="M15 9l-6 6"/>
</svg>`,
  },
];

export default engineeringIcons;
