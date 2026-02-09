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
    <section className="py-24 bg-black overflow-hidden relative">
      {/* Divider sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-4 opacity-80">Patrimônio & Prestígio</p>
          <h4 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">Especialistas em Marcas de Luxo</h4>
          <p className="text-neutral-500 text-sm font-medium max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
            Avaliamos e comercializamos as grifes mais desejadas do mundo com total expertise e transparência.
          </p>
        </div>
        
        <div className="relative mt-20">
          {/* Sombreamento lateral para fade infinito */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-10 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-10 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none"></div>

          <div className="flex animate-marquee-premium whitespace-nowrap items-center py-4">
            {/* Triplicamos para garantir o loop sem interrupção */}
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 mx-6 md:mx-8 group transition-all duration-1000"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-16 md:h-24 w-auto object-contain rounded-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-700 ease-in-out" 
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
