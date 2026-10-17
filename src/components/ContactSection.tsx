import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  PhoneCall,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Info,
  CheckSquare,
  Square,
  ArrowRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData, FormErrors } from '../types';
import {
  getWhatsAppUrl,
  getMailtoUrl,
  formatFormMessage,
  formatEmailBody,
} from '../utils/contactHelpers';

interface ContactSectionProps {
  initialReason?: string;
  onOpenLegalDoc?: (slug: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialReason,
  onOpenLegalDoc,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    reason: initialReason || 'Servicios profesionales',
    message: '',
    acceptPrivacyPolicy: false,
    acceptCommercialCommunications: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [copied, setCopied] = useState(false);
  const [instructionState, setInstructionState] = useState<{
    type: 'whatsapp' | 'email' | 'copy' | 'validation' | null;
    message: string;
    details?: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    if (initialReason) {
      setFormData((prev) => ({ ...prev, reason: initialReason }));
    }
  }, [initialReason]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre completo o de tu empresa.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa un correo electrónico de contacto.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Ingresa una dirección de correo válida (ejemplo: usuario@correo.com).';
      }
    }

    if (!formData.reason) {
      newErrors.reason = 'Selecciona el motivo de tu consulta.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Por favor escribe los detalles de tu requerimiento.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres para entender tu caso.';
    }

    if (!formData.acceptPrivacyPolicy) {
      newErrors.acceptPrivacyPolicy =
        'Debes autorizar el tratamiento de datos personales para que tu consulta pueda ser atendida.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Action 1: Continuar por WhatsApp (Honest: Opens WhatsApp and prompts user to review & send)
  const handleContinueViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setInstructionState({
        type: 'validation',
        message: 'Por favor corrige los campos señalados y acepta la casilla obligatoria.',
      });
      return;
    }

    const message = formatFormMessage(formData);
    const url = getWhatsAppUrl(message);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
      setInstructionState({
        type: 'whatsapp',
        message: 'Mensaje preparado en WhatsApp con el número +57 302 310 5047.',
        details:
          'Se ha abierto WhatsApp en una nueva pestaña. Recuerda que debes pulsar "Enviar" dentro de WhatsApp para completar tu mensaje.',
      });
    } catch {
      setInstructionState({
        type: 'whatsapp',
        message: 'No fue posible abrir WhatsApp automáticamente.',
        details:
          'Puedes copiar el mensaje redactado mediante el botón inferior y enviarlo manualmente a +57 302 310 5047.',
      });
    }
  };

  // Action 2: Preparar mensaje por correo (Honest: Opens mail client with encoded subject/body)
  const handlePrepareViaEmail = () => {
    if (!validate()) {
      setInstructionState({
        type: 'validation',
        message: 'Por favor completa los campos y autoriza el tratamiento antes de continuar.',
      });
      return;
    }

    const subject = `[Consulta Web] ${formData.reason} - ${formData.name.trim()}`;
    const body = formatEmailBody(formData);
    const mailtoUrl = getMailtoUrl(subject, body, false);

    try {
      window.location.href = mailtoUrl;
      setInstructionState({
        type: 'email',
        message: 'Se ha abierto tu aplicación de correo predeterminada.',
        details:
          'El destinatario (ruzae1@gmail.com), el asunto y el mensaje se han precargado. Por favor, revisa el contenido en tu programa de correo y pulsa "Enviar" para completar el envío.',
      });
    } catch {
      setInstructionState({
        type: 'email',
        message: 'No se pudo iniciar el gestor de correo predeterminado.',
        details:
          'Puedes copiar el mensaje con el botón de abajo y enviarlo directamente a ruzae1@gmail.com.',
      });
    }
  };

  // Action 3: Copiar mensaje al portapapeles (Fallback)
  const handleCopyMessage = () => {
    if (!validate()) {
      setInstructionState({
        type: 'validation',
        message: 'Por favor completa los campos requeridos antes de copiar el mensaje.',
      });
      return;
    }

    const message = formatFormMessage(formData);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).then(() => {
        setCopied(true);
        setInstructionState({
          type: 'copy',
          message: 'Texto del mensaje copiado al portapapeles.',
          details:
            'Ahora puedes pegarlo directamente en tu cliente de correo (a ruzae1@gmail.com) o en tu aplicación de mensajería.',
        });
        setTimeout(() => setCopied(false), 4000);
      });
    } else {
      setInstructionState({
        type: 'copy',
        message: 'Tu navegador no permite copiar automáticamente.',
        details: 'Por favor selecciona el texto del campo de mensaje y cópialo manualmente.',
      });
    }
  };

  const handleOpenLegal = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenLegalDoc) {
      onOpenLegalDoc(slug);
    } else {
      window.location.hash = `#/legal/${slug}`;
    }
  };

  return (
    <section id="contacto" className="py-16 sm:py-20 bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0E7FC] text-[#4B197A] text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
            Comunicación Directa y Honesta
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4B197A] tracking-tight">
            Contáctame
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Sin intermediarios ni registros engañosos en servidores. Diligencia los datos para
            preparar tu mensaje y envíalo desde tu propio canal preferido.
          </p>
        </div>

        {/* Contact Information Cards (WhatsApp + 2 Emails) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-14">
          {/* Card WhatsApp */}
          <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-purple-100 hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F0E7FC] text-[#6D32A5] flex items-center justify-center mb-3.5 border border-purple-200">
                <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D32A5]">
                Canal Ágil
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 mb-1">
                WhatsApp Directo
              </h3>
              <p className="text-sm text-slate-700 font-semibold">{PERSONAL_INFO.whatsappRaw}</p>
              <p className="text-xs text-slate-500 mt-1.5">
                Ideal para consultas rápidas, cotizaciones urgentes y coordinación de soporte.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/80">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4B197A] hover:text-[#6D32A5] transition-colors min-h-[44px]"
              >
                <span>Abrir chat en WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card Correo Principal */}
          <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-purple-100 hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F0E7FC] text-[#6D32A5] flex items-center justify-center mb-3.5 border border-purple-200">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D32A5]">
                Correo Oficial
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 mb-1">
                Correo Principal
              </h3>
              <p className="text-sm text-slate-700 font-semibold break-all">
                {PERSONAL_INFO.emailPrimary}
              </p>
              <p className="text-xs text-slate-500 mt-1.5">
                Para propuestas técnicas formales, requerimientos detallados y oportunidades laborales.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/80">
              <a
                href={getMailtoUrl()}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4B197A] hover:text-[#6D32A5] transition-colors min-h-[44px]"
              >
                <span>Redactar a Gmail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card Correo Alternativo */}
          <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-purple-100 hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F0E7FC] text-[#6D32A5] flex items-center justify-center mb-3.5 border border-purple-200">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D32A5]">
                Canal de Respaldo
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 mb-1">
                Correo Alternativo
              </h3>
              <p className="text-sm text-slate-700 font-semibold break-all">
                {PERSONAL_INFO.emailSecondary}
              </p>
              <p className="text-xs text-slate-500 mt-1.5">
                Vía secundaria directa para asegurar comunicación ante contingencias.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/80">
              <a
                href={getMailtoUrl(undefined, undefined, true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4B197A] hover:text-[#6D32A5] transition-colors min-h-[44px]"
              >
                <span>Redactar a Yahoo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Functional Form Without Fake Backend */}
        <div className="max-w-3xl mx-auto bg-slate-50/90 border border-purple-100 rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#4B197A] mb-2">
              Estructura tu mensaje de consulta
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Completa los campos a continuación. Este asistente ordenará tu mensaje para que lo
              envíes directamente desde tu gestor de correo o desde WhatsApp.
            </p>
          </div>

          {/* Honest Instruction Notice Banner */}
          {instructionState.message && (
            <div
              className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm leading-relaxed flex items-start gap-3 border ${
                instructionState.type === 'validation'
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-purple-50 text-[#4B197A] border-purple-200'
              }`}
            >
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#6D32A5]" />
              <div>
                <p className="font-bold">{instructionState.message}</p>
                {instructionState.details && (
                  <p className="mt-1 text-slate-600 text-xs sm:text-sm">
                    {instructionState.details}
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleContinueViaWhatsApp} className="space-y-5" noValidate>
            {/* Field: Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
              >
                Nombre completo o Razón social de la empresa <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="Ej. Juan Pérez o Farmacia La Esperanza"
                className={`w-full px-4 py-3 rounded-xl bg-white border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors min-h-[44px] ${
                  errors.name
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:border-[#6D32A5] focus:ring-[#6D32A5]/20'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Field: Correo */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
              >
                Correo electrónico de respuesta <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="Ej. contacto@empresa.com"
                className={`w-full px-4 py-3 rounded-xl bg-white border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors min-h-[44px] ${
                  errors.email
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:border-[#6D32A5] focus:ring-[#6D32A5]/20'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Field: Motivo */}
            <div>
              <label
                htmlFor="reason"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
              >
                Motivo de tu consulta <span className="text-rose-500">*</span>
              </label>
              <select
                id="reason"
                value={formData.reason}
                onChange={(e) => {
                  setFormData({ ...formData, reason: e.target.value });
                  if (errors.reason) setErrors({ ...errors, reason: undefined });
                }}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-[#6D32A5] focus:ring-2 focus:ring-[#6D32A5]/20 min-h-[44px]"
              >
                <option value="Servicios profesionales">Servicios profesionales generales</option>
                <option value="Oportunidad laboral">Oportunidad laboral / Selección de personal</option>
                <option value="Mantenimiento de computadores">
                  Mantenimiento y soporte de computadores
                </option>
                <option value="Excel avanzado, Power Query y Power BI">
                  Automatización en Excel, Power Query o Power BI
                </option>
                <option value="Inventarios de droguerías y farmacias">
                  Control de inventarios y vencimientos en droguerías/farmacias
                </option>
                <option value="Estudios empresariales">Estudios empresariales y análisis estadístico</option>
                <option value="Otro">Otro requerimiento técnico</option>
              </select>
            </div>

            {/* Field: Mensaje */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
              >
                Detalle de tu mensaje <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                placeholder="Describe tus necesidades, cantidad de equipos, volumen de referencias o detalles de la vacante..."
                className={`w-full px-4 py-3 rounded-xl bg-white border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.message
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:border-[#6D32A5] focus:ring-[#6D32A5]/20'
                }`}
              />
              {errors.message && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.message}</p>
              )}
            </div>

            {/* Mandatory Checkbox: Personal Data Treatment Authorization */}
            <div className="pt-2">
              <div className="flex items-start gap-3">
                <input
                  id="acceptPrivacyPolicy"
                  type="checkbox"
                  checked={formData.acceptPrivacyPolicy}
                  onChange={(e) => {
                    setFormData({ ...formData, acceptPrivacyPolicy: e.target.checked });
                    if (errors.acceptPrivacyPolicy) {
                      setErrors({ ...errors, acceptPrivacyPolicy: undefined });
                    }
                  }}
                  className="mt-1 h-5 w-5 rounded-md border-slate-300 text-[#6D32A5] focus:ring-[#6D32A5] transition-colors cursor-pointer"
                />
                <label htmlFor="acceptPrivacyPolicy" className="text-xs sm:text-sm text-slate-700 leading-snug cursor-pointer">
                  <span className="font-bold text-slate-900">
                    Autorización de Tratamiento de Datos (Obligatoria):
                  </span>{' '}
                  Autorizo a Eber Ruiz Zamora (persona natural en Cartagena, Bolívar) el tratamiento
                  de mis datos de contacto exclusivamente para atender mi consulta, conforme a la{' '}
                  <a
                    href="#/legal/politica-tratamiento-datos"
                    onClick={(e) => handleOpenLegal('politica-tratamiento-datos', e)}
                    className="text-[#6D32A5] hover:text-[#4B197A] font-bold underline underline-offset-2"
                  >
                    Política de Tratamiento de Datos Personales
                  </a>{' '}
                  y el{' '}
                  <a
                    href="#/legal/aviso-privacidad"
                    onClick={(e) => handleOpenLegal('aviso-privacidad', e)}
                    className="text-[#6D32A5] hover:text-[#4B197A] font-bold underline underline-offset-2"
                  >
                    Aviso de Privacidad
                  </a>{' '}
                  (Ley 1581 de 2012 de Colombia). <span className="text-rose-500 font-bold">*</span>
                </label>
              </div>
              {errors.acceptPrivacyPolicy && (
                <p className="text-xs text-rose-600 mt-1 pl-8 font-medium">
                  {errors.acceptPrivacyPolicy}
                </p>
              )}
            </div>

            {/* Optional Checkbox: Commercial Communications */}
            <div className="pt-1">
              <div className="flex items-start gap-3">
                <input
                  id="acceptCommercialCommunications"
                  type="checkbox"
                  checked={formData.acceptCommercialCommunications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptCommercialCommunications: e.target.checked,
                    })
                  }
                  className="mt-1 h-5 w-5 rounded-md border-slate-300 text-[#6D32A5] focus:ring-[#6D32A5] transition-colors cursor-pointer"
                />
                <label htmlFor="acceptCommercialCommunications" className="text-xs sm:text-sm text-slate-600 leading-snug cursor-pointer">
                  <span className="font-semibold text-slate-800">
                    Comunicaciones profesionales futuras (Opcional):
                  </span>{' '}
                  Acepto recibir de forma voluntaria novedades sobre servicios, plantillas o
                  actualizaciones tecnológicas. Esta opción es independiente y no condiciona la respuesta a tu consulta.
                </label>
              </div>
            </div>

            {/* Transparent Persistence Disclaimer */}
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100/80 text-[11px] sm:text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#6D32A5] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Aviso de transparencia:</strong> Marcar estas casillas en tu navegador no
                guarda datos en ningún servidor central oculto. La autorización se hace efectiva al
                enviar voluntariamente el mensaje desde tu propia cuenta de correo o número de WhatsApp.
              </span>
            </div>

            {/* Explanation of mechanics */}
            <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-800 mb-1">¿Cómo funciona el envío?</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <strong>Preparar por Correo:</strong> Tu navegador abrirá tu programa de correo (Gmail, Outlook, Apple Mail) con destinatario <span className="text-[#6D32A5] font-semibold">ruzae1@gmail.com</span>, asunto y mensaje prellenados. Deberás revisar y presionar <strong>Enviar</strong> en tu gestor.
                </li>
                <li>
                  <strong>Continuar por WhatsApp:</strong> Abrirá WhatsApp con el chat de <span className="text-[#6D32A5] font-semibold">+57 302 310 5047</span> y el mensaje listo. Deberás presionar <strong>Enviar</strong> dentro de WhatsApp.
                </li>
              </ul>
            </div>

            {/* Action Buttons: Real, Honest, and Fully Accessible */}
            <div className="pt-2 border-t border-slate-200/80 space-y-3">
              <p className="text-xs font-semibold text-slate-600">
                Selecciona la vía para enviar el mensaje redactado:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Button 1: Continuar por WhatsApp */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#6D32A5] to-[#4B197A] hover:from-[#5a278c] hover:to-[#3e1464] shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#6D32A5] min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Continuar por WhatsApp</span>
                </button>

                {/* Button 2: Preparar por Correo */}
                <button
                  type="button"
                  onClick={handlePrepareViaEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#4B197A] bg-[#F0E7FC] hover:bg-[#e2cefa] border border-purple-200 transition-colors focus-visible:ring-2 focus-visible:ring-[#6D32A5] min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-[#6D32A5]" />
                  <span>Preparar por Correo</span>
                </button>

                {/* Button 3: Copiar texto al portapapeles */}
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 min-h-[44px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">¡Texto copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Copiar mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
