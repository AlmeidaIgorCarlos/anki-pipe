const desserializador = require('./Servicos/desserializadorJSON');
const listaFrases = require('./Servicos/listaFrases');
const dicionario = require('./Servicos/dicionario');
const ankiConnect = require('./Servicos/ankiconnect');

const configuracao = desserializador.recuperarArquivoConfiguracao();
const listaFrasesConteudo = listaFrases.retornarFrases(configuracao.ListaPath);

const RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;
let listaPalavras = [];

listaFrasesConteudo.forEach((data) => {
    let palavra = RegExp.exec(data);
    listaPalavras.push({palavra:palavra[0], frase:data});
});

const cartoesPromise = dicionario.consultar(listaPalavras);

async function fluxo(cartoesPromise) {
    try {
        let cartoesAnki = await Promise.all(cartoesPromise);

        cartoesAnki.forEach((data, index) => {
            if (data === false) cartoesAnki.splice(index, 1);
        });

        await ankiConnect.adicionar(cartoesAnki);
    } catch (error) {
        console.log(error);
    }
}

fluxo(cartoesPromise);