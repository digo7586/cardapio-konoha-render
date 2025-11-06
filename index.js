/* const { server, restify, config } = require('./server/server');

server.get('/*', restify.plugins.serveStatic({
    directory: './client',
    default: 'index.html'
}))

server.listen(config.port || 3000, () => {
    console.log(`AMBIENTE: ${config.ambiente} URL: ${config.url} PORTA: ${config.port}`)
}) */
    require('dotenv').config();

    const { server, restify, config } = require('./server/server');

// Porta dinâmica para hospedagem (Render, Railway, etc)
const PORT = process.env.PORT || config.port || 3000;

// Serve arquivos estáticos do client
server.get('/*', restify.plugins.serveStatic({
    directory: './client',
    default: 'index.html'
}));

// Inicia o servidor
server.listen(PORT, () => {
    console.log(`AMBIENTE: ${config.ambiente} URL: ${config.url} PORTA: ${PORT}`);
});
