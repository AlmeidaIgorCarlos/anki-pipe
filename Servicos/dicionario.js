const request = require('request');
const configuracao = require('./../Arquivos/configuracao');

const headers = {
    'Content-Type': 'application/json',
    'app_key': configuracao.OxfordAuthentication.app_key,
    'app_id': configuracao.OxfordAuthentication.app_id
}

let options = {
    url: configuracao.OxfordAuthentication.app_url + configuracao.OxfordAuthentication.entries_path,
    method: 'GET',
    headers: headers
}

function pesquisarPalavras(palavra, frasePalavra) {
    options.url = configuracao.OxfordAuthentication.app_url + configuracao.OxfordAuthentication.entries_path + palavra;

    let pronunciations = [];
    let definitions = [];
    let examples = [];

    return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
            if (res.statusCode == 404)
                return resolve(false);

            let json = JSON.parse(body);
            let tempArr = [];

            let objetosArray = function (data, index) {
                tempArr.push(data);
            }

            json.results.forEach(objetosArray);
            let lexicalEntries = [];

            tempArr.forEach((data, index) => {
                lexicalEntries.push(data.lexicalEntries);
            });


            tempArr = [];

            lexicalEntries.forEach(objetosArray);

            tempArr[0].forEach((data, index) => {
                pronunciations.push(data.pronunciations);
            });

            tempArr = [];

            pronunciations = pronunciations[0];

            let entries = [];

            lexicalEntries.forEach((data, index) => {
                entries.push(data);
            });
            tempArr = [];

            let senses = [];

            entries[0].forEach((data, index) => {
                senses.push(data.entries);
            });
            tempArr = [];

            senses.forEach(objetosArray);


            tempArr[0].forEach((data, index) => {
                definitions.push(data.senses);
            });

            tempArr = [];

            definitions.forEach(objetosArray);

            tempArr[0].forEach((data, index) => {
                examples.push(data.examples);
            });

            tempArr = [];

            definitions = definitions[0];

            examples.forEach(objetosArray);

            examples = tempArr[0];

            return resolve({
                pronunciations: pronunciations,
                definitions: definitions,
                examples: examples,
                frase: frasePalavra
            })

        });
    });
}

module.exports = {
    consultar: (palavras) => {
        let cardsPromise = [];
        try {
            palavras.forEach(function (data) {
                let cartao = pesquisarPalavras(data.palavra, data.frase);

                cardsPromise.push(cartao);
            });
            return cardsPromise;
        } catch (error) {
            cardsPromise.push(error);
        }
    }
}