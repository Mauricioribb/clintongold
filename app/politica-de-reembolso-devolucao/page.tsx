import Layout from '../../components/Layout';
import { Clock, Package, XCircle, RefreshCw, CreditCard, Repeat } from 'lucide-react';

export default function PoliticaDeReembolsoDevolucaoPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-[30px] pb-0 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-none">
            Política de <span className="text-gold">Devolução</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto">
            A Clinton Gold preza pela sua satisfação.
            Caso precise devolver um produto, nossa política estabelece as condições e procedimentos para devolução ou troca.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 1. Prazo para Devolução */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Clock size={28} />
              1. Prazo para Devolução
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Você tem até 7 dias corridos a partir do recebimento do produto para solicitar a devolução, conforme previsto pelo Código de Defesa do Consumidor (art. 49).
              </p>
              <p>
                Produtos com defeito ou avarias podem ser solicitados para troca em até 30 dias corridos após o recebimento.
              </p>
            </div>
            </div>

          {/* 2. Condições do Produto */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Package size={28} />
              2. Condições do Produto
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Para que a devolução ou troca seja aceita, o produto deve estar:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sem sinais de uso;</li>
                <li>Com todas as etiquetas e embalagens originais;</li>
                <li>Acompanhado da nota fiscal.</li>
              </ul>
            </div>
            </div>

          {/* 3. Produtos que Não Podem Ser Devolvidos */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <XCircle size={28} />
              3. Produtos que Não Podem Ser Devolvidos
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Não aceitamos devolução de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Produtos personalizados ou sob encomenda;</li>
                <li>Produtos danificados pelo uso inadequado ou mau manuseio.</li>
              </ul>
              </div>
            </div>

          {/* 4. Procedimento de Devolução */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <RefreshCw size={28} />
              4. Procedimento de Devolução
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Entre em contato com nossa equipe pelo e-mail{' '}
                <a href="mailto:contato@clintongold.com.br" className="text-gold hover:underline">
                  contato@clintongold.com.br
                </a> informando:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Número do pedido;</li>
                <li>Motivo da devolução;</li>
                <li>Fotos do produto (se houver defeito).</li>
              </ul>
              <p>
                Após a análise, enviaremos instruções sobre como devolver o produto.
              </p>
              <p>
                O cliente é responsável pelo envio do produto de volta, salvo quando se tratar de produto com defeito.
              </p>
            </div>
            </div>

          {/* 5. Reembolso */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <CreditCard size={28} />
              5. Reembolso
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                O valor será devolvido pelo mesmo meio de pagamento utilizado na compra:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><span className="font-semibold text-gold">Cartão de crédito:</span> estorno na fatura do cartão;</li>
                <li><span className="font-semibold text-gold">Boleto ou PIX:</span> depósito ou transferência em conta indicada pelo cliente.</li>
              </ul>
              <p>
                O prazo para processamento do reembolso pode variar conforme a forma de pagamento, mas geralmente ocorre em até 10 dias úteis após recebimento e conferência do produto.
              </p>
            </div>
            </div>

          {/* 6. Troca por Outro Produto */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Repeat size={28} />
              6. Troca por Outro Produto
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Caso queira trocar o produto por outro, informe na solicitação de devolução.
              </p>
              <p>
                Se houver diferença de valor, será cobrada ou reembolsada conforme o caso.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
