import { MetadataRoute } from 'next';
import { executeQuery } from '../lib/db-helper';
import { Product } from '../types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://clintongold.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas principais
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/joias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vender`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/formas-de-envio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/formas-de-pagamento`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-reembolso-devolucao`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Buscar produtos ativos para adicionar ao sitemap
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const { results } = await executeQuery(
      'SELECT id, name, updatedAt FROM products WHERE active = 1 ORDER BY updatedAt DESC'
    );
    const products: Product[] = results || [];
    
    productPages = products.map((product) => ({
      url: `${baseUrl}/joias/${product.id}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos para sitemap:', error);
  }

  return [...staticPages, ...productPages];
}
