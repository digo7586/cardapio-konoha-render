const ct = require('../controllers/formapagamento')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // obtem as formas de pagamento ativas
    server.get('/formapagamento', async (req, res) => {
        const result = await ct.controllers().obterFormasPagamentoAtivas(req);
        res.send(result);
    });

    // obtem as formas de pagamento ativas
    server.get('/formapagamento/painel', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().obterTodasFormasPagamento(req);
        res.send(result);
    });

    // obtem as informações dos tipos de entrega
    server.post('/formapagamento/ativar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().ativarFormaPagamento(req);
        res.send(result);
    });

}