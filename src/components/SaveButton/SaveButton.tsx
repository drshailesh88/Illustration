import type { SaveStatus } from '../../hooks/useProject';

interface SaveButtonProps {
  saveStatus: SaveStatus;
  onSave: () => void;
  disabled?: boolean;
  isOnline?: boolean;
}

/**
 * Cloud save button with status indicator for the editor toolbar.
 * Shows different states: idle (Save), saving (spinner), saved (checkmark),
 * offline-saved (offline icon), error (retry).
 */
export function SaveButton({ saveStatus, onSave, disabled, isOnline = true }: SaveButtonProps) {
  const getLabel = () => {
    if (!isOnline && saveStatus === 'idle') return 'Offline';
    switch (saveStatus) {
      case 'saving': return 'Saving...';
      case 'saved': return 'Saved';
      case 'offline-saved': return 'Saved Locally';
      case 'error': return 'Save Failed';
      default: return isOnline ? 'Save to Cloud' : 'Save Locally';
    }
  };

  const getIcon = () => {
    if (!isOnline && saveStatus !== 'saving') {
      // Offline icon (cloud with slash)
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-warning, #f59e0b)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 2l20 20" />
          <path d="M9.34 3.34A7.98 7.98 0 0 1 12 3a8 8 0 0 1 7.73 6h.27a5 5 0 0 1 3.9 8.11" />
          <path d="M4.73 12.15A5 5 0 0 0 6 22h12a5 5 0 0 0 .59-.03" />
        </svg>
      );
    }
    switch (saveStatus) {
      case 'saving':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        );
      case 'saved':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-success, #4ade80)" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
      case 'offline-saved':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-warning, #f59e0b)" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
      case 'error':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-error, #ef4444)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        );
    }
  };

  return (
    <button
      className="menu-action-btn"
      onClick={onSave}
      disabled={disabled || saveStatus === 'saving'}
      title={isOnline ? 'Save to Cloud (Ctrl+S)' : 'Save Locally (Ctrl+S) — Will sync when online'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        fontSize: '11px',
        minWidth: 'auto',
      }}
    >
      {getIcon()}
      <span>{getLabel()}</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
