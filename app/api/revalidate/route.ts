import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação (apenas admin pode revalidar)
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    
    if (auth?.value !== 'authenticated') {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Revalidar páginas
    revalidatePath('/');
    revalidatePath('/joias');
    
    // Revalidar rotas de API também
    revalidatePath('/api/products');
    revalidatePath('/api/slider');

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      paths: ['/', '/joias', '/api/products', '/api/slider']
    });
  } catch (err) {
    console.error('Erro ao revalidar cache:', err);
    return NextResponse.json(
      { message: 'Erro ao revalidar cache' },
      { status: 500 }
    );
  }
}
