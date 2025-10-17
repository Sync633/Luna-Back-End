import express from "express";
import multer from "multer";
import {usuarios, escolas} from "../model/association.js";
import { formatarData } from "../utils/formatarData.js";
import { formatarNomeImg } from "../utils/formatarNomeImg.js";
 
const router = express.Router();
 
// --- Configuração do Multer para Salvar A Imagem da Escola ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const nomeEscola = req.body.nome;
        const nomeLimpo = formatarNomeImg(nomeEscola);
        const dataHoje = formatarData(new Date());
        const nomeFinalImagem = `${nomeLimpo}-${dataHoje}.jpg`;
       
        cb(null, nomeFinalImagem);
    }
});
 
const upload = multer({ storage: storage });
 
// Rota GET para renderizar a página de cadastro
router.get('/cadastro', (req, res) => {
  res.render("cadastro");
});
 
router.post("/cadastro", upload.single("urlFotoEscola"), async (req, res) => {
    try {
        const { email, senha, nome, cnpj, rua, bairro, cidade, telefone } = req.body;
       
        const urlFotoEscola = req.file ? `/uploads/${req.file.filename}` : null;
 
        const novoUsuario = await usuarios.create({
            email,
            senha
        });
 
        const novaInstituicao = await escolas.create({
            nome,
            email,
            cnpj,
            rua,
            bairro,
            cidade,
            telefone,
            urlFotoEscola,
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