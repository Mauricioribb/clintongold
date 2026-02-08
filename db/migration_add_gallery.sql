-- Migração: Adicionar coluna gallery na tabela products
-- Execute este script se a tabela products já existir sem a coluna gallery

ALTER TABLE products ADD COLUMN gallery TEXT;
