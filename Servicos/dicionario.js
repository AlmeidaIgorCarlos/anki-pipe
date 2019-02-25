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

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function pesquisarPalavras(palavra, frasePalavra) {
    options.url = configuracao.OxfordAuthentication.app_url + configuracao.OxfordAuthentication.entries_path + palavra;

    let pronunciations = [];
    let definitions = [];
    let examples = [];

    return new Promise((resolve, ) => {
        request(options, (err, res, body) => {
            if (err | res.statusCode == 404)
                resolve(false);
            else {

                let json = JSON.parse(body);
                try {
                    pronunciations = json.results[0].lexicalEntries.map(lexicalEntry => lexicalEntry.pronunciations[0].phoneticSpelling);
                    definitions = flatten(json.results[0].lexicalEntries.map(lexicalEntry => lexicalEntry.entries.map(entry => entry.senses.map(sense => `${sense.definitions}<br/>`))));
                    examples = flatten(json.results[0].lexicalEntries.map(lexicalEntry => lexicalEntry.entries.map(entry => entry.senses.map(sense => sense.examples.map(example => `${example.text}<br/>`)))));

                } catch (error) {

                } finally {
                    resolve({
                        pronunciations: pronunciations,
                        definitions: definitions,
                        examples: examples,
                        frase: frasePalavra
                    })
                }
            }

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