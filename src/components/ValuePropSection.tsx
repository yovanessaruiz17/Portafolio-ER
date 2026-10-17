import React from 'react';
import {
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  FileCheck2,
} from 'lucide-react';
import { PERSONAL_INFO, VALUE_PROPOSITION_PATHS } from '../data/portfolioData';
import { getWhatsAppUrl } from '../utils/contactHelpers';

interface ValuePropSectionProps {
  onSelectPath?: (pathReason: string) => void;
}

export const ValuePropSection: React.FC<ValuePropSectionProps> = ({ onSelectPath }) => {
  const handleSelectReason = (reason: string) => {
    if (onSelectPath) {
      onSelectPath(reason);
    }
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-[#F0E7FC]/40 to-slate-50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0E7FC] text-[#4B197A] text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
            Propuesta de Valor
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4B197A] tracking-tight">
            ¿Qué puedo hacer por ti?
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            «{PERSONAL_INFO.valueProposition}»
          </p>
        </div>

        {/* Dual Paths Container - Responsive 1 col on mobile, 2 cols on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {/* Path 1: Necesito un servicio profesional */}
          <div className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 hover:border-[#6D32A5] shadow-2xs hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0E7FC] text-[#4B197A] text-xs font-bold mb-4">
                <Briefcase className="w-3.5 h-3.5 text-[#6D32A5]" />
                <span>{VALUE_PROPOSITION_PATHS.client.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 leading-snug">
                «{VALUE_PROPOSITION_PATHS.client.title}»
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {VALUE_PROPOSITION_PATHS.client.description}
              </p>

              <div className="space-y-2.5 mb-6 sm:mb-8">
                {VALUE_PROPOSITION_PATHS.client.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#6D32A5] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleSelectReason('Servicios profesionales')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#6D32A5] to-[#4B197A] hover:from-[#5a278c] hover:to-[#3e1464] shadow-sm transition-all min-h-[44px]"
              >
                <span>{VALUE_PROPOSITION_PATHS.client.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={getWhatsAppUrl(
                  'Hola Eber, te contacto porque necesito un servicio profesional para mi negocio.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-xl bg-[#F0E7FC] hover:bg-purple-200 text-[#4B197A] font-bold text-xs transition-colors min-h-[44px] min-w-[44px]"
                title="Escribir por WhatsApp"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Path 2: Busco una oportunidad laboral */}
          <div className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 hover:border-[#6D32A5] shadow-2xs hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6D32A5] text-xs font-bold mb-4">
                <Users className="w-3.5 h-3.5 text-[#4B197A]" />
                <span>{VALUE_PROPOSITION_PATHS.recruiter.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 leading-snug">
                «{VALUE_PROPOSITION_PATHS.recruiter.title}»
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {VALUE_PROPOSITION_PATHS.recruiter.description}
              </p>

              <div className="space-y-2.5 mb-6 sm:mb-8">
                {VALUE_PROPOSITION_PATHS.recruiter.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#4B197A] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleSelectReason('Oportunidad laboral')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#4B197A] bg-[#F0E7FC] hover:bg-[#e2d0fa] border border-purple-200 shadow-2xs transition-all min-h-[44px]"
              >
                <FileCheck2 className="w-4 h-4 text-[#6D32A5]" />
                <span>{VALUE_PROPOSITION_PATHS.recruiter.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={getWhatsAppUrl(
                  'Hola Eber, represento a una empresa y quisiera conversar contigo sobre una oportunidad laboral.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors min-h-[44px] min-w-[44px]"
                title="Escribir por WhatsApp"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
