import Layout from '../../components/Layout';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PoliticaDePrivacidadePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Política de <span className="text-gold">Privacidade</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Seu direito à privacidade é fundamental para nós. Conheça como protegemos seus dados.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Introdução */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <Shield size={32} />
                Introdução
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                A Clinton Gold está comprometida com a proteção da privacidade e dos dados pessoais de nossos clientes. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política.
              </p>
            </div>

            {/* Coleta de Dados */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <FileText size={32} />
                Dados Coletados
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Coletamos as seguintes informações quando você utiliza nossos serviços:
              </p>
              <ul className="space-y-3 text-gray-400 ml-6">
                <li>• <strong className="text-white">Dados de identificação:</strong> Nome, CPF, RG, data de nascimento</li>
                <li>• <strong className="text-white">Dados de contato:</strong> E-mail, telefone, endereço</li>
                <li>• <strong className="text-white">Dados de pagamento:</strong> Informações de cartão de crédito (processadas de forma segura)</li>
                <li>• <strong className="text-white">Dados de navegação:</strong> Cookies, endereço IP, histórico de navegação</li>
              </ul>
            </div>

            {/* Uso dos Dados */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <Eye size={32} />
                Como Utilizamos Seus Dados
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Utilizamos suas informações pessoais para:
              </p>
              <ul className="space-y-3 text-gray-400 ml-6">
                <li>• Processar e gerenciar suas compras e vendas</li>
                <li>• Entrar em contato sobre seus pedidos e serviços</li>
                <li>• Enviar comunicações de marketing (com seu consentimento)</li>
                <li>• Melhorar nossos serviços e experiência do cliente</li>
                <li>• Cumprir obrigações legais e regulatórias</li>
              </ul>
            </div>

            {/* Proteção de Dados */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold flex items-center gap-3">
                <Lock size={32} />
                Segurança dos Dados
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais:
              </p>
              <ul className="space-y-3 text-gray-400 ml-6">
                <li>• Criptografia SSL/TLS para transmissão de dados</li>
                <li>• Armazenamento seguro em servidores protegidos</li>
                <li>• Acesso restrito apenas a pessoal autorizado</li>
                <li>• Monitoramento contínuo de segurança</li>
              </ul>
            </div>

            {/* Seus Direitos */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold">Seus Direitos (LGPD)</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="space-y-3 text-gray-400 ml-6">
                <li>• Acessar seus dados pessoais</li>
                <li>• Corrigir dados incompletos ou desatualizados</li>
                <li>• Solicitar a exclusão de seus dados</li>
                <li>• Revogar seu consentimento a qualquer momento</li>
                <li>• Solicitar portabilidade dos dados</li>
              </ul>
            </div>

            {/* Contato */}
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 uppercase text-gold">Contato</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              </p>
              <p className="text-white font-medium">
                E-mail: clintongoldcomercial@gmail.com<br />
                Telefone: +55 (71) 99136-9104
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
