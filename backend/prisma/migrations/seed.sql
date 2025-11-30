-- Script para popular o banco com dados iniciais

-- Inserir cidades de exemplo
INSERT INTO cities (name, state, "createdAt", "updatedAt") VALUES
  ('São Paulo', 'SP', NOW(), NOW()),
  ('Rio de Janeiro', 'RJ', NOW(), NOW()),
  ('Belo Horizonte', 'MG', NOW(), NOW()),
  ('Salvador', 'BA', NOW(), NOW()),
  ('Brasília', 'DF', NOW(), NOW()),
  ('Curitiba', 'PR', NOW(), NOW()),
  ('Recife', 'PE', NOW(), NOW()),
  ('Porto Alegre', 'RS', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
