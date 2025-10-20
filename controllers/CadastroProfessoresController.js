// --- IMPORTS de Bibliotecas e Módulos do Projeto ---
import express from "express";
import multer from "multer";
import Professor from "../model/Professor.js";
import { formatarData } from "../utils/formatarData.js";
import { formatarNomeImg } from "../utils/formatarNomeImg.js";
import { validarDatas } from '../utils/validarDatas.js';
const router = express.Router();

// --- Configuração do Multer para Salvar a Imagem do Professor ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const nomeProfessor = req.body.nome;
        const nomeLimpo = formatarNomeImg(nomeProfessor);   // --- Formata o nome do professor para o padrão (nome-do-professor)
        const dataHoje = formatarData(new Date());  // --- Formata a data no padrão (YYYY-MM-DD)
        // Cria um nome único com o tipo do arquivo (nome-YYYY-MM-DD.jpg)
        const nomeFinalImagem = `${nomeLimpo}-${dataHoje}.jpg`;
        cb(null, nomeFinalImagem);
    }
});

const upload = multer({ storage: storage });

// ----- ROTA para acessar e renderizar a pagina de CADASTRO-PROFESSORES -----
router.get('/cadastro-professores', (req, res) => {
    // Verifica se a sessão do usuário é válida
    if (!req.session || !req.session.usuarioLogado) {
        return res.redirect("/home"); 
    }
    // Pega o código da escola e renderiza todos os Professores dela
    const codEscola = req.session.usuarioLogado.codEscola;
    Professor.findAll({ where: { codEscola : codEscola}  }).then((professores) => {
        res.render("cadastro-professores", {
            professores: professores
        });
    }).catch(error => {
        console.log(error);
    })
});

// Rota POST para receber os Dados do formulario de cadastro-professores
router.post("/cadastro-professores", upload.single('urlFotoProfessor'), async (req, res) => {
  try {
    // Dados Vindo do Formulario POST
    const { nome, sobrenome, cpf, dataNasc, rg, cidade, telefone, email, disciplinas, senha} = req.body;
    
    // Verifique se o body está vindo corretamente
    console.log("Dados recebidos:", req.body);
    
    // Coletando o 'codEscola' vindo da session logada
    const codEscola = req.session.usuarioLogado.codEscola;

    const urlFotoProfessor = req.file ? `/uploads/${req.file.filename}` : null;

    // Trata a data de Nasc
    const dataNascTratada = validarDatas(dataNasc);

    if (dataNascTratada === null) {
      return res.redirect("/home/cadastro-professores?erro=data_invalida");
    }

    // Cria a instituição vinculada ao usuário
    const novoProfessor = await Professor.create({
      nome,
      sobrenome, 
      cpf, 
      dataNasc: dataNascTratada, 
      rg, 
      cidade, 
      telefone, 
      email, 
      disciplinas,    
      senha,
      urlFotoProfessor,
      codEscola: codEscola
    });

    console.log("Professor criado:", novoProfessor.codProfessor);

    // Redireciona com sucesso
    res.redirect("/home/cadastro-professores?sucesso=cadastro_realizado");
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.redirect("/home/cadastro-professores?erro=erro_ao_cadastrar");
  }
});

// Rota para DELETAR um professor
router.get("/cadastro-professores/delete/:codProfessor", (req, res) =>{
  const codProfessor = req.params.codProfessor
  Professor.destroy({
    where: {
      codProfessor: codProfessor
    }
  }).then(() => {
    res.redirect("/home/cadastro-professores");
  }).catch(error => {
    console.log(error);
  });
});

export default router;