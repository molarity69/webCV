/**
 * @file AppLayout.tsx
 * @description Application shell with sidebar, header, scroll-spy, and main content area.
 */

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Sidebar } from './Sidebar';
import { ThemeSwitcher } from './ThemeSwitcher';
import { TerminalEasterEgg } from '../terminal/TerminalEasterEgg';

/**
 * Props for the main application layout.
 */
interface AppLayoutProps {
  /** Page content rendered to the right of the sidebar. */
  children: React.ReactNode;
}

/**
 * Section ids used for scroll-spy to highlight the active sidebar item.
 */
const SPY_SECTION_IDS = [
  'home',
  'skills',
  'experience',
  'projects',
  'education',
  'testimonials',
  'fun-facts',
  'contact',
];

/**
 * AppLayout composes the fixed sidebar, top header, and scrollable content region.
 *
 * @param props - Layout props including children.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('home');

  useEffect(() => {
    /**
     * Scroll-based spy: on every scroll tick, find the last section whose
     * top edge has scrolled past the fixed header.  This works reliably
     * regardless of section height or viewport size — no IntersectionObserver
     * threshold / rootMargin tuning needed.
     */
    const handleScroll = () => {
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--sidebar-header-height',
          ),
        ) || 56;
      const offset = headerHeight + 32;

      let currentId = SPY_SECTION_IDS[0];
      for (const id of SPY_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          currentId = id;
        }
      }
      setActiveSectionId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainClassName = clsx(
    // Use full viewport height for the main area but avoid extra bottom padding that creates
    // a large scrollable gap when page content is shorter than the viewport.
    'min-h-screen flex-1 bg-[var(--color-bg)] text-[var(--color-text-primary)] transition-all duration-300',
    'pt-20 pb-10 px-4 sm:px-8 md:pt-20',
    isCollapsed ? 'md:ml-20' : 'md:ml-64',
  );

  const headerClassName = clsx(
    'fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg)_88%,black)] px-4 py-2.5 text-xs shadow-sm backdrop-blur-xl transition-all duration-300',
    isCollapsed ? 'md:ml-20' : 'md:ml-64',
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onOpenMobile={() => setIsMobileOpen(true)}
        activeSectionId={activeSectionId}
      />

      {/* Mobile overlay when sidebar is open */}
      {isMobileOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Header with theme switcher */}
      <header
        id="site-header"
        style={{ height: 'var(--sidebar-header-height)' }}
        className={headerClassName}
      >
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          <span className="hidden sm:inline">Emmanouil Georgiou</span>
          <span className="hidden text-[var(--color-accent-secondary)] sm:inline">
            •
          </span>
          <span className="text-[var(--color-text-muted)]">
            Engineer · Generalist · Aspiring Polymath
          </span>
        </div>
        <ThemeSwitcher />
      </header>

      {/* Main scrollable content */}
      <main className={mainClassName}>
        <div className="mx-auto flex max-w-6xl flex-col gap-12">{children}</div>
      </main>

      {/* Hidden terminal easter egg overlay & trigger */}
      <TerminalEasterEgg />
    </div>
  );
};

export default AppLayout;
