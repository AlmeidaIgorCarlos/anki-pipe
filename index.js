const listaFrases = require('./Servicos/listaFrases');
const webScraper = require('./Servicos/webScraper');
//const ankiConnect = require('./Servicos/ankiconnect');

const listaFrasesConteudo = listaFrases.retornarFrases('C:/Users/Igor Almeida/Documents/Node/AnkiPIPE/Arquivos/lista.txt');

const RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;
let listaPalavras = [];

listaFrasesConteudo.forEach((data) => {
    let palavra = RegExp.exec(data);
    listaPalavras.push({palavra:palavra[0], frase:data});
});