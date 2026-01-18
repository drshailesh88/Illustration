/**
 * colors/index.ts
 * Color scheme exports for FINNISH scientific illustration
 *
 * Provides domain-specific color palettes for medical and scientific specialties
 *
 * NOTE: Each specialty exports their own types locally (like FlowchartColors,
 * SeverityGradient, PathologyColors). To avoid conflicts, we export:
 * 1. The default color scheme from each specialty (e.g., pulmonologyColorScheme)
 * 2. Unique color exports from each specialty with prefixes where needed
 * 3. The main ColorScheme type from each specialty
 */

// =============================================================================
// PULMONOLOGY
// =============================================================================

export {
  airwayColors,
  lungTissueColors,
  oxygenationColors,
  pathologyColors as pulmonologyPathologyColors,
  severityGradient as pulmonologySeverityGradient,
  diagnosticColors as pulmonologyDiagnosticColors,
  ventilatorColors,
  sleepStudyColors,
  flowchartColors as pulmonologyFlowchartColors,
  pulmonologyColorScheme,
} from './pulmonology';

export type { PulmonologyColorScheme } from './pulmonology';

// =============================================================================
// EMERGENCY MEDICINE
// =============================================================================

export {
  emergencyMedicineColors,
  getTriageColor,
  getVitalColor,
  getTraumaColor,
  generateCSSVariables as generateEmergencyCSSVariables,
} from './emergency-medicine';

export type { EmergencyMedicineColorScheme, TriageColor, ColorVariant } from './emergency-medicine';

// =============================================================================
// GASTROENTEROLOGY
// =============================================================================

export {
  giTractColors,
  hepatobiliaryColors,
  pancreaticColors,
  mucosalColors,
  pathologyColors as gastroPathologyColors,
  severityGradient as gastroSeverityGradient,
  endoscopyColors,
  scoringColors,
  procedureColors as gastroProcedureColors,
  flowchartColors as gastroFlowchartColors,
  gastroenterologyColorScheme,
} from './gastroenterology';

export type { GastroenterologyColorScheme } from './gastroenterology';

// =============================================================================
// NEPHROLOGY
// =============================================================================

export {
  kidneyAnatomyColors,
  nephronColors,
  glomerularColors,
  urineColors,
  electrolyteColors,
  dialysisColors,
  transplantColors,
  pathologyColors as nephroPathologyColors,
  ckdStagingColors,
  akiStagingColors,
  urinalysisColors,
  severityGradient as nephroSeverityGradient,
  flowchartColors as nephroFlowchartColors,
  nephrologyColorScheme,
} from './nephrology';

export type { NephrologyColorScheme } from './nephrology';

// =============================================================================
// INFECTIOUS DISEASE
// =============================================================================

export {
  bacteriaColors,
  virusColors,
  fungiColors,
  parasiteColors,
  antibioticColors,
  antiviralColors,
  infectionControlColors,
  resistanceColors,
  vaccineColors,
  diagnosticColors as infectiousDiagnosticColors,
  severityGradient as infectiousSeverityGradient,
  flowchartColors as infectiousFlowchartColors,
  infectiousDiseaseColorScheme,
} from './infectious-disease';

export type { InfectiousDiseaseColorScheme } from './infectious-disease';

// =============================================================================
// ENDOCRINOLOGY
// =============================================================================

export {
  glandColors,
  hormoneColors,
  feedbackColors,
  diabetesColors,
  thyroidColors,
  adrenalColors,
  pituitaryColors,
  boneCalciumColors,
  metabolicColors,
  severityGradient as endocrineSeverityGradient,
  flowchartColors as endocrineFlowchartColors,
  endocrinologyColorScheme,
} from './endocrinology';

export type { EndocrinologyColorScheme } from './endocrinology';

// =============================================================================
// HEMATOLOGY-ONCOLOGY
// =============================================================================

export {
  rbcColors,
  wbcColors,
  plateletColors,
  boneMarrowColors,
  coagulationColors,
  malignancyColors,
  anemiaColors,
  hemoncSeverityGradient,
  stagingColors,
  treatmentColors as hemoncoTreatmentColors,
  anticoagulantColors,
  hemoncDiagnosticColors,
  hemoncFlowchartColors,
  hematologyOncologyColorScheme,
} from './hematology-oncology';

export type { HematologyOncologyColorScheme } from './hematology-oncology';

// =============================================================================
// ORTHOPEDICS
// =============================================================================

export {
  boneColors,
  softTissueColors,
  jointColors,
  orthoPathologyColors,
  fractureColors,
  implantColors,
  healingPhaseColors,
  imagingColors,
  gustiloColors,
  rehabPhaseColors,
  weightBearingColors,
  spineColors,
  severityGradient as orthoSeverityGradient,
  flowchartColors as orthoFlowchartColors,
  orthopedicsColorScheme,
} from './orthopedics';

export type { OrthopedicsColorScheme } from './orthopedics';
