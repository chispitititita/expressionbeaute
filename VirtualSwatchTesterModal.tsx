import React, { useState } from 'react';
import { Shade } from '../types';

interface VirtualSwatchTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  shades: Shade[];
  initialShade: Shade;
  onSelectAndAddToCart: (shade: Shade) => void;
}

interface SkinComplexion {
  id: string;
  name: string;
  undertoneDesc: string;
  baseHex: string;
  undertone: 'frio' | 'calido' | 'profundo';
}

const COMPLEXIONS: SkinComplexion[] = [
  {
    id: 'fair',
    name: 'Tez Porcelana / Clara',
    undertoneDesc: 'Subtono frío rosáceo (Fitzpatrick I-II)',
    baseHex: '#F6E4DE',
    undertone: 'frio',
  },
  {
    id: 'medium-warm',
    name: 'Tez Media / Miel',
    undertoneDesc: 'Subtono cálido dorado (Fitzpatrick III)',
    baseHex: '#D89E7C',
    undertone: 'calido',
  },
  {
    id: 'olive',
    name: 'Tez Oliva / Trigueña',
    undertoneDesc: 'Subtono neutro verdoso (Fitzpatrick IV)',
    baseHex: '#B88258',
    undertone: 'calido',
  },
  {
    id: 'deep',
    name: 'Tez Morena / Profunda',
    undertoneDesc: 'Subtono enriquecido rojizo (Fitzpatrick V-VI)',
    baseHex: '#643825',
    undertone: 'profundo',
  },
];

export const VirtualSwatchTesterModal: React.FC<VirtualSwatchTesterModalProps> = ({
  isOpen,
  onClose,
  shades,
  initialShade,
  onSelectAndAddToCart,
}) => {
  const [selectedComplexion, setSelectedComplexion] = useState<SkinComplexion>(COMPLEXIONS[1]);
  const [activeShade, setActiveShade] = useState<Shade>(initialShade);
  const [intensity, setIntensity] = useState<number>(65); // 20 to 100

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#50172f]/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#ffd8e8] flex flex-col gap-6 max-h-[92vh] overflow-y-auto animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ffd8e8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffe8f0] flex items-center justify-center text-[#50172f]">
              <span className="material-symbols-outlined text-[22px]">face</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#954832] font-bold">
                Probador Virtual de Pigmento
              </span>
              <h3 className="font-display text-xl text-[#50172f] font-bold">
                Simulación Cromática en Piel Real
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe8f0] text-[#320f22] flex items-center justify-center hover:bg-[#ffd8e8] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Visual Stage & Skin Swatch Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Virtual Forearm / Cheek Swatch Simulation Canvas */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-inner border border-black/10 transition-colors duration-500"
              style={{ backgroundColor: selectedComplexion.baseHex }}
            >
              {/* Subtle skin pores & soft gradient texture */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold">
                  {selectedComplexion.name}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#320f22] text-[11px] font-bold shadow-sm">
                  {activeShade.name}
                </span>
              </div>

              {/* The Swatch Streak / Blush Application Area */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div
                  className="w-44 sm:w-52 h-20 sm:h-24 rounded-full blur-md transition-all duration-300 transform -rotate-6 shadow-sm"
                  style={{
                    backgroundColor: activeShade.hex,
                    opacity: intensity / 100,
                  }}
                />
                <div
                  className="w-36 h-12 rounded-full blur-sm transition-all duration-300 transform -rotate-3 -mt-16"
                  style={{
                    backgroundColor: activeShade.hex,
                    opacity: (intensity / 100) * 0.9,
                  }}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between text-white text-xs drop-shadow-sm font-medium">
                <span>Intensidad: {intensity}%</span>
                <span className="capitalize">{activeShade.finish.split(' ')[0]}</span>
              </div>
            </div>

            {/* Intensity Slider */}
            <div className="flex flex-col gap-1.5 px-1">
              <div className="flex justify-between text-xs text-[#524347]">
                <span>Rocío Sutil (1 toque)</span>
                <span className="font-bold text-[#50172f]">{intensity}% Cobertura</span>
                <span>Alta Cobertura (3 toques)</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-[#50172f] cursor-pointer"
              />
            </div>
          </div>

          {/* Configuration Controls Column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            {/* 1. Pick Skin Complexion */}
            <div>
              <span className="text-xs font-bold text-[#50172f] uppercase tracking-wider block mb-2">
                1. Selecciona Tonalidad de Piel:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {COMPLEXIONS.map((comp) => {
                  const isCompSelected = comp.id === selectedComplexion.id;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => setSelectedComplexion(comp)}
                      className={`p-2.5 rounded-2xl flex items-center gap-2.5 text-left border transition-all cursor-pointer ${
                        isCompSelected
                          ? 'border-[#50172f] bg-[#ffe8f0] shadow-sm'
                          : 'border-[#ffd8e8] bg-white hover:bg-[#fff0f4]'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-black/15 shadow-inner flex-shrink-0"
                        style={{ backgroundColor: comp.baseHex }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#320f22] truncate">{comp.name}</p>
                        <p className="text-[10px] text-[#847377] truncate">{comp.undertoneDesc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Pick Blush Shade */}
            <div>
              <span className="text-xs font-bold text-[#50172f] uppercase tracking-wider block mb-2">
                2. Elige el Tono de Rubor:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {shades.map((shade) => {
                  const isShadeActive = shade.id === activeShade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setActiveShade(shade)}
                      className={`p-2 rounded-xl flex items-center gap-2 border transition-all cursor-pointer ${
                        isShadeActive
                          ? 'border-[#50172f] bg-[#ffe8f0] font-bold text-[#50172f]'
                          : 'border-[#ffd8e8] bg-white hover:bg-[#fff0f4] text-[#524347]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="text-xs truncate">{shade.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommendation info */}
            <div className="p-3.5 rounded-2xl bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#524347]">
              <div className="flex items-center gap-1.5 font-bold text-[#50172f] mb-1">
                <span className="material-symbols-outlined text-[16px] text-[#954832]">
                  auto_awesome
                </span>
                <span>Armonía cromática sugerida:</span>
              </div>
              <p>
                {activeShade.name} en {selectedComplexion.name}: {activeShade.idealFor}.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectAndAddToCart(activeShade);
                  onClose();
                }}
                className="flex-1 py-3 px-5 rounded-full bg-[#50172f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6b2d45] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                <span>Añadir {activeShade.name} • 28,00€</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
