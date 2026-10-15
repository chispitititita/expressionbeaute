import React, { useState } from 'react';
import { Shade } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onSelectSubtoneFilter: (subtone: 'all' | 'frio' | 'calido' | 'profundo') => void;
  activeSubtoneFilter: 'all' | 'frio' | 'calido' | 'profundo';
  shades: Shade[];
  onSelectShade: (shade: Shade) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenProfile,
  onSelectSubtoneFilter,
  activeSubtoneFilter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/80 shadow-[0_12px_32px_-8px_rgba(107,45,69,0.06)] border-b border-[#ffe8f0]/60">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4">
        {/* Brand Zone with Authentic Flower Medallion Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 flex-shrink-0 group"
          aria-label="Expression Beauté Inicio"
        >
          <BrandLogo size="md" className="transition-transform group-hover:scale-102" />
        </a>

        {/* Desktop Nav Zone */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#fff0f4]/80 p-1.5 rounded-full shadow-inner border border-[#ffd8e8]/50">
          <button
            onClick={() => scrollToSection('hero-section')}
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#524347] hover:text-[#320f22] hover:bg-[#ffe8f0] transition-all cursor-pointer"
          >
            Colección 2026
          </button>
          <button
            onClick={() => scrollToSection('gama-tonos')}
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#524347] hover:text-[#320f22] hover:bg-[#ffe8f0] transition-all cursor-pointer"
          >
            Gama de Tonos
          </button>
          <button
            onClick={() => scrollToSection('formula-beneficios')}
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#524347] hover:text-[#320f22] hover:bg-[#ffe8f0] transition-all cursor-pointer"
          >
            Fórmula & Beneficios
          </button>
          <button
            onClick={() => scrollToSection('guia-aplicacion')}
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#524347] hover:text-[#320f22] hover:bg-[#ffe8f0] transition-all cursor-pointer"
          >
            Guía de Aplicación
          </button>
          <button
            onClick={() => scrollToSection('garantia-usabilidad')}
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#524347] hover:text-[#320f22] hover:bg-[#ffe8f0] transition-all cursor-pointer"
          >
            Garantía & Usabilidad
          </button>
        </nav>

        {/* Action Zone: Subtone switcher, search, cart, profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Subtone selector */}
          <div className="hidden sm:flex items-center bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-[#ffd8e8]">
            <span className="text-[11px] font-semibold uppercase text-[#847377] mr-2 tracking-wider">
              Subtono
            </span>
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Filtrar por subtono cálido"
                onClick={() => {
                  onSelectSubtoneFilter(activeSubtoneFilter === 'calido' ? 'all' : 'calido');
                  scrollToSection('gama-tonos');
                }}
                className={`w-4 h-4 rounded-full bg-[#E59866] transition-transform hover:scale-125 cursor-pointer ${
                  activeSubtoneFilter === 'calido' ? 'ring-2 ring-[#50172f] ring-offset-1 scale-110' : ''
                }`}
                title="Subtono Cálido"
                type="button"
              />
              <button
                aria-label="Filtrar por subtono neutro o morenas"
                onClick={() => {
                  onSelectSubtoneFilter(activeSubtoneFilter === 'profundo' ? 'all' : 'profundo');
                  scrollToSection('gama-tonos');
                }}
                className={`w-4 h-4 rounded-full bg-[#6B2D45] transition-transform hover:scale-125 cursor-pointer ${
                  activeSubtoneFilter === 'profundo' ? 'ring-2 ring-[#50172f] ring-offset-1 scale-110' : ''
                }`}
                title="Subtono Neutro & Pieles Morenas"
                type="button"
              />
              <button
                aria-label="Filtrar por subtono frío"
                onClick={() => {
                  onSelectSubtoneFilter(activeSubtoneFilter === 'frio' ? 'all' : 'frio');
                  scrollToSection('gama-tonos');
                }}
                className={`w-4 h-4 rounded-full bg-[#E79AA8] transition-transform hover:scale-125 cursor-pointer ${
                  activeSubtoneFilter === 'frio' ? 'ring-2 ring-[#50172f] ring-offset-1 scale-110' : ''
                }`}
                title="Subtono Frío"
                type="button"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            aria-label="Buscar cosméticos"
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#524347] hover:text-[#320f22] hover:bg-[#ffe8f0] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Shopping Bag Button */}
          <button
            aria-label={`Bolsa de compras con ${cartCount} productos`}
            onClick={onOpenCart}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#524347] hover:text-[#320f22] hover:bg-[#ffe8f0] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#50172f] text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* VIP Profile Button */}
          <button
            aria-label="Club Expresión Perfil"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#50172f] hover:bg-[#6b2d45] flex items-center justify-center shadow-sm cursor-pointer transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            aria-label="Abrir menú"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#50172f] hover:bg-[#ffe8f0] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-[#ffd8e8] px-6 py-4 flex flex-col gap-3 shadow-xl animate-fadeIn">
          <button
            onClick={() => scrollToSection('hero-section')}
            className="text-left py-2 text-sm font-semibold text-[#50172f] hover:text-[#954832]"
          >
            Colección 2026
          </button>
          <button
            onClick={() => scrollToSection('gama-tonos')}
            className="text-left py-2 text-sm font-semibold text-[#50172f] hover:text-[#954832]"
          >
            Gama Magistral de Tonos
          </button>
          <button
            onClick={() => scrollToSection('formula-beneficios')}
            className="text-left py-2 text-sm font-semibold text-[#50172f] hover:text-[#954832]"
          >
            Fórmula & Beneficios
          </button>
          <button
            onClick={() => scrollToSection('guia-aplicacion')}
            className="text-left py-2 text-sm font-semibold text-[#50172f] hover:text-[#954832]"
          >
            Guía de Aplicación
          </button>
          <button
            onClick={() => scrollToSection('garantia-usabilidad')}
            className="text-left py-2 text-sm font-semibold text-[#50172f] hover:text-[#954832]"
          >
            Garantía & Usabilidad
          </button>
        </div>
      )}
    </header>
  );
};
