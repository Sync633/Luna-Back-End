import express from "express";
import multer from "multer";
import Aluno from "../model/Aluno.js";
import { formatarData } from "../utils/formatarData.js";
import { formatarNomeImg } from "../utils/formatarNomeImg.js";
import { validarDatas } from "../utils/validarDatas.js";
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
// --- Configuração do Multer para Salvar as Imagens ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const nomeAluno = req.body.nome;
        const nomeLimpo = formatarNomeImg(nomeAluno);
        const dataHoje = formatarData(new Date());
        let tipoArquivo = '';
        // Usa o campo para diferenciar os arquivos de forma explícita
        if (file.fieldname === 'urlFotoRosto') {
            tipoArquivo = 'rosto';
        } else if (file.fieldname === 'urlFotoLaudo') {
            tipoArquivo = 'laudo';
        } else {
            // Caso o nome do campo não seja reconhecido, usa "outro"
            tipoArquivo = 'outro';
        }
        // Cria um nome único com o tipo do arquivo
        const nomeFinalImagem = `${nomeLimpo}-${tipoArquivo}-${dataHoje}.jpg`;
        cb(null, nomeFinalImagem);
    }
});
const upload = multer({ storage: storage });
router.get('/cadastro-alunos', (req, res) => {
    if (!req.session || !req.session.usuarioLogado) {
        return res.redirect("/home");
    }
    const codEscola = req.session.usuarioLogado.codEscola;
    Aluno.findAll({ where: { codEscola : codEscola } }).then((alunos) => {
        res.render("cadastro-alunos", {
            alunos: alunos
        });
    }).catch(error => {
        console.log(error);
    });
});
router.post("/cadastro-alunos", upload.fields([
    { name: 'urlFotoRosto', maxCount: 1 },
    { name: 'urlFotoLaudo', maxCount: 1 }
]), async (req, res) => {
    try {
        const { nome, sobrenome, serie, cpf, dataNasc, ra, email, escola } = req.body;
        console.log("Conteúdo de req.files:", req.files);
        // Acessa os arquivos a partir de req.files
        const fotoRosto = req.files['urlFotoRosto'];
        const fotoLaudo = req.files['urlFotoLaudo'];
        // Cria as URLs somente se os arquivos existirem
        const urlFotoRosto = fotoRosto && fotoRosto[0] ? `/uploads/${fotoRosto[0].filename}` : null;
        const urlFotoLaudo = fotoLaudo && fotoLaudo[0] ? `/uploads/${fotoLaudo[0].filename}` : null;
        const codEscola = req.session.usuarioLogado.codEscola;
        const codUsuario = req.session.usuarioLogado.codUsuario || req.session.usuarioLogado.id || "default_user";
        const dataNascTratada = validarDatas(dataNasc);
        if (dataNascTratada === null) {
            return res.redirect("/home/cadastro-alunos?erro=data_invalida");
        }
        // Cria o aluno
        const novoAluno = await Aluno.create({
            nome,
            sobrenome,
            serie,
            cpf,
            dataNasc: dataNascTratada,
            ra,
            email,
            escola,
            urlFotoLaudo,
            urlFotoRosto,
            codEscola: codEscola,
            codUsuario: codUsuario,
        });
        console.log("Aluno criado:", novoAluno.codAluno);
        console.log("Dados do aluno salvo:", novoAluno.toJSON());
        res.redirect("/home/cadastro-alunos?sucesso=cadastro_realizado");
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        res.redirect("/home/cadastro-alunos?erro=erro_ao_cadastrar");
    }
});
router.get("/cadastro-alunos/delete/:codAluno", (req, res) =>{
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