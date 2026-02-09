import Layout from '../components/Layout';
import Hero from '../components/Hero';
import BrandMessage from '../components/BrandMessage';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import { Product, SliderImage } from '../types';
import Link from 'next/link';

// ISR: Revalida a cada 60 segundos
export const revalidate = 60;

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // Buscar da API interna - usar URL relativa para SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (typeof window === 'undefined' 
                     ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
                     : '');
    
    const apiUrl = baseUrl ? `${baseUrl}/api/products` : '/api/products';
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache por 60 segundos
      cache: 'no-store' // Forçar busca sempre (ISR cuida do cache)
    });

    if (!response.ok) {
      return [];
    }

    const products: Product[] = await response.json();
    
    // Filtrar produtos ativos com tag "Destaque"
    return products
      .filter(p => {
        const isActive = typeof p.active === 'number' ? p.active === 1 : p.active !== false;
        return isActive && p.tag === 'Destaque';
      })
      .slice(0, 8);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

async function getSliderImages(): Promise<SliderImage[]> {
  try {
    // Buscar da API interna - usar URL relativa para SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (typeof window === 'undefined' 
                     ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
                     : '');
    
    const apiUrl = baseUrl ? `${baseUrl}/api/slider` : '/api/slider';
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache por 60 segundos
      cache: 'no-store' // Forçar busca sempre (ISR cuida do cache)
    });

    if (!response.ok) {
      return [];
    }

    const images: SliderImage[] = await response.json();
    
    // Filtrar apenas imagens ativas e ordenar
    return images
      .filter(img => {
        const isActive = typeof img.active === 'number' ? img.active === 1 : img.active === true;
        return isActive;
      })
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Erro ao buscar slider:', error);
    return [];
  }
}

export default async function HomePage() {
  // Buscar dados em paralelo das APIs internas
  const [featuredProducts, sliderImages] = await Promise.all([
    getFeaturedProducts(),
    getSliderImages()
  ]);

  return (
    <Layout>
      <Hero slides={sliderImages} />
      <BrandMessage />
      <Features />
      
      {/* Produtos em Destaque */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-black px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">
                Coleções Exclusivas
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-white">
                Produtos em Destaque
              </h3>
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
