const path = require('path')
const fs = require('fs');
const RegExp = /(?<=(!))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–/\/®°⁰!?{}|`~]| )+?(?=(!))/;

module.exports = {
    getFileText: (callback)=>{
        return new Promise((resolve, reject)=>{
            fs.readFile(path.resolve('Arquivos/lista.txt'), {encoding:"UTF-8"}, (err, data)=>{
                if(err) reject(`Error at file reading - ${err}`)
                else resolve(callback(data))
            })
        })
        
    },
    getSentences:(fileText, callback)=>{
        const sentences = fileText.split('\n')
        callback(sentences)
    },
    getWords:(sentences, callback)=>{
        const words = []
        sentences.forEach(element => {
            words.push(RegExp.exec(element))
        });
        callback(words)
    }
}