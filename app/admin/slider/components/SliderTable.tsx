import Link from 'next/link';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { SliderImage } from '@/types';

async function getSliderImages(): Promise<SliderImage[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const url = `${baseUrl}/api/slider`;
    
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar imagens do slider:', error);
    return [];
  }
}

export default async function SliderTable() {
  const images = await getSliderImages();

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Nenhuma imagem no slider ainda.</p>
        <Link
          href="/admin/slider/novo"
          className="inline-block bg-gold-gradient text-black px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all"
        >
          Adicionar Primeira Imagem
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Imagem</th>
            <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Título</th>
            <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Ordem</th>
            <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Status</th>
            <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </td>
              <td className="py-4 px-4 text-gray-900">{image.title}</td>
              <td className="py-4 px-4 text-gray-600">{image.order}</td>
              <td className="py-4 px-4">
                {image.active ? (
                  <span className="flex items-center space-x-1 text-green-600">
                    <Eye size={16} />
                    <span>Ativo</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-gray-500">
                    <EyeOff size={16} />
                    <span>Inativo</span>
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/slider/${image.id}/editar`}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-700"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    className="p-2 hover:bg-red-50 rounded-lg transition-all text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
