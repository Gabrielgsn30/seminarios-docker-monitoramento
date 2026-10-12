CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(50) NOT NULL
);

INSERT INTO alunos (nome, curso) VALUES 
('Maria Silva', 'Docker e DevOps'),
('João Santos', 'Desenvolvimento Web');