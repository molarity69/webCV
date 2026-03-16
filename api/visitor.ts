/**
 * Vercel Serverless Function — Visitor Counter API
 * GET  /api/visitor  → returns current count
 * POST /api/visitor  → increments count and returns new value
 *
 * Uses Firebase Realtime Database for persistence.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// ── Rate Limiting ──
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  return (
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

// ── Firebase REST helpers ──
function getFirebaseUrl(path: string): string {
  const dbUrl = process.env.FIREBASE_DB_URL;
  if (!dbUrl) throw new Error('FIREBASE_DB_URL not configured');
  return `${dbUrl}/${path}.json`;
}

async function getCount(): Promise<number> {
  const response = await fetch(getFirebaseUrl('visitorCount'));
  if (!response.ok) throw new Error('Failed to read from Firebase');
  const data = await response.json();
  return typeof data === 'number' ? data : 0;
}

async function incrementCount(): Promise<number> {
  const current = await getCount();
  const next = current + 1;
  const response = await fetch(getFirebaseUrl('visitorCount'), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(next),
  });
  if (!response.ok) throw new Error('Failed to write to Firebase');
  return next;
}

// ── Handler ──
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.ALLOWED_ORIGIN || '*',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests.' });
  }

  if (!process.env.FIREBASE_DB_URL) {
    return res.status(500).json({ error: 'Database not configured.' });
  }

  try {
    if (req.method === 'GET') {
      const count = await getCount();
      return res.status(200).json({ count });
    }

    if (req.method === 'POST') {
      const count = await incrementCount();
      return res.status(200).json({ count });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Visitor counter error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
