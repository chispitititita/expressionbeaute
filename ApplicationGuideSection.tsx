import React, { useState } from 'react';

type ApplicationMethod = 'fingers' | 'sponge' | 'brush';

export const ApplicationGuideSection: React.FC = () => {
  const [method, setMethod] = useState<ApplicationMethod>('fingers');

  const contentByMethod = {
    fingers: {
      step1Title: 'Sonreír y Ubicar',
      step1Desc:
        'Toma una pequeña cantidad con la yema del dedo anular. Calienta el producto 2 segundos y deposítalo suavemente en el punto más alto de las manzanas.',
      step1Tip: 'Tip: Menos es más en la primera pasada',
      step2Title: 'Esculpir y Fundir',
      step2Desc:
        'Da suaves toquecitos ascendentes en dirección hacia las sienes. El calor corporal de tus manos logrará que el rubor se disuelva en la tez sin bordes notorios.',
      step2Tip: 'Efecto Lifting inmediato en pómulos',
      step3Title: 'Sellar o Dejar Jugoso',
      step3Desc:
        'Para un acabado de rocío natural estilo Glass Skin, déjalo sin polvo. Para eventos de 16 horas, sella el perímetro con una bruma de fijación o polvo translúcido.',
      step3Tip: 'Versatilidad de día a noche',
    },
    sponge: {
      step1Title: 'Impregnar Bisel',
      step1Desc:
        'Humedece ligeramente tu esponja blender y presiona suavemente el extremo biselado sobre la superficie cremosa del tarro.',
      step1Tip: 'Tip: Humedece con agua termal para extra glow',
      step2Title: 'Golpeteo Difuso',
      step2Desc:
        'Aplica a toquecitos ligeros desde el centro de la mejilla hacia el arco cigomático. Obtendrás un difuminado aerográfico ultra-pulido.',
      step2Tip: 'Acabado Airbrush sin marcas de aplicación',
      step3Title: 'Velo Uniforme',
      step3Desc:
        'El difuminado con esponja aporta un velo uniforme hiper-natural, ideal para fotografía de alta definición y luz natural de día.',
      step3Tip: 'Ideal para pieles con textura o poros visibles',
    },
    brush: {
      step1Title: 'Cargar Cerdas Dúo-Fibra',
      step1Desc:
        'Gira suavemente una brocha sintética densa sobre la fórmula. Descarga el exceso en el dorso de la mano antes de tocar el rostro.',
      step1Tip: 'Tip: Utiliza brocha biselada para contorno preciso',
      step2Title: 'Trazo Ascendente Dinámico',
      step2Desc:
        'Desliza la brocha en trazos diagonales desde la mejilla hacia la raíz del cabello para alargar y afinar ópticamente la estructura ósea.',
      step2Tip: 'Definición arquitectónica de alta costura',
      step3Title: 'Integración Pulida',
      step3Desc:
        'Realiza movimientos circulares suaves en los bordes para fusionar el rubor con tu base de maquillaje o corrector sin alterar la cobertura.',
      step3Tip: 'Durabilidad máxima sin transferencia',
    },
  };

  const current = contentByMethod[method];

  return (
    <section id="guia-aplicacion" className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs text-[#954832] uppercase tracking-widest font-bold">
            Técnica Profesional de Visagismo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#50172f] font-bold mt-1">
            Guía Intuitiva de Aplicación
          </h2>
          <p className="text-sm sm:text-base text-[#524347] max-w-xl mt-2 leading-relaxed">
            Tres movimientos guiados para sublimar el contorno facial según el resultado deseado.
          </p>
        </div>

        {/* Method selector */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#fff0f4] border border-[#ffd8e8] shadow-sm self-start md:self-end">
          <button
            onClick={() => setMethod('fingers')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              method === 'fingers'
                ? 'bg-white text-[#50172f] shadow-sm'
                : 'text-[#524347] hover:text-[#320f22]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">touch_app</span>
            <span>Con los Dedos</span>
          </button>
          <button
            onClick={() => setMethod('sponge')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              method === 'sponge'
                ? 'bg-white text-[#50172f] shadow-sm'
                : 'text-[#524347] hover:text-[#320f22]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">bubble_chart</span>
            <span>Con Esponja</span>
          </button>
          <button
            onClick={() => setMethod('brush')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              method === 'brush'
                ? 'bg-white text-[#50172f] shadow-sm'
                : 'text-[#524347] hover:text-[#320f22]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">brush</span>
            <span>Con Brocha</span>
          </button>
        </div>
      </div>

      {/* 3 Steps Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Step 1 */}
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex flex-col justify-between hover:border-[#954832]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-full bg-[#50172f] text-white font-display text-base flex items-center justify-center font-bold">
                01
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#847377]">
                Preparación
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#320f22]">{current.step1Title}</h3>
            <p className="text-xs text-[#524347] mt-2 leading-relaxed">{current.step1Desc}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#ffd8e8] flex items-center gap-2 text-[#954832] text-xs font-semibold">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            <span>{current.step1Tip}</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex flex-col justify-between hover:border-[#954832]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-full bg-[#50172f] text-white font-display text-base flex items-center justify-center font-bold">
                02
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#847377]">
                Difuminado
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#320f22]">{current.step2Title}</h3>
            <p className="text-xs text-[#524347] mt-2 leading-relaxed">{current.step2Desc}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#ffd8e8] flex items-center gap-2 text-[#954832] text-xs font-semibold">
            <span className="material-symbols-outlined text-[18px]">gesture</span>
            <span>{current.step2Tip}</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-[#ffd8e8] flex flex-col justify-between hover:border-[#954832]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-full bg-[#50172f] text-white font-display text-base flex items-center justify-center font-bold">
                03
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#847377]">
                Fijación
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#320f22]">{current.step3Title}</h3>
            <p className="text-xs text-[#524347] mt-2 leading-relaxed">{current.step3Desc}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#ffd8e8] flex items-center gap-2 text-[#954832] text-xs font-semibold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{current.step3Tip}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
