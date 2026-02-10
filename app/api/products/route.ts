import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateId, revalidateCache } from '@/lib/utils';
import { executeQuery } from '@/lib/db-helper';


export async function GET(request: NextRequest) {
  try {
    const { results } = await executeQuery(
      'SELECT * FROM products ORDER BY createdAt DESC'
    );
    return NextResponse.json(results || []);
  } catch (error: any) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
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
    const { name, reference, price, image, gallery, description, categoryId, tag, active } = body;

    // Validação
    if (!name || !reference || !image) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: name, reference, image' },
        { status: 400 }
      );
    }

    const productId = generateId();

    // Inserir produto
    await executeQuery(
      `INSERT INTO products (id, name, reference, price, image, gallery, description, categoryId, tag, active, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [productId, name, reference, price || 0, image, gallery || null, description || null, categoryId || null, tag || null, active !== undefined ? active : 1]
    );

    // Buscar produto criado
    const result = await executeQuery(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );

    const results = result?.results || [];
    const product = results[0] || {
      id: productId,
      name,
      reference,
      price: price || 0,
      image,
      gallery: gallery || null,
      description: description || null,
      categoryId: categoryId || null,
      tag: tag || null,
      active: active !== undefined ? active : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Revalidar cache após criar produto
    await revalidateCache();

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}
