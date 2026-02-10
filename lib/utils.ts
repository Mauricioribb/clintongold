// Função para gerar UUID
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para Node.js < 19
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Função para revalidar cache após mudanças
export async function revalidateCache(): Promise<void> {
  try {
    // Em Server Components, usar revalidatePath diretamente
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/');
    revalidatePath('/joias');
    revalidatePath('/api/products');
    revalidatePath('/api/slider');
  } catch (error) {
    console.error('Erro ao revalidar cache:', error);
    // Não falhar a operação se a revalidação falhar
  }
}
