# Configuração Cloudflare D1 e R2

## Passo 1: Autenticação no Cloudflare

Execute o comando para fazer login:
```bash
wrangler login
```

Isso abrirá o navegador para autenticação. Após autenticar, continue com os próximos passos.

## Passo 2: Criar Banco de Dados D1

```bash
wrangler d1 create clinton-gold-db
```

Isso retornará algo como:
```
✅ Successfully created DB 'clinton-gold-db'!

[[d1_databases]]
binding = "DB"
database_name = "clinton-gold-db"
database_id = "abc123def456..."
```

**Copie o `database_id` e atualize no arquivo `wrangler.toml`**

## Passo 3: Executar Schema SQL

```bash
wrangler d1 execute clinton-gold-db --file=./db/schema.sql
```

Para desenvolvimento local:
```bash
wrangler d1 execute clinton-gold-db --local --file=./db/schema.sql
```

## Passo 4: Criar Bucket R2

```bash
wrangler r2 bucket create clinton-gold-images
```

## Passo 5: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Cloudflare R2 (opcional - para desenvolvimento local)
R2_ACCOUNT_ID=seu-account-id
R2_ACCESS_KEY_ID=seu-access-key
R2_SECRET_ACCESS_KEY=seu-secret-key

# Base URL (para desenvolvimento)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Passo 6: Atualizar wrangler.toml

Substitua `YOUR_D1_DATABASE_ID` pelo ID retornado no passo 2.

## Verificação

Para testar localmente com D1:
```bash
wrangler d1 execute clinton-gold-db --local --command "SELECT name FROM sqlite_master WHERE type='table';"
```

Para listar buckets R2:
```bash
wrangler r2 bucket list
```
