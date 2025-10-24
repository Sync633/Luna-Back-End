//ALERTAS TELA PROFESSOR

const modal4 = document.querySelector('.modal-turma');
const mheader4 = document.querySelector('.modal-header4');
const lgTurma = document.querySelector('.logo-turma');
const mbody4 = document.querySelector('.modal-body4');
const btnFechar4 = document.querySelector('.fechar-modal4');
const mShadown4 = document.querySelector('.modal-shadown4');

function ativarModal4() {
  modal4.style.animation = "modal4In .5s"
  mShadown4.style.animation = "shadown4In .5s"

  modal4.style.display = "flex";
  mShadown4.style.display = "block";
}

btnFechar4.addEventListener("click", () => {
   modal4.style.animation = "modal4Out .5s"
   mShadown4.style.animation = "shadown4Out .5s"

    modal4.addEventListener('animationend', function handler() {
        modal4.style.display = "none";
        mShadown4.style.display = "none";

        modal4.removeEventListener('animationend', handler); 
    }, { once: true }); 
});