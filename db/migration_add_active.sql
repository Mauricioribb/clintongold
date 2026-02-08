-- Migração: Adicionar coluna active na tabela products
-- Execute este script se a tabela products já existir sem a coluna active

ALTER TABLE products ADD COLUMN active INTEGER NOT NULL DEFAULT 1;
