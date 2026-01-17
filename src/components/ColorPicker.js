/**
 * ColorPicker Component
 * A comprehensive color picker with spectrum selector, sliders, and presets.
 *
 * Features:
 * - Color spectrum selector (saturation/brightness)
 * - Hue slider
 * - Opacity slider
 * - Hex input
 * - RGB inputs
 * - Recent colors history
 * - Preset colors from design tokens
 */

// Design token preset colors
const PRESET_COLORS = [
  '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
  '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00', '#9ACD32',
  '#00FF00', '#00FA9A', '#00FFFF', '#1E90FF', '#0000FF', '#8A2BE2',
  '#FF00FF', '#FF1493', '#DC143C', '#8B0000', '#FF6347', '#FFA07A',
  '#20B2AA', '#5F9EA0', '#4682B4', '#6A5ACD', '#9370DB', '#BA55D3',
  '#2E8B57', '#228B22', '#006400', '#556B2F', '#8B4513', '#A0522D'
];

// Maximum recent colors to store
const MAX_RECENT_COLORS = 12;

export class ColorPicker {
  constructor(options = {}) {
    this.element = null;
    this.isOpen = false;
    this.currentColor = { h: 0, s: 100, v: 100, a: 1 };
    this.recentColors = this.loadRecentColors();
    this.onChange = options.onChange || (() => {});
    this.onClose = options.onClose || (() => {});
    this.anchorElement = options.anchor || null;

    this.spectrumCanvas = null;
    this.hueCanvas = null;
    this.opacityCanvas = null;
    this.spectrumCtx = null;
    this.hueCtx = null;
    this.opacityCtx = null;

    this.isDraggingSpectrum = false;
    this.isDraggingHue = false;
    this.isDraggingOpacity = false;

    this.init();
  }

  init() {
    this.createElement();
    this.setupCanvases();
    this.bindEvents();
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'color-picker';
    this.element.innerHTML = `
      <div class="color-picker-header">
        <span class="color-picker-title">Color Picker</span>
        <button class="color-picker-close" aria-label="Close">&times;</button>
      </div>

      <div class="color-picker-body">
        <!-- Spectrum (Saturation/Brightness) -->
        <div class="color-picker-spectrum-container">
          <canvas class="color-picker-spectrum" width="200" height="150"></canvas>
          <div class="color-picker-spectrum-cursor"></div>
        </div>

        <!-- Hue Slider -->
        <div class="color-picker-slider-row">
          <label>Hue</label>
          <div class="color-picker-hue-container">
            <canvas class="color-picker-hue" width="180" height="16"></canvas>
            <div class="color-picker-hue-cursor"></div>
          </div>
        </div>

        <!-- Opacity Slider -->
        <div class="color-picker-slider-row">
          <label>Opacity</label>
          <div class="color-picker-opacity-container">
            <canvas class="color-picker-opacity" width="180" height="16"></canvas>
            <div class="color-picker-opacity-cursor"></div>
          </div>
        </div>

        <!-- Color Preview -->
        <div class="color-picker-preview-row">
          <div class="color-picker-preview-wrapper">
            <div class="color-picker-preview-bg"></div>
            <div class="color-picker-preview"></div>
          </div>
          <div class="color-picker-preview-values">
            <span class="color-picker-hex-display">#000000</span>
            <span class="color-picker-opacity-display">100%</span>
          </div>
        </div>

        <!-- Hex Input -->
        <div class="color-picker-input-row">
          <label>Hex</label>
          <input type="text" class="color-picker-hex-input" maxlength="7" placeholder="#000000">
        </div>

        <!-- RGB Inputs -->
        <div class="color-picker-rgb-row">
          <div class="color-picker-rgb-input">
            <label>R</label>
            <input type="number" class="color-picker-r" min="0" max="255" value="0">
          </div>
          <div class="color-picker-rgb-input">
            <label>G</label>
            <input type="number" class="color-picker-g" min="0" max="255" value="0">
          </div>
          <div class="color-picker-rgb-input">
            <label>B</label>
            <input type="number" class="color-picker-b" min="0" max="255" value="0">
          </div>
          <div class="color-picker-rgb-input">
            <label>A</label>
            <input type="number" class="color-picker-a" min="0" max="100" value="100">
          </div>
        </div>

        <!-- Recent Colors -->
        <div class="color-picker-section">
          <label class="color-picker-section-label">Recent</label>
          <div class="color-picker-swatches color-picker-recent"></div>
        </div>

        <!-- Preset Colors -->
        <div class="color-picker-section">
          <label class="color-picker-section-label">Presets</label>
          <div class="color-picker-swatches color-picker-presets"></div>
        </div>
      </div>
    `;

    // Populate preset colors
    const presetsContainer = this.element.querySelector('.color-picker-presets');
    PRESET_COLORS.forEach(color => {
      const swatch = document.createElement('button');
      swatch.className = 'color-picker-swatch';
      swatch.style.backgroundColor = color;
      swatch.dataset.color = color;
      swatch.setAttribute('aria-label', `Select color ${color}`);
      presetsContainer.appendChild(swatch);
    });

    this.updateRecentColorsUI();
  }

  setupCanvases() {
    this.spectrumCanvas = this.element.querySelector('.color-picker-spectrum');
    this.hueCanvas = this.element.querySelector('.color-picker-hue');
    this.opacityCanvas = this.element.querySelector('.color-picker-opacity');

    this.spectrumCtx = this.spectrumCanvas.getContext('2d');
    this.hueCtx = this.hueCanvas.getContext('2d');
    this.opacityCtx = this.opacityCanvas.getContext('2d');

    this.drawHueSlider();
    this.drawSpectrum();
    this.drawOpacitySlider();
  }

  drawSpectrum() {
    const ctx = this.spectrumCtx;
    const width = this.spectrumCanvas.width;
    const height = this.spectrumCanvas.height;

    // Create base color from current hue
    const baseColor = this.hsvToRgb(this.currentColor.h, 100, 100);

    // Draw saturation gradient (left to right: white to color)
    const satGradient = ctx.createLinearGradient(0, 0, width, 0);
    satGradient.addColorStop(0, '#FFFFFF');
    satGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
    ctx.fillStyle = satGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw brightness gradient (top to bottom: transparent to black)
    const valGradient = ctx.createLinearGradient(0, 0, 0, height);
    valGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    valGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = valGradient;
    ctx.fillRect(0, 0, width, height);

    this.updateSpectrumCursor();
  }

  drawHueSlider() {
    const ctx = this.hueCtx;
    const width = this.hueCanvas.width;
    const height = this.hueCanvas.height;

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    for (let i = 0; i <= 360; i += 60) {
      const rgb = this.hsvToRgb(i, 100, 100);
      gradient.addColorStop(i / 360, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    this.updateHueCursor();
  }

  drawOpacitySlider() {
    const ctx = this.opacityCtx;
    const width = this.opacityCanvas.width;
    const height = this.opacityCanvas.height;

    // Draw checkerboard pattern for transparency
    const checkSize = 4;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#CCCCCC';
    for (let y = 0; y < height; y += checkSize) {
      for (let x = 0; x < width; x += checkSize) {
        if ((x / checkSize + y / checkSize) % 2 === 0) {
          ctx.fillRect(x, y, checkSize, checkSize);
        }
      }
    }

    // Draw opacity gradient
    const rgb = this.hsvToRgb(this.currentColor.h, this.currentColor.s, this.currentColor.v);
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
    gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    this.updateOpacityCursor();
  }

  updateSpectrumCursor() {
    const cursor = this.element.querySelector('.color-picker-spectrum-cursor');
    const x = (this.currentColor.s / 100) * this.spectrumCanvas.width;
    const y = (1 - this.currentColor.v / 100) * this.spectrumCanvas.height;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }

  updateHueCursor() {
    const cursor = this.element.querySelector('.color-picker-hue-cursor');
    const x = (this.currentColor.h / 360) * this.hueCanvas.width;
    cursor.style.left = `${x}px`;
  }

  updateOpacityCursor() {
    const cursor = this.element.querySelector('.color-picker-opacity-cursor');
    const x = this.currentColor.a * this.opacityCanvas.width;
    cursor.style.left = `${x}px`;
  }

  bindEvents() {
    // Close button
    this.element.querySelector('.color-picker-close').addEventListener('click', () => {
      this.close();
    });

    // Spectrum interactions
    this.spectrumCanvas.addEventListener('mousedown', (e) => this.onSpectrumMouseDown(e));

    // Hue slider interactions
    this.hueCanvas.addEventListener('mousedown', (e) => this.onHueMouseDown(e));

    // Opacity slider interactions
    this.opacityCanvas.addEventListener('mousedown', (e) => this.onOpacityMouseDown(e));

    // Global mouse events
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseup', () => this.onMouseUp());

    // Hex input
    const hexInput = this.element.querySelector('.color-picker-hex-input');
    hexInput.addEventListener('change', (e) => this.onHexInput(e));
    hexInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.onHexInput(e);
    });

    // RGB inputs
    this.element.querySelector('.color-picker-r').addEventListener('change', () => this.onRgbInput());
    this.element.querySelector('.color-picker-g').addEventListener('change', () => this.onRgbInput());
    this.element.querySelector('.color-picker-b').addEventListener('change', () => this.onRgbInput());
    this.element.querySelector('.color-picker-a').addEventListener('change', () => this.onAlphaInput());

    // Preset and recent color swatches
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('color-picker-swatch')) {
        const color = e.target.dataset.color;
        if (color) {
          this.setColorFromHex(color);
          this.emitChange();
        }
      }
    });

    // Prevent closing when clicking inside
    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  onSpectrumMouseDown(e) {
    this.isDraggingSpectrum = true;
    this.updateSpectrumFromEvent(e);
  }

  onHueMouseDown(e) {
    this.isDraggingHue = true;
    this.updateHueFromEvent(e);
  }

  onOpacityMouseDown(e) {
    this.isDraggingOpacity = true;
    this.updateOpacityFromEvent(e);
  }

  onMouseMove(e) {
    if (this.isDraggingSpectrum) {
      this.updateSpectrumFromEvent(e);
    } else if (this.isDraggingHue) {
      this.updateHueFromEvent(e);
    } else if (this.isDraggingOpacity) {
      this.updateOpacityFromEvent(e);
    }
  }

  onMouseUp() {
    if (this.isDraggingSpectrum || this.isDraggingHue || this.isDraggingOpacity) {
      this.emitChange();
    }
    this.isDraggingSpectrum = false;
    this.isDraggingHue = false;
    this.isDraggingOpacity = false;
  }

  updateSpectrumFromEvent(e) {
    const rect = this.spectrumCanvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    this.currentColor.s = (x / rect.width) * 100;
    this.currentColor.v = (1 - y / rect.height) * 100;

    this.updateUI();
  }

  updateHueFromEvent(e) {
    const rect = this.hueCanvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

    this.currentColor.h = (x / rect.width) * 360;

    this.drawSpectrum();
    this.drawOpacitySlider();
    this.updateUI();
  }

  updateOpacityFromEvent(e) {
    const rect = this.opacityCanvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

    this.currentColor.a = x / rect.width;

    this.updateUI();
  }

  onHexInput(e) {
    let hex = e.target.value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;

    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      this.setColorFromHex(hex);
      this.emitChange();
    }
  }

  onRgbInput() {
    const r = parseInt(this.element.querySelector('.color-picker-r').value) || 0;
    const g = parseInt(this.element.querySelector('.color-picker-g').value) || 0;
    const b = parseInt(this.element.querySelector('.color-picker-b').value) || 0;

    const hsv = this.rgbToHsv(r, g, b);
    this.currentColor.h = hsv.h;
    this.currentColor.s = hsv.s;
    this.currentColor.v = hsv.v;

    this.drawSpectrum();
    this.drawOpacitySlider();
    this.updateUI();
    this.emitChange();
  }

  onAlphaInput() {
    const a = parseInt(this.element.querySelector('.color-picker-a').value) || 0;
    this.currentColor.a = Math.max(0, Math.min(100, a)) / 100;
    this.updateUI();
    this.emitChange();
  }

  updateUI() {
    const rgb = this.hsvToRgb(this.currentColor.h, this.currentColor.s, this.currentColor.v);
    const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);

    // Update preview
    const preview = this.element.querySelector('.color-picker-preview');
    preview.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.currentColor.a})`;

    // Update hex display
    this.element.querySelector('.color-picker-hex-display').textContent = hex;
    this.element.querySelector('.color-picker-opacity-display').textContent =
      `${Math.round(this.currentColor.a * 100)}%`;

    // Update hex input
    this.element.querySelector('.color-picker-hex-input').value = hex;

    // Update RGB inputs
    this.element.querySelector('.color-picker-r').value = rgb.r;
    this.element.querySelector('.color-picker-g').value = rgb.g;
    this.element.querySelector('.color-picker-b').value = rgb.b;
    this.element.querySelector('.color-picker-a').value = Math.round(this.currentColor.a * 100);

    // Update cursors
    this.updateSpectrumCursor();
    this.updateHueCursor();
    this.updateOpacityCursor();
  }

  setColor(color) {
    if (typeof color === 'string') {
      this.setColorFromHex(color);
    } else if (color && typeof color === 'object') {
      if ('r' in color) {
        const hsv = this.rgbToHsv(color.r, color.g, color.b);
        this.currentColor.h = hsv.h;
        this.currentColor.s = hsv.s;
        this.currentColor.v = hsv.v;
        this.currentColor.a = color.a !== undefined ? color.a : 1;
      } else if ('h' in color) {
        this.currentColor = { ...this.currentColor, ...color };
      }
    }

    this.drawSpectrum();
    this.drawOpacitySlider();
    this.updateUI();
  }

  setColorFromHex(hex) {
    const rgb = this.hexToRgb(hex);
    if (rgb) {
      const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
      this.currentColor.h = hsv.h;
      this.currentColor.s = hsv.s;
      this.currentColor.v = hsv.v;

      this.drawSpectrum();
      this.drawOpacitySlider();
      this.updateUI();
    }
  }

  getColor() {
    const rgb = this.hsvToRgb(this.currentColor.h, this.currentColor.s, this.currentColor.v);
    const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);

    return {
      hex,
      rgb: { ...rgb, a: this.currentColor.a },
      hsv: { ...this.currentColor },
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.currentColor.a})`,
      hexa: this.currentColor.a < 1
        ? hex + Math.round(this.currentColor.a * 255).toString(16).padStart(2, '0')
        : hex
    };
  }

  emitChange() {
    const color = this.getColor();
    this.onChange(color);
    this.addToRecent(color.hex);
  }

  // Color conversion utilities
  hsvToRgb(h, s, v) {
    h = h / 360;
    s = s / 100;
    v = v / 100;

    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h, s, v;
    v = max;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: h * 360,
      s: s * 100,
      v: v * 100
    };
  }

  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Recent colors management
  loadRecentColors() {
    try {
      const stored = localStorage.getItem('colorPickerRecentColors');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  saveRecentColors() {
    try {
      localStorage.setItem('colorPickerRecentColors', JSON.stringify(this.recentColors));
    } catch {
      // Storage not available
    }
  }

  addToRecent(hex) {
    // Remove if already exists
    const index = this.recentColors.indexOf(hex);
    if (index > -1) {
      this.recentColors.splice(index, 1);
    }

    // Add to front
    this.recentColors.unshift(hex);

    // Limit size
    if (this.recentColors.length > MAX_RECENT_COLORS) {
      this.recentColors = this.recentColors.slice(0, MAX_RECENT_COLORS);
    }

    this.saveRecentColors();
    this.updateRecentColorsUI();
  }

  updateRecentColorsUI() {
    const container = this.element.querySelector('.color-picker-recent');
    container.innerHTML = '';

    this.recentColors.forEach(color => {
      const swatch = document.createElement('button');
      swatch.className = 'color-picker-swatch';
      swatch.style.backgroundColor = color;
      swatch.dataset.color = color;
      swatch.setAttribute('aria-label', `Select recent color ${color}`);
      container.appendChild(swatch);
    });

    if (this.recentColors.length === 0) {
      const empty = document.createElement('span');
      empty.className = 'color-picker-empty';
      empty.textContent = 'No recent colors';
      container.appendChild(empty);
    }
  }

  // Open/close methods
  open(anchorElement, initialColor) {
    if (initialColor) {
      this.setColor(initialColor);
    }

    this.anchorElement = anchorElement || this.anchorElement;

    if (!document.body.contains(this.element)) {
      document.body.appendChild(this.element);
    }

    // Position the picker
    if (this.anchorElement) {
      const rect = this.anchorElement.getBoundingClientRect();
      const pickerRect = this.element.getBoundingClientRect();

      let left = rect.left;
      let top = rect.bottom + 8;

      // Adjust if off screen
      if (left + pickerRect.width > window.innerWidth) {
        left = window.innerWidth - pickerRect.width - 16;
      }
      if (top + pickerRect.height > window.innerHeight) {
        top = rect.top - pickerRect.height - 8;
      }

      this.element.style.left = `${Math.max(8, left)}px`;
      this.element.style.top = `${Math.max(8, top)}px`;
    }

    this.element.classList.add('open');
    this.isOpen = true;

    // Close when clicking outside
    setTimeout(() => {
      document.addEventListener('click', this.handleOutsideClick);
    }, 0);
  }

  handleOutsideClick = (e) => {
    if (this.isOpen && !this.element.contains(e.target) && e.target !== this.anchorElement) {
      this.close();
    }
  };

  close() {
    this.element.classList.remove('open');
    this.isOpen = false;
    document.removeEventListener('click', this.handleOutsideClick);
    this.onClose();
  }

  destroy() {
    document.removeEventListener('mousemove', (e) => this.onMouseMove(e));
    document.removeEventListener('mouseup', () => this.onMouseUp());
    document.removeEventListener('click', this.handleOutsideClick);

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default ColorPicker;
