import express from "express";

const router = express.Router();

router.get('/cadastro-professores', (req, res) => {
    res.render("cadastro-professores")
});

export default router;