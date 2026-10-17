import React from 'react';
import {
  HeartPulse,
  Building,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SKILLS_LIST, EXPERIENCE_SECTORS } from '../data/portfolioData';

export const ExperienceSkillsSection: React.FC = () => {
  return (
    <section id="experiencia" className="py-16 sm:py-20 bg-slate-50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0E7FC] text-[#4B197A] text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
            Trayectoria y Competencias
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4B197A] tracking-tight">
            20+ Años de Experiencia en Salud y Comercio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Una trayectoria construida sobre la disciplina, la honestidad profesional y la resolución
            efectiva de problemas informáticos y operativos reales.
          </p>
        </div>

        {/* Sectors of Depth: Health and Commercial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {EXPERIENCE_SECTORS.map((sector, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-purple-100/80 shadow-2xs relative overflow-hidden"
            >
              <div className="flex items-center gap-3 sm:gap-3.5 mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F0E7FC] text-[#6D32A5] flex items-center justify-center border border-purple-200 flex-shrink-0">
                  {index === 0 ? (
                    <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Building className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {sector.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#6D32A5]">{sector.focus}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {sector.description}
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                {sector.bulletPoints.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-[#6D32A5] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills Matrix */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#4B197A]">
              Habilidades Técnicas y Herramientas
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dominio práctico fundamentado en casos de uso continuo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SKILLS_LIST.map((skill, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-purple-100/70 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] sm:text-xs font-bold text-[#6D32A5] uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#F0E7FC] text-[#4B197A] border border-purple-200">
                    {skill.levelBadge}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{skill.name}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {skill.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Philosophy / Non-inflated statement */}
        <div className="bg-gradient-to-r from-[#4B197A] to-[#6D32A5] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-lg shadow-purple-950/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-purple-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold mb-1">Puntualidad y Compromiso</h4>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  Cumplimiento responsable en tiempos de entrega y diagnósticos certeros sin rodeos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-purple-200">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold mb-1">Confidencialidad Rigurosa</h4>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  Protección absoluta de bases de datos de clientes, inventarios y finanzas comerciales.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-purple-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold mb-1">Enfoque Práctico</h4>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  Herramientas intuitivas que tu equipo puede utilizar fácilmente día a día.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
