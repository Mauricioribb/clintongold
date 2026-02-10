import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import SellCTA from '../../components/SellCTA';
import { SliderImage } from '../../types';
import { executeQuery } from '../../lib/db-helper';
import { ClipboardCheck, HandCoins, TrendingUp } from 'lucide-react';

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagem - Primeiro no mobile */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative z-10 rounded-[10px] overflow-hidden shadow-2xl shadow-gold/10 border border-white/5 bg-neutral-900">
                <img 
                  src="/imagens/sobre/Dinheiro-e-Joias-de-ouro-600x600.jpeg" 
                  alt="Clinton Joalheria - Ouro e Joias" 
                  className="w-full h-[400px] md:h-[500px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Texto - Segundo no mobile */}
            <div className="order-2 lg:order-1">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-12 text-center text-gray-800">
            COM A CLINTON JOALHERIA
          </h2>
          
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
