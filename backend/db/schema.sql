-- Tabela UNIDADE (prisões)
CREATE TABLE Unidade (
  id_unidade SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  cidade VARCHAR(50) NOT NULL,
  endereco TEXT,
  
-- Tabela INTERNA (detentas)
CREATE TABLE Interna (
  id_interna SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL CHECK (cpf ~ '^[0-9]{11}$'),
  nascimento DATE,
  cidade VARCHAR(50),
  estado CHAR(2) DEFAULT 'MS' CHECK (estado IN ('MS', 'MT', 'SP')),
  parentesco VARCHAR(50) NOT NULL CHECK (parentesco IN ('Filha', 'Neta', 'Nora', 'Esposa', 'Cunhada')),
  id_familia INT REFERENCES Familiar(id_familia) ON DELETE CASCADE,
  id_unidade INT REFERENCES Unidade(id_unidade) ON DELETE CASCADE
);

-- Tabela FAMILIAR (visitantes)
CREATE TABLE Familiar (
  id_familia SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL CHECK (cpf ~ '^[0-9]{11}$'),
  rg VARCHAR(10),
  nascimento DATE,
  cidade VARCHAR(50),
  estado CHAR(2) DEFAULT 'MS' CHECK (estado IN ('MS', 'MT', 'SP')),
  telefone VARCHAR(15) NOT NULL CHECK (telefone ~ '^[0-9]{10,11}$'),
  email VARCHAR(100) UNIQUE NOT NULL CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  senha VARCHAR(100) NOT NULL
);

-- Tabela AGENDAMENTO
CREATE TABLE Agendamento (
  id_agendamento SERIAL PRIMARY KEY,
  data DATE NOT NULL CHECK (data >= CURRENT_DATE),
  horario TIME NOT NULL CHECK (horario BETWEEN '08:00:00' AND '16:00:00'),
  id_familia INT REFERENCES Familiar(id_familia) ON DELETE CASCADE,
  id_interna INT REFERENCES Interna(id_interna) ON DELETE CASCADE,
  CONSTRAINT unique_agendamento UNIQUE (data, horario, id_familia, id_interna)
);
