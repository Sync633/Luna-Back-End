import express from "express";

const router = express.Router();

router.get('/cadastro-turmas', (req, res) => {
    res.render("cadastro-turmas")
});

export default router;