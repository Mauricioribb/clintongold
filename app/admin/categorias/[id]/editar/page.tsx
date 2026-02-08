import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CategoryForm from '../../components/CategoryForm';

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === 'authenticated';
}

async function getCategory(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const url = `${baseUrl}/api/categories/${id}`;
    
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    return null;
  }
}

export default async function EditarCategoriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/admin');
  }

  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    redirect('/admin/categorias');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/admin/categorias"
            className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-700"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Editar Categoria</h1>
            <p className="text-gray-600">Atualize as informações da categoria</p>
          </div>
        </div>

        <CategoryForm category={category} />
      </div>
    </div>
  );
}
