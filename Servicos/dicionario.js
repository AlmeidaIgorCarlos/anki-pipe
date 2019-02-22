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

module.exports = {
    consultar: (palavra) => new Promise((resolve, reject) => {
        options.url = configuracao.OxfordAuthentication.app_url + configuracao.OxfordAuthentication.entries_path + palavra;

        let pronunciations = [];
        let definitions = [];
        let examples = [];

        request(options, (error, res, body) => {
            if (res.statusCode == 404) reject(false);

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
            })

            tempArr = [];

            definitions = definitions[0];

            examples.forEach(objetosArray);

            examples = tempArr[0];

            resolve({
                pronunciations: pronunciations,
                definitions: definitions,
                examples: examples
            })

        });
    })
}