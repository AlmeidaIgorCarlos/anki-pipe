const assert = require('chai').assert

const webScraper = require('./../services/webScraper')
const Log = require('./../services/log')

describe('webScraper', () => {
    const webScraperTest = new webScraper('run')

    it("Testing dictionary's web-site ", async () => {
        const $ = await webScraperTest.searchWord()
        assert($ !== false)
    }).timeout(0)

    it("Testing the word's pronunciations", async () => {
        const $ = await webScraperTest.searchWord()
        let pronunciation
        webScraperTest.getPronunciation($, (element) => {
            pronunciation = element
        })

        assert(pronunciation !== false)
    }).timeout(0)

    it("Testing the word's definition", async () => {
        const $ = await webScraperTest.searchWord()
        let definition
        webScraperTest.getPronunciation($, (element) => {
            definition = element
        })

        assert(definition !== false)
    }).timeout(0)

    it("Testing the word's pronunciations", async () => {
        const $ = await webScraperTest.searchWord()
        let example
        webScraperTest.getPronunciation($, (element) => {
            example = element
        })

        assert(example !== false)
    }).timeout(0)

    const webScraperNullTest = new webScraper

    it('Testing the filter for non-nullable words', async () => {
        try {
            const $ = await webScraperNullTest.searchWord()
        } catch (error) {
            assert(error === 'No acceptable word informed')
        }

    }).timeout(0)

    const webScraperNonExistentTest = new webScraper('asdfe')

    it("Testing the word's pronunciations", async () => {
        try {
            const $ = await webScraperNonExistentTest.searchWord()
            let pronunciation
            webScraperTest.getPronunciation($, (element) => {
                pronunciation = element
                assert(pronunciation !== false)
            })
        } catch (error) {
            assert(error.message === 'No pronunciation found')
        }

    }).timeout(0)

    it("Testing the word's definition", async () => {
        try {
            const $ = await webScraperNonExistentTest.searchWord()
            let definition
            webScraperTest.getDefinition($, (element) => {
                definition = element
            })
            assert(definition !== false)
        } catch (error) {
            assert(error.message === 'No definition found')
        }
    }).timeout(0)

    it("Testing the word's pronunciations", async () => {
        try {
            const $ = await webScraperNonExistentTest.searchWord()
            let example
            webScraperTest.getExample($, (element) => {
                example = element
            })

            assert(example !== false)
        } catch (error) {
            assert(error.message === 'No example found')
        }
    }).timeout(0)

})

describe("Log's Test", () => {

    it("beginning log", () => {
        const log = new Log

        log.start()
        const logRows = log.getLog()

        assert(logRows.length == 1)
    })

    it("Add log with no start", () => {
        const log = new Log

        try {
            log.add("Word ETC was added correctly")
        } catch (error) {
            assert(error.message === "It's not possible to add a log in a non-initialized log")
        }
    })

    it("Add log with start", () => {
        const log = new Log

        log.start()
        log.add("Word ETC was added correctly")

        const logRows = log.getLog()
        assert(logRows.length === 2)
    })

    it("Finishing a log non-initialized", () => {
        try {
            const log = new Log

            log.start()
            log.finish()
        } catch (error) {
            assert(error.message === "It's not possible to finish a log that wasn't even initialized")
        }

    })

    it("Finish log", () => {
        const log = new Log

        log.start()
        log.add("Word ETC was added correctly")
        log.finish()

        const logRows = log.getLog()
        assert(logRows.length === 3)
    })

    it("Save log with no finish", async () => {
        try {
            const log = new Log

            log.start()
            log.add("Word ETC was added correctly")
            log.finish()
            await log.save('no empty == true')

        } catch (error) {
            assert(error.includes("It's not possible to save a non-finished log"))
        }
    })

    it("Save log with no start", async () => {
        try {
            const log = new Log

            log.start()
            log.add("Word ETC was added correctly")
            log.finish()
            await log.save('no empty == true')

        } catch (error) {
            assert(error.includes("It's not possible to save a non-intialized log"))
        }
    })

    it("Save log with no directory", async () => {
        try {
            const log = new Log

            log.start()
            log.add("Word ETC was added correctly")
            log.finish()
            await log.save()

        } catch (error) {
            assert(error.includes("It's not possible to save a log without any directory"))
        }
    })


})