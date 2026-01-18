/**
 * colors/index.ts
 * Color scheme exports for FINNISH scientific illustration
 *
 * Provides domain-specific color palettes for medical and scientific specialties
 */

// =============================================================================
// SPECIALTY COLOR SCHEMES
// =============================================================================

export * from './pulmonology';
export { default as pulmonologyColorScheme } from './pulmonology';

export * from './emergency-medicine';
export { default as emergencyMedicineColorScheme } from './emergency-medicine';

export * from './gastroenterology';
export { default as gastroenterologyColorScheme } from './gastroenterology';

export * from './nephrology';
export { default as nephrologyColorScheme } from './nephrology';

export * from './infectious-disease';
export { default as infectiousDiseaseColorScheme } from './infectious-disease';

export * from './endocrinology';
export { default as endocrinologyColorScheme } from './endocrinology';

export * from './hematology-oncology';
export { default as hematologyOncologyColorScheme } from './hematology-oncology';

export * from './orthopedics';
export { default as orthopedicsColorScheme } from './orthopedics';

// =============================================================================
// TYPES
// =============================================================================

export type { PulmonologyColorScheme } from './pulmonology';
export type { EmergencyMedicineColorScheme } from './emergency-medicine';
export type { GastroenterologyColorScheme } from './gastroenterology';
export type { NephrologyColorScheme } from './nephrology';
export type { InfectiousDiseaseColorScheme } from './infectious-disease';
export type { EndocrinologyColorScheme } from './endocrinology';
export type { HematologyOncologyColorScheme } from './hematology-oncology';
export type { OrthopedicsColorScheme } from './orthopedics';
