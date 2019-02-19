var desserializador = require('./Servicos/desserializadorJSON');
var configuracao = desserializador.recuperarArquivoConfiguracao();

var listaFrases = require('./Servicos/listaFrases');
var listaFrasesConteudo = listaFrases.retornarFrases(configuracao.ListaPath);

var RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;

var listaPalavras = [];
var log = [];

listaFrasesConteudo.forEach((data, number, err) => {
    try {
        var palavra = RegExp.exec(data);
        if (palavra != null) listaPalavras.push(palavra[0]);
    } catch (error) {
        log.push(error);
    }
});

var dic = require('./Servicos/dicionario');

dic.dicionario('hello').then(element => {
    console.log(element);
});