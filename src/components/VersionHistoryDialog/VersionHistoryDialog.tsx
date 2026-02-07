/**
 * Version History Dialog
 *
 * Shows a list of previous version snapshots for a project.
 * Allows previewing and restoring any version.
 */

import { useState, useCallback } from 'react';
import type { VersionSummary } from '../../hooks/useVersionHistory';

interface VersionHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  versions: VersionSummary[];
  isLoading: boolean;
  isRestoring: boolean;
  onRestore: (versionId: string) => Promise<void>;
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  let relative: string;
  if (diffMins < 1) relative = 'just now';
  else if (diffMins < 60) relative = `${diffMins}m ago`;
  else if (diffHours < 24) relative = `${diffHours}h ago`;
  else if (diffDays < 7) relative = `${diffDays}d ago`;
  else relative = date.toLocaleDateString();

  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${relative} (${time})`;
}

export function VersionHistoryDialog({
  isOpen,
  onClose,
  versions,
  isLoading,
  isRestoring,
  onRestore,
}: VersionHistoryDialogProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleRestore = useCallback(async (versionId: string) => {
    await onRestore(versionId);
    setConfirmId(null);
    onClose();
  }, [onRestore, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Version History</h2>
          <button onClick={onClose} style={styles.closeBtn} title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {isLoading ? (
            <div style={styles.empty}>Loading versions...</div>
          ) : versions.length === 0 ? (
            <div style={styles.empty}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.5 }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p>No version history yet.</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Versions are created automatically when you save.
              </p>
            </div>
          ) : (
            <div style={styles.list}>
              {versions.map((version) => (
                <div key={version._id} style={styles.versionItem}>
                  <div style={styles.versionInfo}>
                    <div style={styles.versionLabel}>
                      <span style={styles.versionNumber}>v{version.versionNumber}</span>
                      <span style={styles.versionSource}>
                        {version.source === 'manual' ? 'Manual save' : 'Auto-save'}
                      </span>
                    </div>
                    <div style={styles.versionTime}>
                      {formatTimestamp(version.createdAt)}
                    </div>
                  </div>

                  <div style={styles.versionActions}>
                    {confirmId === version._id ? (
                      <div style={styles.confirmRow}>
                        <span style={{ fontSize: '12px', color: 'var(--color-warning)' }}>
                          Restore this version?
                        </span>
                        <button
                          onClick={() => handleRestore(version._id)}
                          disabled={isRestoring}
                          style={styles.confirmBtn}
                        >
                          {isRestoring ? 'Restoring...' : 'Yes'}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          style={styles.cancelBtn}
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(version._id)}
                        style={styles.restoreBtn}
                      >
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Up to 20 versions are kept per project.
          </span>
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
    width: '440px',
    maxHeight: '70vh',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--border-primary)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-primary)',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
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
    color: 'var(--text-muted)',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '8px 0',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 20px',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  versionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: '1px solid var(--border-primary)',
    transition: 'background-color 150ms ease',
  },
  versionInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  versionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  versionNumber: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
  },
  versionSource: {
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    padding: '2px 6px',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '4px',
  },
  versionTime: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  versionActions: {
    flexShrink: 0,
  },
  restoreBtn: {
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  confirmRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  confirmBtn: {
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 600,
    color: 'white',
    backgroundColor: 'var(--accent-primary)',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelBtn: {
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  footer: {
    padding: '12px 20px',
    borderTop: '1px solid var(--border-primary)',
  },
};

export default VersionHistoryDialog;
