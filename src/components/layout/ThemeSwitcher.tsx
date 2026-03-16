/**
 * @file ThemeSwitcher.tsx
 * @description Small three-mode theme switcher used in the header.
 */

import React from 'react'
import { useTheme, type ThemeName } from '../../theme/ThemeProvider'

/**
 * Descriptor for a single theme switcher option.
 */
interface ThemeOption {
  /** Theme identifier to apply when clicked. */
  value: ThemeName
  /** Short label to display inside the pill. */
  label: string
  /** Optional subtle caption for screens or tooltips. */
  caption: string
}

/**
 * Static theme options matching the design spec.
 */
const THEME_OPTIONS: ThemeOption[] = [
  { value: 'void', label: 'Void', caption: 'Dark · Violet / Amber' },
  { value: 'neon', label: 'Neon', caption: 'Dark · Midnight / Teal' },
  { value: 'sand', label: 'Sand', caption: 'Light · Sand / Amber' },
]

/**
 * Per-theme hover background classes to preview the target accent color.
 */
const THEME_HOVER_CLASSES: Record<ThemeName, string> = {
  void: 'hover:bg-[rgba(124,58,237,0.28)]', // violet glow
  neon: 'hover:bg-[rgba(0,217,192,0.28)]', // teal glow
  sand: 'hover:bg-[var(--sand-bg)] hover:text-[var(--sand-text)]', // sand tint
}

/**
 * ThemeSwitcher renders a compact cluster of pill buttons to select the active theme.
 */
export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      aria-label="Theme switcher"
      className="inline-flex items-center rounded-full border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-bg-soft)_85%,black)] px-1 py-0.5 my-1 text-xs shadow-sm backdrop-blur-md"
    >
      {THEME_OPTIONS.map((option) => {
        const isActive = option.value === theme
        const hoverClass = THEME_HOVER_CLASSES[option.value]

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-pressed={isActive}
            className={`relative flex min-w-[3.5rem] flex-col items-center justify-center rounded-full px-2 py-1.5 transition-all duration-200 ${
              isActive
                ? 'bg-[var(--color-accent-soft)] text-[var(--color-text-primary)] shadow-md'
                : `text-[var(--color-text-muted)] ${hoverClass} hover:text-[var(--color-text-primary)]`
            }`}
          >
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
              {option.label}
            </span>
            <span className="mt-0.5 hidden text-[0.6rem] opacity-75 sm:inline">
              {option.caption}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSwitcher
