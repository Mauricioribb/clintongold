// Cliente D1 usando API REST do Cloudflare (para uso em servidor)
export async function executeD1Query(query: string, params: any[] = []): Promise<any> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const databaseId = process.env.D1_DATABASE_ID;

  if (!accountId || !apiToken || !databaseId) {
    const missing = [];
    if (!accountId) missing.push('CLOUDFLARE_ACCOUNT_ID');
    if (!apiToken) missing.push('CLOUDFLARE_API_TOKEN');
    if (!databaseId) missing.push('D1_DATABASE_ID');
    throw new Error(`Cloudflare D1 credentials not configured. Missing: ${missing.join(', ')}`);
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: query,
          params: params,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error('D1 API HTTP Error:', response.status, errorData);
      throw new Error(`D1 API returned ${response.status}: ${errorData.message || errorText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      const errorMsg = data.errors?.[0]?.message || 'D1 query failed';
      console.error('D1 API Error:', JSON.stringify(data, null, 2));
      throw new Error(errorMsg);
    }

    // A API D1 retorna: { success: true, result: [{ results: [...], meta: {...} }] }
    // Precisamos extrair os results de dentro do array
    if (data.result && Array.isArray(data.result) && data.result.length > 0) {
      // Cada item do array pode ter um campo 'results' com os dados
      const firstResult = data.result[0];
      
      if (firstResult.results && Array.isArray(firstResult.results)) {
        return { results: firstResult.results };
      }
      
      // Se não tiver 'results', pode ser que os dados estejam diretamente no array
      if (Array.isArray(firstResult) && firstResult.length > 0) {
        return { results: firstResult };
      }
    }

    // Fallback: retornar array vazio
    return { results: [] };
  } catch (error: any) {
    console.error('Erro ao executar query no D1:', error);
    throw error;
  }
}
