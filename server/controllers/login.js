const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

const crypto = require('crypto');

const controllers = () => {

    const login = async (req) => {

        var password = req.body.senha;

        var ComandoSQL = await readCommandSql.retornaStringSql('login', 'login');
        var usuarioBanco = await db.Query(ComandoSQL, req.body);

        console.log('usuarioBanco', usuarioBanco)

        // Se existir o usuário no banco
        if (usuarioBanco != undefined && usuarioBanco.length > 0) {

            // valida se as senhas são diferentes
            var hashSenha = crypto.createHmac('sha256', password).digest('hex');

            console.log('hashSenha', hashSenha);
            console.log('usuarioBanco[0].Senha', usuarioBanco[0].senha)

            if (hashSenha.toLowerCase() != usuarioBanco[0].senha.toLowerCase()) {
                return {
                    status: 'error',
                    message: "Usuário ou senha incorretos"
                };
            }

            console.log('usuario banco', usuarioBanco[0])

            // se estiver tudo ok, gera o token e retorna o json
            var tokenAcesso = Acesso.gerarTokenAcesso(usuarioBanco[0]);

            return {
                status: 'success',
                TokenAcesso: tokenAcesso,
                Nome: usuarioBanco[0].nome,
                Email: usuarioBanco[0].email,
                Logo: usuarioBanco[0].logotipo
            };

        }
        else {
            return {
                status: 'error',
                message: "Usuário ou senha incorretos" // "Usuário não cadastrado no sistema"
            };
        }
    };

    return Object.create({
        login
    })

}

module.exports = Object.assign({ controllers })