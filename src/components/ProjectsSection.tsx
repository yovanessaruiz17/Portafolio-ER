import React, { useState } from 'react';
import {
  Sparkles,
  Info,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { SOLUTIONS_SAMPLES } from '../data/portfolioData';
import { ProjectSolution } from '../types';
import { getWhatsAppUrl } from '../utils/contactHelpers';

export const ProjectsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<ProjectSolution>(SOLUTIONS_SAMPLES[0]);

  return (
    <section id="proyectos" className="py-16 sm:py-20 bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0E7FC] text-[#4B197A] text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
            Modelos de Solución Aplicables
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4B197A] tracking-tight">
            Soluciones y Capacidades Técnicas
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Ejemplos de arquitecturas y modelos de soluciones listas para ser adaptadas a tu empresa,
            punto de venta o droguería.
          </p>

          {/* Transparent Notice */}
          <div className="mt-4 inline-flex items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left max-w-xl mx-auto">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span className="leading-snug">
              <strong>Nota de transparencia:</strong> Estos elementos representan modelos de
              solución técnica personalizables según las fuentes de datos y necesidades de cada negocio.
            </span>
          </div>
        </div>

        {/* Interactive Solution Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Solution Selector List (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {SOLUTIONS_SAMPLES.map((solution) => {
              const isSelected = selectedSolution.id === solution.id;
              return (
                <button
                  key={solution.id}
                  onClick={() => setSelectedSolution(solution)}
                  type="button"
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all border min-h-[44px] ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#F0E7FC] to-purple-50/60 border-[#6D32A5] shadow-sm ring-2 ring-[#6D32A5]/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-purple-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <span
                      className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                        isSelected ? 'text-[#6D32A5]' : 'text-slate-500'
                      }`}
                    >
                      {solution.category}
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-[#6D32A5] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Plantilla / Modelo
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 mb-1 leading-snug">
                    {solution.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {solution.shortDescription}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Solution Preview Panel (Right Column) */}
          <div className="lg:col-span-7 bg-slate-50/80 border border-purple-200/80 rounded-3xl p-5 sm:p-7 md:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F0E7FC] text-[#4B197A] border border-purple-200">
                {selectedSolution.category}
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedSolution.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold bg-white text-slate-700 border border-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 leading-snug">
              {selectedSolution.title}
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed mb-5">
              {selectedSolution.fullDescription}
            </p>

            {/* Problem Solved Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-purple-100 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6D32A5] mb-1">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>Problema u oportunidad resuelta</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                {selectedSolution.challengeSolved}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Características implementadas en este modelo
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSolution.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-100 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#6D32A5] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics impact expectation - Mobile-Friendly 1 col on xs, 3 cols on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-purple-100 mb-6 text-center">
              {selectedSolution.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col py-1 border-b sm:border-b-0 sm:border-r last:border-none border-slate-100">
                  <span className="text-base sm:text-lg md:text-xl font-extrabold text-[#4B197A]">
                    {metric.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-600 text-center sm:text-left">
                ¿Deseas adaptar este modelo a las fuentes y estructura de tu negocio?
              </span>
              <a
                href={getWhatsAppUrl(
                  `Hola Eber, vi el modelo de solución "${selectedSolution.title}" y me gustaría saber cómo podríamos adaptarlo a mi caso.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#6D32A5] to-[#4B197A] hover:from-[#5a278c] hover:to-[#3e1464] shadow-sm transition-all min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por esta solución</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
