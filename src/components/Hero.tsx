import React from 'react';
import {
  ShieldCheck,
  Building2,
  HeartPulse,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { getWhatsAppUrl } from '../utils/contactHelpers';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-purple-50/70 via-white to-slate-50"
    >
      {/* Responsive background shapes - no horizontal overflow */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[320px] sm:h-[450px] bg-gradient-to-tr from-[#F0E7FC]/90 to-purple-100/40 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-[#6D32A5]/5 rounded-full blur-2xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Presentation & Value */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Sector Experience Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0E7FC] text-[#4B197A] border border-purple-200/80 mb-4 sm:mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6D32A5] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                Trayectoria en Salud y Sector Comercial
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4B197A] tracking-tight leading-[1.14] mb-2 sm:mb-3">
              {PERSONAL_INFO.fullName}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#6D32A5] mb-4">
              {PERSONAL_INFO.profession}
            </p>

            {/* Specialties line - Responsive Flex-wrap */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
              {PERSONAL_INFO.specialties.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-purple-100/90 text-[#4B197A] font-semibold text-xs sm:text-sm border border-purple-200 shadow-2xs"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Main Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-normal mb-6 sm:mb-8 max-w-2xl">
              «{PERSONAL_INFO.tagline}»
            </p>

            {/* Trajectory Highlight Box */}
            <div className="w-full max-w-xl p-4 sm:p-5 rounded-2xl bg-white border border-purple-100 shadow-sm mb-6 sm:mb-8 flex items-start gap-3.5 sm:gap-4">
              <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F0E7FC] text-[#6D32A5] flex items-center justify-center font-extrabold text-lg sm:text-xl border border-purple-200">
                20+
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Más de dos décadas de experiencia real
                </span>
                <span className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-snug">
                  Gestión informática, control riguroso de inventarios en farmacias y análisis de
                  datos para la toma de decisiones comerciales.
                </span>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#6D32A5] to-[#4B197A] hover:from-[#5a278c] hover:to-[#3e1464] rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6D32A5] min-h-[44px]"
              >
                <span>Solicitar asesoría</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-bold text-[#4B197A] bg-white hover:bg-[#F0E7FC]/70 border-2 border-[#6D32A5]/30 hover:border-[#6D32A5] rounded-xl transition-all shadow-xs min-h-[44px]"
              >
                <span>Ver servicios</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Emblem & Profile Card */}
          <div className="lg:col-span-5 w-full flex justify-center mt-4 lg:mt-0">
            <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl shadow-purple-900/5 border border-purple-100 relative">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-1.5 bg-gradient-to-r from-[#4B197A] via-[#6D32A5] to-[#9047DE] rounded-full" />

              {/* Monogram Badge */}
              <div className="flex items-center gap-3.5 sm:gap-4 mb-5 pt-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#4B197A] via-[#5D2692] to-[#6D32A5] flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl tracking-wider shadow-md border-2 border-white ring-4 ring-[#F0E7FC] flex-shrink-0">
                  {PERSONAL_INFO.initials}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#4B197A] leading-tight">
                    {PERSONAL_INFO.fullName}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-[#6D32A5]">
                    {PERSONAL_INFO.profession}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Soporte · Datos · Inventarios
                  </p>
                </div>
              </div>

              {/* Experience Highlights Badges */}
              <div className="space-y-2.5 sm:space-y-3 mb-5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <HeartPulse className="w-5 h-5 text-[#6D32A5] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Sector Salud y Farmacias
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                      Vencimientos de medicamentos, trazabilidad por lotes y auditorías de inventario.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Building2 className="w-5 h-5 text-[#6D32A5] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Sector Comercial & Pymes
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                      Automatización de reportes en Excel, paneles en Power BI y soporte continuo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F0E7FC]/60 border border-purple-200/70">
                  <ShieldCheck className="w-5 h-5 text-[#4B197A] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B197A]">
                      Ética y Confidencialidad
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5 leading-snug">
                      Manejo responsable y seguro de datos comerciales y registros de inventario.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Quick Connection */}
              <div className="pt-3.5 border-t border-purple-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-700">Disponible para asesorías</span>
                </div>
                <a
                  href={getWhatsAppUrl('Hola Eber, quisiera una asesoría rápida sobre tus servicios.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#6D32A5] hover:text-[#4B197A] hover:underline min-h-[44px] flex items-center"
                >
                  Escribir al WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
