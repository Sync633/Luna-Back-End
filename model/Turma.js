import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Turma = connection.define(
  "turmas",
  {
    codTurma: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    codProfessor: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
Turma.sync({ force: false });

export default Turma;
