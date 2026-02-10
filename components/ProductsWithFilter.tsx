'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

const PRODUCTS_PER_PAGE = 12;

interface ProductsWithFilterProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsWithFilter({ products, categories }: ProductsWithFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  // Filtrar produtos por categoria
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(product => product.categoryId === selectedCategory);
  }, [products, selectedCategory]);

  // Resetar contagem ao mudar de categoria
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-8">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)}
                className="inline-block px-12 py-4 border border-gold text-gold rounded-full font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
              >
                Mostrar Mais
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Não encontrou o que procura? Entre em contato conosco para uma peça sob medida.
            </p>
            <a
              href="https://wa.me/5571991369104"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 border border-gold text-gold rounded-full font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
            >
              Solicitar Orçamento
            </a>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-6">
            Nenhum produto encontrado nesta categoria. Entre em contato conosco para mais informações.
          </p>
          <a
            href="https://wa.me/5571991369104"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 border border-gold text-gold rounded-full font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>
      )}
    </>
  );
}
