'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { 
  loadCaptchaEnginge, 
  LoadCanvasTemplate, 
  validateCaptcha 
} from 'react-simple-captcha';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Campo honeypot
  const [captchaValue, setCaptchaValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCaptchaEnginge(6); // 6 caracteres no CAPTCHA
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Verificar honeypot (se preenchido, é bot)
      if (honeypot) {
        setError('Erro de validação');
        setLoading(false);
        return;
      }

      // Validar CAPTCHA
      if (!validateCaptcha(captchaValue)) {
        setError('CAPTCHA inválido. Tente novamente.');
        setLoading(false);
        // Recarregar CAPTCHA
        loadCaptchaEnginge(6);
        setCaptchaValue('');
        return;
      }

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password, honeypot }),
      });

      const data = await response.json();

      if (response.ok) {
        router.refresh();
        router.push('/admin');
      } else {
        setError(data.error || 'Usuário ou senha incorretos');
        // Recarregar CAPTCHA após erro
        loadCaptchaEnginge(6);
        setCaptchaValue('');
      }
    } catch (err) {
      setError('Erro ao fazer login');
      loadCaptchaEnginge(6);
      setCaptchaValue('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-black" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Área Administrativa</h1>
          <p className="text-gray-600">Clinton Gold</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Honeypot - campo oculto que bots preenchem */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
              required
              disabled={loading}
              placeholder="Digite seu usuário"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
              required
              disabled={loading}
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </div>
          
          {/* CAPTCHA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Digite o código abaixo
            </label>
            <div className="mb-2">
              <LoadCanvasTemplate />
            </div>
            <input
              type="text"
              value={captchaValue}
              onChange={(e) => setCaptchaValue(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all"
              required
              disabled={loading}
              placeholder="Digite o código do CAPTCHA"
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-black py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
