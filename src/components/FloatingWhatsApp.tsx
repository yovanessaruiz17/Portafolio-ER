import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/contactHelpers';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
      {/* Floating Prompt / Tooltip - Hidden on small mobile to avoid blocking inputs */}
      {showTooltip && (
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white text-slate-800 text-xs font-semibold shadow-lg border border-purple-100 animate-in fade-in slide-in-from-right-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>¿Tienes una consulta? Hablemos</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full min-h-[30px] min-w-[30px] flex items-center justify-center"
            aria-label="Cerrar sugerencia de chat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <a
        href={getWhatsAppUrl(
          'Hola Eber, te contacto desde tu página web para solicitar información sobre tus servicios.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 min-h-[44px] min-w-[44px]"
        aria-label="Abrir chat de WhatsApp con Eber Ruiz Zamora"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
};
