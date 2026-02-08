# 🔑 Como Obter o Cloudflare API Token

## Passo a Passo Completo

### 1. Acesse o Dashboard do Cloudflare

1. Acesse: https://dash.cloudflare.com/
2. Faça login na sua conta

### 2. Vá para a Seção de API Tokens

1. No canto superior direito, clique no seu **perfil** (ícone de pessoa)
2. Selecione **"My Profile"** (Meu Perfil)
3. No menu lateral esquerdo, clique em **"API Tokens"**

**OU** acesse diretamente:
https://dash.cloudflare.com/profile/api-tokens

### 3. Criar um Novo Token

1. Clique no botão **"Create Token"** (Criar Token)
2. Você verá alguns templates. **NÃO use os templates prontos**
3. Role até o final e clique em **"Create Custom Token"** (Criar Token Personalizado)

### 4. Configurar o Token

Preencha os campos:

#### **Token name** (Nome do Token)
```
Clinton Gold - D1 e R2 Access
```
(ou qualquer nome que você preferir)

#### **Permissions** (Permissões)

Você precisa adicionar **2 permissões**:

**Permissão 1 - D1 (Database):**
- **Account** → **D1** → **Edit**
- Selecione sua conta no dropdown

**Permissão 2 - R2 (Storage):**
- **Account** → **Cloudflare R2** → **Edit**
- Selecione sua conta no dropdown

#### **Account Resources** (Recursos da Conta)
- Selecione **"Include"** (Incluir)
- Escolha sua conta no dropdown

#### **Zone Resources** (Recursos da Zona)
- Pode deixar como está (não é necessário para D1 e R2)

### 5. Continuar e Criar

1. Clique em **"Continue to summary"** (Continuar para resumo)
2. Revise as permissões
3. Clique em **"Create Token"** (Criar Token)

### 6. Copiar o Token (IMPORTANTE!)

⚠️ **ATENÇÃO**: O token será mostrado **APENAS UMA VEZ**!

1. Assim que o token for criado, **COPIE IMEDIATAMENTE**
2. Cole em um lugar seguro (bloco de notas, gerenciador de senhas, etc.)
3. Se você fechar a página sem copiar, terá que criar um novo token

### 7. Adicionar no `.env.local`

Abra o arquivo `.env.local` e adicione/atualize:

```env
CLOUDFLARE_API_TOKEN=seu-token-aqui
```

**Exemplo:**
```env
CLOUDFLARE_API_TOKEN=RJVhPYIL3-tSWau9crEd_GOZWA3ahJhVymzx4r8k
```

### 8. Verificar o Account ID

O **CLOUDFLARE_ACCOUNT_ID** você encontra:

1. No dashboard do Cloudflare, selecione qualquer site
2. Na barra lateral direita, você verá o **Account ID**
3. Ou vá em: https://dash.cloudflare.com/
4. O Account ID aparece no canto superior direito da página

### 9. Verificar o Database ID

O **D1_DATABASE_ID** você encontra:

1. Vá em: https://dash.cloudflare.com/
2. No menu lateral, clique em **"Workers & Pages"**
3. Clique em **"D1"** no submenu
4. Clique no seu banco de dados (`clinton-gold-db`)
5. O **Database ID** aparece na página (formato: `745bc0dc-eda6-427c-aa0e-1beb60d73782`)

## ✅ Verificação

Depois de configurar tudo, acesse:
```
http://localhost:3000/teste
```

A página deve mostrar:
- ✓ Todas as variáveis configuradas
- ✓ D1 conectado
- ✓ R2 conectado

## 🔒 Segurança

- **NUNCA** compartilhe seu API Token
- **NUNCA** faça commit do `.env.local` no Git
- Se o token vazar, delete-o imediatamente e crie um novo

## ❌ Problemas Comuns

### Erro 403: "The given account is not valid"
- O token não tem as permissões corretas
- Verifique se adicionou **D1 Edit** e **R2 Edit**
- Verifique se selecionou a conta correta

### Token não funciona
- Certifique-se de copiar o token completo (geralmente é bem longo)
- Não deixe espaços antes ou depois do token
- Reinicie o servidor após atualizar o `.env.local`

## 📝 Resumo das Variáveis Necessárias

```env
# Cloudflare D1
CLOUDFLARE_ACCOUNT_ID=seu-account-id
CLOUDFLARE_API_TOKEN=seu-token-aqui
D1_DATABASE_ID=seu-database-id

# Cloudflare R2
R2_ACCOUNT_ID=seu-account-id
R2_ACCESS_KEY_ID=seu-access-key
R2_SECRET_ACCESS_KEY=seu-secret-key
R2_BUCKET_NAME=clinton-gold-images
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```
