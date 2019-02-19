var request = require('request');
var configuracao = require('./../Arquivos/configuracao');

var headers = {
    'Content-Type': 'application/json',
    'app_key': configuracao.OxfordAuthentication.app_key,
    'app_id': configuracao.OxfordAuthentication.app_id
}

var options = {
    url: configuracao.OxfordAuthentication.app_url + configuracao.OxfordAuthentication.entries_path,
    method: 'GET',
    headers: headers
}

exports.consultar =  (palavra) => new Promise((resolve) => {
    options.url += palavra;

    var pronunciations = [];
    var definitions = [];
    var examples = [];

    request(options, (error, res, body) => {
        var json = JSON.parse(body);
        var tempArr = [];

        var objetosArray = function (data, index) {
            tempArr.push(data);
        }

        json.results.forEach(objetosArray);
        var lexicalEntries = [];

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

        // pronunciations.forEach(element => {
        //     console.log(element.phoneticSpelling);
        // });
        // console.log('-----------');

        var entries = [];

        lexicalEntries.forEach((data, index) => {
            entries.push(data);
        });
        tempArr = [];

        var senses = [];

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

        // definitions.forEach(element => {
        //     console.log(element.definitions[0]);
        // });
        // console.log('-----------');


        examples.forEach(objetosArray);

        examples = tempArr[0];

        // examples.forEach(element => {
        //     console.log(element.text);
        // });
        // console.log('-----------');

        // console.log('--'+retorno.definitions);
        resolve({
            pronunciations: pronunciations,
            definitions: definitions,
            examples: examples
        })

    });
});