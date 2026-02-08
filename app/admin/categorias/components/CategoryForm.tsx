'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryForm({ category }: { category?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = category?.id 
        ? `/api/categories/${category.id}` 
        : '/api/categories';
      
      const method = category?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/categorias');
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao salvar categoria');
      }
    } catch (error) {
      alert('Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  // Gerar slug automaticamente a partir do nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData(prev => ({ ...prev, name, slug }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 space-y-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome da Categoria *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug *
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          required
        />
        <p className="mt-1 text-sm text-gray-500">URL amigável (gerada automaticamente)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all resize-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gold-gradient text-black py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Salvando...' : category?.id ? 'Atualizar' : 'Cadastrar'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
