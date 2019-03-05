const assert = require('mocha')
const webScraper = require('./../services/webScraper')

describe('webScraper', ()=>{
    let body
    const webScraperTest = new webScraper('run')
    
    webScraperTest.searchWord(webScraperTest).then(($)=>{
        body = $
    })
})