/**
 * Welcome / Landing Page
 *
 * - Unauthenticated users: compelling landing page with value proposition
 * - Authenticated users: redirect to Agent Mode
 *
 * @module pages/Welcome
 */

import { Link, Navigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useMediaQuery';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

// In test mode, provide mock Clerk components/hooks to avoid ClerkProvider dependency.
// In production, use real Clerk.
let useUser: () => { isSignedIn: boolean; isLoaded: boolean };
let SignedOut: React.FC<{ children: React.ReactNode }>;
let SignInButton: React.FC<{ children: React.ReactNode; mode?: string }>;
let SignUpButton: React.FC<{ children: React.ReactNode; mode?: string }>;

if (IS_TEST_MODE) {
  useUser = () => ({ isSignedIn: false, isLoaded: true });
  SignedOut = ({ children }) => <>{children}</>;
  SignInButton = ({ children }) => <Link to="/agent">{children}</Link>;
  SignUpButton = ({ children }) => <Link to="/agent">{children}</Link>;
} else {
  // Dynamic import is not possible here (synchronous needed), so use require-like pattern.
  // These are safe because in production, @clerk/clerk-react is always available.
  const clerk = await import('@clerk/clerk-react');
  useUser = clerk.useUser as any;
  SignedOut = clerk.SignedOut as any;
  SignInButton = clerk.SignInButton as any;
  SignUpButton = clerk.SignUpButton as any;
}

// ============================================================================
// Icons
// ============================================================================

const SparklesIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
  </svg>
);

const PenToolIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const ChatIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="13" y2="13" />
  </svg>
);

const ExportIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconLibraryIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CloudIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================================================
// Data
// ============================================================================

const STEPS = [
  {
    icon: ChatIcon,
    title: 'Describe your diagram',
    description: 'Type what you need in plain language. "Create a PRISMA flow diagram with 500 records identified."',
    color: 'var(--accent-primary)',
    bgColor: 'rgba(0, 120, 212, 0.12)',
  },
  {
    icon: SparklesIcon,
    title: 'AI generates it',
    description: 'Claude, GPT, or template engines produce a publication-quality SVG in seconds.',
    color: 'var(--color-success)',
    bgColor: 'rgba(76, 175, 80, 0.12)',
  },
  {
    icon: PenToolIcon,
    title: 'Edit and export',
    description: 'Fine-tune in the visual editor with 12,000+ scientific icons. Export as PNG, SVG, PDF, or PPTX.',
    color: 'var(--color-info)',
    bgColor: 'rgba(33, 150, 243, 0.12)',
  },
];

const FEATURES = [
  {
    icon: SparklesIcon,
    title: 'AI-Powered Generation',
    description: 'Claude Sonnet, GPT-4o, and template engines create diagrams from natural language.',
    color: 'var(--color-success)',
    bgColor: 'rgba(76, 175, 80, 0.1)',
  },
  {
    icon: IconLibraryIcon,
    title: '12,000+ Scientific Icons',
    description: 'Medical, biology, chemistry, and engineering icons across 80+ specialty domains.',
    color: 'var(--accent-primary)',
    bgColor: 'rgba(0, 120, 212, 0.1)',
  },
  {
    icon: ExportIcon,
    title: 'Publication-Ready Export',
    description: 'PNG, SVG, PDF, and PowerPoint. Every format journals and conferences accept.',
    color: 'var(--color-warning)',
    bgColor: 'rgba(255, 152, 0, 0.1)',
  },
  {
    icon: CloudIcon,
    title: 'Cloud Save & Sync',
    description: 'Your diagrams saved securely. Access from any device, share with your lab.',
    color: 'var(--color-info)',
    bgColor: 'rgba(33, 150, 243, 0.1)',
  },
];

const DIAGRAM_TYPES = [
  'PRISMA Flow Diagrams',
  'CONSORT Diagrams',
  'Forest Plots',
  'Signaling Pathways',
  'Anatomical Illustrations',
  'Experimental Workflows',
  'Study Design Flowcharts',
  'Mechanism of Action',
];

// ============================================================================
// Component
// ============================================================================

export function Welcome(): JSX.Element {
  const { isSignedIn, isLoaded } = useUser();
  const isMobile = useIsMobile();

  // Authenticated users go straight to Agent Mode
  if (isLoaded && isSignedIn) {
    return <Navigate to="/agent" replace />;
  }

  // Show loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-muted)',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* ── Header ── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '12px 16px' : '16px 32px',
        borderBottom: '1px solid var(--border-primary)',
        backgroundColor: 'var(--bg-secondary)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px',
            backgroundColor: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '0.5px',
          }}>
            FINNISH
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SignedOut>
            <SignInButton mode="redirect">
              <button style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                cursor: 'pointer',
              }}>
                Sign In
              </button>
            </SignInButton>
            {!isMobile && (
              <SignUpButton mode="redirect">
                <button style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}>
                  Get Started
                </button>
              </SignUpButton>
            )}
          </SignedOut>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section style={{
        padding: isMobile ? '48px 20px 40px' : '80px 32px 64px',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          backgroundColor: 'rgba(0, 120, 212, 0.12)',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--text-accent)',
          marginBottom: '24px',
        }}>
          <SparklesIcon size={14} />
          Built for medical professionals
        </div>

        <h1 style={{
          fontSize: isMobile ? '32px' : '52px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '20px',
          letterSpacing: '-0.5px',
        }}>
          Hours of illustration work
          <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-primary), var(--color-info))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            in seconds
          </span>
        </h1>

        <p style={{
          fontSize: isMobile ? '16px' : '19px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '620px',
          margin: '0 auto 36px',
        }}>
          AI generates publication-quality scientific diagrams.
          You edit with 12,000+ medical icons. Export for any journal.
          Done.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <SignUpButton mode="redirect">
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              backgroundColor: 'var(--accent-primary)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              width: isMobile ? '100%' : 'auto',
              justifyContent: 'center',
            }}>
              Get Started Free
              <ArrowRightIcon />
            </button>
          </SignUpButton>

          <Link
            to="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-secondary)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 200ms ease',
              width: isMobile ? '100%' : 'auto',
              justifyContent: 'center',
            }}
          >
            See Pricing
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{
        padding: isMobile ? '40px 20px' : '64px 32px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        borderBottom: '1px solid var(--border-primary)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginBottom: '12px',
          }}>
            Three steps. That's it.
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginBottom: isMobile ? '32px' : '48px',
            maxWidth: '500px',
            margin: '0 auto',
            paddingBottom: isMobile ? '32px' : '48px',
          }}>
            No design skills required. No learning curve.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '32px 24px',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '14px',
                border: '1px solid var(--border-primary)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '10px',
                  height: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                }}>
                  {i + 1}
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: step.bgColor,
                  color: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <step.icon size={28} />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diagram Types ── */}
      <section style={{
        padding: isMobile ? '40px 20px' : '64px 32px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: isMobile ? '24px' : '30px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '12px',
        }}>
          Every diagram type you need
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '32px',
        }}>
          From systematic reviews to bench research
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
        }}>
          {DIAGRAM_TYPES.map((type) => (
            <span key={type} style={{
              padding: '8px 18px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '8px',
            }}>
              {type}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section style={{
        padding: isMobile ? '40px 20px' : '64px 32px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        borderBottom: '1px solid var(--border-primary)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '24px' : '30px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginBottom: isMobile ? '32px' : '48px',
          }}>
            Everything you need to publish
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '20px',
          }}>
            {FEATURES.map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '16px',
                padding: '24px',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '12px',
                border: '1px solid var(--border-primary)',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: feature.bgColor,
                  color: feature.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
        padding: isMobile ? '48px 20px' : '80px 32px',
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '16px',
        }}>
          Stop spending hours on illustrations
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          Join researchers who create publication-quality diagrams in minutes, not hours.
          Free tier included — no credit card required.
        </p>
        <SignUpButton mode="redirect">
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            fontSize: '17px',
            fontWeight: 600,
            color: 'white',
            backgroundColor: 'var(--accent-primary)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}>
            Get Started Free
            <ArrowRightIcon />
          </button>
        </SignUpButton>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: isMobile ? '24px 20px' : '32px',
        borderTop: '1px solid var(--border-primary)',
        backgroundColor: 'var(--bg-secondary)',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <span style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}>
            FINNISH — Scientific illustration, simplified.
          </span>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <Link to="/pricing" style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              Pricing <ChevronRightIcon />
            </Link>
            <Link to="/waitlist" style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              Waitlist <ChevronRightIcon />
            </Link>
            <Link to="/credits" style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              Credits <ChevronRightIcon />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
