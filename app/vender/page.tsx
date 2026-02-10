import Layout from '../../components/Layout';
import SellCTA from '../../components/SellCTA';
import BrandsCarousel from '../../components/BrandsCarousel';
import DesapegueSection from '../../components/DesapegueSection';

export default function VenderPage() {
  return (
    <Layout>
      {/* Banner Grande */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[10px]">
            <img 
              src="/imagens/querovender/Compramos-Ouro-e-Joias.jpg" 
              alt="Compramos Ouro e Joias" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Bloco com Imagem Pequena e Texto */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
            {/* Imagem Pequena - 25% */}
            <div className="relative order-1 lg:order-1 lg:col-span-1">
              <div className="relative z-10 rounded-[10px] overflow-hidden shadow-2xl">
                <img 
                  src="/imagens/querovender/img1cc.jpg" 
                  alt="Quer Vender? Descubra como!" 
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
            </div>

            {/* Texto - 75% */}
            <div className="order-2 lg:order-2 lg:col-span-3">
              <h2 className="text-xl md:text-xl lg:text-2xl uppercase tracking-tight mb-6 text-white">
                Compramos Ouro, Joias, Relógios de Luxo, Diamantes e Outros Metais Preciosos
              </h2>
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-6 text-gold">
                Quer Vender? Descubra como!
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed text-base md:text-lg">
                <p>
                  Você já parou para pensar na quantidade de ouro e joias que estão guardadas em sua casa, sem uso? É bem comum termos peças esquecidas em gavetas, cofres ou caixas, seja por estarem fora de moda, por terem perdido o valor sentimental ou simplesmente porque não combinam mais com o nosso estilo.
                </p>
                <p>
                  Esses itens, que muitas vezes ficam apenas ocupando espaço, podem se transformar em uma ótima oportunidade de ganho extra. Aqui nós compramos suas joias, avaliamos com transparência, pagamos à vista, garantindo segurança e agilidade em todo o processo, sem contar que temos a melhor avaliação da cidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandsCarousel />

      {/* Cards de Benefícios */}
      <section className="py-12 md:py-[50px] px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Preto */}
            <div className="bg-black border border-white/10 rounded-[10px] p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src="/imagens/querovender/img10.jpeg" 
                    alt="Precisa equilibrar as contas?" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 text-white">
                Precisa equilibrar as contas?
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base text-center">
                <li className="flex items-center justify-center">
                  <span className="mr-2">→</span>
                  <span>Suas joias de ouro podem ser a chave para sair do aperto.</span>
                </li>
              </ul>
            </div>

            {/* Card 2 - Cinza */}
            <div className="bg-gray-200 border border-gray-300 rounded-[10px] p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src="/imagens/querovender/img11.jpeg" 
                    alt="Por que Vender Minhas Joias?" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 text-black">
                Por que Vender Minhas Joias?
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base text-center">
                <li className="flex items-center justify-center">
                  <span className="mr-2">→</span>
                  <span>Por que manter algo que não é mais útil para você?</span>
                </li>
                <li className="flex items-center justify-center">
                  <span className="mr-2">→</span>
                  <span>Liberte-se desse peso e dê um novo propósito para suas joias e ouro.</span>
                </li>
              </ul>
            </div>

            {/* Card 3 - Preto */}
            <div className="bg-black border border-white/10 rounded-[10px] p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src="/imagens/querovender/img12.jpeg" 
                    alt="Nós Temos a Solução!" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 text-white">
                Nós Temos a Solução!
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base text-center">
                <li className="flex items-center justify-center">
                  <span className="mr-2">→</span>
                  <span>Confiança, credibilidade, honestidade, transparência,</span>
                </li>
                <li className="flex items-center justify-center">
                  <span className="mr-2">→</span>
                  <span>discrição e melhor cotação.</span>
                </li>
                <li className="flex items-center justify-center">
                  <span className="mr-2">→</span>
                  <span>Pagamento na hora.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DesapegueSection />
      <SellCTA />
    </Layout>
  );
}
