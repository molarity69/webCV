/**
 * @file ProjectsSection.tsx
 * @description Projects grid showcasing shipped work and in-progress ideas.
 */

import React from 'react';
import { ExternalLink, Wrench } from 'lucide-react';

/**
 * Flag controlling visibility of the Void Merge project card.
 * Toggle VOID_MERGE_ENABLED to true when game is live.
 */
const VOID_MERGE_ENABLED = false;

/**
 * Single project card information.
 */
interface Project {
  /** Project title. */
  title: string;
  /** Short human description. */
  description: string;
  /** Optional status badge, e.g., In Development. */
  statusBadge?: string;
  /** Whether the project should be visually featured. */
  featured?: boolean;
  /** List of tech stack labels. */
  tech: string[];
  /** Optional external link. */
  link?: string;
  /** CTA label, if a link is present. */
  ctaLabel?: string;
  /** Optional banner placeholder label. */
  bannerLabel?: string;
  /** Optional banner image URL. If provided, renders an <img> instead of the text placeholder. */
  bannerImage?: string;
}

/**
 * Static project definitions.
 */
const BASE_PROJECTS: Project[] = [
  {
    title: 'Aurora: The Lost Medallion — The Cave',
    description:
      'A commercial point-and-click adventure game shipped on Steam. Built at Noema Games with Unity/C#, featuring optimized asset management and dynamic spawning systems.',
    tech: ['C#', 'Unity', 'Asset Optimization', 'Memory Management'],
    link: 'https://store.steampowered.com/app/1088610/Aurora_The_Lost_Medallion__The_Cave/',
    ctaLabel: 'View on Steam →',
    bannerLabel: '[ AURORA BANNER IMAGE ]',
    bannerImage:
      'https://res.cloudinary.com/dfxlovl4r/image/upload/v1773775486/noema_games_aurora_the_lost_medallion_the_cave_banner_ifbh3n.jpg',
  },
  {
    title: 'NESOI Platform (EU-Funded)',
    description:
      'Main Front & Backend Developer for the New Energy Solutions Optimised for Islands platform — matchmaking, social networking, chat, e-learning, and profile customization for European islands.',
    tech: [
      'MEAN Stack',
      'MongoDB',
      'Express',
      'Angular',
      'Node.js',
      'Matchmaking Algorithms',
      'Moodle',
      'Matomo',
    ],
    link: 'https://www.nesoi.eu/nef-platform',
    ctaLabel: 'Visit platform →',
    bannerLabel: '[ NESOI FEATURED BANNER ]',
    bannerImage:
      'https://res.cloudinary.com/dfxlovl4r/image/upload/v1773775485/fullcolor-fulltext-horizontal-rgb_1_mqtxky.jpg',
  },
  {
    title: 'Gesture Recognition Thesis',
    description:
      'Master’s thesis: Gesture recognition for ubiquitous computing using a smartwatch. Implemented $3, FFT, and SAX algorithms with SVM training on custom datasets, plus Android apps for phone-watch communication.',
    tech: ['Java', 'Android', 'SVM', '$3', 'FFT', 'SAX', 'Signal Processing'],
    link: 'https://github.com/molarity69/Thesis111',
    ctaLabel: 'View on GitHub →',
    bannerLabel: '[ THESIS FEATURED BANNER ]',
    bannerImage:
      'https://res.cloudinary.com/dfxlovl4r/image/upload/v1773775684/huawei-watch-2_cufxie.png',
  },
  {
    title: 'Smart AED Network',
    description:
      'Sole developer of a Smart Defibrillator (AED) locator network — created for the Municipality of Drama. Real-time MQTT backend, geospatial Ionic app, and emergency alert infrastructure.',
    tech: ['Node.js', 'MQTT', 'Ionic', 'Google Maps API', '4G Pub/Sub'],
  },
];

/**
 * Optionally augmented list including Void Merge if enabled.
 */
const getProjects = (): Project[] => {
  const projects = [...BASE_PROJECTS];

  if (VOID_MERGE_ENABLED) {
    projects.splice(3, 0, {
      title: 'Void Merge',
      description:
        'A casual, browser-friendly merge puzzle game combining Suika-style mechanics with wave-based spaceship combat. Targeting HTML5/TypeScript for casual web platforms.',
      tech: ['TypeScript', 'HTML5', 'Canvas / WebGL (planned)'],
      statusBadge: '🔧 In Development',
      ctaLabel: 'Stay tuned',
    });
  }

  return projects;
};

/**
 * Tag pill for a technology label.
 *
 * @param props - Tech badge text.
 */
const TechBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="rounded-full bg-[color-mix(in_srgb,var(--color-accent-soft)_40%,transparent)] px-2 py-0.5 text-[0.65rem] font-medium text-[var(--color-text-primary)]">
    {label}
  </span>
);

/**
 * ProjectsSection renders the project cards grid.
 */
export const ProjectsSection: React.FC = () => {
  const projects = getProjects();

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="card-surface mt-6 px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Projects
          </h2>
          <p className="mt-1.5 max-w-xl text-xs text-[var(--color-text-muted)]">
            Shipped games, EU-funded platforms, research projects, and
            commercial IoT products.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className={`relative flex flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-border-soft)_80%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-soft)_92%,black)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
              project.featured ? 'md:col-span-2' : ''
            }`}
          >
            {/* Banner placeholder area */}
            {project.bannerImage ? (
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={project.bannerImage}
                  alt={`${project.title} banner`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ) : project.bannerLabel ? (
              <div className="relative flex h-28 items-center justify-center bg-[radial-gradient(circle_at_10%_0%,var(--color-accent-soft),transparent_65%),color-mix(in_srgb,var(--color-bg-softer)_80%,black)] text-[0.7rem] font-mono uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {project.bannerLabel}
              </div>
            ) : null}

            {project.featured && (
              <span className="absolute right-4 top-3 rounded-full bg-[var(--color-accent-secondary-soft)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-secondary)]">
                Featured
              </span>
            )}

            {project.statusBadge && (
              <span className="absolute right-4 top-3 inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-accent-soft)_60%,transparent)] px-2.5 py-1 text-[0.65rem] font-semibold text-[var(--color-accent-secondary)]">
                <Wrench size={12} />
                {project.statusBadge}
              </span>
            )}

            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
              <header>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {project.description}
                </p>
              </header>

              <div className="mt-1 flex flex-wrap gap-1.5">
                {project.tech.map((label) => (
                  <TechBadge key={label} label={label} />
                ))}
              </div>

              {project.link && project.ctaLabel && (
                <div className="mt-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pill text-xs"
                    aria-label={project.ctaLabel}
                  >
                    <ExternalLink size={16} />
                    <span>{project.ctaLabel}</span>
                  </a>
                </div>
              )}

              {!project.link && (
                <p className="mt-2 text-[0.7rem] text-[var(--color-text-muted)]">
                  *No public link — commercial product.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
