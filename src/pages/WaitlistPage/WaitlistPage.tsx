import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import './WaitlistPage.css';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

interface FormResult {
  status: 'success' | 'already_exists' | 'error';
  message: string;
}

export function WaitlistPage() {
  if (IS_TEST_MODE) {
    return <WaitlistPageTestMode />;
  }
  return <WaitlistPageProduction />;
}

function WaitlistPageTestMode() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<FormResult | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setResult({ status: 'success', message: 'You have been added to the waitlist!' });
    setEmail('');
  };

  const resultClass = result
    ? result.status === 'success'
      ? 'waitlist-result waitlist-result--success'
      : 'waitlist-result waitlist-result--error'
    : '';

  return (
    <div className="waitlist-page">
      <section className="waitlist-hero">
        <div className="waitlist-logo">FINNISH</div>
        <h1 className="waitlist-headline">
          One app that solves every illustration problem for the scientific community
        </h1>
      </section>
      <section className="waitlist-form-section">
        <form className="waitlist-form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className="waitlist-email-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="waitlist-submit-btn">Join the Waitlist</button>
        </form>
        {result && <div className={resultClass}>{result.message}</div>}
      </section>
    </div>
  );
}

function WaitlistPageProduction() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const [searchParams] = useSearchParams();

  const joinWaitlist = useMutation(api.waitlist.joinWaitlist);
  const count = useQuery(api.waitlist.getWaitlistCount);

  const referralSource = searchParams.get('ref') ?? undefined;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await joinWaitlist({ email, referralSource });
      setResult({
        status: response.status,
        message: response.message,
      });
      if (response.status === 'success') {
        setEmail('');
      }
    } catch {
      setResult({
        status: 'error',
        message: 'Something went wrong, please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resultClass = result
    ? result.status === 'success'
      ? 'waitlist-result waitlist-result--success'
      : result.status === 'already_exists'
        ? 'waitlist-result waitlist-result--already'
        : 'waitlist-result waitlist-result--error'
    : '';

  return (
    <div className="waitlist-page">
      {/* Hero */}
      <section className="waitlist-hero">
        <div className="waitlist-logo">FINNISH</div>
        <h1 className="waitlist-headline">
          One app that solves every illustration problem for the scientific community
        </h1>
        <p className="waitlist-subtitle">
          AI generates publication-quality diagrams in seconds. You edit them to perfection.
          Export anywhere. No design skills needed.
        </p>
      </section>

      {/* Feature Highlights */}
      <section className="waitlist-features">
        <div className="waitlist-feature-card">
          <div className="waitlist-feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h3a3 3 0 0 1 3 3v1" />
              <path d="M8 9.5C6.8 8.8 6 7.5 6 6a4 4 0 0 1 4-4" />
              <path d="M6 15v-1a3 3 0 0 1 3-3h3V9.5" />
              <circle cx="12" cy="17" r="3" />
              <path d="M12 20v2" />
            </svg>
          </div>
          <h3 className="waitlist-feature-title">AI Generation</h3>
          <p className="waitlist-feature-desc">
            Describe your diagram in plain language. Get publication-quality SVG in under 30 seconds.
          </p>
        </div>

        <div className="waitlist-feature-card">
          <div className="waitlist-feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <h3 className="waitlist-feature-title">Manual Editing</h3>
          <p className="waitlist-feature-desc">
            Fine-tune every detail with a powerful yet simple canvas editor. Excalidraw simplicity, professional results.
          </p>
        </div>

        <div className="waitlist-feature-card">
          <div className="waitlist-feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <h3 className="waitlist-feature-title">Export Anywhere</h3>
          <p className="waitlist-feature-desc">
            PNG, SVG, PDF, PowerPoint. High-resolution exports ready for journals, posters, and presentations.
          </p>
        </div>

        <div className="waitlist-feature-card">
          <div className="waitlist-feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            </svg>
          </div>
          <h3 className="waitlist-feature-title">Verified Icons</h3>
          <p className="waitlist-feature-desc">
            12,000+ curated scientific icons across medicine, biology, and chemistry. Accuracy you can trust.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="waitlist-social-proof">
        {count !== undefined && (
          <p className="waitlist-count">
            {count > 0
              ? `Join ${count.toLocaleString()} scientist${count !== 1 ? 's' : ''} on the waitlist`
              : 'Be the first to join'}
          </p>
        )}
        <p className="waitlist-social-proof-text">
          Built by a doctor, for doctors.
        </p>
      </section>

      {/* Signup Form */}
      <section className="waitlist-form-section">
        <form className="waitlist-form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className="waitlist-email-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="waitlist-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
          </button>
        </form>

        {result && (
          <div className={resultClass}>
            {result.message}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="waitlist-footer">
        <p>FINNISH — Scientific illustration, simplified.</p>
      </footer>
    </div>
  );
}
