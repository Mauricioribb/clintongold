// Conexão com D1 local usando SQLite
import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

let db: Database.Database | null = null;

export function getLocalDB(): Database.Database {
  if (!db) {
    const dbPath = join(process.cwd(), '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/clinton-gold-db.sqlite');
    
    // Criar diretório se não existir
    const { mkdirSync } = require('fs');
    const { dirname } = require('path');
    try {
      mkdirSync(dirname(dbPath), { recursive: true });
    } catch (e) {
      // Diretório já existe
    }

    db = new Database(dbPath);
    
    // Criar tabelas se não existirem
    try {
      const schema = readFileSync(join(process.cwd(), 'db/schema.sql'), 'utf-8');
      db.exec(schema);
    } catch (e) {
      console.warn('Erro ao executar schema:', e);
    }
  }
  
  return db;
}

// Wrapper para compatibilidade com D1Database
export async function queryLocalDB(query: string, params: any[] = []): Promise<any> {
  const localDb = getLocalDB();
  const trimmedQuery = query.trim().toUpperCase();
  
  try {
    if (trimmedQuery.startsWith('SELECT')) {
      const stmt = localDb.prepare(query);
      const results = stmt.all(...params);
      return { results };
    } else {
      const stmt = localDb.prepare(query);
      const result = stmt.run(...params);
      return { success: true, meta: { changes: result.changes } };
    }
  } catch (error) {
    console.error('Erro ao executar query local:', error);
    throw error;
  }
}
