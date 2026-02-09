
import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

const Products: React.FC = () => {
  return (
    <section id="joias" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Coleções Exclusivas</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Joias Sob Encomenda</h3>
          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-12 py-5 border border-gold text-gold rounded-full font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300">
            Ver Todos os Produtos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;