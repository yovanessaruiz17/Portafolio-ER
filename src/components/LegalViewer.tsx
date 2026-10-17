import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Mail,
  PhoneCall,
  ChevronRight,
  BookOpen,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { LEGAL_DOCUMENTS, LegalDocument } from '../data/legalDocumentsData';
import { PERSONAL_INFO } from '../data/portfolioData';
import { getMailtoUrl, getWhatsAppUrl } from '../utils/contactHelpers';
import { PendingLegalItemsModal } from './PendingLegalItemsModal';

interface LegalViewerProps {
  currentSlug: string;
  onNavigateToDocument: (slug: string) => void;
  onReturnToHome: () => void;
}

export const LegalViewer: React.FC<LegalViewerProps> = ({
  currentSlug,
  onNavigateToDocument,
  onReturnToHome,
}) => {
  const [showPendingModal, setShowPendingModal] = useState(false);

  const documentIndex = LEGAL_DOCUMENTS.findIndex((doc) => doc.slug === currentSlug);
  const activeDocument: LegalDocument =
    documentIndex !== -1 ? LEGAL_DOCUMENTS[documentIndex] : LEGAL_DOCUMENTS[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Banner Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReturnToHome}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#4B197A] hover:bg-[#F0E7FC] transition-colors focus-visible:ring-2 focus-visible:ring-[#6D32A5] min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 text-[#6D32A5]" />
            <span>Volver al portafolio principal</span>
          </button>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setShowPendingModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors min-h-[44px]"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Ver datos pendientes antes de publicar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Document Selector (Col 1-4) */}
          <aside className="lg:col-span-4 order-2 lg:order-1 space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#F0E7FC] text-[#6D32A5] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#4B197A]">Centro Legal y Privacidad</h3>
                  <p className="text-xs text-slate-500">Marco normativo colombiano</p>
                </div>
              </div>

              {/* Grouped Document List */}
              <nav className="space-y-1.5" aria-label="Documentos legales">
                {LEGAL_DOCUMENTS.map((doc) => {
                  const isActive = doc.slug === activeDocument.slug;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => {
                        onNavigateToDocument(doc.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-2 min-h-[44px] ${
                        isActive
                          ? 'bg-[#F0E7FC] text-[#4B197A] border border-purple-200 shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{doc.shortTitle}</span>
                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? 'text-[#6D32A5]' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Contact Box inside Sidebar */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                <p className="font-bold text-slate-900">¿Dudas sobre tus datos personales?</p>
                <p className="text-[11px] leading-relaxed">
                  Comunícate directamente con Eber Ruiz Zamora para consultas formales de Habeas Data:
                </p>
                <div className="pt-1 space-y-1 text-[#6D32A5] font-semibold">
                  <p className="break-all">Email: {PERSONAL_INFO.emailPrimary}</p>
                  <p>WhatsApp: {PERSONAL_INFO.whatsappRaw}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content: Document Reader (Col 5-12) */}
          <main className="lg:col-span-8 order-1 lg:order-2 bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-sm">
            {/* Header of Active Document */}
            <div className="pb-6 mb-8 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F0E7FC] text-[#4B197A] border border-purple-200">
                  {activeDocument.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeDocument.lastUpdated}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4B197A] tracking-tight leading-snug">
                {activeDocument.title}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeDocument.summary}
              </p>

              {/* Pending Items Notice Banner if applicable */}
              {activeDocument.pendingItems && activeDocument.pendingItems.length > 0 && (
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Datos pendientes de registrar antes del despliegue:</span>
                    <ul className="mt-1 list-disc list-inside space-y-0.5">
                      {activeDocument.pendingItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Document Content Sections */}
            <div className="space-y-8 text-slate-800 text-sm sm:text-base leading-relaxed">
              {activeDocument.content.map((sec, sIdx) => (
                <section key={sIdx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {sec.sectionTitle}
                  </h2>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {p}
                    </p>
                  ))}

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 pl-2 pt-1">
                      {sec.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-[#6D32A5] flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Document Bottom Signoff and Channels */}
            <div className="mt-12 pt-8 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <p className="font-bold text-slate-800">Eber Ruiz Zamora — Ingeniero de Sistemas</p>
                <p>Persona natural independiente en Cartagena, Bolívar, Colombia</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={getMailtoUrl(
                    `Consulta sobre ${activeDocument.shortTitle}`,
                    `Hola Eber,\n\nTe contacto con relación al documento "${activeDocument.title}" para solicitar la siguiente información:\n\n`
                  )}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#4B197A] bg-[#F0E7FC] hover:bg-[#e2cefa] transition-colors min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-[#6D32A5]" />
                  <span>Consultar por correo</span>
                </a>
                <a
                  href={getWhatsAppUrl(
                    `Hola Eber, tengo una consulta sobre el documento de ${activeDocument.shortTitle}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors min-h-[44px]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      <PendingLegalItemsModal
        isOpen={showPendingModal}
        onClose={() => setShowPendingModal(false)}
      />
    </div>
  );
};
