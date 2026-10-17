import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

export function getWhatsAppUrl(customMessage?: string): string {
  const baseMessage =
    customMessage ||
    `Hola ${PERSONAL_INFO.shortName}, me comunico a través de tu sitio web profesional para consultar sobre tus servicios.`;
  return `https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent(baseMessage)}`;
}

export function getMailtoUrl(subject?: string, body?: string, secondaryEmail = false): string {
  const recipient = secondaryEmail ? PERSONAL_INFO.emailSecondary : PERSONAL_INFO.emailPrimary;
  const sub = subject || `Consulta profesional - ${PERSONAL_INFO.fullName}`;
  const bod = body || `Hola ${PERSONAL_INFO.shortName},\n\nMe pongo en contacto contigo para...`;
  return `mailto:${recipient}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(bod)}`;
}

export function formatFormMessage(data: ContactFormData): string {
  const privacyNote = data.acceptPrivacyPolicy
    ? '[✓ Autorización de Tratamiento de Datos (Ley 1581 de 2012): Otorgada para atender esta consulta]'
    : '[Autorización de Tratamiento: Pendiente]';

  const commercialNote = data.acceptCommercialCommunications
    ? '[✓ Comunicaciones Comerciales Futuras: Autorizadas voluntariamente]'
    : '[Comunicaciones Comerciales Futuras: No autorizadas]';

  return [
    `*Contacto desde Sitio Web Profesional*`,
    `----------------------------------------`,
    `*Nombre:* ${data.name.trim()}`,
    `*Correo:* ${data.email.trim()}`,
    `*Motivo:* ${data.reason}`,
    `----------------------------------------`,
    `*Mensaje:*`,
    data.message.trim(),
    `----------------------------------------`,
    `*Consentimiento Legal (Colombia):*`,
    privacyNote,
    commercialNote,
  ].join('\n');
}

export function formatEmailBody(data: ContactFormData): string {
  const privacyNote = data.acceptPrivacyPolicy
    ? 'Autorización de Tratamiento de Datos (Ley 1581 de 2012): Declaro que he leído y acepto la Política de Tratamiento y el Aviso de Privacidad para que mis datos sean tratados exclusivamente con el fin de atender esta consulta.'
    : 'Autorización: No indicada';

  const commercialNote = data.acceptCommercialCommunications
    ? 'Comunicaciones comerciales futuras: Autorizo recibir información y novedades profesionales.'
    : 'Comunicaciones comerciales futuras: No autorizadas.';

  return [
    `Hola Eber Ruiz Zamora,\n`,
    `He redactado la siguiente consulta a través de tu sitio web profesional:\n`,
    `Motivo: ${data.reason}`,
    `Nombre del remitente: ${data.name.trim()}`,
    `Correo de contacto: ${data.email.trim()}\n`,
    `Detalle del mensaje:`,
    `${data.message.trim()}\n`,
    `----------------------------------------`,
    `Declaración de Tratamiento de Datos (Colombia):`,
    `• ${privacyNote}`,
    `• ${commercialNote}\n`,
    `Atentamente,`,
    `${data.name.trim()}`,
  ].join('\n');
}
