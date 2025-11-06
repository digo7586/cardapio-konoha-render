const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

const controllers = () => {

    // Obtem as taxas de entrega
    const obterTaxaEntregaTipo = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('obterTaxaEntregaTipo', 'taxaentrega');
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

    // Obtem as taxas de entrega
    const ativarTaxaEntregaTipo = async (req) => {

        try {

            var ComandoSQLTaxaUnica = await readCommandSql.retornaStringSql('ativarTaxaEntregaTipo', 'taxaentrega');
            await db.Query(ComandoSQLTaxaUnica, { idtaxaentregatipo: 1, ativo: req.body.taxaunica });

            var ComandoSQLTaxaDistancia = await readCommandSql.retornaStringSql('ativarTaxaEntregaTipo', 'taxaentrega');
            await db.Query(ComandoSQLTaxaDistancia, { idtaxaentregatipo: 2, ativo: req.body.taxadistancia });

            var ComandoSQLSemTaxa = await readCommandSql.retornaStringSql('ativarTaxaEntregaTipo', 'taxaentrega');
            await db.Query(ComandoSQLSemTaxa, { idtaxaentregatipo: 3, ativo: req.body.semtaxa });

            // se for taxa única, retona a configuração atual
            if (req.body.taxaunica === 1) {
                return {
                    status: 'success',
                    message: "Taxa selecionada com sucesso.",
                }
            }


            return {
                status: 'success',
                message: "Taxa selecionada com sucesso.",
            }


        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao selecionar a taxa.'
            }
        }

    }

    // Obtem a taxa única
    const obterTaxaUnica = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('obterTaxaUnica', 'taxaentrega');
            var result = await db.Query(ComandoSQL);

            return {
                status: 'success',
                data: result
            }


        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter taxa.'
            }
        }

    }

    // Obtem as taxas por distancia
    const obterTaxaDistancia = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('obterTaxaDistancia', 'taxaentrega');
            var result = await db.Query(ComandoSQL);

            return {
                status: 'success',
                data: result
            }


        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter taxa.'
            }
        }

    }

    // Salva as configurações da taxa única
    const salvarTaxaUnica = async (req) => {

        try {

            // primeiro, valida se já exite uma taxa única salva.
            const idtaxaentrega = req.body.idtaxaentrega;

            // já existe
            if (idtaxaentrega != null && idtaxaentrega > 0) {

                // se já existe, desativa a taxa atual (caso os dados forem diferentes)
                var ComandoSQLSelect = await readCommandSql.retornaStringSql('obterTaxaUnicaPorId', 'taxaentrega');
                var taxaExistente = await db.Query(ComandoSQLSelect, { idtaxaentrega: idtaxaentrega });

                console.log('taxaExistente', taxaExistente[0]);
                console.log('req.body', req.body);

                if (taxaExistente.length > 0) {

                    // valida se teve alguma alteração
                    if (taxaExistente[0].valor != req.body.valor || 
                        taxaExistente[0].tempominimo != req.body.tempominimo ||
                        taxaExistente[0].tempomaximo != req.body.tempomaximo) {

                        // desativa a taxa atual
                        var ComandoSQLRemove = await readCommandSql.retornaStringSql('desativarTaxaUnicaPorId', 'taxaentrega');
                        await db.Query(ComandoSQLRemove, { idtaxaentrega: idtaxaentrega });
                    }
                    else {

                        // Não faz nada, só devolve a msg de sucesso
                        return {
                            status: 'success',
                            message: 'Taxa cadastrada com sucesso!'
                        }

                    }


                }

            }

            // cria um novo registro no banco
            var ComandoSQL = await readCommandSql.retornaStringSql('salvarTaxaUnica', 'taxaentrega');
            await db.Query(ComandoSQL, {
                idtaxaentregatipo: 1,
                valor: req.body.valor,
                tempominimo: req.body.tempominimo,
                tempomaximo: req.body.tempomaximo
            });

            return {
                status: 'success',
                message: 'Taxa cadastrada com sucesso!'
            }


        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao salvar taxa.'
            }
        }

    }

    // Adiciona uma taxa por distancia
    const salvarTaxaDistancia = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('adicionarTaxaDistancia', 'taxaentrega');
            await db.Query(ComandoSQL, req.body);

            return {
                status: 'success',
                message: 'Taxa adicionada com sucesso!'
            }


        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao adicionar taxa.'
            }
        }

    }

    // Ativa ou desativa uma taxa por distancia
    const ativarTaxaDistancia = async (req) => {

        try {

            let idtaxaentrega = req.body.idtaxaentrega;
            let ativo = req.body.ativar;

            var ComandoSQL = await readCommandSql.retornaStringSql('ativarTaxaDistancia', 'taxaentrega');
            await db.Query(ComandoSQL, { idtaxaentrega: idtaxaentrega, ativo: ativo });

            return {
                status: 'success',
                message: 'Taxa atualizada.',
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao atualizar taxa.'
            }
        }

    }

    // Remove uma taxa por distancia
    const removerTaxaDistancia = async (req) => {

        try {

            let idtaxaentrega = req.body.idtaxaentrega;

            var ComandoSQL = await readCommandSql.retornaStringSql('removerTaxaDistancia', 'taxaentrega');
            await db.Query(ComandoSQL, { idtaxaentrega: idtaxaentrega });

            return {
                status: 'success',
                message: 'Taxa removida.',
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao remover taxa.'
            }
        }

    }

    return Object.create({
        obterTaxaEntregaTipo
        , ativarTaxaEntregaTipo
        , obterTaxaUnica
        , obterTaxaDistancia
        , salvarTaxaUnica
        , salvarTaxaDistancia
        , ativarTaxaDistancia
        , removerTaxaDistancia
    })

}

module.exports = Object.assign({ controllers })