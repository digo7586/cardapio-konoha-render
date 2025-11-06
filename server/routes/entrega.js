const ct = require('../controllers/entrega')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // obtem as informações dos tipos de entrega
    server.get('/entrega/tipo', async (req, res) => {
        const result = await ct.controllers().obterTiposEntrega(req);
        res.send(result);
    });

    // salva o tempo do tipo da entrega
    server.post('/entrega/tipo', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarTempoTipoEntrega(req);
        res.send(result);
    });

    // obtem as informações dos tipos de entrega
    server.post('/entrega/tipo/ativar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().ativarTipoEntrega(req);
        res.send(result);
    });

    // obtem a taxa de entrega ativa
    server.get('/entrega/taxa', async (req, res) => {
        const result = await ct.controllers().obterTaxaEntregaAtiva(req);
        res.send(result);
    });


}