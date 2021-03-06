const request = require('request')
const cheerio = require('cheerio')

module.exports = function webScraping(){
    
    this.url = 'https://www.collinsdictionary.com/pt/dictionary/english'

    this.searchWord = function(word){
        return new Promise((resolve, reject) => {
            if(word == false) reject('No acceptable word informed')
            request(`${this.url}/${word}`, (err, res, body)=>{
                if(err || res.statusCode != 200) reject(new Error('Problem with the dictionary connection'))
                else{
                    const $ = cheerio.load(body)
                    resolve($)
                }
            })
        })
    }

    this.getPronunciation = ($) => $('.pron').text() || 'No pronunciation found'  

    this.getDefinition = ($) => {
        const wordDefinition = $('.hom>.sense>.def').text() || 'No definition found'
        const result = wordDefinition.split('.').reduce((total, item)=>total+`${item} <br>`)
        return result
    }

    this.getExample = ($) => {
        const wordExample = $('.hom>.sense>.type-example>.quote').text() || 'No example found'
        const result = wordExample.split('.').reduce((total, item)=>total+`${item} <br>`) 
        return result
    }
}