const request = require('request');

module.exports = {

    consultarDefinicao: (palavra) => {
        return new Promise((resolve) => {
            request(`https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=${palavra}&pretty=true`, (err, res, body) => {
                if (err || res.statusCode == 404) return resolve([`não foi encontrado nenhuma definicao para a palavra: ${palavra}`]);
                const json = JSON.parse(body);
                return resolve(
                    json.tuc[0].meanings.map(meaning => meaning.text)
                )
            })
        });
    },
    consultarExemplo: (palavra) => {
        return new Promise((resolve) => {
            request(`https://glosbe.com/gapi/tm?from=eng&dest=eng&format=json&phrase=${palavra}&pretty=true`, (err, res, body) => {
                if (err || res.statusCode == 404) return resolve([`não foi encontrado nenhum exemplo para a palavra: ${palavra}`]);
                const json = JSON.parse(body);
                return resolve(
                    json.examples.map(example => example.first)
                )
            })
        });
    }
}