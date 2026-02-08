import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Package, Folder, Image, LogOut } from 'lucide-react';
import AdminLogin from './components/AdminLogin';

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === 'authenticated';
}

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie produtos, categorias e slider</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gold transition-all text-gray-700 hover:text-gray-900"
            >
              Ver Site
            </Link>
            <Link
              href="/admin/importar"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gold transition-all text-gray-700 hover:text-gray-900"
            >
              Importar
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-600 transition-all text-gray-700"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </form>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/produtos"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gold hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="text-black" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Produtos</h3>
            <p className="text-gray-600 text-sm">Cadastrar e gerenciar produtos</p>
          </Link>

          <Link
            href="/admin/categorias"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gold hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Folder className="text-black" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Categorias</h3>
            <p className="text-gray-600 text-sm">Gerenciar categorias de produtos</p>
          </Link>

          <Link
            href="/admin/slider"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gold hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Image className="text-black" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Slider Principal</h3>
            <p className="text-gray-600 text-sm">Gerenciar imagens do slider</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
