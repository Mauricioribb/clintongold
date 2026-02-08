# 🔑 Como Obter Token de API do Cloudflare

## Opção 1: Token de API (Recomendado para ambientes não-interativos)

1. Acesse: https://dash.cloudflare.com/profile/api-tokens

2. Clique em **"Create Token"**

3. Use o template **"Edit Cloudflare Workers"** ou crie um customizado com estas permissões:
   - **Account** → **Cloudflare Workers** → **Edit**
   - **Account** → **D1** → **Edit**
   - **Account** → **R2** → **Edit**

4. Copie o token gerado (você só verá uma vez!)

5. Configure no terminal:
```bash
export CLOUDFLARE_API_TOKEN=seu-token-aqui
```

6. Ou adicione no arquivo `.env.local`:
```env
CLOUDFLARE_API_TOKEN=seu-token-aqui
```

## Opção 2: Fazer login manualmente no seu terminal

Execute no seu terminal (não no Cursor):
```bash
wrangler login
```

Depois que autorizar no navegador, volte ao terminal e execute:
```bash
wrangler whoami
```

Se mostrar seu email, está autenticado!

## Depois de autenticar

Execute os comandos:
```bash
# Criar banco D1
wrangler d1 create clinton-gold-db

# Copiar o database_id retornado e atualizar no wrangler.toml

# Executar schema
wrangler d1 execute clinton-gold-db --file=./db/schema.sql

# Criar bucket R2
wrangler r2 bucket create clinton-gold-images
```
