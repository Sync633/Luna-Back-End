import express from "express";
import {usuarios, escolas} from "../model/association.js";

const router = express.Router();

// Rota GET para a "Raiz" para o Login
router.get("/", (req, res) => {
  res.render("index");
});

// Rota POST para realizar o login do Usuário
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuarioNoBanco = await usuarios.findOne({
    where: { email },
    include: [
      {
        model: escolas,
        as: "escolas",
      },
    ],
  });

  if (!usuarioNoBanco) {
    return res.redirect("/?erro=usuario_nao_encontrado");
  }

  if (senha !== usuarioNoBanco.senha) {
    return res.redirect("/?erro=senha_errada");
  }

  req.session.usuarioLogado = {
        codUsuario: usuarioNoBanco.codUsuario,
        codEscola: usuarioNoBanco.escolas.codEscola,
        nome: usuarioNoBanco.escolas.nome,
        email: usuarioNoBanco.email,
        cnpj: usuarioNoBanco.escolas.cnpj,
        rua: usuarioNoBanco.escolas.rua,
        bairro: usuarioNoBanco.escolas.bairro,
        cidade: usuarioNoBanco.escolas.cidade,
        telefone: usuarioNoBanco.escolas.telefone,
        senha: usuarioNoBanco.senha
  };

  console.log('Dados da sessão após o login:', req.session.usuarioLogado);

  res.redirect("/home");
});

export default router;
