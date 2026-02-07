interface UpgradeCTAProps {
  feature: string;
  description?: string;
}

/**
 * Upgrade prompt shown to free-tier users when they attempt to access Pro features.
 */
export function UpgradeCTA({ feature, description }: UpgradeCTAProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--bg-primary)',
    }}>
      <div style={{
        maxWidth: '480px',
        padding: '48px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '16px',
        border: '1px solid var(--border-primary)',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          backgroundColor: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: 'white',
          fontSize: '28px',
        }}>
          &#9733;
        </div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '12px',
        }}>
          {feature} requires Pro
        </h2>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '24px',
          lineHeight: 1.6,
        }}>
          {description || `Upgrade to Pro to unlock ${feature}, full icon library, all export formats, and no watermarks.`}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
        }}>
          <button
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              backgroundColor: 'var(--accent-primary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => {
              // Placeholder: will link to pricing/Lemon Squeezy in Task 12
              window.alert('Pro upgrade coming soon! For now, set subscriptionTier to "pro" in Clerk Dashboard.');
            }}
          >
            Upgrade to Pro
          </button>

          <span style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
          }}>
            Starting at ~&#8377;1,000/month
          </span>
        </div>
      </div>
    </div>
  );
}
