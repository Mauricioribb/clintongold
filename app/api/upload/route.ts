import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { uploadToR2 } from '@/lib/r2-client';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido' },
        { status: 400 }
      );
    }

    // Validar tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Verificar se credenciais R2 estão configuradas
    if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'R2 credentials not configured. Configure R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY' },
        { status: 500 }
      );
    }

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // Sempre usar R2 real via SDK
    try {
      const r2Url = await uploadToR2(filename, file);
      return NextResponse.json({
        url: r2Url,
        filename,
        size: file.size,
        type: file.type,
        source: 'R2'
      });
    } catch (r2Error: any) {
      console.error('Erro ao fazer upload para R2:', r2Error);
      return NextResponse.json(
        { error: r2Error.message || 'Erro ao fazer upload para R2' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao fazer upload:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload' },
      { status: 500 }
    );
  }
}
