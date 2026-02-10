import Layout from '../../components/Layout';
import { CreditCard, Smartphone, QrCode, Banknote } from 'lucide-react';

export default function FormasDePagamentoPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Formas de <span className="text-gold">Pagamento</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Oferecemos diversas opções de pagamento para sua comodidade e segurança.
          </p>
        </div>
      </section>

      {/* Opções de Pagamento */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 hover:border-gold transition-all text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase">Cartão de Crédito</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Parcelamento em até 12x sem juros
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8 grayscale opacity-50" />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-8 grayscale opacity-50" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 hover:border-gold transition-all text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase">PIX</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Pagamento instantâneo com 5% de desconto
              </p>
              <p className="text-gold font-bold">Aprovação imediata</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 hover:border-gold transition-all text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase">Boleto Bancário</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Vencimento em até 3 dias úteis
              </p>
              <p className="text-gold font-bold">Desconto de 3%</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 hover:border-gold transition-all text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Banknote size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase">Transferência</h3>
              <p className="text-gray-400 mb-4 text-sm">
                TED ou DOC bancário
              </p>
              <p className="text-gold font-bold">Desconto de 2%</p>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase text-center">Segurança nas Transações</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gold uppercase">Criptografia SSL</h3>
                <p className="text-gray-400">
                  Todas as transações são protegidas com criptografia de ponta a ponta
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gold uppercase">Certificado de Segurança</h3>
                <p className="text-gray-400">
                  Site certificado e seguro para suas compras online
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gold uppercase">Proteção de Dados</h3>
                <p className="text-gray-400">
                  Seus dados financeiros são protegidos e nunca compartilhados
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
