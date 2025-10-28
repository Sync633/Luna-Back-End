![Status](https://img.shields.io/badge/Status-Under_Development-yellow)
# Luna-Web-App

Este repositório contém o código completo do projeto **Luna**, uma aplicação web para administração escolar com foco em soluções digitais para educação.

O sistema é responsável por gerenciar toda a **lógica de negócios**, a **interação com o banco de dados** e a **interface do usuário** (Views e estilos).

---

## 📋 Sobre o Projeto

O **Luna-Web-App** é a aplicação de gestão central, atuando como o sistema para a administração escolar da instituição de ensino.

Ele consiste na **Camada de Serviço (API)**, responsável por processar o ciclo completo de dados (CRUD), e nas **Interfaces Administrativas (Views)**, responsáveis pela experiência do usuário. O projeto gerencia todas as entidades essenciais da plataforma: Escolas, Professores, Alunos, Turmas e Matérias.

### Objetivos Principais:

* Gerenciar o ciclo de vida dos dados escolares usando o Sequelize (ORM) e MySQL.
* Prover um sistema de login e autenticação baseado em sessão (`express-session`).
* Manipular o upload de imagens (rostos e laudos) através do Multer.
* Renderizar as interfaces de administração usando o Template Engine EJS.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza o ecossistema Node.js (Express) para o Back-End e uma arquitetura baseada em Templates (EJS) para o Front-End:

| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Linguagem** | JavaScript (ESM - Módulos) | Linguagem de desenvolvimento principal (*Full-Stack*). |
| **Servidor** | Node.js / Express | Plataforma de execução e framework para o Back-End. |
| **Banco de Dados** | MySQL | Banco de dados relacional. |
| **ORM** | Sequelize | Mapeamento Objeto-Relacional para interagir com o MySQL. |
| **Front-End/Views** | EJS | **Template engine** para renderização das interfaces de administração. |
| **Estilo/Scripts** | HTML5, CSS3, JavaScript | Estrutura, estilo e scripts do lado do cliente. |
| **Upload de Arquivos**| Multer | Middleware para manipulação de `multipart/form-data` (upload de imagens). |
| **Segurança** | `express-session` | Gerenciamento de sessões de usuário. |

---

## 📁 Estrutura do Projeto

A arquitetura segue o padrão de módulos (Controller, Model, View, Utilities) do Node.js:

```
luna-back-end/
├── config/ 
│ └── sequelize-config.js       # Configuração de conexão com o MySQL. 
├── controllers/ 
│ ├── ...Controller.js          # Arquivos de Rotas (CRUD e Regras de Negócio). 
├── model/ 
│ ├── ...js                     # Definições das Tabelas (Modelos Sequelize). 
├── mysql-database-script/      # Pasta para o script SQL.
├── public/ 
│ ├── assets/                   # Logos, ícones, imagens e vetores. 
│ ├── css/                      # Estilos principais (CSS3)
│ ├── js/                       # Scripts do lado do cliente. 
├── views/ 
├── ...ejs                      # Arquivos de interface (EJS | HTML5). 
├── utils/ 
│ └── ...js                     # Funções utilitárias (Data, Formato de Nome, Validação). 
├── index.js                    # Ponto de entrada principal do servidor. 
├── LICENSE                     # Licença do projeto (MIT)
└── package.json                # Dependências do projeto.
```

---

## 📄 Documentação e Artefatos (PI)

Toda a documentação acadêmica e artefatos de engenharia de software (Artigo Científico, Logbook e Diagramas) estão centralizados no repositório de documentação do Projeto Integrador (PI):

**Repositório Completo:** [vgmandira7/Latex-PI-Luna](https://github.com/vgmandira7/Latex-PI-Luna)

---

## 💻 Como Executar Localmente

Siga os passos abaixo para preparar o ambiente e rodar o Back-End localmente:

### 1. Preparação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Sync633/Luna-Back-End.git
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd luna-back-end
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### 2. Banco de Dados (MySQL)

Este projeto requer um servidor MySQL em execução.

1.  **Acesse seu cliente SQL** (Workbench, HeidiSQL, DBeaver, etc.).
2.  **Execute o Script SQL:** Rode o script de criação do banco de dados e tabelas que está localizado na pasta:
    ```
    /mysql-database-script
    ```
    * **Nome do Banco de Dados:** O nome do banco de dados configurado no projeto é **`projetointegrador`**.
3.  **Verifique as Credenciais:** Confirme se as credenciais de conexão no arquivo `config/sequelize-config.js` estão corretas para o seu ambiente local (`host: "localhost"`, `username: "root"`, `password: ""`).

### 3. Iniciar o Servidor

1.  **Execute o Servidor:** Use o script de inicialização do `nodemon` definido no `package.json`:
    ```bash
    npm start
    ```
2.  **Acesse a Aplicação:** O servidor estará acessível no seu navegador (porta padrão **8080**):
    ```
    http://localhost:8080
    ```
    *Você será direcionado para a tela de Login.*


---

## 👥 Nossa Equipe

Este projeto foi desenvolvido em colaboração com uma equipe, com a seguinte divisão de responsabilidades:

| Membro da Equipe | Contribuição |
| :--- | :--- |
| **[Miguel](https://github.com/Sync633)** | Desenvolvimento do **Back-End** (Node.js/Express), implementando a arquitetura central, a lógica de negócios, as rotas (Controllers) e a modelagem de dados (Sequelize/ORM). |
| **[Geovanna](https://github.com/geegeovanna)** | Responsável pelo **Design e Conceito Visual** do projeto (UX/UI, Protótipos e Layouts) e colaboração na implementação de funcionalidades do **Back-End** (Controllers e manipulação do banco de dados com Sequelize). |
| **[Ana Flávia](https://github.com/anacardozo)** | Desenvolvimento do **Front-End**, incluindo todas as *Views* (arquivos EJS), os estilos (CSS) e os scripts do lado do cliente (JavaScript, como modais e alertas). |
| **[Vitor](https://github.com/vgmandira7)** | **Documentação Técnica e Científica:** Elaboração e redação do **Artigo Científico** (incluindo Fundamentação Teórica, Objetivos e Estado da Arte). Criação de **Artefatos e Diagramas**, como o Diagrama do Banco de Dados (DER). |
| **[Vinícius](https://github.com/zFreitaz)** | Responsável pela criação dos **Artefatos e Diagramas** (modelos conceituais e fluxogramas) e pela manutenção do **Logbook** (registro de atividades e progresso do projeto).|

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com 💙 pela equipe Luminous.