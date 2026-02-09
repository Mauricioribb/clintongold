'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeleteSliderButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar esta imagem do slider?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/slider/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao deletar imagem');
      }
    } catch (error) {
      alert('Erro ao deletar imagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 hover:bg-red-50 rounded-lg transition-all text-red-600 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
}
