/**
 * CanvasSizeDialog Component
 * Allows users to select canvas size from journal figure presets
 * or enter custom dimensions.
 */

import React, { useState, useCallback } from 'react';
import {
  FIGURE_PRESETS,
  FigurePreset,
  mmToPx,
  getPresetsByCategory,
} from '../../lib/canvas/figure-presets';

interface CanvasSizeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (width: number, height: number) => void;
  currentWidth: number;
  currentHeight: number;
}

type TabId = 'journal' | 'standard' | 'presentation' | 'custom';

const TABS: { id: TabId; label: string }[] = [
  { id: 'journal', label: 'Journal' },
  { id: 'standard', label: 'Standard' },
  { id: 'presentation', label: 'Presentation' },
  { id: 'custom', label: 'Custom' },
];

export function CanvasSizeDialog({
  isOpen,
  onClose,
  onApply,
  currentWidth,
  currentHeight,
}: CanvasSizeDialogProps): JSX.Element | null {
  const [activeTab, setActiveTab] = useState<TabId>('journal');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customWidth, setCustomWidth] = useState(currentWidth);
  const [customHeight, setCustomHeight] = useState(currentHeight);
  const [dpi, setDpi] = useState(300);

  const handlePresetSelect = useCallback((preset: FigurePreset) => {
    setSelectedPreset(preset.id);
    setCustomWidth(mmToPx(preset.widthMm, dpi));
    setCustomHeight(mmToPx(preset.heightMm, dpi));
  }, [dpi]);

  const handleDpiChange = useCallback((newDpi: number) => {
    setDpi(newDpi);
    // If a preset is selected, recalculate dimensions
    if (selectedPreset) {
      const preset = FIGURE_PRESETS.find(p => p.id === selectedPreset);
      if (preset) {
        setCustomWidth(mmToPx(preset.widthMm, newDpi));
        setCustomHeight(mmToPx(preset.heightMm, newDpi));
      }
    }
  }, [selectedPreset]);

  const handleApply = useCallback(() => {
    onApply(customWidth, customHeight);
    onClose();
  }, [customWidth, customHeight, onApply, onClose]);

  if (!isOpen) return null;

  const presets = activeTab !== 'custom' ? getPresetsByCategory(activeTab) : [];

  return (
    <div style={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Canvas Size</h2>
          <button onClick={onClose} style={styles.closeBtn} title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Current size display */}
        <div style={styles.currentSize}>
          Current: {currentWidth} x {currentHeight} px
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {}),
              }}
              onClick={() => { setActiveTab(tab.id); setSelectedPreset(null); }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          {activeTab !== 'custom' ? (
            <div style={styles.presetGrid}>
              {presets.map(preset => (
                <button
                  key={preset.id}
                  style={{
                    ...styles.presetCard,
                    ...(selectedPreset === preset.id ? styles.presetCardSelected : {}),
                  }}
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div style={styles.presetPreview}>
                    <div style={{
                      width: Math.min(80, preset.widthMm * 0.5),
                      height: Math.min(60, preset.heightMm * 0.5),
                      border: '1px solid var(--text-muted)',
                      borderRadius: '2px',
                      backgroundColor: selectedPreset === preset.id
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(255, 255, 255, 0.05)',
                    }} />
                  </div>
                  <div style={styles.presetName}>{preset.name}</div>
                  <div style={styles.presetDesc}>{preset.description}</div>
                  <div style={styles.presetPx}>
                    {mmToPx(preset.widthMm, dpi)} x {mmToPx(preset.heightMm, dpi)} px
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div style={styles.customForm}>
              <div style={styles.formRow}>
                <label style={styles.label}>Width (px)</label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => { setCustomWidth(Number(e.target.value)); setSelectedPreset(null); }}
                  style={styles.input}
                  min={100}
                  max={10000}
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Height (px)</label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => { setCustomHeight(Number(e.target.value)); setSelectedPreset(null); }}
                  style={styles.input}
                  min={100}
                  max={10000}
                />
              </div>
            </div>
          )}
        </div>

        {/* DPI selector */}
        <div style={styles.dpiRow}>
          <label style={styles.label}>DPI</label>
          <div style={styles.dpiOptions}>
            {[72, 150, 300, 600].map(d => (
              <button
                key={d}
                style={{
                  ...styles.dpiBtn,
                  ...(dpi === d ? styles.dpiBtnActive : {}),
                }}
                onClick={() => handleDpiChange(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Preview dimensions */}
        <div style={styles.preview}>
          New size: <strong>{customWidth} x {customHeight} px</strong>
          {selectedPreset && (
            <span style={styles.previewMm}>
              {' '}({FIGURE_PRESETS.find(p => p.id === selectedPreset)?.description})
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          <button onClick={handleApply} style={styles.applyBtn}>Apply</button>
        </div>
      </div>
    </div>
  );
}

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
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: 'var(--bg-secondary, #252526)',
    borderRadius: '12px',
    border: '1px solid var(--border-primary, #3e3e42)',
    width: '560px',
    maxWidth: '95vw',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px 12px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary, #cccccc)',
    margin: 0,
  },
  closeBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted, #6b6b6b)',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  currentSize: {
    padding: '0 24px 12px',
    fontSize: '12px',
    color: 'var(--text-muted, #6b6b6b)',
  },
  tabs: {
    display: 'flex',
    gap: '2px',
    padding: '0 24px',
    borderBottom: '1px solid var(--border-primary, #3e3e42)',
  },
  tab: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  tabActive: {
    color: 'var(--accent-primary, #3b82f6)',
    borderBottomColor: 'var(--accent-primary, #3b82f6)',
  },
  content: {
    flex: 1,
    padding: '16px 24px',
    overflowY: 'auto',
    minHeight: '200px',
  },
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '10px',
  },
  presetCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 8px',
    borderRadius: '8px',
    border: '1px solid var(--border-primary, #3e3e42)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textAlign: 'center',
  },
  presetCardSelected: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  presetPreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
  },
  presetName: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-primary, #cccccc)',
    lineHeight: 1.2,
  },
  presetDesc: {
    fontSize: '11px',
    color: 'var(--text-muted, #6b6b6b)',
  },
  presetPx: {
    fontSize: '10px',
    color: 'var(--text-muted, #6b6b6b)',
    fontFamily: 'var(--font-mono)',
  },
  customForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '300px',
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    minWidth: '80px',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    fontSize: '13px',
    color: 'var(--text-primary, #cccccc)',
    backgroundColor: 'var(--bg-tertiary, #1e1e1e)',
    border: '1px solid var(--border-primary, #3e3e42)',
    borderRadius: '6px',
    outline: 'none',
  },
  dpiRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    borderTop: '1px solid var(--border-primary, #3e3e42)',
  },
  dpiOptions: {
    display: 'flex',
    gap: '6px',
  },
  dpiBtn: {
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-primary, #3e3e42)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  dpiBtnActive: {
    color: 'var(--accent-primary, #3b82f6)',
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  preview: {
    padding: '8px 24px 12px',
    fontSize: '13px',
    color: 'var(--text-secondary, #9d9d9d)',
  },
  previewMm: {
    color: 'var(--text-muted, #6b6b6b)',
    fontSize: '12px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    padding: '16px 24px',
    borderTop: '1px solid var(--border-primary, #3e3e42)',
  },
  cancelBtn: {
    padding: '8px 20px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-primary, #3e3e42)',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  applyBtn: {
    padding: '8px 20px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#ffffff',
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default CanvasSizeDialog;
