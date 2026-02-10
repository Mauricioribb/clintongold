import React from 'react';

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

          <div className="flex animate-marquee-premium whitespace-nowrap items-center py-4 relative z-10">
            {/* Triplicamos para garantir o loop sem interrupção */}
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 mx-6 md:mx-8 group transition-all duration-1000"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-24 md:h-24 w-auto object-contain rounded-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-700 ease-in-out" 
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
