import Layout from '../../components/Layout';
import About from '../../components/About';
import { Award, Eye, Users, ShieldCheck, Zap, HandCoins } from 'lucide-react';

export default function SobrePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Sobre <span className="text-gold">Nós</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Mais de 15 anos de tradição e excelência no mercado de joias e ouro.
          </p>
        </div>
      </section>

      <About />

      {/* Nossa História */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Nossa História</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">Legado de Confiança</h3>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  A Clinton Gold nasceu da paixão pela alta joalheria e do compromisso com a transparência absoluta. 
                  Desde o início, nossa missão foi oferecer um serviço diferenciado no mercado de compra e venda de ouro e joias.
                </p>
                <p>
                  Com mais de 15 anos de experiência, construímos uma reputação sólida baseada na honestidade, 
                  transparência e excelência no atendimento. Trabalhamos com avaliação justa e peças selecionadas com rigor.
                </p>
                <p>
                  Nosso objetivo é oferecer um atendimento personalizado que garanta a segurança e a valorização máxima 
                  dos seus bens preciosos, sempre com total transparência e respeito ao cliente.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative z-10 rounded-[10px] overflow-hidden shadow-2xl shadow-gold/10 border border-white/5 bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2070&auto=format&fit=crop" 
                  alt="Clinton Gold - Nossa História" 
                  className="w-full h-[500px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 px-4 md:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Nossos Valores</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">O Que Nos Move</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Transparência', desc: 'Avaliações feitas na sua presença com total clareza' },
              { icon: Award, title: 'Excelência', desc: 'Padrões internacionais de qualidade e serviço' },
              { icon: Users, title: 'Atendimento Personalizado', desc: 'Cada cliente recebe atenção única e dedicada' },
              { icon: Eye, title: 'Rigor Técnico', desc: 'Peritos gemólogos e relojoeiros experientes' },
              { icon: Zap, title: 'Agilidade', desc: 'Processo rápido e eficiente do início ao fim' },
              { icon: HandCoins, title: 'Melhores Preços', desc: 'Avaliamos e pagamos os melhores valores do mercado' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-black border border-white/10 rounded-[10px] p-8 hover:border-gold/50 transition-all">
                  <div className="w-16 h-16 bg-gold-gradient rounded-lg flex items-center justify-center mb-6">
                    <Icon size={28} className="text-black" />
                  </div>
                  <h4 className="text-xl font-bold mb-4 uppercase">{item.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-black text-gold mb-4">15+</div>
              <p className="text-sm uppercase tracking-widest text-gray-400">Anos de Experiência</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-gold mb-4">1000+</div>
              <p className="text-sm uppercase tracking-widest text-gray-400">Clientes Satisfeitos</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-gold mb-4">5000+</div>
              <p className="text-sm uppercase tracking-widest text-gray-400">Peças Avaliadas</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-gold mb-4">100%</div>
              <p className="text-sm uppercase tracking-widest text-gray-400">Transparência</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
