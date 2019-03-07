const assert = require('chai').assert
const webScraper = require('./../services/webScraper')

describe('webScraper', async()=>{
    const webScraperTest = new webScraper('run')
    let body

    it('test1', async()=>{
        body = await webScraperTest.searchWord()
        assert(body !== null)
    }).timeout(0)
})