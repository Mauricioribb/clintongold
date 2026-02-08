import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { executeQuery } from '@/lib/db-helper';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await executeQuery(
      'SELECT * FROM categories WHERE id = ?',
      [params.id]
    );
    
    const results = result?.results || [];
    
    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(results[0]);
  } catch (error: any) {
    console.error('Erro ao buscar categoria:', error);
    return NextResponse.json(
      { error: 'Categoria não encontrada' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Atualizar categoria
    await executeQuery(
      `UPDATE categories SET name = ?, slug = ?, description = ?, updatedAt = datetime('now') WHERE id = ?`,
      [name, slug, description || null, params.id]
    );

    // Buscar categoria atualizada
    const result = await executeQuery(
      'SELECT * FROM categories WHERE id = ?',
      [params.id]
    );

    const results = result?.results || [];
    const category = results[0] || {
      id: params.id,
      name,
      slug,
      description: description || null,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Erro ao atualizar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar categoria' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    
    if (auth?.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await executeQuery(
      'DELETE FROM categories WHERE id = ?',
      [params.id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao deletar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar categoria' },
      { status: 500 }
    );
  }
}
