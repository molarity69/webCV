/**
 * @file ExperienceSection.tsx
 * @description Vertical timeline of professional experience with detailed role cards.
 */

import React from 'react';

/**
 * Single experience entry in the vertical timeline.
 */
interface Experience {
  /** Company name. */
  company: string;
  /** Job title / role. */
  title: string;
  /** Date range for the role. */
  dateRange: string;
  /** Location information. */
  location: string;
  /** Optional company website URL. */
  website?: string;
  /** Bullet point highlights describing the role. */
  bullets: string[];
}

/**
 * Structured experience data in reverse chronological order.
 */
const EXPERIENCES: Experience[] = [
  {
    company: 'InstaShop',
    title: 'Software Engineer IC2',
    dateRange: 'April 2024 – Present',
    location: 'Thessaloniki, Greece (Remote)',
    website: 'https://instashop.com/en-ae',
    bullets: [
      'Leading migration of legacy Marketing Tool (AngularJS/Node v7) → modern Angular 19 + NestJS within Nx Monorepo.',
      'Re-architecting high-traffic internal tools for a quick-commerce platform with 2.5M+ active users.',
      'Designed a Redis-based ingestion layer to buffer campaign metrics; batch-processed into MongoDB via cron jobs — eliminating DB locks.',
      'Implemented Strategy & Orchestrator design patterns to reduce technical debt across 500+ active campaign types.',
      'Configured Docker → AWS ECR builds, orchestrated via AWS ECS for scalable production deployment.',
      'Integrated Elasticsearch for real-time wallet transaction tracking of marketplace clients and collaborated with Data Science to optimize Druid pipelines.',
    ],
  },
  {
    company: 'Apifon',
    title: 'Associate Software Engineer',
    dateRange: 'February 2023 – March 2024',
    location: 'Thessaloniki, Greece (Remote)',
    website: 'https://www.apifon.com',
    bullets: [
      'Developed features on a PHP middleware layer bridging a Java backend with an AngularJS frontend — without touching the core Java API.',
      'Contributed to refactoring a monolithic AngularJS codebase into component-based Angular standalone architecture.',
      'Dockerized environments and smaller internal projects to improve developer experience and reproducibility.',
    ],
  },
  {
    company: 'Pragma-IoT (CERTH Spin-off)',
    title: 'Full Stack Software Engineer (R&D)',
    dateRange: 'July 2022 – February 2023',
    location: 'Thessaloniki, Greece (Remote)',
    website: 'https://www1.pragma-iot.com/',
    bullets: [
      'Sole developer of a Smart Defibrillator (AED) network — now a sold commercial product.',
      'Built backend ingesting real-time MQTT sensor data (GPS, battery, environmental) over 4G using pub/sub, eliminating battery-draining polling.',
      'Developed an Ionic mobile app to locate nearest AED units and draw the shortest walking path using Google Services APIs.',
      'Engineered instant alert system to authorities upon incident detection or unauthorized device movement.',
      'Scripted Python automation jobs to ingest elevator historical sensor data from MySQL (KLEEMAN project).',
    ],
  },
  {
    company: 'CERTH/ITI',
    title: 'Full Stack Developer & Technical Team Lead',
    dateRange: 'March 2021 – June 2022',
    location: 'Thessaloniki, Greece',
    website: 'https://www.iti.gr',
    bullets: [
      'Technical Lead for a team of 2 junior devs — onboarding, mentoring, code reviews, GitLab workflow setup.',
      'Delivered the NESOI EU-funded platform: matchmaking algorithms + full MEAN stack for energy solutions on European islands.',
      'Developed Smart Home scripts in Lua/Node.js for the OPTIMEMS platform.',
      'Managed full deployment lifecycle on Ubuntu VMs: Apache servers, Docker containers, and log monitoring for stakeholder demos.',
    ],
  },
  {
    company: 'Noema Games (funded by GMK Medical)',
    title: 'Game Developer (Unity/C#)',
    dateRange: 'January 2020 – June 2022',
    location: 'Thessaloniki, Greece',
    website: 'https://noemagames.com',
    bullets: [
      'Developed core gameplay loops, puzzle mechanics, and game levels for Aurora: The Lost Medallion — The Cave (demo on Steam).',
      'Developed game systems: inventory, dialogue, save/load, UI.',
      "Assembled scenes with assets and animations from artists and following the director's vision, tying it all up with C# scripts.",
      'Resolved severe memory leaks from endlessly looping coroutines, saving critical CPU overhead.',
      'Engineered dynamic asset spawning/despawning and optimized 2D asset compression for reduced game footprint.',
      'Collaborated directly with artists and designers to translate creative vision into stable, production-ready features.',
    ],
  },
];

/**
 * ExperienceSection renders a non-animated vertical timeline of roles.
 */
export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      aria-label="Professional experience"
      className="card-surface mt-6 px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Experience
          </h2>
          <p className="mt-1.5 max-w-xl text-xs text-[var(--color-text-muted)]">
            A vertical snapshot of companies, products, and problems Emmanouil
            has shipped into the world.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Vertical accent line */}
        <div className="pointer-events-none absolute left-[11px] top-0 h-full w-px bg-[color-mix(in_srgb,var(--color-accent-soft)_70%,transparent)]" />

        <ol className="space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <li key={`${exp.company}-${exp.title}`} className="relative pl-10">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 flex h-5 w-5 items-center justify-center">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-accent-secondary)] shadow-[0_0_12px_rgba(245,158,11,0.7)]" />
              </div>

              <article className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border-soft)_80%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-soft)_92%,black)] p-4 shadow-sm sm:p-5">
                <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {exp.title}
                    </h3>
                    <p className="text-xs font-medium text-[var(--color-text-muted)]">
                      {exp.company}
                      {exp.website ? (
                        <>
                          {' '}
                          ·{' '}
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-dotted underline-offset-4 hover:text-[var(--color-accent-secondary)]"
                          >
                            Company site
                          </a>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <div className="text-right text-[0.7rem] text-[var(--color-text-muted)]">
                    <p>{exp.dateRange}</p>
                    <p>{exp.location}</p>
                  </div>
                </header>

                <ul className="mt-2 space-y-1.5 text-xs text-[var(--color-text-muted)] sm:text-[0.8rem]">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-[3px] h-[3px] w-[3px] flex-shrink-0 rounded-full bg-[var(--color-accent-secondary)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {index === 0 && (
                  <p className="mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-accent-secondary)]">
                    Current role
                  </p>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
