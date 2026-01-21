/**
 * AdjustmentsDialog Component
 * Modal dialog for adjusting image brightness, contrast, saturation, and hue
 *
 * @module components/AdjustmentsDialog
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface AdjustmentsDialogProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when adjustments are applied */
  onApply: (settings: {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
  }) => void;
  /** Canvas to preview adjustments on */
  canvas: HTMLCanvasElement | null;
}

export interface AdjustmentSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
}

// ============================================================================
// Default Settings
// ============================================================================

const defaultSettings: AdjustmentSettings = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hue: 0,
};

const adjustmentConfigs = {
  brightness: { label: 'Brightness', min: -100, max: 100, step: 5, unit: '%' },
  contrast: { label: 'Contrast', min: -100, max: 100, step: 5, unit: '%' },
  saturation: { label: 'Saturation', min: -100, max: 100, step: 5, unit: '%' },
  hue: { label: 'Hue Shift', min: -180, max: 180, step: 5, unit: '°' },
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
  adjustmentsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  adjustmentRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  adjustmentLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
  },
  sliderValue: {
    fontSize: '13px',
    fontFamily: 'monospace',
    color: 'var(--text-primary, #ffffff)',
    minWidth: '50px',
    textAlign: 'right',
  },
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    appearance: 'none',
    background: 'var(--bg-tertiary, #2a2a2a)',
    cursor: 'pointer',
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
  resetButton: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary, #9d9d9d)',
    border: '1px solid var(--border-color, #333)',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary, #9d9d9d)',
  },
  applyButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
};

// ============================================================================
// Component
// ============================================================================

export function AdjustmentsDialog({
  isOpen,
  onClose,
  onApply,
  canvas,
}: AdjustmentsDialogProps): JSX.Element | null {
  const [settings, setSettings] = useState<AdjustmentSettings>(defaultSettings);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const isProcessingRef = useRef(false);

  // Reset settings when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSettings(defaultSettings);
      if (canvas) {
        setPreviewUrl(canvas.toDataURL());
      }
    }
  }, [isOpen, canvas]);

  // Debounced slider updates
  useEffect(() => {
    if (!canvas || isProcessingRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      applyAdjustmentsPreview(settings);
    }, 300);

    return () => clearTimeout(timer);
  }, [settings, canvas]);

  const applyAdjustmentsPreview = useCallback(async (currentSettings: AdjustmentSettings) => {
    if (!canvas || isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    try {
      const { applyAdjustments } = await import('../../lib/image/filters');
      const result = await applyAdjustments(canvas, currentSettings);
      setPreviewUrl(result);
    } catch (error) {
      console.error('Adjustments preview failed:', error);
    } finally {
      isProcessingRef.current = false;
    }
  }, [canvas]);

  const handleSliderChange = useCallback((key: keyof AdjustmentSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setSettings(defaultSettings);
    if (canvas) {
      setPreviewUrl(canvas.toDataURL());
    }
  }, [canvas]);

  const handleApply = useCallback(() => {
    onApply(settings);
    onClose();
  }, [settings, onApply, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const hasChanges = Object.values(settings).some((value) => value !== 0);

  return (
    <div style={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Image Adjustments</h2>
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
          {/* Preview */}
          <div style={styles.previewSection}>
            <label style={styles.previewLabel}>Preview</label>
            <div style={styles.previewContainer}>
              <img src={previewUrl} alt="Adjustments preview" style={styles.previewImage} />
            </div>
          </div>

          {/* Adjustment Sliders */}
          <div style={styles.adjustmentsSection}>
            {Object.entries(adjustmentConfigs).map(([key, config]) => (
              <div key={key} style={styles.adjustmentRow}>
                <div style={styles.adjustmentLabel}>
                  <span style={styles.label}>{config.label}</span>
                  <span style={styles.sliderValue}>
                    {settings[key as keyof AdjustmentSettings] > 0 ? '+' : ''}
                    {settings[key as keyof AdjustmentSettings]}{config.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={settings[key as keyof AdjustmentSettings]}
                  onChange={handleSliderChange(key as keyof AdjustmentSettings)}
                  style={styles.slider}
                  aria-label={`${config.label} value`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {hasChanges && (
            <button style={{ ...styles.button, ...styles.resetButton }} onClick={handleReset}>
              Reset
            </button>
          )}
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

export default AdjustmentsDialog;
