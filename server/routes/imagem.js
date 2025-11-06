const ct = require('../controllers/imagem')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // Faz o upload do Logotipo na pasta
    server.post('/image/logo/upload', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().uploadLogo(req);
        res.send(result);
    });

    // Remove o Logotipo da pasta
    server.post('/image/logo/remove', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removeLogo(req);
        res.send(result);
    });

    // Faz o upload da Imagem do produto na pasta
    server.post('/image/produto/upload/:idproduto', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().uploadImagemProduto(req);
        res.send(result);
    });

    // Remove a Imagem do produto da pasta
    server.post('/image/produto/remove', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removeImagemProduto(req);
        res.send(result);
    });

}