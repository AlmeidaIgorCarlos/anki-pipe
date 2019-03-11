const fs = require('fs')

module.exports = function () {
    _logList = []

    this.getLog = () => {
        return _logList
    }

    this.start = () => {
        _logList.push(`Beginning of the execution: [${(new Date).toLocaleTimeString()}] \r`)
    }

    this.add = (logRow) => {
        if (_logList.length === 0) throw new Error("It's not possible to add a log in a non-initialized log")
        else _logList.push(`${logRow} \n\r`)
    }

    this.finish = () => {
        if (_logList.length > 0) _logList.push(`Execution finish: [${(new Date).toLocaleTimeString()}] \r`)
        else throw new Error("It's not possible to finish a log that wasn't even initialized")
    }

    this.save = (directory) => {
        return new Promise((resolve, reject) => {
            if (_logList.length === 0 || _logList[0].includes('Beginning of the execution') == false)
                reject(new Error("It's not possible to save a non-intialized log"))
            else if (_logList[_logList.length - 1].includes('Execution finish') == false)
                reject(new Error("It's not possible to save a non-finished log"))
            else if (directory == false || directory === undefined)
                reject(new Error("It's not possible to save a log without any directory"))
            else {
                fs.writeFile(directory, _logList, (err) => {
                    if (err) reject(new Error(`Occured a error during the file saving - [${err}]`))
                    else resolve('File saved correctly')
                })
            }
        })
    }
}