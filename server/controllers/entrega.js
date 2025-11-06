const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

const controllers = () => {

    // Obtem os dados da empresa
    const obterTiposEntrega = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('obterTiposEntrega', 'entrega');
            var result = await db.Query(ComandoSQL);

            return {
                status: 'success',
                data: result,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter os tipos de entrega.'
            }
        }

    }

    // Ativa ou desativa
    const ativarTipoEntrega = async (req) => {

        try {

            let idtipoentrega = req.body.tipo;
            let ativo = req.body.ativar;

            var ComandoSQL = await readCommandSql.retornaStringSql('ativarTipoEntrega', 'entrega');
            var result = await db.Query(ComandoSQL, { idtipoentrega: idtipoentrega, ativo: ativo });

            return {
                status: 'success',
                message: 'Opção atualizada.',
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao atualizar opção.'
            }
        }

    }

    // Salva o tempo do tipo da entrega
    const salvarTempoTipoEntrega = async (req) => {

        try {

            console.log('req.body', req.body)

            var ComandoSQL = await readCommandSql.retornaStringSql('salvarTempoTipoEntrega', 'entrega');
            var result = await db.Query(ComandoSQL, req.body);

            return {
                status: 'success',
                message: 'Tempo atualizado.',
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao atualizar o tempo.'
            }
        }

    }

    // Obtem a taxa de entrega ativa
    const obterTaxaEntregaAtiva = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('obterTaxaEntregaAtiva', 'entrega');
            var result = await db.Query(ComandoSQL);

            return {
                status: 'success',
                data: result,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter taxa de entrega.'
            }
        }

    }


    return Object.create({
        obterTiposEntrega
        , ativarTipoEntrega
        , salvarTempoTipoEntrega
        , obterTaxaEntregaAtiva
    })

}

module.exports = Object.assign({ controllers })