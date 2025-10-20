import usuarios from "./Usuario.js";
import escolas from "./Escola.js";
import Professor from "./Professor.js";
import Turma from "./Turma.js";
import Aluno from "./Aluno.js";

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

// Associações de professores e turmas
Professor.hasMany(Turma, {
  foreignKey: 'codProfessor',
  as: "turmas"
});
Turma.belongsTo(Professor, {
  foreignKey: 'codProfessor',
  as: "professor" 
});

// Associações de turmas e alunos
Turma.hasMany(Aluno, {
    foreignKey: 'codTurma',
    as: "alunos"
});
Aluno.belongsTo(Turma, {
    foreignKey: 'codTurma',
    as: "turma"
});

export { usuarios, escolas, Professor, Turma };
