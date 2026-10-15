import React, { useState } from 'react';
import { Shade } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  shades: Shade[];
  onSelectShade: (shade: Shade) => void;
  onAddToCart: (shade: Shade) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  shades,
  onSelectShade,
  onAddToCart,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = shades.filter((shade) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      shade.name.toLowerCase().includes(q) ||
      shade.line.toLowerCase().includes(q) ||
      shade.description.toLowerCase().includes(q) ||
      shade.finish.toLowerCase().includes(q) ||
      shade.subtoneLabel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 bg-[#50172f]/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#ffd8e8] flex flex-col gap-4 animate-scaleUp">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-3 border-b border-[#ffd8e8]">
          <span className="material-symbols-outlined text-[#50172f] text-[22px]">search</span>
          <input
            type="text"
            autoFocus
            placeholder="Buscar por tono, acabado, subtono (ej. terracota, frío, velvet)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#320f22] placeholder:text-[#847377] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#847377] hover:text-[#320f22] text-xs font-bold"
            >
              Borrar
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe8f0] text-[#320f22] flex items-center justify-center hover:bg-[#ffd8e8]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[#847377] mr-1">Sugerencias:</span>
          {['Terracota', 'Rosa Frío', 'Pieles Morenas', 'Efecto Esculpido', 'Ácido Hialurónico'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag.toLowerCase())}
                className="px-2.5 py-1 rounded-full bg-[#fff0f4] text-[#50172f] text-[11px] font-semibold hover:bg-[#ffe8f0] border border-[#ffd8e8]"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto flex flex-col gap-2 mt-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#524347]">
              No encontramos tonos que coincidan con &quot;{searchTerm}&quot;. Prueba con otro término.
            </div>
          ) : (
            filtered.map((shade) => (
              <div
                key={shade.id}
                className="p-3 rounded-2xl bg-[#fff0f4]/80 border border-[#ffd8e8] flex items-center justify-between gap-3 hover:bg-[#ffe8f0] transition-colors"
              >
                <div
                  onClick={() => {
                    onSelectShade(shade);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                >
                  <div
                    className="w-8 h-8 rounded-full border border-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#320f22] truncate">{shade.name}</p>
                    <p className="text-[11px] text-[#524347] truncate">{shade.subtoneLabel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-xs text-[#50172f]">28,00€</span>
                  <button
                    onClick={() => {
                      onAddToCart(shade);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#50172f] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#6b2d45]"
                  >
                    Añadir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
