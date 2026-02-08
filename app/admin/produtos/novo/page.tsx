import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../components/ProductForm';

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === 'authenticated';
}

export default async function NovoProdutoPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/admin/produtos"
            className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-700"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Novo Produto</h1>
            <p className="text-gray-600">Cadastre um novo produto na loja</p>
          </div>
        </div>

        <ProductForm />
      </div>
    </div>
  );
}
