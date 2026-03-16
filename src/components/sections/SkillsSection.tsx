/**
 * @file SkillsSection.tsx
 * @description NBA 2K-style skill ratings section with animated stat bars and overall badge.
 */

import React, { useEffect, useRef, useState } from 'react'

/**
 * Single skill with a numeric rating.
 */
interface Skill {
  /** Human-readable skill name. */
  name: string
  /** Rating out of 99. */
  rating: number
}

/**
 * Logical group of related skills displayed together.
 */
interface SkillGroup {
  /** Group title, e.g., Frontend, Backend. */
  title: string
  /** List of skills within this group. */
  skills: Skill[]
}

/**
 * All skill groups and their ratings, modeled after a game character card.
 */
const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'TypeScript', rating: 95 },
      { name: 'Angular (incl. Angular 19)', rating: 92 },
      { name: 'AngularJS', rating: 78 },
      { name: 'HTML5 / CSS / SCSS', rating: 88 },
      { name: 'React', rating: 72 },
      { name: 'Ionic', rating: 74 },
      { name: 'JavaScript', rating: 91 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', rating: 88 },
      { name: 'NestJS', rating: 85 },
      { name: 'REST API Design', rating: 87 },
      { name: 'PHP (Middleware)', rating: 65 },
      { name: 'Python (Scripting)', rating: 72 },
      { name: 'MQTT / Pub-Sub', rating: 80 },
      { name: 'Elasticsearch', rating: 75 },
    ],
  },
  {
    title: 'Data & Infra',
    skills: [
      { name: 'MongoDB', rating: 85 },
      { name: 'Redis', rating: 82 },
      { name: 'MySQL', rating: 70 },
      { name: 'Docker', rating: 78 },
      { name: 'AWS (ECS/ECR)', rating: 74 },
      { name: 'Nx Monorepos', rating: 80 },
      { name: 'Git / GitLab', rating: 88 },
    ],
  },
  {
    title: 'Game Dev & Other',
    skills: [
      { name: 'C# / Unity', rating: 80 },
      { name: 'C / C++', rating: 65 },
      { name: 'Java', rating: 60 },
      { name: 'Lua', rating: 55 },
      { name: 'Agile / Scrum', rating: 90 },
      { name: 'Technical Leadership', rating: 85 },
      { name: 'Code Reviews', rating: 88 },
    ],
  },
]

/**
 * Props for an individual skill bar row.
 */
interface SkillBarRowProps {
  /** Skill data to render. */
  skill: Skill
  /** Whether the animation should be active (section in view). */
  hasAnimated: boolean
}

/**
 * Renders a single skill label, numeric rating, and animated bar.
 *
 * @param props - SkillBarRowProps
 */
const SkillBarRow: React.FC<SkillBarRowProps> = ({ skill, hasAnimated }) => {
  // Use rating normalized to 99 so the highest ratings can nearly fill the bar.
  const normalizedWidth = `${(skill.rating / 99) * 100}%`

  return (
    <div className="group space-y-1.5">
      <div className="flex items-baseline justify-between text-[0.8rem]">
        <span className="font-medium text-[var(--color-text-primary)]">{skill.name}</span>
        <span className="font-semibold text-[var(--color-accent-secondary)]">{skill.rating}</span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-bg-soft)_70%,black)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-secondary)] via-[var(--color-accent)] to-[var(--color-accent-secondary)] shadow-[0_0_14px_rgba(124,58,237,0.65)] transition-all duration-1000 ease-out"
          style={{ width: hasAnimated ? normalizedWidth : '0%' }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent mix-blend-screen opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
      </div>
    </div>
  )
}

/**
 * Badge displaying the overall rating (OVR) styled like a sports game stat.
 */
const OverallBadge: React.FC = () => {
  return (
    <div className="relative inline-flex items-center gap-3 rounded-full border border-[var(--color-accent-secondary-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_90%,black)] px-3 py-2 text-xs uppercase tracking-[0.18em]">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_0%,var(--color-accent-secondary-soft),transparent_55%),color-mix(in_srgb,var(--color-bg-soft)_80%,black)] shadow-[0_0_20px_rgba(245,158,11,0.55)]">
        <span className="text-lg font-extrabold text-[var(--color-accent-secondary)]">91</span>
        <span className="pointer-events-none absolute inset-0 rounded-full border border-[color-mix(in_srgb,var(--color-accent-secondary-soft)_60%,transparent)]" />
      </div>
      <div className="flex flex-col text-[0.6rem] text-[var(--color-text-muted)]">
        <span className="font-semibold text-[var(--color-text-primary)]">Overall Rating</span>
        <span>Engineer archetype · Versatile generalist</span>
      </div>
    </div>
  )
}

/**
 * SkillsSection component displaying grouped skills with animated stat bars.
 */
export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const target = sectionRef.current
    if (!target) return

    /**
     * IntersectionObserver callback to trigger bar animations once.
     */
    const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setHasAnimated(true)
        observer.disconnect()
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
    })

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Skill ratings"
      className="card-surface mt-4 px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Skill Ratings
          </h2>
          <p className="mt-1.5 max-w-xl text-xs text-[var(--color-text-muted)]">
            NBA 2K-inspired stat card for a Full Stack Engineer. Ratings are out of 99 and grouped by domain.
          </p>
        </div>
        <OverallBadge />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border-soft)_85%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-soft)_92%,black)] p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.7)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {group.title}
              </h3>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--color-accent-soft)_50%,transparent)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-secondary)]">
                {group.skills.length} stats
              </span>
            </div>
            <div className="space-y-3">
              {group.skills.map((skill) => (
                <SkillBarRow key={skill.name} skill={skill} hasAnimated={hasAnimated} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection