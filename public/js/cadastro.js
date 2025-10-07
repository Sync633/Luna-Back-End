// Pega os parâmetros da URL
const parametrosURL = new URLSearchParams(window.location.search);
const tipoDeErro = parametrosURL.get('erro');
const tipoDeSucesso = parametrosURL.get('sucesso');

// Switch para lidar com os erros / sucessos
switch (tipoDeErro || tipoDeSucesso) {
  case 'usuario_ja_cadastrado':
    alert('Email já Cadastrado! Faça o login com seu email e senha.');
    break;
  case 'cadastro_ralizado':
    alert('Cadastro efetuado com sucesso! Realize o Login.');
    break;
  default:
    break;
}