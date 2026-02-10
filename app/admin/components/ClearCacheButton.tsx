'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function ClearCacheButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClearCache = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
      });

      if (response.ok) {
        setMessage('Cache limpo com sucesso!');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage('Erro ao limpar cache');
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      setMessage('Erro ao limpar cache');
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClearCache}
        disabled={isLoading}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gold hover:bg-gold/10 transition-all text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
        <span>{isLoading ? 'Limpando...' : 'Limpar Cache'}</span>
      </button>
      {message && (
        <div className={`absolute top-full mt-2 left-0 px-3 py-1 rounded text-sm whitespace-nowrap ${
          message.includes('sucesso') 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
