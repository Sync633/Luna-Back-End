import express from "express";

// Importando o BD temporário
import { usuarios } from "./CadastroController.js";

const router = express.Router();

// Rota GET para a "Raiz" para o Login
router.get("/", (req, res) => {
    res.render("index")
});

// Rota POST para realizar o login do Usuário
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const usuarioNoBanco = usuarios.find(u => u.email === email);

    if (!usuarioNoBanco) {
        return res.redirect('/?erro=usuario_nao_encontrado');
    }

    if (senha !== usuarioNoBanco.senha) {
        return res.redirect('/?erro=senha_errada');
    }
    
    // Redireciona passando o nome pelo link **(Temporário)**
    res.redirect(`/home?nome=${usuarioNoBanco.nome}`);
});

export default router;