// Tipos para Cloudflare Workers
export interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;
}

// Funções auxiliares para D1
export async function getProducts(db: D1Database) {
  const { results } = await db.prepare(
    'SELECT * FROM products ORDER BY createdAt DESC'
  ).all();
  return results;
}

export async function getProductById(db: D1Database, id: string) {
  const product = await db.prepare(
    'SELECT * FROM products WHERE id = ?'
  ).bind(id).first();
  return product;
}

export async function createProduct(
  db: D1Database,
  product: {
    id: string;
    name: string;
    reference: string;
    price: number;
    image: string;
    description?: string;
    categoryId?: string;
  }
) {
  const result = await db.prepare(
    `INSERT INTO products (id, name, reference, price, image, description, categoryId, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
  ).bind(
    product.id,
    product.name,
    product.reference,
    product.price,
    product.image,
    product.description || null,
    product.categoryId || null
  ).run();
  return result;
}

export async function updateProduct(
  db: D1Database,
  id: string,
  product: {
    name?: string;
    reference?: string;
    price?: number;
    image?: string;
    description?: string;
    categoryId?: string;
  }
) {
  const updates: string[] = [];
  const values: any[] = [];

  if (product.name) {
    updates.push('name = ?');
    values.push(product.name);
  }
  if (product.reference) {
    updates.push('reference = ?');
    values.push(product.reference);
  }
  if (product.price !== undefined) {
    updates.push('price = ?');
    values.push(product.price);
  }
  if (product.image) {
    updates.push('image = ?');
    values.push(product.image);
  }
  if (product.description !== undefined) {
    updates.push('description = ?');
    values.push(product.description);
  }
  if (product.categoryId !== undefined) {
    updates.push('categoryId = ?');
    values.push(product.categoryId);
  }

  updates.push("updatedAt = datetime('now')");
  values.push(id);

  const result = await db.prepare(
    `UPDATE products SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...values).run();
  return result;
}

export async function deleteProduct(db: D1Database, id: string) {
  const result = await db.prepare(
    'DELETE FROM products WHERE id = ?'
  ).bind(id).run();
  return result;
}

// Categorias
export async function getCategories(db: D1Database) {
  const { results } = await db.prepare(
    'SELECT * FROM categories ORDER BY name ASC'
  ).all();
  return results;
}

export async function createCategory(
  db: D1Database,
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string;
  }
) {
  const result = await db.prepare(
    `INSERT INTO categories (id, name, slug, description, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`
  ).bind(
    category.id,
    category.name,
    category.slug,
    category.description || null
  ).run();
  return result;
}

// Slider
export async function getSliderImages(db: D1Database) {
  const { results } = await db.prepare(
    'SELECT * FROM slider_images ORDER BY "order" ASC'
  ).all();
  return results;
}

export async function createSliderImage(
  db: D1Database,
  image: {
    id: string;
    title: string;
    imageUrl: string;
    link?: string;
    order: number;
    active: boolean;
  }
) {
  const result = await db.prepare(
    `INSERT INTO slider_images (id, title, imageUrl, link, "order", active, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
  ).bind(
    image.id,
    image.title,
    image.imageUrl,
    image.link || null,
    image.order,
    image.active ? 1 : 0
  ).run();
  return result;
}

// R2 Upload
export async function uploadToR2(
  bucket: R2Bucket,
  file: File,
  filename: string
): Promise<string> {
  await bucket.put(filename, file);
  // Retorna a URL pública (ajuste conforme sua configuração)
  return `https://pub-${process.env.R2_ACCOUNT_ID}.r2.dev/${filename}`;
}
