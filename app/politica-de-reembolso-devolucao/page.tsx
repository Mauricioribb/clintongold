import Layout from '../../components/Layout';
import { RefreshCw, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function PoliticaDeReembolsoDevolucaoPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Política de <span className="text-gold">Reembolso e Devolução</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Garantimos sua satisfação. Conheça nossos termos de devolução e reembolso.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Prazo de Devolução */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <Clock size={32} />
                Prazo para Devolução
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Você tem até <strong className="text-white">7 (sete) dias corridos</strong>, a contar da data de recebimento do produto, 
                para solicitar a devolução ou troca, conforme previsto no Código de Defesa do Consumidor.
              </p>
            </div>

            {/* Condições para Devolução */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <CheckCircle size={32} />
                Condições para Devolução
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Para que a devolução seja aceita, o produto deve estar:
              </p>
              <ul className="space-y-3 text-gray-400 ml-6">
                <li>• Em sua embalagem original, sem uso</li>
                <li>• Com todas as etiquetas e certificados intactos</li>
                <li>• Sem sinais de desgaste ou danos</li>
                <li>• Acompanhado da nota fiscal ou comprovante de compra</li>
              </ul>
            </div>

            {/* Processo de Devolução */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <RefreshCw size={32} />
                Como Solicitar Devolução
              </h2>
              <div className="space-y-4 text-gray-400">
                <div>
                  <p className="font-bold text-white mb-2">1. Entre em Contato</p>
                  <p>Entre em contato conosco através do WhatsApp ou e-mail informando o motivo da devolução.</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-2">2. Autorização</p>
                  <p>Nossa equipe irá analisar sua solicitação e fornecer as instruções para envio do produto.</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-2">3. Envio do Produto</p>
                  <p>Envie o produto em embalagem segura para nosso endereço, com seguro incluso.</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-2">4. Reembolso</p>
                  <p>Após análise e aprovação, o reembolso será processado em até 10 dias úteis.</p>
                </div>
              </div>
            </div>

            {/* Reembolso */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold">Forma de Reembolso</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                O reembolso será efetuado da seguinte forma:
              </p>
              <ul className="space-y-3 text-gray-400 ml-6">
                <li>• <strong className="text-white">Cartão de Crédito:</strong> Estorno na fatura em até 2 faturas</li>
                <li>• <strong className="text-white">PIX:</strong> Transferência em até 3 dias úteis</li>
                <li>• <strong className="text-white">Boleto/TED:</strong> Transferência em até 5 dias úteis</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-4">
                <strong className="text-white">Observação:</strong> O valor do frete de devolução será descontado do reembolso, 
                exceto em casos de defeito do produto ou erro no pedido.
              </p>
            </div>

            {/* Casos Especiais */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <XCircle size={32} />
                Casos Não Elegíveis
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Não aceitamos devolução nos seguintes casos:
              </p>
              <ul className="space-y-3 text-gray-400 ml-6">
                <li>• Produtos personalizados ou sob encomenda</li>
                <li>• Produtos com sinais de uso ou danos causados pelo cliente</li>
                <li>• Produtos sem embalagem original ou certificados</li>
                <li>• Solicitação fora do prazo de 7 dias</li>
              </ul>
            </div>

            {/* Contato */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold">Dúvidas?</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Para esclarecer dúvidas sobre devoluções ou reembolsos, entre em contato:
              </p>
              <p className="text-white font-medium">
                WhatsApp: +55 (71) 99136-9104<br />
                E-mail: clintongoldcomercial@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
