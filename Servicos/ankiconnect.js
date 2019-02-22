const configuracao = require('./../Arquivos/configuracao');
const request = require('request')

function montarCartoes(cartoes) {
    let cartoesTemp = [];

    cartoes.forEach((cartao) => {
        let backPronuncia = "";
        let backDefinicao = "DEFINITIONS <br/>";
        let backExemplo = "EXAMPLES <br/>";

        cartao.pronunciations.forEach((data, index) => {
            backPronuncia += `${data.phoneticSpelling} <br/>`
        });

        cartao.definitions.forEach((data, index) => {
            backDefinicao += `${index + 1} - ${data.definitions} <br/>`
        });

        cartao.examples.forEach((data, index) => {
            backExemplo += `${index + 1} - ${data.text}<br/>`
        });

        cartoesTemp.push({
            deckName: configuracao.AnkiConnect.deck,
            modelName: "Basic",
            fields: {
                Front: cartao.frase,
                Back: `${backPronuncia}</br></br>${backDefinicao}</br></br><sub>${backExemplo}</sub>`
            },
            options: {
                allowDuplicate: true
            },
            tags: [
            ]
        });

    });
    return cartoesTemp;
}

module.exports = {
    adicionar: (cartoes) => new Promise((resolve, reject) => {
        request.post({
            body: {
                action: "addNotes",
                version: 6,
                params: {
                    notes: montarCartoes(cartoes)
                }
            },
            url: configuracao.AnkiConnect.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Postman-Token': 'bb798423-2e03-4a1a-9463-f01ee6be8a06'
            },
            json: true
        }, (err, res, body) => {
            if (err) reject(false);
            else resolve(true)
        });
    }),
    consultarCards: () => new Promise((resolve, reject) => {
        let postBody = {
            "action": "findCards",
            "version": 6,
            "params": {
                "query": `deck:${configuracao.ankiConnect.deck}`
            }
        }
        request.post(configuracao.ankiConnect.path, (err, res, body) => {
            if (err) reject({ erro: new Error("não foi possivel consultar os cards") })
            const retorno = JSON.parse(body);
            resolve({ resultado: retorno.result })
        });
    })
}