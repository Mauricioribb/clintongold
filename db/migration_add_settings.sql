-- Tabela de Configurações
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Inserir configuração inicial do WhatsApp
INSERT OR IGNORE INTO settings (id, key, value, createdAt, updatedAt)
VALUES ('settings_whatsapp', 'whatsapp_number', '5571991369104', datetime('now'), datetime('now'));
