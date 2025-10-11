import usuarios from "./Usuario.js";
import escolas from "./Escola.js";

usuarios.hasOne(escolas, {
  foreignKey: "codUsuario",
  as: "escolas",
});

escolas.belongsTo(usuarios, {
  foreignKey: "codUsuario",
  as: "usuario",
});

export { usuarios, escolas };
