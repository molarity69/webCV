/**
 * @file SocialLinks.tsx
 * @description Reusable social link icon row for hero, sidebar, and footer areas.
 * Ensures consistent sizing, spacing, and alignment across layouts.
 */

import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Gamepad2,
  Plus,
  type LucideIcon,
} from 'lucide-react';

/**
 * Supported visual variants for the social links row.
 * "sidebar" centers icons within the narrow navigation rail.
 */
export interface SocialLinksProps {
  /** Visual style / context where the links are rendered. */
  variant?: 'sidebar' | 'hero' | string;
  /** Whether to include placeholder buttons reserved for future links. */
  includePlaceholders?: boolean;
}

/**
 * Descriptor for a single social link item.
 */
interface SocialLinkItem {
  /** Unique id for the link. */
  id: string;
  /** Accessible label describing the destination. */
  label: string;
  /** Target URL for the social profile. */
  href: string;
  /** Lucide icon component to render. */
  icon: LucideIcon;
}

/**
 * Concrete social links used across the CV site.
 */
const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn profile',
    href: 'https://www.linkedin.com/in/GeorgiouEmmanouil',
    icon: Linkedin,
  },
  {
    id: 'github',
    label: 'GitHub profile',
    href: 'https://github.com/molarity69',
    icon: Github,
  },
  {
    id: 'steam',
    label: 'Steam game page',
    href: 'https://store.steampowered.com/app/1088610/Aurora_The_Lost_Medallion__The_Cave/',
    icon: Gamepad2,
  },
  {
    id: 'email',
    label: 'Send email to Emmanouil',
    href: 'mailto:georgiouemm@gmail.com',
    icon: Mail,
  },
];

/**
 * SocialLinks renders a compact row of icon-only buttons with tooltips,
 * adapted for either hero or sidebar usage.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'hero',
  includePlaceholders = false,
}) => {
  const isSidebar = variant === 'sidebar';

  /** Base container classes, tuned per variant for alignment. */
  const containerClasses = isSidebar
    ? 'flex flex-wrap items-center justify-center gap-2 w-full'
    : 'flex flex-wrap items-center gap-2';

  /** Shared button styling with variant-specific sizing tweaks. */
  const baseButtonClasses =
    'inline-flex items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]';

  const sizeClasses = isSidebar ? 'h-9 w-9' : 'h-10 w-10';

  const colorClasses =
    'border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_92%,black)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-soft)]';

  const placeholderClasses =
    'border-dashed border-[var(--color-border-soft)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-secondary)] hover:text-[var(--color-accent-secondary)]';

  return (
    <div className={containerClasses}>
      {SOCIAL_LINKS.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={`${baseButtonClasses} ${sizeClasses} ${colorClasses}`}
          >
            <Icon size={18} />
          </a>
        );
      })}

      {includePlaceholders && (
        <>
          {/* Future link placeholder */}
          <button
            type="button"
            aria-label="Future link placeholder"
            className={`${baseButtonClasses} ${sizeClasses} ${placeholderClasses}`}
          >
            <Plus size={16} />
          </button>
          {/* Future link placeholder */}
          <button
            type="button"
            aria-label="Future link placeholder"
            className={`${baseButtonClasses} ${sizeClasses} ${placeholderClasses}`}
          >
            <Plus size={16} />
          </button>
        </>
      )}
    </div>
  );
};

export default SocialLinks;
