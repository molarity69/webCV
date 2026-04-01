/**
 * @file TestimonialsSection.tsx
 * @description Auto-playing testimonials carousel with professional and playful quotes.
 */

import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

/**
 * Single testimonial quote definition.
 */
interface Testimonial {
  /** Main quote text. */
  quote: string
  /** Person giving the quote. */
  name: string
  /** Their title or relationship. */
  title: string
  /** Whether this quote is more playful/personal. */
  playful?: boolean
}

/**
 * All testimonial quotes shown in the carousel.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "You're a teacher... no no, you're a professor... no no... you're a Dean.",
    name: 'Kostas Moschou - When asked about his role as a mentor',
    title: 'Team Lead & Full Stack Engineer, InstaShop',
  },
  {
    quote: 'I wish I had 10 more like you — work would be so much easier.',
    name: 'Dimosthenis Ioannidis - When praising his ability to handle complex tasks independently',
    title: 'Project Manager, CERTH/ITI',
  },
  {
    quote:
      'You may have been difficult as a child, but if I were given the opportunity to choose which child to raise again, I would choose you.',
    name: "My Mom — Unbiased Performance Review, circa always",
    title: "Emmanouil's Mom",
    playful: true,
  },
  {
    quote: 'Why is the Wi-Fi not working again?',
    name: 'My Dad — Senior Network Consultant (self-appointed)',
    title: "Emmanouil's Dad",
    playful: true,
  },
]

/**
 * TestimonialsSection renders an auto-playing slider with manual controls.
 */
export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 8000)

    return () => {
      window.clearInterval(id)
    }
  }, [])

  const goTo = (next: number): void => {
    const total = TESTIMONIALS.length
    const normalized = ((next % total) + total) % total
    setIndex(normalized)
  }

  const current = TESTIMONIALS[index]

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="card-surface mt-6 px-4 py-6 sm:px-6 sm:py-8"
    >
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Testimonials
          </h2>
          <p className="mt-1.5 max-w-xl text-xs text-[var(--color-text-muted)]">
            A mix of professional feedback and lovingly biased family reviews.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border-soft)] text-[var(--color-text-muted)] transition-colors duration-200 hover:border-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-soft)]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border-soft)] text-[var(--color-text-muted)] transition-colors duration-200 hover:border-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-soft)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-border-soft)_80%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-soft)_92%,black)] p-5 shadow-sm sm:p-6 min-h-[200px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,var(--color-accent-soft),transparent_55%)] opacity-60" />
        {/* Use a column layout that spaces content vertically so attribution / playful note do not change the component height */}
        <div className="relative flex h-full flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-bg-softer)_85%,black)] text-[var(--color-accent-secondary)] shadow-[0_0_14px_rgba(245,158,11,0.7)]">
              <Quote size={18} />
            </div>
            <p className="text-sm italic leading-relaxed text-[var(--color-text-primary)]">
              "{current.quote}"
            </p>
          </div>

          <div className="mt-1 text-xs text-[var(--color-text-muted)]">
            <p className="font-semibold text-[var(--color-text-primary)]">{current.name}</p>
            <p>{current.title}</p>
          </div>

          {current.playful && (
            <p className="mt-1 text-[0.7rem] text-[var(--color-accent-secondary)]">
              Family review · Humor intended
            </p>
          )}
        </div>
      </div>
      {/* Dots moved to absolute bottom-left so they never push layout */}
          <div className="relative left-5 bottom-5 flex items-center gap-1.5">
            {TESTIMONIALS.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                onClick={() => goTo(dotIndex)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  dotIndex === index
                    ? 'w-5 bg-[var(--color-accent-secondary)]'
                    : 'w-2 bg-[color-mix(in_srgb,var(--color-border-soft)_80%,transparent)]'
                }`}
              />
            ))}
          </div>
    </section>
  )
}

export default TestimonialsSection
