import Layout from '../../components/Layout';
import { Product, Category } from '../../types';
import { executeQuery } from '../../lib/db-helper';
import ProductsWithFilter from '../../components/ProductsWithFilter';

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

async function getCategories(): Promise<Category[]> {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    return results || [];
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

export default async function JoiasPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <Layout>
      {/* Produtos */}
      <section className="py-[30px] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductsWithFilter products={products} categories={categories} />
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
