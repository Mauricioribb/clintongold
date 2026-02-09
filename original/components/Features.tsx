
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Zap, HandCoins, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';

const FEATURE_LIST = [
  {
    icon: <ShieldCheck size={40} />,
    title: "Avaliação Gratuita",
    description: "Equipe técnica especializada para garantir o valor justo do seu patrimônio com precisão cirúrgica."
  },
  {
    icon: <Zap size={40} />,
    title: "Atendimento Rápido",
    description: "Processos ágeis e desburocratizados. Valorizamos seu tempo tanto quanto seus bens."
  },
  {
    icon: <HandCoins size={40} />,
    title: "Pagamento Imediato",
    description: "Transferência instantânea via PIX ou TED logo após o fechamento da negociação segura."
  },
  {
    icon: <EyeOff size={40} />,
    title: "Sigilo Absoluto",
    description: "Transações discretas em ambiente privativo. Sua privacidade é nossa prioridade máxima."
  }
];

const Features: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % FEATURE_LIST.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + FEATURE_LIST.length) % FEATURE_LIST.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleManualNav = (index: number) => {
    setActiveIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#d4af37_0%,_transparent_70%)] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold text-sm font-bold tracking-[0.4em] uppercase mb-4">Nossos Diferenciais</h2>
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">Por que escolher a Clinton Gold?</h3>
        </div>

        <div className="relative flex items-center justify-center min-h-[450px]">
          <button 
            onClick={prevSlide}
            className="absolute left-0 md:left-4 z-30 p-3 rounded-full bg-white/10 hover:bg-gold text-white hover:text-black transition-all duration-300 hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 md:right-4 z-30 p-3 rounded-full bg-white/10 hover:bg-gold text-white hover:text-black transition-all duration-300 hidden md:block"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex items-center justify-center w-full relative h-full">
            {FEATURE_LIST.map((feature, idx) => {
              const isActive = idx === activeIndex;
              const isPrev = idx === (activeIndex - 1 + FEATURE_LIST.length) % FEATURE_LIST.length;
              const isNext = idx === (activeIndex + 1) % FEATURE_LIST.length;
              
              let positionClass = "opacity-0 scale-50 pointer-events-none absolute";
              if (isActive) positionClass = "opacity-100 scale-110 z-20 relative";
              else if (isPrev) positionClass = "opacity-40 scale-90 -translate-x-[70%] md:-translate-x-[110%] z-10 absolute hidden sm:flex";
              else if (isNext) positionClass = "opacity-40 scale-90 translate-x-[70%] md:translate-x-[110%] z-10 absolute hidden sm:flex";

              return (
                <div 
                  key={idx}
                  onClick={() => handleManualNav(idx)}
                  className={`transition-all duration-700 ease-in-out cursor-pointer flex flex-col items-center text-center p-10 md:p-14 bg-white text-black rounded-[10px] shadow-2xl w-full max-w-[320px] md:max-w-[400px] border border-black/5 ${positionClass}`}
                >
                  <div className="mb-8 text-black transform transition-transform group-hover:scale-110 duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                  
                  {isActive && (
                    <div className="mt-8 w-12 h-1 bg-gold rounded-full animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {FEATURE_LIST.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManualNav(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === activeIndex ? 'w-10 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ir para o recurso ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
