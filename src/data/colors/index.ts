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

// =============================================================================
// ANESTHESIOLOGY
// =============================================================================

export {
  airwayColors as anesthesiaAirwayColors,
  monitoringColors,
  anestheticAgentColors,
  regionalColors,
  vascularAccessColors,
  painManagementColors,
  asaStatusColors,
  mallampatiColors,
  sedationDepthColors,
  complicationColors as anesthesiaComplicationColors,
  equipmentColors as anesthesiaEquipmentColors,
  flowchartColors as anesthesiaFlowchartColors,
  anesthesiologyColorScheme,
} from './anesthesiology';

export type { AnesthesiologyColorScheme } from './anesthesiology';

// =============================================================================
// RADIOLOGY
// =============================================================================

export {
  modalityColors,
  ctDensityColors,
  mriSignalColors,
  pathologyColors as radioPathologyColors,
  contrastPhaseColors,
  radiationColors,
  nuclearColors,
  ultrasoundColors,
  anatomyColors as radioAnatomyColors,
  workflowColors,
  reportingColors,
  interventionalColors,
  flowchartColors as radioFlowchartColors,
  severityGradient as radioSeverityGradient,
  radiologyColorScheme,
} from './radiology';

export type { RadiologyColorScheme } from './radiology';

// =============================================================================
// OPHTHALMOLOGY
// =============================================================================

export {
  eyeAnatomyColors,
  anteriorSegmentColors,
  posteriorSegmentColors,
  vasculatureColors as ophthoVasculatureColors,
  pathologyAnteriorColors,
  pathologyPosteriorColors,
  severityColors as ophthoSeverityColors,
  diagnosticsColors as ophthoDiagnosticsColors,
  surgicalColors as ophthoSurgicalColors,
  laserColors,
  ophthalmologyColorScheme,
} from './ophthalmology';

export type { OphthalmologyColorScheme } from './ophthalmology';

// =============================================================================
// ENT (Otolaryngology)
// =============================================================================

export {
  earColors,
  innerEarColors,
  nasalColors,
  throatColors,
  entPathologyColors,
  entSeverityGradient,
  hearingColors,
  equipmentColors as entEquipmentColors,
  entFlowchartColors,
  vestibularColors,
  sleepApneaColors,
  entColorScheme,
} from './ent';

export type { ENTColorScheme } from './ent';

// =============================================================================
// DERMATOLOGY
// =============================================================================

export {
  skinToneColors,
  skinLayerColors,
  lesionColors,
  inflammatoryColors as dermaInflammatoryColors,
  infectiousColors as dermaInfectiousColors,
  malignancyColors as dermaMalignancyColors,
  autoimmuneColors,
  procedureColors as dermaProcedureColors,
  equipmentColors as dermaEquipmentColors,
  woundHealingColors,
  severityGradient as dermaSeverityGradient,
  diagnosticColors as dermaDiagnosticColors,
  flowchartColors as dermaFlowchartColors,
  dermatologyColorScheme,
} from './dermatology';

export type { DermatologyColorScheme } from './dermatology';

// =============================================================================
// PEDIATRICS
// =============================================================================

export {
  ageGroupColors,
  growthColors,
  developmentColors,
  anatomyColors as pedsAnatomyColors,
  respiratoryColors as pedsRespiratoryColors,
  infectiousColors as pedsInfectiousColors,
  giNutritionColors,
  congenitalColors,
  nicuColors,
  neonatalConditionColors,
  vaccinationColors,
  wellChildColors,
  emergencyColors as pedsEmergencyColors,
  severityGradient as pedsSeverityGradient,
  dehydrationGradient,
  apgarColors,
  flowchartColors as pedsFlowchartColors,
  pediatricsColorScheme,
} from './pediatrics';

export type { PediatricsColorScheme } from './pediatrics';

// =============================================================================
// PATHOLOGY
// =============================================================================

export {
  heStainColors,
  specialStainColors,
  ihcColors,
  normalCellColors,
  abnormalCellColors,
  inflammatoryCellColors,
  inflammationPatternColors,
  tumorClassificationColors,
  tumorTypeColors,
  laboratoryColors,
  microscopyColors,
  autopsyColors,
  hematopathologyColors,
  flowchartColors as pathologyFlowchartColors,
  gradingColors,
  pathologyColorScheme,
} from './pathology';

export type { PathologyColorScheme } from './pathology';

// =============================================================================
// PHYSIOLOGY
// =============================================================================

export {
  cardiovascularColors,
  respiratoryColors as physiologyRespiratoryColors,
  renalColors,
  neurophysiologyColors,
  muscleColors,
  endocrineColors as physiologyEndocrineColors,
  giPhysiologyColors,
  metabolismColors,
  fluidElectrolyteColors,
  acidBaseColors,
  thermoregulationColors,
  diagramElementColors,
  flowchartColors as physiologyFlowchartColors,
  severityGradient as physiologySeverityGradient,
  physiologyColorScheme,
} from './physiology';

export type { PhysiologyColorScheme } from './physiology';

// =============================================================================
// PHARMACOLOGY
// =============================================================================

export {
  drugClassColors,
  admeColors,
  receptorColors,
  interactionColors,
  cyp450Colors,
  tdmColors,
  adrColors,
  doseResponseColors,
  deliveryRouteColors,
  severityGradient as pharmacologySeverityGradient,
  flowchartColors as pharmacologyFlowchartColors,
  pharmacologyColorScheme,
} from './pharmacology';

export type { PharmacologyColorScheme } from './pharmacology';
