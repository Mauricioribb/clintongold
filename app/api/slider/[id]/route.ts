import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateCache } from '@/lib/utils';
import { executeQuery } from '@/lib/db-helper';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { results } = await executeQuery(
      'SELECT * FROM slider_images WHERE id = ?',
      [id]
    );
    
    if (results && results.length > 0) {
      return NextResponse.json(results[0]);
    }
    
    return NextResponse.json(
      { error: 'Imagem não encontrada' },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Erro ao buscar imagem do slider:', error);
    return NextResponse.json(
      { error: 'Imagem não encontrada' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;
    const body = await request.json();
    const { title, imageUrl, link, order, active } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: title, imageUrl' },
        { status: 400 }
      );
    }

    // Atualizar imagem
    await executeQuery(
      `UPDATE slider_images 
       SET title = ?, imageUrl = ?, link = ?, "order" = ?, active = ?, updatedAt = datetime('now')
       WHERE id = ?`,
      [
        title,
        imageUrl,
        link || null,
        order || 0,
        active !== undefined ? (active ? 1 : 0) : 1,
        id
      ]
    );

    // Buscar imagem atualizada
    const { results } = await executeQuery(
      'SELECT * FROM slider_images WHERE id = ?',
      [id]
    );

    // Revalidar cache após atualizar slider
    await revalidateCache();

    return NextResponse.json(results?.[0] || { success: true });
  } catch (error: any) {
    console.error('Erro ao atualizar imagem do slider:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar imagem do slider' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;
    await executeQuery(
      'DELETE FROM slider_images WHERE id = ?',
      [id]
    );

    // Revalidar cache após deletar slider
    await revalidateCache();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao deletar imagem do slider:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar imagem do slider' },
      { status: 500 }
    );
  }
}
