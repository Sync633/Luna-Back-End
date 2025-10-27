CREATE DATABASE IF NOT EXISTS projetoIntegrador;
USE projetoIntegrador;

/* -----------------------
tabelas principais
-------------------------- */
CREATE TABLE usuarios (
    codUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(30) NOT NULL
);

CREATE TABLE escolas (
    codEscola INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    rua VARCHAR(50) NOT NULL,
    urlFotoEscola VARCHAR(255) NOT NULL,
    codUsuario INT NOT NULL,
    FOREIGN KEY (codUsuario) REFERENCES usuarios(codUsuario)
);

-- PASSO 1: Criar a tabela 'professores' SEM a chave estrangeira para 'turmas'
CREATE TABLE professores (
    codProfessor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    dataNasc DATE NOT NULL,
    rg VARCHAR(20) NOT NULL UNIQUE,
    cidade VARCHAR(50) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    disciplinas VARCHAR(150) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    urlFotoProfessor VARCHAR(255) NOT NULL,
    codTurma INT, -- A coluna existe, mas a restrição de FK será adicionada depois
    codEscola INT NOT NULL,
    FOREIGN KEY (codEscola) REFERENCES escolas(codEscola)
);

-- PASSO 2: Criar a tabela 'turmas'
CREATE TABLE turmas (
    codTurma INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    codProfessor INT NOT NULL,
    codEscola INT NOT NULL,
    FOREIGN KEY (codProfessor) REFERENCES professores(codProfessor),
    FOREIGN KEY (codEscola) REFERENCES escolas(codEscola)
);

-- PASSO 3: Adicionar a chave estrangeira que faltou em 'professores'
ALTER TABLE professores
ADD CONSTRAINT fk_professores_turmas
FOREIGN KEY (codTurma) REFERENCES turmas(codTurma);

CREATE TABLE alunos (
    codAluno INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    dataNasc DATE NOT NULL,
    ra INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    nomeResponsavel VARCHAR(100) NOT NULL,
    urlFotoLaudo VARCHAR(255) NOT NULL,
    urlFotoRosto VARCHAR(255) NOT NULL,
    codTurma INT,
    codEscola INT NOT NULL,
    FOREIGN KEY (codTurma) REFERENCES turmas(codTurma),
    FOREIGN KEY (codEscola) REFERENCES escolas(codEscola)
);

CREATE TABLE feedbacks (
    codFeedback INT PRIMARY KEY AUTO_INCREMENT,
    comentario VARCHAR(300) NOT NULL,
    codUsuario INT NOT NULL,
    dataFeedback DATE,
    nota INT NOT NULL,
    FOREIGN KEY (codUsuario) REFERENCES usuarios(codUsuario)
);

CREATE TABLE materias (
    codMateria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100) NOT NULL UNIQUE,
    codEscola INT NOT NULL,
    FOREIGN KEY (codEscola) REFERENCES escolas(codEscola)
);

CREATE TABLE planosDeAula (
    codPlanoDeAula INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    codProfessor INT NOT NULL,
    codMateria INT NOT NULL,
    FOREIGN KEY (codProfessor) REFERENCES professores(codProfessor),
    FOREIGN KEY (codMateria) REFERENCES materias(codMateria)
);

CREATE TABLE respostas (
    codResposta INT PRIMARY KEY AUTO_INCREMENT,
    respostas TEXT NOT NULL,
    dataEnvio DATETIME NOT NULL,
    numeroAcertos INT NOT NULL,
    codPlanoDeAula INT NOT NULL,
    codAluno INT NOT NULL,
    tempoRespostaSegundos INT NOT NULL,
    FOREIGN KEY (codPlanoDeAula) REFERENCES planosDeAula(codPlanoDeAula),
    FOREIGN KEY (codAluno) REFERENCES alunos(codAluno)
);

CREATE TABLE comentarios (
    codComentario INT PRIMARY KEY AUTO_INCREMENT,
    comentario VARCHAR(300) NOT NULL,
    dataComentario DATE,
    codResposta INT NOT NULL,
    codProfessor INT NOT NULL,
    FOREIGN KEY (codResposta) REFERENCES respostas(codResposta),
    FOREIGN KEY (codProfessor) REFERENCES professores(codProfessor)
);

CREATE TABLE hiperfocos (
    codHiperfoco INT PRIMARY KEY AUTO_INCREMENT,
    hiperfoco VARCHAR (300) NOT NULL,
    fotoExemplo VARCHAR(200),
    codAluno INT NOT NULL,
    FOREIGN KEY (codAluno) REFERENCES alunos(codAluno)
);