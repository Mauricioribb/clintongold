
import React from 'react';
import { CONTACT_INFO } from '../constants';

const SellCTA: React.FC = () => {
  return (
    <section id="vender" className="py-12 bg-black px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gold-gradient rounded-[10px] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
          {/* Efeito de brilho ao passar o mouse */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-black text-sm md:text-base font-black uppercase tracking-[0.4em] mb-4">
              Não perca tempo
            </h2>
            <h3 className="text-2xl md:text-5xl font-black text-black uppercase tracking-tighter mb-10 leading-none">
              Venha já fazer um <span className="underline decoration-black/20 underline-offset-8">excelente negócio</span>
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-[10px] font-black uppercase tracking-widest text-xs hover:bg-neutral-800 transition-all shadow-xl active:scale-95"
              >
                Avaliar minhas Joias Agora
              </a>
              <button className="w-full sm:w-auto px-10 py-4 border-2 border-black/20 text-black rounded-[10px] font-black uppercase tracking-widest text-xs hover:bg-black/5 transition-all">
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellCTA;
