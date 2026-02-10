'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useSettings } from './SettingsProvider';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { whatsappUrl } = useSettings();

  // Buscar produtos quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          const activeProducts = Array.isArray(data) 
            ? data.filter((p: Product) => {
                const isActive = typeof p.active === 'number' ? p.active === 1 : p.active !== false;
                return isActive;
              })
            : [];
          setProducts(activeProducts);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar produtos:', error);
          setProducts([]);
          setLoading(false);
        });
      
      // Focar no input após um pequeno delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setFilteredProducts([]);
      setSelectedProduct(null);
    }
  }, [isOpen]);

  // Filtrar produtos baseado na busca
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const referenceMatch = product.reference.toLowerCase().includes(query);
      const descriptionMatch = product.description?.toLowerCase().includes(query);
      return nameMatch || referenceMatch || descriptionMatch;
    });

    setFilteredProducts(filtered.slice(0, 10)); // Limitar a 10 resultados
  }, [searchQuery, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProduct(null);
  };

  const nextImage = () => {
    if (selectedProduct) {
      const images = [selectedProduct.image, ...(selectedProduct.gallery || [])];
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      const images = [selectedProduct.image, ...(selectedProduct.gallery || [])];
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (!isOpen) return null;

  const images = selectedProduct ? [selectedProduct.image, ...(selectedProduct.gallery || [])] : [];
  const whatsappMsg = selectedProduct 
    ? `Olá, tenho interesse no produto: ${selectedProduct.name} (Ref: ${selectedProduct.reference})`
    : '';
  const finalLink = selectedProduct ? `${whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}` : '';

  return (
    <>
      {/* Modal de Busca */}
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4">
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        
        <div className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-[10px] shadow-2xl animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center gap-4 p-6 border-b border-neutral-200">
            <Search className="text-gold" size={24} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos por nome, referência ou descrição..."
              className="flex-1 bg-transparent text-black placeholder-gray-400 outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full text-gray-600 hover:text-black transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Resultados */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-12 text-center text-gray-500">
                <p>Carregando produtos...</p>
              </div>
            ) : searchQuery.trim() && filteredProducts.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p>Nenhum produto encontrado para "{searchQuery}"</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="p-4 space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-4 p-4 bg-neutral-50 hover:bg-neutral-100 rounded-[10px] cursor-pointer transition-all border border-transparent hover:border-gold/50"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-black font-bold text-sm mb-1 truncate">{product.name}</h3>
                      <p className="text-gray-600 text-xs">Ref: {product.reference}</p>
                      <p className="text-gold font-bold text-sm mt-1">
                        {product.price === 0 ? 'Sob Consulta' : `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p>Digite para buscar produtos...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox do Produto */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          ></div>
          
          <div className="relative w-full max-w-6xl bg-white rounded-[10px] overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Botão Fechar */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 bg-black/5 hover:bg-black/10 rounded-full text-black transition-all"
            >
              <X size={24} />
            </button>

            {/* Galeria de Fotos (30% de largura) */}
            <div className="md:w-[30%] bg-neutral-50 relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-neutral-100">
              <img 
                src={images[currentImageIndex]} 
                alt={selectedProduct.name} 
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
                  <h2 className="text-3xl md:text-4xl font-black text-black uppercase mb-4 leading-none">{selectedProduct.name}</h2>
                  <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Referência Internacional: {selectedProduct.reference}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest mb-1">Valor Estimado</p>
                  <p className="text-gold font-black text-4xl">
                    {selectedProduct.price === 0 ? 'Sob Consulta' : `R$ ${selectedProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
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
                  {selectedProduct.description || "Item disponível em nossa loja entre em contato"}
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
                  onClick={closeLightbox}
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

export default SearchModal;
