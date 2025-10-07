const menu = document.querySelector(".botao-menu");
const menuLateral = document.querySelector(".menu-lateral");
const conteudo = document.querySelector(".content");
const navPesquisa = document.querySelector(".nav-pesquisa");

menu.addEventListener("click", () => {
  menuLateral.classList.toggle("active");
  conteudo.classList.toggle("active");
  navPesquisa.classList.toggle("active");
});
