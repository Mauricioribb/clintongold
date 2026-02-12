import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import SellCTA from '../../components/SellCTA';
import { SliderImage } from '../../types';
import { executeQuery } from '../../lib/db-helper';
import { ClipboardCheck, HandCoins, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://clintongold.com.br';

export const metadata: Metadata = {
  title: 'Sobre Nós - Clinton Joalheria',
  description: 'Clinton Joalheria é especializada na compra e avaliação de ouro, joias finas, relógios de luxo, diamantes e metais preciosos. Mais de 15 anos de tradição e excelência no mercado.',
  keywords: ['sobre clinton gold', 'história joalheria', 'tradição joalheria', 'avaliadores experientes', 'joalheria salvador'],
  alternates: {
    canonical: `${baseUrl}/sobre`,
  },
  openGraph: {
    title: 'Sobre Nós - Clinton Joalheria | Clinton Gold',
    description: 'Mais de 15 anos de tradição e excelência na compra e avaliação de ouro, joias e relógios de luxo.',
    url: `${baseUrl}/sobre`,
    images: [
      {
        url: `${baseUrl}/imagens/clintogold-logo.webp`,
        width: 1200,
        height: 630,
        alt: 'Clinton Gold - Sobre Nós',
      },
    ],
  },
};

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

export default async function SobrePage() {
  const sliderImages = await getSliderImages();

  return (
    <Layout>
      <Hero slides={sliderImages} />
      
      {/* Sobre Nós Section */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Texto */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-8 text-white">
                Sobre Nós
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
                <p>
                  Clinton Joalheria é uma empresa especializada na compra e avaliação de itens de alto valor, incluindo ouro (peças e sucata), joias finas, relógios de luxo, diamantes e outros metais preciosos como prata, platina e paládio. Com uma equipe de avaliadores experientes e procedimentos transparentes, a empresa oferece valores justos de acordo com o mercado atual, baseada em critérios como peso, pureza, autenticidade e valor de revenda.
                </p>
                <p>
                  O processo é seguro e profissional, com atendimento personalizado e pagamento rápido, seja em dinheiro, transferência bancária ou crédito em conta, PIX. A empresa atende tanto clientes que desejam vender peças únicas quanto grandes quantidades de materiais preciosos, garantindo discrição, confiabilidade e conformidade com as normas legais e de segurança do setor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards de Destaque */}
      <section className="py-12 md:py-[50px] px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Avaliação Gratuita */}
            <div className="bg-black border border-white/10 rounded-[10px] p-8 text-center hover:border-gold/50 transition-all">
              <div className="flex justify-center mb-6">
                <ClipboardCheck size={48} className="text-white" />
                  </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-white">
                AVALIAÇÃO GRATUITA
              </h3>
              <p className="text-gray-300 text-sm mb-2">Avaliação com Profissionais</p>
              <p className="text-gray-300 text-sm">Gratuito</p>
            </div>

            {/* Card 2 - Pagamento Imediato */}
            <div className="bg-black border border-white/10 rounded-[10px] p-8 text-center hover:border-gold/50 transition-all">
              <div className="flex justify-center mb-6">
                <HandCoins size={48} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-white">
                PAGAMENTO IMEDIATO
              </h3>
              <p className="text-gray-300 text-sm mb-2">PAGAMENTO SEGURO, NA HORA</p>
              <p className="text-gray-300 text-sm">Receba com tranquilidade</p>
            </div>

            {/* Card 3 - Melhor Cotação */}
            <div className="bg-black border border-white/10 rounded-[10px] p-8 text-center hover:border-gold/50 transition-all">
              <div className="flex justify-center mb-6">
                <TrendingUp size={48} className="text-white" />
            </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-white">
                MELHOR COTAÇÃO
              </h3>
              <p className="text-gray-300 text-sm mb-2">Valores justos de mercado</p>
              <p className="text-gray-300 text-sm">Para você</p>
            </div>
          </div>
        </div>
      </section>

      <SellCTA />
    </Layout>
  );
}
