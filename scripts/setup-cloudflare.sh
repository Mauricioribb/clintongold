#!/bin/bash

echo "🚀 Configurando Cloudflare D1 e R2 para Clinton Gold"
echo ""

# Verificar se wrangler está instalado
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler não encontrado. Instalando..."
    npm install -g wrangler
fi

# Verificar autenticação
echo "📋 Verificando autenticação..."
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  Você precisa fazer login no Cloudflare primeiro:"
    echo "   Execute: wrangler login"
    exit 1
fi

echo "✅ Autenticado no Cloudflare"
echo ""

# Criar banco D1
echo "🗄️  Criando banco de dados D1..."
DB_OUTPUT=$(wrangler d1 create clinton-gold-db 2>&1)

if [ $? -eq 0 ]; then
    echo "$DB_OUTPUT"
    echo ""
    echo "📝 Copie o database_id acima e atualize no wrangler.toml"
    echo ""
else
    echo "❌ Erro ao criar banco D1"
    echo "$DB_OUTPUT"
    exit 1
fi

# Executar schema
echo "📊 Executando schema SQL..."
wrangler d1 execute clinton-gold-db --file=./db/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema executado com sucesso"
else
    echo "⚠️  Erro ao executar schema (pode ser que o banco já exista)"
fi

echo ""

# Criar bucket R2
echo "🪣 Criando bucket R2..."
R2_OUTPUT=$(wrangler r2 bucket create clinton-gold-images 2>&1)

if [ $? -eq 0 ]; then
    echo "$R2_OUTPUT"
    echo "✅ Bucket R2 criado"
else
    echo "⚠️  Bucket pode já existir ou erro na criação"
    echo "$R2_OUTPUT"
fi

echo ""
echo "✨ Configuração concluída!"
echo ""
echo "📝 Próximos passos:"
echo "   1. Atualize o database_id no wrangler.toml"
echo "   2. Configure variáveis de ambiente no .env.local"
echo "   3. Para desenvolvimento local: wrangler d1 execute clinton-gold-db --local --file=./db/schema.sql"
