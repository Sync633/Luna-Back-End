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

  req.session.usuarioNoBanco = {
    codUsuario: usuarioNoBanco.codUsuario,
    nome: usuarioNoBanco.nome,
    email: usuarioNoBanco.email,
  };

  res.redirect("/home");
});

export default router;
