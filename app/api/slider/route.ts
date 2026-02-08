import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateId } from '@/lib/utils';
import { executeQuery } from '@/lib/db-helper';

export async function GET(request: NextRequest) {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM slider_images ORDER BY "order" ASC'
    );
    return NextResponse.json(results || []);
  } catch (error: any) {
    console.error('Erro ao buscar imagens do slider:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar imagens do slider' },
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
    const { title, imageUrl, link, order, active } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: title, imageUrl' },
        { status: 400 }
      );
    }

    const imageId = generateId();

    // Inserir imagem
    await executeQuery(
      `INSERT INTO slider_images (id, title, imageUrl, link, "order", active, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [
        imageId,
        title,
        imageUrl,
        link || null,
        order || 0,
        active !== undefined ? (active ? 1 : 0) : 1
      ]
    );

    // Buscar imagem criada
    const { results } = await executeQuery(
      'SELECT * FROM slider_images WHERE id = ?',
      [imageId]
    );

    const image = results?.[0] || {
      id: imageId,
      title,
      imageUrl,
      link: link || null,
      order: order || 0,
      active: active !== undefined ? active : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(image, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar imagem do slider:', error);
    return NextResponse.json(
      { error: 'Erro ao criar imagem do slider' },
      { status: 500 }
    );
  }
}
