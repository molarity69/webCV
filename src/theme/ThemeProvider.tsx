/**
 * @file ThemeProvider.tsx
 * @description React context for managing the three visual themes and syncing them
 * with the document root and localStorage.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

/**
 * Supported visual theme names.
 */
export type ThemeName = 'void' | 'neon' | 'sand'

/**
 * Theme context value describing the active theme and updater.
 */
interface ThemeContextValue {
  /** Currently selected theme name. */
  theme: ThemeName
  /** Update the current theme. */
  setTheme: (theme: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = 'em_theme'

/**
 * Apply the selected theme to the document root element via a CSS class.
 *
 * @param theme - Theme to apply.
 */
const applyThemeToDocument = (theme: ThemeName): void => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const themes: ThemeName[] = ['void', 'neon', 'sand']

  themes.forEach((t) => root.classList.remove(`theme-${t}`))
  root.classList.add(`theme-${theme}`)
}

/**
 * Provider component managing theme state and persistence.
 *
 * @param props - Component props with React children.
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('void')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null
      const initial: ThemeName =
        stored && ['void', 'neon', 'sand'].includes(stored) ? stored : 'void'

      setThemeState(initial)
      applyThemeToDocument(initial)
    } catch {
      // Fallback silently to default theme if localStorage is unavailable.
      applyThemeToDocument('void')
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // ignore persistence errors
    }
    applyThemeToDocument(next)
  }, [])

  const value: ThemeContextValue = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Hook to access the active theme and setter.
 *
 * @throws Error if used outside ThemeProvider.
 * @returns Theme context value.
 */
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
