import express from "express";
import { validarDatas } from '../utils/validarDatas.js';
import Professor from "../model/Professor.js";
import multer from "multer";
import { formatarData } from "../utils/formatarData.js";
import { formatarNomeImg } from "../utils/formatarNomeImg.js";

const router = express.Router();

// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

// --- Configuração do Multer para Salvar A Imagem da Escola ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const nomeProfessor = req.body.nome;
        const nomeLimpo = formatarNomeImg(nomeProfessor);
        const dataHoje = formatarData(new Date());
        const nomeFinalImagem = `${nomeLimpo}-${dataHoje}.jpg`;
       
        cb(null, nomeFinalImagem);
    }
});

const upload = multer({ storage: storage });

// Rota GET para renderizar a página de cadastro de professores
router.get('/cadastro-professores', (req, res) => {
    // Adicione esta verificação para garantir que o usuário está logado
    if (!req.session || !req.session.usuarioLogado) {
        return res.redirect("/home"); 
    }
    // Coletando o 'codEscola' vindo da session logada
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