/**
 * @file EducationSection.tsx
 * @description Education card with degree, thesis, and key coursework/tools.
 */

import React from 'react'

/**
 * EducationSection renders the education summary for Emmanouil.
 */
export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      aria-label="Education"
      className="card-surface mt-6 px-4 py-6 sm:px-6 sm:py-8"
    >
      <header className="mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Education
        </h2>
      </header>

      <article className="space-y-3 text-sm text-[var(--color-text-muted)]">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            B.Sc. with Integrated M.Sc. — Information and Communication Systems Engineering
          </h3>
          <p className="mt-1 text-xs">
            University of the Aegean, School of Engineering · Karlovasi, Samos, Greece
          </p>
          <p className="mt-0.5 text-xs font-semibold text-[var(--color-accent-secondary)]">
            Graduated: 2019
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Master Thesis
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-primary)]">
            &quot;Gesture recognition for ubiquitous computing applications using a smartwatch&quot;
          </p>
          <p className="mt-1 text-xs">
            Implemented Gesture Recognition Algorithms ($3, FFT, SAX) using Support Vector Machines
            (SVM). Created custom datasets and trained models for wrist wearable gesture detection.
          </p>
        </div>

        <div className="grid gap-3 text-xs sm:grid-cols-3">
          <div>
            <p className="mb-1 font-semibold text-[var(--color-text-primary)]">Programming</p>
            <p>
              C, C++, C#, Java, Verilog, Lua, Python
            </p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-[var(--color-text-primary)]">Web</p>
            <p>HTML5, CSS, SCSS, JavaScript, TypeScript</p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-[var(--color-text-primary)]">Tools</p>
            <p>
              Git, Docker, Trello, RapidMiner, ALTERA ModelSim, RStudio, Matlab, Microsoft ERP
              (NAVISION)
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default EducationSection
