// Pega os parâmetros da URL
const parametrosURL = new URLSearchParams(window.location.search);
const tipoDeErro = parametrosURL.get('erro');

// Switch para lidar com os erros
switch (tipoDeErro) {
  case 'senha_errada':
    alert('Senha incorreta. Tente novamente.');
  break;
  case 'usuario_nao_encontrado':
    alert('Usuário não encontrado. Cadastre-se primeiro.');
  break;
  case 'escola_nao_encontrada':
    alert('Sessão Inválida! Faça Login Novamente!')
  default:
    break;
}