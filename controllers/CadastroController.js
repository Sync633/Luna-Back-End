import express from "express";
import {usuarios, escolas} from "../model/association.js";
// import bcrypt from "bcryptjs"; ## HASH de SENHAS ##

const router = express.Router();

// Rota GET para renderizar a página de cadastro
router.get('/cadastro', (req, res) => {
  res.render("cadastro")
});

router.post("/cadastro", async (req, res) => {
  try {
    const { email, senha, nome, cnpj, rua, bairro, cidade, telefone } = req.body;

    // Cria o usuário
    const novoUsuario = await usuarios.create({
      email,
      senha
    });

    // Cria a instituição vinculada ao usuário
    const novaInstituicao = await escolas.create({
      nome,
      email,
      cnpj,
      rua,
      bairro,
      cidade,
      telefone,
      codUsuario: novoUsuario.codUsuario
    });

    console.log("Usuário criado:", novoUsuario.codUsuario);

    // Redireciona com sucesso
    res.redirect("/?sucesso=cadastro_realizado");
  } catch (error) {
    console.error(error);
    res.redirect("/?erro=erro_ao_cadastrar");
  }
});

export default router;