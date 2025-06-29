-- Inserir unidade prisional
INSERT INTO Unidade (nome, cidade, endereco)
VALUES (
  'Estabelecimento Penal Feminino Irmã Irma Zorzi',
  'Campo Grande',
  'R. Uruguaiana, 563 - Cel. Antonino'
);

-- Inserir familiares
INSERT INTO Familiar (nome, cpf, rg, nascimento, cidade, estado, telefone, email, senha)
VALUES 
('João da Silva', '12345678901', '1234567', '1985-04-15', 'Campo Grande', 'MS', '67991234567', 'joao.silva@email.com', 'senha123'),
('Ana Paula Santos', '98765432100', '9876543', '1992-09-30', 'Dourados', 'MS', '67999887766', 'ana.santos@email.com', 'senha456');

-- Inserir internas vinculadas aos familiares e à unidade
INSERT INTO Interna (nome, cpf, nascimento, cidade, estado, parentesco, id_familia, id_unidade)
VALUES 
('Maria da Conceição', '45612378900', '1990-06-12', 'Corumbá', 'MS', 'Esposa', 1, 1),
('Lúcia Ferreira', '32178965400', '1988-12-05', 'Três Lagoas', 'MS', 'Filha', 2, 1);

-- Inserir agendamentos (um para cada familiar/interna)
INSERT INTO Agendamento (data, horario, id_familia, id_interna)
VALUES 
('2025-07-10', '09:00:00', 1, 1),
('2025-07-11', '10:30:00', 2, 2);