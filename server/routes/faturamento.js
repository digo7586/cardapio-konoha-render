const ct = require('../controllers/faturamento')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // filtrar os faturamentos
    server.post('/faturamento/filtrar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().filtrarFaturamento(req);
        res.send(result);
    });

}