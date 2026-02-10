import type { Metadata } from 'next'
import './globals.css'
import { SettingsProvider } from '@/components/SettingsProvider'

export const metadata: Metadata = {
  title: 'Clinton Gold - Compra e Venda de Ouro e Joias',
  description: 'Especializados na compra e venda de ouro, joias exclusivas e relógios de luxo. Transparência, avaliação justa e peças selecionadas com rigor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}
