const request = require('request')
const cheerio = require('cheerio')

module.exports = function webScraping(word){
    
    this.url = 'https://www.collinsdictionary.com/pt/dictionary/english'
    this.word = word

    this.searchWord = function(){
        return new Promise((resolve, reject) => {
            if(!this.word) reject('No acceptable word informed')
            request(`${this.url}/${word}`, (err, res, body)=>{
                if(err || res.statusCode != 200) reject('Problem with the dictionary connection')
                else{
                    const $ = cheerio.load(body)
                    resolve($)
                }
            })
        })
    }

    this.getPronunciation = function($, callback){
        const wordPronunciation = $('.pron').text()
        callback(wordPronunciation)
    }

    this.getDefinition = function($, callback){
        const wordDefinition = $('.hom>.sense>.def').text()
        callback(wordDefinition)
    }

    this.getExample = function($, callback){
        const wordExample = $('.hom>.sense>.type-example>.quote').text()
        callback(wordExample)
    }
}