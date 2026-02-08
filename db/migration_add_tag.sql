-- Migração: Adicionar coluna tag na tabela products
-- Execute este script se a tabela products já existir sem a coluna tag

ALTER TABLE products ADD COLUMN tag TEXT;
