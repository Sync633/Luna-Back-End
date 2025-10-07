import express from "express";

const router = express.Router();

// BD **(Temporário)**
const usuarios = [
    {
        nome: 'Escola de Teste',
        cnpj: '12.345.678/0001-90',
        email: 'admin@email.com',
        bairro: 'Centro',
        telefone: '11987654321',
        cidade: 'Sao Paulo',
        rua: 'Rua Principal',
        senha: '123456'
    }
];

// Rota GET para renderizar a página de cadastro
router.get('/cadastro', (req, res) => {
    res.render("cadastro")
});

// Rota POST para processar o formulário de cadastro
router.post('/cadastro', (req, res) => {
    // Recebendo os dados do formulário
    const { nome, cnpj, email, bairro, telefone, cidade, rua, senha } = req.body;

    // Verificação de Email
    const usuarioExistente = usuarios.find(u => u.email === email);
    if (usuarioExistente) {
        return res.redirect('/cadastro?erro=email_ja_cadastrado');
    }

    // Criar o objeto do com os dados do Novo Usuário
    const novoUsuario = { nome, cnpj, email, bairro, telefone, cidade, rua, senha};

    // Adicionar o usuário ao Banco de Dados temporário
    usuarios.push(novoUsuario);
    // Mostra os dados no novo usuário e o numero de usuários cadastrados
    console.log('Novo utilizador cadastrado:', novoUsuario);
    console.log('Total de utilizadores no banco de dados:', usuarios);

    res.redirect('/?sucesso=cadastro_realizado');
});

export default router;
export { usuarios };