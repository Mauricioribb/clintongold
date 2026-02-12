import type { Metadata } from 'next'
import './globals.css'
import { SettingsProvider } from '@/components/SettingsProvider'
import StructuredData from '@/components/StructuredData'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://clintongold.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Clinton Gold - Compra e Venda de Ouro e Joias',
    template: '%s | Clinton Gold'
  },
  description: 'Especializados na compra e venda de ouro, joias exclusivas e relógios de luxo. Transparência, avaliação justa e peças selecionadas com rigor.',
  keywords: ['ouro', 'joias', 'relógios de luxo', 'diamantes', 'compra ouro', 'venda ouro', 'joalheria', 'Salvador', 'Bahia'],
  authors: [{ name: 'Clinton Gold' }],
  creator: 'Clinton Gold',
  publisher: 'Clinton Gold',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/imagens/clintogold-logo-favion.jpg',
    shortcut: '/imagens/clintogold-logo-favion.jpg',
    apple: '/imagens/clintogold-logo-favion.jpg',
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: 'Clinton Gold',
    title: 'Clinton Gold - Compra e Venda de Ouro e Joias',
    description: 'Especializados na compra e venda de ouro, joias exclusivas e relógios de luxo. Transparência, avaliação justa e peças selecionadas com rigor.',
    images: [
      {
        url: `${baseUrl}/imagens/clintogold-logo-redes.jpg`,
        width: 1200,
        height: 630,
        alt: 'Clinton Gold - Joalheria de Luxo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinton Gold - Compra e Venda de Ouro e Joias',
    description: 'Especializados na compra e venda de ouro, joias exclusivas e relógios de luxo.',
    images: [`${baseUrl}/imagens/clintogold-logo-redes.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Adicione aqui quando tiver Google Search Console
    // google: 'seu-codigo-verificacao',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StructuredData />
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}
