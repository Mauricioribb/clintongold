# 🚀 Configuração Cloudflare D1 e R2

## Passo 1: Autenticação no Cloudflare

Primeiro, você precisa fazer login no Cloudflare:

```bash
wrangler login
```

Isso abrirá o navegador para você autenticar. Após autenticar, continue.

## Passo 2: Criar Banco de Dados D1

Execute o comando para criar o banco:

```bash
npm run db:create
```

Ou manualmente:
```bash
wrangler d1 create clinton-gold-db
```

**IMPORTANTE:** O comando retornará algo como:
```
✅ Successfully created DB 'clinton-gold-db'!

[[d1_databases]]
binding = "DB"
database_name = "clinton-gold-db"
database_id = "abc123def456ghi789..."
```

**Copie o `database_id` e atualize no arquivo `wrangler.toml` na linha 13.**

## Passo 3: Executar Schema SQL

Após atualizar o `database_id` no `wrangler.toml`, execute:

```bash
npm run db:migrate
```

Ou manualmente:
```bash
wrangler d1 execute clinton-gold-db --file=./db/schema.sql
```

Para desenvolvimento local:
```bash
npm run db:local
```

## Passo 4: Criar Bucket R2

```bash
npm run r2:create
```

Ou manualmente:
```bash
wrangler r2 bucket create clinton-gold-images
```

## Passo 5: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Cloudflare R2 (opcional para desenvolvimento local)
# Obtenha essas credenciais em: https://dash.cloudflare.com/r2/api-tokens
R2_ACCOUNT_ID=seu-account-id
R2_ACCESS_KEY_ID=seu-access-key
R2_SECRET_ACCESS_KEY=seu-secret-key
R2_PUBLIC_URL=https://pub-seu-account-id.r2.dev

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Passo 6: Verificar Configuração

Para testar se o banco está funcionando:

```bash
wrangler d1 execute clinton-gold-db --command "SELECT name FROM sqlite_master WHERE type='table';"
```

Para listar buckets R2:
```bash
wrangler r2 bucket list
```

## Script Automatizado

Você também pode usar o script automatizado:

```bash
npm run setup:cloudflare
```

Ou:
```bash
./scripts/setup-cloudflare.sh
```

## Estrutura do Banco de Dados

### Tabela: categories
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `slug` (TEXT NOT NULL UNIQUE)
- `description` (TEXT)
- `createdAt` (TEXT NOT NULL)
- `updatedAt` (TEXT NOT NULL)

### Tabela: products
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `reference` (TEXT NOT NULL)
- `price` (REAL NOT NULL DEFAULT 0)
- `image` (TEXT NOT NULL)
- `description` (TEXT)
- `categoryId` (TEXT, FOREIGN KEY)
- `createdAt` (TEXT NOT NULL)
- `updatedAt` (TEXT NOT NULL)

### Tabela: slider_images
- `id` (TEXT PRIMARY KEY)
- `title` (TEXT NOT NULL)
- `imageUrl` (TEXT NOT NULL)
- `link` (TEXT)
- `order` (INTEGER NOT NULL DEFAULT 0)
- `active` (INTEGER NOT NULL DEFAULT 1)
- `createdAt` (TEXT NOT NULL)
- `updatedAt` (TEXT NOT NULL)

## Próximos Passos

Após configurar:
1. ✅ Teste criar um produto no admin
2. ✅ Teste fazer upload de imagem
3. ✅ Verifique se os dados aparecem nas listagens

## Troubleshooting

**Erro: "database not found"**
- Verifique se o `database_id` está correto no `wrangler.toml`
- Execute `wrangler d1 list` para ver seus bancos

**Erro: "bucket not found"**
- Execute `wrangler r2 bucket list` para verificar
- Crie o bucket novamente se necessário

**Erro de autenticação**
- Execute `wrangler login` novamente
- Verifique se você tem permissões na conta Cloudflare
