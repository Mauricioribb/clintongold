import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';
import { executeQuery } from '../../lib/db-helper';

// ISR: Revalida apenas quando solicitado via /api/revalidate
export const revalidate = false; // Cache permanente

async function getProducts(): Promise<Product[]> {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM products ORDER BY createdAt DESC'
    );
    const products: Product[] = results || [];
    
    // Filtrar apenas produtos ativos
    return products
      .filter(p => {
        const isActive = typeof p.active === 'number' ? p.active === 1 : p.active !== false;
        return isActive;
      });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

export default async function JoiasPage() {
  const products = await getProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Nossas <span className="text-gold">Jóias</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Coleções exclusivas de joias sob encomenda. Peças únicas criadas com excelência e sofisticação.
          </p>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Coleções Exclusivas</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Joias Sob Encomenda</h3>
            <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full"></div>
          </div>

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-20 text-center">
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
                Nenhum produto disponível no momento. Entre em contato conosco para mais informações.
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
        </div>
      </section>

      {/* Informações Adicionais */}
      <section className="py-24 px-4 md:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase text-gold">Qualidade Garantida</h3>
              <p className="text-gray-400">
                Todas as nossas joias são certificadas e produzidas com os mais altos padrões de qualidade.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase text-gold">Sob Encomenda</h3>
              <p className="text-gray-400">
                Criamos peças únicas de acordo com suas preferências e necessidades.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase text-gold">Atendimento Personalizado</h3>
              <p className="text-gray-400">
                Nossa equipe está pronta para ajudar você a encontrar a joia perfeita.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
