'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import BrandMessage from '../components/BrandMessage';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import Link from 'next/link';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Buscar produtos em destaque
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const products: Product[] = await response.json();
          // Filtrar apenas produtos ativos e com tag "Destaque"
          const featured = products
            .filter(p => {
              const isActive = typeof p.active === 'number' ? p.active === 1 : p.active !== false;
              return isActive && p.tag === 'Destaque';
            })
            .slice(0, 8); // Limitar a 8 produtos
          setFeaturedProducts(featured);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <Layout>
      <Hero />
      <BrandMessage />
      <Features />
      
      {/* Produtos em Destaque */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-black px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Coleções Exclusivas</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-white">Produtos em Destaque</h3>
              <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link
                href="/joias"
                className="inline-block px-12 py-5 border border-gold text-gold rounded-full font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300"
              >
                Ver Todos os Produtos
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
