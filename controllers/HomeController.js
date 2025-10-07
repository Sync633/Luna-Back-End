import express from "express";

const router = express.Router();

router.get('/home', (req, res) => {
    // Puxa o nome do usuario **(Temporário)**
    const nome = req.query.nome;
    const nomeParaView = nome;

    res.render('home',  {
        nome : nomeParaView
    });
});

export default router;