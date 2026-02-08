// Armazenamento local para R2 durante desenvolvimento
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads');

// Garantir que o diretório existe
async function ensureUploadsDir() {
  if (!existsSync(UPLOADS_DIR)) {
    await mkdir(UPLOADS_DIR, { recursive: true });
  }
}

// Salvar arquivo localmente (simula R2)
export async function saveFileLocal(filename: string, file: File): Promise<string> {
  await ensureUploadsDir();
  
  const filePath = join(UPLOADS_DIR, filename);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  await writeFile(filePath, buffer);
  
  // Retornar URL relativa para servir via Next.js
  return `/uploads/${filename}`;
}

// Verificar se arquivo existe localmente
export function fileExistsLocal(filename: string): boolean {
  const filePath = join(UPLOADS_DIR, filename);
  return existsSync(filePath);
}
