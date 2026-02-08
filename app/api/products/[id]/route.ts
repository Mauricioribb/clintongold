import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { executeQuery } from '@/lib/db-helper';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM products WHERE id = ?',
      [params.id]
    );
    
    if (results && results.length > 0) {
      return NextResponse.json(results[0]);
    }
    
    return NextResponse.json(
      { error: 'Produto não encontrado' },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Produto não encontrado' },
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

    const updates: string[] = [];
    const values: any[] = [];

    if (body.name) {
      updates.push('name = ?');
      values.push(body.name);
    }
    if (body.reference) {
      updates.push('reference = ?');
      values.push(body.reference);
    }
    if (body.price !== undefined) {
      updates.push('price = ?');
      values.push(body.price);
    }
    if (body.image) {
      updates.push('image = ?');
      values.push(body.image);
    }
    if (body.description !== undefined) {
      updates.push('description = ?');
      values.push(body.description);
    }
    if (body.categoryId !== undefined) {
      updates.push('categoryId = ?');
      values.push(body.categoryId);
    }
    if (body.tag !== undefined) {
      updates.push('tag = ?');
      values.push(body.tag);
    }
    if (body.gallery !== undefined) {
      updates.push('gallery = ?');
      values.push(body.gallery);
    }

    updates.push("updatedAt = datetime('now')");
    values.push(params.id);

    await executeQuery(
      `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const { results } = await executeQuery(
      'SELECT * FROM products WHERE id = ?',
      [params.id]
    );

    return NextResponse.json(results?.[0] || { success: true });
  } catch (error: any) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
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
      'DELETE FROM products WHERE id = ?',
      [params.id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar produto' },
      { status: 500 }
    );
  }
}
