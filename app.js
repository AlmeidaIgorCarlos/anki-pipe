const path = require('path')
const dataFile = require('./services/dataFile')
const webScraper = require('./services/webScraper')
const ankiConnect = require('./services/ankiConnect')
const log = require('./services/log')
const report = require('./services/report')

const Log = new log()
const WebScraper = new webScraper()

(async function main() {
    let reportData
    
    try {
        Log.start()

        const fileText = await dataFile.getFileText()
        Log.add('File loaded correctly')

        const sentenceList = dataFile.getSentences(fileText)
        const wordsList = await dataFile.getWords(sentenceList)
        const searchList = wordsList.map((word) => WebScraper.searchWord(word))
        const wordsInfo = await Promise.all(searchList)

        const ankiCards = []

        Log.add('---------------------------------------------')

        for(let i = 0; i<wordsInfo.length; i++){
            const pronunciation = WebScraper.getPronunciation(wordsInfo[i])
            const definition = WebScraper.getDefinition(wordsInfo[i])
            const example = WebScraper.getExample(wordsInfo[i])

            if (definition !== 'No definition found') {
                ankiCards.push({
                    sentence: sentenceList[i],
                    pronunciation: pronunciation,
                    definition: definition,
                    example: example
                })
                Log.add(`(+) sentence: [${sentenceList[i]}] - searched correctly`)
            } else
                Log.add(`(-) sentence: [${sentenceList[i]}] - couldn't be found`)
        }

        await ankiConnect.postAnkiCards(ankiCards)

        reportData = await report.generateReport()

    } catch (error) {
        Log.add(error)
    } finally {
        Log.add('---------------------------------------------')

        Log.add(`Quantity of cards: ${reportData.ankiSum}`)
        Log.add(`Days missing for the goal: ${reportData.daysMissing}`)
        Log.add(`Cards per day required: ${reportData.media}`)

        Log.add('---------------------------------------------')

        Log.finish()
        Log.save(path.resolve('files/log.txt'))

        Log.getLog().forEach(log => console.log(log))
    }
})()