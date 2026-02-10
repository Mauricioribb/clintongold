import Layout from '../../components/Layout';
import { Truck, Package, Clock, Shield } from 'lucide-react';

export default function FormasDeEnvioPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Formas de <span className="text-gold">Envio</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Entregamos suas joias com segurança e agilidade em todo o Brasil.
          </p>
        </div>
      </section>

      {/* Opções de Envio */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 hover:border-gold transition-all">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-6">
                <Truck size={28} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Entrega Padrão</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Entrega em até 10 dias úteis para todo o Brasil. Rastreamento completo via código de rastreio.
              </p>
              <p className="text-gold font-bold text-lg">Grátis para compras acima de R$ 500</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 hover:border-gold transition-all">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-6">
                <Package size={28} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Entrega Expressa</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Entrega em até 3 dias úteis para as principais capitais. Seguro incluso no valor.
              </p>
              <p className="text-gold font-bold text-lg">A partir de R$ 25,00</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 hover:border-gold transition-all">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-6">
                <Shield size={28} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Seguro Total</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Todas as entregas são seguradas contra perda, roubo ou danos durante o transporte.
              </p>
              <p className="text-gold font-bold text-lg">Incluso em todas as compras</p>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase text-center">Informações Importantes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gold uppercase flex items-center gap-3">
                  <Clock size={24} />
                  Prazos de Entrega
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Prazo de entrega conta a partir da confirmação do pagamento</li>
                  <li>• Em caso de atraso, você será notificado imediatamente</li>
                  <li>• Prazos podem variar em períodos de alta demanda</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gold uppercase flex items-center gap-3">
                  <Shield size={24} />
                  Segurança
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Embalagem especializada e discreta</li>
                  <li>• Seguro total contra perda e danos</li>
                  <li>• Rastreamento em tempo real</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
