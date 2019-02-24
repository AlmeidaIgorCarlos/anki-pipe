const request = require("request");

module.exports = {
  consultarDefinicao: palavra => {
    return new Promise(resolve => {
      request(
        `https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=${palavra}&pretty=true`,
        (err, res, body) => {
          if (err || res.statusCode !== 200) {
            resolve([
              `não foi encontrado nenhuma definicao para a palavra: ${palavra}`
            ]);
          } else if (res.statusCode === 200) {
            const json = JSON.parse(body);
            resolve(
              json.tuc.length > 0
                ? json.tuc[0].meanings.map(meaning => meaning.text)
                : [
                    `não foi encontrado nenhuma definicao para a palavra: ${palavra}`
                  ]
            );
          }
        }
      );
    });
  },
  consultarExemplo: palavra => {
    return new Promise(resolve => {
      request(
        `https://glosbe.com/gapi/tm?from=eng&dest=eng&format=json&phrase=${palavra}&pretty=true`,
        (err, res, body) => {
          if (err || res.statusCode !== 200)
            resolve([
              `não foi encontrado nenhum exemplo para a palavra: ${palavra}`
            ]);
          else if (res.statusCode === 200) {
            const json = JSON.parse(body);
            resolve(
              json.examples.length > 0
                ? json.examples.map(example => example.first)
                : [
                    `não foi encontrado nenhuma definicao para a palavra: ${palavra}`
                  ]
            );
          }
        }
      );
    });
  }
};
