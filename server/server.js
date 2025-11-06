require('dotenv').config();

global.config = require('./config').get('dev');

const restify = require("restify");
const recursiveReaddir = require('recursive-readdir');
const path = require('path');

// Inicia o servidor
const server = restify.createServer({
    name: 'Delivery',
    version: '1.0.0'
});

// Adiciona as extensões do restify para o funcionamento do JSON nas requisições
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.urlEncodedBodyParser())

// Adiciona todas as Rotas dentro da inicialização do server (para escutar todas as rotas)
const pathFiles = path.resolve(path.resolve('./').concat('/server/routes'));

recursiveReaddir(pathFiles, ['!*.js'], (err, files) => {
    if (err) { console.log(err); process.exit(1) }
    files.forEach(element => { require(element)(server) })
});

// Utilizado para nçao dar problema com requisições no Chrome (Cors)
server.use(
    function nocache(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Pragma', 'no-cache');
        next();
    }
);

// Cria a rota pública dentro do server para as imagens do cardapio
server.get('/public/images/*', restify.plugins.serveStatic({
    directory: __dirname,
}))

// Modifica o array de erro (página não encontrada)
server.on('restifyError', function(req, res, err, callback) {
    err.toJSON = function customToJSON() {
        return {
            Erro: 'Página não encontrada :/'
        };
    };
    return callback();
});

module.exports = Object.assign({ server, restify, config })

