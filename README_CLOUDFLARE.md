# Configuração Cloudflare R2 e D1

## Pré-requisitos

1. Conta no Cloudflare
2. Wrangler CLI instalado: `npm install -g wrangler`
3. Autenticação: `wrangler login`

## Configuração do D1 (Banco de Dados)

1. Criar banco de dados:
```bash
wrangler d1 create clinton-gold-db
```

2. Copiar o `database_id` retornado e atualizar no `wrangler.toml`

3. Executar o schema:
```bash
wrangler d1 execute clinton-gold-db --file=./db/schema.sql
```

## Configuração do R2 (Armazenamento de Imagens)

1. Criar bucket:
```bash
wrangler r2 bucket create clinton-gold-images
```

2. Configurar domínio público (opcional):
- No dashboard do Cloudflare, vá em R2 > clinton-gold-images > Settings
- Configure um domínio customizado para acesso público

3. Atualizar variáveis de ambiente:
```bash
# .env.local
R2_ACCOUNT_ID=seu-account-id
R2_ACCESS_KEY_ID=seu-access-key
R2_SECRET_ACCESS_KEY=seu-secret-key
```

## Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
ADMIN_PASSWORD=sua-senha-segura
R2_ACCOUNT_ID=seu-account-id
R2_ACCESS_KEY_ID=seu-access-key
R2_SECRET_ACCESS_KEY=seu-secret-key
```

## Deploy

Para fazer deploy no Cloudflare Pages:

1. Conecte seu repositório GitHub ao Cloudflare Pages
2. Configure as variáveis de ambiente no dashboard
3. O build será feito automaticamente

## Desenvolvimento Local

Para testar localmente com D1:

```bash
wrangler d1 execute clinton-gold-db --local --file=./db/schema.sql
npm run dev
```

## Estrutura do Banco de Dados

- **categories**: Categorias de produtos
- **products**: Produtos da loja
- **slider_images**: Imagens do slider principal

## API Routes

- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `GET /api/products/[id]` - Buscar produto
- `PUT /api/products/[id]` - Atualizar produto
- `DELETE /api/products/[id]` - Deletar produto

- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria

- `GET /api/slider` - Listar imagens do slider
- `POST /api/slider` - Criar imagem do slider

- `POST /api/upload` - Upload de imagem para R2
