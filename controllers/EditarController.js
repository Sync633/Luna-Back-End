import express from "express";
import { usuarios, escolas } from "../model/association.js";

const router = express.Router();

router.get('/editar', async (req, res) => {
  try {
    const usuario = req.session.usuarioLogado;

    if (!usuario) {
      return res.redirect('/login');
    }

    // Buscar escola pelo codUsuario
    const escola = await escolas.findOne({
      where: { codUsuario: usuario.codUsuario },
    });

    if (!escola) {
      return res.redirect('/?erro=escola_nao_encontrada');
    }

    res.render('editar', {
      usuario: usuario,
      escolas: escola,
    });
  } catch (error) {
    console.error(error);
    res.redirect('/?erro=erro_carregar_dados');
  }
});

router.post('/editar/update', async (req, res) => {
  try {
    const usuario = req.session.usuarioLogado;

    if (!usuario) {
      return res.redirect('/login');
    }

    const { nome, email, cnpj, telefone, bairro, cidade, rua } = req.body;

    // Atualizar a escola (NÃO "editar.update")
    await escolas.update(
      {
        nome: nome,
        email: email,
        cnpj: cnpj,
        telefone: telefone,
        bairro: bairro,
        cidade: cidade,
        rua: rua
      },
      { 
        where: { codUsuario: usuario.codUsuario } // Usa o codUsuario da sessão
      }
    );

    // Redirecionar após sucesso
    res.redirect('/editar?sucesso=dados_atualizados');
  } catch (error) {
    console.error(error);
    res.redirect('/editar?erro=erro_ao_atualizar');
  }
});

export default router;


