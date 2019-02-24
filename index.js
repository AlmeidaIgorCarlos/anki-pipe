const desserializador = require("./Servicos/desserializadorJSON");
const listaFrases = require("./Servicos/listaFrases");
const dicionarioGlosbe = require("./Servicos/dicionarios/globe");
const dicionarioOxford = require("./Servicos/dicionarios/oxford");
const ankiConnect = require("./Servicos/ankiconnect");

const listaFrasesConteudo = listaFrases.retornarFrases("./Arquivos/lista.txt");

const rgx = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;

const retornarCartao = palavra =>
  new Promise(async resolve => {
    const pronuncia = await dicionarioOxford.consultarPronuncia(palavra);
    const definicao = await dicionarioGlosbe.consultarDefinicao(palavra);
    const exemplo = await dicionarioGlosbe.consultarExemplo(palavra);
    resolve([pronuncia, definicao, exemplo]);
  });

const pegarCartoes = () =>
  new Promise(async resolve => {
    //converte .txt em array de palavras => [!palavra!, ...]
    const palavras = listaFrasesConteudo.map(frase => rgx.exec(frase)[0]);

    const fullCard = palavras.map(async palavra => {
      const [pronuncia, definicao, exemplo] = await retornarCartao(palavra);
      return {
        palavra,
        pronuncia,
        definicao,
        exemplo
      };
    });
    const r = await Promise.all(fullCard);
    resolve(r);
  });

pegarCartoes().then(cartoes => {
  console.log(cartoes.filter(cartao => cartao.palavra === "running"));
});
