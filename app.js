const dataFile = require('./services/dataFile')
const webScraper = require('./services/webScraper')
const ankiConnect = require('./services/ankiConnect')
const log = require('./services/log')

const Log = new log()
const WebScraper = new webScraper()

async function main() {
    try {
        Log.start()

        const fileText = await dataFile.getFileText()
        Log.add('File loaded correctly')

        const searchPromises = []
        let sentenceList = []

        dataFile.getSentences(fileText, (sentences) => {
            sentenceList = sentences            
            dataFile.getWords(sentences, (words) => {
                words.forEach((word) => {
                    searchPromises.push(WebScraper.searchWord(word[0]))
                    Log.add(`Word ${word} searched correctly`)
                })
            })
        })

        const wordsInfo = await Promise.all(searchPromises)
        const cards = []
        let counter = 0

        wordsInfo.forEach((info) => {
            WebScraper.getPronunciation(info, (pronun) => {
                WebScraper.getDefinition(info, (definit) => {
                    WebScraper.getExample(info, (examp) => {
                        cards.push({
                            sentence: sentenceList[counter],
                            pronunciation: pronun,
                            definition: definit,
                            example: examp
                        })
                    })
                })
            })
            counter++
        })

        ankiConnect.postAnkiCards(cards)

        console.log

    } catch (error) {
        if (error.includes('Error at file reading')) {
            log.add(error)
            log.finish()
            log.save()
        }
    }
}

main()