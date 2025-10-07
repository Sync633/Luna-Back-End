import express from "express";

const router = express.Router();

router.get('/cadastro-alunos', (req, res) => {
    res.render("cadastro-alunos")
});

export default router;