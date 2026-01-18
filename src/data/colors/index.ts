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

// =============================================================================
// TYPES
// =============================================================================

export type { PulmonologyColorScheme } from './pulmonology';
export type { EmergencyMedicineColorScheme } from './emergency-medicine';
