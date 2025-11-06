var jwt = require('jsonwebtoken');
var SchemaObject = require('node-schema-object');

var UsuarioTokenAcesso = new SchemaObject({ tokenAcesso: String },
    {
        methods: {

            gerarTokenAcesso(dados) {
                try {
                    return jwt.sign({ 'Email': dados.email, 'IdEmpresa': dados.idempresa, 'Nome': dados.nome }, 'Token', { expiresIn: "1d" });
                } catch (error) {
                    console.log(error)
                    throw error
                }
            },

            verificaTokenAcesso(req, res, next) {
                var headerTokenAcesso = req.headers['authorization'];
                if (typeof headerTokenAcesso != 'undefined') {
                    try {
                        var decoded = jwt.verify(headerTokenAcesso, 'Token');
                        next();
                    } catch (err) {
                        res.send(401);
                    }
                } else {
                    res.send(401);
                }
            },

            retornaCodigoTokenAcesso(valor, req) {
                var headerTokenAcesso = req;
                var decoded = jwt.decode(headerTokenAcesso, { complete: true });

                console.log(decoded.payload);

                if (valor === "IdEmpresa") {
                    return decoded.payload.IdEmpresa;
                }
            }

        }
    }
);

module.exports = UsuarioTokenAcesso;