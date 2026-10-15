import React, { useState } from 'react';
import { Shade } from '../types';

interface SubtoneQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  shades: Shade[];
  onApplyShade: (shade: Shade) => void;
}

export const SubtoneQuizModal: React.FC<SubtoneQuizModalProps> = ({
  isOpen,
  onClose,
  shades,
  onApplyShade,
}) => {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [calculatedShade, setCalculatedShade] = useState<Shade | null>(null);

  if (!isOpen) return null;

  const calculateResult = (ans1: string, ans2: string, ans3: string) => {
    // Scoring logic:
    // Frio score vs Calido score vs Profundo
    let frio = 0;
    let calido = 0;
    let profundo = 0;

    if (ans1 === 'frio') frio += 2;
    if (ans1 === 'calido') calido += 2;
    if (ans1 === 'profundo') profundo += 2;

    if (ans2 === 'frio') frio += 1;
    if (ans2 === 'calido') calido += 1;
    if (ans2 === 'profundo') profundo += 1;

    if (ans3 === 'frio') frio += 1;
    if (ans3 === 'calido') calido += 1;
    if (ans3 === 'profundo') profundo += 1;

    let targetShadeId = 'nude-terracota';
    if (profundo >= frio && profundo >= calido) {
      targetShadeId = ans2 === 'profundo' ? 'deep-plum' : 'berry-crimson';
    } else if (frio > calido) {
      targetShadeId = ans2 === 'frio' ? 'ballet-rose' : 'mauve-silvestre';
    } else {
      targetShadeId = ans3 === 'calido' ? 'nude-terracota' : 'bronce-solar';
    }

    const matched = shades.find((s) => s.id === targetShadeId) || shades[1];
    setCalculatedShade(matched);
  };

  const handleSelectQ1 = (val: string) => {
    setQ1(val);
    if (q2 && q3) calculateResult(val, q2, q3);
  };

  const handleSelectQ2 = (val: string) => {
    setQ2(val);
    if (q1 && q3) calculateResult(q1, val, q3);
  };

  const handleSelectQ3 = (val: string) => {
    setQ3(val);
    if (q1 && q2) calculateResult(q1, q2, val);
  };

  const handleReset = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
    setCalculatedShade(null);
  };

  return (
    <div className="fixed inset-0 bg-[#50172f]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ffd8e8] flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ffd8e8]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#954832] font-bold">
              Diagnóstico Instantáneo
            </span>
            <h3 className="font-display text-xl text-[#50172f] font-bold">
              Descubre tu Subtono Ideal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe8f0] text-[#320f22] flex items-center justify-center hover:bg-[#ffd8e8] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Step 1 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#320f22]">
            1. ¿De qué color lucen las venas de tu muñeca bajo luz natural?
          </label>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleSelectQ1('frio')}
              className={`p-3 rounded-2xl text-left text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                q1 === 'frio'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              <span>Azuladas o violáceas (Subtono Frío)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              onClick={() => handleSelectQ1('calido')}
              className={`p-3 rounded-2xl text-left text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                q1 === 'calido'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              <span>Verdosas u oliva claro (Subtono Cálido)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              onClick={() => handleSelectQ1('profundo')}
              className={`p-3 rounded-2xl text-left text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                q1 === 'profundo'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              <span>Azules-verdosas o tez profunda (Neutro / Pieles Morenas)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#320f22]">
            2. ¿Cómo responde tu piel ante la exposición solar?
          </label>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleSelectQ2('frio')}
              className={`p-3 rounded-2xl text-left text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                q2 === 'frio'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              <span>Me quemo con rapidez y adquiero un tono rosado</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              onClick={() => handleSelectQ2('calido')}
              className={`p-3 rounded-2xl text-left text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                q2 === 'calido'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              <span>Me bronceo con facilidad en un tono dorado/miel</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              onClick={() => handleSelectQ2('profundo')}
              className={`p-3 rounded-2xl text-left text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                q2 === 'profundo'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              <span>Bronceado inmediato profundo sin quemaduras</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#320f22]">
            3. ¿Qué joyería resalta mejor tu piel?
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSelectQ3('frio')}
              className={`p-2.5 rounded-xl text-center text-xs transition-colors border cursor-pointer ${
                q3 === 'frio'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              Plata / Platino
            </button>
            <button
              onClick={() => handleSelectQ3('calido')}
              className={`p-2.5 rounded-xl text-center text-xs transition-colors border cursor-pointer ${
                q3 === 'calido'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              Oro Amarillo
            </button>
            <button
              onClick={() => handleSelectQ3('profundo')}
              className={`p-2.5 rounded-xl text-center text-xs transition-colors border cursor-pointer ${
                q3 === 'profundo'
                  ? 'bg-[#ffe8f0] border-[#50172f] text-[#50172f] font-bold'
                  : 'bg-[#fff0f4] border-transparent text-[#524347] hover:bg-[#ffe8f0]'
              }`}
              type="button"
            >
              Oro Rosa / Ambos
            </button>
          </div>
        </div>

        {/* Calculated Result Card */}
        {calculatedShade && (
          <div className="p-4 rounded-2xl bg-[#ffe8f0] border border-[#ffd8e8] flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#954832] uppercase font-bold tracking-wider">
                Tu recomendación armónica:
              </span>
              <button
                onClick={handleReset}
                className="text-[11px] text-[#847377] hover:text-[#320f22] underline"
              >
                Reiniciar
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-md flex-shrink-0"
                style={{ backgroundColor: calculatedShade.hex }}
              />
              <div>
                <h4 className="font-display text-base font-bold text-[#320f22]">
                  {calculatedShade.name}
                </h4>
                <p className="text-xs text-[#524347]">{calculatedShade.subtoneLabel}</p>
              </div>
            </div>

            <p className="text-xs text-[#524347] bg-white/70 p-2.5 rounded-xl border border-white">
              {calculatedShade.idealFor}. {calculatedShade.finish}.
            </p>

            <button
              onClick={() => {
                onApplyShade(calculatedShade);
                onClose();
              }}
              className="py-3 px-5 rounded-full bg-[#50172f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6b2d45] shadow-md transition-all self-stretch text-center cursor-pointer"
            >
              Aplicar {calculatedShade.name} a mi Selección
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
