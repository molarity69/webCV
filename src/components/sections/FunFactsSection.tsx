/**
 * @file FunFactsSection.tsx
 * @description Grid of fun fact flip cards with 3D hover animation.
 */

import React from 'react';

/**
 * Single fun fact definition.
 */
interface FunFact {
  /** Front-side teaser with emoji. */
  front: string;
  /** Back-side detailed fact. */
  back: string;
}

/**
 * All fun facts to be displayed as flip cards.
 */
const FUN_FACTS: FunFact[] = [
  {
    front: '🏥 "Built a life-saving product"',
    back: 'Developed the entire backend and mobile app for a Smart AED Defibrillator network — alone. It became a municipality product. Somewhere out there, a defibrillator is pinging its GPS because of his code.',
  },
  {
    front: '🎮 "Almost shipped a game on Steam"',
    back: 'Worked on Aurora: The Lost Medallion at Noema Games — a real point-and-click adventure you can find and play its demo on Steam. He hunted down memory leaks from runaway coroutines. The game runs smooth. The coroutines do not.',
  },
  {
    front: '🤖 "Taught a watch to understand gestures"',
    back: 'His Master’s thesis involved implementing $3, FFT, and SAX gesture recognition algorithms with SVM on a smartwatch. He essentially taught a piece of jewelry to understand sign language.',
  },
  {
    front: '🌍 "Built a platform for European islands"',
    back: 'Main developer of the NESOI EU-funded platform — connecting island communities with energy investors across Europe. Matchmaking, e-learning, social network. Done under grant deadlines. Without a PM.',
  },
  {
    front: '🎵 "Plays basically every instrument"',
    back: 'Piano, guitar, bouzouki — and, per his own claim, any instrument given enough time. He considers this a skill issue (for the instrument).',
  },
  {
    front: '🧠 "Self-diagnosed AuDHD"',
    back: 'Self-diagnosed with AuDHD — which he argues explains both his hyperfocus on system architecture at 2am and his inability to hear his name called from the next room. Feature, not bug.',
  },
  {
    front: '💬 "The personality hire on steroids"',
    back: 'Colleagues coined this term — meant as a compliment, because he also does a lot of actual work. He makes the standup bearable AND closes the sprint tickets.',
  },
  {
    front: '😅 "Great listener. Mostly."',
    back: 'Excellent listener and problem solver — unless his girlfriend needs to "just vent", in which case he has already opened a mental Jira ticket and prepared three solutions and a post-mortem.',
  },
  {
    front: '🗺️ "Speaks 2.5 languages"',
    back: 'Native Greek, fluent English, German B2, learning Spanish & Russian, Italian queued next. His language learning system is essentially a very slow recursive loop.',
  },
];

/**
 * FunFactsSection renders fun facts as interactive flip cards.
 */
export const FunFactsSection: React.FC = () => {
  return (
    <section
      id="fun-facts"
      aria-label="Fun facts"
      className="card-surface mt-6 px-4 py-6 sm:px-6 sm:py-8"
    >
      <header className="mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Fun Facts
        </h2>
        <p className="mt-1.5 max-w-xl text-xs text-[var(--color-text-muted)]">
          Hover or tap on a card to flip it and reveal the full story.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FUN_FACTS.map((fact) => (
          <button
            key={fact.front}
            type="button"
            aria-label={fact.front}
            className="flip-card group"
          >
            <div className="flip-card-inner">
              <div className="flip-card-face flip-card-front">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {fact.front}
                </p>
              </div>
              <div className="flip-card-face flip-card-back">
                <p className="text-xs leading-relaxed text-[var(--color-text-primary)]">
                  {fact.back}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FunFactsSection;
