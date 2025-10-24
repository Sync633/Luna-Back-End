import express from "express";
import Materia from "../model/Materia.js";

const router = express.Router();

router.get("/home", async (req, res) => {
  try {
    const escola = req.session.usuarioLogado;

    if (!escola) {
      return res.redirect("/?erro=escola_nao_encontrada");
    }

    const materias = await Materia.findAll({
        where: { codEscola : escola.codEscola }
    })

    res.render("home", {
      escola: escola,
      materias: materias
    });
  } catch (error) {
    console.error(error);
    res.redirect("/?erro=erro_carregar_dados");
  }
});

router.post("/home/cadastrar-materia", async (req, res) => {
  try {
    const escola = req.session.usuarioLogado;

    if (!escola) {
      return res.redirect("/?erro=escola_nao_encontrada");
    }

    const nome = req.body.nome;

    await Materia.create({
      nome,
      codEscola : escola.codEscola
    });

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.redirect("/home/?erro=erro_carregar_dados");
  }
});

router.get("/home/deletar-materia/:codMateria", async(req, res) => {
  try{
    const escola = req.session.usuarioLogado;

    if (!escola) {
      return res.redirect("/?erro=escola_nao_encontrada");
    }

    const codMateria = req.params.codMateria

    await Materia.destroy({
      where: {
      codMateria: codMateria
    }
    });

    res.redirect("/home");
  } catch (error) {
    console.loh("ERRO: Não foi possível deletar a matéria", error)
  }
})

export default router;
