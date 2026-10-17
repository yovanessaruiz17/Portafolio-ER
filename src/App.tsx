/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSkillsSection } from './components/ExperienceSkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ValuePropSection } from './components/ValuePropSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LegalViewer } from './components/LegalViewer';
import { LEGAL_DOCUMENTS } from './data/legalDocumentsData';

export default function App() {
  const [selectedContactReason, setSelectedContactReason] = useState<string>('Servicios profesionales');
  const [currentLegalSlug, setCurrentLegalSlug] = useState<string | null>(null);

  // Synchronize hash route for direct URLs and page reloads (e.g. #/legal/politica-tratamiento-datos)
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/legal/')) {
        const slug = hash.replace('#/legal/', '').split('?')[0].split('#')[0];
        const docExists = LEGAL_DOCUMENTS.some((d) => d.slug === slug);
        if (docExists) {
          setCurrentLegalSlug(slug);
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          return;
        }
      }
      setCurrentLegalSlug(null);
    };

    // Run on initial mount
    parseHashRoute();

    // Listen for hash changes (browser back/forward or internal links)
    window.addEventListener('hashchange', parseHashRoute);
    window.addEventListener('popstate', parseHashRoute);

    return () => {
      window.removeEventListener('hashchange', parseHashRoute);
      window.removeEventListener('popstate', parseHashRoute);
    };
  }, []);

  const handleOpenLegalDoc = (slug: string) => {
    window.location.hash = `#/legal/${slug}`;
    setCurrentLegalSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToHome = () => {
    window.location.hash = '#inicio';
    setCurrentLegalSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPath = (reason: string) => {
    setSelectedContactReason(reason);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-[#6D32A5] selection:text-white overflow-x-hidden">
      {/* Accessibility: Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#4B197A] text-white font-bold rounded-lg shadow-lg focus:outline-none min-h-[44px] flex items-center"
      >
        Saltar al contenido principal
      </a>

      {/* Header and Navbar */}
      <Navbar
        isLegalView={!!currentLegalSlug}
        onReturnToHome={handleReturnToHome}
      />

      {/* Main Content Area: Conditional between Landing Page and Legal Viewer */}
      {currentLegalSlug ? (
        <main id="main-content" className="flex-grow pt-16">
          <LegalViewer
            currentSlug={currentLegalSlug}
            onNavigateToDocument={handleOpenLegalDoc}
            onReturnToHome={handleReturnToHome}
          />
        </main>
      ) : (
        <main id="main-content" className="flex-grow">
          {/* 1. Hero Presentation */}
          <Hero />

          {/* 2. Services Section */}
          <ServicesSection />

          {/* 3. Experience and Skills */}
          <ExperienceSkillsSection />

          {/* 4. Projects and Solutions Models */}
          <ProjectsSection />

          {/* 5. Value Proposition (Dual Track) */}
          <ValuePropSection onSelectPath={handleSelectPath} />

          {/* 6. Contact and Form */}
          <ContactSection
            initialReason={selectedContactReason}
            onOpenLegalDoc={handleOpenLegalDoc}
          />
        </main>
      )}

      {/* Footer */}
      <Footer onOpenLegalDoc={handleOpenLegalDoc} />

      {/* Quick Action Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
