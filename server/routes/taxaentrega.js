const ct = require('../controllers/taxaentrega')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // obtem os tipos de taxas de entrega
    server.get('/taxaentregatipo', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().obterTaxaEntregaTipo(req);
        res.send(result);
    });

    // ativa o tipo de taxa de entrega
    server.post('/taxaentregatipo/ativar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().ativarTaxaEntregaTipo(req);
        res.send(result);
    });

    // obtem a taxa unica
    server.get('/taxaentregatipo/taxaunica', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().obterTaxaUnica(req);
        res.send(result);
    });

    // obtem a lista de taxas por distancia
    server.get('/taxaentregatipo/taxadistancia', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().obterTaxaDistancia(req);
        res.send(result);
    });

    // salva as configurações da taxa unica
    server.post('/taxaentregatipo/taxaunica', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarTaxaUnica(req);
        res.send(result);
    });

    // adiciona a configuração da taxa por distancia
    server.post('/taxaentregatipo/taxadistancia', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarTaxaDistancia(req);
        res.send(result);
    });

    // ativa ou desativa uma taxa por distancia
    server.post('/taxaentregatipo/taxadistancia/ativar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().ativarTaxaDistancia(req);
        res.send(result);
    });

    // remove uma taxa por distancia
    server.post('/taxaentregatipo/taxadistancia/remover', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removerTaxaDistancia(req);
        res.send(result);
    });

}