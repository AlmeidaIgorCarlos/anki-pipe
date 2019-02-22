const desserializador = require('./Servicos/desserializadorJSON');
const listaFrases = require('./Servicos/listaFrases');
const dicionario = require('./Servicos/dicionario');
const ankiConnect = require('./Servicos/ankiconnect');

const configuracao = desserializador.recuperarArquivoConfiguracao();
const listaFrasesConteudo = listaFrases.retornarFrases(configuracao.ListaPath);

const RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;
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

            ankiConnect.adicionar(card).then((element => {
                console.log("Card adicionado com sucesso");
            })).catch((element) => {
                console.log("Erro ao adicionar o card");
            });
        }).catch((element) => {
            console.log('erro ao consultar palavra no dicionario');
        })
    }
});