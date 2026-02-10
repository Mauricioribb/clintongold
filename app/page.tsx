import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import ProductCarousel from '../components/ProductCarousel';
import FeaturedProductCarousel from '../components/FeaturedProductCarousel';
import BrandMessage from '../components/BrandMessage';
import Features from '../components/Features';
import About from '../components/About';
import BrandsCarousel from '../components/BrandsCarousel';
import SellCTA from '../components/SellCTA';
import ProductCard from '../components/ProductCard';
import { Product, SliderImage } from '../types';
import Link from 'next/link';

// ISR: Cache permanente que revalida apenas quando solicitado
// Não definir revalidate = cache permanente

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // Cache permanente - revalida apenas quando chamar /api/revalidate
    const response = await fetch('/api/products', {
      cache: 'force-cache' // Cache permanente
    });

    if (!response.ok) {
      return [];
    }

    const products: Product[] = await response.json();
    
    // Filtrar apenas produtos ativos, ordenar pelos mais recentes e pegar os últimos 8
    return products
      .filter(p => {
        const isActive = typeof p.active === 'number' ? p.active === 1 : p.active !== false;
        return isActive;
      })
      .sort((a, b) => {
        // Ordenar por data de atualização ou criação (mais recente primeiro)
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
      })
      .slice(0, 8); // Pegar os últimos 8
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

async function getHighlightedProducts(): Promise<Product[]> {
  try {
    // Cache permanente - revalida apenas quando chamar /api/revalidate
    const response = await fetch('/api/products', {
      cache: 'force-cache' // Cache permanente
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
      .sort((a, b) => {
        // Ordenar por data de atualização ou criação (mais recente primeiro)
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
      });
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    return [];
  }
}

async function getSliderImages(): Promise<SliderImage[]> {
  try {
    // Cache permanente - revalida apenas quando chamar /api/revalidate
    const response = await fetch('/api/slider', {
      cache: 'force-cache' // Cache permanente
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
  const [featuredProducts, highlightedProducts, sliderImages] = await Promise.all([
    getFeaturedProducts(),
    getHighlightedProducts(),
    getSliderImages()
  ]);

  return (
    <Layout>
      <Hero slides={sliderImages} />
      {/* Carrossel de Produtos em Destaque com foto de fundo */}
      {highlightedProducts.length > 0 && (
        <FeaturedProductCarousel products={highlightedProducts} />
      )}
      <BrandMessage />
      <Features />
      <About />
      
      {/* Produtos em Destaque */}
      {featuredProducts.length > 0 && (
        <section className="py-12 md:py-24 bg-black px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
                  <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">
                    Joias Sob Encomenda
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-white">
                    Novos Produtos
                  </h3>
              <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
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
      <BrandsCarousel />
      <SellCTA />
    </Layout>
  );
}
