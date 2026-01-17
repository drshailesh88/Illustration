/**
 * Icon Picker Component for FINNISH Scientific Illustration Editor
 *
 * Provides a UI for browsing, searching, and selecting scientific icons
 * to add to the canvas.
 *
 * Features:
 * - Category tabs (Biology, Chemistry, Medicine, Physics, Engineering, Math, General)
 * - Search input with real-time filtering
 * - Icon grid display with visual preview
 * - Click to add icon to canvas
 * - Hover preview with icon details
 * - Favorites and recent icons sections
 */

import {
  ICON_CATEGORIES,
  getAllIcons,
  getIconsByCategory,
  searchIcons,
  getIconMetadata,
  getIconSvg,
  getFavorites,
  getRecentIcons,
  toggleFavorite,
  isFavorite,
  initializeIconLibrary
} from '../services/IconLibrary.js';

/**
 * IconPicker class - manages the icon picker UI
 */
export class IconPicker {
  /**
   * Create an IconPicker instance
   * @param {Object} options - Configuration options
   * @param {HTMLElement} options.container - Container element for the picker
   * @param {Function} options.onIconSelect - Callback when icon is selected
   * @param {Function} [options.onClose] - Callback when picker is closed
   */
  constructor(options) {
    this.container = options.container;
    this.onIconSelect = options.onIconSelect || (() => {});
    this.onClose = options.onClose || (() => {});

    this.currentCategory = 'medicine';
    this.searchQuery = '';
    this.showFavorites = false;
    this.showRecent = false;
    this.previewIcon = null;
    this.initialized = false;

    this.elements = {};
  }

  /**
   * Initialize the icon picker
   */
  async init() {
    if (this.initialized) return;

    // Initialize the icon library
    await initializeIconLibrary();

    // Build the UI
    this.render();
    this.attachEventListeners();

    // Load initial icons
    this.updateIconGrid();

    this.initialized = true;
  }

  /**
   * Render the icon picker UI
   */
  render() {
    this.container.innerHTML = '';
    this.container.className = 'icon-picker';

    // Create main structure
    const html = `
      <div class="icon-picker-header">
        <h3 class="icon-picker-title">Scientific Icons</h3>
        <button class="icon-picker-close" aria-label="Close">&times;</button>
      </div>

      <div class="icon-picker-search">
        <input
          type="text"
          class="icon-picker-search-input"
          placeholder="Search icons..."
          aria-label="Search icons"
        />
        <svg class="icon-picker-search-icon" viewBox="0 0 24 24" width="20" height="20">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
          <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="icon-picker-quick-access">
        <button class="quick-access-btn" data-type="favorites">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="currentColor"/>
          </svg>
          Favorites
        </button>
        <button class="quick-access-btn" data-type="recent">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Recent
        </button>
      </div>

      <div class="icon-picker-tabs">
        ${Object.entries(ICON_CATEGORIES).map(([key, cat]) => `
          <button
            class="icon-picker-tab ${key === this.currentCategory ? 'active' : ''}"
            data-category="${key}"
            style="--tab-color: ${cat.color}"
          >
            ${cat.name}
          </button>
        `).join('')}
      </div>

      <div class="icon-picker-grid-container">
        <div class="icon-picker-grid"></div>
      </div>

      <div class="icon-picker-preview">
        <div class="preview-icon"></div>
        <div class="preview-details">
          <span class="preview-name">Hover over an icon</span>
          <span class="preview-tags"></span>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    // Store element references
    this.elements = {
      closeBtn: this.container.querySelector('.icon-picker-close'),
      searchInput: this.container.querySelector('.icon-picker-search-input'),
      tabs: this.container.querySelectorAll('.icon-picker-tab'),
      quickAccessBtns: this.container.querySelectorAll('.quick-access-btn'),
      grid: this.container.querySelector('.icon-picker-grid'),
      preview: this.container.querySelector('.icon-picker-preview'),
      previewIcon: this.container.querySelector('.preview-icon'),
      previewName: this.container.querySelector('.preview-name'),
      previewTags: this.container.querySelector('.preview-tags')
    };

    // Inject styles
    this.injectStyles();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    this.elements.closeBtn.addEventListener('click', () => {
      this.onClose();
    });

    // Search input
    this.elements.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.showFavorites = false;
      this.showRecent = false;
      this.updateQuickAccessButtons();
      this.updateIconGrid();
    });

    // Category tabs
    this.elements.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentCategory = tab.dataset.category;
        this.showFavorites = false;
        this.showRecent = false;
        this.updateTabs();
        this.updateQuickAccessButtons();
        this.updateIconGrid();
      });
    });

    // Quick access buttons
    this.elements.quickAccessBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        if (type === 'favorites') {
          this.showFavorites = !this.showFavorites;
          this.showRecent = false;
        } else if (type === 'recent') {
          this.showRecent = !this.showRecent;
          this.showFavorites = false;
        }
        this.updateQuickAccessButtons();
        this.updateIconGrid();
      });
    });
  }

  /**
   * Update category tabs visual state
   */
  updateTabs() {
    this.elements.tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === this.currentCategory);
    });
  }

  /**
   * Update quick access buttons visual state
   */
  updateQuickAccessButtons() {
    this.elements.quickAccessBtns.forEach(btn => {
      const type = btn.dataset.type;
      if (type === 'favorites') {
        btn.classList.toggle('active', this.showFavorites);
      } else if (type === 'recent') {
        btn.classList.toggle('active', this.showRecent);
      }
    });
  }

  /**
   * Update the icon grid display
   */
  updateIconGrid() {
    let icons = [];

    if (this.showFavorites) {
      const favoriteIds = getFavorites();
      icons = favoriteIds.map(id => getIconMetadata(id)).filter(Boolean);
    } else if (this.showRecent) {
      const recentIds = getRecentIcons();
      icons = recentIds.map(id => getIconMetadata(id)).filter(Boolean);
    } else if (this.searchQuery) {
      icons = searchIcons(this.searchQuery, this.currentCategory);
    } else {
      icons = getIconsByCategory(this.currentCategory);
    }

    this.renderIcons(icons);
  }

  /**
   * Render icons in the grid
   * @param {Array} icons - Array of icon metadata
   */
  async renderIcons(icons) {
    this.elements.grid.innerHTML = '';

    if (icons.length === 0) {
      this.elements.grid.innerHTML = `
        <div class="icon-picker-empty">
          <p>No icons found</p>
          ${this.showFavorites ? '<p class="hint">Add favorites by clicking the star on icons</p>' : ''}
          ${this.showRecent ? '<p class="hint">Recently used icons will appear here</p>' : ''}
        </div>
      `;
      return;
    }

    for (const icon of icons) {
      const iconEl = document.createElement('div');
      iconEl.className = 'icon-picker-item';
      iconEl.dataset.iconId = icon.id;

      const favorite = isFavorite(icon.id);

      iconEl.innerHTML = `
        <div class="icon-item-svg"></div>
        <span class="icon-item-name">${icon.name}</span>
        <button class="icon-item-favorite ${favorite ? 'active' : ''}" aria-label="Toggle favorite">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="${favorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      `;

      // Load and display SVG
      this.loadIconPreview(icon, iconEl.querySelector('.icon-item-svg'));

      // Click to select
      iconEl.addEventListener('click', (e) => {
        if (!e.target.closest('.icon-item-favorite')) {
          this.selectIcon(icon);
        }
      });

      // Favorite button
      iconEl.querySelector('.icon-item-favorite').addEventListener('click', (e) => {
        e.stopPropagation();
        const newState = toggleFavorite(icon.id);
        e.currentTarget.classList.toggle('active', newState);
        e.currentTarget.querySelector('path').setAttribute('fill', newState ? 'currentColor' : 'none');
      });

      // Hover preview
      iconEl.addEventListener('mouseenter', () => {
        this.showPreview(icon);
      });

      iconEl.addEventListener('mouseleave', () => {
        this.hidePreview();
      });

      this.elements.grid.appendChild(iconEl);
    }
  }

  /**
   * Load icon SVG for preview in grid
   * @param {Object} icon - Icon metadata
   * @param {HTMLElement} container - Container element
   */
  async loadIconPreview(icon, container) {
    try {
      const svgContent = await getIconSvg(icon.id);
      container.innerHTML = svgContent;

      // Ensure SVG scales properly
      const svg = container.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.display = 'block';
      }
    } catch (error) {
      container.innerHTML = `
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <rect x="2" y="2" width="20" height="20" fill="none" stroke="#ccc" stroke-width="2" stroke-dasharray="4"/>
          <text x="12" y="16" text-anchor="middle" font-size="8" fill="#999">?</text>
        </svg>
      `;
    }
  }

  /**
   * Show icon preview in detail panel
   * @param {Object} icon - Icon metadata
   */
  async showPreview(icon) {
    this.previewIcon = icon;
    this.elements.previewName.textContent = icon.name;
    this.elements.previewTags.textContent = icon.tags.slice(0, 4).join(', ');

    try {
      const svgContent = await getIconSvg(icon.id);
      this.elements.previewIcon.innerHTML = svgContent;

      const svg = this.elements.previewIcon.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', '48');
        svg.setAttribute('height', '48');
      }
    } catch {
      this.elements.previewIcon.innerHTML = '';
    }
  }

  /**
   * Hide preview panel
   */
  hidePreview() {
    this.previewIcon = null;
    this.elements.previewName.textContent = 'Hover over an icon';
    this.elements.previewTags.textContent = '';
    this.elements.previewIcon.innerHTML = '';
  }

  /**
   * Handle icon selection
   * @param {Object} icon - Icon metadata
   */
  async selectIcon(icon) {
    try {
      const svgContent = await getIconSvg(icon.id);
      this.onIconSelect({
        icon,
        svgContent
      });
    } catch (error) {
      console.error('Failed to select icon:', error);
    }
  }

  /**
   * Show the icon picker
   */
  show() {
    this.container.style.display = 'flex';
  }

  /**
   * Hide the icon picker
   */
  hide() {
    this.container.style.display = 'none';
  }

  /**
   * Toggle picker visibility
   */
  toggle() {
    if (this.container.style.display === 'none') {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Inject component styles
   */
  injectStyles() {
    const styleId = 'icon-picker-styles';
    if (document.getElementById(styleId)) return;

    const styles = document.createElement('style');
    styles.id = styleId;
    styles.textContent = `
      .icon-picker {
        display: flex;
        flex-direction: column;
        width: 360px;
        max-height: 520px;
        background: #1e1e1e;
        border: 1px solid #333;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #e0e0e0;
        overflow: hidden;
      }

      .icon-picker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #333;
      }

      .icon-picker-title {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
      }

      .icon-picker-close {
        background: none;
        border: none;
        color: #888;
        font-size: 20px;
        cursor: pointer;
        padding: 4px 8px;
        line-height: 1;
        border-radius: 4px;
        transition: all 0.15s;
      }

      .icon-picker-close:hover {
        background: #333;
        color: #fff;
      }

      .icon-picker-search {
        position: relative;
        padding: 12px 16px;
      }

      .icon-picker-search-input {
        width: 100%;
        padding: 8px 12px 8px 36px;
        background: #2a2a2a;
        border: 1px solid #444;
        border-radius: 6px;
        color: #e0e0e0;
        font-size: 13px;
        outline: none;
        transition: border-color 0.15s;
        box-sizing: border-box;
      }

      .icon-picker-search-input:focus {
        border-color: #666;
      }

      .icon-picker-search-input::placeholder {
        color: #666;
      }

      .icon-picker-search-icon {
        position: absolute;
        left: 26px;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
        pointer-events: none;
      }

      .icon-picker-quick-access {
        display: flex;
        gap: 8px;
        padding: 0 16px 12px;
      }

      .quick-access-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: #2a2a2a;
        border: 1px solid #444;
        border-radius: 16px;
        color: #888;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.15s;
      }

      .quick-access-btn:hover {
        background: #333;
        color: #e0e0e0;
      }

      .quick-access-btn.active {
        background: #3a3a3a;
        border-color: #666;
        color: #fff;
      }

      .icon-picker-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding: 0 12px 12px;
      }

      .icon-picker-tab {
        padding: 6px 10px;
        background: transparent;
        border: none;
        border-radius: 4px;
        color: #888;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
      }

      .icon-picker-tab:hover {
        background: #2a2a2a;
        color: #e0e0e0;
      }

      .icon-picker-tab.active {
        background: var(--tab-color, #666);
        color: #fff;
      }

      .icon-picker-grid-container {
        flex: 1;
        overflow-y: auto;
        padding: 0 12px;
        min-height: 200px;
      }

      .icon-picker-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
        padding-bottom: 12px;
      }

      .icon-picker-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        background: #2a2a2a;
        border: 1px solid transparent;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s;
      }

      .icon-picker-item:hover {
        background: #333;
        border-color: #555;
      }

      .icon-item-svg {
        width: 32px;
        height: 32px;
        margin-bottom: 4px;
        color: #e0e0e0;
      }

      .icon-item-svg svg {
        width: 100%;
        height: 100%;
      }

      .icon-item-name {
        font-size: 9px;
        color: #888;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

      .icon-item-favorite {
        position: absolute;
        top: 2px;
        right: 2px;
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 2px;
        opacity: 0;
        transition: opacity 0.15s;
      }

      .icon-picker-item:hover .icon-item-favorite {
        opacity: 1;
      }

      .icon-item-favorite:hover {
        color: #ffc107;
      }

      .icon-item-favorite.active {
        color: #ffc107;
        opacity: 1;
      }

      .icon-picker-preview {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: #252525;
        border-top: 1px solid #333;
      }

      .preview-icon {
        width: 48px;
        height: 48px;
        color: #e0e0e0;
        flex-shrink: 0;
      }

      .preview-icon svg {
        width: 100%;
        height: 100%;
      }

      .preview-details {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .preview-name {
        font-size: 13px;
        font-weight: 500;
        color: #e0e0e0;
      }

      .preview-tags {
        font-size: 11px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .icon-picker-empty {
        grid-column: 1 / -1;
        padding: 32px 16px;
        text-align: center;
        color: #666;
      }

      .icon-picker-empty p {
        margin: 0 0 8px;
      }

      .icon-picker-empty .hint {
        font-size: 12px;
        color: #555;
      }

      /* Scrollbar styling */
      .icon-picker-grid-container::-webkit-scrollbar {
        width: 8px;
      }

      .icon-picker-grid-container::-webkit-scrollbar-track {
        background: #1e1e1e;
      }

      .icon-picker-grid-container::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 4px;
      }

      .icon-picker-grid-container::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `;

    document.head.appendChild(styles);
  }

  /**
   * Destroy the icon picker and clean up
   */
  destroy() {
    this.container.innerHTML = '';
    this.elements = {};
    this.initialized = false;
  }
}

/**
 * Create and initialize an IconPicker instance
 * @param {Object} options - Configuration options
 * @returns {Promise<IconPicker>} Initialized IconPicker instance
 */
export async function createIconPicker(options) {
  const picker = new IconPicker(options);
  await picker.init();
  return picker;
}

export default IconPicker;
