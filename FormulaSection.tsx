import React, { useState } from 'react';
import { INGREDIENTS_DETAIL } from '../data/shades';

export const FormulaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'formula' | 'beneficios' | 'durabilidad'>('formula');
  const [inciModalOpen, setInciModalOpen] = useState(false);

  return (
    <section id="formula-beneficios" className="w-full bg-[#fff0f4]/60 py-12 sm:py-16 border-y border-[#ffd8e8]/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#954832] font-bold">
            Biotecnología & Alta Pureza
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#50172f] font-bold mt-1">
            Cuidado Cutáneo en Cada Gota
          </h2>
          <p className="text-sm sm:text-base text-[#524347] mt-2 leading-relaxed">
            No es solo color; es un tratamiento dérmico hidrolipídico que nutre la barrera cutánea sin
            obstruir poros ni alterar el equilibrio de la piel.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#ffe8f0] border border-[#ffd8e8] shadow-inner gap-1">
            <button
              onClick={() => setActiveTab('formula')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'formula'
                  ? 'bg-white text-[#50172f] shadow-sm'
                  : 'text-[#524347] hover:text-[#320f22]'
              }`}
              type="button"
            >
              Fórmula & Ingredientes
            </button>
            <button
              onClick={() => setActiveTab('beneficios')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'beneficios'
                  ? 'bg-white text-[#50172f] shadow-sm'
                  : 'text-[#524347] hover:text-[#320f22]'
              }`}
              type="button"
            >
              Beneficios Clave
            </button>
            <button
              onClick={() => setActiveTab('durabilidad')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'durabilidad'
                  ? 'bg-white text-[#50172f] shadow-sm'
                  : 'text-[#524347] hover:text-[#320f22]'
              }`}
              type="button"
            >
              Durabilidad & PAO
            </button>
          </div>
        </div>

        {/* Tab 1: Formula & Ingredientes */}
        {activeTab === 'formula' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex flex-col justify-between hover:border-[#954832]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ffdbd1]/60 flex items-center justify-center text-[#954832] mb-4">
                  <span className="material-symbols-outlined text-[26px]">opacity</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#320f22]">
                  Ácido Hialurónico de Bajo Peso
                </h3>
                <p className="text-xs text-[#524347] mt-2 leading-relaxed">
                  Penetra la capa córnea reteniendo hasta 1.000 veces su peso molecular en agua.
                  Garantiza que el rubor jamás se cuartee ni marque líneas finas o poros abiertos.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ffd8e8]">
                <span className="text-[11px] text-[#954832] uppercase font-bold tracking-wider">
                  Micro-encapsulado botánico
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex flex-col justify-between hover:border-[#50172f]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ffd9e3]/60 flex items-center justify-center text-[#50172f] mb-4">
                  <span className="material-symbols-outlined text-[26px]">shield_with_heart</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#320f22]">
                  Vitamina E Activa (Tocoferol)
                </h3>
                <p className="text-xs text-[#524347] mt-2 leading-relaxed">
                  Poderoso escudo antioxidante que neutraliza los radicales libres provocados por la
                  luz azul y la polución urbana. Conserva la frescura del color inalterada durante 14
                  horas.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ffd8e8]">
                <span className="text-[11px] text-[#50172f] uppercase font-bold tracking-wider">
                  Bio-disponible celular
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex flex-col justify-between hover:border-[#954832]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ffb5a0]/40 flex items-center justify-center text-[#954832] mb-4">
                  <span className="material-symbols-outlined text-[26px]">wb_sunny</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#320f22]">
                  Mica Recubierta con Aminoácidos
                </h3>
                <p className="text-xs text-[#524347] mt-2 leading-relaxed">
                  Mica de origen ético tratada con lauroil lisina para adherirse a la piel con
                  sensación sedosa y dispersión de luz omnidireccional sin brillo tosco.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ffd8e8]">
                <span className="text-[11px] text-[#954832] uppercase font-bold tracking-wider">
                  Trazabilidad responsable
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Beneficios Clave */}
        {activeTab === 'beneficios' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8]">
              <span className="material-symbols-outlined text-[#954832] text-[32px] mb-3">
                volunteer_activism
              </span>
              <h3 className="font-display text-lg font-bold text-[#320f22]">
                Apto desde los 15 Años
              </h3>
              <p className="text-xs text-[#524347] mt-2 leading-relaxed">
                Fórmula inocua, hipoalergénica y certificada para pieles jóvenes o hipersensibles con
                tendencia a rojeces y dermatitis de contacto.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8]">
              <span className="material-symbols-outlined text-[#954832] text-[32px] mb-3">
                blur_on
              </span>
              <h3 className="font-display text-lg font-bold text-[#320f22]">
                Efecto Filtro Sin Textura
              </h3>
              <p className="text-xs text-[#524347] mt-2 leading-relaxed">
                Difumina la apariencia de textura cutánea. No resalta cicatrices ni granitos gracias
                a su base esférica de polímeros vegetales biodegradables.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8]">
              <span className="material-symbols-outlined text-[#954832] text-[32px] mb-3">eco</span>
              <h3 className="font-display text-lg font-bold text-[#320f22]">
                Cero Fragancias Sintéticas
              </h3>
              <p className="text-xs text-[#524347] mt-2 leading-relaxed">
                100% libre de perfumes artificiales, aceites minerales comedogénicos, parabenos y
                siliconas D4/D5 no biodegradables.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Durabilidad & PAO */}
        {activeTab === 'durabilidad' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#ffe8f0] flex-shrink-0 flex items-center justify-center font-display text-2xl text-[#50172f] font-bold">
                12M
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#320f22]">
                  PAO (Period After Opening): 12 Meses
                </h3>
                <p className="text-xs text-[#524347] mt-1.5 leading-relaxed">
                  El tarro de cristal opalino con cierre hermético previene la oxidación de los
                  activos botánicos. Mantener en lugar fresco alejado de la luz solar directa.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#ffe8f0] flex-shrink-0 flex items-center justify-center font-display text-2xl text-[#954832] font-bold">
                15g
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#320f22]">
                  Contenido Neto: 15g / 0.5 oz
                </h3>
                <p className="text-xs text-[#524347] mt-1.5 leading-relaxed">
                  Rinde más de 240 aplicaciones diarias gracias a su alta concentración de pigmento
                  micronizado de liberación gradual.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Open Full INCI Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setInciModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#50172f] hover:text-[#954832] uppercase tracking-wider underline underline-offset-4 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">biotech</span>
            <span>Ver Ficha Técnica INCI Completa y Auditoría Dermatológica</span>
          </button>
        </div>
      </div>

      {/* Full INCI Laboratory Modal */}
      {inciModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl border border-[#ffd8e8] animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-[#ffd8e8]">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#954832] font-bold">
                  Auditoría de Laboratorio
                </span>
                <h3 className="font-display text-xl text-[#50172f] font-bold">
                  Composición INCI Certificada
                </h3>
              </div>
              <button
                onClick={() => setInciModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ffe8f0] text-[#320f22] flex items-center justify-center hover:bg-[#ffd8e8]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {INGREDIENTS_DETAIL.map((ing) => (
                <div key={ing.name} className="p-4 rounded-2xl bg-[#fff0f4] border border-[#ffd8e8]/70">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#320f22]">{ing.name}</h4>
                    <span className="text-xs font-mono font-bold text-[#50172f] bg-white px-2 py-0.5 rounded-full border border-[#ffd8e8]">
                      {ing.concentration}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#847377] mt-0.5">INCI: {ing.inci}</p>
                  <p className="text-xs text-[#524347] mt-1.5">{ing.benefits}</p>
                  <p className="text-[11px] text-[#954832] mt-1 font-medium">Origen: {ing.origin}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#ffd8e8] flex justify-end">
              <button
                onClick={() => setInciModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#50172f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6b2d45]"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
