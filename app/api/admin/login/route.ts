import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

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
