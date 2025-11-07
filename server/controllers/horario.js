process.env.TZ = 'America/Sao_Paulo';

const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

const controllers = () => {

    const agora = new Date();
console.log('Hora atual do servidor:', agora.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));

    // obtem os horários de funcionamento da empresa
    const obterHorarios = async (req) => {
        try {
            // obtem a empresa logada
            let _empresaId = Acesso.retornaCodigoTokenAcesso('IdEmpresa', req.headers['authorization']);
            var ComandoSQL = await readCommandSql.retornaStringSql('obterHorarios', 'horario');
            let result = await db.Query(ComandoSQL, { idempresa: _empresaId, ignoreAtivo: 1 });

            return {
                status: 'success',
                data: result,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter os horários da empresa.'
            }
        }

    }

    // obtem os horários de funcionamento da empresa
    const salvarHorarios = async (req) => {

        try {

            // obtem a empresa logada
            let _empresaId = Acesso.retornaCodigoTokenAcesso('IdEmpresa', req.headers['authorization']);

            var ComandoSQLRemove = await readCommandSql.retornaStringSql('removerHorarios', 'horario');
            await db.Query(ComandoSQLRemove, { idempresa: _empresaId });

            var ComandoSQL = await readCommandSql.retornaStringSql('salvarHorario', 'horario');

            const sleep = m => new Promise(r => setTimeout(r, m));

            // percorre os elementos e salva
            await Promise.all(
                req.body.map(async (element) => {
                    console.log('salvar: ', element)
                    element.idempresa = _empresaId;
                    await db.Query(ComandoSQL, element);
                    await sleep(500);
                })
            )            

            return {
                status: 'success',
                message: 'Horários atualizados com sucesso!',
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao atualizar os horários da empresa.'
            }
        }

    }

    return Object.create({
        obterHorarios
        , salvarHorarios
    })

}

module.exports = Object.assign({ controllers })