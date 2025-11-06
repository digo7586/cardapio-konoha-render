const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();

const controllers = () => {

    // Lista todos os opcionais do produto
    const obterOpcionaisProduto = async (req) => {

        try {

            let idproduto = req.params.idproduto;

            var ComandoSQL = await readCommandSql.retornaStringSql('obterPorProdutoId', 'opcional');
            var result = await db.Query(ComandoSQL, { idproduto: idproduto });

            return {
                status: 'success',
                data: result,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter as categorias.'
            }
        }

    }

    // Salva os dados da categoria
    const salvarOpcionaisProduto = async (req) => {


        try {

            // valida se é um opcional simples
            if (req.body.simples) {

                // OPCIONAL SIMPLES

                // valida se o opcional simples já existe no produto
                var ComandoSQLSelect = await readCommandSql.retornaStringSql('obterProdutoOpcionalPorOpcional', 'opcional');
                var result = await db.Query(ComandoSQLSelect, { idproduto: req.body.idproduto });

                if (result == undefined || result.length == 0) {

                    // Não existe um opcional simples no produto

                    // novo opcional simples do produto, adiciona no banco
                    var ComandoSQLAddOpcional = await readCommandSql.retornaStringSql('adicionarNovoOpcional', 'opcional');
                    var novoOpcional = await db.Query(ComandoSQLAddOpcional, {
                        nome: 'Opcionais',
                        tiposimples: 1,
                        minimo: 0,
                        maximo: 0
                    });

                    if (novoOpcional.insertId != undefined && novoOpcional.insertId > 0) {

                        // seta o novo id
                        req.body.idopcional = novoOpcional.insertId;

                        // adiciona o opcional item
                        var ComandoSQLAddItem = await readCommandSql.retornaStringSql('adicionarOpcionalItem', 'opcional');
                        await db.Query(ComandoSQLAddItem, req.body);

                        // adiciona o opcional no produto
                        var ComandoSQLAddOpcionalProduto = await readCommandSql.retornaStringSql('adicionarOpcionalProduto', 'opcional');
                        await db.Query(ComandoSQLAddOpcionalProduto, { idproduto: req.body.idproduto, idopcional: novoOpcional.insertId });


                        return {
                            status: 'success',
                            message: "Opcional adicionado com sucesso.",
                        }

                    }
                    else {
                        return {
                            status: 'error',
                            message: 'Falha ao adicionar opcional.'
                        }
                    }

                }
                else {

                    // seta o idopcional obtido do banco
                    req.body.idopcional = result[0].idopcional;

                    // adiciona o opcional item
                    var ComandoSQLAddItem = await readCommandSql.retornaStringSql('adicionarOpcionalItem', 'opcional');
                    await db.Query(ComandoSQLAddItem, req.body);

                    return {
                        status: 'success',
                        message: "Opcional adicionado com sucesso.",
                    }

                }

            }
            else {

                // SELEÇÃO DE OPÇÕES

                // adiciona o novo opcional
                var ComandoSQLAddOpcional = await readCommandSql.retornaStringSql('adicionarNovoOpcional', 'opcional');
                var novoOpcional = await db.Query(ComandoSQLAddOpcional, {
                    nome: req.body.titulo,
                    tiposimples: 0,
                    minimo: req.body.minimoOpcao,
                    maximo: req.body.maximoOpcao
                });

                if (novoOpcional.insertId != undefined && novoOpcional.insertId > 0) {

                    // adiciona o opcional no produto
                    var ComandoSQLAddOpcionalProduto = await readCommandSql.retornaStringSql('adicionarOpcionalProduto', 'opcional');
                    await db.Query(ComandoSQLAddOpcionalProduto, { idproduto: req.body.idproduto, idopcional: novoOpcional.insertId });


                    // adiciona os opcionais itens
                    var ComandoSQLAddItem = await readCommandSql.retornaStringSql('adicionarOpcionalItem', 'opcional');

                    const sleep = m => new Promise(r => setTimeout(r, m));

                    // percorre os elementos e salva
                    await Promise.all(
                        req.body.lista.map(async (element) => {
                            console.log('salvar: ', element)
                            element.idopcional = novoOpcional.insertId;
                            await db.Query(ComandoSQLAddItem, element);
                            await sleep(500);
                        })
                    )

                    return {
                        status: 'success',
                        message: "Opcionais adicionados com sucesso.",
                    }

                }
                else {
                    return {
                        status: 'error',
                        message: 'Falha ao adicionar opcionais.'
                    }
                }

            }


        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao salvar opcional.'
            }
        }


    }

    // Remove o opcional item
    const removerOpcionalItem = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('removerOpcionalItem', 'opcional');
            var result = await db.Query(ComandoSQL, req.body);

            return {
                status: 'success',
                message: "Opcional removido com sucesso.",
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao remover opcional.'
            }
        }

    }

    return Object.create({
        salvarOpcionaisProduto
        , obterOpcionaisProduto
        , removerOpcionalItem
    })

}

module.exports = Object.assign({ controllers })