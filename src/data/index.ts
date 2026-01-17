/**
 * data/index.ts
 * Data module exports for FINNISH
 *
 * Central export point for all data modules including templates,
 * configuration data, and static assets.
 *
 * @module data
 */

// =============================================================================
// TEMPLATE EXPORTS
// =============================================================================

export * from './templates';

// Re-export commonly used items at the top level for convenience
export {
  // Types
  type DiagramTemplate,
  type TemplateDomain,
  type FilledTemplate,
  type TemplateSearchOptions,

  // Collections
  allTemplates,
  templatesByDomain,
  domainMetadata,

  // Functions
  getTemplatesByDomain,
  getTemplateById,
  searchTemplates,
  getAvailableDomains,
  getTemplateStats,
  fillTemplate,
  validateTemplateValues,
  extractPlaceholders,
  createTemplate,
  getDomainMetadata,

  // Domain-specific template arrays
  medicineTemplates,
  biologyTemplates,
  chemistryTemplates,
  physicsTemplates,
  engineeringTemplates,
} from './templates';
