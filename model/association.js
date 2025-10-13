import usuarios from "./Usuario.js";
import escolas from "./Escola.js";
import Professor from "./Professor.js";

// Associações de usuários e escolas
usuarios.hasOne(escolas, {
  foreignKey: "codUsuario",
  as: "escolas",
});
escolas.belongsTo(usuarios, {
  foreignKey: "codUsuario",
  as: "usuario",
});

// Associações de escolas e professores
escolas.hasMany(Professor, {
  foreignKey: 'codEscola',
  as: "professores"
});
Professor.belongsTo(escolas, {
  foreignKey: 'codEscola',
  as: "escolas",
});

export { usuarios, escolas, Professor };
