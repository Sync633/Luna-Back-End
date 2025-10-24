const menu = document.querySelector(".botao-menu");
const menuLateral = document.querySelector(".menu-lateral");
const conteudo = document.querySelector(".content");
const navPesquisa = document.querySelector(".nav-pesquisa");

menu.addEventListener("click", () => {
  menuLateral.classList.toggle("active");
  conteudo.classList.toggle("active");
  navPesquisa.classList.toggle("active");
});


// ALERTAS TELA HOME
const modal = document.querySelector('.modal-materia');
const mheader = document.querySelector('.modal-header');
const lgMateria = document.querySelector('.logo-materia');
const mbody = document.querySelector('.modal-body');
const btnFechar = document.querySelector('.fechar-modal');
const mShadown = document.querySelector('.modal-shadown');

function ativarModal() {
  modal.style.animation = "modalIn .5s"
  mShadown.style.animation = "shadownIn .5s"

  modal.style.display = "flex";
  mShadown.style.display = "block";
}

btnFechar.addEventListener("click", () => {
   modal.style.animation = "modalOut .5s"
   mShadown.style.animation = "shadownOut .5s"

    modal.addEventListener('animationend', function handler() {
        modal.style.display = "none";
        mShadown.style.display = "none";

        modal.removeEventListener('animationend', handler); 
    }, { once: true }); 
});

const modalE = document.querySelector('.modal-materiaE');
const mheaderE = document.querySelector('.modal-headerE');
const lgMateriaE = document.querySelector('.logo-materia');
const mbodyE = document.querySelector('.modal-bodyE');
const btnFecharE = document.querySelector('.fechar-modalE');
const mShadownE = document.querySelector('.modal-shadownE');

const botaoConfirmar = document.getElementById("botaoConfirmar");
const botaoCancelar = document.getElementById("botaoCancelar");

function ativarModalM(codMateria) {
  botaoConfirmar.href = `/home/deletar-materia/${codMateria}`;

  modalE.style.animation = "modalEIn .5s"
  mShadownE.style.animation = "shadownEIn .5s"

  modalE.style.display = "flex";
  mShadownE.style.display = "block";
}

function fecharModalM() {
   modalE.style.animation = "modal2Out .5s"
   mShadownE.style.animation = "shadown2Out .5s"

    modalE.addEventListener('animationend', function handler() {
        modalE.style.display = "none";
        mShadownE.style.display = "none";

        modalE.removeEventListener('animationend', handler); 
    }, { once: true }); 
}

btnFecharE.addEventListener("click", () => {
   modalE.style.animation = "modalEOut .5s"
   mShadownE.style.animation = "shadownEOut .5s"

    modalE.addEventListener('animationend', function handler() {
        modalE.style.display = "none";
        mShadownE.style.display = "none";

        modalE.removeEventListener('animationend', handler); 
    }, { once: true }); 
});