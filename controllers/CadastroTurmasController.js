import express from "express";
import Professor from "../model/Professor.js";
import Aluno from "../model/Aluno.js";
import Turma from "../model/Turma.js";

const router = express.Router();

router.get('/cadastro-turmas', async (req, res) => {
    // Verifica se a sessão do usuário é válida
    if (!req.session || !req.session.usuarioLogado) {
        return res.redirect("/home"); 
    }
    // Pega o código da escola da session do usuário
    const codEscola = req.session.usuarioLogado.codEscola;

    // Obtem o ID da turma selecionada
    let codTurmaSelecionada = req.query.turma;

    let detalhesTurma = null;

    try{
        // Busca todos os professores cadastrados daquela escola
        const professores = await Professor.findAll({
            where: { codEscola : codEscola}
        });
        // Busca todos os alunos cadastrados, sem nenhuma turma
        const alunos = await Aluno.findAll({
            where: {
                codEscola : codEscola,
                codTurma: null
            }
        });
        // Busca todos as turmas da escola
        const turmas = await Turma.findAll({
            where: { codEscola : codEscola}
        });

        if (!codTurmaSelecionada) {
            // Se nenhuma turma estiver selecionada, deixa a primeira turma de escola como padrão
            codTurmaSelecionada = turmas[0].codTurma;
        }
        // Caso haja uma turma selecionada passa os dados dela
        if (codTurmaSelecionada) {
             detalhesTurma = await Turma.findOne({
                where: { 
                    codTurma: codTurmaSelecionada,
                    codEscola: codEscola 
                },
                include: [
                    { model: Professor, as: 'professor' }, // Traz todos os dados do Professor da turma
                    { model: Aluno, as: 'alunos' }      // Traz todos os Alunos dessa turma
                ]
            });
        }
    
        res.render("cadastro-turmas", {
            professores : professores,
            alunos: alunos,
            turmas: turmas,
            turmaSelecionada: detalhesTurma
        });
    } catch (error) {
        console.error(error);
    }
});



router.post('/cadastro-turmas', async (req, res) => {
    // Verifica se a sessão do usuário é válida
    if (!req.session || !req.session.usuarioLogado) {
        return res.redirect("/home"); 
    }
    const { nome, codProfessor, aluno } = req.body;
    const codEscola = req.session.usuarioLogado.codEscola;
    
    try {
        const novaTurma = await Turma.create({
            nome: nome,
            codProfessor: codProfessor,
            codEscola : codEscola
        });

        const codTurmaCriada = novaTurma.codTurma;

        // Verifica se os códigos dos alunos vindos do formulário é um array.
        // Caso seja uma "String" (1 codigo apenas), tranforma em Array também
        let codsAlunos = Array.isArray(aluno) 
                                     ? aluno 
                                     : (aluno ? [aluno] : []);
        
        // Verifica se há alunos para atualizar 
        if (codsAlunos.length > 0) {
            // Atualiza os alunos com o código de sua Turma
            await Aluno.update(
                { codTurma: codTurmaCriada },
                { where: { codAluno: codsAlunos} }
            );
        }
        res.redirect('/home/cadastro-turmas');
    } catch (error) {
        console.error('Erro ao cadastrar turma ou vincular alunos:', error);
        res.redirect('/home/cadastro-turmas');
    }
});



// Rota para DELETAR uma turma
router.get("/cadastro-turmas/delete-turma/:codTurma", async (req, res) =>{
    const codTurma = req.params.codTurma;
    const codEscola = req.session.usuarioLogado.codEscola;

    // Reseta o codTurma dos Alunos vinculados a ela
    await Aluno.update(
    { codTurma: null }, 
    { where: { 
        codTurma: codTurma,
        codEscola: codEscola
        }
    });

    // Apaga a Turma do Sistema
    Turma.destroy({
    where: {
        codTurma: codTurma,
        codEscola: codEscola
    }
    }).then(() => {
    res.redirect("/home/cadastro-turmas");
    }).catch(error => {
    console.log(error);
    });
});

// Rota para DELETAR um aluno da Turma
router.get("/cadastro-turmas/delete-aluno/:codAluno/:codTurma", async (req, res) =>{
    const codAluno = req.params.codAluno;
    const codTurma = req.params.codTurma;
    const codEscola = req.session.usuarioLogado.codEscola;

    try {
    // Reseta o codTurma dos Alunos vinculados a ela
    await Aluno.update(
    { codTurma: null }, 
    { where: { 
        codAluno: codAluno,
        codEscola: codEscola
        }
    });

    res.redirect(`/home/cadastro-turmas?turma=${codTurma}`);
    } catch (error) {
        console.log(error);
    }   
});

export default router;