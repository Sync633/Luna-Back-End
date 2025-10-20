import express from "express";
import { escolas } from "../model/association.js";

const router = express.Router();

router.get('/editar', async (req, res) => {
  try {
    const escola = req.session.usuarioLogado;

    if (!escola) {
      console.log('Usuário não logado, redirecionando para login');
      return res.redirect('/');
    }

    console.log('Renderizando página editar com escola:', escola.nome);
    res.render('editar', {
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
    
    const escolaSession = req.session.usuarioLogado;

    if (!escolaSession) {
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
    };

    // Se senha foi fornecida e não está vazia
    if (senha && senha.trim() !== '') {
      dadosAtualizacao.senha = senha;
      console.log('Senha será atualizada');
    }

    console.log('Dados para atualizar:', dadosAtualizacao);
    console.log('CodEscola para atualizar:', escolaSession.codEscola);

    // Atualizar usando codEscola da sessão
    const resultado = await escolas.update(
      dadosAtualizacao,
      { 
        where: { codEscola: escolaSession.codEscola }
      }
    );

    console.log('Resultado da atualização:', resultado);

    if (resultado[0] > 0) {
      console.log('Dados atualizados com sucesso');
      
      // Buscar dados atualizados para atualizar a sessão
      const escolaAtualizada = await escolas.findOne({
        where: { codEscola: escolaSession.codEscola }
      });
      
      // Atualizar sessão com dados reais do banco
      req.session.usuarioLogado = {
        ...escolaAtualizada.dataValues
      };
      
      console.log('Sessão atualizada com sucesso');
      res.redirect('/home/editar?sucesso=dados_atualizados');
    } else {
      console.log('Nenhum dado foi atualizado');
      res.redirect('/home/editar?erro=nenhum_dado_alterado');
    }
  } catch (error) {
    console.error('Erro na atualização:', error);
    res.redirect('/home/editar?erro=erro_ao_atualizar');
  }
});

export default router;