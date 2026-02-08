import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, Upload } from 'lucide-react';
import ImportForm from './components/ImportForm';

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === 'authenticated';
}

export default async function ImportarPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/admin"
            className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-700"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Importar Produtos</h1>
            <p className="text-gray-600">Importe produtos do WordPress via CSV</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Instruções</h2>
          <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>O CSV deve conter as colunas: Nome, Descrição, imagem principal, galeria, preço, Categoria, sku</li>
            <li>As imagens devem ser URLs (o sistema fará download e upload automático)</li>
            <li>A galeria pode conter múltiplas URLs separadas por vírgula</li>
            <li>Categorias que não existirem serão criadas automaticamente</li>
            <li>O campo "preço" deve ser numérico (ex: 100.50)</li>
          </ul>
        </div>

        <ImportForm />
      </div>
    </div>
  );
}
