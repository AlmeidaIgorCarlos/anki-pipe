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

exports.adicionar = (cards) => {
    request(options, (error, res, body) => {

    })
}
