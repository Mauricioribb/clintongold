'use client';

import React from 'react';
import { useSettings } from './SettingsProvider';
import { Check } from 'lucide-react';

const DesapegueSection: React.FC = () => {
  const { whatsappUrl } = useSettings();

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 bg-gray-800 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-lg md:text-xl lg:text-2xl font-black uppercase mb-6 text-gold">
            Desapegue Agora e Comece uma Nova História!
          </h2>
          <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
            Deixe para trás o que não tem mais utilidade e transforme suas joias em dinheiro. Cada peça esquecida em sua casa pode se tornar um passo em direção a sonhos realizados, mais liberdade financeira e um futuro cheio de conquistas.
          </p>
        </div>

        {/* Card Nós Compramos */}
        <div className="bg-white rounded-[10px] p-6 md:p-8 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 text-center text-gold">
            NÓS COMPRAMOS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {[
              'Ouro',
              'Joias Quebradas ou Inteiras',
              'Relógios de Luxo',
              'Platina',
              'Paládio',
              'Prata',
              'Ródio',
              'Cautelas da Caixa Econômica (Penhor)',
              'Diamantes'
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="text-gold flex-shrink-0" size={20} />
                <span className="text-gray-800 text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gray-600 text-white rounded-[8px] font-bold uppercase tracking-wide text-xs md:text-sm hover:bg-gray-700 transition-all shadow-lg"
            >
              QUERO VENDER - CONTATO PELO WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesapegueSection;
