import React from 'react';
import {
  MonitorCheck,
  BarChart3,
  Pill,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { getWhatsAppUrl } from '../utils/contactHelpers';

const iconMap: Record<string, React.ReactNode> = {
  MonitorCheck: <MonitorCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#6D32A5]" />,
  BarChart3: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-[#6D32A5]" />,
  Pill: <Pill className="w-6 h-6 sm:w-7 sm:h-7 text-[#6D32A5]" />,
  FileSpreadsheet: <FileSpreadsheet className="w-6 h-6 sm:w-7 sm:h-7 text-[#6D32A5]" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-16 sm:py-20 bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0E7FC] text-[#4B197A] text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
            Servicios Especializados
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4B197A] tracking-tight">
            Soluciones Prácticas a la Medida
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Asistencia profesional directa, sin intermediarios, orientada a resolver problemas
            técnicos concretos, automatizar el flujo de información y asegurar el control operativo.
          </p>
        </div>

        {/* 4 Cards Grid - 1 Col on Mobile, 2 Cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-5 sm:p-7 md:p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-purple-100 hover:border-purple-300 shadow-2xs hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {/* Card Letter Badge */}
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0E7FC] text-[#4B197A] font-extrabold text-xs sm:text-sm flex items-center justify-center border border-purple-200">
                {service.letter}
              </div>

              <div>
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white group-hover:bg-[#F0E7FC] border border-purple-100 flex items-center justify-center mb-5 shadow-2xs transition-colors">
                  {iconMap[service.icon]}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#4B197A] transition-colors mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#6D32A5] mb-3.5 leading-snug">
                  {service.tagline}
                </p>

                {/* Main Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-2 mb-6 sm:mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#6D32A5] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card CTA: Consult via WhatsApp with Comfortable Touch Target */}
              <div className="pt-4 border-t border-purple-100/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
                  Atención directa
                </span>
                <a
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#4B197A] bg-[#F0E7FC] hover:bg-[#6D32A5] hover:text-white transition-all shadow-2xs group-hover:shadow min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
