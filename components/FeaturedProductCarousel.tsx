'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';
import Link from 'next/link';

interface FeaturedProductCarouselProps {
  products: Product[];
}

const FeaturedProductCarousel: React.FC<FeaturedProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerViewMobile = 1;
  const itemsPerViewDesktop = 4;

  const nextSlide = () => {
    const maxIndex = Math.max(0, products.length - itemsPerViewDesktop);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, products.length - itemsPerViewDesktop);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, products.length - itemsPerViewDesktop);
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerViewDesktop);

  return (
    <section className="relative bg-black overflow-hidden py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative">
          {/* Carrossel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerViewDesktop)}%)`,
              }}
            >
              {products.map((product) => {
                const whatsappMsg = `Olá, tenho interesse no produto: ${product.name} (Ref: ${product.reference})`;
                const finalLink = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`;

                return (
                  <div 
                    key={product.id} 
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / itemsPerViewDesktop}%` }}
                  >
                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden group">
                      {/* Imagem de Fundo */}
                      <div className="absolute inset-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay escuro para melhorar legibilidade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
                      </div>

                      {/* Conteúdo sobreposto */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6">
                        {/* Título */}
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight line-clamp-2">
                          {product.name}
                        </h2>
                        
                        {/* Preço */}
                        <div className="mb-4">
                          <span className="text-gold font-black text-lg md:text-2xl">
                            {product.price === 0 ? 'Sob Consulta' : `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                          </span>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/joias/${product.id}`}
                            className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all"
                          >
                            <Info size={16} />
                            <span>MAIS DETALHES</span>
                          </Link>

                          <a 
                            href={finalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold uppercase text-xs hover:bg-[#20ba5a] transition-all shadow-lg"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                            </svg>
                            <span>Comprar pelo WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botões de Navegação */}
          {products.length > itemsPerViewDesktop && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all z-20"
                aria-label="Slide anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all z-20"
                aria-label="Próximo slide"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicadores */}
          {products.length > itemsPerViewDesktop && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(products.length / itemsPerViewDesktop) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * itemsPerViewDesktop)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerViewDesktop) === index
                      ? 'w-8 bg-gold'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCarousel;
