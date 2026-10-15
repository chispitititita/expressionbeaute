import React from 'react';
import { Shade } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferredShade: Shade;
  onSelectShade: (shade: Shade) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  preferredShade,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#50172f]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#ffd8e8] animate-scaleUp flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#ffd8e8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#50172f] text-white flex items-center justify-center font-bold">
              KS
            </div>
            <div>
              <h3 className="font-display text-lg text-[#320f22] font-bold">Katia Sánchez</h3>
              <p className="text-[11px] text-[#954832] font-semibold">
                Miembro VIP L’Étoile • Club Expression
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe8f0] text-[#320f22] flex items-center justify-center hover:bg-[#ffd8e8]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Current Match */}
        <div className="p-4 rounded-2xl bg-[#fff0f4] border border-[#ffd8e8] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#847377] uppercase font-bold tracking-wider">
              Tu tono seleccionado activo
            </span>
            <p className="font-display font-bold text-sm text-[#320f22] mt-0.5">
              {preferredShade.name}
            </p>
            <p className="text-xs text-[#524347]">{preferredShade.subtoneLabel}</p>
          </div>
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-md flex-shrink-0"
            style={{ backgroundColor: preferredShade.hex }}
          />
        </div>

        {/* Privileges */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold text-[#50172f] uppercase tracking-wider">
            Beneficios Exclusivos 2026
          </span>
          <div className="flex items-center gap-2.5 text-xs text-[#524347]">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">
              local_shipping
            </span>
            <span>Envío Exprés Gratuito 24/48h permanente en todas las compras</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#524347]">
            <span className="material-symbols-outlined text-[#954832] text-[18px]">
              card_giftcard
            </span>
            <span>2 Muestras de cortesía en cada envío para verificación en piel</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#524347]">
            <span className="material-symbols-outlined text-[#50172f] text-[18px]">
              verified
            </span>
            <span>Garantía de Tono Exacto de 30 días sin coste de devolución</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#50172f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6b2d45] mt-2 cursor-pointer"
        >
          Cerrar Perfil
        </button>
      </div>
    </div>
  );
};
