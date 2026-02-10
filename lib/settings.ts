// Função para buscar configurações do servidor
export async function getSettings(): Promise<Record<string, string>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (typeof window === 'undefined' 
                     ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
                     : '');
    
    const apiUrl = baseUrl ? `${baseUrl}/api/settings` : '/api/settings';
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache por 60 segundos
      cache: 'no-store'
    });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return {};
  }
}

// Função para obter o número do WhatsApp formatado
export function getWhatsAppUrl(phoneNumber?: string): string {
  // Se não tiver número, usar o padrão
  const number = phoneNumber || '5571991369104';
  // Remover caracteres não numéricos
  const cleanNumber = number.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}`;
}

// Função para obter o número do WhatsApp formatado para exibição
export function formatWhatsAppNumber(phoneNumber?: string): string {
  const number = phoneNumber || '5571991369104';
  const cleanNumber = number.replace(/\D/g, '');
  
  if (cleanNumber.length <= 2) return `+${cleanNumber}`;
  if (cleanNumber.length <= 4) return `+${cleanNumber.slice(0, 2)} (${cleanNumber.slice(2)}`;
  if (cleanNumber.length <= 9) return `+${cleanNumber.slice(0, 2)} (${cleanNumber.slice(2, 4)}) ${cleanNumber.slice(4)}`;
  return `+${cleanNumber.slice(0, 2)} (${cleanNumber.slice(2, 4)}) ${cleanNumber.slice(4, 9)}-${cleanNumber.slice(9, 13)}`;
}
