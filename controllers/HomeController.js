import express from "express";
import { usuarios, escolas } from "../model/association.js"; 

const router = express.Router();

router.get('/home', async (req, res) => {
    try {
        const usuario = req.session.usuarioNoBanco;
        
        if (!usuario) {
            return res.redirect('/login');
        }

        const escola = await escolas.findOne({
            where: { 
                codUsuario: usuario.codUsuario 
            }
        });

        if (!escola) {
            return res.redirect('/?erro=escola_nao_encontrada');
        }

        res.render('home', { 
            usuario: usuario,
            escolas: escola 
        });
    } catch (error) {
        console.error(error);
        res.redirect('/?erro=erro_carregar_dados');
    }
});

export default router;