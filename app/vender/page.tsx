'use client';

import { useEffect } from 'react';
import Layout from '../../components/Layout';
import SellCTA from '../../components/SellCTA';
import Features from '../../components/Features';
import { CONTACT_INFO } from '../../constants';
import { HandCoins, ShieldCheck, Zap, Award } from 'lucide-react';

export default function VenderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Quer <span className="text-gold">Vender</span> Suas Joias?
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Avaliamos e compramos ouro, joias e relógios de luxo com transparência total e os melhores preços do mercado.
          </p>
        </div>
      </section>

      {/* Processo de Venda */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Como Funciona</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Processo Simples e Transparente</h3>
            <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 text-center hover:border-gold/50 transition-all">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <HandCoins size={32} className="text-black" />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">1. Traga Suas Joias</h4>
              <p className="text-gray-400 leading-relaxed">
                Venha até nossa loja com suas peças. Não é necessário agendamento prévio.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 text-center hover:border-gold/50 transition-all">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} className="text-black" />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">2. Avaliação Profissional</h4>
              <p className="text-gray-400 leading-relaxed">
                Nossos especialistas avaliam na sua presença com balanças certificadas e total transparência.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 text-center hover:border-gold/50 transition-all">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={32} className="text-black" />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">3. Receba o Pagamento</h4>
              <p className="text-gray-400 leading-relaxed">
                Se aceitar nossa proposta, o pagamento é feito na hora, em dinheiro ou transferência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O que Compramos */}
      <section className="py-24 px-4 md:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Aceitamos</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">O Que Compramos</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Ouro 18k e 24k', desc: 'Barras, moedas e objetos de ouro' },
              { title: 'Joias de Ouro', desc: 'Anéis, alianças, colares, brincos' },
              { title: 'Relógios de Luxo', desc: 'Rolex, Omega, Patek Philippe e mais' },
              { title: 'Pérolas e Gemas', desc: 'Diamantes, esmeraldas, rubis, safiras' },
            ].map((item, index) => (
              <div key={index} className="bg-black border border-gold/20 rounded-[10px] p-6 hover:border-gold transition-all">
                <Award className="text-gold mb-4" size={24} />
                <h4 className="text-lg font-bold mb-2 uppercase">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que Vender Conosco */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Vantagens</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Por Que Vender Conosco</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Melhores Preços', desc: 'Avaliamos e pagamos os melhores valores do mercado' },
              { title: 'Transparência Total', desc: 'Avaliação feita na sua presença, sem surpresas' },
              { title: 'Pagamento Imediato', desc: 'Receba na hora, em dinheiro ou transferência' },
              { title: '15+ Anos de Experiência', desc: 'Tradição e confiança no mercado de joias' },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white/5 border border-white/10 rounded-[10px] hover:border-gold/50 transition-all">
                <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award size={20} className="text-black" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />
      <SellCTA />
    </Layout>
  );
}
