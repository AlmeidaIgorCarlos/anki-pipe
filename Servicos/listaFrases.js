const fs = require('fs');

module.exports = {
    retornarFrases: (path)=>{
        return fs.readFileSync(path, {encoding:"UTF-8"}).split('\n');   
    }
}