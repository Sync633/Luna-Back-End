// --- IMPORTS de Bibliotecas e Módulos do Projeto ---
import express from "express";
import multer from "multer";
import Aluno from "../model/Aluno.js";
import { formatarData } from "../utils/formatarData.js";
import { formatarNomeImg } from "../utils/formatarNomeImg.js";
import { validarDatas } from "../utils/validarDatas.js";
const router = express.Router();

// --- Configuração do Multer para Salvar as Imagens do Aluno e Laudo ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const nomeAluno = req.body.nome;
        const nomeLimpo = formatarNomeImg(nomeAluno);   // --- Formata o nome do aluno para o padrão (nome-do-aluno)
        const dataHoje = formatarData(new Date());  // --- Formata a data no padrão (YYYY-MM-DD)
        let tipoArquivo = '';
        // Usa o nome do campo para diferenciar os arquivo
        if (file.fieldname === 'urlFotoRosto') {
            tipoArquivo = 'rosto';
        } else if (file.fieldname === 'urlFotoLaudo') {
            tipoArquivo = 'laudo';
        } else {
            // Caso o nome do campo não seja reconhecido, usa "outro"
            tipoArquivo = 'outro';
        }
        // Cria um nome único com o tipo do arquivo (nome-YYYY-MM-DD.jpg)
        const nomeFinalImagem = `${nomeLimpo}-${tipoArquivo}-${dataHoje}.jpg`;
        cb(null, nomeFinalImagem);
    }
});
const upload = multer({ storage: storage }); // Salva as configurações no MULTER



// ----- ROTA para acessar e renderizar a pagina de CADASTRO-ALUNOS -----
router.get('/cadastro-alunos', (req, res) => {
    // Verifica se a sessão do usuário é válida
    if (!req.session || !req.session.usuarioLogado) {
        return res.redirect("/home");
    }
    // Pega o código da escola e renderiza todos os Alunos dela
    const codEscola = req.session.usuarioLogado.codEscola;
    Aluno.findAll({ where: { codEscola : codEscola } }).then((alunos) => {
        res.render("cadastro-alunos", {
            alunos: alunos
        });
    }).catch(error => {
        console.log(error);
    });
});

// ----- ROTA para cadastro de novos alunos -----
router.post("/cadastro-alunos", upload.fields([
    { name: 'urlFotoRosto', maxCount: 1 },
    { name: 'urlFotoLaudo', maxCount: 1 }
]), async (req, res) => {
    try {
        // Pega os dados do formulário de CADASTRO-ALUNOS
        const { nome, sobrenome, telefone, cpf, dataNasc, ra, email, nomeResponsavel } = req.body;
        // Acessa os arquivos a partir de req.files e armazena suas informações
        const fotoRosto = req.files['urlFotoRosto'];
        const fotoLaudo = req.files['urlFotoLaudo'];
        // Cria as URLs somente se os arquivos existirem caso contrario será NULL
        const urlFotoRosto = fotoRosto && fotoRosto[0] ? `/uploads/${fotoRosto[0].filename}` : null;
        const urlFotoLaudo = fotoLaudo && fotoLaudo[0] ? `/uploads/${fotoLaudo[0].filename}` : null;
        // Pega os CODs da Escola para vincular ao Aluno
        const codEscola = req.session.usuarioLogado.codEscola;
        // Valida se a data foi colocada no padrão (DD/MM/YYYY)
        const dataNascTratada = validarDatas(dataNasc);
        if (dataNascTratada === null) {
            return res.redirect("/home/cadastro-alunos?erro=data_invalida");
        }
        // Cria o aluno com os dados obtidos
        const novoAluno = await Aluno.create({
            nome,
            sobrenome,
            telefone,
            cpf,
            dataNasc: dataNascTratada,
            ra,
            email,
            nomeResponsavel,
            urlFotoLaudo,
            urlFotoRosto,
            codEscola: codEscola
        });
        console.log("Aluno criado:", novoAluno.codAluno);
        console.log("Dados do aluno salvo:", novoAluno.toJSON());
        res.redirect("/home/cadastro-alunos?sucesso=cadastro_realizado");
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        res.redirect("/home/cadastro-alunos?erro=erro_ao_cadastrar");
    }
});




// ----- ROTA para deletar um aluno do sistema
router.get("/cadastro-alunos/delete/:codAluno", (req, res) =>{
    // Pega o codAluno vindo da URL e apaga (Params)
    const codAluno = req.params.codAluno;
    Aluno.destroy({
        where: {
            codAluno: codAluno
        }
    }).then(() => {
        res.redirect("/home/cadastro-alunos");
    }).catch(error => {
        console.log(error);
    });
});
export default router;