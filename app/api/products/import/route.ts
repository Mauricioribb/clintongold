import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateId } from '@/lib/utils';
import { executeQuery } from '@/lib/db-helper';
import { getR2Client } from '@/lib/r2-client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

// Função para baixar imagem de URL e fazer upload para R2 (com timeout e retry)
async function downloadAndUploadImage(imageUrl: string, retries = 2): Promise<string | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Timeout de 30 segundos por imagem
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      // Baixar a imagem com timeout
      const response = await fetch(imageUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ClintonGold/1.0)',
        },
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erro ao baixar imagem: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Limitar tamanho da imagem (10MB)
      if (buffer.length > 10 * 1024 * 1024) {
        throw new Error('Imagem muito grande (máximo 10MB)');
      }
      
      // Detectar tipo MIME
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      
      // Gerar nome do arquivo
      const urlParts = imageUrl.split('/');
      const originalName = urlParts[urlParts.length - 1].split('?')[0];
      const extension = originalName.split('.').pop() || 'jpg';
      const filename = `${Date.now()}-${generateId()}.${extension}`;

      // Fazer upload direto para R2 usando buffer
      const client = getR2Client();
      if (!client) {
        throw new Error('R2 credentials not configured');
      }

      const bucketName = process.env.R2_BUCKET_NAME || 'clinton-gold-images';

      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: filename,
          Body: buffer,
          ContentType: contentType,
        })
      );

      const publicUrl = process.env.R2_PUBLIC_URL || 
                        `https://pub-${process.env.R2_ACCOUNT_ID}.r2.dev`;
      
      return `${publicUrl}/${filename}`;
    } catch (error: any) {
      if (attempt < retries) {
        // Aguardar antes de tentar novamente (backoff exponencial)
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
      console.error(`Erro ao processar imagem ${imageUrl} (tentativa ${attempt + 1}/${retries + 1}):`, error.message);
      return null;
    }
  }
  return null;
}


// Função para processar galeria (múltiplas URLs separadas por vírgula) com processamento paralelo controlado
async function processGallery(galleryString: string, maxConcurrent = 3): Promise<string[]> {
  if (!galleryString || galleryString.trim() === '') {
    return [];
  }

  const urls = galleryString.split(',').map(url => url.trim()).filter(url => url);
  const uploadedUrls: string[] = [];
  
  // Processar em lotes para não sobrecarregar
  for (let i = 0; i < urls.length; i += maxConcurrent) {
    const batch = urls.slice(i, i + maxConcurrent);
    const batchResults = await Promise.all(
      batch.map(url => downloadAndUploadImage(url))
    );
    
    batchResults.forEach(result => {
      if (result) {
        uploadedUrls.push(result);
      }
    });
    
    // Pequeno delay entre lotes para não sobrecarregar
    if (i + maxConcurrent < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return uploadedUrls;
}

// Função para criar ou buscar categoria
async function getOrCreateCategory(categoryName: string): Promise<string | null> {
  if (!categoryName || categoryName.trim() === '') {
    return null;
  }

  try {
    // Buscar categoria existente
    const slug = categoryName.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existingResult = await executeQuery(
      'SELECT id FROM categories WHERE slug = ?',
      [slug]
    );

    if (existingResult?.results && existingResult.results.length > 0) {
      return existingResult.results[0].id;
    }

    // Criar nova categoria
    const categoryId = generateId();
    await executeQuery(
      `INSERT INTO categories (id, name, slug, createdAt, updatedAt)
       VALUES (?, ?, ?, datetime('now'), datetime('now'))`,
      [categoryId, categoryName.trim(), slug]
    );

    return categoryId;
  } catch (error: any) {
    console.error(`Erro ao criar categoria ${categoryName}:`, error);
    return null;
  }
}

// Função para parsear CSV (suporta campos com vírgulas entre aspas)
function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Pular próxima aspas
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Função para parsear CSV
function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  // Detectar delimitador (vírgula ou ponto e vírgula)
  const firstLine = lines[0];
  const delimiter = firstLine.includes(';') ? ';' : ',';

  // Headers
  const headers = parseCSVLine(firstLine, delimiter).map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());

  // Mapear índices
  const nameIndex = headers.findIndex(h => h.includes('nome'));
  const descIndex = headers.findIndex(h => h.includes('descrição') || h.includes('descricao'));
  const imageIndex = headers.findIndex(h => h.includes('imagem principal') || h.includes('imagem_principal'));
  const galleryIndex = headers.findIndex(h => h.includes('galeria'));
  const priceIndex = headers.findIndex(h => h.includes('preço') || h.includes('preco'));
  const categoryIndex = headers.findIndex(h => h.includes('categoria'));
  const skuIndex = headers.findIndex(h => h.includes('sku') || h.includes('referência') || h.includes('referencia'));

  const products: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i], delimiter).map(v => v.replace(/^"|"$/g, '').trim());
    
    if (values.length === 0 || !values[nameIndex]) continue;

    products.push({
      name: values[nameIndex] || '',
      description: values[descIndex] || '',
      image: values[imageIndex] || '',
      gallery: values[galleryIndex] || '',
      price: values[priceIndex] ? parseFloat(values[priceIndex].replace(',', '.').replace(/[^\d.,]/g, '')) || 0 : 0,
      category: values[categoryIndex] || '',
      reference: values[skuIndex] || '',
    });
  }

  return products;
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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Limitar tamanho do arquivo (50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 50MB' },
        { status: 400 }
      );
    }

    // Ler conteúdo do CSV
    const csvText = await file.text();
    const products = parseCSV(csvText);

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum produto encontrado no CSV' },
        { status: 400 }
      );
    }

    // Limitar número de produtos por importação (500)
    if (products.length > 500) {
      return NextResponse.json(
        { 
          error: `Muitos produtos (${products.length}). Máximo 500 por importação. Divida o arquivo em lotes menores.`,
          total: products.length,
          maxAllowed: 500
        },
        { status: 400 }
      );
    }

    const results = {
      success: true,
      total: products.length,
      created: 0,
      errors: [] as string[],
    };

    // Processar em lotes de 10 produtos para evitar travamentos
    const BATCH_SIZE = 10;
    const batches = [];
    
    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      batches.push(products.slice(i, i + BATCH_SIZE));
    }

    // Processar cada lote
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      
      // Processar produtos do lote
      for (const product of batch) {
        try {
          // Validar campos obrigatórios
          if (!product.name || !product.reference) {
            results.errors.push(`Produto "${product.name || 'Sem nome'}" ignorado: falta nome ou SKU`);
            continue;
          }

          // Processar categoria
          let categoryId: string | null = null;
          if (product.category) {
            categoryId = await getOrCreateCategory(product.category);
          }

          // Processar imagem principal
          let mainImage = '';
          if (product.image) {
            const uploadedImage = await downloadAndUploadImage(product.image);
            if (uploadedImage) {
              mainImage = uploadedImage;
            } else {
              results.errors.push(`Produto "${product.name}": erro ao baixar imagem principal`);
              continue; // Pular produto sem imagem principal
            }
          } else {
            results.errors.push(`Produto "${product.name}": sem imagem principal`);
            continue;
          }

          // Processar galeria
          let gallery: string[] = [];
          if (product.gallery) {
            gallery = await processGallery(product.gallery);
          }

          // Criar produto
          const productId = generateId();
          await executeQuery(
            `INSERT INTO products (id, name, reference, price, image, gallery, description, categoryId, active, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
            [
              productId,
              product.name,
              product.reference,
              product.price || 0,
              mainImage,
              gallery.length > 0 ? JSON.stringify(gallery) : null,
              product.description || null,
              categoryId,
              1, // Ativo por padrão
            ]
          );

          results.created++;
          
          // Pequeno delay entre produtos para não sobrecarregar
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error: any) {
          results.errors.push(`Erro ao processar "${product.name}": ${error.message}`);
        }
      }
      
      // Delay maior entre lotes para dar tempo ao servidor processar
      if (batchIndex < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Erro ao importar produtos:', error);
    return NextResponse.json(
      { 
        success: false,
        total: 0,
        created: 0,
        errors: [error.message || 'Erro ao processar arquivo CSV']
      },
      { status: 500 }
    );
  }
}
