#!/usr/bin/env ts-node
/**
 * Bioicons Import Script
 *
 * Downloads and converts icons from the bioicons.com GitHub repository
 * to the FINNISH project format.
 *
 * Usage: npx ts-node scripts/import-bioicons.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to cloned bioicons repo
const BIOICONS_REPO = '/tmp/bioicons';
const ICONS_DIR = path.join(BIOICONS_REPO, 'static', 'icons');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'lib', 'icons', 'bioicons-generated.ts');

interface BioiconsMetadata {
  name: string;
  category: string;
  license: string;
  author: string;
}

interface ProcessedIcon {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svg: string;
  viewBox: string;
  license: 'CC0' | 'MIT' | 'CC-BY' | 'CC-BY-SA' | 'BSD';
  author: string;
}

// Map license strings to our format
function mapLicense(license: string): 'CC0' | 'MIT' | 'CC-BY' | 'CC-BY-SA' | 'BSD' {
  const licenseMap: Record<string, 'CC0' | 'MIT' | 'CC-BY' | 'CC-BY-SA' | 'BSD'> = {
    'cc-0': 'CC0',
    'cc-by-3.0': 'CC-BY',
    'cc-by-4.0': 'CC-BY',
    'cc-by-sa-3.0': 'CC-BY-SA',
    'cc-by-sa-4.0': 'CC-BY-SA',
    'mit': 'MIT',
    'bsd': 'BSD',
  };
  return licenseMap[license] || 'CC-BY';
}

// Generate keywords from name and category
function generateKeywords(name: string, category: string): string[] {
  const nameKeywords = name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter(w => w.length > 2);

  const categoryKeywords = category
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter(w => w.length > 2);

  return [...new Set([...nameKeywords, ...categoryKeywords])];
}

// Format name for display
function formatName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// Parse SVG file and extract content
function parseSvgFile(filePath: string): { svg: string; viewBox: string } | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract viewBox
    const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // Extract inner SVG content (between <svg> and </svg>)
    const svgMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
    if (!svgMatch) return null;

    let innerSvg = svgMatch[1].trim();

    // Remove comments
    innerSvg = innerSvg.replace(/<!--[\s\S]*?-->/g, '');

    // Remove <defs> if present (or keep clipPath definitions inline)
    // For simplicity, we'll keep the full inner content

    // Clean up whitespace
    innerSvg = innerSvg
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();

    // Escape backticks and dollar signs for template literal
    innerSvg = innerSvg
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');

    return { svg: innerSvg, viewBox };
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err);
    return null;
  }
}

// Build the SVG file path from metadata
function buildSvgPath(icon: BioiconsMetadata): string {
  // Path format: license/category/author/name.svg
  return path.join(ICONS_DIR, icon.license, icon.category, icon.author, `${icon.name}.svg`);
}

// Main processing function
async function processIcons() {
  console.log('Reading icons.json...');
  const iconsJsonPath = path.join(ICONS_DIR, 'icons.json');
  const iconsData: BioiconsMetadata[] = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));

  console.log(`Found ${iconsData.length} icons in metadata`);

  const processedIcons: ProcessedIcon[] = [];
  const errors: string[] = [];
  const categories = new Set<string>();

  let processed = 0;
  let skipped = 0;

  for (const icon of iconsData) {
    const svgPath = buildSvgPath(icon);

    if (!fs.existsSync(svgPath)) {
      errors.push(`Missing: ${svgPath}`);
      skipped++;
      continue;
    }

    const result = parseSvgFile(svgPath);
    if (!result) {
      errors.push(`Parse error: ${svgPath}`);
      skipped++;
      continue;
    }

    categories.add(icon.category);

    // Create unique ID
    const id = `bioicons-${icon.name}-${icon.author}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    processedIcons.push({
      id,
      name: formatName(icon.name),
      category: icon.category.replace(/_/g, ' ').toLowerCase(),
      keywords: generateKeywords(icon.name, icon.category),
      svg: result.svg,
      viewBox: result.viewBox,
      license: mapLicense(icon.license),
      author: icon.author,
    });

    processed++;

    if (processed % 500 === 0) {
      console.log(`Processed ${processed}/${iconsData.length} icons...`);
    }
  }

  console.log(`\nProcessed: ${processed}, Skipped: ${skipped}`);
  console.log(`Categories: ${Array.from(categories).join(', ')}`);

  if (errors.length > 0 && errors.length < 20) {
    console.log('Errors:', errors);
  }

  return { icons: processedIcons, categories: Array.from(categories) };
}

// Generate TypeScript output
function generateTypeScript(icons: ProcessedIcon[], categories: string[]): string {
  const categoriesMap: Record<string, ProcessedIcon[]> = {};

  // Group icons by category
  for (const icon of icons) {
    const cat = icon.category;
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(icon);
  }

  // Generate category exports
  const categoryExports = Object.entries(categoriesMap)
    .map(([category, icons]) => {
      const varName = category.replace(/[^a-z0-9]/gi, '').toLowerCase() + 'Icons';
      return { category, varName, count: icons.length };
    });

  let output = `/**
 * Bioicons Generated Module
 *
 * AUTO-GENERATED - DO NOT EDIT MANUALLY
 *
 * Generated from bioicons.com GitHub repository
 * Total icons: ${icons.length}
 * Categories: ${categories.length}
 *
 * Licenses: CC0, MIT, CC-BY, CC-BY-SA, BSD
 * Attribution required for CC-BY and CC-BY-SA licensed icons.
 *
 * @see https://bioicons.com/
 * @see https://github.com/duerrsimon/bioicons
 */

export type BioiconsLicense = 'CC0' | 'MIT' | 'CC-BY' | 'CC-BY-SA' | 'BSD';

export interface BioiconMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svg: string;
  viewBox: string;
  license: BioiconsLicense;
  author: string;
}

/**
 * Category definitions
 */
export const bioiconCategories = [
${categories.map(c => `  { id: '${c.replace(/[^a-z0-9-_ ]/gi, '')}', name: '${formatCategoryName(c)}', count: ${categoriesMap[c]?.length || 0} },`).join('\n')}
] as const;

`;

  // Generate icon data - split into chunks to avoid hitting string limits
  output += `/**
 * All bioicons data
 */
export const bioiconsList: BioiconMeta[] = [\n`;

  for (const icon of icons) {
    output += `  {
    id: "${icon.id}",
    name: "${icon.name.replace(/"/g, '\\"')}",
    category: "${icon.category}",
    keywords: ${JSON.stringify(icon.keywords)},
    svg: \`${icon.svg}\`,
    viewBox: "${icon.viewBox}",
    license: "${icon.license}",
    author: "${icon.author.replace(/"/g, '\\"')}",
  },\n`;
  }

  output += `];

/**
 * Get total icon count
 */
export function getBioiconCount(): number {
  return bioiconsList.length;
}

/**
 * Get counts by category
 */
export function getBioiconCountsByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const icon of bioiconsList) {
    counts[icon.category] = (counts[icon.category] || 0) + 1;
  }
  return counts;
}

/**
 * Search bioicons by query
 */
export function searchBioicons(query: string): BioiconMeta[] {
  const q = query.toLowerCase();
  return bioiconsList.filter(icon =>
    icon.name.toLowerCase().includes(q) ||
    icon.keywords.some(k => k.includes(q)) ||
    icon.category.toLowerCase().includes(q)
  );
}

/**
 * Get bioicons by category
 */
export function getBioiconsByCategory(category: string): BioiconMeta[] {
  return bioiconsList.filter(icon => icon.category === category);
}

/**
 * Get a bioicon by ID
 */
export function getBioiconById(id: string): BioiconMeta | undefined {
  return bioiconsList.find(icon => icon.id === id);
}

/**
 * Convert a bioicon to full SVG string
 */
export function bioiconToSvg(icon: BioiconMeta, size: number = 24): string {
  return \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="\${icon.viewBox}">\${icon.svg}</svg>\`;
}

/**
 * Get all icons requiring attribution (CC-BY and CC-BY-SA)
 */
export function getIconsRequiringAttribution(): BioiconMeta[] {
  return bioiconsList.filter(icon =>
    icon.license === 'CC-BY' || icon.license === 'CC-BY-SA'
  );
}

/**
 * Get unique authors for attribution
 */
export function getAuthorsForAttribution(): { author: string; count: number; license: string }[] {
  const authorMap = new Map<string, { count: number; license: string }>();

  for (const icon of bioiconsList) {
    if (icon.license === 'CC-BY' || icon.license === 'CC-BY-SA') {
      const existing = authorMap.get(icon.author);
      if (existing) {
        existing.count++;
      } else {
        authorMap.set(icon.author, { count: 1, license: icon.license });
      }
    }
  }

  return Array.from(authorMap.entries())
    .map(([author, data]) => ({ author, ...data }))
    .sort((a, b) => b.count - a.count);
}
`;

  return output;
}

function formatCategoryName(category: string): string {
  return category
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// Main
async function main() {
  console.log('Bioicons Import Script');
  console.log('======================\n');

  // Check if bioicons repo exists
  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`Bioicons repository not found at ${BIOICONS_REPO}`);
    console.error('Please clone it first: git clone --depth 1 https://github.com/duerrsimon/bioicons.git /tmp/bioicons');
    process.exit(1);
  }

  const { icons, categories } = await processIcons();

  console.log(`\nGenerating TypeScript...`);
  const typescript = generateTypeScript(icons, categories);

  console.log(`Writing to ${OUTPUT_FILE}...`);
  fs.writeFileSync(OUTPUT_FILE, typescript, 'utf-8');

  console.log(`\nDone! Generated ${icons.length} icons in ${categories.length} categories.`);
  console.log(`Output: ${OUTPUT_FILE}`);

  // Print summary
  console.log('\nCategory Summary:');
  const byCategory: Record<string, number> = {};
  for (const icon of icons) {
    byCategory[icon.category] = (byCategory[icon.category] || 0) + 1;
  }
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });
}

main().catch(console.error);
