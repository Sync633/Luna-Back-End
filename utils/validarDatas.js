export const validarDatas = (dataNascString) => {
    // Validação do formato com regex
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dataNascString)) {
        console.error('Erro de validação: Formato de data inválido.');
        return null;
    }

    // Separa a string em partes
    const partes = dataNascString.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);

    // Cria o objeto de data. O mês no JavaScript é de 0 a 11, por isso "mes - 1"
    const dataObjeto = new Date(ano, mes - 1, dia + 1);

    // Validação extra para datas inválidas (ex: 31/02)
    // Se a data criada não for a mesma que a original, é inválida.
    if (dataObjeto.getFullYear() !== ano || dataObjeto.getMonth() + 1 !== mes || dataObjeto.getDate() - 1 !== dia) {
        console.error('Erro de validação: Data inválida ou inexistente.');
        return alert('Data Inválida');
    }

    return dataObjeto;
};