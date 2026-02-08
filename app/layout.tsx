import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Clinton Gold | Compra e Venda de Ouro e Joias',
  description: 'Clinton Gold - Joalheria de luxo especializada em compra e venda de ouro e joias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
