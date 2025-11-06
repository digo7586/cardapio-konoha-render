const ct = require('../controllers/empresa')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // obtem as informações da empresa para listar no cardapio
    server.get('/empresa', async (req, res) => {
        const result = await ct.controllers().obterDados(req);
        res.send(result);
    });

    // retorna se a empresa está aberta ou não
    server.get('/empresa/open', async (req, res) => {
        const result = await ct.controllers().validarEmpresaAberta(req);
        res.send(result);
    });

    // obtem todas as informações da empresa para exibir na página "Sobre"
    server.get('/empresa/sobre', async (req, res) => {
        const result = await ct.controllers().obterDadosCompletos(req);
        res.send(result);
    });

    // salva as informações da empresa na página "Sobre"
    server.post('/empresa/sobre', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDadosSobre(req);
        res.send(result);
    });

    // salva as informações da empresa na página "Endereço"
    server.post('/empresa/endereco', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDadosEndereco(req);
        res.send(result);
    });

}