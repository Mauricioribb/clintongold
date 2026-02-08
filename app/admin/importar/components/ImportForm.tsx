'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, CheckCircle, XCircle, Loader } from 'lucide-react';

interface ImportResult {
  success: boolean;
  total: number;
  created: number;
  errors: string[];
  message?: string;
}

export default function ImportForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert('Por favor, selecione um arquivo CSV');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor, selecione um arquivo CSV');
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/products/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        if (data.success && data.created > 0) {
          setTimeout(() => {
            router.push('/admin/produtos');
            router.refresh();
          }, 2000);
        }
      } else {
        setResult({
          success: false,
          total: 0,
          created: 0,
          errors: [data.error || 'Erro ao importar produtos'],
        });
      }
    } catch (error) {
      setResult({
        success: false,
        total: 0,
        created: 0,
        errors: ['Erro ao processar arquivo CSV'],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arquivo CSV *
          </label>
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gold transition-all bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {file ? (
                <>
                  <FileText className="w-12 h-12 mb-2 text-gold" />
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Clique para selecionar o arquivo CSV
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Apenas arquivos .csv
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
        </div>

        {result && (
          <div className={`p-4 rounded-lg border ${
            result.success
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start space-x-3">
              {result.success ? (
                <CheckCircle className="text-green-600 mt-0.5" size={20} />
              ) : (
                <XCircle className="text-red-600 mt-0.5" size={20} />
              )}
              <div className="flex-1">
                <h3 className={`font-medium mb-2 ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? 'Importação Concluída!' : 'Erro na Importação'}
                </h3>
                {result.success ? (
                  <div className="text-sm text-green-700 space-y-1">
                    <p>Total de produtos processados: {result.total}</p>
                    <p>Produtos criados com sucesso: {result.created}</p>
                    {result.errors.length > 0 && (
                      <div className="mt-2">
                        <p className="font-medium">Avisos:</p>
                        <ul className="list-disc list-inside text-xs">
                          {result.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-red-700">
                    <ul className="list-disc list-inside">
                      {result.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading || !file}
            className="flex-1 bg-gold-gradient text-black py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Importando...</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span>Importar Produtos</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
