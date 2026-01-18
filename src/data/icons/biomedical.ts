/**
 * Biomedical Engineering Icon Library
 * Comprehensive SVG icons for biomedical engineering
 *
 * Categories:
 * - Prosthetics & Orthotics (limbs, joints, braces)
 * - Medical Imaging (MRI, CT, ultrasound, X-ray)
 * - Implants (cardiac, neural, orthopedic)
 * - Biosensors (glucose, ECG, EEG, pulse ox)
 * - Medical Devices (dialysis, ventilators, pumps)
 * - Tissue Engineering (scaffolds, bioreactors, cells)
 */

import type { IconDefinition } from './index';

export const biomedicalIcons: IconDefinition[] = [
  // ===========================================================================
  // PROSTHETICS & ORTHOTICS
  // ===========================================================================
  {
    id: 'biomed-prosthetic-leg',
    name: 'Prosthetic Leg',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['prosthetic', 'leg', 'limb', 'amputation', 'mobility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="6"/>
      <path d="M20 12v8c0 4 5.4 8 12 8s12-4 12-8v-8"/>
      <rect x="28" y="28" width="8" height="20" rx="2"/>
      <circle cx="32" cy="52" r="4"/>
      <path d="M28 52h-8c-2 0-4 2-4 4v4h32v-4c0-2-2-4-4-4h-8"/>
      <path d="M30 32h4"/>
      <path d="M30 40h4"/>
    </svg>`
  },
  {
    id: 'biomed-prosthetic-arm',
    name: 'Prosthetic Arm',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['prosthetic', 'arm', 'limb', 'hand', 'myoelectric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="20" rx="6" ry="10"/>
      <rect x="18" y="14" width="20" height="12" rx="2"/>
      <rect x="38" y="16" width="12" height="8" rx="2"/>
      <path d="M50 18v4"/>
      <path d="M54 16v4c0 2-2 4-4 4"/>
      <path d="M58 18v4c0 2-2 4-4 4"/>
      <path d="M54 28h4c2 0 4 2 4 4v4"/>
      <path d="M22 26v4"/>
      <path d="M30 26v4"/>
      <circle cx="26" cy="20" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'biomed-knee-brace',
    name: 'Knee Brace',
    domain: 'engineering',
    category: 'orthotics',
    tags: ['brace', 'knee', 'orthotic', 'support', 'joint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v16l-4 8 4 8v16H24v-16l4-8-4-8z"/>
      <path d="M20 12h4"/>
      <path d="M40 12h4"/>
      <path d="M20 52h4"/>
      <path d="M40 52h4"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M28 32h8"/>
      <path d="M32 28v8"/>
      <path d="M24 24h16" stroke-dasharray="2 2"/>
      <path d="M24 40h16" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-exoskeleton',
    name: 'Exoskeleton',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['exoskeleton', 'robotic', 'assistance', 'mobility', 'powered'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v8H24z"/>
      <path d="M20 16h24v12H20z"/>
      <path d="M24 28v8"/>
      <path d="M40 28v8"/>
      <circle cx="24" cy="40" r="4"/>
      <circle cx="40" cy="40" r="4"/>
      <path d="M24 44v8"/>
      <path d="M40 44v8"/>
      <rect x="20" y="52" width="8" height="4"/>
      <rect x="36" y="52" width="8" height="4"/>
      <path d="M28 12h8"/>
      <circle cx="32" cy="22" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-hearing-aid',
    name: 'Hearing Aid',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['hearing', 'aid', 'cochlear', 'audio', 'assistive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20c8-8 24-8 24 8v16c0 8-8 12-12 12"/>
      <path d="M32 56v4"/>
      <circle cx="32" cy="36" r="8"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M44 28c4 0 8 4 8 8"/>
      <path d="M12 28c-4 0-8 4-8 8s4 8 8 8"/>
      <path d="M24 20c4-4 12-4 12 4"/>
    </svg>`
  },

  // ===========================================================================
  // MEDICAL IMAGING
  // ===========================================================================
  {
    id: 'biomed-mri-scanner',
    name: 'MRI Scanner',
    domain: 'engineering',
    category: 'imaging',
    tags: ['MRI', 'scanner', 'magnetic', 'resonance', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="32" cy="32" rx="16" ry="12"/>
      <path d="M4 32h12"/>
      <path d="M48 32h12"/>
      <rect x="20" y="28" width="24" height="8" fill="currentColor" opacity="0.1"/>
      <path d="M16 44v8h32v-8"/>
      <circle cx="24" cy="50" r="2"/>
      <circle cx="40" cy="50" r="2"/>
    </svg>`
  },
  {
    id: 'biomed-ct-scanner',
    name: 'CT Scanner',
    domain: 'engineering',
    category: 'imaging',
    tags: ['CT', 'scanner', 'computed', 'tomography', 'X-ray'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="20"/>
      <circle cx="32" cy="28" r="12"/>
      <path d="M32 8v-4"/>
      <path d="M32 48v8"/>
      <path d="M12 28H8"/>
      <path d="M56 28h-4"/>
      <rect x="24" y="56" width="16" height="4" rx="1"/>
      <path d="M20 24h24v8H20z" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="28" r="4"/>
    </svg>`
  },
  {
    id: 'biomed-ultrasound',
    name: 'Ultrasound Probe',
    domain: 'engineering',
    category: 'imaging',
    tags: ['ultrasound', 'probe', 'sonography', 'transducer', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16c4 0 8 4 8 8v32c0 4-4 8-8 8H24c-4 0-8-4-8-8V16c0-4 4-8 8-8z"/>
      <ellipse cx="32" cy="48" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <path d="M28 16h8"/>
      <circle cx="32" cy="28" r="6"/>
      <path d="M28 28h8"/>
      <path d="M32 24v8"/>
      <path d="M20 48c4-2 8-2 12 0s8 2 12 0"/>
    </svg>`
  },
  {
    id: 'biomed-xray',
    name: 'X-Ray Machine',
    domain: 'engineering',
    category: 'imaging',
    tags: ['X-ray', 'radiography', 'imaging', 'diagnostic', 'radiation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="16" rx="2"/>
      <path d="M32 24v8"/>
      <path d="M28 32l8 8"/>
      <path d="M36 32l-8 8"/>
      <rect x="12" y="44" width="40" height="16" rx="2"/>
      <circle cx="32" cy="16" r="4"/>
      <path d="M32 12v-4"/>
      <path d="M28 52h8"/>
      <path d="M28 56h8"/>
    </svg>`
  },
  {
    id: 'biomed-endoscope',
    name: 'Endoscope',
    domain: 'engineering',
    category: 'imaging',
    tags: ['endoscope', 'camera', 'minimally invasive', 'scope', 'visualization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="48" r="8"/>
      <circle cx="16" cy="48" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M24 48h24c4 0 8-4 8-8V16"/>
      <path d="M56 16v-8h-8"/>
      <circle cx="52" cy="8" r="4"/>
      <path d="M36 48v8"/>
      <path d="M32 52h8"/>
      <path d="M56 24l-4 4"/>
    </svg>`
  },

  // ===========================================================================
  // IMPLANTS
  // ===========================================================================
  {
    id: 'biomed-pacemaker',
    name: 'Pacemaker',
    domain: 'engineering',
    category: 'implants',
    tags: ['pacemaker', 'cardiac', 'implant', 'rhythm', 'electrical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="4"/>
      <path d="M24 20v-8c4-4 16-4 16 0v8"/>
      <path d="M40 12c4 0 8 4 8 8"/>
      <path d="M24 12c-4 0-8 4-8 8"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M29 32h6"/>
      <path d="M32 29v6"/>
      <path d="M20 40h8"/>
      <path d="M36 40h8"/>
    </svg>`
  },
  {
    id: 'biomed-cochlear-implant',
    name: 'Cochlear Implant',
    domain: 'engineering',
    category: 'implants',
    tags: ['cochlear', 'implant', 'hearing', 'neural', 'auditory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="24" r="12"/>
      <circle cx="20" cy="24" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M32 24c8 0 12 8 12 16"/>
      <path d="M44 40c0 8-4 16-12 16"/>
      <path d="M32 56c-8 0-16-4-16-12"/>
      <path d="M16 44v-8"/>
      <circle cx="44" cy="40" r="4"/>
      <path d="M20 24h8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-hip-implant',
    name: 'Hip Implant',
    domain: 'engineering',
    category: 'implants',
    tags: ['hip', 'implant', 'joint', 'replacement', 'orthopedic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="16" r="8"/>
      <path d="M28 24l-4 32"/>
      <path d="M36 24l4 32"/>
      <path d="M24 56h16"/>
      <ellipse cx="32" cy="16" rx="4" ry="4"/>
      <path d="M28 32h8"/>
      <path d="M27 44h10"/>
    </svg>`
  },
  {
    id: 'biomed-stent',
    name: 'Vascular Stent',
    domain: 'engineering',
    category: 'implants',
    tags: ['stent', 'vascular', 'coronary', 'implant', 'mesh'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="4" ry="12"/>
      <ellipse cx="48" cy="32" rx="4" ry="12"/>
      <path d="M16 20h32"/>
      <path d="M16 44h32"/>
      <path d="M20 24l8 8-8 8"/>
      <path d="M28 24l8 8-8 8"/>
      <path d="M36 24l8 8-8 8"/>
      <path d="M20 24l8-4"/>
      <path d="M28 24l8-4"/>
      <path d="M36 24l8-4"/>
    </svg>`
  },
  {
    id: 'biomed-neural-implant',
    name: 'Neural Implant',
    domain: 'engineering',
    category: 'implants',
    tags: ['neural', 'implant', 'brain', 'electrode', 'interface'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="16" rx="2"/>
      <path d="M24 24v8"/>
      <path d="M32 24v12"/>
      <path d="M40 24v8"/>
      <circle cx="24" cy="36" r="2" fill="currentColor"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <circle cx="40" cy="36" r="2" fill="currentColor"/>
      <path d="M20 48c12-8 24 0 24 8"/>
      <path d="M16 48c16-12 32 0 32 12"/>
      <path d="M32 8v-4"/>
    </svg>`
  },

  // ===========================================================================
  // BIOSENSORS
  // ===========================================================================
  {
    id: 'biomed-glucose-sensor',
    name: 'Glucose Sensor',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['glucose', 'sensor', 'diabetes', 'CGM', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="8"/>
      <path d="M16 24v16c0 4.4 7.2 8 16 8s16-3.6 16-8V24"/>
      <path d="M32 16v-8"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M24 32h16"/>
      <path d="M32 28v8"/>
      <text x="24" y="44" font-size="6" fill="currentColor" stroke="none">mg/dL</text>
    </svg>`
  },
  {
    id: 'biomed-ecg-electrode',
    name: 'ECG Electrode',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['ECG', 'electrode', 'cardiac', 'monitoring', 'patch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M32 16v-8"/>
      <path d="M28 8h8"/>
      <path d="M20 28l6 4-3 8 6-4 6 4-3-8 6-4"/>
      <path d="M32 48v8"/>
    </svg>`
  },
  {
    id: 'biomed-pulse-oximeter',
    name: 'Pulse Oximeter',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['pulse', 'oximeter', 'SpO2', 'oxygen', 'saturation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="24" rx="4"/>
      <path d="M16 32c-4 0-8 4-8 8s4 8 8 8"/>
      <path d="M48 32c4 0 8 4 8 8s-4 8-8 8"/>
      <rect x="20" y="28" width="24" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="24" y="38" font-size="8" fill="currentColor" stroke="none">98%</text>
      <path d="M32 44v4"/>
    </svg>`
  },
  {
    id: 'biomed-eeg-cap',
    name: 'EEG Cap',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['EEG', 'cap', 'brain', 'electrodes', 'neural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 40c0-16 9-28 20-28s20 12 20 28"/>
      <path d="M12 40h40"/>
      <circle cx="20" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="16" r="2" fill="currentColor"/>
      <circle cx="44" cy="24" r="2" fill="currentColor"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <path d="M20 24v16"/>
      <path d="M32 16v24"/>
      <path d="M44 24v16"/>
      <path d="M32 44v8"/>
    </svg>`
  },
  {
    id: 'biomed-blood-pressure',
    name: 'Blood Pressure Cuff',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['blood pressure', 'cuff', 'sphygmomanometer', 'BP', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <path d="M8 28h4"/>
      <path d="M8 36h4"/>
      <path d="M52 28h4"/>
      <path d="M52 36h4"/>
      <rect x="20" y="24" width="24" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="22" y="34" font-size="6" fill="currentColor" stroke="none">120/80</text>
      <circle cx="32" cy="52" r="6"/>
      <path d="M32 44v2"/>
    </svg>`
  },

  // ===========================================================================
  // MEDICAL DEVICES
  // ===========================================================================
  {
    id: 'biomed-dialysis',
    name: 'Dialysis Machine',
    domain: 'engineering',
    category: 'devices',
    tags: ['dialysis', 'kidney', 'hemodialysis', 'filtration', 'blood'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="4"/>
      <rect x="24" y="12" width="16" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M28 36c0-4 4-8 8-4"/>
      <path d="M36 36c0 4-4 8-8 4"/>
      <path d="M8 24h12"/>
      <path d="M44 24h12"/>
      <path d="M8 48h12"/>
      <path d="M44 48h12"/>
      <circle cx="8" cy="24" r="2"/>
      <circle cx="56" cy="48" r="2"/>
    </svg>`
  },
  {
    id: 'biomed-ventilator',
    name: 'Ventilator',
    domain: 'engineering',
    category: 'devices',
    tags: ['ventilator', 'breathing', 'respiratory', 'ICU', 'support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="40" rx="4"/>
      <rect x="20" y="12" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M24 20c2-4 4-4 6 0s4 4 6 0"/>
      <circle cx="24" cy="36" r="4"/>
      <circle cx="40" cy="36" r="4"/>
      <path d="M32 48v8"/>
      <path d="M28 56c4 4 8 0 8 0"/>
      <path d="M8 20h8"/>
      <path d="M48 20h8"/>
    </svg>`
  },
  {
    id: 'biomed-infusion-pump',
    name: 'Infusion Pump',
    domain: 'engineering',
    category: 'devices',
    tags: ['infusion', 'pump', 'IV', 'medication', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="4"/>
      <rect x="20" y="16" width="24" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M32 8v4"/>
      <path d="M32 52v4"/>
      <rect x="24" y="32" width="16" height="16" rx="2"/>
      <path d="M28 36v8"/>
      <path d="M32 36v8"/>
      <path d="M36 36v8"/>
      <text x="24" y="24" font-size="6" fill="currentColor" stroke="none">mL/h</text>
    </svg>`
  },
  {
    id: 'biomed-defibrillator',
    name: 'Defibrillator',
    domain: 'engineering',
    category: 'devices',
    tags: ['defibrillator', 'AED', 'cardiac', 'shock', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <path d="M20 28l6 8-6 8"/>
      <path d="M44 28l-6 8 6 8"/>
      <path d="M32 24v16"/>
      <path d="M24 32h16"/>
      <circle cx="20" cy="52" r="2"/>
      <circle cx="44" cy="52" r="2"/>
      <path d="M20 54v4"/>
      <path d="M44 54v4"/>
      <rect x="28" y="12" width="8" height="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-surgical-robot',
    name: 'Surgical Robot',
    domain: 'engineering',
    category: 'devices',
    tags: ['surgical', 'robot', 'minimally invasive', 'precision', 'da Vinci'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="12" rx="2"/>
      <path d="M32 20v8"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M20 32h8"/>
      <path d="M36 32h8"/>
      <path d="M12 28l8 4"/>
      <path d="M52 28l-8 4"/>
      <path d="M12 28v20"/>
      <path d="M52 28v20"/>
      <path d="M8 48h8"/>
      <path d="M48 48h8"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // TISSUE ENGINEERING
  // ===========================================================================
  {
    id: 'biomed-scaffold',
    name: 'Tissue Scaffold',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['scaffold', 'tissue', 'engineering', 'matrix', '3D'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h32v32H16z"/>
      <path d="M16 16l8-8h32v32l-8 8"/>
      <path d="M48 8v32"/>
      <path d="M16 48h32"/>
      <path d="M24 16v32"/>
      <path d="M32 16v32"/>
      <path d="M40 16v32"/>
      <path d="M16 24h32"/>
      <path d="M16 32h32"/>
      <path d="M16 40h32"/>
    </svg>`
  },
  {
    id: 'biomed-bioreactor',
    name: 'Bioreactor',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['bioreactor', 'cell culture', 'fermentation', 'growth', 'vessel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="14" ry="6"/>
      <path d="M18 16v32c0 4 6.3 8 14 8s14-4 14-8V16"/>
      <path d="M32 10v-6"/>
      <path d="M32 16v24"/>
      <path d="M28 32l8-8"/>
      <path d="M36 32l-8-8"/>
      <path d="M10 28h8"/>
      <path d="M46 40h8"/>
      <circle cx="10" cy="28" r="2"/>
      <circle cx="54" cy="40" r="2"/>
      <path d="M22 44h20" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-cell-culture',
    name: 'Cell Culture Plate',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['cell', 'culture', 'plate', 'wells', 'petri'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <circle cx="20" cy="28" r="4"/>
      <circle cx="32" cy="28" r="4"/>
      <circle cx="44" cy="28" r="4"/>
      <circle cx="20" cy="40" r="4"/>
      <circle cx="32" cy="40" r="4"/>
      <circle cx="44" cy="40" r="4"/>
      <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="40" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-3d-bioprinter',
    name: '3D Bioprinter',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['bioprinter', '3D', 'printing', 'tissue', 'additive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M8 16h48"/>
      <path d="M32 16v-4"/>
      <rect x="24" y="20" width="16" height="8" rx="2"/>
      <path d="M32 28v8"/>
      <path d="M28 36l4 4 4-4"/>
      <rect x="16" y="44" width="32" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 48h24" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-organ-chip',
    name: 'Organ-on-a-Chip',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['organ', 'chip', 'microfluidic', 'model', 'testing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="2"/>
      <path d="M12 28h8"/>
      <path d="M44 28h8"/>
      <path d="M12 36h8"/>
      <path d="M44 36h8"/>
      <rect x="24" y="24" width="16" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 28h4v8h16v-8h4"/>
      <circle cx="28" cy="32" r="2" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
      <path d="M28 32h8"/>
    </svg>`
  }
];

export default biomedicalIcons;
