import express from "express";
import { usuarios, escolas } from "../model/association.js";

const router = express.Router();

router.get('/editar', async (req, res) => {
  console.log('=== ROTA /home/editar ACESSADA ===');
  console.log('Session usuario:', req.session.usuarioLogado);
  
  try {
    const escola = req.session.usuarioLogado;

    if (!escola) {
      console.log('Usuário não logado, redirecionando para login');
      return res.redirect('/');
    }

    // Buscar escola pelo codUsuario
    // const escola = await escolas.findOne({
    //   where: { codUsuario: usuario.codUsuario },
    // });

    // if (!escola) {
    //   console.log('Escola não encontrada para usuário:', usuario.codUsuario);
    //   return res.redirect('/?erro=escola_nao_encontrada');
    // }

    console.log('Renderizando página editar com escola:', escola.nome);
    res.render('editar', {
      // usuario: usuario,
      escola: escola,
    });
  } catch (error) {
    console.error('Erro na rota /editar:', error);
    res.redirect('/?erro=erro_carregar_dados');
  }
});

router.post('/editar/update', async (req, res) => {
  try {
    console.log('=== INICIANDO ATUALIZAÇÃO ===');
    console.log('Body recebido:', req.body);
    
    const usuario = req.session.usuarioLogado;

    if (!usuario) {
      console.log('Usuário não logado');
      return res.redirect('/login');
    }

    const { nome, email, cnpj, telefone, bairro, cidade, rua, senha } = req.body;

    const dadosAtualizacao = {
      nome: nome,
      email: email,
      cnpj: cnpj,
      telefone: telefone,
      bairro: bairro,
      cidade: cidade,
      rua: rua,
      senha: senha,
    };

    // Se senha foi fornecida e não está vazia
    if (senha && senha.trim() !== '') {
      dadosAtualizacao.senha = senha;
      console.log('Senha será atualizada');
    }

    console.log('Dados para atualizar:', dadosAtualizacao);

    const resultado = await escolas.update(
      dadosAtualizacao,
      { 
        where: { codUsuario: usuario.codUsuario }
      }
    );

    console.log('Resultado da atualização:', resultado);

    if (resultado[0] > 0) {
      console.log('Dados atualizados com sucesso, redirecionando...');
      res.redirect('/home/editar?sucesso=dados_atualizados');
    } else {
      console.log('Nenhum dado foi atualizado');
      res.redirect('/home/editar?erro=nenhum_dado_alterado');
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
        urlFotoEscola: usuarioNoBanco.escolas.urlFotoEscola,
        senha: usuarioNoBanco.senha,
  };

  } catch (error) {
    console.error('Erro na atualização:', error);
    res.redirect('/home/editar?erro=erro_ao_atualizar');
  }
});

export default router;





