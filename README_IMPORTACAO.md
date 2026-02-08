# 📥 Importação de Produtos do WordPress

## Como usar a funcionalidade de importação

### 1. Acessar a página de importação

No painel administrativo, clique no botão **"Importar"** ao lado de "Ver Site".

### 2. Preparar o arquivo CSV

O CSV deve conter as seguintes colunas (nomes exatos ou similares):

- **Nome** - Nome do produto
- **Descrição** - Descrição completa
- **imagem principal** - URL da imagem principal
- **galeria** - URLs das imagens da galeria (separadas por vírgula)
- **preço** - Preço do produto (numérico, ex: 100.50)
- **Categoria** - Nome da categoria
- **sku** - SKU/Referência do produto

### 3. Processo de importação

1. Selecione o arquivo CSV
2. Clique em "Importar Produtos"
3. O sistema irá:
   - Baixar todas as imagens das URLs
   - Fazer upload das imagens para o R2
   - Criar categorias que não existirem
   - Criar produtos com os dados do CSV

### 4. Resultado

Após a importação, você verá:
- Total de produtos processados
- Quantos produtos foram criados com sucesso
- Lista de erros/avisos (se houver)

---

## 📝 Código WordPress para Exportar

### Instalação

1. Copie o conteúdo do arquivo `wordpress-functions.php`
2. Adicione ao arquivo `functions.php` do seu tema WordPress
   - Ou crie um plugin com esse código

### Como usar no WordPress

1. No admin do WordPress, vá em **WooCommerce > Exportar para Clinton Gold**
2. Configure as opções:
   - ✅ Exportar apenas produtos publicados
   - ✅ Incluir URLs das imagens
3. Clique em **"Exportar Produtos"**
4. O arquivo CSV será baixado automaticamente

### Formato do CSV exportado

O CSV será gerado com delimitador `;` (ponto e vírgula) e incluirá:

```csv
Nome;Descrição;imagem principal;galeria;preço;Categoria;sku
Produto 1;Descrição do produto;https://site.com/img1.jpg;https://site.com/img2.jpg,https://site.com/img3.jpg;100,50;Categoria 1;SKU001
```

### Campos exportados

- **Nome**: Título do produto WooCommerce
- **Descrição**: Conteúdo completo do produto (HTML removido)
- **imagem principal**: URL completa da imagem destacada
- **galeria**: URLs das imagens da galeria separadas por vírgula
- **preço**: Preço do produto (formato brasileiro com vírgula)
- **Categoria**: Primeira categoria do produto
- **sku**: SKU do produto WooCommerce

---

## ⚠️ Observações Importantes

1. **Imagens**: As URLs devem ser acessíveis publicamente
2. **Categorias**: Categorias que não existirem serão criadas automaticamente
3. **SKU**: Deve ser único (produtos com SKU duplicado podem causar problemas)
4. **Preço**: Use formato numérico (100.50 ou 100,50)
5. **Galeria**: Múltiplas URLs separadas por vírgula

---

## 🔧 Solução de Problemas

### Erro: "Nenhum produto encontrado no CSV"
- Verifique se o CSV tem pelo menos 2 linhas (header + dados)
- Verifique se os nomes das colunas estão corretos

### Erro: "Erro ao baixar imagem"
- Verifique se a URL da imagem está acessível
- Verifique se a URL não requer autenticação

### Produtos não estão sendo criados
- Verifique os logs do servidor
- Certifique-se de que o CSV está no formato correto
- Verifique se os campos obrigatórios (Nome, SKU, Imagem) estão preenchidos
