/**
 * icons/index.ts
 * Icon Library for FINNISH Scientific Illustration Editor
 *
 * Provides a comprehensive library of scientific and technical icons
 * organized by domain with search and filter capabilities.
 *
 * @module data/icons
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Available icon domains/categories
 */
export type IconDomain =
  | 'medicine'
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'engineering'
  | 'general';

/**
 * Complete definition of an icon in the library
 */
export interface IconDefinition {
  /** Unique identifier for the icon */
  id: string;
  /** Display name of the icon */
  name: string;
  /** Scientific domain the icon belongs to */
  domain: IconDomain;
  /** Sub-category within the domain */
  category: string;
  /** Searchable tags for the icon */
  tags: string[];
  /** SVG markup as a string */
  svg: string;
}

/**
 * Metadata about an icon domain
 */
export interface DomainMetadata {
  id: IconDomain;
  name: string;
  description: string;
  iconCount: number;
  color: string;
}

/**
 * Search options for filtering icons
 */
export interface IconSearchOptions {
  /** Filter by specific domain */
  domain?: IconDomain;
  /** Filter by category within domain */
  category?: string;
  /** Limit number of results */
  limit?: number;
  /** Sort results by field */
  sortBy?: 'name' | 'domain' | 'category';
}

// =============================================================================
// DOMAIN ICON IMPORTS
// =============================================================================

import { medicineIcons } from './medicine';
import { biologyIcons } from './biology';
import { chemistryIcons } from './chemistry';
import { physicsIcons } from './physics';
import { engineeringIcons } from './engineering';
import { cardiologyIcons } from './cardiology';

// =============================================================================
// ICON COLLECTIONS
// =============================================================================

/**
 * All icons from all domains combined
 */
export const allIcons: IconDefinition[] = [
  ...medicineIcons,
  ...cardiologyIcons,
  ...biologyIcons,
  ...chemistryIcons,
  ...physicsIcons,
  ...engineeringIcons,
];

/**
 * Icons organized by domain for quick access
 */
export const iconsByDomain: Record<IconDomain, IconDefinition[]> = {
  medicine: [...medicineIcons, ...cardiologyIcons],
  biology: biologyIcons,
  chemistry: chemistryIcons,
  physics: physicsIcons,
  engineering: engineeringIcons,
  general: [], // Reserved for future general-purpose icons
};

/**
 * Metadata for each domain
 */
export const domainMetadata: Record<IconDomain, DomainMetadata> = {
  medicine: {
    id: 'medicine',
    name: 'Medicine',
    description: 'Medical, clinical, and healthcare icons including cardiology',
    iconCount: medicineIcons.length + cardiologyIcons.length,
    color: '#ef4444', // Red
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    description: 'Biological sciences, cells, and organisms',
    iconCount: biologyIcons.length,
    color: '#22c55e', // Green
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Chemical structures, lab equipment, and reactions',
    iconCount: chemistryIcons.length,
    color: '#8b5cf6', // Purple
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    description: 'Physical phenomena, optics, and mechanics',
    iconCount: physicsIcons.length,
    color: '#3b82f6', // Blue
  },
  engineering: {
    id: 'engineering',
    name: 'Engineering',
    description: 'Electrical, mechanical, and civil engineering',
    iconCount: engineeringIcons.length,
    color: '#f59e0b', // Orange
  },
  general: {
    id: 'general',
    name: 'General',
    description: 'General-purpose scientific icons',
    iconCount: 0,
    color: '#6b7280', // Gray
  },
};

// =============================================================================
// ICON RETRIEVAL FUNCTIONS
// =============================================================================

/**
 * Get all icons from all domains
 * @returns Array of all icon definitions
 */
export function getAllIcons(): IconDefinition[] {
  return [...allIcons];
}

/**
 * Get icons filtered by domain
 * @param domain - The domain to filter by
 * @returns Array of icons in the specified domain
 */
export function getIconsByDomain(domain: IconDomain): IconDefinition[] {
  return iconsByDomain[domain] || [];
}

/**
 * Get a single icon by its ID
 * @param id - The unique icon ID
 * @returns The icon definition or undefined if not found
 */
export function getIconById(id: string): IconDefinition | undefined {
  return allIcons.find((icon) => icon.id === id);
}

/**
 * Get icons filtered by category
 * @param category - The category to filter by
 * @param domain - Optional domain to further filter
 * @returns Array of icons in the specified category
 */
export function getIconsByCategory(
  category: string,
  domain?: IconDomain
): IconDefinition[] {
  let icons = domain ? iconsByDomain[domain] : allIcons;
  return icons.filter(
    (icon) => icon.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories across all icons or within a domain
 * @param domain - Optional domain to get categories from
 * @returns Array of unique category names
 */
export function getCategories(domain?: IconDomain): string[] {
  const icons = domain ? iconsByDomain[domain] : allIcons;
  const categories = new Set(icons.map((icon) => icon.category));
  return Array.from(categories).sort();
}

// =============================================================================
// SEARCH FUNCTIONS
// =============================================================================

/**
 * Search icons by query string
 * Searches in name, tags, category, and domain
 * @param query - Search query string
 * @param options - Optional search options
 * @returns Array of matching icons
 */
export function searchIcons(
  query: string,
  options: IconSearchOptions = {}
): IconDefinition[] {
  const { domain, category, limit, sortBy } = options;
  const normalizedQuery = query.toLowerCase().trim();

  // Start with all icons or domain-filtered icons
  let results = domain ? [...iconsByDomain[domain]] : [...allIcons];

  // Filter by category if specified
  if (category) {
    results = results.filter(
      (icon) => icon.category.toLowerCase() === category.toLowerCase()
    );
  }

  // If no query, return current results
  if (!normalizedQuery) {
    return applySearchOptions(results, { limit, sortBy });
  }

  // Search across multiple fields
  results = results.filter((icon) => {
    // Check name
    if (icon.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Check tags
    if (icon.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }

    // Check category
    if (icon.category.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Check domain
    if (icon.domain.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Check ID (for specific lookups)
    if (icon.id.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    return false;
  });

  // Score and sort by relevance
  results = results
    .map((icon) => ({
      icon,
      score: calculateRelevanceScore(icon, normalizedQuery),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ icon }) => icon);

  return applySearchOptions(results, { limit, sortBy });
}

/**
 * Calculate relevance score for search ranking
 */
function calculateRelevanceScore(icon: IconDefinition, query: string): number {
  let score = 0;

  // Exact name match (highest priority)
  if (icon.name.toLowerCase() === query) {
    score += 100;
  } else if (icon.name.toLowerCase().startsWith(query)) {
    score += 50;
  } else if (icon.name.toLowerCase().includes(query)) {
    score += 25;
  }

  // Tag matches
  icon.tags.forEach((tag) => {
    if (tag.toLowerCase() === query) {
      score += 30;
    } else if (tag.toLowerCase().includes(query)) {
      score += 10;
    }
  });

  // Category match
  if (icon.category.toLowerCase().includes(query)) {
    score += 15;
  }

  return score;
}

/**
 * Apply search options (limit, sorting) to results
 */
function applySearchOptions(
  icons: IconDefinition[],
  options: Pick<IconSearchOptions, 'limit' | 'sortBy'>
): IconDefinition[] {
  let results = [...icons];

  // Apply sorting if specified
  if (options.sortBy) {
    results.sort((a, b) => {
      const aVal = a[options.sortBy!];
      const bVal = b[options.sortBy!];
      return aVal.localeCompare(bVal);
    });
  }

  // Apply limit if specified
  if (options.limit && options.limit > 0) {
    results = results.slice(0, options.limit);
  }

  return results;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get available domains with icon counts
 * @returns Array of domains with their metadata
 */
export function getAvailableDomains(): DomainMetadata[] {
  return Object.values(domainMetadata).filter((d) => d.iconCount > 0);
}

/**
 * Get statistics about the icon library
 */
export function getIconStats(): {
  totalIcons: number;
  byDomain: Record<IconDomain, number>;
  byCategory: Record<string, number>;
} {
  const byCategory: Record<string, number> = {};
  allIcons.forEach((icon) => {
    byCategory[icon.category] = (byCategory[icon.category] || 0) + 1;
  });

  return {
    totalIcons: allIcons.length,
    byDomain: {
      medicine: medicineIcons.length + cardiologyIcons.length,
      biology: biologyIcons.length,
      chemistry: chemistryIcons.length,
      physics: physicsIcons.length,
      engineering: engineeringIcons.length,
      general: 0,
    },
    byCategory,
  };
}

/**
 * Parse SVG string to get width and height
 * @param svg - SVG string
 * @returns Object with width and height or null if parsing fails
 */
export function parseSvgDimensions(
  svg: string
): { width: number; height: number } | null {
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/);
  if (viewBoxMatch) {
    const [, , , width, height] = viewBoxMatch[1].split(/\s+/).map(Number);
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  }
  return null;
}

/**
 * Convert icon SVG to a data URL for embedding
 * @param icon - The icon definition
 * @returns Data URL string
 */
export function iconToDataUrl(icon: IconDefinition): string {
  const encodedSvg = encodeURIComponent(icon.svg);
  return `data:image/svg+xml,${encodedSvg}`;
}

/**
 * Convert icon SVG to base64 data URL
 * @param icon - The icon definition
 * @returns Base64 data URL string
 */
export function iconToBase64(icon: IconDefinition): string {
  if (typeof btoa === 'function') {
    const base64 = btoa(icon.svg);
    return `data:image/svg+xml;base64,${base64}`;
  }
  // Fallback for Node.js environment
  return iconToDataUrl(icon);
}

// =============================================================================
// RE-EXPORTS
// =============================================================================

export { medicineIcons } from './medicine';
export { cardiologyIcons } from './cardiology';
export { biologyIcons } from './biology';
export { chemistryIcons } from './chemistry';
export { physicsIcons } from './physics';
export { engineeringIcons } from './engineering';

export default {
  allIcons,
  iconsByDomain,
  domainMetadata,
  getAllIcons,
  getIconsByDomain,
  getIconById,
  getIconsByCategory,
  getCategories,
  searchIcons,
  getAvailableDomains,
  getIconStats,
  parseSvgDimensions,
  iconToDataUrl,
  iconToBase64,
};
