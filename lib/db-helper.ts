import { executeD1Query } from './cloudflare-d1';

// Função para executar queries (usa D1 real via API REST - obrigatório)
export async function executeQuery(query: string, params: any[] = []): Promise<any> {
  // Verificar se credenciais estão configuradas
  if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.D1_DATABASE_ID) {
    throw new Error('D1 credentials not configured. Configure CLOUDFLARE_API_TOKEN and D1_DATABASE_ID');
  }

  // Sempre usar D1 real via API REST
  return await executeD1Query(query, params);
}
