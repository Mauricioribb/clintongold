import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import SliderList from './components/SliderList';

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === 'authenticated';
}

export default async function SliderPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-700"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Gerenciar Slider</h1>
              <p className="text-gray-600">Gerencie as imagens do slider principal</p>
            </div>
          </div>
          <Link
            href="/admin/slider/novo"
            className="flex items-center space-x-2 bg-gold-gradient text-black px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            <span>Nova Imagem</span>
          </Link>
        </div>

        <SliderList />
      </div>
    </div>
  );
}
