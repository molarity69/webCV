/**
 * @file Sidebar.tsx
 * @description Collapsible left sidebar with improved brand area, alignment fixes and cleaned footer.
 */

import React from 'react';
import {
  ChevronLeft,
  GraduationCap,
  Home,
  Menu,
  MessageCircle,
  Rocket,
  Sparkles,
  X,
  BriefcaseBusiness,
  Zap,
  Mail,
} from 'lucide-react';
import { SocialLinks } from '../common/SocialLinks';

/**
 * Sidebar component props.
 */
interface SidebarProps {
  /** Whether the sidebar is collapsed to icons only on desktop. */
  isCollapsed: boolean;
  /** Toggle function for desktop collapse/expand. */
  onToggleCollapse: () => void;
  /** Whether the sidebar drawer is currently open on mobile. */
  isMobileOpen: boolean;
  /** Close handler for the mobile drawer. */
  onCloseMobile: () => void;
  /** Open handler for the mobile drawer. */
  onOpenMobile: () => void;
  /** Currently active section id for scroll-spy highlighting. */
  activeSectionId?: string;
}

/**
 * Internal navigation item descriptor for sidebar anchors.
 */
interface NavItem {
  /** Target section id without the leading hash. */
  id: string;
  /** Human-readable label shown in the sidebar. */
  label: string;
  /** Lucide icon to represent the section. */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/**
 * Top-level navigation items in the order specified by the design.
 */
const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
  { id: 'fun-facts', label: 'Fun Facts', icon: Sparkles },
  { id: 'contact', label: 'Contact', icon: Mail },
];

/**
 * Smoothly scroll to a section by id while accounting for the fixed header height.
 *
 * @param targetId - Section id without the hash.
 */
const scrollToSection = (targetId: string): void => {
  const element = document.getElementById(targetId);
  if (!element) return;

  // Use native scrollIntoView; header offset is handled via CSS scroll-margin-top.
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};



/**
 * Sidebar navigation and social area.
 *
 * Behavior notes:
 * - When `isCollapsed` is true (desktop condensed rail), the left brand area
 *   will render the collapse/expand button in place of the "EG" brand so the
 *   visual left rail remains compact and aligned.
 * - When expanded the EG circle + label appear as before; the EG text is nudged
 *   slightly to the right to visually center the characters.
 *
 * @param props - Sidebar configuration and handlers.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onOpenMobile,
  activeSectionId,
}) => {
  const baseWidthClass = isCollapsed ? 'md:w-20' : 'md:w-64';
  const labelVisibilityClass = isCollapsed ? 'md:hidden' : 'md:inline';

  return (
    <>
      <aside
        aria-label="Page navigation sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[color-mix(in_srgb,var(--color-bg-soft)_88%,black)] text-[var(--color-text-primary)] shadow-xl backdrop-blur-xl transition-all duration-300 ease-out md:flex ${baseWidthClass} ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top brand area */}
        <div
          style={{ height: 'var(--sidebar-header-height)' }}
          className="flex items-center justify-between border-b border-[var(--color-border-soft)] px-4 py-5"
        >
          {/* Left: EG circle + label */}
          <button
            type="button"
            aria-label="Scroll to home section"
            onClick={() => {
              scrollToSection('home');
              onCloseMobile();
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-text-primary)]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-xs font-bold pl-1">
              EG
            </div>
            <span className={`text-[0.65rem] ${labelVisibilityClass}`}>
              Engineer CV
            </span>
          </button>

          {/* Right: chevron toggle (desktop) or close (mobile) */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden md:inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all duration-200 hover:border-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-soft)] ${
              isCollapsed ? '' : 'border border-[var(--color-border-soft)]'
            }`}
          >
            <ChevronLeft
              size={14}
              className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border-soft)] text-[var(--color-text-muted)] transition-all duration-200 hover:border-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-soft)] md:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="flex flex-col gap-1 text-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeSectionId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToSection(item.id);
                      onCloseMobile();
                    }}
                    className={`group relative flex items-center gap-3 rounded-full px-2.5 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                      isCollapsed
                        ? 'md:w-12 md:h-12 md:justify-center md:px-0 md:mx-auto'
                        : 'w-full'
                    } ${
                      isActive
                        ? 'bg-[color-mix(in_srgb,var(--color-accent-soft)_70%,transparent)] text-[var(--color-text-primary)]'
                        : 'text-[var(--color-text-muted)] hover:bg-[color-mix(in_srgb,var(--color-bg-soft)_70%,black)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {/* Active indicator bar */}
                    <span
                      className={`absolute left-1 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-[var(--color-accent-secondary)] transition-opacity duration-200 ${
                        isActive
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-60'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-bg-soft)_70%,black)] text-[var(--color-text-primary)] transition-colors duration-200 group-hover:bg-[var(--color-accent-soft)]">
                      <Icon width={18} height={18} />
                    </span>
                    <span
                      className={`text-xs font-medium ${labelVisibilityClass}`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar footer: Removed the redundant profile icon + paragraph that was too close to the social buttons.
            Instead: small centered legal/credit text (hidden when collapsed) and social links below it.
            `mt-auto` keeps this footer pinned to the bottom of the sidebar on all screen sizes. */}
        <div className="mt-auto border-t border-[var(--color-border-soft)] px-3 py-3 text-[0.7rem] text-[var(--color-text-muted)]">
          <div
            className={`mb-3 flex items-center justify-center ${labelVisibilityClass}`}
          >
            <span className="text-[0.78rem]">© Emmanouil Georgiou</span>
          </div>

          {/* Social icons row is always centered horizontally, regardless of collapsed/expanded state. */}
          <div className="flex items-center justify-center gap-2 pt-3">
            <SocialLinks variant="sidebar" includePlaceholders />
          </div>
        </div>
      </aside>

      {/* Mobile trigger button in the top-left corner */}
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={onOpenMobile}
        className="fixed left-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_90%,black)] text-[var(--color-text-primary)] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[var(--color-accent-secondary)] hover:bg-[var(--color-accent-soft)] md:hidden"
        /* Position the mobile sidebar trigger just below the fixed header, so it never overlaps the tagline. */
        style={{
          top: 'calc(var(--sidebar-header-height) + 0.5rem)',
          pointerEvents: isMobileOpen ? 'none' : 'auto',
          opacity: isMobileOpen ? 0 : 1,
        }}
      >
        <Menu size={18} />
      </button>
    </>
  );
};

export default Sidebar;
