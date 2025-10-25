//ALERTAS TELA PROFESSOR

const modal4 = document.querySelector('.modal-turma');
const mheader4 = document.querySelector('.modal-header4');
const lgTurma = document.querySelector('.logo-turma');
const mbody4 = document.querySelector('.modal-body4');
const btnFechar4 = document.querySelector('.fechar-modal4');
const mShadown4 = document.querySelector('.modal-shadown4');

const botaoConfirmar4 = document.getElementById("botaoConfirmar4");

function ativarModal4(codTurma) {
  botaoConfirmar4.href = `/home/cadastro-turmas/delete-turma/${codTurma}`;

  modal4.style.animation = "modal4In .5s"
  mShadown4.style.animation = "shadown4In .5s"

  modal4.style.display = "flex";
  mShadown4.style.display = "block";
}

function fecharModal4() {
   modal4.style.animation = "modal4Out .5s"
   mShadown4.style.animation = "shadown4Out .5s"

    modal4.addEventListener('animationend', function handler() {
        modal4.style.display = "none";
        mShadown4.style.display = "none";

        modal4.removeEventListener('animationend', handler); 
    }, { once: true }); 
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

const modal5 = document.querySelector('.modal-aluno');
const mheader5 = document.querySelector('.modal-header5');
const lgAluno = document.querySelector('.logo-aluno');
const mbody5 = document.querySelector('.modal-body5');
const btnFechar5 = document.querySelector('.fechar-modal5');
const mShadown5 = document.querySelector('.modal-shadown5');

const botaoConfirmar5 = document.getElementById("botaoConfirmar5");

function ativarModal5(codAluno, codEscola) {
  botaoConfirmar5.href = `/home/cadastro-turmas/delete-aluno/${codAluno}/${codEscola}`;

  modal5.style.animation = "modal4In .5s"
  mShadown5.style.animation = "shadown4In .5s"

  modal5.style.display = "flex";
  mShadown5.style.display = "block";
}

btnFechar5.addEventListener("click", () => {
   modal5.style.animation = "modal5Out .5s"
   mShadown5.style.animation = "shadown5Out .5s"

    modal5.addEventListener('animationend', function handler() {
        modal5.style.display = "none";
        mShadown5.style.display = "none";

        modal5.removeEventListener('animationend', handler); 
    }, { once: true }); 
});