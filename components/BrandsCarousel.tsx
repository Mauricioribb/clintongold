'use client';

import React, { useState, useRef, useEffect } from 'react';

const BRANDS = [
  { 
    name: 'Marca 1', 
    logo: '/imagens/marcas/img1.jpg' 
  },
  { 
    name: 'Marca 2', 
    logo: '/imagens/marcas/img2.jpg' 
  },
  { 
    name: 'Marca 3', 
    logo: '/imagens/marcas/img3.jpg' 
  },
  { 
    name: 'Marca 4', 
    logo: '/imagens/marcas/img4.jpg' 
  },
  { 
    name: 'Marca 5', 
    logo: '/imagens/marcas/03.jpg' 
  },
];

const BrandsCarousel: React.FC = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Distância mínima para considerar um swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Quantidade de scroll por swipe
      
      if (isLeftSwipe) {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      } else if (isRightSwipe) {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      }
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="py-12 md:py-24 bg-black overflow-hidden relative">
      {/* Divider sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-6 md:mb-16">
          <h4 className="text-white text-[18px] md:text-4xl font-bold uppercase tracking-tighter mb-2 md:mb-4">Especialistas em Marcas de Luxo</h4>
        </div>
        
        <div className="relative mt-8 md:mt-20 overflow-hidden">
          {/* Sombreamento lateral para fade infinito - apenas desktop */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-32 md:w-64 z-20 bg-gradient-to-r from-black via-black to-transparent pointer-events-none"></div>
          <div className="hidden md:block absolute inset-y-0 right-0 w-32 md:w-64 z-20 bg-gradient-to-l from-black via-black to-transparent pointer-events-none"></div>

          {/* Mobile: Scroll horizontal com swipe */}
          <div 
            ref={scrollContainerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="md:hidden flex overflow-x-auto scrollbar-hide items-center py-4 relative z-10 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {[...BRANDS, ...BRANDS].map((brand, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 mx-6 snap-center group transition-all duration-1000"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-24 w-auto object-contain rounded-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-700 ease-in-out" 
                />
              </div>
            ))}
          </div>

          {/* Desktop: Animação automática */}
          <div className="hidden md:flex animate-marquee-premium whitespace-nowrap items-center py-4 relative z-10">
            {/* Triplicamos para garantir o loop sem interrupção */}
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 mx-8 group transition-all duration-1000"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-24 w-auto object-contain rounded-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-700 ease-in-out" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
