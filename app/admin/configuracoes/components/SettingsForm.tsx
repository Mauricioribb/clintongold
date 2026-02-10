'use client';

import { useState, useEffect } from 'react';
import { Save, Loader } from 'lucide-react';

interface SettingsFormProps {
  initialSettings: Record<string, string>;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsapp_number || '');
  const [salesDisabled, setSalesDisabled] = useState(
    initialSettings.sales_disabled === 'true' || initialSettings.sales_disabled === true
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setWhatsappNumber(initialSettings.whatsapp_number || '');
    setSalesDisabled(initialSettings.sales_disabled === 'true' || initialSettings.sales_disabled === true);
  }, [initialSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Remover caracteres não numéricos
      const cleanNumber = whatsappNumber.replace(/\D/g, '');

      if (!cleanNumber) {
        setMessage({ type: 'error', text: 'Número do WhatsApp é obrigatório' });
        setLoading(false);
        return;
      }

      // Salvar WhatsApp
      const whatsappResponse = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'whatsapp_number',
          value: cleanNumber,
        }),
      });

      if (!whatsappResponse.ok) {
        throw new Error('Erro ao salvar configuração do WhatsApp');
      }

      // Salvar sales_disabled
      const salesResponse = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'sales_disabled',
          value: salesDisabled ? 'true' : 'false',
        }),
      });

      if (!salesResponse.ok) {
        throw new Error('Erro ao salvar configuração de vendas');
      }

      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
      
      // Atualizar a página após 1 segundo
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar configurações. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const formatWhatsAppNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Formata: +55 (71) 99136-9104
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `+${numbers}`;
    if (numbers.length <= 4) return `+${numbers.slice(0, 2)} (${numbers.slice(2)}`;
    if (numbers.length <= 9) return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4)}`;
    // Para 13 dígitos: +55 (71) 99136-9104
    return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 9)}-${numbers.slice(9, 13)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas números e caracteres de formatação
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 13) {
      setWhatsappNumber(cleaned);
    }
  };

  const displayValue = whatsappNumber ? formatWhatsAppNumber(whatsappNumber) : '';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            Número do WhatsApp
          </label>
          <input
            type="text"
            id="whatsapp"
            value={displayValue}
            onChange={handleWhatsAppChange}
            placeholder="+55 (71) 99136-9104"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
            maxLength={19}
          />
          <p className="mt-2 text-sm text-gray-500">
            Digite apenas números. O formato será aplicado automaticamente. Exemplo: 5571991369104
          </p>
          <p className="mt-1 text-xs text-gray-400">
            O número será usado em todos os links do WhatsApp no site.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="sales_disabled"
              checked={salesDisabled}
              onChange={(e) => setSalesDisabled(e.target.checked)}
              className="mt-1 w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
            />
            <div className="flex-1">
              <label htmlFor="sales_disabled" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide cursor-pointer">
                Desativar Vendas
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Quando ativado, oculta o menu "Jóias", o bloco "Produtos Novos" e o carrossel de destaques da home.
              </p>
              <p className="text-xs text-gray-400">
                Isso é útil quando você quer focar apenas na compra de joias, sem exibir produtos à venda.
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-gold-gradient text-black rounded-lg font-bold uppercase tracking-wider hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Salvar Configurações</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
