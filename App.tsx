/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SHADES } from './data/shades';
import { Shade, CartItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ShadeGallery } from './components/ShadeGallery';
import { FormulaSection } from './components/FormulaSection';
import { ApplicationGuideSection } from './components/ApplicationGuideSection';
import { GuaranteeSection } from './components/GuaranteeSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SubtoneQuizModal } from './components/SubtoneQuizModal';
import { VirtualSwatchTesterModal } from './components/VirtualSwatchTesterModal';
import { SearchModal } from './components/SearchModal';
import { AdvisorChatModal } from './components/AdvisorChatModal';
import { ProfileModal } from './components/ProfileModal';
import { Footer } from './components/Footer';

export default function App() {
  const [shades] = useState<Shade[]>(SHADES);
  // Default selected shade matching mockup: Nude Terracota
  const [selectedShade, setSelectedShade] = useState<Shade>(SHADES[1]);
  const [activeSubtoneFilter, setActiveSubtoneFilter] = useState<'all' | 'frio' | 'calido' | 'profundo'>('all');

  // Initial cart with 1 item as shown in user's mockup ("Bolsa de compras con 2 o 1 producto")
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      shade: SHADES[1], // Nude Terracota
      quantity: 1,
    },
  ]);

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubtoneQuizOpen, setIsSubtoneQuizOpen] = useState(false);
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false);
  const [isAdvisorChatOpen, setIsAdvisorChatOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Floating Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleAddToCart = (shade: Shade) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.shade.id === shade.id);
      if (existing) {
        return prev.map((item) =>
          item.shade.id === shade.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { shade, quantity: 1 }];
    });
    showToast(`¡Tono ${shade.name} añadido a tu neceser!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (shadeId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.shade.id === shadeId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (shadeId: string) => {
    setCartItems((prev) => prev.filter((item) => item.shade.id !== shadeId));
    showToast('Producto retirado de la bolsa.');
  };

  const handleSelectShade = (shade: Shade) => {
    setSelectedShade(shade);
    showToast(`Tono seleccionado: ${shade.name}`);
  };

  const handleOpenVirtualTryOnWithShade = (shade: Shade) => {
    setSelectedShade(shade);
    setIsVirtualTryOnOpen(true);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    showToast('¡Pedido completado con éxito! Recibirás confirmación por correo.');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fff8f8] text-[#320f22] font-body flex flex-col selection:bg-[#ffd9e3] selection:text-[#3b051e]">
      {/* Top Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectSubtoneFilter={(filter) => setActiveSubtoneFilter(filter)}
        activeSubtoneFilter={activeSubtoneFilter}
        shades={shades}
        onSelectShade={handleSelectShade}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20 flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          shades={shades}
          selectedShade={selectedShade}
          onSelectShade={handleSelectShade}
          onAddToCart={handleAddToCart}
          onOpenShadeQuiz={() => setIsSubtoneQuizOpen(true)}
          onOpenVirtualTryOn={() => setIsVirtualTryOnOpen(true)}
        />

        {/* 2. Tone Gallery with subtone filtering */}
        <ShadeGallery
          shades={shades}
          activeFilter={activeSubtoneFilter}
          onFilterChange={(filter) => setActiveSubtoneFilter(filter)}
          onAddToCart={handleAddToCart}
          onSelectShade={handleSelectShade}
          onOpenVirtualTryOnWithShade={handleOpenVirtualTryOnWithShade}
        />

        {/* 3. Formula & Active Ingredients */}
        <FormulaSection />

        {/* 4. Application Guide */}
        <ApplicationGuideSection />

        {/* 5. Satisfaction Guarantee & Diagnostic Consultation */}
        <GuaranteeSection onOpenQuiz={() => setIsSubtoneQuizOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLiveChat={() => setIsAdvisorChatOpen(true)}
        onOpenSubtoneQuiz={() => setIsSubtoneQuizOpen(true)}
        onShowToast={showToast}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        allShades={shades}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Subtone Diagnostic Quiz Modal */}
      <SubtoneQuizModal
        isOpen={isSubtoneQuizOpen}
        onClose={() => setIsSubtoneQuizOpen(false)}
        shades={shades}
        onApplyShade={(shade) => {
          setSelectedShade(shade);
          showToast(`¡Tono armónico ${shade.name} seleccionado!`);
        }}
      />

      {/* Virtual Try-On Swatch Simulation Modal */}
      <VirtualSwatchTesterModal
        isOpen={isVirtualTryOnOpen}
        onClose={() => setIsVirtualTryOnOpen(false)}
        shades={shades}
        initialShade={selectedShade}
        onSelectAndAddToCart={(shade) => {
          setSelectedShade(shade);
          handleAddToCart(shade);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        shades={shades}
        onSelectShade={handleSelectShade}
        onAddToCart={handleAddToCart}
      />

      {/* Beauty Advisor Concierge Chat Modal */}
      <AdvisorChatModal
        isOpen={isAdvisorChatOpen}
        onClose={() => setIsAdvisorChatOpen(false)}
      />

      {/* VIP Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        preferredShade={selectedShade}
        onSelectShade={handleSelectShade}
      />

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#50172f] text-white shadow-2xl backdrop-blur-md border border-[#ffd9e3]/30 animate-slideUp">
          <span className="material-symbols-outlined text-[20px] text-[#ffd9df]">
            check_circle
          </span>
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
