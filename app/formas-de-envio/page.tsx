import Layout from '../../components/Layout';
import { Truck, Package, Clock, Shield, MapPin, AlertCircle } from 'lucide-react';

export default function FormasDeEnvioPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-[30px] pb-0 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-none">
            Formas de <span className="text-gold">Entrega e Frete</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto">
            Informações sobre prazos, valores e opções de entrega disponíveis.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Informações Gerais */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <p className="text-gray-300 leading-relaxed mb-6">
              A Clinton Gold disponibiliza uma estimativa do prazo e valor da entrega, que pode ser calculada no carrinho de compras e/ou na finalização do pedido.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Para pedidos com mais de um item, podem existir prazos de entrega diferentes, conforme a disponibilidade em nosso estoque.
              Nesses casos, a entrega poderá ser realizada de forma parcial.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Em qualquer circunstância, o prazo de entrega passa a contar somente após a aprovação do pedido e do pagamento.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Caso seu pedido contenha produtos em promoção de frete grátis, o valor calculado do frete será aplicado apenas aos produtos fora da promoção.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Não efetuamos entregas aos domingos nem em feriados.
            </p>
          </div>

          {/* Formas de Entrega */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
              <Truck size={32} />
              Formas de entrega disponíveis
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              As possíveis formas de entrega são listadas abaixo. Ressaltamos que nem todas as opções estarão disponíveis para todas as regiões,
              podendo variar conforme o CEP de destino ou períodos promocionais da loja.
            </p>
            
            <div className="space-y-6">
              <div className="bg-black/20 border border-white/5 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 uppercase text-gold flex items-center gap-2">
                  <Package size={24} />
                  PAC
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Serviço de encomenda da linha econômica dos Correios para envio exclusivo de mercadorias.
                </p>
              </div>

              <div className="bg-black/20 border border-white/5 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 uppercase text-gold flex items-center gap-2">
                  <Truck size={24} />
                  SEDEX
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Serviço de encomenda expressa dos Correios para documentos e mercadorias.
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mt-8">
              As formas de entrega disponíveis no momento da compra serão apresentadas na página de finalização do pedido.
            </p>
          </div>

          {/* Disponibilidade dos Produtos */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
              <Clock size={32} />
              Disponibilidade dos produtos
            </h2>
            <p className="text-gray-300 leading-relaxed">
              A disponibilidade dos produtos depende da relação entre a quantidade em estoque, o volume de vendas e o prazo de reposição do fornecedor.
              Durante a navegação no site, a disponibilidade de cada produto é exibida junto ao botão "Comprar".
            </p>
          </div>

          {/* Alteração do Endereço */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
              <MapPin size={32} />
              Alteração do endereço de entrega
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Não é possível alterar o endereço de entrega para outra faixa de CEP após a finalização do pedido,
              em virtude da variação de frete e das alíquotas de impostos já recolhidas,
              como o ICMS (Imposto sobre Circulação de Mercadorias e Serviços).
            </p>
          </div>

          {/* Atraso na Entrega */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
              <AlertCircle size={32} />
              Atraso na entrega
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A entrega pode sofrer atrasos por diversos fatores, como demora na liberação do pagamento pela administradora do cartão de crédito,
              inconsistência nos dados informados pelo cliente, ausência no local de entrega, recusa no recebimento por terceiros
              ou ainda por fenômenos naturais.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Em caso de atraso, todas as informações poderão ser obtidas por meio de nossa Central de Atendimento.
            </p>
          </div>

          {/* Embalagem para Transporte */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
              <Shield size={32} />
              Embalagem para transporte
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Todos os produtos da Clinton Gold são acondicionados em embalagens adequadas e seguras,
              com o objetivo de preservar a qualidade das peças e evitar qualquer tipo de avaria durante o transporte.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
