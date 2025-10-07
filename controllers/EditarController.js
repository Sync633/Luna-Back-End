import express from "express";

const router = express.Router();

router.get('/editar', (req, res) => {
    res.render("editar")
});

export default router;