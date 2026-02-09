
import React, { useState } from 'react';
import { MessageCircle, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [product.image, ...(product.gallery || [])];
  const whatsappMsg = `Olá, tenho interesse no produto: ${product.name} (Ref: ${product.reference})`;
  const finalLink = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="group bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-neutral-100">
        {/* Imagem do Produto com Padding Generoso */}
        <div className="relative aspect-square overflow-hidden bg-neutral-50/50 p-8">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
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
              <span>Saiba Mais</span>
            </button>

            <a 
              href={finalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-1.5 bg-[#25D366] text-white py-2 rounded-[10px] font-bold uppercase tracking-widest text-[9px] hover:bg-[#20ba5a] transition-all shadow-sm"
            >
              <MessageCircle size={12} fill="currentColor" />
              <span>Comprar pelo WhatsApp</span>
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-grow">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                    Descrição da Peça
                  </h4>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {product.description || "Esta peça majestosa é o ápice da sofisticação da Clinton Gold. Confeccionada com metais de pureza certificada e um design que transcende gerações, esta joia representa não apenas um acessório, mas um investimento em beleza e tradição."}
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Cada detalhe, desde o polimento espelhado até a cravação artesanal, foi executado por mestres joalheiros para garantir que sua experiência seja inigualável e eterna.
                  </p>
                </div>
                
                <div className="space-y-6 bg-neutral-50 p-6 rounded-[10px] border border-neutral-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                    Detalhes Técnicos
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-bold uppercase tracking-tighter">Material</span>
                      <span className="text-black font-medium">Ouro 18k / Platina</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-bold uppercase tracking-tighter">Acabamento</span>
                      <span className="text-black font-medium">Polido de Alta Precisão</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-bold uppercase tracking-tighter">Certificação</span>
                      <span className="text-black font-medium">Garantia Clinton Gold Vitalícia</span>
                    </li>
                    <li className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-bold uppercase tracking-tighter">Disponibilidade</span>
                      <span className="text-green-600 font-bold">Sob Encomenda</span>
                    </li>
                  </ul>
                </div>
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
