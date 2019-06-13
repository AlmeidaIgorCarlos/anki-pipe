const path = require('path')
const fs = require('fs');
const RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;

module.exports = {
    getFileText: () => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve('files/list.txt'), { encoding: "UTF-8" }, (err, data) => {
                if (err) reject(new Error(`Error at file reading - ${err}`))
                else resolve(data)
            })
        })

    },

    getSentences: (fileText) => fileText.split('\n'),
    
    getWords: (sentences) => new Promise((resolve, reject)=>{
        try {
            const words = []
            sentences.forEach(element => {
            const word = RegExp.exec(element)
                if(word) words.push(word[0])
                else words.push('No word was found')
            })
            resolve(words)
        } catch (error) {
            reject(error)
        }
    })
}