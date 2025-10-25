//ALERTAS TELA PROFESSOR

const modal2 = document.querySelector('.modal-professor');
const mheader2 = document.querySelector('.modal-header2');
const lgProfessor = document.querySelector('.logo-professor');
const mbody2 = document.querySelector('.modal-body2');
const btnFechar2 = document.querySelector('.fechar-modal2');
const mShadown2 = document.querySelector('.modal-shadown2');

const botaoConfirmar2 = document.getElementById("botaoConfirmar2");

function ativarModal2(codProfessor) {
  botaoConfirmar2.href = `/home/cadastro-professores/delete/${codProfessor}`;
  modal2.style.animation = "modal2In .5s"
  mShadown2.style.animation = "shadown2In .5s"

  modal2.style.display = "flex";
  mShadown2.style.display = "block";
}

function fecharModal2() {
   modal2.style.animation = "modal2Out .5s"
   mShadown2.style.animation = "shadown2Out .5s"

    modal2.addEventListener('animationend', function handler() {
        modal2.style.display = "none";
        mShadown2.style.display = "none";

        modal2.removeEventListener('animationend', handler); 
    }, { once: true }); 
}

btnFechar2.addEventListener("click", () => {
   modal2.style.animation = "modal2Out .5s"
   mShadown2.style.animation = "shadown2Out .5s"

    modal2.addEventListener('animationend', function handler() {
        modal2.style.display = "none";
        mShadown2.style.display = "none";

        modal2.removeEventListener('animationend', handler); 
    }, { once: true }); 
});