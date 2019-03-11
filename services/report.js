const ankiConnect = require('./ankiConnect')

module.exports = {
    generateReport: () => {
        return new Promise(async (resolve) => {
            const ankiCards = await ankiConnect.getAnkiCards()
            const ankiMissing = 4000 - ankiCards.result.length

            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 0);
            const diff = now - start;
            const oneDay = 1000 * 60 * 60 * 24;
            const day = Math.floor(diff / oneDay);

            resolve({
                ankiSum: ankiCards.result.length,
                daysMissing: 365 - day,
                media: parseFloat(((ankiMissing / (365 - day)).toFixed(2)))
            })
        })
    }
}