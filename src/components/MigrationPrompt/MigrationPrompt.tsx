interface MigrationPromptProps {
  diagramCount: number;
  isMigrating: boolean;
  migratedCount: number;
  onMigrate: () => void;
  onDismiss: () => void;
}

/**
 * Dialog prompting users to migrate localStorage diagrams to the cloud.
 */
export function MigrationPrompt({
  diagramCount,
  isMigrating,
  migratedCount,
  onMigrate,
  onDismiss,
}: MigrationPromptProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={isMigrating ? undefined : onDismiss}
    >
      <div
        style={{
          background: 'var(--bg-secondary, #2a2a3e)',
          border: '1px solid var(--border-primary, #3a3a4e)',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '440px',
          width: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary, #6366f1)" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary, #e0e0e0)' }}>
            Move diagrams to the cloud?
          </h3>
        </div>

        <p style={{
          margin: '0 0 20px 0',
          fontSize: '14px',
          color: 'var(--text-secondary, #9d9d9d)',
          lineHeight: '1.5',
        }}>
          We found <strong style={{ color: 'var(--text-primary, #e0e0e0)' }}>{diagramCount} diagram{diagramCount !== 1 ? 's' : ''}</strong> saved
          in your browser. Move them to the cloud so you can access them from any device.
        </p>

        {isMigrating && (
          <div style={{
            margin: '0 0 20px 0',
            padding: '12px',
            background: 'var(--bg-tertiary, #3a3a4e)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--text-secondary, #9d9d9d)',
          }}>
            Migrating... {migratedCount} of {diagramCount} complete
            <div style={{
              marginTop: '8px',
              height: '4px',
              background: 'var(--bg-primary, #1a1a2e)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(migratedCount / diagramCount) * 100}%`,
                height: '100%',
                background: 'var(--accent-primary, #6366f1)',
                borderRadius: '2px',
                transition: 'width 0.3s',
              }} />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {!isMigrating && (
            <button
              onClick={onDismiss}
              style={{
                padding: '8px 16px',
                background: 'var(--bg-tertiary, #3a3a4e)',
                color: 'var(--text-primary, #e0e0e0)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Not now
            </button>
          )}
          <button
            onClick={onMigrate}
            disabled={isMigrating}
            style={{
              padding: '8px 16px',
              background: isMigrating ? 'var(--bg-tertiary, #3a3a4e)' : 'var(--accent-primary, #6366f1)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: isMigrating ? 'default' : 'pointer',
              opacity: isMigrating ? 0.7 : 1,
            }}
          >
            {isMigrating ? 'Migrating...' : 'Move to Cloud'}
          </button>
        </div>
      </div>
    </div>
  );
}
