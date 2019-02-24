const request = require('request');
const configuracao = require('./../../Arquivos/configuracao');

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
    consultarPronuncia: function (palavra) {
        options.url = configuracao.OxfordAuthentication.app_url + configuracao.OxfordAuthentication.entries_path + palavra;

        return new Promise((resolve) => {
            request(options, (err, res, body) => {
                if (err || res.statusCode == 404) return resolve(['Nenhuma pronúncia encontrada']);
                let json = JSON.parse(body);

                return resolve(
                    json.results[0].lexicalEntries.map(lexicalEntry => lexicalEntry.pronunciations[0].phoneticSpelling)
                )
            });
        });
    }
}