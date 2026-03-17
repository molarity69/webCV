/**
 * @file HeroSection.tsx
 * @description Hero section with headline, CTA and full-body photo that fades at the edges into the page background.
 */

import React from 'react';
import { Download } from 'lucide-react';
import { SocialLinks } from '../common/SocialLinks';
import { VisitorCounter } from '../common/VisitorCounter';

/**
 * URL of the hero full-body photo.
 * TODO: Replace this placeholder URL with the hosted URL of Emmanouil's provided portrait.
 */
const HERO_PHOTO_URL =
  'https://res.cloudinary.com/dfxlovl4r/image/upload/v1773775525/19cf728e6bf18_qbbdgw.png';

/**
 * HeroSection component displaying the main introduction and full-body photo.
 */
export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-label="Introduction and overview"
      className="relative isolate overflow-hidden border-b border-[var(--color-border-soft)] bg-[var(--color-bg)] px-4 pb-16 pt-24 text-[var(--color-text-primary)] sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-stretch">
        {/* Text column */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-balance font-['Syne'] text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="hero-name-gradient bg-clip-text text-transparent">
                Emmanouil Georgiou
              </span>
            </h1>
            <p className="mt-2 font-['Syne'] text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)] hidden md:inline">
              Engineer · Generalist · Aspiring Polymath
            </p>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-[var(--color-text-primary)] sm:text-base">
            <em>
              "Full Stack Engineer with 5+ years of shipping real things — from
              IoT defibrillator networks, to high-traffic platforms serving 2.5
              million users, to a point-and-click adventure game on Steam. I
              architect backends, sculpt frontends, mentor teams,
              gesture-recognize your wrist movements, and occasionally make my
              colleagues question whether they need a senior dev or a stand-up
              comedian. Greek by birth, Engineer by obsession, polymath by
              stubbornness."
            </em>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* TODO: Link to hosted generic CV PDF */}
            <a
              href="#"
              aria-label="Download CV"
              className="btn-pill inline-flex items-center gap-2 px-5 py-2.5"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>

            <span className="text-xs italic text-[var(--color-text-muted)]">
              👀 Future feature: Paste a job description → get an AI-tailored CV
              + match score
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <SocialLinks variant="hero" />
          </div>

          <div className="mt-6">
            <VisitorCounter />
          </div>
        </div>

        {/* Photo column with edge-fade effect */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Ambient glow behind the photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-6 inset-x-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,var(--color-accent-soft)_0%,transparent_65%)] opacity-80 blur-2xl"
          />

          {/* overflow-visible so the mask fade isn't hard-clipped by the container boundary */}
          <div className="hero-photo-wrapper relative mx-auto aspect-[3/5] w-full max-w-sm overflow-visible">
            <img
              src={HERO_PHOTO_URL}
              alt="Full-body portrait of Emmanouil Georgiou leaning against a wall."
              className="hero-photo-fade absolute w-full h-full object-cover top-[60%] -left-[15%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
