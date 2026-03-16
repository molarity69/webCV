/**
 * Vercel Serverless Function — Contact Form Email API
 * POST /api/contact
 *
 * Validates input, enforces rate limiting, and sends email via Resend.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// ── Rate Limiting (in-memory, per-instance) ──
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

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

// ── Input Validation ──
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '') // strip angle brackets
    .trim()
    .slice(0, 2000); // cap length
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

// ── Handler ──
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.ALLOWED_ORIGIN || '*',
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIp =
    (Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for']?.split(',')[0]) ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIp)) {
    return res
      .status(429)
      .json({ error: 'Too many requests. Please try again later.' });
  }

  // Parse & validate body
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({
        error: 'All fields are required (name, email, subject, message).',
      });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const cleanName = sanitize(String(name)).slice(0, 100);
  const cleanEmail = sanitize(String(email)).slice(0, 254);
  const cleanSubject = sanitize(String(subject)).slice(0, 200);
  const cleanMessage = sanitize(String(message));

  if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
    return res
      .status(400)
      .json({ error: 'Fields must not be empty after validation.' });
  }

  // Honeypot check (if the frontend sends a hidden "website" field, reject bots)
  if (req.body.website) {
    // Bots tend to fill hidden fields — silently accept but don't send
    return res.status(200).json({ success: true });
  }

  // Send email via Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `CV Contact Form <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: [process.env.CONTACT_EMAIL || 'georgiouemm@gmail.com'],
        subject: `[CV Contact] ${cleanSubject}`,
        html: `
          <h2>New message from your CV website</h2>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Subject:</strong> ${cleanSubject}</p>
          <hr />
          <p>${cleanMessage.replace(/\n/g, '<br />')}</p>
          <hr />
          <p style="color: #888; font-size: 12px;">
            Sent from CV contact form · IP: ${clientIp}
          </p>
        `,
        reply_to: cleanEmail,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      return res
        .status(502)
        .json({ error: 'Failed to send email. Please try again later.' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email sending failed:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
