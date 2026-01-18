/**
 * Cell Biology Color Scheme
 * Domain-specific color palette for cell biology illustrations
 *
 * Provides consistent color coding for:
 * - Organelles and cellular structures
 * - Cell membranes and components
 * - Cell cycle phases
 * - Signaling pathways
 * - Cell types and states
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface CellBiologyColorScheme {
  organelles: OrganelleColors;
  membrane: MembraneColors;
  cellCycle: CellCycleColors;
  signaling: SignalingColors;
  transport: TransportColors;
  cytoskeleton: CytoskeletonColors;
  cellDeath: CellDeathColors;
  cellTypes: CellTypeColors;
  flowchart: FlowchartColors;
  severity: SeverityGradient;
}

export interface OrganelleColors {
  nucleus: string;
  nucleolus: string;
  mitochondria: string;
  er: { rough: string; smooth: string };
  golgi: string;
  lysosome: string;
  peroxisome: string;
  vacuole: string;
  chloroplast: string;
  ribosome: string;
  centrosome: string;
}

export interface MembraneColors {
  phospholipidHead: string;
  phospholipidTail: string;
  integralProtein: string;
  peripheralProtein: string;
  cholesterol: string;
  glycocalyx: string;
  ionChannel: string;
  receptor: string;
}

export interface CellCycleColors {
  g0: string;
  g1: string;
  s: string;
  g2: string;
  m: string;
  checkpoint: string;
  cyclin: string;
  cdk: string;
}

export interface SignalingColors {
  ligand: string;
  receptor: string;
  gProtein: string;
  secondMessenger: string;
  kinase: string;
  transcriptionFactor: string;
  phosphorylation: string;
}

export interface TransportColors {
  passive: string;
  active: string;
  vesicle: string;
  clathrin: string;
  copi: string;
  copii: string;
  snare: string;
}

export interface CytoskeletonColors {
  actin: string;
  microtubule: string;
  intermediateFilament: string;
  motorProtein: string;
  mtoc: string;
}

export interface CellDeathColors {
  apoptosis: string;
  necrosis: string;
  autophagy: string;
  caspase: string;
  bcl2: string;
}

export interface CellTypeColors {
  epithelial: string;
  muscle: string;
  neuron: string;
  erythrocyte: string;
  leukocyte: string;
  stemCell: string;
}

export interface FlowchartColors {
  process: string;
  decision: string;
  start: string;
  end: string;
  connection: string;
  highlight: string;
}

export interface SeverityGradient {
  normal: string;
  mild: string;
  moderate: string;
  severe: string;
  critical: string;
}

// =============================================================================
// ORGANELLE COLORS
// =============================================================================

export const organelleColors: OrganelleColors = {
  nucleus: '#9B59B6',        // Purple - distinguishable, consistent across biology
  nucleolus: '#7D3C98',      // Darker purple
  mitochondria: '#E74C3C',   // Red - powerhouse, energy
  er: {
    rough: '#3498DB',        // Blue - with ribosomes
    smooth: '#5DADE2',       // Lighter blue - lipid synthesis
  },
  golgi: '#F39C12',          // Gold/Orange - packaging center
  lysosome: '#8E44AD',       // Dark purple - digestive
  peroxisome: '#27AE60',     // Green - oxidation
  vacuole: '#87CEEB',        // Light blue - storage
  chloroplast: '#2ECC71',    // Bright green - photosynthesis
  ribosome: '#34495E',       // Dark gray - protein factories
  centrosome: '#F1C40F',     // Yellow - cell division
};

// =============================================================================
// MEMBRANE COLORS
// =============================================================================

export const membraneColors: MembraneColors = {
  phospholipidHead: '#3498DB',    // Blue - hydrophilic
  phospholipidTail: '#F7DC6F',    // Yellow - hydrophobic
  integralProtein: '#27AE60',     // Green - spans membrane
  peripheralProtein: '#9B59B6',   // Purple - attached
  cholesterol: '#F39C12',         // Orange - fluidity regulator
  glycocalyx: '#E74C3C',          // Red - carbohydrate coating
  ionChannel: '#2ECC71',          // Bright green - ion passage
  receptor: '#E67E22',            // Dark orange - signal detection
};

// =============================================================================
// CELL CYCLE COLORS
// =============================================================================

export const cellCycleColors: CellCycleColors = {
  g0: '#95A5A6',    // Gray - quiescent
  g1: '#3498DB',    // Blue - growth
  s: '#27AE60',     // Green - DNA synthesis
  g2: '#F39C12',    // Orange - preparation
  m: '#E74C3C',     // Red - mitosis
  checkpoint: '#FFC107',   // Yellow - control points
  cyclin: '#9B59B6',       // Purple - regulatory protein
  cdk: '#1ABC9C',          // Teal - kinase
};

// =============================================================================
// SIGNALING COLORS
// =============================================================================

export const signalingColors: SignalingColors = {
  ligand: '#E74C3C',           // Red - signal molecule
  receptor: '#27AE60',         // Green - membrane receptor
  gProtein: '#F39C12',         // Orange - signal transducer
  secondMessenger: '#3498DB',  // Blue - cAMP, Ca2+
  kinase: '#9B59B6',           // Purple - phosphorylation enzyme
  transcriptionFactor: '#1ABC9C', // Teal - gene regulation
  phosphorylation: '#F1C40F',  // Yellow - phosphate groups
};

// =============================================================================
// TRANSPORT COLORS
// =============================================================================

export const transportColors: TransportColors = {
  passive: '#87CEEB',    // Light blue - no energy
  active: '#E74C3C',     // Red - ATP required
  vesicle: '#F39C12',    // Orange - membrane-bound
  clathrin: '#E74C3C',   // Red - coated pit
  copi: '#9B59B6',       // Purple - retrograde
  copii: '#3498DB',      // Blue - anterograde
  snare: '#27AE60',      // Green - fusion
};

// =============================================================================
// CYTOSKELETON COLORS
// =============================================================================

export const cytoskeletonColors: CytoskeletonColors = {
  actin: '#E74C3C',            // Red - microfilaments (7nm)
  microtubule: '#27AE60',      // Green - tubulin (25nm)
  intermediateFilament: '#9B59B6', // Purple - structural (10nm)
  motorProtein: '#F39C12',     // Orange - kinesin/dynein
  mtoc: '#F1C40F',             // Yellow - organizing center
};

// =============================================================================
// CELL DEATH COLORS
// =============================================================================

export const cellDeathColors: CellDeathColors = {
  apoptosis: '#9B59B6',   // Purple - programmed death
  necrosis: '#E74C3C',    // Red - uncontrolled death
  autophagy: '#3498DB',   // Blue - self-eating
  caspase: '#E67E22',     // Orange - execution enzymes
  bcl2: '#27AE60',        // Green - survival proteins
};

// =============================================================================
// CELL TYPE COLORS
// =============================================================================

export const cellTypeColors: CellTypeColors = {
  epithelial: '#FFE4E1',  // Light pink - barrier cells
  muscle: '#E74C3C',      // Red - contractile
  neuron: '#9B59B6',      // Purple - nerve cells
  erythrocyte: '#E74C3C', // Red - oxygen transport
  leukocyte: '#87CEEB',   // Light blue - immune
  stemCell: '#27AE60',    // Green - regenerative
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

export const flowchartColors: FlowchartColors = {
  process: '#3498DB',     // Blue - action steps
  decision: '#F39C12',    // Orange - choice points
  start: '#27AE60',       // Green - beginning
  end: '#E74C3C',         // Red - termination
  connection: '#95A5A6',  // Gray - links
  highlight: '#F1C40F',   // Yellow - emphasis
};

// =============================================================================
// SEVERITY GRADIENT
// =============================================================================

export const severityGradient: SeverityGradient = {
  normal: '#27AE60',     // Green - healthy
  mild: '#F1C40F',       // Yellow - minimal change
  moderate: '#F39C12',   // Orange - noticeable change
  severe: '#E67E22',     // Dark orange - significant
  critical: '#E74C3C',   // Red - emergency
};

// =============================================================================
// COMPLETE COLOR SCHEME
// =============================================================================

export const cellBiologyColorScheme: CellBiologyColorScheme = {
  organelles: organelleColors,
  membrane: membraneColors,
  cellCycle: cellCycleColors,
  signaling: signalingColors,
  transport: transportColors,
  cytoskeleton: cytoskeletonColors,
  cellDeath: cellDeathColors,
  cellTypes: cellTypeColors,
  flowchart: flowchartColors,
  severity: severityGradient,
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get color for a specific organelle
 */
export function getOrganelleColor(organelle: keyof OrganelleColors): string {
  const color = organelleColors[organelle];
  if (typeof color === 'string') {
    return color;
  }
  // Handle ER which has rough and smooth
  if (organelle === 'er') {
    return organelleColors.er.rough;
  }
  return '#333333';
}

/**
 * Get color for cell cycle phase
 */
export function getCellCycleColor(phase: keyof CellCycleColors): string {
  return cellCycleColors[phase] || '#333333';
}

/**
 * Get color for signaling component
 */
export function getSignalingColor(component: keyof SignalingColors): string {
  return signalingColors[component] || '#333333';
}

/**
 * Get color for transport type
 */
export function getTransportColor(type: keyof TransportColors): string {
  return transportColors[type] || '#333333';
}

/**
 * Get severity color by level (0-4)
 */
export function getSeverityColor(level: number): string {
  const levels = [
    severityGradient.normal,
    severityGradient.mild,
    severityGradient.moderate,
    severityGradient.severe,
    severityGradient.critical,
  ];
  return levels[Math.min(Math.max(0, level), 4)];
}

/**
 * Generate CSS custom properties for cell biology colors
 */
export function generateCSSVariables(): string {
  return `
    /* Cell Biology Color Scheme */
    /* Organelles */
    --cell-nucleus: ${organelleColors.nucleus};
    --cell-nucleolus: ${organelleColors.nucleolus};
    --cell-mitochondria: ${organelleColors.mitochondria};
    --cell-er-rough: ${organelleColors.er.rough};
    --cell-er-smooth: ${organelleColors.er.smooth};
    --cell-golgi: ${organelleColors.golgi};
    --cell-lysosome: ${organelleColors.lysosome};
    --cell-peroxisome: ${organelleColors.peroxisome};
    --cell-vacuole: ${organelleColors.vacuole};
    --cell-chloroplast: ${organelleColors.chloroplast};
    --cell-ribosome: ${organelleColors.ribosome};
    --cell-centrosome: ${organelleColors.centrosome};

    /* Membrane */
    --membrane-head: ${membraneColors.phospholipidHead};
    --membrane-tail: ${membraneColors.phospholipidTail};
    --membrane-protein: ${membraneColors.integralProtein};
    --membrane-cholesterol: ${membraneColors.cholesterol};

    /* Cell Cycle */
    --cycle-g0: ${cellCycleColors.g0};
    --cycle-g1: ${cellCycleColors.g1};
    --cycle-s: ${cellCycleColors.s};
    --cycle-g2: ${cellCycleColors.g2};
    --cycle-m: ${cellCycleColors.m};
    --cycle-checkpoint: ${cellCycleColors.checkpoint};

    /* Signaling */
    --signal-ligand: ${signalingColors.ligand};
    --signal-receptor: ${signalingColors.receptor};
    --signal-kinase: ${signalingColors.kinase};

    /* Cytoskeleton */
    --cyto-actin: ${cytoskeletonColors.actin};
    --cyto-microtubule: ${cytoskeletonColors.microtubule};
    --cyto-intermediate: ${cytoskeletonColors.intermediateFilament};
  `;
}

export default cellBiologyColorScheme;
