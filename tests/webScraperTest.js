const assert = require('chai').assert
const webScraper = require('./../services/webScraper')

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