const path = require('path')
const dataFile = require('./services/dataFile')
const webScraper = require('./services/webScraper')
const ankiConnect = require('./services/ankiConnect')
const log = require('./services/log')
const report = require('./services/report')

const Log = new log()
const WebScraper = new webScraper()

let reportData
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
                        if (definit !== 'No definition found') {
                            cards.push({
                                sentence: sentenceList[counter],
                                pronunciation: pronun,
                                definition: definit,
                                example: examp
                            })
                            Log.add(`sentence: ${sentenceList[counter]} searched correctly`)
                        } else
                            Log.add(`sentence: ${sentenceList[counter]} couldn't be found`)
                    })
                })
            })
            counter++
        })

        ankiConnect.postAnkiCards(cards)

        reportData = await report.generateReport()

    } catch (error) {
        log.add(error)
    } finally {
        Log.add(`Quantity of cards: ${reportData.ankiSum}`)
        Log.add(`Days missing for the goal: ${reportData.daysMissing}`)
        Log.add(`Cards per day required: ${reportData.media}`)

        Log.finish()
        Log.save(path.resolve('files/log.txt'))

        Log.getLog().forEach(log => console.log(log))
    }
}

main()