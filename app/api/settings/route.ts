import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { executeQuery } from '@/lib/db-helper';
import { generateId } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { results } = await executeQuery(
      'SELECT key, value FROM settings'
    );
    
    // Converter array de objetos em objeto chave-valor
    const settings: Record<string, string> = {};
    if (results && Array.isArray(results)) {
      results.forEach((row: any) => {
        settings[row.key] = row.value;
      });
    }
    
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar configurações' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    
    // Debug: log apenas em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      console.log('Auth cookie:', auth ? 'presente' : 'ausente', auth?.value);
    }
    
    if (auth?.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Não autorizado. Por favor, faça login novamente.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'Key e value são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se já existe
    const { results: existing } = await executeQuery(
      'SELECT id FROM settings WHERE key = ?',
      [key]
    );

    const now = new Date().toISOString();

    if (existing && existing.length > 0) {
      // Atualizar
      await executeQuery(
        'UPDATE settings SET value = ?, updatedAt = ? WHERE key = ?',
        [value, now, key]
      );
    } else {
      // Criar novo
      const id = generateId();
      await executeQuery(
        'INSERT INTO settings (id, key, value, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        [id, key, value, now, now]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao salvar configuração:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar configuração' },
      { status: 500 }
    );
  }
}
