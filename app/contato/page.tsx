import Layout from '../../components/Layout';
import ContactInfo from '../../components/ContactInfo';

export default function ContatoPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-[30px] pb-0 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4 md:mb-6 leading-none">
            Entre em <span className="text-gold">Contato</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto">
            Estamos prontos para atender você. Fale conosco através dos nossos canais de atendimento.
          </p>
        </div>
      </section>

      <ContactInfo />
    </Layout>
  );
}
