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
import { executeQuery } from '../lib/db-helper';
import { getSettings } from '../lib/settings';

// ISR: Revalida apenas quando solicitado via /api/revalidate
export const revalidate = false; // Cache permanente

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM products ORDER BY createdAt DESC'
    );
    const products: Product[] = results || [];
    
    // Filtrar apenas produtos ativos e pegar os últimos 8
    return products
      .filter(p => {
        const isActive = typeof p.active === 'number' ? p.active === 1 : p.active !== false;
        return isActive;
      })
      .slice(0, 8);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

async function getHighlightedProducts(): Promise<Product[]> {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM products ORDER BY createdAt DESC'
    );
    const products: Product[] = results || [];
    
    // Filtrar produtos ativos com tag "Destaque"
    return products
      .filter(p => {
        const isActive = typeof p.active === 'number' ? p.active === 1 : p.active !== false;
        return isActive && p.tag === 'Destaque';
      });
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    return [];
  }
}

async function getSliderImages(): Promise<SliderImage[]> {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM slider_images ORDER BY "order" ASC'
    );
    const images: SliderImage[] = results || [];
    
    // Filtrar apenas imagens ativas
    return images
      .filter(img => {
        const isActive = typeof img.active === 'number' ? img.active === 1 : img.active === true;
        return isActive;
      });
  } catch (error) {
    console.error('Erro ao buscar slider:', error);
    return [];
  }
}

export default async function HomePage() {
  // Buscar dados em paralelo das APIs internas
  const [featuredProducts, highlightedProducts, sliderImages, settings] = await Promise.all([
    getFeaturedProducts(),
    getHighlightedProducts(),
    getSliderImages(),
    getSettings()
  ]);

  // Verificar se vendas estão desativadas
  const salesDisabled = settings.sales_disabled === 'true';

  return (
    <Layout>
      <Hero slides={sliderImages} />
      {/* Carrossel de Produtos em Destaque com foto de fundo - Ocultar se vendas desativadas */}
      {!salesDisabled && highlightedProducts.length > 0 && (
        <FeaturedProductCarousel products={highlightedProducts} />
      )}
      <BrandMessage />
      <Features />
      <About />
      
      {/* Produtos em Destaque - Ocultar se vendas desativadas */}
      {!salesDisabled && featuredProducts.length > 0 && (
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
