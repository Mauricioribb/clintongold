'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';

export default function ProductForm({ product }: { product?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    reference: product?.reference || '',
    price: product?.price || 0,
    description: product?.description || '',
    categoryId: product?.categoryId || '',
    tag: product?.tag || '',
    image: product?.image || '',
    gallery: product?.gallery ? (typeof product.gallery === 'string' ? JSON.parse(product.gallery) : product.gallery) : [],
    active: product?.active !== undefined ? (product.active === 1 || product.active === true) : true,
  });
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Buscar categorias
    fetch('/api/categories')
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao buscar categorias');
        }
        return res.json();
      })
      .then(data => {
        // Garantir que sempre seja um array
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
        setCategories([]);
      });
  }, []);

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
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'Erro ao fazer upload');
      }
    } catch (error) {
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const remainingSlots = 10 - formData.gallery.length;
    
    if (filesArray.length > remainingSlots) {
      alert(`Você pode adicionar no máximo ${remainingSlots} imagem(ns) na galeria.`);
      return;
    }

    setUploadingGallery(true);
    const uploadPromises = filesArray.map(async (file) => {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        const data = await response.json();
        if (response.ok) {
          return data.url;
        } else {
          throw new Error(data.error || 'Erro ao fazer upload');
        }
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        return null;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null);
      
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, ...validUrls],
      }));
    } catch (error) {
      alert('Erro ao fazer upload das imagens da galeria');
    } finally {
      setUploadingGallery(false);
      // Resetar o input
      e.target.value = '';
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = product?.id 
        ? `/api/products/${product.id}` 
        : '/api/products';
      
      const method = product?.id ? 'PUT' : 'POST';

      const submitData = {
        ...formData,
        gallery: JSON.stringify(formData.gallery),
        active: formData.active ? 1 : 0,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        router.push('/admin/produtos');
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao salvar produto');
      }
    } catch (error) {
      alert('Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  };

  const remainingGallerySlots = 10 - formData.gallery.length;

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 space-y-6 shadow-sm">
      <div>
        <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Status do Produto
            </span>
            <span className="text-xs text-gray-500">
              {formData.active ? 'Produto ativo e visível na loja' : 'Produto desativado e oculto'}
            </span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
              className="sr-only"
            />
            <div className={`w-14 h-8 rounded-full transition-all ${
              formData.active ? 'bg-gold' : 'bg-gray-300'
            }`}>
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                formData.active ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </div>
          </div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Produto *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referência SKU *
          </label>
          <input
            type="text"
            value={formData.reference}
            onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          >
            <option value="">Sem categoria</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tag
          </label>
          <select
            value={formData.tag}
            onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
          >
            <option value="">Sem tag</option>
            <option value="Destaque">Destaque</option>
            <option value="Oferta">Oferta</option>
            <option value="Promoção">Promoção</option>
            <option value="Ultima Unidade">Ultima Unidade</option>
          </select>
        </div>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagem Principal *
        </label>
        {formData.image ? (
          <div className="relative inline-block">
            <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gold transition-all bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                {uploading ? 'Enviando...' : 'Clique para fazer upload'}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Galeria {formData.gallery.length > 0 && `(${formData.gallery.length}/10)`}
        </label>
        {formData.gallery.length > 0 && (
          <div className="grid grid-cols-5 gap-4 mb-4">
            {formData.gallery.map((url: string, index: number) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Galeria ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        {remainingGallerySlots > 0 ? (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gold transition-all bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                {uploadingGallery ? 'Enviando...' : `Adicionar até ${remainingGallerySlots} imagem(ns) (máx. 10)`}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              disabled={uploadingGallery || remainingGallerySlots === 0}
            />
          </label>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Limite de 10 imagens atingido. Remova algumas imagens para adicionar novas.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gold-gradient text-black py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Salvando...' : product?.id ? 'Atualizar' : 'Cadastrar'}
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
