'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Star } from 'lucide-react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';
import Link from 'next/link';

interface FeaturedProductCarouselProps {
  products: Product[];
}

const FeaturedProductCarousel: React.FC<FeaturedProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Duplicar produtos para loop infinito
  const duplicatedProducts = [...products, ...products, ...products];

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 4);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Ajustar índice quando chegar nas extremidades
  useEffect(() => {
    if (!isTransitioning) {
      if (currentIndex >= products.length * 2) {
        // Se chegou no final duplicado, volta para o início sem animação
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(products.length);
          setIsTransitioning(false);
        }, 50);
      } else if (currentIndex < products.length) {
        // Se voltou muito para trás, vai para o final duplicado sem animação
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(products.length * 2 - itemsPerView);
          setIsTransitioning(false);
        }, 50);
      }
    }
  }, [currentIndex, products.length, itemsPerView, isTransitioning]);

  // Auto-play para loop infinito
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-black overflow-hidden py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative">
          {/* Carrossel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                transition: isTransitioning ? 'none' : 'transform 0.5s ease-in-out',
              }}
            >
              {duplicatedProducts.map((product, idx) => {
                const whatsappMsg = `Olá, tenho interesse no produto: ${product.name} (Ref: ${product.reference})`;
                const finalLink = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`;

                return (
                  <div 
                    key={`${product.id}-${idx}`} 
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden group">
                      {/* Imagem de Fundo */}
                      <div className="absolute inset-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay sutil */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      </div>

                      {/* Tag Destaque */}
                      <div className="absolute top-3 left-3 z-20 flex items-center space-x-1 bg-gold/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star size={10} className="text-black fill-black" />
                        <span className="text-black text-[9px] font-bold uppercase tracking-wider">Destaque</span>
                      </div>

                      {/* Conteúdo sobreposto - no bottom */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-3 md:p-4">
                        {/* Título e Preço - duas colunas */}
                        <div className="flex gap-2 mb-3">
                          <h2 className="flex-1 text-xs md:text-sm font-medium text-white/90 uppercase tracking-tight line-clamp-2">
                            {product.name}
                          </h2>
                          
                          <div className="flex-1 text-right">
                            <span className="text-white/80 font-semibold text-xs md:text-sm">
                              {product.price === 0 ? 'Sob Consulta' : `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                            </span>
                          </div>
                        </div>

                        {/* Botões - duas colunas */}
                        <div className="flex gap-2 w-full">
                          <Link
                            href={`/joias/${product.id}`}
                            className="flex-1 flex items-center justify-center space-x-1 text-white/80 hover:text-white text-[10px] md:text-xs font-medium uppercase tracking-wide transition-all"
                          >
                            <Info size={12} />
                            <span>Detalhes</span>
                          </Link>

                          <a 
                            href={finalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center space-x-1 text-white/80 hover:text-white text-[10px] md:text-xs font-medium uppercase tracking-wide transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="text-white">
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                            </svg>
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botões de Navegação - mais discretos */}
          {duplicatedProducts.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/60 hover:text-white backdrop-blur-sm transition-all z-20"
                aria-label="Slide anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/60 hover:text-white backdrop-blur-sm transition-all z-20"
                aria-label="Próximo slide"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCarousel;
