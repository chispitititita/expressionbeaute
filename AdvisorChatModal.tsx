import React, { useState } from 'react';

interface AdvisorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'advisor' | 'user';
  text: string;
  timestamp: string;
}

export const AdvisorChatModal: React.FC<AdvisorChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'advisor',
      text: '¡Bonjour! Soy Camille, especialista en visagismo de Expression Beauté. ¿En qué puedo guiarte hoy? Puedes consultarme sobre tonos para tu piel, ingredientes botánicos o técnicas de aplicación.',
      timestamp: 'Ahora',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    '¿Qué tono me favorece si tengo piel oliva?',
    '¿Se puede aplicar en labios y párpados?',
    '¿Obstruye poros o genera acné?',
    '¿Cómo funciona la muestra de prueba gratuita?',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Formulate expert cosmetic advisor response
    setTimeout(() => {
      let reply =
        'Nuestra formulación en crema a base de escualano y ácido hialurónico se funde de forma homogénea con cualquier base o directamente sobre piel hidratada sin marcar textura.';

      const lower = text.toLowerCase();
      if (lower.includes('oliva') || lower.includes('cetrina') || lower.includes('morena')) {
        reply =
          'Para pieles con matiz oliva o canela, recomendamos especialmente "Deep Plum" o "Nude Terracota". El subtono cálido-terroso neutraliza el matiz cenizo y aporta un resplandor dorado saludable.';
      } else if (lower.includes('labio') || lower.includes('ojo') || lower.includes('párpado')) {
        reply =
          '¡Totalmente! Es una fórmula multifunción estéril enriquecida con Vitamina E y cera de murumuru. Puedes aplicarlo a toquecitos en labios para un efecto "bitten lip" y en el párpado móvil como velo monocromático jugoso.';
      } else if (lower.includes('acné') || lower.includes('poro') || lower.includes('grasa')) {
        reply =
          'Fórmula estrictamente no comedogénica certificada: no contiene aceites minerales ni siliconas pesadas D4/D5. Las micropartículas esféricas difuminan la textura sin sedimentarse en poros dilatados.';
      } else if (lower.includes('muestra') || lower.includes('garantía') || lower.includes('devolución')) {
        reply =
          'Cada paquete incluye una monodosis hermética del tono adquirido + 2 muestras de tonos vecinos. Te invitamos a probar primero la muestra sin romper el precinto del frasco. Si no es tu tono perfecto, el cambio es 100% gratuito durante 30 días.';
      } else if (lower.includes('frio') || lower.includes('palida') || lower.includes('rosada')) {
        reply =
          'Para pieles claras con subtono frío o neutro, "Ballet Rose" y "Mauve Silvestre" son las joyas de la corona: aportan ese halo cristalino etéreo tipo "cold girl makeup" sumamente elegante.';
      }

      const advisorMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'advisor',
        text: reply,
        timestamp: 'Ahora',
      };
      setMessages((prev) => [...prev, advisorMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-[#50172f]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#ffd8e8] flex flex-col h-[560px] animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ffd8e8]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#50172f] text-white flex items-center justify-center font-bold">
              <span>EB</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <h3 className="font-display text-base text-[#320f22] font-bold">
                Atelier Visagisme Concierge
              </h3>
              <p className="text-[11px] text-[#847377]">En línea • Asesoría dermatológica en vivo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe8f0] text-[#320f22] flex items-center justify-center hover:bg-[#ffd8e8]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-3 my-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#50172f] text-white rounded-br-xs'
                    : 'bg-[#fff0f4] text-[#320f22] border border-[#ffd8e8] rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#847377] mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[10px] px-3 py-1.5 rounded-full bg-[#fff0f4] hover:bg-[#ffe8f0] text-[#50172f] font-semibold whitespace-nowrap border border-[#ffd8e8] cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="flex items-center gap-2 pt-2 border-t border-[#ffd8e8]"
        >
          <input
            type="text"
            placeholder="Escribe tu consulta sobre tonos o fórmula..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-full bg-[#fff0f4] border border-[#ffd8e8] text-xs text-[#320f22] placeholder:text-[#847377] focus:outline-none focus:ring-1 focus:ring-[#50172f]"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-[#50172f] hover:bg-[#6b2d45] text-white flex items-center justify-center shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
