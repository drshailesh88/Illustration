/**
 * Icons Module
 *
 * Provides access to Tabler Icons and custom scientific illustration icons.
 * Tabler Icons is a free and open source icon set with over 4,000 icons.
 *
 * @see https://tabler.io/icons
 */

// Import commonly used icons from Tabler
import {
  // Drawing tools
  IconPencil,
  IconBrush,
  IconEraser,
  IconHighlight,
  IconPalette,
  IconColorPicker,

  // Shape tools
  IconSquare,
  IconCircle,
  IconTriangle,
  IconLine,
  IconPolygon,
  IconStar,

  // Transform tools
  IconRotate,
  IconFlipHorizontal,
  IconFlipVertical,
  IconResize,
  IconArrowsMove,
  IconCrop,

  // Layer tools
  IconStack,
  IconStackPush,
  IconStackPop,
  IconLayersSubtract,
  IconLayersUnion,

  // Alignment tools
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconBoxAlignTop,
  IconLayoutAlignMiddle,
  IconBoxAlignBottom,
  IconLayoutDistributeHorizontal,

  // Text tools
  IconTypography,
  IconBold,
  IconItalic,
  IconUnderline,
  IconSubscript,
  IconSuperscript,

  // File operations
  IconDownload,
  IconUpload,
  IconFileExport,
  IconFileImport,
  IconPrinter,
  IconShare,

  // Edit operations
  IconCopy,
  IconCut,
  IconClipboard,
  IconArrowBack,
  IconArrowForward,
  IconTrash,

  // View controls
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
  IconMaximize,
  IconGridDots,
  IconRuler,

  // Scientific icons
  IconAtom,
  IconDna,
  IconMicroscope,
  IconFlask,
  IconTestPipe,
  IconVirus,
  IconCell,
  IconHeart,
  IconBrain,
  IconLungs,
  IconBone,

  // Math/Physics
  IconMath,
  IconMathFunction,
  IconVariable,
  IconSum,
  IconInfinity,
  IconWaveSine,

  // Arrows and connectors
  IconArrowRight,
  IconArrowLeft,
  IconArrowUp,
  IconArrowDown,
  IconArrowsExchange,
  IconArrowBigRight,

  // UI elements
  IconMenu,
  IconSettings,
  IconHelp,
  IconInfoCircle,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconPlus,
  IconMinus,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';

// TODO: Create icon picker component
// - Searchable icon grid
// - Category filtering
// - Recent icons section
// - Custom icon upload

// TODO: Implement custom scientific icon set
// - Biological structures (cells, organelles, molecules)
// - Chemical structures and bonds
// - Physical symbols and diagrams
// - Medical anatomy icons
// - Engineering symbols

// TODO: Add icon customization
// - Color picker for icons
// - Size adjustment
// - Stroke width control
// - Fill/outline toggle

// TODO: Create icon to SVG path converter
// - Extract paths from icon components
// - Convert to editable vector shapes
// - Maintain icon proportions

// TODO: Implement icon library management
// - Save favorite icons
// - Create custom icon collections
// - Import icon packs
// - Export icon collections

/**
 * Icon categories for organization
 */
export const iconCategories = {
  drawing: {
    name: 'Drawing Tools',
    icons: [IconPencil, IconBrush, IconEraser, IconHighlight, IconPalette, IconColorPicker],
  },
  shapes: {
    name: 'Shapes',
    icons: [IconSquare, IconCircle, IconTriangle, IconLine, IconPolygon, IconStar],
  },
  transform: {
    name: 'Transform',
    icons: [IconRotate, IconFlipHorizontal, IconFlipVertical, IconResize, IconArrowsMove, IconCrop],
  },
  layers: {
    name: 'Layers',
    icons: [IconStack, IconStackPush, IconStackPop, IconLayersSubtract, IconLayersUnion],
  },
  alignment: {
    name: 'Alignment',
    icons: [IconAlignLeft, IconAlignCenter, IconAlignRight, IconBoxAlignTop, IconLayoutAlignMiddle, IconBoxAlignBottom, IconLayoutDistributeHorizontal],
  },
  text: {
    name: 'Text',
    icons: [IconTypography, IconBold, IconItalic, IconUnderline, IconSubscript, IconSuperscript],
  },
  file: {
    name: 'File',
    icons: [IconDownload, IconUpload, IconFileExport, IconFileImport, IconPrinter, IconShare],
  },
  edit: {
    name: 'Edit',
    icons: [IconCopy, IconCut, IconClipboard, IconArrowBack, IconArrowForward, IconTrash],
  },
  view: {
    name: 'View',
    icons: [IconZoomIn, IconZoomOut, IconZoomReset, IconMaximize, IconGridDots, IconRuler],
  },
  science: {
    name: 'Science',
    icons: [IconAtom, IconDna, IconMicroscope, IconFlask, IconTestPipe, IconVirus, IconCell],
  },
  medical: {
    name: 'Medical',
    icons: [IconHeart, IconBrain, IconLungs, IconBone],
  },
  math: {
    name: 'Math & Physics',
    icons: [IconMath, IconMathFunction, IconVariable, IconSum, IconInfinity, IconWaveSine],
  },
  arrows: {
    name: 'Arrows',
    icons: [IconArrowRight, IconArrowLeft, IconArrowUp, IconArrowDown, IconArrowsExchange, IconArrowBigRight],
  },
  ui: {
    name: 'UI',
    icons: [IconMenu, IconSettings, IconHelp, IconInfoCircle, IconAlertCircle, IconCheck, IconX, IconPlus, IconMinus],
  },
};

/**
 * Default icon props for consistent styling
 */
export const defaultIconProps = {
  size: 24,
  stroke: 1.5,
  color: 'currentColor',
};

/**
 * Get icon by name (for dynamic icon rendering)
 */
export function getIconByName(name: string): Icon | null {
  const allIcons: Record<string, Icon> = {
    // Drawing tools
    pencil: IconPencil,
    brush: IconBrush,
    eraser: IconEraser,
    highlight: IconHighlight,
    palette: IconPalette,
    colorPicker: IconColorPicker,
    // Shapes
    square: IconSquare,
    circle: IconCircle,
    triangle: IconTriangle,
    line: IconLine,
    polygon: IconPolygon,
    star: IconStar,
    // Add more as needed...
  };

  return allIcons[name] || null;
}

// Re-export all icons for direct use
export {
  // Drawing tools
  IconPencil,
  IconBrush,
  IconEraser,
  IconHighlight,
  IconPalette,
  IconColorPicker,
  // Shape tools
  IconSquare,
  IconCircle,
  IconTriangle,
  IconLine,
  IconPolygon,
  IconStar,
  // Transform tools
  IconRotate,
  IconFlipHorizontal,
  IconFlipVertical,
  IconResize,
  IconArrowsMove,
  IconCrop,
  // Layer tools
  IconStack,
  IconStackPush,
  IconStackPop,
  IconLayersSubtract,
  IconLayersUnion,
  // Alignment tools
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconBoxAlignTop,
  IconLayoutAlignMiddle,
  IconBoxAlignBottom,
  IconLayoutDistributeHorizontal,
  // Text tools
  IconTypography,
  IconBold,
  IconItalic,
  IconUnderline,
  IconSubscript,
  IconSuperscript,
  // File operations
  IconDownload,
  IconUpload,
  IconFileExport,
  IconFileImport,
  IconPrinter,
  IconShare,
  // Edit operations
  IconCopy,
  IconCut,
  IconClipboard,
  IconArrowBack,
  IconArrowForward,
  IconTrash,
  // View controls
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
  IconMaximize,
  IconGridDots,
  IconRuler,
  // Scientific icons
  IconAtom,
  IconDna,
  IconMicroscope,
  IconFlask,
  IconTestPipe,
  IconVirus,
  IconCell,
  IconHeart,
  IconBrain,
  IconLungs,
  IconBone,
  // Math/Physics
  IconMath,
  IconMathFunction,
  IconVariable,
  IconSum,
  IconInfinity,
  IconWaveSine,
  // Arrows and connectors
  IconArrowRight,
  IconArrowLeft,
  IconArrowUp,
  IconArrowDown,
  IconArrowsExchange,
  IconArrowBigRight,
  // UI elements
  IconMenu,
  IconSettings,
  IconHelp,
  IconInfoCircle,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconPlus,
  IconMinus,
};
