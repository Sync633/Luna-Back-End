import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Materia = connection.define(
  "materias",
  {
    codMateria: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    codEscola: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  },
  {
    timestamps: false,
  }
);

Materia.sync({ force: false });

export default Materia;