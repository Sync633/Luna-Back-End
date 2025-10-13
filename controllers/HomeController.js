import express from "express";

const router = express.Router();

router.get('/home', async (req, res) => {
    try {
        const escola = req.session.usuarioLogado;
        
        if (!escola) {
            return res.redirect('/?erro=escola_nao_encontrada');
        }

        res.render('home', {
            escola: escola 
        });
    } catch (error) {
        console.error(error);
        res.redirect('/?erro=erro_carregar_dados');
    }
});

export default router;