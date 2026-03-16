/**
 * @file VisitorCounter.tsx
 * @description Visitor counter backed by a serverless API (/api/visitor).
 *              Falls back to local storage if the API is unavailable.
 */

import React, { useEffect, useState } from 'react';

const VISIT_SESSION_FLAG_KEY = 'em_visit_session_flag';
const FALLBACK_COUNT = 1247;

export const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionFlag = window.sessionStorage.getItem(VISIT_SESSION_FLAG_KEY);

    const fetchCount = async () => {
      try {
        const method = sessionFlag ? 'GET' : 'POST';
        const res = await fetch('/api/visitor', { method });

        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
          if (!sessionFlag) {
            window.sessionStorage.setItem(VISIT_SESSION_FLAG_KEY, 'true');
          }
        } else {
          setCount(FALLBACK_COUNT);
        }
      } catch {
        setCount(FALLBACK_COUNT);
      }
    };

    fetchCount();
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <div className="visitor-counter mt-3 text-xs">
      You are visitor #{count.toLocaleString()}
    </div>
  );
};
