// Importação do Express (FrameWork)
import express from "express";
// Incialização do Express para a variável "app"
const app = express();

// Processar requisições
app.use(express.urlencoded({ extended: true }));

import LoginController from "./controllers/LoginController.js";
import CadastroController from "./controllers/CadastroController.js";
import HomeController from "./controllers/HomeController.js"
import CadastroAlunosController from './controllers/CadastroAlunosController.js';
import CadastroProfessoresController from './controllers/CadastroProfessoresController.js';
import CadastroTurmasController from './controllers/CadastroTurmasController.js';
import EditarController from './controllers/EditarController.js';

// Definindo o EJS como renderizador das Páginas 
app.set('view engine', 'ejs');

// ====== Definindo a pasta PUBLIC para arquivos Estáticos
app.use(express.static("public"));

// ====== Definindo o uso das rotas que estão nos controllers
app.use("/", LoginController);
app.use("/", CadastroController);
app.use("/", HomeController);
app.use('/home', CadastroAlunosController);
app.use('/home', CadastroProfessoresController);
app.use('/home', CadastroTurmasController);
app.use('/home', EditarController);


// ====== Iniciando o Servidor HTTP ====== */
// Porta do Servidor
const port = 8080;
app.listen(port, (error) => {
    if (error) {
        console.log(`Não foi possível iniciar o servidor, ocorreu um erro! \n ERRO - ${error}`);
    } else {
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
    }
});
