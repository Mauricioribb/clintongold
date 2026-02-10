'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Auto-play das imagens no lightbox
  useEffect(() => {
    if (!selectedProduct) {
      setCurrentImageIndex(0);
      return;
    }
    
    const galleryArray = Array.isArray(selectedProduct.gallery) ? selectedProduct.gallery : [];
    const images = [
      selectedProduct.image,
      ...galleryArray.filter((img: string | null) => img && typeof img === 'string' && img.trim() !== '')
    ].filter(Boolean);

    if (images.length <= 1) return;
    
    setCurrentImageIndex(0); // Reset ao abrir
    
    const imageCount = images.length;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(interval);
  }, [selectedProduct]);

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

  const images = useMemo(() => {
    if (!selectedProduct || !selectedProduct.image) return [];
    
    // Parsear gallery se for string JSON
    let galleryArray: string[] = [];
    if (selectedProduct.gallery) {
      if (typeof selectedProduct.gallery === 'string') {
        try {
          galleryArray = JSON.parse(selectedProduct.gallery);
        } catch (e) {
          // Se não for JSON válido, tratar como string simples
          galleryArray = [selectedProduct.gallery];
        }
      } else if (Array.isArray(selectedProduct.gallery)) {
        galleryArray = selectedProduct.gallery;
      }
    }
    
    // Filtrar imagens válidas e diferentes da principal
    const validGalleryImages = galleryArray.filter((img: any) => {
      return img && typeof img === 'string' && img.trim() !== '' && img !== selectedProduct.image;
    });
    
    return [selectedProduct.image, ...validGalleryImages].filter(Boolean);
  }, [selectedProduct]);

  const whatsappMsg = selectedProduct 
    ? `Olá, tenho interesse no produto: ${selectedProduct.name} (Ref: ${selectedProduct.reference})`
    : '';
  const finalLink = selectedProduct ? `${whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}` : '';

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Auto-play das imagens no lightbox
  useEffect(() => {
    if (!selectedProduct) {
      setCurrentImageIndex(0);
      return;
    }

    if (images.length <= 1) return;
    
    setCurrentImageIndex(0); // Reset ao abrir
    
    const imageCount = images.length;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(interval);
  }, [selectedProduct, images.length]);

  if (!isOpen) return null;

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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
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
            <div className="md:w-[30%] bg-neutral-50 relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-neutral-100 min-h-[300px]">
              {images.length > 0 && images[currentImageIndex] && (
                <img 
                  src={images[currentImageIndex]} 
                  alt={selectedProduct.name} 
                  className="max-w-full max-h-[35vh] md:max-h-[60vh] object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = selectedProduct.image; // Fallback para imagem principal
                  }}
                />
              )}
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      prevImage();
                    }} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-gray-50 rounded-full text-black shadow-xl transition-all z-[100] border-2 border-gray-400 hover:border-gray-600"
                    aria-label="Imagem anterior"
                    type="button"
                  >
                    <ChevronLeft size={28} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      nextImage();
                    }} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-gray-50 rounded-full text-black shadow-xl transition-all z-[100] border-2 border-gray-400 hover:border-gray-600"
                    aria-label="Próxima imagem"
                    type="button"
                  >
                    <ChevronRight size={28} strokeWidth={3} />
                  </button>
                  
                  {/* Indicador de posição */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[100]">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-black w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Ir para imagem ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Informações (70% de largura) */}
            <div className="md:w-[70%] p-8 md:p-14 flex flex-col overflow-y-auto">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-grow">
                  <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block">Exclusividade Clinton Gold</span>
                  <h2 className="text-3xl md:text-4xl font-black text-black uppercase mb-4 leading-none">{selectedProduct.name}</h2>
                  <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">SKU: {selectedProduct.reference}</p>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
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
