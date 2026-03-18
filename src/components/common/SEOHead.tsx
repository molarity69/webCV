/**
 * @file SEOHead.tsx
 * @description Renders SEO meta tags, Open Graph, Twitter Card, and JSON-LD structured data
 *              into the document <head> using React portals.
 */

import React, { useEffect } from 'react';

const SEO_CONFIG = {
  title: 'Emmanouil Georgiou — Full Stack Engineer | Portfolio & CV',
  description:
    'Full Stack Engineer with 5+ years of experience building high-traffic platforms, IoT systems, and games. Expertise in TypeScript, Angular, React, Node.js, NestJS, MongoDB, Docker & AWS.',
  url: 'https://emmanouil-georgiou.dev',
  image:
    'https://res.cloudinary.com/dfxlovl4r/image/upload/v1773775525/19cf728e6bf18_qbbdgw.png',
  siteName: 'Emmanouil Georgiou — Portfolio',
  locale: 'en_US',
  twitterHandle: '@molarity69',
};

/**
 * JSON-LD structured data for Google and AI parsers.
 */
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emmanouil Georgiou',
  jobTitle: 'Full Stack Engineer',
  url: SEO_CONFIG.url,
  sameAs: [
    'https://www.linkedin.com/in/GeorgiouEmmanouil',
    'https://github.com/molarity69',
    'https://store.steampowered.com/app/1088610/Aurora_The_Lost_Medallion__The_Cave/',
  ],
  email: 'georgiouemm@gmail.com',
  telephone: '+306979358727',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Thessaloniki',
    addressCountry: 'GR',
    postalCode: '55133',
  },
  knowsAbout: [
    'TypeScript',
    'Angular',
    'React',
    'Node.js',
    'NestJS',
    'MongoDB',
    'Docker',
    'AWS',
    'Unity',
    'C#',
    'IoT',
  ],
  description: SEO_CONFIG.description,
};

const WEBSITE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.url,
  description: SEO_CONFIG.description,
};

/**
 * Helper to set or create a <meta> tag in <head>.
 */
function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(
    `meta[${attr}="${key}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Helper to set or create a <link> tag in <head>.
 */
function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * SEOHead component — call once in the App tree.
 * Injects all necessary meta tags and structured data into <head>.
 */
export const SEOHead: React.FC = () => {
  useEffect(() => {
    // Title
    document.title = SEO_CONFIG.title;

    // Standard meta
    setMetaTag('name', 'description', SEO_CONFIG.description);
    setMetaTag('name', 'author', 'Emmanouil Georgiou');
    setMetaTag('name', 'robots', 'index, follow');

    // Open Graph
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', SEO_CONFIG.title);
    setMetaTag('property', 'og:description', SEO_CONFIG.description);
    setMetaTag('property', 'og:url', SEO_CONFIG.url);
    setMetaTag('property', 'og:image', SEO_CONFIG.image);
    setMetaTag('property', 'og:site_name', SEO_CONFIG.siteName);
    setMetaTag('property', 'og:locale', SEO_CONFIG.locale);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', SEO_CONFIG.title);
    setMetaTag('name', 'twitter:description', SEO_CONFIG.description);
    setMetaTag('name', 'twitter:image', SEO_CONFIG.image);

    // Canonical
    setLinkTag('canonical', SEO_CONFIG.url);

    // JSON-LD structured data
    const existingScripts = document.querySelectorAll(
      'script[data-seo-jsonld]',
    );
    existingScripts.forEach((s) => s.remove());

    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.setAttribute('data-seo-jsonld', 'person');
    personScript.textContent = JSON.stringify(STRUCTURED_DATA);
    document.head.appendChild(personScript);

    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.setAttribute('data-seo-jsonld', 'website');
    websiteScript.textContent = JSON.stringify(WEBSITE_STRUCTURED_DATA);
    document.head.appendChild(websiteScript);
  }, []);

  return null;
};

export default SEOHead;
