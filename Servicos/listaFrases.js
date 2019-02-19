const fs = require('fs');

exports.retornarFrases = function(path){
    var lista = fs.readFileSync(path, {encoding:"UTF-8"}).split('\n');
    return lista;
}