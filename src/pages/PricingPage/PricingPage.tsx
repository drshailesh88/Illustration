import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useSubscription } from '../../hooks/useSubscription';

/**
 * Lemon Squeezy checkout URL configuration.
 * Replace these with real Lemon Squeezy checkout URLs from your dashboard.
 * The URLs should include ?checkout[custom][clerk_user_id]={userId} for user linking.
 */
const CHECKOUT_URLS = {
  pro: import.meta.env.VITE_LEMONSQUEEZY_PRO_URL ?? '',
  team: import.meta.env.VITE_LEMONSQUEEZY_TEAM_URL ?? '',
};

const CUSTOMER_PORTAL_URL =
  import.meta.env.VITE_LEMONSQUEEZY_PORTAL_URL ?? '';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  tier: 'free' | 'pro' | 'team';
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    tier: 'free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for exploring the editor and basic diagrams.',
    features: [
      { text: 'Editor Mode (all tools)', included: true },
      { text: '10 AI generations/month', included: true },
      { text: 'PNG & SVG export', included: true },
      { text: 'Community icon library', included: true },
      { text: 'Agent Mode (AI generation)', included: false },
      { text: 'PDF & PPTX export', included: false },
      { text: 'Full icon library (12,000+)', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Current Plan',
  },
  {
    name: 'Pro',
    tier: 'pro',
    price: '₹999',
    period: '/month',
    description: 'For researchers and clinicians who need AI-powered diagrams.',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Agent Mode (AI generation)', included: true },
      { text: '1,000 AI generations/month', included: true },
      { text: 'All export formats (PDF, PPTX)', included: true },
      { text: 'Full icon library (12,000+)', included: true },
      { text: 'Cloud save & sync', included: true },
      { text: 'No watermarks', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Team / Lab',
    tier: 'team',
    price: '₹2,499',
    period: '/month',
    description: 'For research labs and departments with multiple users.',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Up to 10 team members', included: true },
      { text: 'Shared project library', included: true },
      { text: 'Team templates', included: true },
      { text: 'Admin dashboard', included: true },
      { text: 'Usage analytics', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom branding', included: true },
    ],
    cta: 'Upgrade to Team',
  },
];

export function PricingPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { tier: currentTier, isLoaded } = useSubscription();

  const handleSelectPlan = (plan: Plan) => {
    if (plan.tier === 'free') return;
    if (plan.tier === currentTier) return;

    // Build checkout URL with Clerk user ID for webhook linking
    const baseUrl = CHECKOUT_URLS[plan.tier as 'pro' | 'team'];
    if (!baseUrl) {
      window.alert(
        'Checkout is not configured yet. Set VITE_LEMONSQUEEZY_PRO_URL and VITE_LEMONSQUEEZY_TEAM_URL in your environment.'
      );
      return;
    }

    const separator = baseUrl.includes('?') ? '&' : '?';
    const checkoutUrl = user?.id
      ? `${baseUrl}${separator}checkout[custom][clerk_user_id]=${user.id}&checkout[email]=${encodeURIComponent(user.primaryEmailAddress?.emailAddress ?? '')}`
      : baseUrl;

    window.open(checkoutUrl, '_blank');
  };

  const handleManageBilling = () => {
    if (CUSTOMER_PORTAL_URL) {
      window.open(CUSTOMER_PORTAL_URL, '_blank');
    } else {
      window.alert(
        'Customer portal is not configured yet. Set VITE_LEMONSQUEEZY_PORTAL_URL in your environment.'
      );
    }
  };

  const getButtonLabel = (plan: Plan): string => {
    if (!isLoaded) return '...';
    if (plan.tier === currentTier) return 'Current Plan';
    if (
      (currentTier === 'pro' && plan.tier === 'free') ||
      (currentTier === 'team' && plan.tier !== 'team')
    )
      return 'Downgrade';
    return plan.cta;
  };

  const isCurrentPlan = (plan: Plan): boolean => plan.tier === currentTier;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        padding: '64px 24px',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            padding: '8px 16px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            backgroundColor: 'transparent',
            border: '1px solid var(--border-primary)',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '12px',
            color: 'var(--text-primary)',
          }}
        >
          Choose Your Plan
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
          }}
        >
          Publication-quality scientific illustrations, powered by AI.
          Start free, upgrade when you need more.
        </p>

        {/* Manage billing link for paid users */}
        {currentTier !== 'free' && (
          <button
            onClick={handleManageBilling}
            style={{
              marginBottom: '32px',
              padding: '8px 20px',
              fontSize: '14px',
              color: 'var(--text-accent)',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-primary)',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Manage Billing & Subscription →
          </button>
        )}

        {/* Plans Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.tier}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: plan.highlighted
                  ? '2px solid var(--accent-primary)'
                  : '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 16px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Most Popular
                </div>
              )}

              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'var(--text-primary)',
                }}
              >
                {plan.name}
              </h3>

              <div style={{ marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {plan.period}
                </span>
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  marginBottom: '24px',
                  lineHeight: 1.5,
                }}
              >
                {plan.description}
              </p>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px 0',
                  flex: 1,
                }}
              >
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 0',
                      fontSize: '14px',
                      color: feature.included
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        color: feature.included
                          ? 'var(--color-success)'
                          : 'var(--text-muted)',
                        flexShrink: 0,
                      }}
                    >
                      {feature.included ? '✓' : '—'}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={isCurrentPlan(plan)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isCurrentPlan(plan) ? 'default' : 'pointer',
                  backgroundColor: isCurrentPlan(plan)
                    ? 'var(--bg-tertiary)'
                    : plan.highlighted
                      ? 'var(--accent-primary)'
                      : 'var(--bg-elevated)',
                  color: isCurrentPlan(plan)
                    ? 'var(--text-muted)'
                    : plan.highlighted
                      ? 'white'
                      : 'var(--text-primary)',
                  opacity: isCurrentPlan(plan) ? 0.7 : 1,
                  transition: 'all 150ms ease',
                }}
              >
                {getButtonLabel(plan)}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: '48px',
            fontSize: '14px',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
        >
          All plans include automatic updates and new features.
          <br />
          Prices in INR. Cancel anytime from the billing portal.
        </p>
      </div>
    </div>
  );
}
