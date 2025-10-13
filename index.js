// Importação do Express (FrameWork)
import express from "express";
// Incialização do Express para a variável "app"
const app = express();

import connection from "./config/sequelize-config.js";
import session from "express-session";

// Sessão
app.use(session({
  secret: "segredo123",
  resave: false,
  saveUninitialized: false,
  cookie: {
   maxAge: 60 * 60 * 1000 // Tempo Máximo de 1HR
  }
}));


// Processar requisições
app.use(express.urlencoded({ extended: true }));

import LoginController from "./controllers/LoginController.js";
import HomeController from "./controllers/HomeController.js";
import CadastroAlunosController from './controllers/CadastroAlunosController.js';
import CadastroProfessoresController from './controllers/CadastroProfessoresController.js';
import CadastroTurmasController from './controllers/CadastroTurmasController.js';
import EditarController from './controllers/EditarController.js';
import CadastroController from './controllers/CadastroController.js';

// Definindo o EJS como renderizador das Páginas 
app.set('view engine', 'ejs');

// ====== Definindo a pasta PUBLIC para arquivos Estáticos
app.use(express.static("public"));

// ====== Definindo o uso das rotas que estão nos controllers
app.use("/", LoginController);
app.use("/", HomeController);
app.use('/home', CadastroAlunosController);
app.use('/home', CadastroProfessoresController);
app.use('/home', CadastroTurmasController);
app.use('/home', EditarController);
app.use('/', CadastroController);

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizado com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });


// ====== Iniciando o Servidor HTTP ====== */

const port = 8080;
app.listen(port, function (error) {
  if (error) {
    console.log(`Não foi possível iniciar o servidor. Erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em http://localhost:${port} !`);
  }
});
