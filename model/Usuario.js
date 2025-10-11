import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const usuarios = connection.define(
  "usuarios",
  {
    codUsuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
usuarios.sync({ force: false });

export default usuarios;
