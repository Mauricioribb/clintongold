# 📚 Explicação: Como funciona D1 e R2

## O Problema Atual

**Em desenvolvimento local (seu computador):**
- As APIs retornam arrays vazios `[]` (dados mock/fake)
- Quando você cria um produto no admin, ele não é salvo
- Quando você lista produtos, aparece "Nenhum produto cadastrado"

**Em produção (Cloudflare Pages):**
- As APIs conectam ao D1 real
- Os dados são salvos e recuperados do banco
- Tudo funciona normalmente

## Por que isso acontece?

O Next.js roda localmente no seu computador, mas o D1 e R2 só estão disponíveis quando o código roda no Cloudflare. É como tentar acessar um arquivo que está em outro computador.

## Soluções

### Opção 1: Usar D1 Local (Recomendado)

O Wrangler permite usar um banco D1 local para desenvolvimento. Vou configurar isso para você.

### Opção 2: Deploy no Cloudflare Pages

Quando fizer deploy no Cloudflare Pages, tudo funcionará automaticamente porque o código roda no mesmo ambiente do D1 e R2.

## Como testar localmente

1. **Com D1 Local:** Os dados serão salvos em um banco local (arquivo SQLite)
2. **Sem D1 Local:** Os dados não são salvos (só mock)

Vou configurar para usar D1 local agora!
