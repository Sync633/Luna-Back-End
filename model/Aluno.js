import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Aluno = connection.define(
  "alunos",
  {
    codAluno: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dataNasc: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    ra: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nomeResponsavel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlFotoLaudo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    urlFotoRosto: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    codTurma: { 
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    codEscola: { 
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);

Aluno.sync({ force: false });

export default Aluno;