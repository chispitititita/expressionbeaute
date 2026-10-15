import React from 'react';

interface GuaranteeSectionProps {
  onOpenQuiz: () => void;
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ onOpenQuiz }) => {
  return (
    <section id="garantia-usabilidad" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-12 sm:pb-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#fff0f4] via-white to-[#ffe8f0] shadow-sm border border-[#ffd8e8] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-[#50172f] font-bold">
            Tranquilidad Absoluta
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#50172f] font-bold">
            ¿Dudas con tu tono ideal? Garantía de Tono Exacto
          </h2>
          <p className="text-sm sm:text-base text-[#524347] leading-relaxed">
            Cada orden incluye una muestra de prueba hermética del tono que elegiste junto a dos tonos
            alternativos. Si al probar la muestra no es tu coincidencia perfecta, te enviamos el tono
            correcto o te devolvemos el importe completo en 30 días sin coste de porte.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenQuiz}
              className="px-6 py-3.5 rounded-full bg-[#50172f] text-white hover:bg-[#6b2d45] text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>Realizar Test Rápido de Subtono (1 min)</span>
            </button>
            <a
              href="#gama-tonos"
              className="px-6 py-3.5 rounded-full bg-white text-[#320f22] hover:bg-[#ffe8f0] text-xs font-bold uppercase tracking-wider border border-[#ffd8e8] transition-all"
            >
              Ver Toda la Gama
            </a>
          </div>
        </div>

        {/* Ambient background light spheres */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#ffdbd1]/50 blur-3xl pointer-events-none" />
        <div className="absolute right-32 top-8 w-48 h-48 rounded-full bg-[#ffd9df]/50 blur-2xl pointer-events-none" />
      </div>
    </section>
  );
};
