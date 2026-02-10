import Layout from '../../components/Layout';
import { Shield, FileText, Eye, Share2, Lock, Cookie, UserCheck, FileEdit } from 'lucide-react';

export default function PoliticaDePrivacidadePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-[30px] pb-0 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-none">
            Política de <span className="text-gold">Privacidade</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto">
            A Clinton Gold preza pela segurança e privacidade dos dados de seus clientes.
            Esta Política de Privacidade descreve como coletamos, utilizamos, protegemos e compartilhamos suas informações pessoais ao utilizar nosso site{' '}
            <span className="text-gold">clintongold.com.br</span>.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 1. Coleta de Informações */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <FileText size={28} />
              1. Coleta de Informações
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Coletamos informações pessoais fornecidas diretamente por você, como:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Endereço de entrega</li>
                <li>Número de telefone</li>
                <li>Dados de pagamento (cartão de crédito, boleto bancário, PIX)</li>
              </ul>
              <p>
                Além disso, podemos coletar informações automaticamente, como:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Endereço IP</li>
                <li>Tipo de navegador</li>
                <li>Páginas visitadas em nosso site</li>
                <li>Data e hora de acesso</li>
              </ul>
            </div>
            </div>

          {/* 2. Uso das Informações */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Eye size={28} />
              2. Uso das Informações
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processar e entregar seus pedidos</li>
                <li>Enviar confirmações e atualizações sobre o status do pedido</li>
                <li>Melhorar a experiência de navegação em nosso site</li>
                <li>Enviar ofertas e promoções, caso tenha optado por recebê-las</li>
              </ul>
            </div>
            </div>

          {/* 3. Compartilhamento de Informações */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Share2 size={28} />
              3. Compartilhamento de Informações
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processar pagamentos através de parceiros como MercadoPago</li>
                <li>Cumprir obrigações legais ou regulatórias</li>
              </ul>
            </div>
          </div>

          {/* 4. Segurança */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Lock size={28} />
              4. Segurança
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Adotamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <p>
                No entanto, nenhuma transmissão de dados pela internet é completamente segura, e não podemos garantir a segurança absoluta.
              </p>
            </div>
            </div>

          {/* 5. Cookies */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <Cookie size={28} />
              5. Cookies
              </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Utilizamos cookies para melhorar a funcionalidade do nosso site e personalizar sua experiência.
              </p>
              <p>
                Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
              </p>
            </div>
            </div>

          {/* 6. Seus Direitos */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <UserCheck size={28} />
              6. Seus Direitos
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Você tem o direito de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acessar, corrigir ou excluir suas informações pessoais</li>
                <li>Retirar seu consentimento para o uso de seus dados pessoais</li>
                <li>Solicitar informações sobre como seus dados estão sendo utilizados</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato conosco através do e-mail{' '}
                <a href="mailto:contato@clintongold.com.br" className="text-gold hover:underline">
                  contato@clintongold.com.br
                </a>.
              </p>
            </div>
            </div>

          {/* 7. Alterações nesta Política */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 md:p-12">
            <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase text-gold flex items-center gap-3">
              <FileEdit size={28} />
              7. Alterações nesta Política
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente.
              </p>
              <p>
                Quaisquer alterações serão publicadas nesta página com a data da última atualização.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
