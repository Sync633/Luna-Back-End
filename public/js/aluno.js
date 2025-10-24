//ALERTAS TELA ALUNO

const modal3 = document.querySelector('.modal-aluno');
const mheader3 = document.querySelector('.modal-header3');
const lgAluno = document.querySelector('.logo-aluno');
const mbody3 = document.querySelector('.modal-body3');
const btnFechar3 = document.querySelector('.fechar-modal3');
const mShadown3 = document.querySelector('.modal-shadown3');

function ativarModal3() {
  modal3.style.animation = "modal3In .5s"
  mShadown3.style.animation = "shadown3In .5s"

  modal3.style.display = "flex";
  mShadown3.style.display = "block";
}

btnFechar3.addEventListener("click", () => {
   modal3.style.animation = "modal3Out .5s"
   mShadown3.style.animation = "shadown3Out .5s"

  modal3.addEventListener('animationend', function handler() {
        modal3.style.display = "none";
        mShadown3.style.display = "none";

        modal3.removeEventListener('animationend', handler); 
    }, { once: true }); 
});