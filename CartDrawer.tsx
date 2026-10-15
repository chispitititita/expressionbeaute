import React from 'react';
import { CartItem } from '../types';
import { PRODUCT_IMAGE_URL } from '../data/shades';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (shadeId: string, delta: number) => void;
  onRemoveItem: (shadeId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.shade.price * item.quantity, 0);
  const tax = subtotal * 0.21;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#50172f]/30 backdrop-blur-sm z-50 transition-opacity duration-300"
      />

      {/* Slide-over Drawer */}
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-2xl shadow-2xl z-50 flex flex-col justify-between border-l border-[#ffd8e8] animate-slideLeft">
        {/* Drawer Header & Content Scroll Area */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between pb-6 border-b border-[#ffd8e8]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#50172f]">local_mall</span>
              <h2 className="font-display text-xl text-[#320f22] font-bold">Tu Neceser</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#ffd9e3] text-[#3b051e] text-xs font-bold">
                {totalQuantity}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar bolsa"
              className="w-9 h-9 rounded-full bg-[#ffe8f0] flex items-center justify-center text-[#320f22] hover:bg-[#ffd8e8] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="mt-4 p-4 rounded-2xl bg-[#fff0f4] border border-[#ffd8e8]">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="text-[#524347] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                ¡Envío Exprés Gratuito Activo!
              </span>
              <span className="text-[#954832] font-bold">100%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#ffd8e8] overflow-hidden">
              <div className="h-full bg-[#954832] rounded-full w-full" />
            </div>
          </div>

          {/* Cart Items List */}
          {items.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#ffe8f0] flex items-center justify-center text-[#847377]">
                <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
              </div>
              <p className="font-display text-base text-[#320f22] font-bold">
                Tu neceser está vacío
              </p>
              <p className="text-xs text-[#524347] max-w-xs">
                Selecciona uno de los 6 tonos de nuestra colección para comenzar tu experiencia sensorial.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#50172f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6b2d45]"
              >
                Explorar Tonos
              </button>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.shade.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#fff0f4]/70 border border-[#ffd8e8] shadow-sm"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#ffe8f0] flex-shrink-0 relative">
                    <img
                      alt={item.shade.name}
                      className="w-full h-full object-cover"
                      src={PRODUCT_IMAGE_URL}
                    />
                    <div
                      className="absolute bottom-1 right-1 w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: item.shade.hex }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#954832] uppercase tracking-widest font-bold">
                          Edición 2026
                        </p>
                        <h3 className="font-semibold text-sm text-[#320f22] truncate">
                          Blush Cremoso — {item.shade.name}
                        </h3>
                        <p className="text-xs text-[#524347]">15g / 0.5 oz</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.shade.id)}
                        className="text-[#847377] hover:text-red-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-full bg-white border border-[#ffd8e8] p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.shade.id, -1)}
                          aria-label="Reducir cantidad"
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#ffe8f0] text-[#320f22] font-bold text-sm cursor-pointer"
                        >
                          −
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#320f22]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.shade.id, 1)}
                          aria-label="Aumentar cantidad"
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#ffe8f0] text-[#320f22] font-bold text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-display font-bold text-sm text-[#50172f]">
                        {(item.shade.price * item.quantity).toFixed(2).replace('.', ',')}€
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Complimentary Samples reminder */}
              <div className="p-3 rounded-2xl bg-[#ffe8f0]/80 border border-[#ffd8e8] flex items-center gap-2.5 text-xs text-[#50172f]">
                <span className="material-symbols-outlined text-[#954832] text-[18px]">
                  card_giftcard
                </span>
                <span>
                  <strong>Regalo incluido:</strong> 2 muestras herméticas de prueba para probar sin
                  abrir el frasco.
                </span>
              </div>
            </div>
          )}

          {/* Trust Badges inside Drawer */}
          {items.length > 0 && (
            <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-[#ffd8e8]">
              <div className="flex items-center gap-2 text-xs text-[#524347]">
                <span className="material-symbols-outlined text-[#954832] text-[18px]">cached</span>
                <span>Garantía de Tono Exacto: cambio gratuito 30 días</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#524347]">
                <span className="material-symbols-outlined text-[#50172f] text-[18px]">
                  health_and_safety
                </span>
                <span>Fórmula estéril y sellada de laboratorio</span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-6 bg-[#fff0f4]/90 backdrop-blur-md border-t border-[#ffd8e8] flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between text-[#524347]">
                <span>Subtotal estimado</span>
                <span className="font-mono">{subtotal.toFixed(2).replace('.', ',')}€</span>
              </div>
              <div className="flex justify-between text-[#524347]">
                <span>IVA incluido (21%)</span>
                <span className="font-mono">{tax.toFixed(2).replace('.', ',')}€</span>
              </div>
              <div className="flex justify-between text-[#954832] font-semibold">
                <span>Envío 24-48h</span>
                <span className="uppercase tracking-wider">Gratis</span>
              </div>
              <div className="flex justify-between text-[#320f22] pt-2 border-t border-[#ffd8e8] text-base font-bold">
                <span>Total Final</span>
                <span className="font-display text-[#50172f] text-lg font-bold">
                  {subtotal.toFixed(2).replace('.', ',')}€
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 rounded-full bg-[#50172f] text-white hover:bg-[#6b2d45] active:scale-[0.98] transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_12px_28px_-6px_rgba(107,45,69,0.35)] cursor-pointer"
            >
              <span>Tramitar Pedido Seguro</span>
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[#847377] text-[11px]">
              <span>Apple Pay</span>
              <span>•</span>
              <span>Tarjeta Bancaria</span>
              <span>•</span>
              <span>Klarna 3 cuotas</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
