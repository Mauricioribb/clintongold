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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];
  const whatsappMsg = `Olá, tenho interesse no produto: ${currentProduct.name} (Ref: ${currentProduct.reference})`;
  const finalLink = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative h-[500px] md:h-[600px]">
        {/* Imagem de Fundo */}
        <div className="absolute inset-0">
          <img 
            src={currentProduct.image} 
            alt={currentProduct.name}
            className="w-full h-full object-cover"
          />
          {/* Overlay escuro para melhorar legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        </div>

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-12 md:pb-16">
            <div className="max-w-2xl">
              {/* Título */}
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
                {currentProduct.name}
              </h2>
              
              {/* Preço */}
              <div className="mb-8">
                <span className="text-gold font-black text-2xl md:text-4xl">
                  {currentProduct.price === 0 ? 'Sob Consulta' : `R$ ${currentProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </span>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/joias/${currentProduct.id}`}
                  className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-all"
                >
                  <Info size={20} />
                  <span>MAIS DETALHES</span>
                </Link>

                <a 
                  href={finalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold uppercase text-sm hover:bg-[#20ba5a] transition-all shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  <span>Comprar pelo WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Navegação */}
        {products.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all z-20"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all z-20"
              aria-label="Próximo slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Indicadores */}
        {products.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gold'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductCarousel;
