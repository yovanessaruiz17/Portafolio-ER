import React, { useState } from 'react';
import { Mail, PhoneCall, ArrowUp, ShieldCheck, Scale, AlertTriangle, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LEGAL_DOCUMENTS } from '../data/legalDocumentsData';
import { getWhatsAppUrl, getMailtoUrl } from '../utils/contactHelpers';
import { PendingLegalItemsModal } from './PendingLegalItemsModal';

interface FooterProps {
  onOpenLegalDoc?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalDoc }) => {
  const [showPendingModal, setShowPendingModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDocClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenLegalDoc) {
      onOpenLegalDoc(slug);
    } else {
      window.location.hash = `#/legal/${slug}`;
    }
  };

  return (
    <footer className="bg-[#4B197A] text-white pt-14 pb-10 border-t-4 border-[#6D32A5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-purple-800/80">
          {/* Column 1: Monogram & Bio (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6D32A5] flex items-center justify-center text-white font-extrabold text-lg border border-purple-300/40">
                {PERSONAL_INFO.initials}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  {PERSONAL_INFO.fullName}
                </h3>
                <p className="text-xs text-purple-200">{PERSONAL_INFO.profession}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-sm">
              Soluciones prácticas, honestas y confiables en soporte informático, modelado de datos en
              Excel, Power BI y control especializado de inventarios y vencimientos en el sector salud.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {PERSONAL_INFO.specialties.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#6D32A5]/70 text-purple-100 text-[11px] font-medium border border-purple-400/30"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowPendingModal(true)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-100 underline underline-offset-2 transition-colors min-h-[44px]"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Ver checklist de datos legales pendientes</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
              Navegación
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-purple-100">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors inline-block py-1">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors inline-block py-1">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#experiencia" className="hover:text-white transition-colors inline-block py-1">
                  Experiencia
                </a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-white transition-colors inline-block py-1">
                  Modelos Técnicos
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors inline-block py-1">
                  Contacto Directo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Privacy (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-300" />
              <span>Avisos Legales (Colombia)</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-purple-100">
              {LEGAL_DOCUMENTS.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={`#/legal/${doc.slug}`}
                    onClick={(e) => handleDocClick(doc.slug, e)}
                    className="hover:text-white hover:underline transition-colors block py-1"
                  >
                    {doc.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
              Canales de Atención
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-purple-100">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-purple-300 flex-shrink-0" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline min-h-[44px] flex items-center"
                >
                  WhatsApp: {PERSONAL_INFO.whatsappRaw}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
                <a
                  href={getMailtoUrl()}
                  className="hover:text-white transition-colors underline-offset-2 hover:underline break-all"
                >
                  {PERSONAL_INFO.emailPrimary}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
                <a
                  href={getMailtoUrl(undefined, undefined, true)}
                  className="hover:text-white transition-colors underline-offset-2 hover:underline break-all"
                >
                  {PERSONAL_INFO.emailSecondary}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/60 text-purple-200 text-[11px] border border-purple-500/30">
                Persona natural · Cartagena, Bolívar (Ley 1581/2012)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Eber Ruiz Zamora. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-purple-200 text-xs">
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              <span>Transparencia y Confidencialidad</span>
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-[#6D32A5] hover:bg-purple-600 text-white transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Volver al inicio de la página"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <PendingLegalItemsModal
        isOpen={showPendingModal}
        onClose={() => setShowPendingModal(false)}
      />
    </footer>
  );
};
