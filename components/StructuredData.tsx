import { CONTACT_INFO } from '../constants';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://clintongold.com.br';

export default function StructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'Clinton Gold',
    description: 'Especializados na compra e venda de ouro, joias exclusivas e relógios de luxo. Transparência, avaliação justa e peças selecionadas com rigor.',
    url: baseUrl,
    logo: `${baseUrl}${CONTACT_INFO.logoUrl}`,
    image: `${baseUrl}${CONTACT_INFO.logoUrl}`,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'BA',
      addressLocality: 'Salvador',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '15:00',
      },
    ],
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card, PIX, Bank Transfer',
    currenciesAccepted: 'BRL',
    areaServed: {
      '@type': 'City',
      name: 'Salvador',
    },
    sameAs: [
      `https://www.instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Clinton Gold',
    url: baseUrl,
    logo: `${baseUrl}${CONTACT_INFO.logoUrl}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone,
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
      areaServed: 'BR',
    },
    sameAs: [
      `https://www.instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
