const ct = require('../controllers/categoria')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // obtem as categorias em ordem para listar no cardapio
    server.get('/categoria', async (req, res) => {
        const result = await ct.controllers().listarTodas(req);
        res.send(result);
    });

    // salva as informações da categoria na página "Cardápio"
    server.post('/categoria', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDados(req);
        res.send(result);
    });

    // salva a nova ordem das categorias
    server.post('/categoria/ordenar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().ordenarCategorias(req);
        res.send(result);
    });

    // duplica a categoria
    server.post('/categoria/duplicar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().duplicarCategoria(req);
        res.send(result);
    });

    // remover a categoria
    server.post('/categoria/remover', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removerCategoria(req);
        res.send(result);
    });

}