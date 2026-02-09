'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function SliderForm({ slider }: { slider?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: slider?.title || '',
    imageUrl: slider?.imageUrl || '',
    link: slider?.link || '',
    order: slider?.order || 0,
    active: slider?.active !== undefined ? (slider.active === 1 || slider.active === true) : true,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        alert(data.error || 'Erro ao fazer upload');
      }
    } catch (error) {
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (!formData.title || !formData.imageUrl) {
      alert('Por favor, preencha o título e faça upload de uma imagem');
      return;
    }

    setLoading(true);

    try {
      const url = slider?.id 
        ? `/api/slider/${slider.id}` 
        : '/api/slider';
      
      const method = slider?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          active: formData.active ? 1 : 0, // Converter boolean para número
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/slider');
        router.refresh();
      } else {
        console.error('Erro ao salvar:', data);
        alert(data.error || 'Erro ao salvar imagem do slider');
      }
    } catch (error) {
      console.error('Erro ao salvar imagem do slider:', error);
      alert('Erro ao salvar imagem do slider. Verifique o console para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 space-y-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagem *
        </label>
        {formData.imageUrl ? (
          <div className="mb-4">
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              className="w-full h-64 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
              className="mt-2 text-sm text-red-600 hover:text-red-700"
            >
              Remover imagem
            </button>
          </div>
        ) : null}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
            </p>
            <p className="text-xs text-gray-500">PNG, JPG ou WEBP (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
        {uploading && (
          <p className="mt-2 text-sm text-gray-500">Fazendo upload...</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Link (opcional)
        </label>
        <input
          type="url"
          value={formData.link}
          onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          placeholder="https://exemplo.com"
        />
        <p className="mt-1 text-sm text-gray-500">URL para onde o slide deve redirecionar ao ser clicado</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordem
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
            min="0"
          />
          <p className="mt-1 text-sm text-gray-500">Ordem de exibição (menor = primeiro)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
              className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold"
            />
            <span className="text-sm text-gray-700">Ativo</span>
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 bg-gold-gradient text-black py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Salvando...' : slider?.id ? 'Atualizar' : 'Cadastrar'}
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
