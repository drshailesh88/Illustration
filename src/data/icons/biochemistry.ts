/**
 * Biochemistry Icon Library
 * Comprehensive SVG icons for biochemistry
 *
 * Categories:
 * - Metabolism (glycolysis, TCA, oxidative phosphorylation)
 * - Enzyme Kinetics (Michaelis-Menten, inhibition, regulation)
 * - Metabolic Pathways (biosynthesis, catabolism)
 * - Cofactors and Coenzymes (NAD, FAD, ATP, CoA)
 */

import type { IconDefinition } from './index';

export const biochemistryIcons: IconDefinition[] = [
  // ===========================================================================
  // METABOLISM
  // ===========================================================================
  {
    id: 'biochem-glycolysis',
    name: 'Glycolysis Pathway',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['glycolysis', 'glucose', 'pyruvate', 'ATP', 'pathway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="blue" opacity="0.3"/>
      <text x="24" y="11" font-size="5" fill="currentColor" stroke="none">Glucose</text>
      <path d="M32 14 L32 24" marker-end="url(#arrow)"/>
      <rect x="24" y="24" width="16" height="8" fill="green" opacity="0.2"/>
      <path d="M32 32 L32 42" marker-end="url(#arrow)"/>
      <circle cx="32" cy="50" r="6" fill="red" opacity="0.3"/>
      <text x="22" y="53" font-size="5" fill="currentColor" stroke="none">Pyruvate</text>
      <text x="40" y="38" font-size="5" fill="green" stroke="none">2 ATP</text>
      <text x="40" y="44" font-size="5" fill="blue" stroke="none">2 NADH</text>
    </svg>`
  },
  {
    id: 'biochem-tca-cycle',
    name: 'TCA/Krebs Cycle',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['TCA', 'Krebs', 'citric acid', 'cycle', 'mitochondria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="none"/>
      <circle cx="32" cy="12" r="4" fill="blue"/>
      <circle cx="52" cy="32" r="4" fill="green"/>
      <circle cx="32" cy="52" r="4" fill="red"/>
      <circle cx="12" cy="32" r="4" fill="orange"/>
      <path d="M36 14 C44 18, 50 26, 50 32" stroke="blue"/>
      <path d="M50 36 C48 44, 40 50, 32 50" stroke="green"/>
      <path d="M28 50 C20 48, 14 40, 14 32" stroke="red"/>
      <path d="M14 28 C16 20, 24 14, 32 14" stroke="orange"/>
      <text x="26" y="8" font-size="4" fill="currentColor" stroke="none">Acetyl-CoA</text>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">TCA</text>
    </svg>`
  },
  {
    id: 'biochem-etc',
    name: 'Electron Transport Chain',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['ETC', 'oxidative phosphorylation', 'ATP synthase', 'mitochondria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" fill="gray" opacity="0.2"/>
      <rect x="8" y="28" width="8" height="8" fill="blue"/>
      <text x="10" y="34" font-size="4" fill="white" stroke="none">I</text>
      <rect x="20" y="28" width="8" height="8" fill="green"/>
      <text x="21" y="34" font-size="4" fill="white" stroke="none">III</text>
      <rect x="32" y="28" width="8" height="8" fill="red"/>
      <text x="33" y="34" font-size="4" fill="white" stroke="none">IV</text>
      <circle cx="52" cy="32" r="6" fill="orange"/>
      <text x="48" y="35" font-size="4" fill="white" stroke="none">ATP</text>
      <path d="M16 32 L20 32" stroke="blue" marker-end="url(#arrow)"/>
      <path d="M28 32 L32 32" stroke="blue" marker-end="url(#arrow)"/>
      <path d="M40 32 L46 32" stroke="blue" marker-end="url(#arrow)"/>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">NADH</text>
      <text x="44" y="48" font-size="4" fill="currentColor" stroke="none">O2</text>
      <path d="M12 20 L12 12 L52 12 L52 20" stroke="red" stroke-dasharray="2 2"/>
      <text x="28" y="10" font-size="4" fill="red" stroke="none">H+</text>
    </svg>`
  },
  {
    id: 'biochem-beta-oxidation',
    name: 'Beta Oxidation',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['beta oxidation', 'fatty acid', 'acetyl-CoA', 'lipid', 'catabolism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16 L56 16" stroke-width="3" stroke="orange"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">FA-CoA</text>
      <path d="M32 20 L32 28"/>
      <rect x="24" y="28" width="16" height="12" rx="2" fill="green" opacity="0.2"/>
      <text x="26" y="36" font-size="4" fill="currentColor" stroke="none">Cycle</text>
      <path d="M32 40 L32 48"/>
      <circle cx="24" cy="52" r="4" fill="blue"/>
      <circle cx="40" cy="52" r="4" fill="blue"/>
      <text x="18" y="54" font-size="4" fill="white" stroke="none">Ac</text>
      <text x="34" y="54" font-size="4" fill="white" stroke="none">Ac</text>
      <text x="48" y="36" font-size="4" fill="blue" stroke="none">FADH2</text>
      <text x="48" y="42" font-size="4" fill="blue" stroke="none">NADH</text>
    </svg>`
  },
  {
    id: 'biochem-gluconeogenesis',
    name: 'Gluconeogenesis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['gluconeogenesis', 'glucose', 'pyruvate', 'liver', 'anabolic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="52" r="6" fill="red" opacity="0.3"/>
      <text x="22" y="55" font-size="5" fill="currentColor" stroke="none">Pyruvate</text>
      <path d="M32 46 L32 36" stroke="green" marker-end="url(#arrow)"/>
      <rect x="24" y="28" width="16" height="8" fill="green" opacity="0.2"/>
      <path d="M32 28 L32 18" stroke="green" marker-end="url(#arrow)"/>
      <circle cx="32" cy="10" r="6" fill="blue" opacity="0.3"/>
      <text x="24" y="13" font-size="5" fill="currentColor" stroke="none">Glucose</text>
      <text x="42" y="36" font-size="4" fill="red" stroke="none">-6 ATP</text>
      <path d="M20 40 L12 40 L12 20 L20 20" stroke="purple" stroke-dasharray="2 2"/>
      <text x="4" y="32" font-size="4" fill="purple" stroke="none">Bypass</text>
    </svg>`
  },

  // ===========================================================================
  // ENZYME KINETICS
  // ===========================================================================
  {
    id: 'biochem-michaelis-menten',
    name: 'Michaelis-Menten Curve',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['Michaelis-Menten', 'Km', 'Vmax', 'kinetics', 'saturation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M8 52 C16 32, 32 20, 56 16" stroke="blue" stroke-width="2" fill="none"/>
      <line x1="8" y1="16" x2="56" y2="16" stroke-dasharray="4 2" stroke="red"/>
      <text x="48" y="12" font-size="5" fill="red" stroke="none">Vmax</text>
      <line x1="8" y1="34" x2="56" y2="34" stroke-dasharray="2 2" stroke="gray"/>
      <text x="36" y="30" font-size="4" fill="gray" stroke="none">Vmax/2</text>
      <line x1="24" y1="34" x2="24" y2="56" stroke-dasharray="2 2" stroke="green"/>
      <text x="20" y="62" font-size="5" fill="green" stroke="none">Km</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">V</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">[S]</text>
    </svg>`
  },
  {
    id: 'biochem-lineweaver-burk',
    name: 'Lineweaver-Burk Plot',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['Lineweaver-Burk', 'double reciprocal', 'Km', 'Vmax'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="56" y2="40"/>
      <line x1="24" y1="56" x2="24" y2="8"/>
      <line x1="12" y1="48" x2="52" y2="16" stroke="blue" stroke-width="2"/>
      <circle cx="24" cy="32" r="2" fill="red"/>
      <text x="4" y="36" font-size="4" fill="red" stroke="none">1/Vmax</text>
      <circle cx="16" cy="40" r="2" fill="green"/>
      <text x="8" y="48" font-size="4" fill="green" stroke="none">-1/Km</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">1/V</text>
      <text x="48" y="48" font-size="5" fill="currentColor" stroke="none">1/[S]</text>
    </svg>`
  },
  {
    id: 'biochem-competitive-inhibition',
    name: 'Competitive Inhibition',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['competitive', 'inhibition', 'Km', 'enzyme', 'active site'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12" fill="blue" opacity="0.2"/>
      <path d="M24 28 L24 36 L40 36 L40 28 Z" fill="none"/>
      <text x="28" y="34" font-size="6" fill="currentColor" stroke="none">E</text>
      <circle cx="20" cy="16" r="6" fill="green"/>
      <text x="18" y="18" font-size="5" fill="white" stroke="none">S</text>
      <circle cx="44" cy="16" r="6" fill="red"/>
      <text x="42" y="18" font-size="5" fill="white" stroke="none">I</text>
      <path d="M20 22 L28 28" stroke="green" stroke-dasharray="2 2"/>
      <path d="M44 22 L36 28" stroke="red" stroke-dasharray="2 2"/>
      <text x="18" y="52" font-size="5" fill="currentColor" stroke="none">Compete for</text>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">active site</text>
    </svg>`
  },
  {
    id: 'biochem-allosteric',
    name: 'Allosteric Regulation',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['allosteric', 'regulation', 'effector', 'conformational', 'sigmoidal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="16" ry="10" fill="blue" opacity="0.2"/>
      <path d="M16 28 L16 36 L24 36 L24 28 Z" fill="none"/>
      <ellipse cx="44" cy="32" rx="8" ry="6" fill="green" opacity="0.3"/>
      <text x="18" y="34" font-size="5" fill="currentColor" stroke="none">AS</text>
      <text x="40" y="34" font-size="4" fill="currentColor" stroke="none">Allo</text>
      <circle cx="52" cy="24" r="4" fill="red"/>
      <text x="50" y="26" font-size="4" fill="white" stroke="none">E</text>
      <path d="M52 28 L48 30" stroke="red"/>
      <circle cx="8" cy="24" r="4" fill="green"/>
      <text x="6" y="26" font-size="4" fill="white" stroke="none">S</text>
      <path d="M8 28 L16 28" stroke="green"/>
      <path d="M24 20 C32 20, 44 20, 44 26" stroke="purple" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biochem-enzyme-substrate',
    name: 'Enzyme-Substrate Complex',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['enzyme', 'substrate', 'ES complex', 'lock and key', 'induced fit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24 L8 40 L32 40 L32 32 L24 32 L24 24 Z" fill="blue" opacity="0.2"/>
      <path d="M8 24 L8 40 L32 40 L32 32 L24 32 L24 24 Z"/>
      <text x="12" y="36" font-size="6" fill="currentColor" stroke="none">E</text>
      <path d="M32 24 L40 24 L40 32 L32 32 Z" fill="green" opacity="0.3"/>
      <path d="M32 24 L40 24 L40 32 L32 32 Z"/>
      <text x="34" y="30" font-size="5" fill="currentColor" stroke="none">S</text>
      <path d="M44 28 L52 28" marker-end="url(#arrow)"/>
      <text x="16" y="52" font-size="5" fill="currentColor" stroke="none">E + S → ES</text>
    </svg>`
  },

  // ===========================================================================
  // METABOLIC PATHWAYS
  // ===========================================================================
  {
    id: 'biochem-pentose-phosphate',
    name: 'Pentose Phosphate Pathway',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['pentose phosphate', 'NADPH', 'ribose', 'nucleotides'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="blue" opacity="0.3"/>
      <text x="24" y="15" font-size="4" fill="currentColor" stroke="none">G6P</text>
      <path d="M32 18 L32 26"/>
      <rect x="24" y="26" width="16" height="6" fill="green" opacity="0.2"/>
      <text x="26" y="31" font-size="4" fill="currentColor" stroke="none">Ox</text>
      <path d="M32 32 L32 40"/>
      <circle cx="32" cy="46" r="6" fill="red" opacity="0.3"/>
      <text x="24" y="49" font-size="4" fill="currentColor" stroke="none">R5P</text>
      <text x="44" y="30" font-size="4" fill="blue" stroke="none">NADPH</text>
      <path d="M32 52 L32 58"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Nucleotides</text>
    </svg>`
  },
  {
    id: 'biochem-urea-cycle',
    name: 'Urea Cycle',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['urea cycle', 'nitrogen', 'ammonia', 'liver', 'ornithine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="none"/>
      <circle cx="32" cy="14" r="4" fill="blue"/>
      <text x="28" y="16" font-size="4" fill="white" stroke="none">Orn</text>
      <circle cx="50" cy="32" r="4" fill="green"/>
      <text x="46" y="34" font-size="4" fill="white" stroke="none">Cit</text>
      <circle cx="32" cy="50" r="4" fill="red"/>
      <text x="28" y="52" font-size="4" fill="white" stroke="none">Arg</text>
      <circle cx="14" cy="32" r="4" fill="orange"/>
      <text x="10" y="34" font-size="4" fill="white" stroke="none">AS</text>
      <path d="M36 16 C44 20, 48 28, 48 32"/>
      <path d="M48 36 C46 44, 40 50, 36 50"/>
      <path d="M28 48 C20 46, 16 40, 16 36"/>
      <path d="M16 28 C18 20, 24 16, 28 16"/>
      <text x="52" y="16" font-size="4" fill="currentColor" stroke="none">NH3</text>
      <text x="4" y="50" font-size="4" fill="currentColor" stroke="none">Urea</text>
    </svg>`
  },
  {
    id: 'biochem-fatty-acid-synthesis',
    name: 'Fatty Acid Synthesis',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['fatty acid synthesis', 'acetyl-CoA', 'malonyl', 'palmitate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="blue" opacity="0.3"/>
      <text x="22" y="15" font-size="4" fill="currentColor" stroke="none">Acetyl-CoA</text>
      <path d="M32 18 L32 24"/>
      <rect x="22" y="24" width="20" height="8" rx="4" fill="green" opacity="0.2"/>
      <text x="28" y="30" font-size="4" fill="currentColor" stroke="none">FAS</text>
      <path d="M32 32 L32 40"/>
      <path d="M12 44 L52 44" stroke-width="3" stroke="orange"/>
      <text x="18" y="54" font-size="5" fill="currentColor" stroke="none">Palmitate (C16)</text>
      <text x="44" y="18" font-size="4" fill="blue" stroke="none">NADPH</text>
    </svg>`
  },
  {
    id: 'biochem-amino-acid-catabolism',
    name: 'Amino Acid Catabolism',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['amino acid', 'catabolism', 'transamination', 'deamination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="blue" opacity="0.3"/>
      <text x="28" y="13" font-size="5" fill="currentColor" stroke="none">AA</text>
      <path d="M28 16 L20 28"/>
      <path d="M36 16 L44 28"/>
      <circle cx="16" cy="34" r="6" fill="red" opacity="0.3"/>
      <text x="10" y="37" font-size="4" fill="currentColor" stroke="none">NH3</text>
      <circle cx="48" cy="34" r="6" fill="green" opacity="0.3"/>
      <text x="40" y="37" font-size="4" fill="currentColor" stroke="none">Carbon</text>
      <path d="M16 40 L16 48"/>
      <path d="M48 40 L48 48"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Urea</text>
      <text x="40" y="56" font-size="4" fill="currentColor" stroke="none">TCA/Gluc</text>
    </svg>`
  },
  {
    id: 'biochem-photosynthesis',
    name: 'Photosynthesis',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['photosynthesis', 'Calvin cycle', 'light reactions', 'chloroplast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4" fill="green" opacity="0.2"/>
      <rect x="8" y="20" width="20" height="24" fill="yellow" opacity="0.3"/>
      <text x="12" y="34" font-size="5" fill="currentColor" stroke="none">Light</text>
      <rect x="32" y="20" width="24" height="24" fill="blue" opacity="0.2"/>
      <text x="36" y="34" font-size="5" fill="currentColor" stroke="none">Calvin</text>
      <path d="M28 32 L32 32" marker-end="url(#arrow)"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">H2O, CO2</text>
      <text x="40" y="58" font-size="4" fill="currentColor" stroke="none">Glucose, O2</text>
      <circle cx="12" cy="12" r="4" fill="yellow"/>
    </svg>`
  },

  // ===========================================================================
  // COFACTORS AND COENZYMES
  // ===========================================================================
  {
    id: 'biochem-nad',
    name: 'NAD+/NADH',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['NAD', 'NADH', 'coenzyme', 'electron carrier', 'oxidation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="4" fill="blue" opacity="0.2"/>
      <text x="12" y="36" font-size="6" fill="currentColor" stroke="none">NAD+</text>
      <path d="M28 32 L36 32" stroke="green" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="29" y="28" font-size="4" fill="green" stroke="none">+2e-</text>
      <text x="29" y="40" font-size="4" fill="green" stroke="none">+H+</text>
      <rect x="36" y="16" width="20" height="32" rx="4" fill="red" opacity="0.2"/>
      <text x="38" y="36" font-size="5" fill="currentColor" stroke="none">NADH</text>
    </svg>`
  },
  {
    id: 'biochem-fad',
    name: 'FAD/FADH2',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['FAD', 'FADH2', 'flavin', 'electron carrier', 'succinate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="4" fill="yellow" opacity="0.3"/>
      <text x="14" y="36" font-size="6" fill="currentColor" stroke="none">FAD</text>
      <path d="M28 32 L36 32" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="29" y="28" font-size="4" fill="blue" stroke="none">+2e-</text>
      <text x="29" y="40" font-size="4" fill="blue" stroke="none">+2H+</text>
      <rect x="36" y="16" width="20" height="32" rx="4" fill="orange" opacity="0.3"/>
      <text x="38" y="36" font-size="4" fill="currentColor" stroke="none">FADH2</text>
    </svg>`
  },
  {
    id: 'biochem-atp',
    name: 'ATP Structure',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['ATP', 'adenosine triphosphate', 'energy', 'phosphate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="16" height="16" rx="2" fill="purple" opacity="0.3"/>
      <text x="6" y="36" font-size="5" fill="currentColor" stroke="none">Ade</text>
      <rect x="20" y="28" width="8" height="8" rx="1" fill="blue" opacity="0.3"/>
      <text x="22" y="34" font-size="4" fill="currentColor" stroke="none">Rib</text>
      <circle cx="36" cy="32" r="4" fill="red"/>
      <text x="34" y="34" font-size="4" fill="white" stroke="none">P</text>
      <circle cx="46" cy="32" r="4" fill="red"/>
      <text x="44" y="34" font-size="4" fill="white" stroke="none">P</text>
      <circle cx="56" cy="32" r="4" fill="red"/>
      <text x="54" y="34" font-size="4" fill="white" stroke="none">P</text>
      <path d="M40 32 L42 32" stroke="yellow" stroke-width="2"/>
      <path d="M50 32 L52 32" stroke="yellow" stroke-width="2"/>
      <text x="44" y="46" font-size="4" fill="yellow" stroke="none">~7.3 kcal</text>
    </svg>`
  },
  {
    id: 'biochem-coenzyme-a',
    name: 'Coenzyme A',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['CoA', 'coenzyme A', 'acetyl', 'thioester', 'acyl carrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="12" height="16" rx="2" fill="purple" opacity="0.3"/>
      <text x="6" y="36" font-size="4" fill="currentColor" stroke="none">Pan</text>
      <rect x="18" y="26" width="12" height="12" rx="1" fill="blue" opacity="0.3"/>
      <text x="20" y="36" font-size="4" fill="currentColor" stroke="none">β-Ala</text>
      <rect x="32" y="26" width="12" height="12" rx="1" fill="green" opacity="0.3"/>
      <text x="34" y="36" font-size="4" fill="currentColor" stroke="none">Cys</text>
      <circle cx="52" cy="32" r="6" fill="yellow"/>
      <text x="48" y="35" font-size="5" fill="currentColor" stroke="none">SH</text>
      <path d="M44 32 L46 32"/>
      <text x="44" y="48" font-size="5" fill="currentColor" stroke="none">Thiol group</text>
    </svg>`
  },
  {
    id: 'biochem-biotin',
    name: 'Biotin',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['biotin', 'carboxylase', 'CO2 carrier', 'vitamin H'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20 L32 12 L44 20 L44 36 L32 44 L20 36 Z" fill="orange" opacity="0.3"/>
      <path d="M20 20 L32 12 L44 20 L44 36 L32 44 L20 36 Z"/>
      <circle cx="32" cy="12" r="4" fill="blue"/>
      <text x="28" y="14" font-size="4" fill="white" stroke="none">N</text>
      <circle cx="20" cy="28" r="3" fill="red"/>
      <text x="17" y="30" font-size="4" fill="white" stroke="none">S</text>
      <path d="M32 44 L32 56"/>
      <text x="24" y="60" font-size="5" fill="currentColor" stroke="none">Enzyme</text>
      <text x="20" y="8" font-size="5" fill="currentColor" stroke="none">CO2 carrier</text>
    </svg>`
  },
  {
    id: 'biochem-thiamine',
    name: 'Thiamine (TPP)',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['thiamine', 'TPP', 'vitamin B1', 'decarboxylation', 'pyruvate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="20" height="16" rx="2" fill="yellow" opacity="0.3"/>
      <text x="12" y="32" font-size="5" fill="currentColor" stroke="none">Thia</text>
      <rect x="32" y="20" width="16" height="16" rx="2" fill="blue" opacity="0.3"/>
      <text x="36" y="32" font-size="5" fill="currentColor" stroke="none">Pyr</text>
      <circle cx="56" cy="28" r="3" fill="red"/>
      <text x="54" y="30" font-size="4" fill="white" stroke="none">P</text>
      <circle cx="56" cy="36" r="3" fill="red"/>
      <text x="54" y="38" font-size="4" fill="white" stroke="none">P</text>
      <path d="M48 28 L53 28"/>
      <text x="14" y="48" font-size="4" fill="currentColor" stroke="none">Decarboxylation</text>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">reactions</text>
    </svg>`
  },
];

export default biochemistryIcons;
