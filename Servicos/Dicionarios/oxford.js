const request = require("request");
const configuracao = require("./../../Arquivos/configuracao");

const baseURL =
  configuracao.OxfordAuthentication.app_url +
  configuracao.OxfordAuthentication.entries_path;

const options = {
  url: baseURL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    app_key: configuracao.OxfordAuthentication.app_key,
    app_id: configuracao.OxfordAuthentication.app_id
  }
};

module.exports = {
  consultarPronuncia: function(palavra) {
    options.url = baseURL + palavra;

    return new Promise(resolve => {
      request(options, (err, res, body) => {
        if (err || res.statusCode !== 200) {
          resolve(["Nenhuma pronúncia encontrada"]);
        }
        if (res.statusCode === 200) {
          let json = JSON.parse(body);

          resolve(
            json.results[0].lexicalEntries.map(
              lexicalEntry => lexicalEntry.pronunciations[0].phoneticSpelling
            )
          );
        }
      });
    });
  }
};
