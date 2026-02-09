
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: "https://clintongold.com.br/storage/2024/08/banner-joias.webp",
    alt: "Joias Clinton Gold - O presente perfeito"
  },
  {
    id: 2,
    image: "https://clintongold.com.br/storage/2024/08/banner-compra-ouro.webp",
    alt: "Compramos Ouro e Joias - Clinton Gold"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };
  
  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="pt-28 pb-12 bg-black px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-[1280px] relative h-[250px] md:h-[400px] overflow-hidden rounded-[10px] shadow-2xl group bg-black">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (index === 0) target.src = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070";
                else target.src = "https://images.unsplash.com/photo-1584305323473-d674412114c1?q=80&w=2070";
              }}
            />
          </div>
        ))}

        <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

        <div className="absolute inset-0 z-20 flex items-center justify-between px-4 md:px-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevSlide}
            className="p-3 md:p-4 rounded-full bg-black/40 backdrop-blur-md text-gold hover:bg-gold hover:text-black transition-all duration-300 pointer-events-auto"
            aria-label="Slide Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 md:p-4 rounded-full bg-black/40 backdrop-blur-md text-gold hover:bg-gold hover:text-black transition-all duration-300 pointer-events-auto"
            aria-label="Próximo Slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="group py-2 focus:outline-none"
              aria-label={`Ir para o slide ${i + 1}`}
            >
              <div className={`h-1 transition-all duration-500 rounded-full ${
                i === currentSlide ? 'w-10 bg-gold' : 'w-4 bg-white/30 group-hover:bg-white/50'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
