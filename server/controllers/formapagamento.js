const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();

const controllers = () => {

    // obtem as formas de pagamento ativas
    const obterFormasPagamentoAtivas = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('obterFormasPagamentoAtivas', 'formapagamento');
            var result = await db.Query(ComandoSQL);

            return {
                status: 'success',
                data: result,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter as formas de pagamento.'
            }
        }

    }

    // obtem todas as formas de pagamento
    const obterTodasFormasPagamento = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('obterTodasFormasPagamento', 'formapagamento');
            var result = await db.Query(ComandoSQL);

            return {
                status: 'success',
                data: result,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter as formas de pagamento.'
            }
        }

    }

    // Ativa ou desativa
    const ativarFormaPagamento = async (req) => {

        try {

            let idformapagamento = req.body.forma;
            let ativo = req.body.ativar;

            var ComandoSQL = await readCommandSql.retornaStringSql('ativarFormaPagamento', 'formapagamento');
            var result = await db.Query(ComandoSQL, { idformapagamento: idformapagamento, ativo: ativo });

            return {
                status: 'success',
                message: 'Forma de pagamento atualizada.',
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao atualizar forma de pagamento.'
            }
        }

    }

    return Object.create({
        obterFormasPagamentoAtivas
        , obterTodasFormasPagamento
        , ativarFormaPagamento
    })

}

module.exports = Object.assign({ controllers })