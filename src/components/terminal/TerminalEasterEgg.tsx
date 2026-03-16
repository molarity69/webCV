/**
 * @file TerminalEasterEgg.tsx
 * @description Hidden terminal modal triggered by a subtle button and Konami Code.
 */

import React, { useEffect, useRef, useState } from 'react'

/**
 * Supported terminal command names.
 */
const TERMINAL_COMMANDS = [
  'whoami',
  'help',
  'ls projects',
  'cat skills.txt',
  'sudo hire emmanouil',
  'cd void-merge',
  'git log',
  'man emmanouil',
  'ping mom',
  'ping dad',
  'uname -a',
  'clear',
  'exit',
]

/**
 * Key sequence for the Konami Code trigger.
 */
const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

/**
 * TerminalEasterEgg renders the hidden >_ trigger and the interactive terminal modal.
 *
 * Features:
 * - Open via subtle button or Konami Code
 * - Close by clicking backdrop or pressing Escape
 * - Command history, tab-complete, and pre-scripted responses
 * - Focus trap while modal is open to keep keyboard focus inside the terminal
 */
export const TerminalEasterEgg: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [outputLines, setOutputLines] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const konamiBufferRef = useRef<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  /**
   * Close the terminal and clear its state.
   *
   * @param byKeyboard - Whether the terminal was closed via keyboard (Escape).
   *                     When closed by keyboard we avoid re-focusing the trigger
   *                     to prevent focus styles persisting unexpectedly.
   */
  const closeTerminal = React.useCallback((byKeyboard = false) => {
    setIsOpen(false)
    setOutputLines([])
    setInput('')
    setHistory([])
    setHistoryIndex(null)

    // Defer focus/blur handling until after modal close effects settle.
    window.setTimeout(() => {
      try {
        // If closed by keyboard and the trigger is the previously focused element,
        // blur it so it doesn't retain a persistent focus outline/border.
        if (byKeyboard && triggerRef.current && previouslyFocusedRef.current === triggerRef.current) {
          triggerRef.current.blur()
          return
        }

        // Otherwise, restore focus to the previously focused element if present.
        previouslyFocusedRef.current?.focus()
      } catch {
        // ignore focus errors
      }
    }, 10)
  }, [])

  /**
   * Scroll the terminal view to the bottom whenever output changes.
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [outputLines, isOpen])

  /**
   * Focus the input when the terminal opens.
   */
  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  /**
   * Global key listener to detect the Konami Code.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      konamiBufferRef.current.push(event.key)
      if (konamiBufferRef.current.length > KONAMI_SEQUENCE.length) {
        konamiBufferRef.current.shift()
      }

      if (
        konamiBufferRef.current.length === KONAMI_SEQUENCE.length &&
        KONAMI_SEQUENCE.every((key, idx) => konamiBufferRef.current[idx].toLowerCase() === key.toLowerCase())
      ) {
        previouslyFocusedRef.current = document.activeElement as HTMLElement | null
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  /**
   * Close terminal when Escape is pressed.
   *
   * Adds a keydown listener only while the terminal is open to avoid
   * interfering with other global keyboard behavior.
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        // Indicate the terminal was closed by keyboard to ensure we blur the trigger
        // instead of leaving it focused (fixes persistent white border on some browsers).
        closeTerminal(true)
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeTerminal])

  /**
   * Focus trap effect: confines keyboard focus inside the terminal modal while open.
   *
   * Steps:
   * - Save previously focused element
   * - Move focus to the input (or first focusable)
   * - Intercept Tab / Shift+Tab and cycle focus within modal
   * - Restore focus on close and clean up listeners
   */
  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    /**
     * Return an array of focusable elements inside the container.
     *
     * @param container - Modal container element
     */
    const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
      const selectors =
        'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
      const nodeList = Array.from(container.querySelectorAll<HTMLElement>(selectors))
      return nodeList.filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0)
    }

    const container = modalRef.current
    const focusable = getFocusableElements(container)
    const first = focusable[0] ?? inputRef.current ?? container
    const last = focusable[focusable.length - 1] ?? first

    // Save previously focused element to restore later
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    // Focus the input or first focusable element
    ;(first as HTMLElement).focus()

    /**
     * Keydown handler to trap focus inside modal.
     *
     * @param e - KeyboardEvent
     */
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Tab') {
        // If there are no focusable elements, prevent tabbing out of the modal
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        // Cycle forward
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          ;(first as HTMLElement).focus()
        }
        // Cycle backward
        else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          ;(last as HTMLElement).focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      // NOTE: Do NOT restore focus here. closeTerminal handles restoration/blur
      // so we can differentiate between keyboard and pointer closes.
    }
  }, [isOpen])

  /**
   * Append lines to the terminal output.
   *
   * @param lines - Lines of text to append.
   */
  const appendLines = (lines: string[]): void => {
    setOutputLines((prev) => [...prev, ...lines])
  }

  /**
   * Execute a single terminal command and update output.
   *
   * @param rawCommand - Command string from user input.
   */
  const executeCommand = (rawCommand: string): void => {
    const command = rawCommand.trim()

    if (!command) return

    if (command === 'clear') {
      setOutputLines([])
      return
    }

    if (command === 'exit') {
      closeTerminal()
      return
    }

    switch (command) {
      case 'whoami':
        appendLines([
          'Emmanouil Georgiou — Engineer, generalist, aspiring polymath.',
          'Full Stack, Game Dev, IoT, team lead, instrument enthusiast, and occasional comedian.',
          "Type 'help' for more.",
        ])
        break
      case 'help':
        appendLines([
          'Available commands:',
          '',
          '  whoami            - Short bio',
          '  help              - Show this help',
          '  ls projects       - List highlighted projects',
          '  cat skills.txt    - Show skill ratings (ASCII style)',
          "  sudo hire emmanouil",
          '                    - Initiate hiring protocol',
          '  cd void-merge     - Peek into a coming-soon directory',
          '  git log           - View recent (humorous) commits',
          '  man emmanouil     - Manual page for the human',
          '  ping mom          - Send ICMP packet to Mom',
          '  ping dad          - Send ICMP packet to Dad',
          '  uname -a          - System information',
          '  clear             - Clear terminal',
          '  exit              - Close terminal',
        ])
        break
      case 'ls projects':
        appendLines([
          'aurora-the-lost-medallion/',
          'nesoi-platform/',
          'smart-aed-network/',
          'gesture-recognition-thesis/',
          'void-merge/ [LOCKED - coming soon]',
        ])
        break
      case 'cat skills.txt':
        appendLines([
          '=== SKILL RATINGS (OUT OF 99) ===',
          '',
          'Frontend:',
          '  TypeScript ............... 95',
          '  Angular (incl. 19) ....... 92',
          '  AngularJS ................ 78',
          '  HTML/CSS/SCSS ............ 88',
          '  React .................... 72',
          '  Ionic .................... 74',
          '  JavaScript ............... 91',
          '',
          'Backend:',
          '  Node.js .................. 88',
          '  NestJS ................... 85',
          '  REST API Design .......... 87',
          '  PHP (Middleware) ......... 65',
          '  Python (Scripting) ....... 72',
          '  MQTT / Pub-Sub ........... 80',
          '  Elasticsearch ............ 75',
          '',
          'Data & Infra:',
          '  MongoDB .................. 85',
          '  Redis .................... 82',
          '  MySQL .................... 70',
          '  Docker ................... 78',
          '  AWS (ECS/ECR) ............ 74',
          '  Nx Monorepos ............. 80',
          '  Git / GitLab ............. 88',
          '',
          'Game Dev & Other:',
          '  C# / Unity ............... 80',
          '  C / C++ .................. 65',
          '  Java ..................... 60',
          '  Lua ...................... 55',
          '  Agile / Scrum ............ 90',
          '  Technical Leadership ..... 85',
          '  Code Reviews ............. 88',
          '',
          'Overall: 91 OVR',
        ])
        break
      case 'sudo hire emmanouil': {
        appendLines(['[sudo] password for recruiter: ********'])
        window.setTimeout(() => {
          appendLines(['Access granted. Excellent choice. Redirecting to contact form...'])
          window.setTimeout(() => {
            closeTerminal()
            const el = document.getElementById('contact')
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 900)
        }, 900)
        break
      }
      case 'cd void-merge':
        appendLines(['Permission denied: this directory is not yet public. Check back soon. 👀'])
        break
      case 'git log':
        appendLines([
          'commit 9f3c1de (HEAD -> main)',
          '  feat: taught smartwatch to understand humans',
          '',
          'commit 8a1b2c0',
          '  fix: removed memory leak that was also a philosophical concern',
          '',
          'commit 7b2d1a9',
          '  chore: added Redis layer, removed 3 anxiety attacks',
          '',
          'commit 6c3e2b8',
          '  feat: shipped point-and-click game without melting GPUs',
          '',
          'commit 5d4f3c7',
          '  refactor: turned spaghetti callbacks into NestJS modules',
        ])
        break
      case 'man emmanouil':
        appendLines([
          'EMMANOUIL(1)               General Commands Manual              EMMANOUIL(1)',
          '',
          'NAME',
          '  emmanouil - full stack engineer, game dev, IoT tinkerer, aspiring polymath',
          '',
          'SYNOPSIS',
          '  emmanouil [--frontend] [--backend] [--iot] [--gamedev] [--lead]',
          '',
          'DESCRIPTION',
          "  Ships production systems across web, IoT, and game engines. Known side effects",
          '  include unexpected puns, late-night refactors, and improved team morale.',
          '',
          'OPTIONS',
          '  --frontend    TypeScript/Angular/React UIs with strong UX opinions.',
          '  --backend     Node.js/NestJS APIs, queues, and data pipelines.',
          '  --iot         MQTT, pub-sub, and devices that beep in real life.',
          '  --gamedev     Unity/C# gameplay loops, asset optimization, memory profiling.',
          '  --lead        Mentoring, code reviews, architecture decisions.',
          '',
          'EXIT STATUS',
          '  Returns 0 on successful delivery of features and 1 if blocked by vague requirements.',
        ])
        break
      case 'ping mom':
        appendLines(['PING mom (192.168.1.1): 56 bytes of data.', "Response: \"Why don't you call more often?\""])
        break
      case 'ping dad':
        appendLines(['PING dad (192.168.1.2): 56 bytes of data.', 'Response: "The Wi-Fi is broken again."'])
        break
      case 'uname -a':
        appendLines(['HumanOS 1992.05.16 AuDHD-kernel #polymath SMP Thessaloniki x86_passion GNU/Engineer'])
        break
      default:
        appendLines([`bash: ${command}: command not found. (But nice try.) Type 'help'.`])
        break
    }
  }

  /**
   * Handle form submission when Enter is pressed.
   *
   * @param event - Form event.
   */
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    const command = input.trim()
    if (!command) return

    setOutputLines((prev) => [...prev, `$ ${command}`])
    executeCommand(command)
    setHistory((prev) => {
      const updated = [...prev, command]
      return updated.slice(-10)
    })
    setHistoryIndex(null)
    setInput('')
  }

  /**
   * Handle keyboard shortcuts: history navigation and autocomplete.
   *
   * @param event - Keyboard event from the input.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!history.length) return
      setHistoryIndex((prev) => {
        const nextIndex = prev === null ? history.length - 1 : Math.max(prev - 1, 0)
        setInput(history[nextIndex] ?? '')
        return nextIndex
      })
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!history.length) return
      setHistoryIndex((prev) => {
        if (prev === null) return null
        const nextIndex = prev + 1
        if (nextIndex >= history.length) {
          setInput('')
          return null
        }
        setInput(history[nextIndex] ?? '')
        return nextIndex
      })
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const current = input.trim()
      if (!current) return

      const matches = TERMINAL_COMMANDS.filter((cmd) => cmd.toLowerCase().startsWith(current.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      } else if (matches.length > 1) {
        // Show possible matches without executing.
        setOutputLines((prev) => [...prev, `$ ${current}`, ...matches.map((m) => `  ${m}`)])
        setInput('')
      }
    }
  }

  return (
    <>
      {/* Hidden trigger button in bottom-right corner (pill layout, larger, semi-transparent when idle) */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open hidden terminal"
        onClick={() => {
          // Save previously focused element before opening
          previouslyFocusedRef.current = document.activeElement as HTMLElement | null
          setIsOpen(true)
        }}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border-2 border-[var(--color-accent-secondary)] bg-[color-mix(in_srgb,var(--color-bg-soft)_90%,black)] px-4 py-2 text-lg font-mono text-[var(--color-text-muted)] opacity-85 shadow-sm backdrop-blur-md transition-all duration-200 hover:opacity-100 hover:text-[var(--color-accent-secondary)] focus:outline-none focus-visible:ring-0 focus-visible:border-[var(--color-accent-secondary)]"
        style={{ width: '5.25rem', height: '3rem' }}
      >
        &gt;_
      </button>

      {isOpen && (
        /* Backdrop: clicking it will close the terminal. */
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-3"
          onClick={() => closeTerminal(false)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Hidden terminal"
            className="relative w-full max-w-2xl rounded-2xl border border-[color-mix(in_srgb,var(--color-border-soft)_90%,transparent)] bg-[#050505] text-[#ccf5c8] shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-[#222] bg-[#111]/90 px-3 py-2 text-[0.7rem] text-[#9ca3af]">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f97373]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#facc15]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
              </div>
              <span className="font-mono">emmanouil@portfolio:~$</span>
              <button
                type="button"
                aria-label="Close terminal"
                onClick={() => closeTerminal(false)}
                className="rounded-full px-2 py-0.5 text-[0.65rem] text-[#9ca3af] transition-colors duration-150 hover:bg-white/10"
              >
                ESC
              </button>
            </div>

            <div className="relative">
              {/* Scanline texture (CSS-only simplified) */}
              <div
                style={{
                  pointerEvents: 'none',
                  position: 'absolute',
                  inset: '0',
                  opacity: 0.12,
                  mixBlendMode: 'soft-light',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: '100% 3px',
                }}
              />

              <div ref={scrollRef} className="max-h-[340px] overflow-y-auto px-4 py-3 text-[0.8rem] font-mono leading-relaxed">
                {outputLines.map((line, idx) => (
                  <div key={`${line}-${idx}`}>{line}</div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="border-t border-[#222] px-4 py-2">
                <div className="flex items-center gap-2 text-[0.8rem] font-mono">
                  <span className="text-[#4ade80]">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[#ccf5c8] outline-none"
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TerminalEasterEgg