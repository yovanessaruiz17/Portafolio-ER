import React from 'react';
import { X, AlertTriangle, CheckCircle2, ShieldAlert, FileText, ExternalLink } from 'lucide-react';
import { LEGAL_PENDING_ITEMS } from '../data/legalDocumentsData';

interface PendingLegalItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PendingLegalItemsModal: React.FC<PendingLegalItemsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pending-legal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 id="pending-legal-title" className="text-xl font-bold text-slate-900">
                Lista de Datos Legales Pendientes
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Obligatorio antes de publicar el portafolio en producción (Ley 1581 de 2012)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-6 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
            <p className="font-semibold mb-1">Nota de rigor ético y normativo:</p>
            <p>
              Por honestidad técnica y cumplimiento estricto de la legislación colombiana, este portafolio no inventa cédulas, domicilios ficticios ni razones sociales de empresas inexistentes. Los campos indicados a continuación deben ser completados con los datos reales de <strong>Eber Ruiz Zamora</strong> antes de desplegar en el dominio web definitivo.
            </p>
          </div>

          <div className="space-y-3">
            {LEGAL_PENDING_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <h4 className="text-sm font-bold text-slate-900">{item.field}</h4>
                  </div>
                  <p className="text-xs text-slate-600">{item.description}</p>
                  <code className="inline-block px-2.5 py-1 rounded-md bg-purple-50 text-[#4B197A] text-xs font-mono font-semibold border border-purple-100">
                    {item.placeholder}
                  </code>
                </div>
                <span className="self-start text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {item.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Ubicación en el código: <code className="text-[#6D32A5]">src/data/legalDocumentsData.ts</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#6D32A5] hover:bg-[#5a278c] transition-colors"
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
