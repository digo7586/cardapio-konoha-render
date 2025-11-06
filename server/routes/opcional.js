const ct = require('../controllers/opcional')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // obtem os opcionais do produto
    server.get('/opcional/produto/:idproduto', async (req, res) => {
        const result = await ct.controllers().obterOpcionaisProduto(req);
        res.send(result);
    });

    // salva o opcional do produto
    server.post('/opcional/produto', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarOpcionaisProduto(req);
        res.send(result);
    });


    // remove o opcional item
    server.post('/opcional/item/remover', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removerOpcionalItem(req);
        res.send(result);
    });

}