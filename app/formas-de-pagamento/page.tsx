import Layout from '../../components/Layout';
import { CreditCard, QrCode, Smartphone } from 'lucide-react';

export default function FormasDePagamentoPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-[30px] pb-0 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-none">
            Formas de <span className="text-gold">Pagamento</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto">
            Saiba como pagar suas compras com segurança, praticidade e transparência.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Cartão de Crédito */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <CreditCard size={28} />
              Cartão de Crédito
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Você pode fazer suas compras com cartão de crédito através do MercadoPago. Confira a disponibilidade de cada bandeira
                na página de finalização do pedido.
              </p>
              <p>
                <span className="font-semibold text-gold">Parcelamento:</span> o pagamento pode ser à vista ou parcelado. Alguns produtos
                ou marcas possuem condições diferenciadas, então sempre verifique as regras vigentes no site.
              </p>
              <p>
                <span className="font-semibold text-gold">Como pagar:</span> basta escolher esta forma de pagamento ao fechar o pedido e
                informar os dados do cartão.
              </p>
              <p>
                <span className="font-semibold text-gold">Segurança:</span> caso haja divergência nas informações cadastrais ou do cartão,
                entraremos em contato para confirmar os dados antes de aprovar o pedido. Este processo pode levar até 2 dias úteis.
              </p>
              <p>
                <span className="font-semibold text-gold">Limite do cartão:</span> seu cartão deve ter limite suficiente para o valor total
                da compra, mesmo em parcelas. Cartões emitidos no exterior não são aceitos.
              </p>
              <p>
                <span className="font-semibold text-gold">Erros de digitação:</span> se houver divergência de número, código de segurança
                ou validade, entraremos em contato para confirmar os dados.
              </p>
              <p>
                <span className="font-semibold text-gold">Prazo de entrega:</span> começa a contar somente após a aprovação do pagamento.
                Você será informado por e-mail sobre o status do seu pedido.
              </p>
            </div>
          </div>

          {/* Boleto Bancário */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <QrCode size={28} />
              Boleto Bancário
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                O pagamento por boleto deve ser feito à vista (uma única parcela) no valor total da compra.
              </p>
              <p>
                <span className="font-semibold text-gold">Impressão:</span> lembre-se de imprimir o boleto ao finalizar sua compra.
              </p>
              <p>
                <span className="font-semibold text-gold">Pagamento:</span> pode ser feito em qualquer banco até a data de vencimento
                ou via internet banking usando o código de barras.
              </p>
              <p>
                <span className="font-semibold text-gold">Reimpressão:</span> caso tenha problemas na impressão, acesse a área
                &quot;Meus Pedidos&quot; para reimprimir o boleto.
              </p>
            </div>
          </div>

          {/* PIX */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Smartphone size={28} />
              PIX
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                O pagamento via PIX é rápido, seguro e imediato.
              </p>
              <p>
                <span className="font-semibold text-gold">Como pagar:</span> ao finalizar sua compra, selecione PIX como forma de pagamento
                e utilize a chave PIX fornecida.
              </p>
              <p>
                <span className="font-semibold text-gold">Confirmação:</span> o pagamento é confirmado automaticamente e seu pedido é
                liberado para envio rapidamente.
              </p>
              <p>
                <span className="font-semibold text-gold">Vantagem:</span> não há necessidade de esperar compensação bancária, diferente
                do boleto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
