import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateId } from '@/lib/utils';
import { executeQuery } from '@/lib/db-helper';

export async function GET(request: NextRequest) {
  try {
    const result = await executeQuery(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    
    // Garantir que sempre retornamos um array
    const results = result?.results || [];
    
    if (!Array.isArray(results)) {
      console.error('Resultado não é um array:', result);
      return NextResponse.json([], { status: 200 });
    }
    
    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Erro ao buscar categorias:', error);
    console.error('Stack:', error.stack);
    
    // Mensagem de erro mais específica
    let errorMessage = error.message || 'Erro ao buscar categorias';
    
    if (errorMessage.includes('403') || errorMessage.includes('not authorized')) {
      errorMessage = 'Credenciais do Cloudflare D1 inválidas ou sem permissão. Verifique CLOUDFLARE_API_TOKEN e CLOUDFLARE_ACCOUNT_ID no .env.local';
    } else if (errorMessage.includes('credentials not configured')) {
      errorMessage = 'Credenciais do Cloudflare D1 não configuradas. Configure no .env.local';
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    
    if (auth?.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: name, slug' },
        { status: 400 }
      );
    }

    const categoryId = generateId();

    // Inserir categoria
    await executeQuery(
      `INSERT INTO categories (id, name, slug, description, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [categoryId, name, slug, description || null]
    );

    // Buscar categoria criada
    const result = await executeQuery(
      'SELECT * FROM categories WHERE id = ?',
      [categoryId]
    );

    const results = result?.results || [];
    const category = results[0] || {
      id: categoryId,
      name,
      slug,
      description: description || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar categoria:', error);
    
    // Mensagem de erro mais específica
    let errorMessage = error.message || 'Erro ao criar categoria';
    
    if (errorMessage.includes('403') || errorMessage.includes('not authorized')) {
      errorMessage = 'Credenciais do Cloudflare D1 inválidas ou sem permissão. Verifique CLOUDFLARE_API_TOKEN e CLOUDFLARE_ACCOUNT_ID no .env.local';
    } else if (errorMessage.includes('credentials not configured')) {
      errorMessage = 'Credenciais do Cloudflare D1 não configuradas. Configure no .env.local';
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
