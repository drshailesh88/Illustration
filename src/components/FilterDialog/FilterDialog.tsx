/**
 * FilterDialog Component
 * Modal dialog for applying image filters (blur, sharpen, denoise, etc.)
 *
 * @module components/FilterDialog
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

export type FilterType =
  | 'blur'
  | 'sharpen'
  | 'denoise'
  | 'sepia'
  | 'grayscale'
  | 'invert'
  | 'vignette';

export interface FilterDialogProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when filter is applied */
  onApply: (filter: FilterType, value: number) => void;
  /** Canvas to preview filter on */
  canvas: HTMLCanvasElement | null;
}

// ============================================================================
// Filter Configurations
// ============================================================================

const filterConfigs: Record<
  FilterType,
  { label: string; min: number; max: number; step: number; default: number; unit: string }
> = {
  blur: { label: 'Blur', min: 0, max: 10, step: 0.5, default: 2, unit: 'px' },
  sharpen: { label: 'Sharpen', min: 0, max: 10, step: 0.5, default: 2, unit: '' },
  denoise: { label: 'Denoise', min: 0, max: 20, step: 1, default: 5, unit: '' },
  sepia: { label: 'Sepia', min: 0, max: 100, step: 5, default: 30, unit: '%' },
  grayscale: { label: 'Grayscale', min: 0, max: 100, step: 5, default: 100, unit: '%' },
  invert: { label: 'Invert', min: 0, max: 100, step: 5, default: 100, unit: '%' },
  vignette: { label: 'Vignette', min: 0, max: 100, step: 5, default: 50, unit: '%' },
};

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'var(--z-modal, 1000)',
    animation: 'fadeIn 150ms ease-out',
  },
  dialog: {
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    width: '480px',
    maxWidth: '90vw',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid var(--border-color, #333)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-color, #333)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    padding: 0,
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  content: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  filterList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  filterButton: {
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textAlign: 'center',
  },
  filterButtonActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
  },
  previewSection: {
    marginBottom: '20px',
  },
  previewLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    marginBottom: '8px',
  },
  previewContainer: {
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
  },
  sliderSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  slider: {
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    appearance: 'none',
    background: 'var(--bg-tertiary, #2a2a2a)',
    cursor: 'pointer',
  },
  sliderValue: {
    minWidth: '60px',
    textAlign: 'right',
    fontSize: '13px',
    fontFamily: 'monospace',
    color: 'var(--text-primary, #ffffff)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 20px',
    borderTop: '1px solid var(--border-color, #333)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary, #9d9d9d)',
    border: '1px solid var(--border-color, #333)',
  },
  applyButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
};

// ============================================================================
// Component
// ============================================================================

export function FilterDialog({ isOpen, onClose, onApply, canvas }: FilterDialogProps): JSX.Element | null {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('blur');
  const [sliderValue, setSliderValue] = useState<number>(2);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const isProcessingRef = useRef(false);
  const pendingUpdateRef = useRef<{ filter: FilterType; value: number } | null>(null);

  // Update preview when filter or value changes
  useEffect(() => {
    if (!isOpen || !canvas || isProcessingRef.current) {
      return;
    }

    const config = filterConfigs[selectedFilter];
    setSliderValue(config.default);

    applyFilterPreview(selectedFilter, config.default);
  }, [isOpen, canvas, selectedFilter]);

  // Debounced slider updates
  useEffect(() => {
    if (!canvas || isProcessingRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      applyFilterPreview(selectedFilter, sliderValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [sliderValue, selectedFilter, canvas]);

  const applyFilterPreview = useCallback(async (filter: FilterType, value: number) => {
    if (!canvas || isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;
    pendingUpdateRef.current = { filter, value };

    try {
      const { applyFilters } = await import('../../lib/image/filters');
      const result = await applyFilters(canvas, [{ type: filter, value }]);
      setPreviewUrl(result);
    } catch (error) {
      console.error('Filter preview failed:', error);
    } finally {
      isProcessingRef.current = false;
      pendingUpdateRef.current = null;
    }
  }, [canvas]);

  const handleFilterClick = useCallback((filter: FilterType) => {
    setSelectedFilter(filter);
  }, []);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSliderValue(value);
  }, [selectedFilter]);

  const handleApply = useCallback(() => {
    onApply(selectedFilter, sliderValue);
    onClose();
  }, [selectedFilter, sliderValue, onApply, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const config = filterConfigs[selectedFilter];

  return (
    <div style={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Image Filters</h2>
          <button style={styles.closeButton} onClick={onClose} aria-label="Close dialog">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Filter Selection */}
          <div style={styles.filterList}>
            {Object.entries(filterConfigs).map(([key, filterConfig]) => (
              <button
                key={key}
                style={{
                  ...styles.filterButton,
                  ...(selectedFilter === key ? styles.filterButtonActive : {}),
                }}
                onClick={() => handleFilterClick(key as FilterType)}
              >
                <span style={styles.filterLabel}>{filterConfig.label}</span>
              </button>
            ))}
          </div>

          {/* Preview */}
          {previewUrl && (
            <div style={styles.previewSection}>
              <label style={styles.previewLabel}>Preview</label>
              <div style={styles.previewContainer}>
                <img src={previewUrl} alt="Filter preview" style={styles.previewImage} />
              </div>
            </div>
          )}

          {/* Slider */}
          <div style={styles.sliderSection}>
            <div style={styles.sliderRow}>
              <label style={styles.previewLabel}>{config.label}</label>
              <span style={styles.sliderValue}>
                {sliderValue.toFixed(1)}{config.unit}
              </span>
            </div>
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={sliderValue}
              onChange={handleSliderChange}
              style={styles.slider}
              aria-label={`${config.label} value`}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button style={{ ...styles.button, ...styles.cancelButton }} onClick={onClose}>
            Cancel
          </button>
          <button style={{ ...styles.button, ...styles.applyButton }} onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterDialog;
