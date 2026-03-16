/**
 * @file ContactSection.tsx
 * @description Contact form and direct contact details.
 */

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * ContactSection renders a mailto-backed contact form and contact info.
 *
 * Adjustment:
 * - Removed bottom padding on the outer section to eliminate extra whitespace
 *   below the contact area while keeping inner spacing for accessibility.
 */
export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const err = await res
          .json()
          .catch(() => ({ error: 'Failed to send.' }));
        setErrorMsg(err.error || 'Failed to send. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="card-surface mt-6 px-4 pt-6 pb-0 sm:px-6 sm:pt-8 sm:pb-0"
    >
      <header className="mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Contact
        </h2>
        <p className="mt-1.5 max-w-xl text-xs text-[var(--color-text-muted)]">
          Reach out for roles, collaborations, or just a good engineering
          conversation.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
          {/* Honeypot field — hidden from humans, catches bots */}
          <input
            type="text"
            name="website"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Name
              </span>
              <input
                type="text"
                name="name"
                className="rounded-full border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_95%,black)] px-3 py-2 text-xs text-[var(--color-text-primary)] outline-none transition-colors duration-200 focus:border-[var(--color-accent-secondary)]"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="rounded-full border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_95%,black)] px-3 py-2 text-xs text-[var(--color-text-primary)] outline-none transition-colors duration-200 focus:border-[var(--color-accent-secondary)]"
                required
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[var(--color-text-primary)]">
              Subject
            </span>
            <input
              type="text"
              name="subject"
              className="rounded-full border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_95%,black)] px-3 py-2 text-xs text-[var(--color-text-primary)] outline-none transition-colors duration-200 focus:border-[var(--color-accent-secondary)]"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[var(--color-text-primary)]">
              Message
            </span>
            <textarea
              name="message"
              rows={4}
              className="rounded-2xl border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_95%,black)] px-3 py-2 text-xs text-[var(--color-text-primary)] outline-none transition-colors duration-200 focus:border-[var(--color-accent-secondary)]"
              required
            />
          </label>

          <button
            type="submit"
            className="btn-pill mt-2 text-xs sm:text-sm"
            aria-label="Send message"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            <span>{status === 'sending' ? 'Sending...' : 'Send message'}</span>
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-1 text-green-500 text-xs">
              <CheckCircle size={14} /> Message sent successfully!
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-1 text-red-500 text-xs">
              <AlertCircle size={14} /> {errorMsg}
            </p>
          )}

          <p className="mt-2 text-[0.75rem] text-[var(--color-text-muted)] mb-[5px] pb-[5px]">
            Prefer direct contact?{' '}
            <a
              href="mailto:georgiouemm@gmail.com"
              className="underline decoration-dotted underline-offset-4 hover:text-[var(--color-accent-secondary)]"
            >
              georgiouemm@gmail.com
            </a>
          </p>
        </form>

        <aside className="space-y-3 text-xs text-[var(--color-text-muted)] sm:text-sm">
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              Based in
            </p>
            <p>📍 Thessaloniki, Greece (55133)</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              Phone
            </p>
            <p>📞 +30 697 9358 727</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">
              LinkedIn
            </p>
            <p>
              🌐{' '}
              <a
                href="https://www.linkedin.com/in/GeorgiouEmmanouil"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:text-[var(--color-accent-secondary)]"
              >
                /in/GeorgiouEmmanouil
              </a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactSection;
