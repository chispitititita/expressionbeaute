import React, { useState } from 'react';
import { Shade } from '../types';
import { PRODUCT_IMAGE_URL } from '../data/shades';

interface HeroSectionProps {
  shades: Shade[];
  selectedShade: Shade;
  onSelectShade: (shade: Shade) => void;
  onAddToCart: (shade: Shade) => void;
  onOpenShadeQuiz: () => void;
  onOpenVirtualTryOn: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  shades,
  selectedShade,
  onSelectShade,
  onAddToCart,
  onOpenShadeQuiz,
  onOpenVirtualTryOn,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeMacroIndex, setActiveMacroIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(selectedShade);
      setIsAdding(false);
    }, 400);
  };

  const macroDetails = [
    {
      icon: 'water_drop',
      title: 'Fusión Térmica',
      subtitle: 'Se funde a 36.5°C',
      detail:
        'Termo-sensibilidad bio-adaptativa: el contacto directo con la yema del dedo licúa suavemente los ésteres botánicos, permitiendo difuminar sin tirones.',
    },
    {
      icon: 'flare',
      title: 'Mica Perlada',
      subtitle: 'Sin partículas gruesas',
      detail:
        'Plaquetas de mica esférica japonesa de 10 micras que refractan la luz de manera homogénea. Cero brillos toscos o purpurina visible.',
    },
    {
      icon: 'spa',
      title: 'Ácido Hialurónico',
      subtitle: 'Hidratación continua',
      detail:
        'Cápsulas microscópicas de hialuronato sódico que liberan humedad dermo-activa durante 14 horas continuas evitando que se marque la textura.',
    },
  ];

  return (
    <section id="hero-section" className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-6 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Media Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full rounded-3xl overflow-hidden p-3 bg-white/70 backdrop-blur-2xl shadow-[0_24px_48px_-12px_rgba(107,45,69,0.12)] border border-[#ffd8e8]/50">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#ffe8f0]/40 group">
              {/* Subtle dynamic background hue reflecting active shade */}
              <div
                className="absolute inset-0 opacity-25 mix-blend-color transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: selectedShade.hex }}
              />

              <img
                alt={`Expression Beauté 2026 Rubor en Crema ${selectedShade.name}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                src={PRODUCT_IMAGE_URL}
              />

              {/* Live Active Tone Floating Glass Tag */}
              <div className="absolute bottom-4 left-4 p-3 rounded-full bg-white/90 backdrop-blur-xl shadow-lg flex items-center gap-3 border border-white/60">
                <div
                  className="w-6 h-6 rounded-full shadow-inner ring-2 ring-white transition-colors duration-500"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <div className="pr-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#847377]">
                    Tono en pantalla
                  </p>
                  <p className="font-semibold text-sm text-[#320f22] leading-none">
                    {selectedShade.name}
                  </p>
                </div>
              </div>

              {/* Certified Purity Pill */}
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#50172f]/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                <span>Edición Limitée 2026</span>
              </div>

              {/* Interactive Virtual Try-on Trigger on Image */}
              <button
                onClick={onOpenVirtualTryOn}
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#50172f] text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">face</span>
                <span>Probar en Piel</span>
              </button>
            </div>
          </div>

          {/* Macro Texture Preview & Micro-Features */}
          <div className="grid grid-cols-3 gap-3">
            {macroDetails.map((macro, idx) => (
              <div
                key={macro.title}
                onClick={() => setActiveMacroIndex(activeMacroIndex === idx ? null : idx)}
                className={`p-3 rounded-2xl bg-white/70 backdrop-blur-md flex items-center gap-3 shadow-sm hover:bg-[#ffe8f0]/80 transition-all cursor-pointer group border ${
                  activeMacroIndex === idx ? 'border-[#954832] bg-[#fff0f4]' : 'border-white/60'
                }`}
                title="Haz clic para ver detalles científicos"
              >
                <div className="w-10 h-10 rounded-full bg-[#ffe8f0] flex items-center justify-center text-[#50172f] group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{macro.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#320f22] font-semibold truncate">{macro.title}</p>
                  <p className="text-[11px] text-[#524347] leading-tight truncate">{macro.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive expansion info when a macro is clicked */}
          {activeMacroIndex !== null && (
            <div className="p-4 rounded-2xl bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#524347] flex items-start gap-3 animate-fadeIn">
              <span className="material-symbols-outlined text-[#954832] text-[18px] flex-shrink-0 mt-0.5">
                info
              </span>
              <div className="flex-1">
                <span className="font-bold text-[#50172f]">
                  {macroDetails[activeMacroIndex].title}:{' '}
                </span>
                {macroDetails[activeMacroIndex].detail}
              </div>
              <button
                onClick={() => setActiveMacroIndex(null)}
                className="text-[#847377] hover:text-[#320f22] font-bold text-sm"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Transactional & Editorial Content Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#954832] font-semibold">
                Haute Cosmétique • Avant-Garde
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#954832]" />
              <span className="text-xs text-[#847377] font-medium">15g • 0.5 oz</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] text-[#50172f] tracking-tight leading-[1.1] font-bold">
              Expression Beauté 2026
            </h1>
            <p className="text-base sm:text-lg text-[#524347] leading-relaxed">
              El rubor en crema sensorial que fusiona pigmento velvet, luz bio-refractiva y nutrición
              dermo-activa en una sola caricia.
            </p>
          </div>

          {/* Informational badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-[#ffe8f0] text-[#320f22] text-xs font-medium flex items-center gap-1.5 border border-[#ffd8e8]">
              <span className="material-symbols-outlined text-[#954832] text-[15px]">touch_app</span>
              Textura Suave en Crema
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ffe8f0] text-[#320f22] text-xs font-medium flex items-center gap-1.5 border border-[#ffd8e8]">
              <span className="material-symbols-outlined text-[#954832] text-[15px]">wb_twilight</span>
              Acabado Jugoso y Natural
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ffe8f0] text-[#320f22] text-xs font-medium flex items-center gap-1.5 border border-[#ffd8e8]">
              <span className="material-symbols-outlined text-[#954832] text-[15px]">shield</span>
              Hipoalergénico + Vitamina E
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ffe8f0] text-[#320f22] text-xs font-medium flex items-center gap-1.5 border border-[#ffd8e8]">
              <span className="material-symbols-outlined text-[#954832] text-[15px]">check_circle</span>
              No Comedogénico
            </span>
          </div>

          {/* Interactive Quick Shade Selector Pod */}
          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(107,45,69,0.06)] border border-[#ffd8e8] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#847377]">
                  Seleccionar Tono
                </span>
                <p className="font-semibold text-base text-[#320f22]">
                  {selectedShade.name} —{' '}
                  <span className="font-normal text-[#524347] text-sm">
                    {selectedShade.description.split('.')[0]}
                  </span>
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#e8f8f0] text-[#1b7e4f] text-[11px] font-bold border border-[#b8ebd2]">
                En Stock
              </span>
            </div>

            {/* Swatch Matrix Buttons */}
            <div aria-label="Gama de tonos rápida" className="flex items-center gap-3" role="radiogroup">
              {shades.map((shade) => {
                const isCurrent = shade.id === selectedShade.id;
                return (
                  <button
                    key={shade.id}
                    aria-label={`Tono ${shade.name}`}
                    onClick={() => onSelectShade(shade)}
                    className={`relative w-9 h-9 rounded-full transition-all duration-300 hover:scale-115 flex items-center justify-center p-0.5 shadow-sm cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-[#50172f] ring-offset-2 ring-offset-[#fff8f8] scale-110'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                    title={`${shade.name} - ${shade.subtoneLabel}`}
                    type="button"
                  >
                    <span
                      className="w-full h-full rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: shade.hex }}
                    />
                    {isCurrent && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#50172f] rounded-full border-2 border-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purchase CTA and Diagnosis Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className="flex-1 py-4 px-8 rounded-full bg-[#50172f] text-white hover:bg-[#6b2d45] active:scale-[0.98] transition-all text-xs uppercase tracking-wider font-bold shadow-[0_16px_36px_-6px_rgba(80,23,47,0.38)] flex items-center justify-center gap-3 cursor-pointer group"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
                {isAdding ? 'hourglass_empty' : 'add_shopping_cart'}
              </span>
              <span>
                {isAdding ? 'Añadiendo al neceser...' : `Añadir a la Cesta • 28,00€`}
              </span>
            </button>

            <button
              onClick={onOpenShadeQuiz}
              className="py-4 px-6 rounded-full bg-[#ffe8f0] text-[#320f22] hover:bg-[#ffd8e8] active:scale-[0.98] transition-all text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 border border-[#ffd8e8] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[#954832] text-[20px]">palette</span>
              <span>Personalizar Mi Tono</span>
            </button>
          </div>

          {/* Reassurance trust snippet */}
          <div className="flex items-center gap-4 text-[#524347] text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[#954832] text-[17px]">local_shipping</span>
              <span>Entrega 24/48h</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[#954832] text-[17px]">
                published_with_changes
              </span>
              <span>Prueba en casa 30 días</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[#954832] text-[17px]">check</span>
              <span>Muestras gratuitas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
