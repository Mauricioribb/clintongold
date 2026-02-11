import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Rate limiting simples em memória (em produção, use Redis ou banco de dados)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);

  if (!attempts) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }

  // Reset após 15 minutos
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }

  // Máximo de 5 tentativas a cada 15 minutos
  if (attempts.count >= 5) {
    return false;
  }

  attempts.count++;
  attempts.lastAttempt = now;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, honeypot } = await request.json();

    // Obter IP do cliente
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Verificar honeypot (se preenchido, é bot)
    if (honeypot) {
      return NextResponse.json(
        { error: 'Erro de validação' },
        { status: 403 }
      );
    }

    // Verificar rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas de login. Aguarde 15 minutos antes de tentar novamente.' },
        { status: 429 }
      );
    }

    // Credenciais padrão - em produção, use variável de ambiente e hash
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Debug: verificar se as variáveis estão sendo lidas
    // Verificar se está usando variáveis de ambiente ou padrão
    const usingEnvUsername = !!process.env.ADMIN_USERNAME;
    const usingEnvPassword = !!process.env.ADMIN_PASSWORD;
    
    console.log('[LOGIN DEBUG] Usando ADMIN_USERNAME da env:', usingEnvUsername);
    console.log('[LOGIN DEBUG] Usando ADMIN_PASSWORD da env:', usingEnvPassword);

    if (username === adminUsername && password === adminPassword) {
      // Limpar tentativas após login bem-sucedido
      loginAttempts.delete(ip);

      const cookieStore = await cookies();
      const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
      
      cookieStore.set('admin_auth', 'authenticated', {
        httpOnly: true,
        secure: isProduction, // true em produção (HTTPS)
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/', // Garantir que o cookie está disponível em todo o site
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Usuário ou senha incorretos' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}
