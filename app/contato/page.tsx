import Layout from '../../components/Layout';
import ContactInfo from '../../components/ContactInfo';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://clintongold.com.br';

export const metadata: Metadata = {
  title: 'Contato - Fale Conosco',
  description: 'Entre em contato com a Clinton Gold. Estamos prontos para atender você através dos nossos canais de atendimento. WhatsApp, telefone e endereço.',
  keywords: ['contato clinton gold', 'fale conosco', 'atendimento joalheria', 'whatsapp clinton gold'],
  alternates: {
    canonical: `${baseUrl}/contato`,
  },
  openGraph: {
    title: 'Contato - Fale Conosco | Clinton Gold',
    description: 'Entre em contato com a Clinton Gold. Estamos prontos para atender você.',
    url: `${baseUrl}/contato`,
    images: [
      {
        url: `${baseUrl}/imagens/clintogold-logo.webp`,
        width: 1200,
        height: 630,
        alt: 'Clinton Gold - Contato',
      },
    ],
  },
};

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
