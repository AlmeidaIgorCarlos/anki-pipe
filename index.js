const desserializador = require('./Servicos/desserializadorJSON');
const configuracao = desserializador.recuperarArquivoConfiguracao();

const listaFrases = require('./Servicos/listaFrases');
const listaFrasesConteudo = listaFrases.retornarFrases(configuracao.ListaPath);

const dicionario = require('./Servicos/dicionario');

let RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;

let listaPalavras = [];

listaFrasesConteudo.forEach((data, number, err) => {
    var palavra = RegExp.exec(data);
    if (palavra != null) {
        dicionario.consultar(palavra[0]).then(element => {
            let card = {
                frase: data,
                pronuncia: element.pronunciations,
                definicao: element.definitions,
                exemplos: element.examples
            }

            listaPalavras.push(card);
        });
    }
});

//////


