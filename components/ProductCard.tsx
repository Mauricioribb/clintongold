'use client';

import React, { useState } from 'react';
import { MessageCircle, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useSettings } from './SettingsProvider';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { whatsappUrl } = useSettings();

  const images = [product.image, ...(product.gallery || [])];
  const whatsappMsg = `Olá, tenho interesse no produto: ${product.name} (Ref: ${product.reference})`;
  const finalLink = `${whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="group bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-neutral-100">
        {/* Imagem do Produto 1x1 sem padding */}
        <div 
          className="relative aspect-square overflow-hidden bg-neutral-50/50 cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-[9px] text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
              Ref: {product.reference}
            </span>
          </div>
        </div>
        
        {/* Conteúdo do Card */}
        <div className="p-4 flex flex-col flex-grow text-center">
          <h3 className="text-[11px] font-bold text-neutral-800 mb-1 line-clamp-1 uppercase tracking-tight">
            {product.name}
          </h3>
          
          <div className="mb-4">
            <span className="text-gold font-bold text-sm">
              {product.price === 0 ? 'Sob Consulta' : `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            </span>
          </div>
          
          {/* Botões Compactos */}
          <div className="mt-auto space-y-2">
            <button 
              onClick={() => setIsLightboxOpen(true)}
              className="w-full flex items-center justify-center space-x-1.5 border border-neutral-200 text-neutral-500 py-2 rounded-[10px] font-bold uppercase tracking-widest text-[9px] hover:bg-neutral-50 transition-all"
            >
              <Info size={12} />
              <span>MAIS DETALHES</span>
            </button>

            <a 
              href={finalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-1 md:space-x-2 bg-[#25D366] text-white py-3 rounded-[10px] font-bold uppercase text-[10px] md:text-sm hover:bg-[#20ba5a] transition-all shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="md:w-5 md:h-5">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              <span className="whitespace-nowrap">
                <span className="md:hidden">Comprar WhatsApp</span>
                <span className="hidden md:inline">Comprar pelo WhatsApp</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-6xl bg-white rounded-[10px] overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Botão Fechar */}
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/5 hover:bg-black/10 rounded-full text-black transition-all"
            >
              <X size={24} />
            </button>

            {/* Galeria de Fotos (30% de largura) */}
            <div className="md:w-[30%] bg-neutral-50 relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-neutral-100">
              <img 
                src={images[currentImageIndex]} 
                alt={product.name} 
                className="max-w-full max-h-[35vh] md:max-h-[60vh] object-contain"
              />
              
              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 p-1.5 bg-white/80 hover:bg-white rounded-full text-black shadow-md transition-all"><ChevronLeft size={20} /></button>
                  <button onClick={nextImage} className="absolute right-2 p-1.5 bg-white/80 hover:bg-white rounded-full text-black shadow-md transition-all"><ChevronRight size={20} /></button>
                </>
              )}
            </div>

            {/* Informações (70% de largura) */}
            <div className="md:w-[70%] p-8 md:p-14 flex flex-col overflow-y-auto">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-grow">
                  <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block">Exclusividade Clinton Gold</span>
                  <h2 className="text-3xl md:text-4xl font-black text-black uppercase mb-4 leading-none">{product.name}</h2>
                  <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Referência Internacional: {product.reference}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest mb-1">Valor Estimado</p>
                  <p className="text-gold font-black text-4xl">
                    {product.price === 0 ? 'Sob Consulta' : `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  </p>
                </div>
              </div>
              
              <div className="h-px bg-neutral-100 w-full my-8"></div>
              
              <div className="flex-grow">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                  Descrição da Peça
                </h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {product.description || "Item disponível em nossa loja entre em contato"}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href={finalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center space-x-3 bg-[#25D366] text-white py-5 rounded-[10px] font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-[#20ba5a] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                >
                  <MessageCircle size={22} fill="currentColor" />
                  <span>Comprar pelo WhatsApp</span>
                </a>
                <button 
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-full sm:w-auto px-10 py-5 border border-neutral-200 text-neutral-400 rounded-[10px] font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-neutral-50 transition-all"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
