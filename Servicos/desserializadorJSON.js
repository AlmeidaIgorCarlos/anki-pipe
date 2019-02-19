const fs = require('fs');

function retornarCaminho(){
    var path = '.\\..\\Arquivos\\configuracao.json';
    return path;
}

exports.recuperarArquivoConfiguracao = function(){
    var arquivo = fs.readFileSync(__dirname+retornarCaminho());
    var conteudoArquivo = JSON.parse(arquivo);

    return conteudoArquivo;
}