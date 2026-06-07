-- ============================================================
-- Execute no SQL Editor do Supabase
-- Apaga os serviços antigos e insere a lista completa
-- ============================================================

-- Limpa serviços existentes para evitar duplicatas
DELETE FROM services;

-- Insere TODOS os 20 serviços completos
INSERT INTO services (category, name, "desc", price, time) VALUES

-- Studio Lorena
('lorena', 'Axila',            'Remoção com cera de alta qualidade.',                         20,  15),
('lorena', 'Virilha completa', 'Depilação íntima com máximo conforto e discrição.',            50,  35),
('lorena', 'Perna inteira',    'Depilação completa das pernas.',                               50,  45),
('lorena', 'Meia perna',       'Depilação parcial da perna.',                                  30,  25),
('lorena', 'Rosto',            'Remoção de pelos faciais com cera suave.',                     20,  20),
('lorena', 'Buço',             'Limpeza rápida e eficaz.',                                     10,  10),
('lorena', 'Braço inteiro',    'Depilação completa dos braços.',                               20,  25),
('lorena', 'Costas',           'Depilação feminina das costas.',                               20,  25),
('lorena', 'Sobrancelha',      'Design e limpeza de sobrancelhas.',                            15,  15),

-- Barber Lounge Márcio
('marcio', 'Barba',                  'Cuidado masculino para a barba com toalha quente.',      20,  30),
('marcio', 'Corte',                  'Corte de cabelo masculino e infantil.',                   20,  40),
('marcio', 'Pelos do nariz e orelha','Remoção indolor e precisa.',                             20,  15),
('marcio', 'Depilação costas',       'Depilação com cera especial masculina.',                  20,  25),
('marcio', 'Depilação peito',        'Depilação com cera especial masculina.',                  20,  25),
('marcio', 'Perna inteira',          'Depilação completa das pernas.',                          50,  45),
('marcio', 'Parte íntima',           'Depilação com total discrição e higiene.',                50,  45),
('marcio', 'Combo depilação total',  'Pacote completo: corpo total ou parcial.',               150, 120),
('marcio', 'Matizador para Barba',   'Realce a cor da sua barba.',                             10,  15),
('marcio', 'Mechas no Cabelo',       'Estilo moderno e iluminado.',                            50,  60),
('marcio', 'Desenhos Freestyle',     'Arte exclusiva em cortes.',                              30,  30);

-- Confirma quantos foram inseridos (deve retornar 20)
SELECT category, name, price, time FROM services ORDER BY category, id;
