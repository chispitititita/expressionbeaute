import React from 'react';
import { Shade } from '../types';
import { PRODUCT_IMAGE_URL } from '../data/shades';

interface ShadeGalleryProps {
  shades: Shade[];
  activeFilter: 'all' | 'frio' | 'calido' | 'profundo';
  onFilterChange: (filter: 'all' | 'frio' | 'calido' | 'profundo') => void;
  onAddToCart: (shade: Shade) => void;
  onSelectShade: (shade: Shade) => void;
  onOpenVirtualTryOnWithShade: (shade: Shade) => void;
}

export const ShadeGallery: React.FC<ShadeGalleryProps> = ({
  shades,
  activeFilter,
  onFilterChange,
  onAddToCart,
  onSelectShade,
  onOpenVirtualTryOnWithShade,
}) => {
  const filteredShades = shades.filter((shade) => {
    if (activeFilter === 'all') return true;
    return shade.subtone === activeFilter;
  });

  return (
    <section id="gama-tonos" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
      {/* Header and Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[#954832] uppercase tracking-widest font-bold">
              Cromática de Precisión
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#954832]" />
            <span className="text-xs text-[#847377] font-medium">Colección 2026</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#50172f] font-bold">
            Gama Magistral de Tonos
          </h2>
          <p className="text-sm sm:text-base text-[#524347] max-w-xl mt-2 leading-relaxed">
            Formulados con micro-partículas minerales que se mimetizan con la temperatura corporal para un rubor auténtico sin efecto máscara.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#fff0f4] border border-[#ffd8e8] shadow-inner self-start md:self-end">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#50172f] text-white shadow-sm'
                : 'text-[#524347] hover:text-[#320f22]'
            }`}
            type="button"
          >
            Todos ({shades.length})
          </button>
          <button
            onClick={() => onFilterChange('frio')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === 'frio'
                ? 'bg-[#50172f] text-white shadow-sm'
                : 'text-[#524347] hover:text-[#320f22]'
            }`}
            type="button"
          >
            Subtono Frío
          </button>
          <button
            onClick={() => onFilterChange('calido')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === 'calido'
                ? 'bg-[#50172f] text-white shadow-sm'
                : 'text-[#524347] hover:text-[#320f22]'
            }`}
            type="button"
          >
            Subtono Cálido
          </button>
          <button
            onClick={() => onFilterChange('profundo')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === 'profundo'
                ? 'bg-[#50172f] text-white shadow-sm'
                : 'text-[#524347] hover:text-[#320f22]'
            }`}
            type="button"
          >
            Pieles Morenas
          </button>
        </div>
      </div>

      {/* Tone Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShades.map((shade) => (
          <div
            key={shade.id}
            className="group p-5 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(107,45,69,0.06)] border border-[#ffd8e8] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#954832]/40"
          >
            <div className="flex flex-col gap-4">
              {/* Product Media Box */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#ffe8f0]/40 flex items-center justify-center">
                {/* Tone Glow */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-color pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
                  style={{ backgroundColor: shade.hex }}
                />

                <img
                  alt={`Blush ${shade.name} textura`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={PRODUCT_IMAGE_URL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Badge based on type */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#50172f] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                  {shade.badgeType === 'bestseller' ? (
                    <>
                      <span className="material-symbols-outlined text-[14px] text-[#954832]">star</span>
                      <span className="text-[#954832]">{shade.badge}</span>
                    </>
                  ) : shade.badgeType === 'pigment' ? (
                    <>
                      <span className="material-symbols-outlined text-[14px] text-[#6b2d45]">
                        auto_fix_high
                      </span>
                      <span className="text-[#6b2d45]">{shade.badge}</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{shade.badge}</span>
                    </>
                  )}
                </div>

                {/* Swatch circular badge */}
                <button
                  onClick={() => onSelectShade(shade)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full shadow-lg border-2 border-white hover:scale-115 transition-transform cursor-pointer"
                  style={{ backgroundColor: shade.hex }}
                  title={`Ver en grande ${shade.name}`}
                  type="button"
                />

                {/* Quick Virtual Try-on on this card */}
                <button
                  onClick={() => onOpenVirtualTryOnWithShade(shade)}
                  className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[11px] font-medium backdrop-blur-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                  <span>Ver en piel</span>
                </button>
              </div>

              {/* Textual Description */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#954832] font-semibold">
                    {shade.line}
                  </span>
                  <span className="font-display text-base text-[#50172f] font-bold">
                    {shade.price.toFixed(2).replace('.', ',')}€
                  </span>
                </div>
                <h3 className="font-display text-lg text-[#320f22] font-bold mt-0.5">
                  {shade.name}
                </h3>
                <p className="text-xs text-[#524347] mt-1.5 leading-relaxed">
                  {shade.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-4 border-t border-[#ffd8e8] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#847377] font-medium truncate">
                {shade.subtoneLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectShade(shade);
                    document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-2 rounded-full text-[#524347] hover:text-[#50172f] hover:bg-[#ffe8f0] transition-colors"
                  title="Ver en el escenario principal"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_full</span>
                </button>
                <button
                  onClick={() => onAddToCart(shade)}
                  className="px-4 py-2 rounded-full bg-[#50172f] text-white hover:bg-[#6b2d45] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
