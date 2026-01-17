/**
 * ExportDialog Component
 * Modal dialog for exporting diagrams in various formats (PNG, SVG, PDF, LaTeX)
 *
 * @module components/ExportDialog
 */

import React, { useState, useCallback, useEffect } from 'react';
import { FormatTabs, ExportFormat } from './FormatTabs';
import { PNGOptions, PNGExportSettings } from './PNGOptions';
import { SVGOptions, SVGExportSettings } from './SVGOptions';
import { PDFOptions, PDFExportSettings } from './PDFOptions';
import { LaTeXOptions, LaTeXExportSettings } from './LaTeXOptions';

// ============================================================================
// Types
// ============================================================================

export interface ExportDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when export is triggered */
  onExport: (format: ExportFormat, settings: ExportSettings) => void;
  /** Optional filename for export */
  filename?: string;
  /** Optional TikZ preview content */
  tikzPreview?: string;
}

export type ExportSettings =
  | PNGExportSettings
  | SVGExportSettings
  | PDFExportSettings
  | LaTeXExportSettings;

// ============================================================================
// Default Settings
// ============================================================================

const defaultPNGSettings: PNGExportSettings = {
  dpi: 300,
  quality: 90,
  background: 'transparent',
};

const defaultSVGSettings: SVGExportSettings = {
  optimize: true,
  minify: false,
  embedFonts: true,
};

const defaultPDFSettings: PDFExportSettings = {
  pageSize: 'a4',
  orientation: 'portrait',
  margins: { top: 20, right: 20, bottom: 20, left: 20 },
};

const defaultLaTeXSettings: LaTeXExportSettings = {
  standalone: true,
  includePreamble: true,
};

// ============================================================================
// Styles
// ============================================================================

const styles = {
  overlay: {
    position: 'fixed' as const,
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
    width: '520px',
    maxWidth: '90vw',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column' as const,
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
    overflowY: 'auto' as const,
  },
  filenameSection: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  optionsSection: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-color, #333)',
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
  exportButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
};

// ============================================================================
// Component
// ============================================================================

export function ExportDialog({
  isOpen,
  onClose,
  onExport,
  filename = 'diagram',
  tikzPreview = '',
}: ExportDialogProps): JSX.Element | null {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [exportFilename, setExportFilename] = useState(filename);
  const [pngSettings, setPngSettings] = useState<PNGExportSettings>(defaultPNGSettings);
  const [svgSettings, setSvgSettings] = useState<SVGExportSettings>(defaultSVGSettings);
  const [pdfSettings, setPdfSettings] = useState<PDFExportSettings>(defaultPDFSettings);
  const [latexSettings, setLatexSettings] = useState<LaTeXExportSettings>(defaultLaTeXSettings);

  // Reset filename when dialog opens
  useEffect(() => {
    if (isOpen) {
      setExportFilename(filename);
    }
  }, [isOpen, filename]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleExport = useCallback(() => {
    let settings: ExportSettings;

    switch (selectedFormat) {
      case 'png':
        settings = pngSettings;
        break;
      case 'svg':
        settings = svgSettings;
        break;
      case 'pdf':
        settings = pdfSettings;
        break;
      case 'latex':
        settings = latexSettings;
        break;
      default:
        settings = pngSettings;
    }

    onExport(selectedFormat, settings);
    onClose();
  }, [selectedFormat, pngSettings, svgSettings, pdfSettings, latexSettings, onExport, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const getFileExtension = useCallback((format: ExportFormat): string => {
    const extensions: Record<ExportFormat, string> = {
      png: '.png',
      svg: '.svg',
      pdf: '.pdf',
      latex: '.tex',
    };
    return extensions[format];
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Export Diagram</h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >
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
          {/* Format Selection */}
          <FormatTabs selectedFormat={selectedFormat} onFormatChange={setSelectedFormat} />

          {/* Filename Input */}
          <div style={styles.filenameSection}>
            <label style={styles.label}>Filename</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value)}
                style={{ ...styles.input, flex: 1 }}
                placeholder="Enter filename"
              />
              <span
                style={{
                  color: 'var(--text-muted, #666)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                }}
              >
                {getFileExtension(selectedFormat)}
              </span>
            </div>
          </div>

          {/* Format-specific Options */}
          <div style={styles.optionsSection}>
            {selectedFormat === 'png' && (
              <PNGOptions settings={pngSettings} onChange={setPngSettings} />
            )}
            {selectedFormat === 'svg' && (
              <SVGOptions settings={svgSettings} onChange={setSvgSettings} />
            )}
            {selectedFormat === 'pdf' && (
              <PDFOptions settings={pdfSettings} onChange={setPdfSettings} />
            )}
            {selectedFormat === 'latex' && (
              <LaTeXOptions
                settings={latexSettings}
                onChange={setLatexSettings}
                tikzPreview={tikzPreview}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{ ...styles.button, ...styles.exportButton }}
            onClick={handleExport}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportDialog;
