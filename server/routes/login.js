const ct = require('../controllers/login')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    server.post('/login', async (req, res) => {
        const result = await ct.controllers().login(req)
        res.send(result);
    });

    server.get('/check', Acesso.verificaTokenAcesso, async (req, res) => {
        res.send(true);
    });

}