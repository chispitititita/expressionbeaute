import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenLiveChat: () => void;
  onOpenSubtoneQuiz: () => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLiveChat,
  onOpenSubtoneQuiz,
  onShowToast,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [legalModalContent, setLegalModalContent] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      onShowToast('¡Bienvenida al Club Expresión! Revisa tu correo para tu invitación privada.');
      setNewsletterEmail('');
    }
  };

  const openLegal = (title: string, body: string) => {
    setLegalModalContent(`${title}:::${body}`);
  };

  return (
    <footer className="w-full bg-[#fff0f4] mt-16 border-t border-[#ffd8e8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-16">
        {/* 4 Trust Feature Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 mb-12 border-b border-[#ffd8e8]">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#ffd8e8]">
            <span className="material-symbols-outlined text-[#50172f] text-[28px] flex-shrink-0">
              verified
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#320f22] leading-tight">
                No Comedogénico
              </p>
              <p className="text-[11px] text-[#524347]">Dermatológicamente probado</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#ffd8e8]">
            <span className="material-symbols-outlined text-[#50172f] text-[28px] flex-shrink-0">
              cruelty_free
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#320f22] leading-tight">Cruelty Free</p>
              <p className="text-[11px] text-[#524347]">Certificación Leaping Bunny</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#ffd8e8]">
            <span className="material-symbols-outlined text-[#50172f] text-[28px] flex-shrink-0">
              eco
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#320f22] leading-tight">PAO 12M</p>
              <p className="text-[11px] text-[#524347]">Frescura botánica activa</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#ffd8e8]">
            <span className="material-symbols-outlined text-[#50172f] text-[28px] flex-shrink-0">
              published_with_changes
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#320f22] leading-tight">
                Devolución 30 Días
              </p>
              <p className="text-[11px] text-[#524347]">Garantía de tono exacto</p>
            </div>
          </div>
        </div>

        {/* Multi-column Footer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand Presentation */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
            </div>
            <p className="text-xs text-[#524347] leading-relaxed pr-4">
              Lujo sensorial y biotecnología estética. Redefiniendo el resplandor cutáneo con
              formulaciones hiper-purificadas e infusión de péptidos activos para 2026.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenLiveChat}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#ffe8f0] text-[#320f22] text-xs font-semibold border border-[#ffd8e8] shadow-xs transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[#50172f] text-[18px]">
                  support_agent
                </span>
                <span>Chat en vivo asistido</span>
              </button>
            </div>
          </div>

          {/* Club Expression Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="font-display text-base font-bold text-[#320f22]">Club Expression</h4>
            <p className="text-xs text-[#524347] leading-relaxed">
              Suscríbase para invitaciones privadas a catas sensoriales, prelanzamientos y
              diagnósticos dermatológicos personalizados.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                aria-label="Correo electrónico para membresía"
                type="email"
                required
                placeholder="Su correo electrónico"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white text-[#320f22] placeholder:text-[#847377] text-xs border border-[#ffd8e8] focus:outline-none focus:ring-1 focus:ring-[#50172f] shadow-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#50172f] hover:bg-[#6b2d45] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer whitespace-nowrap"
              >
                Unirse
              </button>
            </form>
          </div>

          {/* Navigation & Legal Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-bold text-[#320f22] uppercase tracking-wider">
                Navegación
              </h4>
              <a
                href="#hero-section"
                className="text-xs text-[#524347] hover:text-[#50172f] transition-colors"
              >
                Colección 2026
              </a>
              <button
                onClick={onOpenSubtoneQuiz}
                className="text-left text-xs text-[#524347] hover:text-[#50172f] transition-colors cursor-pointer"
              >
                Test de Subtono
              </button>
              <button
                onClick={() =>
                  openLegal(
                    'Boutiques Físicas',
                    'Encuéntranos en nuestras flagship stores en Passeig de Gràcia (Barcelona) y Rue Saint-Honoré (París). Disfruta de un diagnóstico cutáneo personalizado con nuestros maestros visagistas.'
                  )
                }
                className="text-left text-xs text-[#524347] hover:text-[#50172f] transition-colors cursor-pointer"
              >
                Boutiques Físicas
              </button>
              <button
                onClick={onOpenLiveChat}
                className="text-left text-xs text-[#524347] hover:text-[#50172f] transition-colors cursor-pointer"
              >
                Atención al Cliente
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-bold text-[#320f22] uppercase tracking-wider">
                Legal & Ética
              </h4>
              <button
                onClick={() =>
                  openLegal(
                    'Términos de Servicio',
                    'Todos los productos de Expression Beauté 2026 están certificados bajo el Reglamento Europeo de Cosméticos (CE) Nº 1223/2009. Garantía de devolución de 30 días.'
                  )
                }
                className="text-left text-xs text-[#524347] hover:text-[#50172f] transition-colors cursor-pointer"
              >
                Términos de Servicio
              </button>
              <button
                onClick={() =>
                  openLegal(
                    'Política de Privacidad',
                    'Tus datos personales y de diagnóstico de piel están estrictamente protegidos bajo RGPD y jamás serán comercializados a terceros.'
                  )
                }
                className="text-left text-xs text-[#524347] hover:text-[#50172f] transition-colors cursor-pointer"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() =>
                  openLegal(
                    'Trazabilidad Botánica',
                    'El 100% de nuestros ingredientes activos proviene de agricultura regenerativa y minería de mica con certificación ética auditada por organismos independientes.'
                  )
                }
                className="text-left text-xs text-[#524347] hover:text-[#50172f] transition-colors cursor-pointer"
              >
                Trazabilidad Botánica
              </button>
              <button
                onClick={() =>
                  onShowToast('Preferencias de cookies guardadas (Solo esenciales activas).')
                }
                className="text-left text-xs text-[#524347] hover:text-[#50172f] transition-colors cursor-pointer"
              >
                Preferencias de Cookies
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="pt-8 border-t border-[#ffd8e8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#847377]">
          <p>© 2026 Expression Beauté Parfums & Cosmétiques. Todos los derechos reservados.</p>
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#954832]">
            Haute Beauté • Paris • Barcelona
          </p>
        </div>
      </div>

      {/* Legal Popover Modal */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#ffd8e8] animate-scaleUp">
            <h3 className="font-display text-lg font-bold text-[#50172f] mb-2">
              {legalModalContent.split(':::')[0]}
            </h3>
            <p className="text-xs text-[#524347] leading-relaxed mb-4">
              {legalModalContent.split(':::')[1]}
            </p>
            <button
              onClick={() => setLegalModalContent(null)}
              className="w-full py-2.5 rounded-full bg-[#50172f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6b2d45]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
