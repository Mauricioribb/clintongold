-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  reference TEXT NOT NULL,
  price REAL NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  gallery TEXT,
  description TEXT,
  categoryId TEXT,
  tag TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

-- Tabela de Slider Images
CREATE TABLE IF NOT EXISTS slider_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  link TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_products_category ON products(categoryId);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(createdAt);
CREATE INDEX IF NOT EXISTS idx_slider_order ON slider_images("order");
CREATE INDEX IF NOT EXISTS idx_slider_active ON slider_images(active);
