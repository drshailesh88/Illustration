/**
 * Icon Library Service for FINNISH Scientific Illustration Editor
 *
 * Provides functionality to load, search, and manage scientific icons
 * organized by category for use in academic and scientific illustrations.
 *
 * Icon Sources Reference (for future expansion):
 * - Bioicons: https://bioicons.com (2,700+ biology icons, CC0 license)
 * - Health Icons: https://healthicons.org (752 medical icons, CC0 license)
 * - Lucide: https://lucide.dev (general purpose icons, MIT license)
 * - Phosphor Icons: https://phosphoricons.com (general purpose, MIT license)
 * - Tabler Icons: https://tabler-icons.io (general purpose, MIT license)
 *
 * Categories: biology, chemistry, medicine, physics, engineering, math, general
 */

// Icon categories with metadata
export const ICON_CATEGORIES = {
  biology: {
    name: 'Biology',
    description: 'Biological structures, organisms, and processes',
    color: '#4CAF50'
  },
  chemistry: {
    name: 'Chemistry',
    description: 'Chemical structures, lab equipment, and reactions',
    color: '#2196F3'
  },
  medicine: {
    name: 'Medicine',
    description: 'Medical, anatomical, and healthcare icons',
    color: '#F44336'
  },
  physics: {
    name: 'Physics',
    description: 'Physics concepts, particles, and equipment',
    color: '#9C27B0'
  },
  engineering: {
    name: 'Engineering',
    description: 'Engineering tools, components, and diagrams',
    color: '#FF9800'
  },
  math: {
    name: 'Mathematics',
    description: 'Mathematical symbols, shapes, and graphs',
    color: '#607D8B'
  },
  general: {
    name: 'General',
    description: 'General purpose scientific and utility icons',
    color: '#795548'
  }
};

// Icon metadata registry - stores metadata for all icons
const iconRegistry = new Map();

// Cache for loaded SVG content
const svgCache = new Map();

// Favorites and recent icons storage keys
const FAVORITES_KEY = 'finnish_icon_favorites';
const RECENT_KEY = 'finnish_icon_recent';
const MAX_RECENT = 20;

/**
 * Icon metadata structure
 * @typedef {Object} IconMetadata
 * @property {string} id - Unique identifier (category/filename)
 * @property {string} name - Display name
 * @property {string} category - Category name
 * @property {string[]} tags - Searchable tags
 * @property {string} filename - SVG filename
 * @property {string} path - Full path to SVG file
 * @property {string} [source] - Original source attribution
 * @property {string} [license] - License information
 */

/**
 * Register an icon with its metadata
 * @param {IconMetadata} metadata - Icon metadata
 */
export function registerIcon(metadata) {
  const id = `${metadata.category}/${metadata.filename.replace('.svg', '')}`;
  iconRegistry.set(id, {
    ...metadata,
    id
  });
}

/**
 * Get all registered icons
 * @returns {IconMetadata[]} Array of all icon metadata
 */
export function getAllIcons() {
  return Array.from(iconRegistry.values());
}

/**
 * Get icons by category
 * @param {string} category - Category name
 * @returns {IconMetadata[]} Array of icons in the category
 */
export function getIconsByCategory(category) {
  return getAllIcons().filter(icon => icon.category === category);
}

/**
 * Search icons by name or tags
 * @param {string} query - Search query
 * @param {string} [category] - Optional category filter
 * @returns {IconMetadata[]} Matching icons
 */
export function searchIcons(query, category = null) {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return category ? getIconsByCategory(category) : getAllIcons();
  }

  let icons = category ? getIconsByCategory(category) : getAllIcons();

  return icons.filter(icon => {
    const nameMatch = icon.name.toLowerCase().includes(normalizedQuery);
    const tagMatch = icon.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
    const categoryMatch = icon.category.toLowerCase().includes(normalizedQuery);
    return nameMatch || tagMatch || categoryMatch;
  });
}

/**
 * Get icon metadata by ID
 * @param {string} id - Icon ID (category/name)
 * @returns {IconMetadata|null} Icon metadata or null if not found
 */
export function getIconMetadata(id) {
  return iconRegistry.get(id) || null;
}

/**
 * Load icon SVG content as string
 * @param {string} id - Icon ID (category/name)
 * @returns {Promise<string>} SVG string content
 */
export async function getIconSvg(id) {
  // Check cache first
  if (svgCache.has(id)) {
    return svgCache.get(id);
  }

  const metadata = getIconMetadata(id);
  if (!metadata) {
    throw new Error(`Icon not found: ${id}`);
  }

  try {
    const response = await fetch(metadata.path);
    if (!response.ok) {
      throw new Error(`Failed to load icon: ${response.statusText}`);
    }

    const svgContent = await response.text();
    svgCache.set(id, svgContent);

    // Add to recent icons
    addToRecent(id);

    return svgContent;
  } catch (error) {
    console.error(`Error loading icon ${id}:`, error);
    throw error;
  }
}

/**
 * Get icon as data URL for image embedding
 * @param {string} id - Icon ID
 * @returns {Promise<string>} Data URL
 */
export async function getIconDataUrl(id) {
  const svgContent = await getIconSvg(id);
  const base64 = btoa(unescape(encodeURIComponent(svgContent)));
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Parse SVG and extract viewBox dimensions
 * @param {string} svgContent - SVG string
 * @returns {{width: number, height: number, viewBox: string}}
 */
export function parseSvgDimensions(svgContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = doc.querySelector('svg');

  if (!svgElement) {
    return { width: 24, height: 24, viewBox: '0 0 24 24' };
  }

  const viewBox = svgElement.getAttribute('viewBox') || '0 0 24 24';
  const [, , w, h] = viewBox.split(' ').map(Number);

  return {
    width: svgElement.getAttribute('width') ? parseFloat(svgElement.getAttribute('width')) : w,
    height: svgElement.getAttribute('height') ? parseFloat(svgElement.getAttribute('height')) : h,
    viewBox
  };
}

// ============ Favorites Management ============

/**
 * Get favorite icon IDs
 * @returns {string[]} Array of favorite icon IDs
 */
export function getFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Add icon to favorites
 * @param {string} id - Icon ID
 */
export function addToFavorites(id) {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.unshift(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

/**
 * Remove icon from favorites
 * @param {string} id - Icon ID
 */
export function removeFromFavorites(id) {
  const favorites = getFavorites().filter(fav => fav !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Check if icon is in favorites
 * @param {string} id - Icon ID
 * @returns {boolean}
 */
export function isFavorite(id) {
  return getFavorites().includes(id);
}

/**
 * Toggle favorite status
 * @param {string} id - Icon ID
 * @returns {boolean} New favorite status
 */
export function toggleFavorite(id) {
  if (isFavorite(id)) {
    removeFromFavorites(id);
    return false;
  } else {
    addToFavorites(id);
    return true;
  }
}

// ============ Recent Icons Management ============

/**
 * Get recently used icon IDs
 * @returns {string[]} Array of recent icon IDs
 */
export function getRecentIcons() {
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Add icon to recent list
 * @param {string} id - Icon ID
 */
export function addToRecent(id) {
  let recent = getRecentIcons().filter(r => r !== id);
  recent.unshift(id);
  recent = recent.slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

/**
 * Clear recent icons
 */
export function clearRecent() {
  localStorage.removeItem(RECENT_KEY);
}

// ============ Icon Discovery & Registration ============

/**
 * Auto-discover and register icons from a category folder
 * This function should be called during app initialization
 * @param {string} category - Category name
 * @param {Object[]} iconList - List of icon definitions
 */
export function registerCategoryIcons(category, iconList) {
  iconList.forEach(icon => {
    registerIcon({
      name: icon.name,
      category: category,
      tags: icon.tags || [],
      filename: icon.filename,
      path: `/src/assets/icons/${category}/${icon.filename}`,
      source: icon.source || 'FINNISH',
      license: icon.license || 'MIT'
    });
  });
}

/**
 * Initialize the icon library with all built-in icons
 * Should be called once during app startup
 */
export async function initializeIconLibrary() {
  // Register medicine icons
  registerCategoryIcons('medicine', [
    { name: 'Heart', filename: 'heart.svg', tags: ['cardiac', 'organ', 'cardiovascular', 'anatomy'] },
    { name: 'Brain', filename: 'brain.svg', tags: ['neurology', 'organ', 'nervous system', 'anatomy'] },
    { name: 'Lungs', filename: 'lungs.svg', tags: ['respiratory', 'organ', 'breathing', 'anatomy'] },
    { name: 'Kidney', filename: 'kidney.svg', tags: ['renal', 'organ', 'urinary', 'anatomy'] },
    { name: 'Liver', filename: 'liver.svg', tags: ['hepatic', 'organ', 'digestive', 'anatomy'] },
    { name: 'DNA', filename: 'dna.svg', tags: ['genetics', 'helix', 'gene', 'molecular'] },
    { name: 'Cell', filename: 'cell.svg', tags: ['cellular', 'biology', 'organism', 'cytology'] },
    { name: 'Virus', filename: 'virus.svg', tags: ['pathogen', 'infection', 'disease', 'microbiology'] },
    { name: 'Bacteria', filename: 'bacteria.svg', tags: ['pathogen', 'microbe', 'infection', 'microbiology'] },
    { name: 'Syringe', filename: 'syringe.svg', tags: ['injection', 'needle', 'vaccine', 'medical tool'] },
    { name: 'Pill', filename: 'pill.svg', tags: ['medication', 'drug', 'capsule', 'pharmacy'] },
    { name: 'Stethoscope', filename: 'stethoscope.svg', tags: ['doctor', 'diagnosis', 'examination', 'medical tool'] },
    { name: 'ECG', filename: 'ecg.svg', tags: ['electrocardiogram', 'heartbeat', 'cardiac', 'diagnosis'] },
    { name: 'Microscope', filename: 'microscope.svg', tags: ['laboratory', 'research', 'magnify', 'science'] },
    { name: 'Test Tube', filename: 'test-tube.svg', tags: ['laboratory', 'chemistry', 'experiment', 'research'] },
    { name: 'Bone', filename: 'bone.svg', tags: ['skeleton', 'orthopedic', 'anatomy', 'skeletal'] },
    { name: 'Muscle', filename: 'muscle.svg', tags: ['tissue', 'strength', 'anatomy', 'muscular'] },
    { name: 'Eye', filename: 'eye.svg', tags: ['vision', 'ophthalmology', 'organ', 'anatomy'] },
    { name: 'Tooth', filename: 'tooth.svg', tags: ['dental', 'dentistry', 'oral', 'anatomy'] },
    { name: 'Blood Drop', filename: 'blood-drop.svg', tags: ['blood', 'donation', 'hematology', 'transfusion'] }
  ]);

  // Register biology icons
  registerCategoryIcons('biology', [
    { name: 'DNA Helix', filename: 'dna-helix.svg', tags: ['genetics', 'double helix', 'molecular', 'gene', 'chromosome'] },
    { name: 'Cell Membrane', filename: 'cell-membrane.svg', tags: ['lipid bilayer', 'phospholipid', 'cellular', 'plasma membrane'] },
    { name: 'Mitochondria', filename: 'mitochondria.svg', tags: ['organelle', 'powerhouse', 'ATP', 'cellular respiration', 'energy'] },
    { name: 'Chloroplast', filename: 'chloroplast.svg', tags: ['organelle', 'photosynthesis', 'plant cell', 'thylakoid', 'green'] },
    { name: 'Neuron', filename: 'neuron.svg', tags: ['nerve cell', 'brain', 'synapse', 'axon', 'dendrite', 'neuroscience'] },
    { name: 'Protein', filename: 'protein.svg', tags: ['amino acid', 'polypeptide', 'folding', 'structure', 'biochemistry'] },
    { name: 'RNA', filename: 'rna.svg', tags: ['ribonucleic acid', 'mRNA', 'transcription', 'genetic', 'single strand'] },
    { name: 'Enzyme', filename: 'enzyme.svg', tags: ['catalyst', 'active site', 'substrate', 'biochemistry', 'reaction'] },
    { name: 'Antibody', filename: 'antibody.svg', tags: ['immunoglobulin', 'immune', 'Y-shape', 'antigen', 'immunology'] },
    { name: 'Receptor', filename: 'receptor.svg', tags: ['cell surface', 'signal', 'ligand', 'membrane protein', 'binding'] }
  ]);

  // Register chemistry icons
  registerCategoryIcons('chemistry', [
    { name: 'Atom', filename: 'atom.svg', tags: ['electron', 'nucleus', 'orbital', 'particle', 'atomic'] },
    { name: 'Molecule', filename: 'molecule.svg', tags: ['compound', 'bond', 'structure', 'chemical'] },
    { name: 'Benzene', filename: 'benzene.svg', tags: ['aromatic', 'ring', 'organic', 'hexagon', 'carbon'] },
    { name: 'Flask', filename: 'flask.svg', tags: ['erlenmeyer', 'laboratory', 'glassware', 'experiment', 'conical'] },
    { name: 'Beaker', filename: 'beaker.svg', tags: ['laboratory', 'glassware', 'container', 'measurement', 'liquid'] },
    { name: 'Burette', filename: 'burette.svg', tags: ['titration', 'laboratory', 'measurement', 'volumetric', 'precision'] },
    { name: 'Periodic Table', filename: 'periodic-table.svg', tags: ['elements', 'chemistry', 'atomic', 'Mendeleev'] },
    { name: 'Bond', filename: 'bond.svg', tags: ['covalent', 'double bond', 'chemical bond', 'molecular'] },
    { name: 'Reaction', filename: 'reaction.svg', tags: ['arrow', 'chemical reaction', 'equilibrium', 'transformation'] },
    { name: 'Crystal', filename: 'crystal.svg', tags: ['lattice', 'solid', 'structure', 'crystallography', 'mineral'] }
  ]);

  // Register physics icons
  registerCategoryIcons('physics', [
    { name: 'Wave', filename: 'wave.svg', tags: ['sine', 'oscillation', 'frequency', 'amplitude', 'wavelength'] },
    { name: 'Magnet', filename: 'magnet.svg', tags: ['magnetic field', 'poles', 'electromagnetism', 'attraction'] },
    { name: 'Circuit', filename: 'circuit.svg', tags: ['electrical', 'current', 'voltage', 'electronics'] },
    { name: 'Lens', filename: 'lens.svg', tags: ['optics', 'convex', 'refraction', 'focus', 'light'] },
    { name: 'Prism', filename: 'prism.svg', tags: ['optics', 'spectrum', 'refraction', 'dispersion', 'rainbow'] },
    { name: 'Pendulum', filename: 'pendulum.svg', tags: ['oscillation', 'gravity', 'period', 'mechanics', 'swing'] },
    { name: 'Force', filename: 'force.svg', tags: ['vector', 'Newton', 'mechanics', 'arrow', 'direction'] },
    { name: 'Electron', filename: 'electron.svg', tags: ['particle', 'negative charge', 'lepton', 'quantum'] },
    { name: 'Laser', filename: 'laser.svg', tags: ['light', 'coherent', 'beam', 'optics', 'photon'] },
    { name: 'Thermometer', filename: 'thermometer.svg', tags: ['temperature', 'heat', 'measurement', 'thermal', 'mercury'] }
  ]);

  // Register engineering icons
  registerCategoryIcons('engineering', [
    { name: 'Gear', filename: 'gear.svg', tags: ['cog', 'mechanical', 'rotation', 'machine', 'teeth'] },
    { name: 'Circuit Board', filename: 'circuit-board.svg', tags: ['PCB', 'electronics', 'chip', 'traces', 'components'] },
    { name: 'Resistor', filename: 'resistor.svg', tags: ['electronic', 'component', 'ohm', 'resistance', 'circuit'] },
    { name: 'Capacitor', filename: 'capacitor.svg', tags: ['electronic', 'component', 'storage', 'charge', 'farad'] },
    { name: 'Transistor', filename: 'transistor.svg', tags: ['semiconductor', 'amplifier', 'switch', 'electronic', 'BJT'] },
    { name: 'Motor', filename: 'motor.svg', tags: ['electric', 'rotation', 'mechanical', 'electromagnetic', 'drive'] },
    { name: 'Bridge', filename: 'bridge.svg', tags: ['structure', 'civil', 'arch', 'span', 'construction'] },
    { name: 'Beam', filename: 'beam.svg', tags: ['I-beam', 'structural', 'steel', 'support', 'construction'] },
    { name: 'Pipe', filename: 'pipe.svg', tags: ['tube', 'plumbing', 'fluid', 'conduit', 'flow'] },
    { name: 'Valve', filename: 'valve.svg', tags: ['flow control', 'gate', 'plumbing', 'regulation', 'fluid'] }
  ]);

  console.log(`Icon library initialized with ${iconRegistry.size} icons`);
}

/**
 * Get icon library statistics
 * @returns {Object} Statistics about the icon library
 */
export function getLibraryStats() {
  const icons = getAllIcons();
  const categoryCounts = {};

  Object.keys(ICON_CATEGORIES).forEach(cat => {
    categoryCounts[cat] = icons.filter(icon => icon.category === cat).length;
  });

  return {
    totalIcons: icons.length,
    categoryCounts,
    favoritesCount: getFavorites().length,
    recentCount: getRecentIcons().length
  };
}

/**
 * Clear all cached SVG content
 */
export function clearCache() {
  svgCache.clear();
}

// Default export with all functions
export default {
  ICON_CATEGORIES,
  registerIcon,
  getAllIcons,
  getIconsByCategory,
  searchIcons,
  getIconMetadata,
  getIconSvg,
  getIconDataUrl,
  parseSvgDimensions,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  toggleFavorite,
  getRecentIcons,
  addToRecent,
  clearRecent,
  registerCategoryIcons,
  initializeIconLibrary,
  getLibraryStats,
  clearCache
};
