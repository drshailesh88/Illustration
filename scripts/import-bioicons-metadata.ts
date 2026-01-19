#!/usr/bin/env ts-node
/**
 * Bioicons Metadata Import Script
 * 
 * Creates a lightweight metadata file with icon info
 * SVGs are stored separately and loaded on-demand
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BIOICONS_REPO = '/tmp/bioicons';
const ICONS_DIR = path.join(BIOICONS_REPO, 'static', 'icons');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'icons', 'bioicons');
const METADATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'icons', 'bioicons-data.ts');

interface IconMeta {
  name: string;
  category: string;
  license: string;
  author: string;
}

function mapLicense(license: string): string {
  const map: Record<string, string> = {
    'cc-0': 'CC0',
    'cc-by-3.0': 'CC-BY',
    'cc-by-4.0': 'CC-BY',
    'cc-by-sa-3.0': 'CC-BY-SA',
    'cc-by-sa-4.0': 'CC-BY-SA',
    'mit': 'MIT',
    'bsd': 'BSD',
  };
  return map[license] || 'CC-BY';
}

function formatName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

function generateKeywords(name: string, category: string): string[] {
  const nameKw = name.split(/[-_]/).filter(w => w.length > 2);
  const catKw = category.split(/[-_]/).filter(w => w.length > 2);
  return [...new Set([...nameKw, ...catKw])];
}

async function main() {
  console.log('Bioicons Metadata Import');
  console.log('========================\n');

  const iconsJsonPath = path.join(ICONS_DIR, 'icons.json');
  const iconsData: IconMeta[] = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
  
  console.log(`Found ${iconsData.length} icons`);

  // Create output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const metadata: any[] = [];
  const categories = new Set<string>();
  let copied = 0;
  let skipped = 0;

  for (const icon of iconsData) {
    const srcPath = path.join(ICONS_DIR, icon.license, icon.category, icon.author, `${icon.name}.svg`);
    
    if (!fs.existsSync(srcPath)) {
      skipped++;
      continue;
    }

    // Create safe filename
    const id = `${icon.name}-${icon.author}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const destPath = path.join(OUTPUT_DIR, `${id}.svg`);

    // Copy SVG to public directory
    fs.copyFileSync(srcPath, destPath);

    categories.add(icon.category);
    
    metadata.push({
      id,
      name: formatName(icon.name),
      category: icon.category.replace(/_/g, ' ').toLowerCase(),
      keywords: generateKeywords(icon.name, icon.category),
      license: mapLicense(icon.license),
      author: icon.author,
      file: `${id}.svg`,
    });

    copied++;
    if (copied % 500 === 0) console.log(`Copied ${copied}...`);
  }

  console.log(`\nCopied: ${copied}, Skipped: ${skipped}`);

  // Generate lightweight TypeScript metadata
  const ts = `/**
 * Bioicons Metadata
 * 
 * AUTO-GENERATED - DO NOT EDIT
 * Total: ${metadata.length} icons in ${categories.size} categories
 * 
 * SVG files are stored in /public/icons/bioicons/
 * Load with: /icons/bioicons/{icon.file}
 */

export interface BioiconEntry {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  license: string;
  author: string;
  file: string;
}

export const bioiconsMetadata: BioiconEntry[] = ${JSON.stringify(metadata, null, 2)};

export const bioiconCategories = ${JSON.stringify([...categories].sort())};

export function searchBioiconsMetadata(query: string): BioiconEntry[] {
  const q = query.toLowerCase();
  return bioiconsMetadata.filter(icon =>
    icon.name.toLowerCase().includes(q) ||
    icon.keywords.some(k => k.includes(q)) ||
    icon.category.includes(q)
  );
}

export function getBioiconsUrl(icon: BioiconEntry): string {
  return \`/icons/bioicons/\${icon.file}\`;
}

export function getBioiconsMetadataCount(): number {
  return bioiconsMetadata.length;
}
`;

  fs.writeFileSync(METADATA_FILE, ts);
  console.log(`\nWrote metadata to ${METADATA_FILE}`);
  console.log(`SVGs copied to ${OUTPUT_DIR}`);
}

main().catch(console.error);
