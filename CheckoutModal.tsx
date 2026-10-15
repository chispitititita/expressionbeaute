import React, { useState } from 'react';
import { CartItem, Shade } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  allShades: Shade[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  allShades,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    allShades[0]?.id || 'ballet-rose',
    allShades[2]?.id || 'bronce-solar',
  ]);
  const [formData, setFormData] = useState({
    name: 'Katia Sánchez',
    email: 'katia.sanchez.lo@usb.edu.mx',
    address: 'Passeig de Gràcia 45, 3º 2ª',
    postalCode: '08007',
    city: 'Barcelona',
    paymentMethod: 'card',
  });
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.shade.price * item.quantity, 0);

  const toggleSample = (shadeId: string) => {
    if (selectedSamples.includes(shadeId)) {
      if (selectedSamples.length > 1) {
        setSelectedSamples(selectedSamples.filter((id) => id !== shadeId));
      }
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, shadeId]);
      } else {
        setSelectedSamples([selectedSamples[1], shadeId]);
      }
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `EB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderRef(newRef);
    setStep('success');
    onOrderCompleted();
  };

  return (
    <div className="fixed inset-0 bg-[#50172f]/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#ffd8e8] max-h-[90vh] overflow-y-auto animate-scaleUp">
        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#ffd8e8]">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#954832] font-bold">
                  Finalizar Compra
                </span>
                <h3 className="font-display text-2xl text-[#50172f] font-bold">
                  Tramitación Segura SSL
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#ffe8f0] text-[#320f22] flex items-center justify-center hover:bg-[#ffd8e8]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Free Samples Picker */}
            <div className="p-4 rounded-2xl bg-[#fff0f4] border border-[#ffd8e8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#50172f] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#954832]">
                    card_giftcard
                  </span>
                  Elige tus 2 muestras de prueba gratuitas (Garantía de Tono Exacto):
                </span>
                <span className="text-[11px] text-[#954832] font-bold">
                  {selectedSamples.length}/2 seleccionadas
                </span>
              </div>
              <p className="text-xs text-[#524347] mb-3">
                Pruébalas en tu casa antes de romper el sello del tarro principal. Si prefieres otro
                tono, el cambio es 100% gratuito.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allShades.map((shade) => {
                  const isChecked = selectedSamples.includes(shade.id);
                  return (
                    <button
                      key={shade.id}
                      type="button"
                      onClick={() => toggleSample(shade.id)}
                      className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#50172f] bg-[#ffe8f0] text-[#50172f] font-bold shadow-xs'
                          : 'border-[#ffd8e8] bg-white text-[#524347] hover:bg-[#fff0f4]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="text-xs truncate">{shade.name}</span>
                      {isChecked && (
                        <span className="material-symbols-outlined text-[14px] ml-auto text-[#50172f]">
                          check
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#50172f] uppercase tracking-wider">
                Dirección de Envío (Entrega 24/48h Gratuita)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#847377] block mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#320f22] focus:outline-none focus:ring-1 focus:ring-[#50172f]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#847377] block mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#320f22] focus:outline-none focus:ring-1 focus:ring-[#50172f]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-[#847377] block mb-1">
                    Dirección postal
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#320f22] focus:outline-none focus:ring-1 focus:ring-[#50172f]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#847377] block mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#320f22] focus:outline-none focus:ring-1 focus:ring-[#50172f]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#847377] block mb-1">
                    Ciudad / Provincia
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#320f22] focus:outline-none focus:ring-1 focus:ring-[#50172f]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#50172f] uppercase tracking-wider">
                Método de Pago Preferido
              </span>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#50172f] bg-[#ffe8f0] text-[#50172f] font-bold'
                      : 'border-[#ffd8e8] bg-white text-[#524347]'
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="sr-only"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  />
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                  <span className="text-xs">Tarjeta Bancaria</span>
                </label>
                <label
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    formData.paymentMethod === 'apple'
                      ? 'border-[#50172f] bg-[#ffe8f0] text-[#50172f] font-bold'
                      : 'border-[#ffd8e8] bg-white text-[#524347]'
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="sr-only"
                    checked={formData.paymentMethod === 'apple'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                  />
                  <span className="material-symbols-outlined text-[20px]">contactless</span>
                  <span className="text-xs">Apple Pay</span>
                </label>
                <label
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    formData.paymentMethod === 'klarna'
                      ? 'border-[#50172f] bg-[#ffe8f0] text-[#50172f] font-bold'
                      : 'border-[#ffd8e8] bg-white text-[#524347]'
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="sr-only"
                    checked={formData.paymentMethod === 'klarna'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'klarna' })}
                  />
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                  <span className="text-xs">Klarna 3 plazos</span>
                </label>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#ffd8e8] flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-bold text-[#320f22]">
                <span>Total a Pagar (IVA e Envío Exprés incluidos)</span>
                <span className="font-display text-xl text-[#50172f]">
                  {subtotal.toFixed(2).replace('.', ',')}€
                </span>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#50172f] text-white hover:bg-[#6b2d45] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Confirmar Pedido y Enviar a Mi Dirección</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center text-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <span className="text-xs text-[#954832] font-bold uppercase tracking-widest">
              ¡Pedido Confirmado con Éxito!
            </span>
            <h3 className="font-display text-2xl text-[#50172f] font-bold">
              Gracias, {formData.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#524347] max-w-md leading-relaxed">
              Hemos recibido tu orden <strong className="text-[#50172f] font-mono">{orderRef}</strong>.
              Tu rubor junto a las 2 muestras de cortesía se encuentran en preparación estéril en
              nuestro atelier de Barcelona.
            </p>

            <div className="w-full p-4 rounded-2xl bg-[#fff0f4] border border-[#ffd8e8] text-left text-xs text-[#524347] flex flex-col gap-1.5 my-2">
              <div className="flex justify-between">
                <span className="font-bold text-[#50172f]">Destino:</span>
                <span>
                  {formData.address}, {formData.city} ({formData.postalCode})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#50172f]">Plazo de Entrega:</span>
                <span className="text-emerald-700 font-bold">24-48 horas laborables</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#50172f]">Garantía activa:</span>
                <span>30 días para cambio sin coste de porte</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-2 px-8 py-3 rounded-full bg-[#50172f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6b2d45]"
            >
              Volver a la Boutique
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
