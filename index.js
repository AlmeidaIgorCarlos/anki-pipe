const desserializador = require('./Servicos/desserializadorJSON');
const listaFrases = require('./Servicos/listaFrases');
const dicionarioGlosbe = require('./Servicos/dicionarios/globe');
const dicionarioOxford = require('./Servicos/dicionarios/oxford');
const ankiConnect = require('./Servicos/ankiconnect');

const configuracao = desserializador.recuperarArquivoConfiguracao();
const listaFrasesConteudo = listaFrases.retornarFrases(configuracao.ListaPath);

const RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;
let cartoes = [];

function fluxo() {
    try {
        listaFrasesConteudo.forEach(async (data) => {
            let palavra = RegExp.exec(data);
            let valores = [];

            valores = await Promise.all([dicionarioOxford.consultarPronuncia(palavra[0]),
            dicionarioGlosbe.consultarDefinicao(palavra[0]),
            dicionarioGlosbe.consultarExemplo(palavra[0])]
            );

            let cartao = {
                pronuncias: valores[0],
                definicoes: valores[1],
                exemplos: valores[2]
            };
            cartoes.push(cartao);
        });

        ankiConnect.adicionar(cartoes);
    } catch (error) {
        console.log(error);
    }
}

fluxo();