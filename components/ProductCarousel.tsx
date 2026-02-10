'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useSettings } from './SettingsProvider';
import Link from 'next/link';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) {
    return null;
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 bg-black px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Destaques
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-tight text-white">
            Produtos em Destaque
          </h3>
          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Carrossel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(products.length / itemsPerView) * 100}%`
              }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / products.length}%` }}
                >
                  <ProductCardCompact product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Navegação */}
          {products.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 p-3 rounded-full bg-gold/20 hover:bg-gold text-white backdrop-blur-sm transition-all z-10"
                aria-label="Slide anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 p-3 rounded-full bg-gold/20 hover:bg-gold text-white backdrop-blur-sm transition-all z-10"
                aria-label="Próximo slide"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicadores */}
          {products.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * itemsPerView)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerView) === index
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

// Componente de Card Compacto
interface ProductCardCompactProps {
  product: Product;
}

const ProductCardCompact: React.FC<ProductCardCompactProps> = ({ product }) => {
                const whatsappMsg = `Olá, tenho interesse no produto: ${product.name} (Ref: ${product.reference})`;
                const finalLink = `${whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-neutral-100 h-full">
      {/* Imagem Compacta - 1x1 sem espaçamento */}
      <div className="relative aspect-square overflow-hidden bg-neutral-50/50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm text-[8px] text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded-full font-bold tracking-widest uppercase">
            Ref: {product.reference}
          </span>
        </div>
      </div>
      
      {/* Conteúdo Compacto */}
      <div className="p-3 flex flex-col flex-grow text-center">
        <h3 className="text-[10px] font-bold text-neutral-800 mb-1 line-clamp-2 uppercase tracking-tight min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="mb-3">
          <span className="text-gold font-bold text-xs">
            {product.price === 0 ? 'Sob Consulta' : `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          </span>
        </div>
        
        {/* Botões Compactos */}
        <div className="mt-auto space-y-1.5">
          <Link
            href={`/joias/${product.id}`}
            className="w-full flex items-center justify-center space-x-1 border border-neutral-200 text-neutral-500 py-1.5 rounded-lg font-bold uppercase tracking-widest text-[8px] hover:bg-neutral-50 transition-all"
          >
            <span>Ver Detalhes</span>
          </Link>

          <a 
            href={finalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-1 bg-[#25D366] text-white py-1.5 rounded-lg font-bold uppercase tracking-widest text-[8px] hover:bg-[#20ba5a] transition-all shadow-sm"
          >
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
