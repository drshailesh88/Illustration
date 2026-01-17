/**
 * PropertiesPanel Component
 * Right panel for editing selected object properties in the SVG editor.
 *
 * Sections:
 * - Transform: Position, size, rotation, scale, flip
 * - Appearance: Fill, stroke, opacity
 * - Text: Font, alignment, spacing (when text selected)
 * - Effects: Shadow, opacity
 * - Alignment: Multi-object alignment/distribution
 */

import { ColorPicker } from './ColorPicker.js';

// Font families available for text objects
const FONT_FAMILIES = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Palatino Linotype', label: 'Palatino' },
  { value: 'Lucida Console', label: 'Lucida Console' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Brush Script MT', label: 'Brush Script' }
];

// Font weight options
const FONT_WEIGHTS = [
  { value: '100', label: 'Thin' },
  { value: '200', label: 'Extra Light' },
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' }
];

// Stroke style options
const STROKE_STYLES = [
  { value: 'solid', label: 'Solid', dashArray: '' },
  { value: 'dashed', label: 'Dashed', dashArray: '10,5' },
  { value: 'dotted', label: 'Dotted', dashArray: '2,4' },
  { value: 'dash-dot', label: 'Dash-Dot', dashArray: '10,5,2,5' }
];

export class PropertiesPanel {
  constructor(options = {}) {
    this.element = null;
    this.selectedObject = null;
    this.selectedObjects = [];
    this.isMultiSelect = false;

    this.onPropertyChange = options.onPropertyChange || (() => {});
    this.onAlign = options.onAlign || (() => {});

    this.colorPickers = {};
    this.collapsedSections = new Set();

    this.init();
  }

  init() {
    this.createElement();
    this.bindEvents();
    this.loadSectionStates();
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'properties-panel';
    this.element.innerHTML = `
      <div class="properties-panel-header">
        <h2>Properties</h2>
      </div>

      <div class="properties-panel-content">
        <!-- No Selection State -->
        <div class="properties-no-selection">
          <div class="properties-no-selection-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <p>No object selected</p>
          <span>Select an object to edit its properties</span>
        </div>

        <!-- Properties Content -->
        <div class="properties-sections">

          <!-- Transform Section -->
          <div class="properties-section" data-section="transform">
            <div class="properties-section-header">
              <span class="properties-section-toggle">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </span>
              <span class="properties-section-title">Transform</span>
            </div>
            <div class="properties-section-content">
              <!-- Position -->
              <div class="properties-row properties-row-2col">
                <div class="properties-field">
                  <label>X</label>
                  <div class="properties-input-group">
                    <input type="number" class="properties-input" data-property="left" step="1">
                    <span class="properties-unit">px</span>
                  </div>
                </div>
                <div class="properties-field">
                  <label>Y</label>
                  <div class="properties-input-group">
                    <input type="number" class="properties-input" data-property="top" step="1">
                    <span class="properties-unit">px</span>
                  </div>
                </div>
              </div>

              <!-- Size -->
              <div class="properties-row properties-row-2col">
                <div class="properties-field">
                  <label>W</label>
                  <div class="properties-input-group">
                    <input type="number" class="properties-input" data-property="width" step="1" min="1">
                    <span class="properties-unit">px</span>
                  </div>
                </div>
                <div class="properties-field">
                  <label>H</label>
                  <div class="properties-input-group">
                    <input type="number" class="properties-input" data-property="height" step="1" min="1">
                    <span class="properties-unit">px</span>
                  </div>
                </div>
              </div>

              <!-- Lock aspect ratio -->
              <div class="properties-row">
                <label class="properties-checkbox">
                  <input type="checkbox" data-property="lockAspectRatio">
                  <span class="properties-checkbox-mark"></span>
                  <span>Lock aspect ratio</span>
                </label>
              </div>

              <!-- Rotation -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Rotation</label>
                  <div class="properties-rotation-control">
                    <div class="properties-rotation-dial" data-property="angle">
                      <div class="properties-rotation-dial-inner">
                        <div class="properties-rotation-dial-indicator"></div>
                      </div>
                    </div>
                    <div class="properties-input-group">
                      <input type="number" class="properties-input" data-property="angle" step="1" min="-360" max="360">
                      <span class="properties-unit">deg</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Scale -->
              <div class="properties-row properties-row-2col">
                <div class="properties-field">
                  <label>Scale X</label>
                  <div class="properties-input-group">
                    <input type="number" class="properties-input" data-property="scaleX" step="0.1" min="0.1">
                    <span class="properties-unit">x</span>
                  </div>
                </div>
                <div class="properties-field">
                  <label>Scale Y</label>
                  <div class="properties-input-group">
                    <input type="number" class="properties-input" data-property="scaleY" step="0.1" min="0.1">
                    <span class="properties-unit">x</span>
                  </div>
                </div>
              </div>

              <!-- Flip buttons -->
              <div class="properties-row">
                <div class="properties-button-group">
                  <button class="properties-btn" data-action="flipX" title="Flip Horizontal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 3v18M7 8l-4 4 4 4M17 8l4 4-4 4"/>
                    </svg>
                    <span>Flip H</span>
                  </button>
                  <button class="properties-btn" data-action="flipY" title="Flip Vertical">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 12h18M8 7l4-4 4 4M8 17l4 4 4-4"/>
                    </svg>
                    <span>Flip V</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Appearance Section -->
          <div class="properties-section" data-section="appearance">
            <div class="properties-section-header">
              <span class="properties-section-toggle">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </span>
              <span class="properties-section-title">Appearance</span>
            </div>
            <div class="properties-section-content">
              <!-- Fill -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Fill</label>
                  <div class="properties-color-row">
                    <button class="properties-color-swatch" data-color-target="fill">
                      <span class="properties-color-preview"></span>
                    </button>
                    <input type="text" class="properties-input properties-color-input" data-property="fill" placeholder="#000000">
                    <label class="properties-checkbox properties-color-toggle">
                      <input type="checkbox" data-property="hasFill" checked>
                      <span class="properties-checkbox-mark"></span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Fill Opacity -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Fill Opacity</label>
                  <div class="properties-slider-row">
                    <input type="range" class="properties-slider" data-property="fillOpacity" min="0" max="100" value="100">
                    <div class="properties-input-group properties-input-group-small">
                      <input type="number" class="properties-input" data-property="fillOpacity" min="0" max="100" value="100">
                      <span class="properties-unit">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Stroke -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Stroke</label>
                  <div class="properties-color-row">
                    <button class="properties-color-swatch" data-color-target="stroke">
                      <span class="properties-color-preview"></span>
                    </button>
                    <input type="text" class="properties-input properties-color-input" data-property="stroke" placeholder="#000000">
                    <label class="properties-checkbox properties-color-toggle">
                      <input type="checkbox" data-property="hasStroke" checked>
                      <span class="properties-checkbox-mark"></span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Stroke Width -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Stroke Width</label>
                  <div class="properties-slider-row">
                    <input type="range" class="properties-slider" data-property="strokeWidth" min="0" max="50" value="1">
                    <div class="properties-input-group properties-input-group-small">
                      <input type="number" class="properties-input" data-property="strokeWidth" min="0" max="100" value="1">
                      <span class="properties-unit">px</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Stroke Style -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Stroke Style</label>
                  <select class="properties-select" data-property="strokeStyle">
                    ${STROKE_STYLES.map(s => `<option value="${s.value}">${s.label}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Stroke Opacity -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Stroke Opacity</label>
                  <div class="properties-slider-row">
                    <input type="range" class="properties-slider" data-property="strokeOpacity" min="0" max="100" value="100">
                    <div class="properties-input-group properties-input-group-small">
                      <input type="number" class="properties-input" data-property="strokeOpacity" min="0" max="100" value="100">
                      <span class="properties-unit">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Text Section (only shown for text objects) -->
          <div class="properties-section properties-section-text" data-section="text">
            <div class="properties-section-header">
              <span class="properties-section-toggle">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </span>
              <span class="properties-section-title">Text</span>
            </div>
            <div class="properties-section-content">
              <!-- Font Family -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Font Family</label>
                  <select class="properties-select" data-property="fontFamily">
                    ${FONT_FAMILIES.map(f => `<option value="${f.value}">${f.label}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Font Size and Weight -->
              <div class="properties-row properties-row-2col">
                <div class="properties-field">
                  <label>Size</label>
                  <div class="properties-input-group">
                    <input type="number" class="properties-input" data-property="fontSize" min="1" max="999" value="16">
                    <span class="properties-unit">px</span>
                  </div>
                </div>
                <div class="properties-field">
                  <label>Weight</label>
                  <select class="properties-select" data-property="fontWeight">
                    ${FONT_WEIGHTS.map(w => `<option value="${w.value}">${w.label}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Text Alignment -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Alignment</label>
                  <div class="properties-button-group properties-button-group-full">
                    <button class="properties-btn properties-btn-icon" data-property="textAlign" data-value="left" title="Align Left">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/>
                      </svg>
                    </button>
                    <button class="properties-btn properties-btn-icon" data-property="textAlign" data-value="center" title="Align Center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
                      </svg>
                    </button>
                    <button class="properties-btn properties-btn-icon" data-property="textAlign" data-value="right" title="Align Right">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/>
                      </svg>
                    </button>
                    <button class="properties-btn properties-btn-icon" data-property="textAlign" data-value="justify" title="Justify">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Line Height -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Line Height</label>
                  <div class="properties-slider-row">
                    <input type="range" class="properties-slider" data-property="lineHeight" min="0.5" max="3" step="0.1" value="1.2">
                    <div class="properties-input-group properties-input-group-small">
                      <input type="number" class="properties-input" data-property="lineHeight" min="0.5" max="5" step="0.1" value="1.2">
                      <span class="properties-unit">x</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Letter Spacing -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Letter Spacing</label>
                  <div class="properties-slider-row">
                    <input type="range" class="properties-slider" data-property="charSpacing" min="-100" max="500" value="0">
                    <div class="properties-input-group properties-input-group-small">
                      <input type="number" class="properties-input" data-property="charSpacing" min="-100" max="1000" value="0">
                      <span class="properties-unit">em</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Text Color -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Text Color</label>
                  <div class="properties-color-row">
                    <button class="properties-color-swatch" data-color-target="textColor">
                      <span class="properties-color-preview"></span>
                    </button>
                    <input type="text" class="properties-input properties-color-input" data-property="fill" placeholder="#000000">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Effects Section -->
          <div class="properties-section" data-section="effects">
            <div class="properties-section-header">
              <span class="properties-section-toggle">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </span>
              <span class="properties-section-title">Effects</span>
            </div>
            <div class="properties-section-content">
              <!-- Object Opacity -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Opacity</label>
                  <div class="properties-slider-row">
                    <input type="range" class="properties-slider" data-property="opacity" min="0" max="100" value="100">
                    <div class="properties-input-group properties-input-group-small">
                      <input type="number" class="properties-input" data-property="opacity" min="0" max="100" value="100">
                      <span class="properties-unit">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Shadow Toggle -->
              <div class="properties-row">
                <label class="properties-checkbox">
                  <input type="checkbox" data-property="hasShadow">
                  <span class="properties-checkbox-mark"></span>
                  <span>Drop Shadow</span>
                </label>
              </div>

              <!-- Shadow Options (shown when shadow enabled) -->
              <div class="properties-shadow-options">
                <div class="properties-row">
                  <div class="properties-field properties-field-full">
                    <label>Shadow Color</label>
                    <div class="properties-color-row">
                      <button class="properties-color-swatch" data-color-target="shadowColor">
                        <span class="properties-color-preview"></span>
                      </button>
                      <input type="text" class="properties-input properties-color-input" data-property="shadowColor" placeholder="#000000" value="#000000">
                    </div>
                  </div>
                </div>

                <div class="properties-row">
                  <div class="properties-field properties-field-full">
                    <label>Shadow Blur</label>
                    <div class="properties-slider-row">
                      <input type="range" class="properties-slider" data-property="shadowBlur" min="0" max="50" value="10">
                      <div class="properties-input-group properties-input-group-small">
                        <input type="number" class="properties-input" data-property="shadowBlur" min="0" max="100" value="10">
                        <span class="properties-unit">px</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="properties-row properties-row-2col">
                  <div class="properties-field">
                    <label>Offset X</label>
                    <div class="properties-input-group">
                      <input type="number" class="properties-input" data-property="shadowOffsetX" value="5">
                      <span class="properties-unit">px</span>
                    </div>
                  </div>
                  <div class="properties-field">
                    <label>Offset Y</label>
                    <div class="properties-input-group">
                      <input type="number" class="properties-input" data-property="shadowOffsetY" value="5">
                      <span class="properties-unit">px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Alignment Section (for multi-select) -->
          <div class="properties-section properties-section-alignment" data-section="alignment">
            <div class="properties-section-header">
              <span class="properties-section-toggle">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </span>
              <span class="properties-section-title">Alignment</span>
            </div>
            <div class="properties-section-content">
              <!-- Horizontal Alignment -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Horizontal</label>
                  <div class="properties-button-group properties-button-group-full">
                    <button class="properties-btn properties-btn-icon" data-action="alignLeft" title="Align Left">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="4" y1="4" x2="4" y2="20"/>
                        <rect x="7" y="6" width="10" height="4"/>
                        <rect x="7" y="14" width="6" height="4"/>
                      </svg>
                    </button>
                    <button class="properties-btn properties-btn-icon" data-action="alignCenterH" title="Align Center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="4" x2="12" y2="20"/>
                        <rect x="6" y="6" width="12" height="4"/>
                        <rect x="8" y="14" width="8" height="4"/>
                      </svg>
                    </button>
                    <button class="properties-btn properties-btn-icon" data-action="alignRight" title="Align Right">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="20" y1="4" x2="20" y2="20"/>
                        <rect x="7" y="6" width="10" height="4"/>
                        <rect x="11" y="14" width="6" height="4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Vertical Alignment -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Vertical</label>
                  <div class="properties-button-group properties-button-group-full">
                    <button class="properties-btn properties-btn-icon" data-action="alignTop" title="Align Top">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="4" y1="4" x2="20" y2="4"/>
                        <rect x="6" y="7" width="4" height="10"/>
                        <rect x="14" y="7" width="4" height="6"/>
                      </svg>
                    </button>
                    <button class="properties-btn properties-btn-icon" data-action="alignCenterV" title="Align Middle">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="4" y1="12" x2="20" y2="12"/>
                        <rect x="6" y="6" width="4" height="12"/>
                        <rect x="14" y="8" width="4" height="8"/>
                      </svg>
                    </button>
                    <button class="properties-btn properties-btn-icon" data-action="alignBottom" title="Align Bottom">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="4" y1="20" x2="20" y2="20"/>
                        <rect x="6" y="7" width="4" height="10"/>
                        <rect x="14" y="11" width="4" height="6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Distribution -->
              <div class="properties-row">
                <div class="properties-field properties-field-full">
                  <label>Distribute</label>
                  <div class="properties-button-group properties-button-group-full">
                    <button class="properties-btn" data-action="distributeH" title="Distribute Horizontally">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="4" y="8" width="4" height="8"/>
                        <rect x="10" y="8" width="4" height="8"/>
                        <rect x="16" y="8" width="4" height="8"/>
                      </svg>
                      <span>Horizontal</span>
                    </button>
                    <button class="properties-btn" data-action="distributeV" title="Distribute Vertically">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="8" y="4" width="8" height="4"/>
                        <rect x="8" y="10" width="8" height="4"/>
                        <rect x="8" y="16" width="8" height="4"/>
                      </svg>
                      <span>Vertical</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    // Initialize color pickers
    this.initColorPickers();
  }

  initColorPickers() {
    const colorTargets = ['fill', 'stroke', 'shadowColor', 'textColor'];

    colorTargets.forEach(target => {
      this.colorPickers[target] = new ColorPicker({
        onChange: (color) => {
          const property = target === 'textColor' ? 'fill' : target;
          this.handlePropertyChange(property, color.hex);
        }
      });
    });
  }

  bindEvents() {
    // Section collapse/expand
    this.element.querySelectorAll('.properties-section-header').forEach(header => {
      header.addEventListener('click', () => {
        const section = header.closest('.properties-section');
        this.toggleSection(section);
      });
    });

    // Input changes
    this.element.querySelectorAll('.properties-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const property = e.target.dataset.property;
        let value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;

        // Handle opacity/percentage values (convert to 0-1 range)
        if (['opacity', 'fillOpacity', 'strokeOpacity'].includes(property)) {
          value = value / 100;
        }

        this.handlePropertyChange(property, value);
      });
    });

    // Slider changes
    this.element.querySelectorAll('.properties-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const property = e.target.dataset.property;
        let value = parseFloat(e.target.value);

        // Sync with associated number input
        const row = e.target.closest('.properties-slider-row');
        const numberInput = row.querySelector('input[type="number"]');
        if (numberInput) {
          numberInput.value = value;
        }

        // Handle opacity/percentage values
        if (['opacity', 'fillOpacity', 'strokeOpacity'].includes(property)) {
          value = value / 100;
        }

        this.handlePropertyChange(property, value);
      });
    });

    // Select changes
    this.element.querySelectorAll('.properties-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const property = e.target.dataset.property;
        this.handlePropertyChange(property, e.target.value);
      });
    });

    // Checkbox changes
    this.element.querySelectorAll('.properties-checkbox input').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const property = e.target.dataset.property;
        this.handlePropertyChange(property, e.target.checked);

        // Special handling for shadow toggle
        if (property === 'hasShadow') {
          this.updateShadowOptionsVisibility(e.target.checked);
        }
      });
    });

    // Button clicks
    this.element.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleAction(action);
      });
    });

    // Text alignment buttons
    this.element.querySelectorAll('[data-property="textAlign"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = e.currentTarget.dataset.value;
        this.handlePropertyChange('textAlign', value);
        this.updateTextAlignButtons(value);
      });
    });

    // Color swatches - open color picker
    this.element.querySelectorAll('.properties-color-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = swatch.dataset.colorTarget;
        const currentColor = swatch.querySelector('.properties-color-preview').style.backgroundColor;
        this.colorPickers[target].open(swatch, currentColor || '#000000');
      });
    });

    // Color input fields
    this.element.querySelectorAll('.properties-color-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const property = e.target.dataset.property;
        const value = e.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(value) || /^#[0-9A-Fa-f]{3}$/.test(value)) {
          this.handlePropertyChange(property, value);
        }
      });
    });

    // Rotation dial
    const dial = this.element.querySelector('.properties-rotation-dial');
    if (dial) {
      this.bindRotationDial(dial);
    }
  }

  bindRotationDial(dial) {
    let isDragging = false;
    let startAngle = 0;
    let currentRotation = 0;

    const getAngleFromEvent = (e, rect) => {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      return Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    };

    dial.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = dial.getBoundingClientRect();
      startAngle = getAngleFromEvent(e, rect);
      currentRotation = this.selectedObject?.angle || 0;
      dial.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const rect = dial.getBoundingClientRect();
      const currentAngle = getAngleFromEvent(e, rect);
      let delta = currentAngle - startAngle;
      let newRotation = currentRotation + delta;

      // Normalize to 0-360
      newRotation = ((newRotation % 360) + 360) % 360;

      this.handlePropertyChange('angle', Math.round(newRotation));
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        dial.classList.remove('dragging');
      }
    });
  }

  toggleSection(section) {
    const sectionName = section.dataset.section;
    const isCollapsed = section.classList.toggle('collapsed');

    if (isCollapsed) {
      this.collapsedSections.add(sectionName);
    } else {
      this.collapsedSections.delete(sectionName);
    }

    this.saveSectionStates();
  }

  loadSectionStates() {
    try {
      const stored = localStorage.getItem('propertiesPanelSections');
      if (stored) {
        this.collapsedSections = new Set(JSON.parse(stored));
        this.collapsedSections.forEach(sectionName => {
          const section = this.element.querySelector(`[data-section="${sectionName}"]`);
          if (section) section.classList.add('collapsed');
        });
      }
    } catch {
      // Storage not available
    }
  }

  saveSectionStates() {
    try {
      localStorage.setItem('propertiesPanelSections', JSON.stringify([...this.collapsedSections]));
    } catch {
      // Storage not available
    }
  }

  handlePropertyChange(property, value) {
    if (!this.selectedObject && !this.isMultiSelect) return;

    // Update UI immediately
    this.updatePropertyUI(property, value);

    // Emit change event
    this.onPropertyChange(property, value, this.selectedObject);
  }

  handleAction(action) {
    switch (action) {
      case 'flipX':
        if (this.selectedObject) {
          const currentScaleX = this.selectedObject.scaleX || 1;
          this.handlePropertyChange('scaleX', -currentScaleX);
        }
        break;
      case 'flipY':
        if (this.selectedObject) {
          const currentScaleY = this.selectedObject.scaleY || 1;
          this.handlePropertyChange('scaleY', -currentScaleY);
        }
        break;
      case 'alignLeft':
      case 'alignCenterH':
      case 'alignRight':
      case 'alignTop':
      case 'alignCenterV':
      case 'alignBottom':
      case 'distributeH':
      case 'distributeV':
        this.onAlign(action, this.selectedObjects);
        break;
    }
  }

  updatePropertyUI(property, value) {
    // Update input fields
    const inputs = this.element.querySelectorAll(`[data-property="${property}"]`);
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = value;
      } else if (input.type === 'range' || input.type === 'number') {
        // Handle percentage values
        if (['opacity', 'fillOpacity', 'strokeOpacity'].includes(property)) {
          input.value = Math.round(value * 100);
        } else {
          input.value = value;
        }
      } else if (input.tagName === 'SELECT') {
        input.value = value;
      } else {
        input.value = value;
      }
    });

    // Update color swatches
    if (['fill', 'stroke', 'shadowColor'].includes(property)) {
      const swatch = this.element.querySelector(`[data-color-target="${property}"] .properties-color-preview`);
      if (swatch) {
        swatch.style.backgroundColor = value || 'transparent';
      }
    }

    // Update rotation dial
    if (property === 'angle') {
      const indicator = this.element.querySelector('.properties-rotation-dial-indicator');
      if (indicator) {
        indicator.style.transform = `rotate(${value}deg)`;
      }
    }
  }

  updateShadowOptionsVisibility(hasShadow) {
    const shadowOptions = this.element.querySelector('.properties-shadow-options');
    if (shadowOptions) {
      shadowOptions.style.display = hasShadow ? 'block' : 'none';
    }
  }

  updateTextAlignButtons(value) {
    const buttons = this.element.querySelectorAll('[data-property="textAlign"]');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === value);
    });
  }

  /**
   * Set the selected object and update the panel
   * @param {Object} obj - The selected object (Fabric.js object or similar)
   */
  setSelectedObject(obj) {
    this.selectedObject = obj;
    this.selectedObjects = obj ? [obj] : [];
    this.isMultiSelect = false;

    if (!obj) {
      this.clearSelection();
      return;
    }

    // Show properties content, hide no selection message
    this.element.querySelector('.properties-no-selection').style.display = 'none';
    this.element.querySelector('.properties-sections').style.display = 'block';

    // Determine object type and show/hide relevant sections
    const isText = obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox';
    this.element.querySelector('.properties-section-text').style.display = isText ? 'block' : 'none';
    this.element.querySelector('.properties-section-alignment').style.display = 'none';

    // Update all property values
    this.updateAllProperties(obj);
  }

  /**
   * Set multiple selected objects
   * @param {Array} objects - Array of selected objects
   */
  setSelectedObjects(objects) {
    this.selectedObjects = objects || [];
    this.selectedObject = objects && objects.length > 0 ? objects[0] : null;
    this.isMultiSelect = objects && objects.length > 1;

    if (!objects || objects.length === 0) {
      this.clearSelection();
      return;
    }

    // Show properties content
    this.element.querySelector('.properties-no-selection').style.display = 'none';
    this.element.querySelector('.properties-sections').style.display = 'block';

    // Show alignment section for multi-select
    this.element.querySelector('.properties-section-alignment').style.display =
      this.isMultiSelect ? 'block' : 'none';

    // For single selection, update normally
    if (!this.isMultiSelect) {
      this.setSelectedObject(objects[0]);
      return;
    }

    // For multi-select, show common properties or "mixed" state
    this.updateMultiSelectProperties(objects);
  }

  /**
   * Clear selection and show "no selection" state
   */
  clearSelection() {
    this.selectedObject = null;
    this.selectedObjects = [];
    this.isMultiSelect = false;

    this.element.querySelector('.properties-no-selection').style.display = 'flex';
    this.element.querySelector('.properties-sections').style.display = 'none';
  }

  updateAllProperties(obj) {
    // Transform properties
    this.updatePropertyUI('left', Math.round(obj.left || 0));
    this.updatePropertyUI('top', Math.round(obj.top || 0));
    this.updatePropertyUI('width', Math.round((obj.width || 0) * (obj.scaleX || 1)));
    this.updatePropertyUI('height', Math.round((obj.height || 0) * (obj.scaleY || 1)));
    this.updatePropertyUI('angle', Math.round(obj.angle || 0));
    this.updatePropertyUI('scaleX', obj.scaleX || 1);
    this.updatePropertyUI('scaleY', obj.scaleY || 1);

    // Appearance properties
    this.updatePropertyUI('fill', obj.fill || '#000000');
    this.updatePropertyUI('fillOpacity', obj.fillOpacity !== undefined ? obj.fillOpacity : 1);
    this.updatePropertyUI('stroke', obj.stroke || '#000000');
    this.updatePropertyUI('strokeWidth', obj.strokeWidth || 0);
    this.updatePropertyUI('strokeOpacity', obj.strokeOpacity !== undefined ? obj.strokeOpacity : 1);

    // Determine stroke style from dash array
    let strokeStyle = 'solid';
    if (obj.strokeDashArray) {
      const dashStr = obj.strokeDashArray.join(',');
      const found = STROKE_STYLES.find(s => s.dashArray === dashStr);
      if (found) strokeStyle = found.value;
    }
    this.updatePropertyUI('strokeStyle', strokeStyle);

    // Update color swatches
    const fillSwatch = this.element.querySelector('[data-color-target="fill"] .properties-color-preview');
    const strokeSwatch = this.element.querySelector('[data-color-target="stroke"] .properties-color-preview');
    if (fillSwatch) fillSwatch.style.backgroundColor = obj.fill || 'transparent';
    if (strokeSwatch) strokeSwatch.style.backgroundColor = obj.stroke || 'transparent';

    // Effects properties
    this.updatePropertyUI('opacity', obj.opacity !== undefined ? obj.opacity : 1);

    const hasShadow = !!(obj.shadow && (obj.shadow.blur || obj.shadow.offsetX || obj.shadow.offsetY));
    this.updatePropertyUI('hasShadow', hasShadow);
    this.updateShadowOptionsVisibility(hasShadow);

    if (obj.shadow) {
      this.updatePropertyUI('shadowColor', obj.shadow.color || '#000000');
      this.updatePropertyUI('shadowBlur', obj.shadow.blur || 0);
      this.updatePropertyUI('shadowOffsetX', obj.shadow.offsetX || 0);
      this.updatePropertyUI('shadowOffsetY', obj.shadow.offsetY || 0);

      const shadowSwatch = this.element.querySelector('[data-color-target="shadowColor"] .properties-color-preview');
      if (shadowSwatch) shadowSwatch.style.backgroundColor = obj.shadow.color || '#000000';
    }

    // Text properties (if applicable)
    if (obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox') {
      this.updatePropertyUI('fontFamily', obj.fontFamily || 'Arial');
      this.updatePropertyUI('fontSize', obj.fontSize || 16);
      this.updatePropertyUI('fontWeight', String(obj.fontWeight || '400'));
      this.updatePropertyUI('textAlign', obj.textAlign || 'left');
      this.updatePropertyUI('lineHeight', obj.lineHeight || 1.2);
      this.updatePropertyUI('charSpacing', obj.charSpacing || 0);

      this.updateTextAlignButtons(obj.textAlign || 'left');

      const textColorSwatch = this.element.querySelector('[data-color-target="textColor"] .properties-color-preview');
      if (textColorSwatch) textColorSwatch.style.backgroundColor = obj.fill || '#000000';
    }
  }

  updateMultiSelectProperties(objects) {
    // For multi-select, we could show common values or "Mixed" for different values
    // This is a simplified version - you could enhance this to show actual mixed states

    // Hide text section for multi-select (unless all are text)
    const allText = objects.every(obj =>
      obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox'
    );
    this.element.querySelector('.properties-section-text').style.display = allText ? 'block' : 'none';

    // Use first object's values as reference
    if (objects.length > 0) {
      this.updateAllProperties(objects[0]);
    }
  }

  /**
   * Get the current panel element
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Mount the panel to a container
   * @param {HTMLElement|string} container - Container element or selector
   */
  mount(container) {
    const target = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (target) {
      target.appendChild(this.element);
    }
  }

  /**
   * Destroy the panel and clean up
   */
  destroy() {
    // Destroy color pickers
    Object.values(this.colorPickers).forEach(picker => picker.destroy());

    // Remove element
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default PropertiesPanel;
