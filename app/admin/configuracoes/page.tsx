import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, Settings } from 'lucide-react';
import SettingsForm from './components/SettingsForm';

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === 'authenticated';
}

async function getSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const apiUrl = `${baseUrl}/api/settings`;
    
    const response = await fetch(apiUrl, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return {};
  }
}

export default async function ConfiguracoesPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/admin');
  }

  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-3">
                <Settings className="text-gold" size={32} />
                Configurações
              </h1>
              <p className="text-gray-600">Gerencie as configurações do site</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <SettingsForm initialSettings={settings} />
      </div>
    </div>
  );
}
