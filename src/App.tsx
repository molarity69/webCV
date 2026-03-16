/**
 * @file App.tsx
 * @description Root application component configuring routing for the CV site.
 */

import React from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import HomePage from './pages/Home';
import { SEOHead } from './components/common/SEOHead';
import './styles/theme.css';

/**
 * App component providing the router and top-level route.
 */
export default function App(): React.JSX.Element {
  return (
    <HashRouter>
      <SEOHead />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}
