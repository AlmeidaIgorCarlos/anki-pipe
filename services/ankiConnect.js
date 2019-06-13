const request = require('request')
const requisition = {
    url: 'http://127.0.0.1:8765',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Postman-Token': 'bb798423-2e03-4a1a-9463-f01ee6be8a06'
    },
    json: true
}

const deckName = 'English deck'

function setCards(cards) {
    const tempCards = [];

    cards.forEach((card) => {
        tempCards.push({
            deckName: deckName,
            modelName: "Basic",
            fields: {
                Front: card.sentence,
                Back: `${card.pronunciation}</br></br>${card.definition}</br></br><sub>${card.example}</sub>`
            },
            options: {
                allowDuplicate: true
            },
            tags: [
            ]
        });

    });
    return tempCards;
}

module.exports = {
    postAnkiCards: (cards) => new Promise((resolve, reject) => {
        request.post(Object.assign({},
            {
                body: {
                    action: "addNotes",
                    version: 6,
                    params: {
                        notes: setCards(cards)
                    }
                },
            },
            requisition), (err) => {
                if (err) reject(new Error('Error inputing data in Anki'))
                else resolve(true)
            })
    }),
    getAnkiCards: () => new Promise((resolve, reject) => {
        request.post(Object.assign({},
            {
                body: {
                    "action": "findCards",
                    "version": 6,
                    "params": {
                        "query": `deck:${deckName}`
                    }
                },
            }, requisition), (err, res, body) => {
                if (err || res.statusCode != 200) reject(new Error("Anki's connection failed"))
                else resolve(body)
            })
    })
}